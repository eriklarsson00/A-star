// import { connection } from './connect.js'


export const dbFunctions = {
    getProducts,
    
};

function getProducts() {
    connection.query("SELECT * FROM Products", function (err, result) {
        if (err) {
            console.log("ERROR in getProducts");
            return;
        }
        return result;
    })
    return "Hej";
}

/*
const addSupplier = (name, phone) => {
    let insertQuery = `INSERT INTO Supplier (name, phone) VALUES (${name}, ${phone})`
    connection.query(insertQuery, (err) => {
        if (err) {
            console.log("Error in addSupplier " + err);
            return;
        } else {
            console.log("Supplier " + name + " was added");
        }
    })
}

const getSupplierNames = () => {
    return connection.query("SELECT name FROM Supplier", (err, rows) => {
        if (err) {
            console.log("Error in getSupplierNames " + err);
            return;
        } else {
            return rows;
        }
    })
}

const getSupplierId = (name) => {
    return connection.query(`SELECT id from Supplier WHERE name='${name}'`, (err, rows) => {
        if (err) {
            console.log("Error in getSupplierId " + err);
            return;
        } else {
            return rows;
        }
    })
}

const getSupplier = (id) => {
    return connection.query(`SELECT * from Supplier WHERE id='${id}'`, (err, rows) => {
        if (err) {
            console.log("Error in getSupplierId " + err);
            return;
        } else {
            return rows;
        }
    })
}

const addProduct = (code, price, quantity, supplierId) => {
    var insertProduct = `INSERT INTO Products (code, quantity, price) VALUES ('${code}', ${quantity}, '${price}')`;
    connection.query(insertProduct, function (err) { //TODO kanske lägg till await om IDt fuckat
        if (err) {
            console.log("ERROR in addProduct query adding product");
            return;
        }
        else {
            console.log("product " + code + "added successfully");
        }
    })
    var select = `SELECT id FROM Products WHERE code='${code}`
    var product_id = connection.query(select, function (err) {
        if (err) {
            console.log("ERROR in fetching id :((");
            return;
        }
        else {
            console.log("fetched id :" + id + "from code:" + code);
        }
    })
    var insertProductSupplier = `INSERT INTO ProductSupplier (product_id, supplier_id) VALUES ('${product_id}', '${supplierId}')`
    connection.query(insertProductSupplier, function (err) {
        if (err) {
            console.log("ERROR in addProduct query adding in ProductSupplier");
            return;
        }
        else {
            console.log("product " + code + "added successfully in ProductSupplier :)");
        }
    })
}

const getSuppliers = () => {
    connection.query("SELECT * FROM Suppliers", function (err, result) {
        if (err) {
            console.log("ERROR in getSuppliers");
            return;
        }
        return result;
    })
}

const getOrders = () => {
    connection.query("SELECT * FROM Orders", function (err, result) {
        if (err) {
            console.log("ERROR in getOrders");
            return;
        }
        return result;
    })
}

const placeOrder = (product_id, quantity) => {
    connection.query(`SELECT * FROM Products WHERE id='${id}`, function (err, result) {
        if (err) {
            console.log("ERROR in getOrders");
            return;
        }
        if (result.quantity <= quantity) {
            var new_quant = result.quantity - quantity;
            updateProductQuantity(product_id, new_quant) //uppdaterar quant till nya
        }
        else {
            console.log("ERROR order quantity is too large"); // TODO throw exp?
            return;
        }
        let insertOrder = `INSERT INTO Orders (product_id, quantity) VALUES (${product_id}, ${quantity})`
        connection.query(insertOrder, function (err) {
            if (err) {
                console.log("ERROR in placeOrder adding to Orders");
                return;
            }
            else {
                console.log("order added successfully");
            }
        })
    })
}

const getProductSuppliers = () => {
    connection.query("SELECT * FROM ProductSuppliers", function (err, result) {
        if (err) {
            console.log("ERROR in getProductSuppliers");
            return;
        }
        return result;
    })
}

const updateProductPrice = (id, price) => {
    var product = "UPDATE Products SET price = ? where id = ?"
    connection.query(product, [price], [id], (err) => {
        if (err) {
            console.log(err);
        }
    })
}

const updateProductQuantity = (id, quantity) => {
    var x = "UPDATE Products SET supplier = ? where quantity = ?";
    connection.query(x, [quantity], [id], (err) => {
        if (err) {
            console.log(err);
        }
    })
}

const updateProductSupplierId = (id, supplierId) => {
    var x = "UPDATE ProductSupplier SET supplier = ? where product = ?";
    connection.query(x, [supplierId], [id], (err) => {
        if (err) {
            console.log(err);
        }
    })
}

const deleteProduct = (id) => {
    var deleteProduct = "DELETE FROM Products WHERE id = ?";
    connection.query(deleteProduct, [id], (err) => {
        if (err) {
            console.log(err);
        }
    })
}

const deleteSupplier = (id) => {
    var deleteProduct = "DELETE FROM Supplier WHERE id = ?";
    connection.query(deleteProduct, [id], (err) => {
        if (err) {
            console.log(err);
        }
    })
}*/

