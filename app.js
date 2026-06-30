/*
==========================================
沉飲店內帳務系統 V1.0
Core
==========================================
*/

const App = {

    version: "1.0.0",

    apiUrl: "",

    currentPage: "home",

    state:{

        settings:{
            closeTime:"03:00"
        },

        daily:{

            store:{
                cash:{
                    amount:0,
                    count:0
                },

                linePay:{
                    amount:0,
                    count:0
                }
            },

            uber:{
                drink:{
                    amount:0,
                    count:0
                },

                egg:{
                    amount:0,
                    count:0
                }
            },

            panda:{
                drink:{
                    amount:0,
                    count:0
                },

                egg:{
                    amount:0,
                    count:0
                }
            },

            product:{
                drinkQty:0,
                eggQty:0
            },

            expenses:[
    {
        item:"",
        qty:1,
        amount:0
    }
],

            incomes:[
    {
        item:"",
        qty:1,
        amount:0
    }
],

            summary:{
                sales:0,
                orders:0,
                expense:0,
                income:0,
                net:0
            }

        },

        report:{},

        month:{}

    }

};

/*
==========================================
DOM
==========================================
*/

const pageContainer =
    document.getElementById("pageContainer");

const loading =
    document.getElementById("loading");

const toast =
    document.getElementById("toast");

const dialogContainer =
    document.getElementById("dialogContainer");


/*
==========================================
Loading
==========================================
*/

function showLoading(){

    loading.classList.remove("hidden");

}

function hideLoading(){

    loading.classList.add("hidden");

}


/*
==========================================
Toast
==========================================
*/

let toastTimer;

function showToast(message){

    clearTimeout(toastTimer);

    toast.innerHTML = message;

    toast.classList.add("show");

    toastTimer = setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}


/*
==========================================
Dialog
==========================================
*/

function closeDialog(){

    dialogContainer.innerHTML="";

}

function showDialog(title,message,buttons=[]){

    let html=`

<div class="dialog-mask">

<div class="dialog">

<div class="dialog-title">

${title}

</div>

<div>

${message}

</div>

<div class="dialog-buttons">

`;

buttons.forEach(btn=>{

html+=`

<button
class="${btn.class}"

onclick="${btn.onclick}"

>

${btn.text}

</button>

`;

});

html+=`

</div>

</div>

</div>

`;

dialogContainer.innerHTML=html;

}


/*
==========================================
Router
==========================================
*/

function changePage(page){

    App.currentPage=page;

    renderPage();

}


/*
==========================================
Render
==========================================
*/

function renderPage(){

    switch(App.currentPage){

        case "home":
            renderHome();
            break;

        case "daily":
            renderDaily();
            break;

        case "search":
            renderSearch();
            break;

        case "report":
            renderReport();
            break;

        case "month":
            renderMonth();
            break;

        case "monthSearch":
            renderMonthSearch();
            break;

        case "setting":
            renderSetting();
            break;

        default:
            renderHome();

    }

}


/*
==========================================
首頁(暫時)
==========================================
*/

