function deleteQuery(table, condition) {
    return `DELETE FROM ${table} WHERE ${condition}`
}

function updateQuery(table, values, condition) {
    return `UPDATE ${table} SET ${values} WHERE ${condition}`
}

function selectWhereQuery(table, field, condition) {
    return `${selectQuery(table, field)} WHERE ${condition}`
}

function selectQuery(table, field) {
    return `SELECT ${field} FROM ${table}`
}

function insertQuery(table, values) {
    return `INSERT INTO ${table} ${tablevalues(table)} VALUES ${values}`;
}

function tablevalues(table) {
    let values = "";
    switch (table) {
        case "Products":
            values = "(code, quantity, price)";
            break;
        case "Supplier":
            values = "(name, phone)";
            break;
        case "Orders":
            values = "(product_id, quantity)"
            break;
        case "ProductSupplier":
            values = "(product_id, supplier_id)"
    }
    return values;
}

function queryGenerator(type, table, values, field, condition) {
    query = "";
    switch (type) {
        case "INSERT":
            query = insertQuery(table, values);
            break;
        case "SELECT":
            query = selectQuery(table, field);
            break;
        case "SELECTW":
            query = selectWhereQuery(table, field, condition)
            break;
        case "UPDATE":
            query = updateQuery(table, values, condition);
            break;
        case "DELETE":
            query = deleteQuery(table, condition);
            break;
        default:
            throw ("Error");
    }
    return query;
}

function getAll(table) {
    return queryGenerator("SELECT", table, null, "*", null);
}

function get(table, fields, condition) {
    return queryGenerator("SELECTW", table, null, fields, condition)
}

function getId(table, id) {
    return queryGenerator("SELECT", table, null, "*", `id = ${id}`)
}

function add(table, values) {
    return queryGenerator("INSERT", table, values);
}

function remove(table, condition) {
    return queryGenerator("DELETE", table, null, null, condition);
}

function removeId(table, id) {
    return remove(table, `id = ${id}`)
}

function removeCode(table, condition) {
    return remove(table, condition);
}

function update(table, values, condition) {
    return queryGenerator("UPDATE", table, values, null, condition)
}

function updateId(table, values, id) {
    return update(table, values, `id = ${id}`)
}


module.exports = { queryGenerator, getAll, get, getId, add, remove, removeId, update, updateId }