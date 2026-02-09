const ExcelJs = require('exceljs');
const {test, expect} = require('@playwright/test');

async function excelRead(worksheet,searchText){
    let output = {row:-1,column:-1};

    worksheet.eachRow((row,rowNumber)=>{

        row.eachCell((cell,colNumber)=>{
            if(cell.value === searchText){
                output.row=rowNumber;
                output.column=colNumber;
            }
        })
    });

    return output;
}

async function excelTest(searchText,replaceText,sheetName,filePath,change){

    const workbook =  new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(sheetName);
    let output = await excelRead(worksheet,searchText);
    const currentCell = worksheet.getCell(output.row,output.column+change.colChange);
    currentCell.value=replaceText; 
    await workbook.xlsx.writeFile(filePath);   

}

test('Upload Download Test', async({page})=>{

let sheetName = "Sheet1";
let replaceText = "500";
let searchText = "Mango";

await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html'); 
const download = page.waitForEvent('download');
await page.getByRole('button', { name: 'Download' }).click();
const dl = await download;
let filePath = await dl.path();
await excelTest(searchText,replaceText,sheetName,filePath,{rowChange:0, colChange:2});
await page.locator('#fileinput').setInputFiles(filePath);
const desiredRow = page.getByRole('row').filter({has:page.getByText(searchText)});
await expect(desiredRow.locator('#cell-4-undefined')).toContainText(replaceText);

})