function renderHome(){

pageContainer.innerHTML=`

<div class="card">

    <div class="card-title">
        系統狀態
    </div>

    <div class="status warning">

        🟡 今日營業日：尚未關帳

    </div>

    <div class="status month">

        🟠 上個月尚未月結

    </div>

</div>

<div class="card">

    <div class="card-title">
        功能選單
    </div>

    <div class="menu-grid">

        <button class="btn menu-btn"
            onclick="changePage('daily')">

            新增每日帳務

        </button>

        <button class="btn menu-btn"
            onclick="changePage('search')">

            查詢帳務

        </button>

        <button class="btn menu-btn"
            onclick="changePage('report')">

            營業報表

        </button>

        <button class="btn menu-btn"
            onclick="changePage('month')">

            月結

        </button>

        <button class="btn menu-btn"
            onclick="changePage('monthSearch')">

            查詢月結

        </button>

        <button class="btn menu-btn"
            onclick="changePage('setting')">

            常用管理

        </button>

    </div>

</div>

`;

}
function backHomeButton(){

    return `

<button
    class="btn"
    onclick="changePage('home')">

    返回首頁

</button>

`;

}
function renderDaily(){

pageContainer.innerHTML=`

<div class="card">

    <div class="card-title">
        新增每日帳務
    </div>

    <div class="card section">

    <div class="card-title">

        🧾 店面

    </div>

    <div class="card">

        <div class="card-title">

            💵 現金

        </div>

        <label>

            金額

        </label>

        <input
            type="number"
            inputmode="numeric"
            id="cashAmount"
            value="0"
            oninput="calculateDaily()">

        <label>

            單數

        </label>

        <input
            type="number"
            inputmode="numeric"
            id="cashCount"
            value="0"
            oninput="calculateDaily()">

    </div>

    <div class="card">

        <div class="card-title">

            📱 Line Pay

        </div>

        <label>

            金額

        </label>

        <input
            type="number"
            inputmode="numeric"
            id="lineAmount"
            value="0"
            oninput="calculateDaily()">

        <label>

            單數

        </label>

        <input
            type="number"
            inputmode="numeric"
            id="lineCount"
            value="0"
            oninput="calculateDaily()">

    </div>

</div>
   
   <div class="card section">

    <div class="card-title">

        🚗 Uber Eats

    </div>

    <div class="card">

        <div class="card-title">

            🥤 沉飲

        </div>

        <label>金額</label>

        <input
            type="number"
            inputmode="numeric"
            id="uberDrinkAmount"
            value="0"
            oninput="calculateDaily()">

        <label>單數</label>

        <input
            type="number"
            inputmode="numeric"
            id="uberDrinkCount"
            value="0"
            oninput="calculateDaily()">

    </div>

    <div class="card">

        <div class="card-title">

            🧇 雞蛋糕

        </div>

        <label>金額</label>

        <input
            type="number"
            inputmode="numeric"
            id="uberEggAmount"
            value="0"
            oninput="calculateDaily()">

        <label>單數</label>

        <input
            type="number"
            inputmode="numeric"
            id="uberEggCount"
            value="0"
            oninput="calculateDaily()">

    </div>

</div>
<div class="card section">

    <div class="card-title">

        🐼 Foodpanda

    </div>

    <div class="card">

        <div class="card-title">

            🥤 沉飲

        </div>

        <label>金額</label>

        <input
            type="number"
            inputmode="numeric"
            id="pandaDrinkAmount"
            value="0"
            oninput="calculateDaily()">

        <label>單數</label>

        <input
            type="number"
            inputmode="numeric"
            id="pandaDrinkCount"
            value="0"
            oninput="calculateDaily()">

    </div>

    <div class="card">

        <div class="card-title">

            🧇 雞蛋糕

        </div>

        <label>金額</label>

        <input
            type="number"
            inputmode="numeric"
            id="pandaEggAmount"
            value="0"
            oninput="calculateDaily()">

        <label>單數</label>

        <input
            type="number"
            inputmode="numeric"
            id="pandaEggCount"
            value="0"
            oninput="calculateDaily()">

    </div>

</div>
<div class="card section">

    <div class="card-title">

        📦 商品數量

    </div>

    <div class="card">

        <div class="card-title">

            🥤 飲料

        </div>

        <label>

            杯數

        </label>

        <input
            type="number"
            inputmode="numeric"
            id="drinkQty"
            value="0"
            oninput="calculateDaily()">

    </div>

    <div class="card">

        <div class="card-title">

            🧇 雞蛋糕

        </div>

        <label>

            份數

        </label>

        <input
            type="number"
            inputmode="numeric"
            id="eggQty"
            value="0"
            oninput="calculateDaily()">

    </div>

</div>
<div class="card">

    <div class="card-title">
        支出
    </div>

    <div id="expenseList"></div>

    <br>

    <button
        class="btn"
        onclick="addExpense()">

        ＋ 新增支出

    </button>

</div>
<div class="card">

    <div class="card-title">
        其他收入
    </div>

    <div id="incomeList"></div>

    <br>

    <button
        class="btn"
        onclick="addIncome()">

        ＋ 新增收入

    </button>

</div>
    <div class="card">

        <div class="card-title">

            今日統計

        </div>

        <p>

            總營業額：
            <b id="totalAmount">0</b>

        </p>

        <br>

        <p>

            總單數：
            <b id="totalCount">0</b>

        </p>
<br>

<p>

    飲料杯數：
    <b id="drinkQtyTotal">0</b>

</p>

<br>

<p>

    雞蛋糕份數：
    <b id="eggQtyTotal">0</b>

</p>

<br>

<p>

    支出合計：
    <b id="expenseTotal">0</b>

</p>
<br>

<p>

    其他收入：
    <b id="incomeTotal">0</b>

</p>

<br>

<p>

    淨收入：
    <b id="netTotal">0</b>

</p>
    </div>

   ${dailyActionButtons()}

</div>

`;

renderExpenseList();

renderIncomeList();

calculateExpense();

calculateIncome();

calculateDaily();

}
function renderSearch(){

pageContainer.innerHTML=`

<div class="card">

    <div class="card-title">

        查詢帳務

    </div>

    <label>

        營業日期

    </label>

    <input
        type="date"
        id="searchDate">

    <button
        class="btn btn-info"
        onclick="searchDaily()">

        查詢

    </button>

    <hr>

    <div id="searchResult">

        尚未查詢

    </div>

    <br>

    ${backHomeButton()}

</div>

`;

}
function renderReport(){

pageContainer.innerHTML=`

<div class="card">

<div class="card-title">

營業報表

</div>

<p>

營業報表功能開發中

</p>

<br>

${backHomeButton()}

</div>

`;

}
function renderMonth(){

pageContainer.innerHTML=`

<div class="card">

<div class="card-title">

月結

</div>

<p>

月結功能開發中

</p>

<br>

${backHomeButton()}

</div>

`;

}
function renderMonthSearch(){

pageContainer.innerHTML=`

<div class="card">

<div class="card-title">

查詢月結

</div>

<p>

查詢月結功能開發中

</p>

<br>

${backHomeButton()}

</div>

`;

}
function renderSetting(){

pageContainer.innerHTML=`

<div class="card">

<div class="card-title">

常用管理

</div>

<p>

系統設定功能開發中

</p>

<br>

${backHomeButton()}

</div>

`;

}    
/*
==========================================
API
==========================================
*/

