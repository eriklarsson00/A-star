const mysql = require("mysql");
const util = require("util");
const prompt = require("prompt-sync")();

let config = {
  host: "casestudy-mysql.cux8adwumflc.us-east-1.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  database: "casestudy",
  password: "casestudysql",
};

function makeDb(config) {
  const connection = mysql.createConnection(config);
  return {
    query(sql, args) {
      return util.promisify(connection.query).call(connection, sql, args);
    },
    close() {
      return util.promisify(connection.end).call(connection);
    },
  };
}

async function queryDB(db, query) {
  let result = await db.query(query);
  return result;
}

async function insertSupplier(db, supplier) {
  let sql = mysql.format("INSERT INTO Supplier (name, phone) VALUES (?, ?)", [
    supplier.name,
    supplier.phone,
  ]);
  let response = await queryDB(db, sql);
  console.log(
    `Added supplier: ${supplier.name} with id: ${response.insertId} into database`
  );
  return response.insertId;
}

async function getProduct(db, id) {
  let sql = mysql.format("SELECT * FROM Products WHERE id = ?", id);
  let response = await queryDB(db, sql);
  return response;
}

async function getSupplier(db, supplier) {
  let sql = mysql.format("SELECT * from Supplier WHERE name = ?", supplier);
  let supplierResponse = await queryDB(db, sql);
  return supplierResponse;
}

async function insertProduct(db, product) {
  let sql = mysql.format(
    "INSERT INTO Products (code, quantity, price) VALUES (?, ?, ?)",
    [product.code, product.quantity, product.price]
  );
  let response = await queryDB(db, sql);
  console.log(
    `Added product: ${product.code} with id: ${response.insertId} into database`
  );
  return response;
}

async function insertProductSupplier(db, productId, supplierId) {
  let sql = mysql.format(
    "INSERT INTO ProductSupplier (product_id, supplier_id) VALUES (?, ?)",
    [productId, supplierId]
  );
  await queryDB(db, sql);
}

async function insertOrder(db, order) {
  let sql = mysql.format(
    "INSERT INTO Orders (product_id, quantity) VALUES (?, ?)",
    [order.productId, order.quantity]
  );
  let response = await queryDB(db, sql);
  console.log(
    `Added order on ${order.quantity} ${order.product} with id: ${response.insertId} into database`
  );
  return response;
}

async function getAll(db, table) {
  let sql = mysql.format("SELECT * FROM ??", table);
  return await queryDB(db, sql);
}

async function getProducts(db) {
  let sql = mysql.format(
    "SELECT Products.id, Products.code, Products.quantity, Products.price, Supplier.name as supplier FROM Products " +
      "LEFT JOIN ProductSupplier ON ProductSupplier.product_id = Products.id " +
      "LEFT JOIN Supplier ON Supplier.id = ProductSupplier.supplier_id"
  );
  return await queryDB(db, sql);
}

async function getSuppliers(db) {
  return await getAll(db, "Supplier");
}

async function getOrders(db) {
  let sql = mysql.format(
    "SELECT Orders.id, Products.code as product, Orders.quantity FROM Orders " +
      "LEFT JOIN Products ON Products.id = Orders.product_id"
  );
  return await queryDB(db, sql);
}

async function getProductSupplier(db) {
  let sql = mysql.format("SELECT Products.code as product, Supplier.name as supplier FROM ProductSupplier " +
  "LEFT JOIN Products ON Products.id = ProductSupplier.product_id " +
  "LEFT JOIN Supplier ON Supplier.id = ProductSupplier.supplier_id ")
  return await queryDB(db, sql);
}

async function addOrder(db) {
  let order = {};
  let products = await getProducts(db);
  products.forEach((row) => {
    console.log(JSON.parse(JSON.stringify(row)));
  });
  order.productId = parseInt(prompt("Which product(id) should be ordered: "));
  let product = await getProduct(db, order.productId);
  console.log(product);
  if (!product[0]) {
    console.log("Product not found");
    return;
  }
  order.product = product[0].code;
  order.quantity = parseInt(prompt("How much should be ordered: "));
  if (order.quantity > product[0].quantity) {
    console.log(`Not enough ${order.product} in stock`);
  }
  await insertOrder(db, order);
}

async function updateOrder(db) {
  let orderId = parseInt(prompt("Which order(id) should be updated: "));
  let quantity = parseInt(
    prompt("What quantity should the order be updated to: ")
  );
  let sql = mysql.format("UPDATE Orders SET quantity = ? WHERE id = ?", [
    quantity,
    orderId,
  ]);
  await queryDB(db, sql);
  console.log(`Order with id ${orderId} has been updated`);
}

async function deleteOrder(db) {
  let orderId = parseInt(prompt("Which order(id) should be deleted: "));
  let sql = mysql.format("DELETE FROM Orders WHERE id = ?", orderId);
  await queryDB(db, sql);
  console.log(`Order with id ${orderId} has been deleted`);
}

