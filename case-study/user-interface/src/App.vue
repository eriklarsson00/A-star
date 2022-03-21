<template>
    <div>
        <h1> A* STORE </h1>
          <div class="products">
            <p>{{products}}</p>
          </div>
        
          <div class="suppliers">
            <p>{{suppliers}}</p>
          </div>

          <div class="productSuppliers">
            <p>{{productSuppliers}}</p>
          </div>
          <div class="orders">
            <p>{{orders}}</p>
          </div>
    </div>
</template>

<script>
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'casestudy-mysql.cux8adwumflc.us-east-1.rds.amazonaws.com',
  port: '3306',
  user: 'admin',
  database: 'casestudy',
  password: 'casestudysql',
});

function getProducts() {
    connection.query("SELECT * FROM Products", function (err, result) {
        if (err) {
            console.log("ERROR in getProducts");
            return;
        }
        return result;
    })
}

export default {
    name: 'App',
    data(){
        return {
            products: [],
            suppliers: [],
            productSuppliers: [],
            orders: [],
        };
    },
    created(){
        this.products = ['apple', 'banana'];
        this.suppliers = ['Seidon', 'Elias'];
         this.productSuppliers = ['Seidon'];
         this.orders = ['orange', 'kiwi'];
        
    },

    methods: {
        async test() {
            this.products = await getProducts();
        }
    }
       
};
</script>
<style>

h1 {
  text-align: center;

}
.products {
  text-align: center;
}
    
</style>