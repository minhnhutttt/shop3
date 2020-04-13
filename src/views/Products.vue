<template>
  <div class="products">
    <div class="form-group">
    <input type="text" v-model="product.name" class="form-control" id="exampleInputEmail1"  placeholder="Product name">
  </div>
  <div class="form-group">
    <input type="text" v-model="product.price" class="form-control" id="exampleInputPassword1" placeholder="Price">
  </div>
  <button @click="saveData" type="submit" class="btn btn-primary">Submit</button>
  </div>
</template>

<script>
import {fb,db} from '../firebase'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      product: {
        name: null,
        price: null
      }
    }
  },
  methods: {
    saveData () {
        db.collection("products").add(this.product)
      .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          this.resetData();
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
    }, 
    resetData () {
      Object.assign(this.$data, this.$options.data());
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
