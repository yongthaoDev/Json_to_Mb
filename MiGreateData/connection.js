const fs = require("fs");
const mysql = require("mysql2");
const connection = mysql.createConnection({
  //  host: 'localhost',
  //  user: 'root',
  //  password: '',
  //  database: 'nextdaye_ekkasith_ans_main_db'

  host: "45.91.132.26",
  user: "anousithdatacent",
  password: "\\o9Y*C.36w!Y",
  database: "anousith_main_data_center",
});
if (connection) {
  console.log("Database is connected");
} else {
  console.log("Database is not connected");
}
const sql = `SELECT trackingNumber,id_profile,itemName FROM ans_items WHERE  FROM_UNIXTIME(CreatedDate)
BETWEEN "2022-05-01" AND "2022-05-27" AND id_item 
IN (SELECT Item_ID FROM ans_item_sent_history)`;
connection.query(sql, function (err, result, fields) {
  const arrTracking = [];
  for (const data of result) {

    if (data?.trackingNumber.length >= 13) {
      const object = {
        trackingId: data.trackingNumber,
        itemName: data.itemName,
        customerId: data.id_profile,
        isPublic: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      arrTracking.push(object);
    }
  }
  // create file json
  fs.writeFileSync("./MbJson/20_28.json", JSON.stringify(arrTracking));
  console.log("success")
});
