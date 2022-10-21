import * as path from 'path';
import { Workbook } from 'exceljs';
import ExcelJS from 'exceljs';
import { attProduct } from 'src/types/attProducts';


function getCellValue (row: ExcelJS.Row, cellIndex: number): number{
    const cell = row.getCell(cellIndex);

    return +cell.value;
  };

export async function excelToArray (fileName){
    const filePath = path.resolve(__dirname, "../../assets", fileName.sheet)
    const workbook = new Workbook
    const content = await workbook.xlsx.readFile(filePath);
    const worksheet = content.worksheets[0];
    const rowStartIndex = 2;
    const numberOfRows = worksheet.rowCount - 1;

    const rows = worksheet.getRows(rowStartIndex, numberOfRows) ?? [];

    const attProducts = rows.map((row): attProduct => {
      return {
        code: getCellValue(row, 1),
        percentage: getCellValue(row, 2),
      };
    });

    console.log(attProducts);

    return attProducts
  };
