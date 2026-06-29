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

}function getSheet(name){

    return getSpreadsheet()
        .getSheetByName(name);

}

function getSetting(){

}
