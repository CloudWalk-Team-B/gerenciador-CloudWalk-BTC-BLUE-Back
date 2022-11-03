import { Workbook } from 'exceljs';
import ExcelJS from 'exceljs';
import { prisma } from '@prisma/client';

export async function dataToExcel(data, user) {
  const workbook = new Workbook
   workbook.created = new Date

  const worksheet = workbook.addWorksheet('Produtos Atualizados')

    worksheet.columns = [
      { header: 'Usuário', key: 'user' },
      { header: 'Data/Hora', key: 'timestamp' },
      { header: 'Produtos', key: 'products' },
      { header: 'Valor Original', key: 'oldPrice' },
      { header: 'Valor Alterado', key: 'newPrice' }
    ];

    const
      userName = user.name,
      products = data.productName,
      oldPrices = data.priceOld,
      newPrices = data.priceAtt,
      timestamp = data.createdAt,
      rows= []

    products.map(product => {
      const
        index = products.indexOf(product),
        data = {
          user:userName,
          timestamp:timestamp,
          products: product,
          oldPrice:oldPrices[index],
          newPrice: newPrices[index]
        }

        rows.push(data)
    })


    worksheet.addRows(rows)

    //transformando a worksheet em buffer para poder enviar para o front
    const buffer = await workbook.xlsx.writeBuffer()

    //Este método salva a worksheet como um arquivo .xlsx no caminho indicado
    //await workbook.xlsx.writeFile('D:/Cenora/Dev/Git e GitHub/bootcamp02/gerenciador-CloudWalk-BTC-BLUE-Back/assets/teste.xlsx')

    return buffer


}
