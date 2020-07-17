typefilter()
topincometable()
totalexpens()
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
            // console.log('income->' , incomeput)
            // console.log('expense' , expenseput) 
            // console.log('balance' , tb)          
        });
    })
}
function topincometable(){
    const userid = localStorage.getItem('userId')
    const table = document.getElementById('tincome')
    const type = "Income"

    // table.innerHTML = ""

    firebase.firestore().collection('transection')
    .where('userid' , '==' , userid)
    .orderBy('date' , 'desc').limit(5)
    .where('type' , '==' , type)
    .get()
    .then(function(snaps){
        snaps.forEach(function(doc){
            
                const data = doc.data()
                const row  = document.createElement('TR')
                const type = document.createElement('TD')
                const amount = document.createElement('TD')

                type.innerHTML = data.type
                amount.innerHTML = data.amount

                row.appendChild(type)
                row.appendChild(amount)
                table.appendChild(row)
            
        })
    })
}
function totalexpens(){
    const userid = localStorage.getItem('userId')
    const type = "Expense"
    const Expensetable = document.getElementById('texpense')

    firebase.firestore().collection('transection')
    .where('userid' , '==' , userid)
    .orderBy('date' , 'desc').limit(5)
    .where('type' , '==' , type)
    .get()
    .then(function(snaps){
        snaps.forEach(function(doc){
            const data = doc.data()
            const row  = document.createElement('TR')
            const type = document.createElement('TD')
            const amount = document.createElement('TD')
            type.innerHTML = data.type
            amount.innerHTML = data.amount
            row.appendChild(type)
            row.appendChild(amount)
            Expensetable.appendChild(row)
        
        })
})
}
window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Income And Expense"
        },
        axisX: {
            valueFormatString: "DDD",
            minimum: new Date(2017, 1, 5, 23),
            maximum: new Date(2017, 1, 12, 1)
        },
        axisY: {
            title: "Amount"
        },
        legend: {
            verticalAlign: "top",
            horizontalAlign: "right",
            dockInsidePlotArea: true
        },
        toolTip: {
            shared: true
        },
        data: [{
            name: "Amount",
            showInLegend: true,
            legendMarkerType: "square",
            type: "area",
            color: "rgba(40,175,101,0.6)",
            markerSize: 0,
            dataPoints: [
                { x: new Date(2017, 1, 6), y: 220 },
                { x: new Date(2017, 1, 7), y: 120 },
                { x: new Date(2017, 1, 8), y: 144 },
                { x: new Date(2017, 1, 9), y: 162 },
                { x: new Date(2017, 1, 10), y: 129 },
                { x: new Date(2017, 1, 11), y: 109 },
                { x: new Date(2017, 1, 12), y: 129 }
            ]
        },
        {
            name: "Month",
            showInLegend: true,
            legendMarkerType: "square",
            type: "area",
            color: "rgba(0,75,141,0.7)",
            markerSize: 0,
            dataPoints: [
                { x: new Date(2017, 1, 6), y: 42 },
                { x: new Date(2017, 1, 7), y: 34 },
                { x: new Date(2017, 1, 8), y: 29 },
                { x: new Date(2017, 1, 9), y: 42 },
                { x: new Date(2017, 1, 10), y: 53},
                { x: new Date(2017, 1, 11), y: 15 },
                { x: new Date(2017, 1, 12), y: 12 }
            ]
        }]
    });
    chart.render();
    
    }