typefilter()
function logout(){
    window.location.replace('../login.html')
}






console.log('hey')
function typefilter(){
    const userid = localStorage.getItem('userId')
    let totalincome = 0
    let totalexpense = 0
    const incomeput = document.getElementById('incomeamount')
    const expenseput = document.getElementById('expenseamount')
    const tb = document.getElementById('totalbalance')
    
    firebase.firestore().collection('transection')
    .where('userid' , '==' , userid)
    .get()
    .then(function(snapshots){
        snapshots.forEach(function(doc){
            const data = doc.data()
            let type = data.type
            if(type == "Income")
                {
                    totalincome = totalincome + parseInt(data.amount)
                }
            else if (type ==  "Expense")
                {
                    totalexpense = totalexpense + parseInt(data.amount)
                }

            incomeput.innerHTML = totalincome
            expenseput.innerHTML = totalexpense
            tb.innerHTML = totalincome - totalexpense
            console.log('income->' , incomeput)
            console.log('expense' , expenseput) 
            console.log('balance' , tb)          
        });
    })



}