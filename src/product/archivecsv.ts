import * as json2csv from 'json2csv';
import * as uuid from 'uuid';
import * as fs from 'fs';

const fields = [
  'id',
  'code',
  'name',
  'image',
  'description',
  'category',
  'price',
  'inventory  ',
];

const opts = { fields };

class exportFiles {
    tocsv = function (news) {
        try{
            const csv = await json2csv.parseAsync(news, opts);
            const filenames = uuid.v4() + ".csv"
            fs.writeFile("./exports/"+ filenames, csv, function(err){
                if(err) throw err;
                console.log("Arquivo salvo com sucesso")
                
            });
            return filenames
        } catch (error) {
            console.log(error)
            
        }
    }



