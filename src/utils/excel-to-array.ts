import { Workbook } from 'exceljs';
import ExcelJS from 'exceljs';
import { attProduct } from 'src/types/attProducts';

function getCellValue(row: ExcelJS.Row, cellIndex: number): number {
  const cell = row.getCell(cellIndex);

  return +cell.value;
}

export async function excelToArray(data) {
  console.log("\n\n\n\n\n")
  console.log("data", data)
  console.log("\n\n\n\n\n")

  const workbook = new Workbook();
  const content = await workbook.xlsx.load(data.buffer);
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

  return attProducts;
}
