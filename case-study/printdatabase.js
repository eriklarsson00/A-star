const queryGen = require('./query')
const mysql = require('mysql');


var connection = mysql.createConnection({
    host: 'casestudy-mysql.cux8adwumflc.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    database: 'casestudy',
    password: 'casestudysql',
});

connection.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});


connection.query(queryGen.getId("Products", "1"), function (err, result) {
    if (err) {
        console.log("ERROR in getProducts");
        return;
    }
    console.log("Id 1:");
    console.log(result);
});

connection.query(queryGen.getAll("Products"), function (err, result) {
    if (err) {
        console.log("ERROR in getProducts");
        return;
    }
    console.log("Products:");
    console.log(result);
});

connection.query(queryGen.getAll("Orders"), function (err, result) {
    if (err) {
        console.log("ERROR in Orders");
        return;
    }
    console.log("Orders:");
    console.log(result);
});

connection.query(queryGen.getAll("Supplier"), function (err, result) {
    if (err) {
        console.log("ERROR in Suppliers");
        return;
    }
    console.log("Suppliers:");
    console.log(result);
});

connection.query(queryGen.getAll("ProductSupplier"), function (err, result) {
    if (err) {
        console.log("ERROR in ProductSupplier");
        return;
    }
    console.log("Product Suppliers:");
    console.log(result);
});

connection.end();