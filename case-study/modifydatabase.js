const queryGen = require('./query')
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'casestudy-mysql.cux8adwumflc.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    database: 'casestudy',
    password: 'casestudysql',
});

connection.connect(async function (err) {
    if (err) {
        console.error('Database connection failed: ' + err);
        return;
    }
    console.log('Connected to database.');
    
    testAddProductsAndSuppliers();

    await new Promise(r => setTimeout(r, 3000));
    testUpdateProduct();

    await new Promise(r => setTimeout(r, 5000));
    cleanTestAddProductsAndSuppliers();

    await new Promise(r => setTimeout(r, 10000));
    connection.end();
});

function get(table) {
    connection.query(queryGen.getAll(table), function (err, result) {
        if (err) {
            console.log("Error in get " + err);
            return;
        }
        console.log(table);
        console.log(result);
    });
}

function getFieldCondition(table, field, condition, callback) {
    connection.query(queryGen.get(table, field, condition), function (err, result) {
        if (err) {
            console.log("Error in get " + err);
            return;
        }
        return callback(result)
    });
}

function getId(table, id) {
    connection.query(queryGen.getId(table, id), function (err, result) {
        if (err) {
            console.log("Error in get " + err);
            return;
        }
        console.log(table)
        console.log(result);
    });
}

function getProducts() {
    return get("Products")
}

function getSuppliers() {
    return get("Supplier")
}

function getOrders() {
    return get("Orders")
}

function getProductsSupplier() {
    return get("ProductSupplier")
}

function getProduct(id) {
    return getId("Products", id)
}

function getSupplier(id) {
    return getId("Supplier", id)
}

function getOrder(id) {
    return getId("Order", id)
}

function remove(table, condition) {
    connection.query(queryGen.remove(table, condition), function (err) {
        if (err) {
            console.log("Error when removing " + err);
        }
    });
}

function removeProduct(condition) {
    return remove("Products", condition);
}

function removeSupplier(condition) {
    return remove("Supplier", condition);
}

function removeOrders(condition) {
    return remove("Orders", condition);
}

function removeProductSupplier(condition) {
    remove("ProductSupplier", condition);
}

function update(table, values, condition) {
    connection.query(queryGen.update(table, values, condition), function (err) {
        if (err) {
            console.log("Error when updating " + err);
        }
    });
}


function insert(table, values) {
    connection.query(queryGen.add(table, values), function (err) {
        if (err) {
            console.log("ERROR in inserting products " + err);
            return;
        }
    });
}

function insertProduct(values) {
    return insert("Products", values)
}

function insertSupplier(values) {
    return insert("Supplier", values);
}

function insertOrders(values) {
    return insert("Orders", values);
}

function insertProductSupplier(values) {
    return insert("ProductSupplier", values);
}

function addProduct(supplier, code, quantity, price) {
    supp = null;
    getFieldCondition("Supplier", "*", `name = '${supplier}'`, (result) => {
        supp = result
        conslole.log(supp)
    })
}


function testAddProductsAndSuppliers() {
    console.log("Products and Suppliers before / after inserting: ");
    getProducts();
    getSuppliers();
   
    insertProduct("('KL45',10,30)");
    insertSupplier("('Kalle', 070220200)");

    insertProduct("('AL43',20,99)");
    insertSupplier("('Anders', 076458201)");

    insertProduct("('JP89',30,99)");
    insertSupplier("('Erik', 072452357)");

    insertProduct("('DQLO',50,99)");
    insertSupplier("('Nils', 0302230243)");

    getProducts();
    getSuppliers();
}

function cleanTestAddProductsAndSuppliers() {
    console.log("Products and Suppliers before / after cleaning: ");
    getProducts();
    getSuppliers();

    removeProduct("code = 'KL45'");
    removeSupplier("name = 'Kalle'");

    removeProduct("code = 'AL43'");
    removeSupplier("name = 'Anders'");

    removeProduct("code = 'JP89'");
    removeSupplier("name = 'Erik'");

    removeProduct("code = 'DQLO'");
    removeSupplier("name = 'Nils'");
    
    getProducts();
    getSuppliers();
}

function testUpdateProduct() {
    
    update("Products", "quantity = 1000, price = 1000", "code = 'AL43'");
    update("Products", "quantity = 1000, price = 1000", "code = 'JP89'");
    update("Products", "quantity = 1000, price = 1000", "code = 'DQLO'");
    update("Products", "quantity = 1000, price = 1000", "code = 'KL45'");
    console.log("Products after update: ");
    getProducts();
}
// Test cases

/*testAddProductsAndSuppliers();
testUpdateProduct();
getProducts();
cleanTestAddProductsAndSuppliers();

getProducts();
connection.end();*/