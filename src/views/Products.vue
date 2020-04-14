<template>
  <div class="products">
    <div class="form-group">
      <input
        type="text"
        v-model="product.name"
        class="form-control"
        id="exampleInputEmail1"
        placeholder="Product name"
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        v-model="product.price"
        class="form-control"
        id="exampleInputPassword1"
        placeholder="Price"
      />
    </div>
    <button @click="saveData" type="submit" class="btn btn-primary">
      Submit
    </button>
    <div class="pt-4">
      <h3 class="d-inline-block">Products list</h3>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Modify</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(product, index) in products" v-bind:key="index">
              <td>
                {{ product.data().name }}
              </td>
              <td>
                {{ product.data().price }}
              </td>
              <td>
                <button @click="editProduct(product)" class="btn btn-primary">
                  Edit
                </button>
                <button
                  @click="deleteProduct(product.id)"
                  class="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="edit"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input
                type="text"
                v-model="product.name"
                class="form-control"
                placeholder="Product name"
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                v-model="product.price"
                class="form-control"
                placeholder="Price"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="updateProduct()" type="button" class="btn btn-primary">Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase";
export default {
  name: "Products",
  props: {
    msg: String
  },
  data() {
    return {
      product: {
        name: null,
        price: null
      },
      products: [],
      itemActive: null
    };
  },
  methods: {
      watcher () {
          db.collection("products").onSnapshot((querySnapshot) => {
            this.products = [];
            querySnapshot.forEach((doc) => {
                this.products.push(doc);
            });
        });

      },
    deleteProduct(id) {
      if (confirm("Are you sure?")) {
        db.collection("products")
          .doc(id)
          .delete()
          .then(() => {
              this.watcher();
            console.log("Document successfully deleted!");
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
      } else {
        console.log("No");
      }
    },
    editProduct(product) {
        $('#edit').modal('show');
        this.itemActive = product.id;
        this.product = product.data();
    },
    updateProduct () {
        db.collection("products").doc(this.itemActive).update(this.product)
        .then(() => {
            $('#edit').modal('hide');
            this.watcher();
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

    },
    readData() {
      db.collection("products")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.products.push(doc);
          });
        });
    },
    saveData() {
      db.collection("products")
        .add(this.product)
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
          this.resetData();
          this.readData();
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    resetData() {
      Object.assign(this.$data, this.$options.data());
    }
  },
  created() {
    this.readData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
