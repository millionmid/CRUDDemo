//  step one : import major packeges
import mysql from "mysql2";
import express from "express";
import cors from "cors";
//   step two : initialize express
let app = express();
//  step three : middlewares adjust
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// step four : create connection info
let connectionInfo = mysql.createConnection({
  user: "group3",
  password: "group3",
  database: "group3",
  host: "localhost",
});

// : step five : create connection
connectionInfo.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("db connected successfuly");
  }
});

// step seven: create table
app.get("/createTable", (req, res) => {
  let userData = `CREATE TABLE if not exists user_data(
        first_name varchar(255) not null,
        last_name  varchar(255) not null,
        phone_number int  not null,
        address varchar(255) not null
        )`;
  connectionInfo.query(userData, (err, data, field) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send("table created !");
    }
  });
});
// step eight : insert data
app.post("/insertInfo", (req, res) => {
  const { first_name, last_name, phone_number, address } = req.body;
  let insertInfo = `insert into user_data (first_name,last_name,phone_number,address) values ('${first_name}','${last_name}','${phone_number}','${address}')`;
  connectionInfo.query(insertInfo, (err, data, field) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send("data inserted!");
    }
  });
});
// step nine : update data
app.patch("/updateData", (req, res) => {
  const { first_name, last_name, phone_number, address } = req.body;
  let update_firstName = `update user_data set first_name = '${first_name}' where first_name='group' `;
  connectionInfo.query(update_firstName, (err, data, field) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send("data updated!");
    }
  });
});
// step ten: delete datqa
app.delete("/deleteData", (req, res) => {
  const { first_name, last_name, phone_number, address } = req.body;
  let delete_firstName = `delete from user_data where first_name = '${first_name}'`;
  connectionInfo.query(delete_firstName, (err, data, field) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send("data updated!");
    }
  });
});
// step eleven : get all data
app.get("/getAllData", (req, res) => {
  let getData = "SELECT * FROM user_data";
  connectionInfo.query(getData, (err, data, field) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(data);
    }
  });
});

// step six: create server listener
app.listen(9000, () => {
  console.log("server is listening to port 9000");
});
