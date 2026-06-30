const SHEET = {

  DAILY: "每日帳務",

  EXPENSE: "支出明細",

  INCOME: "其他收入",

  MONTH: "月結",

  SETTING: "系統設定",

  EXPENSE_ITEM: "支出品項"

};

function doGet(){

  return HtmlService
    .createHtmlOutputFromFile("index")
    .setTitle("沉飲店內帳務系統");

}

function getSpreadsheet(){

    return SpreadsheetApp
        .getActiveSpreadsheet();

}

function getSheet(name){

    return getSpreadsheet()
        .getSheetByName(name);

}

function getSetting(){

    const sheet = getSheet(SHEET.SETTING);

    const data = sheet.getDataRange().getValues();

    const setting = {};

    for(let i=1;i<data.length;i++){

        setting[data[i][0]] = data[i][1];

    }

    return setting;

}

function appendData(sheetName, rowData){

    const sheet = getSheet(sheetName);

    const row = sheet.getLastRow() + 1;

    sheet
        .getRange(row, 1, 1, rowData.length)
        .setValues([rowData]);

}

function saveDaily(data){

    try{
if(isDailyClosed(data.businessDate)){

    return{

        success:false,

        message:"今日已完成關帳"

    };

}
const rowData = [

    data.businessDate,

    data.closeTime,

    data.store.cash.amount,
    data.store.cash.count,

    data.store.linePay.amount,
    data.store.linePay.count,

    data.uber.drink.amount,
    data.uber.drink.count,

    data.uber.egg.amount,
    data.uber.egg.count,

    data.panda.drink.amount,
    data.panda.drink.count,

    data.panda.egg.amount,
    data.panda.egg.count,

    data.product.drinkQty,
    data.product.eggQty,

    data.summary.sales,
    data.summary.orders,

    data.summary.expense,

    data.summary.income,

    data.summary.net,

    "Y"

];

appendData(
    SHEET.DAILY,
    rowData
);
if(data.expenses && data.expenses.length){

    data.expenses.forEach(item=>{

        if(
            !item.name &&
            !item.qty &&
            !item.amount
        ){
            return;
        }

        appendData(
            SHEET.EXPENSE,
            [

                data.businessDate,

                new Date(),

                item.name,

                item.qty,

                item.amount

            ]
        );

    });

}
if(data.incomes && data.incomes.length){

    data.incomes.forEach(item=>{

        if(
            !item.name &&
            !item.qty &&
            !item.amount
        ){
            return;
        }

        appendData(
            SHEET.INCOME,
            [

                data.businessDate,

                new Date(),

                item.name,

                item.qty,

                item.amount

            ]
        );

    });

}
        return{

            success:true

        };

    }

    catch(error){

        return{

            success:false,

            message:error.toString()

        };

    }

}
function isDailyClosed(businessDate){

    const sheet = getSheet(SHEET.DAILY);

    const data = sheet.getDataRange().getValues();

    for(let i=1;i<data.length;i++){

        if(String(data[i][0])===String(businessDate)){

            return true;

        }

    }

    return false;

}
function loadDaily(businessDate){

    const sheet = getSheet(SHEET.DAILY);

    const data = sheet.getDataRange().getValues();

    for(let i=1;i<data.length;i++){

        if(String(data[i][0]) === String(businessDate)){

            const row = data[i];

return{

    success:true,

    row:i+1,

    daily:{

        businessDate:row[0],

        closeTime:row[1],

        store:{
            cash:{
                amount:row[2],
                count:row[3]
            },
            linePay:{
                amount:row[4],
                count:row[5]
            }
        },

        uber:{
            drink:{
                amount:row[6],
                count:row[7]
            },
            egg:{
                amount:row[8],
                count:row[9]
            }
        },

        panda:{
            drink:{
                amount:row[10],
                count:row[11]
            },
            egg:{
                amount:row[12],
                count:row[13]
            }
        },

        product:{
            drinkQty:row[14],
            eggQty:row[15]
        },

        summary:{
            sales:row[16],
            orders:row[17],
            expense:row[18],
            income:row[19],
            net:row[20]
        },

        expenses:getExpenseList(businessDate),

        incomes:getIncomeList(businessDate)

    }

};

        }

    }

    return{

        success:false,

        message:"查無資料"

    };

}
function getExpenseList(businessDate){

    const sheet = getSheet(SHEET.EXPENSE);

    const data = sheet.getDataRange().getValues();

    const list = [];

    for(let i=1;i<data.length;i++){

        if(String(data[i][0])===String(businessDate)){

            list.push({

                name:data[i][2],

                qty:data[i][3],

                amount:data[i][4]

            });

        }

    }

    return list;

}
function getIncomeList(businessDate){

    const sheet = getSheet(SHEET.INCOME);

    const data = sheet.getDataRange().getValues();

    const list = [];

    for(let i=1;i<data.length;i++){

        if(String(data[i][0])===String(businessDate)){

            list.push({

                name:data[i][2],

                qty:data[i][3],

                amount:data[i][4]

            });

        }

    }

    return list;

}
