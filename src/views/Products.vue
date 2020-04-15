<template>
  <div class="products">
    <button @click="addNew()" type="submit" class="btn btn-primary">
      Add
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
                {{product.name}}
              </td>
              <td>
                {{product.price}}
              </td>
              <td>
                <button class="btn btn-primary" @click="editProduct(product)">Eidt</button>
                <button class="btn btn-danger" @click="deleteProduct(product['.key'])">Delete</button>
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
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              @click="updateProduct()"
              type="button"
              class="btn btn-primary"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Button trigger modal -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="addnew"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
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
            <div class="container-fluid">
              <div class="row">
                <div class="col-sm-7">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Product name"
                      v-model="product.name"
                    />
                  </div>
                  <div class="form-group">
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      v-model="product.des"
                    ></textarea>
                  </div>
                </div>
                <div class="col-sm-5">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Product price"
                      v-model="product.price"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Product tag"
                      v-model="product.tag"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="file"
                      class="form-control-file"
                      id="exampleFormControlFile1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button @click="addProduct()" type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase";
import 'firebase/firestore';

export default {
  name: "Products",
  props: {
    msg: String,
  },
  data() {
    return {
      product: {
        name: null,
        des: null,
        price: null,
        tag: null,
        image: null
      },
      products: [],
      itemActive: null,
    };
  },
  firestore () {
    return {
      products: db.collection('products'),
    }
  },
  methods: {
    addNew() {
      $("#addnew").modal("show");
    },
    deleteProduct(id) {
      Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
          this.$firestore.products.doc(id).delete()
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    },
    editProduct(producta) {
      this.product = product;
     $("#addnew").modal("show");
    },
    updateProduct() {
      
    },
    readData() {
     
    },
    addProduct() {
      this.$firestore.products.add(this.product);
      $("#addnew").modal("hide");
    },
    resetData() {
      Object.assign(this.$data, this.$options.data());
    },
  },
  created() {
    this.readData();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
