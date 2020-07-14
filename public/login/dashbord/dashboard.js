getdatatable()
setname()
function setname(){
    const getname = localStorage.getItem('userName');
    const upname = JSON.parse(getname);
    const pname = document.getElementById('user')
    pname.innerHTML = upname    
}
function logout(){
    window.location.replace('../login.html')
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
            date.innerHTML = moment(data.date.toDate()).format('MMMM Do YYYY')

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
            
        
            amount.innerHTML = data.amount
            type.innerHTML = data.type
            category.innerHTML = data.category
            date.innerHTML = moment(data.date.toDate()).format('MMMM Do YYYY')
           

            row.appendChild(amount)
            row.appendChild(type)
            row.appendChild(category)
            row.appendChild(date)
            table.appendChild(row)
        });
    });
}