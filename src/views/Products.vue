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
      <div class="" role="document">
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
                    <vue-editor v-model="product.des">

                    </vue-editor>
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
                      @keyup.188="addTag"
                      v-model="tag"
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
            <button @click="addProduct()" type="button" class="btn btn-primary" v-if="modal == 'new'">Save changes</button>
            <button @click="updateProduct()" type="button" class="btn btn-primary" v-if="modal == 'edit'">Update changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase";
import { VueEditor } from "vue2-editor";

export default {
  name: "Products",
  props: {
    msg: String,
  },
   components: {
    VueEditor
  },
  data() {
    return {
      product: {
        name: null,
        des: null,
        price: null,
        tags: [],
        image: null
      },
      products: [],
      itemActive: null,
      modal: null,
      tag: null
    };
  },
  firestore () {
    return {
      products: db.collection('products'),
    }
  },
  methods: {
    addTag() {
      this.product.tags.push(this.tag);
      this.tag = "";
    },
    addNew() {
      this.modal = "new";
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
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })
      }
    })
    },
    editProduct(product) {
      this.modal = 'edit';
      this.product = product;
     $("#addnew").modal("show");
    },
    updateProduct() {
      this.$firestore.products.doc(this.product.id).update(this.product);
      $("#addnew").modal("hide");
      Toast.fire({
          icon: 'success',
          title: 'Update in successfully'
      })
      this.resetData();
    },
    readData() {
     
    },
    addProduct() {
      this.$firestore.products.add(this.product);
      $("#addnew").modal("hide");
      Toast.fire({
          icon: 'success',
          title: 'Save in successfully'
      })
      this.resetData();
    },
    resetData() {
      this.product = {
        name: null,
        des: null,
        price: null,
        tag: null,
        image: null
      }
    }
  },
  created() {
    this.readData();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
