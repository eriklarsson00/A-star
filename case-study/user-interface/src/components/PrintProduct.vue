<template>
    <div>
        Product: {{this.product.name}}
        Quantity: {{this.product.quantitiy}}
    </div>
</template>
<script>
export default {
   name: 'PrintProducts',
   props:{
       product: Object, //tänker mig att detta är ett objekt som skickas in typ {id: 1, name: "päron", quantitiy: 31}
   },

}
</script>
<style>
    
</style>