const fs = require('fs');
const mysql = require('mysql2');
const connection = mysql.createConnection({
//  host: 'localhost',
//  user: 'root',
//  password: '',
//  database: 'nextdaye_ekkasith_ans_main_db'

 host: '45.91.132.26',
 user: 'anousithdatacent',
 password: '\\o9Y*C.36w!Y',
 database: 'anousith_main_data_center'
});
if(connection){
 console.log('Database is connected');
}else{
 console.log('Database is not connected');
}
const sql = `SELECT * FROM ans_items WHERE FROM_UNIXTIME(CreatedDate) BETWEEN "2022-05-01" AND "2022-05-10"`;
console.log("===>",sql);
connection.query(
 sql,

 function (err, result, fields) {
  const objectData = [];
  for (let i = 0; i < result.length; i++) { 
   const object = {
    trackingId: result[i].trackingNumber,
    itemName: result[i].itemName,
    customerId: result[i].id_profile,
    isPublic: true,
    createdAt:new Date(),
    updatedAt:new Date()
   }
   objectData.push(object);

  };
  console.log(objectData);
  // create file json
  fs.writeFile('./MbJson/20_28.json', JSON.stringify(objectData), (err) => {
   if (err) throw err;
   console.log('The file has been saved!');
  });
 }
);