async function api(action,data={}){

    try{

        showLoading();

        /*
        之後改成
        google.script.run
        或
        fetch WebApp
        */

        console.log(action,data);

        return {

            success:true

        };

    }

    catch(error){

        console.error(error);

        showToast("系統錯誤");

        return{

            success:false

        };

    }

    finally{

        hideLoading();

    }

}

function getDaily(){

    return App.state.daily;

}

function setDaily(data){

    App.state.daily=data;

}
function addExpense(){

    App.state.daily.expenses.push({

        item:"",

        qty:1,

        amount:0

    });

    renderExpenseList();

    calculateExpense();

    calculateDaily();

}
function addIncome(){

    App.state.daily.incomes.push({

        item:"",
        qty:1,
        amount:0

    });

    renderIncomeList();

    calculateIncome();

    calculateDaily();

}
function renderExpenseList(){

    let html="";

    App.state.daily.expenses.forEach((item,index)=>{

        html += `

<div class="card expense-card">

    <div class="card-title">

        支出 ${index + 1}

    </div>

   <label class="input-title">

    品項

    </label>

    <input
        placeholder="例如：瓦斯、牛奶、糖..."
        value="${item.item}"
        oninput="updateExpense(${index},'item',this.value)">

    <br>

    <label class="input-title">

    數量

    </label>

    <input
        type="number"
        inputmode="numeric"
        value="${item.qty}"
        oninput="updateExpense(${index},'qty',this.value)">

    <br>

    <label class="input-title">

    金額

    </label>

    <input
        type="number"
        inputmode="numeric"
        value="${item.amount}"
        oninput="updateExpense(${index},'amount',this.value)">

    <br><br>

    <button
        class="btn btn-danger"
        onclick="deleteExpense(${index})">

        🗑️ 刪除此筆

    </button>

</div>

`;


    });

    document.getElementById("expenseList").innerHTML = html;

}
function renderIncomeList(){

    let html="";

    App.state.daily.incomes.forEach((item,index)=>{

        html += `

<div class="card expense-card">

    <div class="card-title">

        其他收入 ${index + 1}

    </div>

    <label class="input-title">

        品項

    </label>

    <input
        placeholder="例如：代售、退款、其他..."
        value="${item.item}"
        oninput="updateIncome(${index},'item',this.value)">

    <br>

    <label class="input-title">

        數量

    </label>

    <input
        type="number"
        inputmode="numeric"
        value="${item.qty}"
        oninput="updateIncome(${index},'qty',this.value)">

    <br>

    <label class="input-title">

        金額

    </label>

    <input
        type="number"
        inputmode="numeric"
        value="${item.amount}"
        oninput="updateIncome(${index},'amount',this.value)">

    <br><br>

    <button
        class="btn btn-danger"
        onclick="deleteIncome(${index})">

        🗑️ 刪除此筆

    </button>

</div>

`;

    });

    document.getElementById("incomeList").innerHTML = html;

}
function updateIncome(index,key,value){

    if(key==="qty" || key==="amount"){

        value = Number(value || 0);

    }

    App.state.daily.incomes[index][key] = value;

    calculateIncome();

    calculateDaily();

}
function calculateIncome(){

    let total = 0;

    App.state.daily.incomes.forEach(item=>{

        total += Number(item.amount || 0);

    });

    App.state.daily.summary.income = total;

}
function deleteIncome(index){

    App.state.daily.incomes.splice(index,1);

    if(App.state.daily.incomes.length===0){

        App.state.daily.incomes.push({

            item:"",
            qty:1,
            amount:0

        });

    }

    renderIncomeList();

    calculateIncome();

    calculateDaily();

}
function updateExpense(index,key,value){

    if(key==="qty" || key==="amount"){

        value = Number(value || 0);

    }

    App.state.daily.expenses[index][key] = value;

    calculateExpense();

    calculateDaily();

}
function calculateExpense(){

    let total = 0;

    App.state.daily.expenses.forEach(item=>{

        total += Number(item.amount || 0);

    });

    App.state.daily.summary.expense = total;

}
function deleteExpense(index){

    App.state.daily.expenses.splice(index,1);

    if(App.state.daily.expenses.length===0){

        App.state.daily.expenses.push({

            item:"",
            qty:1,
            amount:0

        });

    }

    renderExpenseList();

    calculateExpense();

    calculateDaily();

}
function updateDailyState(){

    const d = App.state.daily;

    d.store.cash.amount =
        Number(document.getElementById("cashAmount")?.value || 0);

    d.store.cash.count =
        Number(document.getElementById("cashCount")?.value || 0);

    d.store.linePay.amount =
        Number(document.getElementById("lineAmount")?.value || 0);

    d.store.linePay.count =
        Number(document.getElementById("lineCount")?.value || 0);
    
    d.uber.drink.amount =
        Number(document.getElementById("uberDrinkAmount")?.value || 0);

    d.uber.drink.count =
        Number(document.getElementById("uberDrinkCount")?.value || 0);

    d.uber.egg.amount =
        Number(document.getElementById("uberEggAmount")?.value || 0);

    d.uber.egg.count =
        Number(document.getElementById("uberEggCount")?.value || 0);
    
    d.panda.drink.amount =
    Number(document.getElementById("pandaDrinkAmount")?.value || 0);

    d.panda.drink.count =
    Number(document.getElementById("pandaDrinkCount")?.value || 0);

    d.panda.egg.amount =
    Number(document.getElementById("pandaEggAmount")?.value || 0);

    d.panda.egg.count =
    Number(document.getElementById("pandaEggCount")?.value || 0);
    
    d.product.drinkQty =
    Number(document.getElementById("drinkQty")?.value || 0);

    d.product.eggQty =
    Number(document.getElementById("eggQty")?.value || 0);
}
/*
==========================================
Utils
==========================================
*/
function calculateDaily(){

    updateDailyState();

    const d = App.state.daily;

    const totalAmount =
    d.store.cash.amount +
    d.store.linePay.amount +
    d.uber.drink.amount +
    d.uber.egg.amount +
    d.panda.drink.amount +
    d.panda.egg.amount;

   const totalCount =
    d.store.cash.count +
    d.store.linePay.count +
    d.uber.drink.count +
    d.uber.egg.count +
    d.panda.drink.count +
    d.panda.egg.count;
    d.summary.sales = totalAmount;
    d.summary.orders = totalCount;

    document.getElementById("totalAmount").innerHTML =
        money(totalAmount);

    document.getElementById("totalCount").innerHTML =
        money(totalCount);

    document.getElementById("drinkQtyTotal").innerHTML =
        money(d.product.drinkQty);

    document.getElementById("eggQtyTotal").innerHTML =
        money(d.product.eggQty);

    document.getElementById("expenseTotal").innerHTML =
        money(d.summary.expense);
    d.summary.net =
    d.summary.sales +
    d.summary.income -
    d.summary.expense;
    
    document.getElementById("incomeTotal").innerHTML =
    money(d.summary.income);

    document.getElementById("netTotal").innerHTML =
    money(d.summary.net);

}
function money(number){

    return Number(number||0)
        .toLocaleString();

}

