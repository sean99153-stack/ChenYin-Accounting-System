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
            onclick="showToast('新增每日帳務 開發中')">

            新增每日帳務

        </button>

        <button class="btn menu-btn"
            onclick="showToast('查詢帳務 開發中')">

            查詢帳務

        </button>

        <button class="btn menu-btn"
            onclick="showToast('營業報表 開發中')">

            營業報表

        </button>

        <button class="btn menu-btn"
            onclick="showToast('月結 開發中')">

            月結

        </button>

        <button class="btn menu-btn"
            onclick="showToast('查詢月結 開發中')">

            查詢月結

        </button>

        <button class="btn menu-btn"
            onclick="showToast('常用管理 開發中')">

            常用管理

        </button>

    </div>

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
