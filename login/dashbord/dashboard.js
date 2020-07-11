// function saveIncome(){
//     const userid = localStorage.getItem('userId')
//     const amount = document.getElementById('amount').value
//     const category = document.getElementById('category').value
//     const date = document.getElementById('date').valueAsDate
//     const Discription = document.getElementById('Discription').value
    
    
//     firebase.firestore().collection('transection').add({
//         amount,
//         date,
//         Discription,
//         category,
//         userid,
//         type : 'Income'
//     }).then(function(){
//         alert("successful")
//         getdatatable();
//         clearincomemodel();
//         $('#incomeModal').modal('hide')
//     }).catch(function(error){
//         alert('error')
//     })
// }
// function clearincomemodel(){
//          document.getElementById('amount').value = ''
//          document.getElementById('category').value = ''
//          document.getElementById('Discription').value = ''
// }



// function saveExpense(){
//     const userid = localStorage.getItem('userId')
//     const amount = document.getElementById('amount-expense').value
//     const category = document.getElementById('category-expense').value
//     const date = document.getElementById('date-expense').valueAsDate
//     const Discription = document.getElementById('Discription-expense').value
    

//     firebase.firestore().collection('transection').add({
//         amount,
//         date,
//         Discription,
//         category,
//         userid,
//         type : 'Expense'
//     }).then(function(){
//         alert("successful")
//         getdatatable();
//         clearmodel()
//         $('#expenseModal').modal('hide')
//     }).catch(function(error){
//         alert('error')
//     })
// }
// function clearmodel(){
//          document.getElementById('amount-expense').value = ''
//          document.getElementById('category-expense').value = ''
//          document.getElementById('Discription-expense').value = ''
// }

// function getdatatable(){
//     const table = document.getElementById('tbody')
//     table.innerHTML = ""

//     firebase.firestore().collection('transection')
//     .orderBy("date" , "desc")
//     .get()    
//     .then(function(snaps){
//         snaps.forEach(function(doc) {
//             const data = doc.data()
//             const row = document.createElement('TR')
//             const amount = document.createElement('TD')
//             const type = document.createElement('TD')
//             const category = document.createElement('TD')
//             const date = document.createElement('TD')
        
//             amount.innerHTML = data.amount
//             type.innerHTML = data.type
//             category.innerHTML = data.category
//             date.innerHTML = data.date.toDate()

//             row.appendChild(amount)
//             row.appendChild(type)
//             row.appendChild(category)
//             row.appendChild(date)
//             table.appendChild(row)
//         });
//     })
// }
// new setup
function saveIncome(){
    const userId = localStorage.getItem('userId')
    const amount = document.getElementById('amount').value
    const category = document.getElementById('category').value
    const date = document.getElementById('date').valueAsDate
    const Discription = document.getElementById('Discription').value

    console.log('date' , date)

    firebase.firestore().collection('newtransection').add(
        {
            userId,
            amount,
            category,
            date,
            Discription
        }).then(function(){
            alert('succesfull add');
            clearincomemodel()
            $('#incomeModal').modal('hide')
        }).catch(function(error){
            alert("Error")
        })

        function clearincomemodel(){
            document.getElementById('amount').value = ""
            document.getElementById('category').value = ""
            document.getElementById('date').value = ""
            document.getElementById('Discription').value = ""
            
        }
}

function saveExpense(){
    const userId = localStorage.getItem('userId')
    const amount = document.getElementById('amount').value
    const category = document.getElementById('category').value
    const date = document.getElementById('date').valueAsDate
    const Discription = document.getElementById('Discription').value

    console.log('date' , date)

    firebase.firestore().collection('newtransection').add(
        {
            userId,
            amount,
            category,
            date,
            Discription
        }).then(function(){
            alert('succesfull add');
            clearincomemodel()
            $('#incomeModal').modal('hide')
        }).catch(function(error){
            alert("Error")
        })

        function clearincomemodel(){
            document.getElementById('amount').value = ""
            document.getElementById('category').value = ""
            document.getElementById('date').value = ""
            document.getElementById('Discription').value = ""
            
        }
}