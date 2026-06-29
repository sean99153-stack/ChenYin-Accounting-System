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