function getBusinessDate(){

    const now = new Date();

    const hour = now.getHours();

    if(hour < 3){

        now.setDate(now.getDate()-1);

    }

    return now.toLocaleDateString("sv-SE");

}

function number(value){

    return Number(value||0);

}


/*
==========================================
Init
==========================================
*/

window.onload=function(){

    renderPage();

};
function previewCloseDaily(){

    calculateExpense();
    calculateIncome();
    calculateDaily();

    const d = App.state.daily;

    pageContainer.innerHTML = `

<div class="card">

    <div class="card-title">

        日報表預覽

    </div>

    <h3>店面</h3>

    <p>現金：${money(d.store.cash.amount)} 元（${d.store.cash.count} 單）</p>

    <p>Line Pay：${money(d.store.linePay.amount)} 元（${d.store.linePay.count} 單）</p>

    <hr>

    <h3>Uber Eats</h3>

    <p>沉飲：${money(d.uber.drink.amount)} 元（${d.uber.drink.count} 單）</p>

    <p>雞蛋糕：${money(d.uber.egg.amount)} 元（${d.uber.egg.count} 單）</p>

    <hr>

    <h3>Foodpanda</h3>

    <p>沉飲：${money(d.panda.drink.amount)} 元（${d.panda.drink.count} 單）</p>

    <p>雞蛋糕：${money(d.panda.egg.amount)} 元（${d.panda.egg.count} 單）</p>

    <hr>

    <h3>商品數量</h3>

    <p>飲料杯數：${d.product.drinkQty}</p>

    <p>雞蛋糕份數：${d.product.eggQty}</p>

    <hr>

    <h3>統計</h3>

    <p>總營業額：${money(d.summary.sales)}</p>

    <p>總單數：${d.summary.orders}</p>

    <p>支出：${money(d.summary.expense)}</p>

    <p>其他收入：${money(d.summary.income)}</p>

    <p><b>淨收入：${money(d.summary.net)}</b></p>

    <br>

    <button
        class="btn"
        onclick="renderDaily()">

        返回修改

    </button>

    <button
        class="btn btn-success"
        onclick="confirmCloseDaily()">

        確認關帳

    </button>

</div>

`;

}
function confirmCloseDaily(){

    const d = App.state.daily;

    d.businessDate = getBusinessDate();

    d.closeTime = new Date().toLocaleTimeString("zh-TW");

    google.script.run

        .withSuccessHandler(function(res){

            if(res.success){

                resetDailyState();

                showToast("關帳成功");

                changePage("home");

            }else{

                showToast(res.message);

            }

        })

        .withFailureHandler(function(err){

            showToast(err.message);

        })

        .saveDaily(d);

}
function resetDailyState(){

    App.state.daily = {

        store:{
            cash:{amount:0,count:0},
            linePay:{amount:0,count:0}
        },

        uber:{
            drink:{amount:0,count:0},
            egg:{amount:0,count:0}
        },

        panda:{
            drink:{amount:0,count:0},
            egg:{amount:0,count:0}
        },

        product:{
            drinkQty:0,
            eggQty:0
        },

        expenses:[
            {
                item:"",
                qty:1,
                amount:0
            }
        ],

        incomes:[
            {
                item:"",
                qty:1,
                amount:0
            }
        ],

        summary:{
            sales:0,
            orders:0,
            expense:0,
            income:0,
            net:0
        }

    };

}
function searchDaily(){

    const businessDate =
        document.getElementById("searchDate").value;

    if(!businessDate){

        showToast("請選擇日期");

        return;

    }

    showLoading();

    google.script.run

        .withSuccessHandler(function(res){

            hideLoading();

            if(!res.success){

                showToast(res.message);

                return;

            }

            renderSearchResult(res.daily);

        })

        .withFailureHandler(function(err){

            hideLoading();

            showToast(err.message);

        })

        .loadDaily(businessDate);

}
function renderSearchResult(d){

    document.getElementById("searchResult").innerHTML=`

        <div class="card">

            <b>營業日期：</b>
            ${d.businessDate}

            <br><br>

            <b>總營業額：</b>
            ${money(d.summary.sales)}

            <br>

            <b>總單數：</b>
            ${d.summary.orders}

            <br>

            <b>淨收入：</b>
            ${money(d.summary.net)}

        </div>

    `;

}
function dailyActionButtons(){

    return `

<button
    class="btn btn-success"
    onclick="previewCloseDaily()">

    關帳

</button>

<br><br>

${backHomeButton()}

`;

}
