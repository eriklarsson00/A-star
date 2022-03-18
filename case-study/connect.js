const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'casestudy-mysql.cux8adwumflc.us-east-1.rds.amazonaws.com',
  port: '3306',
  user: 'admin',
  database: 'casestudy',
  password: 'casestudysql',
});

/*
function insertQuery(table, values) {
  let tablevalues = "";
  switch (table) {
    case "Products":
      tablevalues = "(code, quantity, price)";
      break;
    case "Supplier":
      tablevalues = "(name, phone)";
      break;
    case "Orders":
      tablevalues = "(product_id, quantity)"
      break;
  }
  return `INSERT INTO ${table} ${tablevalues} VALUES ${values}`
}



export const deleteProduct = (id) => {
  connection.query("DELELTE FROM Products WHERE id= ?", [id], (err) => {
    if(err){
      console.log(err);
    }
  })
}

function deleteProduct(connection, name, id, supplierId) {
  
}

function updateProduct(connection, name, id, quantity) {
  
}

function selectProduct(connection, name, id) {

}
connection.connect(function (err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

connection.query("UPDATE Products SET price = '100' where id='1' ", function (err, tables) {
  if (err) {
    console.log("Error")
  }
  console.log("WE DID IT AGAIN :)")
});

connection.query("SELECT * FROM Products", function (err, tables) {
  if (err) {
    console.log("Error")
  }
  console.log("WE DID IT AGAIN :)")
  console.log(tables);
});

connection.query("DELETE FROM Products WHERE id='1'", function (err, tables) {
  if (err) {
    console.log("Error");
    throw err;
  }
  console.log("WE DELETED:)")
});

connection.query("SELECT * FROM Products", function (err, tables) {
  if (err) {
    console.log("Error")
  }
  console.log("WE DID IT AGAIN :)")
  console.log(tables);
});

function insertQuery(table, values) {
  let tablevalues = "";
  switch (table) {
    case "Products":
      tablevalues = "(code, quantity, price)";
      break;
    case "Supplier":
      tablevalues = "(name, phone)";
      break;
    case "Orders":
      tablevalues = "(product_id, quantity)"
      break;
  }
  return `INSERT INTO ${table} ${tablevalues} VALUES ${values}`
}


connection.end();

*/