async function printTable(db) {
  let menu = "[1] Products\n[2] Suppliers\n[3] Orders\n[4] Product Supplier\n";
  let input = prompt(menu);
  let table = [];
  switch (input) {
    case "1":
      table = await getProducts(db);
      break;
    case "2":
      table = await getSuppliers(db);
      break;
    case "3":
      table = await getOrders(db);
      break;
    case "4":
      table = await getProductSupplier(db);
      break;
  }
  table.forEach((row) => {
    console.log(JSON.parse(JSON.stringify(row)));
  });
}

async function addSupplier(db) {
  let supplier = {};
  supplier.name = prompt("What is the name of the supplier: ");
  supplier.phone = prompt("What is the phone number of the supplier: ");
  await insertSupplier(db, supplier);
}

async function updateSupplier(db) {
  let supplierId = parseInt(prompt("Which supplier(id) should be updated: "));
  let name = prompt("What is the new name of the supplier: ");
  let phone = prompt("What is the new phone number: ");
  let sql = mysql.format(
    "UPDATE Supplier SET name = ?, phone = ? WHERE id = ?",
    [name, phone, supplierId]
  );
  await queryDB(db, sql);
  console.log(`Supplier with id ${supplierId} has been updated`);
}

async function deleteSupplier(db) {
  let supplierId = parseInt(prompt("Which supplier(id) should be deleted: "));
  let sql = mysql.format(
    "DELETE FROM ProductSupplier WHERE supplier_id = ?",
    supplierId
  );
  await queryDB(db, sql);
  sql = mysql.format("DELETE FROM Supplier WHERE id = ?", supplierId);
  await queryDB(db, sql);
  console.log(`Supplier with id ${supplierId} has been deleted`);
}

async function addProduct(db) {
  let product = {};
  product.supplier = prompt("Who is the product supplier: ");
  let supplier = await getSupplier(db, product.supplier);
  if (!supplier[0]) {
    console.log("Supplier not found");
    return;
  }
  product.code = prompt("What is the product code: ");
  product.quantity = parseInt(prompt("What is the product quantity: "));
  product.price = parseInt(prompt("What is the product price: "));

  let productResponse = await insertProduct(db, product);
  await insertProductSupplier(db, productResponse.insertId, supplier[0].id);
}

async function updateProduct(db) {
  let productId = parseInt(prompt("Which product(id) should be updated: "));
  let quantity = parseInt(prompt("What is the new product quantity: "));
  let price = parseInt(prompt("What is the new product price: "));
  let sql = mysql.format(
    "UPDATE Products SET quantity = ?, price = ? WHERE id = ?",
    [quantity, price, productId]
  );
  await queryDB(db, sql);
  console.log(`Product with id ${productId} has been updated`);
}

async function deleteProduct(db) {
  let productId = parseInt(prompt("Which product(id) should be deleted: "));
  let sql = mysql.format("DELETE FROM Orders WHERE product_id = ?", productId);
  await queryDB(db, sql);
  sql = mysql.format(
    "DELETE FROM ProductSupplier WHERE product_id = ?",
    productId
  );
  await queryDB(db, sql);
  sql = mysql.format("DELETE FROM Products WHERE id = ?", productId);
  await queryDB(db, sql);
  console.log(`Product with id: ${productId} has been deleted`);
}

async function manageSuppliers(db) {
  let menu = "[1] Add Supplier\n[2] Update Supplier\n[3] Delete Supplier\n";
  let input = prompt(menu);
  switch (input) {
    case "1":
      await addSupplier(db);
      break;
    case "2":
      await updateSupplier(db);
      break;
    case "3":
      await deleteSupplier(db);
      break;
  }
}

async function manageProducts(db) {
  let menu = "[1] Add Product\n[2] Update Product\n[3] Delete Product\n";
  let input = prompt(menu);
  switch (input) {
    case "1":
      await addProduct(db);
      break;
    case "2":
      await updateProduct(db);
      break;
    case "3":
      await deleteProduct(db);
      break;
  }
}

async function manageOrders(db) {
  let menu = "[1] Add Order\n[2] Update Order\n[3] Delete Order\n";
  let input = prompt(menu);
  switch (input) {
    case "1":
      await addOrder(db);
      break;
    case "2":
      await updateOrder(db);
      break;
    case "3":
      await deleteOrder(db);
      break;
  }
}

async function main() {
  const db = makeDb(config);
  let run = true;
  let menu =
    "[1] Print Table \n[2] Manage Suppliers \n[3] Manage Products \n[4] Manage Orders\n[5] Quit Database manager\n\n:";
  console.log("Welcome to the database manager\n");
  while (run) {
    let input = prompt(menu);
    switch (input) {
      case "1":
        await printTable(db);
        break;
      case "2":
        await manageSuppliers(db);
        break;
      case "3":
        await manageProducts(db);
        break;
      case "4":
        await manageOrders(db);
        break;
      case "5":
        run = false;
        break;
      default:
        console.log("Wrong input");
    }
    prompt("Confirm");
  }
  db.close();
}

main();
