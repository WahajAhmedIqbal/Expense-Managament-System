getdatatable()
function saveIncome(){
    const userid = localStorage.getItem('userId')
    const amount = document.getElementById('amount').value
    const category = document.getElementById('category').value
    const date = document.getElementById('date').valueAsDate
    const Discription = document.getElementById('Discription').value
    const imagefile = document.getElementById('file-expense').files[0]

    const storageRef = firebase.storage().ref(`${Date.now()}.jpg`); 

    storageRef.put(imagefile).then(function(respons){
        console.log('a gaye ------> ' , respons)
        respons.ref.getDownloadURL().then(function(url){
                console.log('url...>' , url)
                firebase.firestore().collection('transection').add({
                amount,
                date,
                Discription,
                category,
                userid,
                type : 'Income',
                receipt : url
            }).then(function(){
                alert("successful")
                console.log('ur1' , url)
                getdatatable();
                clearincomemodel();
                $('#incomeModal').modal('hide')
            }).catch(function(error){
                alert('error')
            })
        })
    }).catch(function(error){
        console.log("eoor " , error.message)
    })
    
   
}
function clearincomemodel(){
         document.getElementById('amount').value = ''
         document.getElementById('category').value = ''
         document.getElementById('Discription').value = ''
}



function saveExpense(){
    const userid = localStorage.getItem('userId')
    const amount = document.getElementById('amount-expense').value
    const category = document.getElementById('category-expense').value
    const date = document.getElementById('date-expense').valueAsDate
    const Discription = document.getElementById('Discription-expense').value
    

    firebase.firestore().collection('transection').add({
        amount,
        date,
        Discription,
        category,
        userid,
        type : 'Expense'
    }).then(function(){
        alert("successful")
        getdatatable();
        clearmodel()
        $('#expenseModal').modal('hide')
    }).catch(function(error){
        alert('error')
    })
}
function clearmodel(){
         document.getElementById('amount-expense').value = ''
         document.getElementById('category-expense').value = ''
         document.getElementById('Discription-expense').value = ''
}

function getdatatable(){
    const userid = localStorage.getItem('userId')
    const table = document.getElementById('tbody')
    table.innerHTML = ""

    firebase.firestore().collection('transection')
    .where('userid' , '==' , userid)
    .orderBy("date" , "desc").get()    
    .then(function(snaps){
        snaps.forEach(function(doc) {
            const data = doc.data()
            const row = document.createElement('TR')
            const amount = document.createElement('TD')
            const type = document.createElement('TD')
            const category = document.createElement('TD')
            const date = document.createElement('TD')
        
            amount.innerHTML = data.amount
            type.innerHTML = data.type
            category.innerHTML = data.category
            date.innerHTML = data.date.toDate()

            row.appendChild(amount)
            row.appendChild(type)
            row.appendChild(category)
            row.appendChild(date)
            table.appendChild(row)
        });
    })
}
function typefilter(){
    const userid = localStorage.getItem('userId')
    const type = document.getElementById('filter').value
    if(type === 'all'){
        return getdatatable()
    }

    const table = document.getElementById('tbody')
    table.innerHTML = ""

    firebase.firestore().collection('transection')
    .where('userid' , '==' , userid)
    .orderBy("date" , "desc")
    .where('type' , '==' , type)
    .get()    
    .then(function(snaps){
        snaps.forEach(function(doc) {
            const data = doc.data()
            const row = document.createElement('TR')
            const amount = document.createElement('TD')
            const type = document.createElement('TD')
            const category = document.createElement('TD')
            const date = document.createElement('TD')
            const image = document.createElement('TD')
        
            amount.innerHTML = data.amount
            type.innerHTML = data.type
            category.innerHTML = data.category
            date.innerHTML = data.date.toDate()
            image.innerHTML = `<img src="${data.receipt}" width="80px"/>`

            row.appendChild(amount)
            row.appendChild(type)
            row.appendChild(category)
            row.appendChild(date)
            row.appendChild(image)
            table.appendChild(row)
        });
    })
}