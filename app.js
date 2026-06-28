/*
==========================================
沉飲店內帳務系統 V1.0
Core
==========================================
*/

const App = {

    version: "1.0",

    apiUrl: "",

    currentPage: "home",

    setting: {},

    dailyData: {},

    reportData: {},

    monthData: {}

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

<p>

每日帳務功能開發中

</p>

<br>

${backHomeButton()}

</div>

`;

}
function renderSearch(){

pageContainer.innerHTML=`

<div class="card">

<div class="card-title">

查詢帳務

</div>

<p>

查詢帳務功能開發中

</p>

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


/*
==========================================
Utils
==========================================
*/

function money(number){

    return Number(number||0)
        .toLocaleString();

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
