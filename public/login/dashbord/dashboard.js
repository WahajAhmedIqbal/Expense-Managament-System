getdatatable()
// getyear()
setname()
function setname(){ 
        const getname = localStorage.getItem('userName');
        const upname = JSON.parse(getname);
        const pname = document.getElementById('user')
        pname.innerHTML = upname    
    }
    function logout(){
        window.location.replace('../login.html')
        localStorage.removeItem("userId")
    }
    
    
    function saveIncome(){
        const userid = localStorage.getItem('userId')
        const amount = document.getElementById('amount').value
        const category = document.getElementById('category').value
        const date = document.getElementById('date').valueAsDate
        const Discription = document.getElementById('Discription').value
        
        firebase.firestore().collection('transection').add({
            amount,
            date,
            Discription,
            category,
            userid,
            type : 'Income'
    }).then(function(){
        alert("successful")
        getdatatable();
        clearincomemodel();
        $('#incomeModal').modal('hide')
    }).catch(function(error){
        alert('error')
    })
    .catch(function(error){
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
    const getimg = document.getElementById('file-expense').files[0]


    const stroageRef = firebase.storage().ref('2.jpg');

    stroageRef.put(getimg).then(function(response){
        response.ref.getDownloadURL().then(function(url){
            console.log('url' , url)
            firebase.firestore().collection('transection').add({
                amount,
                date,
                Discription,
                category,
                userid,
                type : 'Expense',
                receipt : url
            }).then(function(){
                alert("successful")
                getdatatable();
                clearmodel()
                $('#expenseModal').modal('hide')
            }).catch(function(error){
                alert('error')
            })
        })
    }).catch(function(error){
        console.log('error' , error.message)
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
    .orderBy("date" , "desc")
    .get()    
    .then(function(snaps){
        snaps.forEach(function(doc) {
            const data = doc.data()
            // n = data.date
            
            // const n = getyear.getMonth()
            // console.log('year',n)
            const row = document.createElement('TR')
            const amount = document.createElement('TD')
            const type = document.createElement('TD')
            const category = document.createElement('TD')
            const date = document.createElement('TD')
            const image = document.createElement('TD')
        
            amount.innerHTML = data.amount
            type.innerHTML = data.type
            category.innerHTML = data.category
            date.innerHTML = moment(data.date.toDate()).format('MMMM Do YYYY')
            image.innerHTML = `<img src="${data.receipt}" width="100"/>`


            row.appendChild(amount)
            row.appendChild(type)
            row.appendChild(category)
            row.appendChild(date)
            row.appendChild(image)
            table.appendChild(row)
        });
    })
}
function typefilter(){
    const userid = localStorage.getItem('userId')
    const type = document.getElementById('filter').value
    // const month = document.getElementById('year').value
    // console.log('month--->',month)
    if(type === 'all' ){
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
            yearget = data.date
            const row = document.createElement('TR')
            const amount = document.createElement('TD')
            const type = document.createElement('TD')
            const category = document.createElement('TD')
            const date = document.createElement('TD')            
            const image = document.createElement('TD')
        

            amount.innerHTML = data.amount
            type.innerHTML = data.type
            category.innerHTML = data.category
            date.innerHTML = moment(data.date.toDate()).format('MMMM Do YYYY')
            image.innerHTML = `<img src="${data.receipt}" width="100"/>`

            
            row.appendChild(amount)
            row.appendChild(type)
            row.appendChild(category)
            row.appendChild(date)
            row.appendChild(image)
            table.appendChild(row)
        });
    });
}

// function getyear(){
//     const userid = localStorage.getItem('userId')
//     firebase.firestore().collection('transection')
//     .where('userid' , '==' , userid)
//     .get()    
//     .then(function(snapshots){
//         snapshots.forEach(function(doc) {
//             const data = doc.data()
//             const dd = data.date

//             console.log(getMilliseconds(dd))

            
            
//        })
//     })
// }