<template>
  <div class="productForm">
    <div class="container">
      <div class="row mb-3">
        <div class="col">
          <label class="form-label">Name</label>
          <input v-model="product.name" type="text" class="form-control" />
        </div>
      </div>
      <div class="row mb-3">
        <input v-model="product.id" type="hidden" />
        <div class="col-5">
          <label class="form-label">Brand</label>
          <input v-model="product.brand" type="text" class="form-control" />
        </div>
        <div class="col-3">
          <label class="form-label">Size</label>
          <input
            v-model="product.quantity"
            type="number"
            min="0"
            class="form-control"
          />
        </div>
        <div class="col-4">
          <label class="form-label">Unit</label>
          <select v-model="product.unit" class="form-select">
            <option></option>
            <option value="g">Gram</option>
            <option value="Kg">Kilogram</option>
            <option value="ml">Mililiter</option>
            <option value="L">Liter</option>
            <option value="Un">Unit</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <label class="form-label">Category</label>
          <select v-model="product.category" class="form-select">
            <option></option>
            <option value="0">Baby</option>
            <option value="1">Beer, Wine & Spirits</option>
            <option value="2">Beverages</option>
            <option value="3">Bread & Bakery</option>
            <option value="4">Breakfast & Cereal</option>
            <option value="5">Canned Goods & Soups</option>
            <option value="6">Condiments/Spices & Bake</option>
            <option value="7">Cookies, Snacks & Candy</option>
            <option value="8">Dairy, Eggs & Cheese</option>
            <option value="9">Deli & Signature Cafe</option>
            <option value="10">Flowers</option>
            <option value="11">Frozen Foods</option>
            <option value="12">Fruits & Vegetables</option>
            <option value="13">Grains, Pasta & Sides</option>
            <option value="14">International Cuisine</option>
            <option value="15">Meat & Seafood</option>
            <option value="16">Miscellaneous</option>
            <option value="17">Paper Products</option>
            <option value="18">Cleaning Supplies</option>
            <option value="19">Health & Beauty</option>
            <option value="20">Personal Care & Pharmacy</option>
            <option value="21">Pet Care</option>
            <option value="22">Pharmacy</option>
            <option value="23">Tobacco</option>
          </select>
        </div>
        <div class="col-3">
          <label class="form-label">Price</label>
          <input
            v-model="product.price"
            type="number"
            min="0"
            class="form-control"
            step=".01"
          />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">

        </div>
        <div class="col-3">        
          <a v-if="product.id" @click="reset" class="w-100 btn btn-primary"
            ><i class="fas fa-save"></i> Cancel</a
          >
        </div>        
        <div class="col-3">
          <a @click="save" class="w-100 btn btn-primary"
            ><i class="fas fa-save"></i> Save</a
          >
        </div>        
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "addProduct",
  props: {
    editing: {
      type: Object,
    },
  },
  watch: {
    editing: function () {
      this.product = JSON.parse(JSON.stringify(this.editing));
    },
  },
  data() {
    return {
      product: JSON.parse(JSON.stringify(this.editing)),
    };
  },
  methods: {
    ...mapActions(["addProduct", "addNewProduct", "updateProduct"]),
    save() {
      if (this.product.id) {
        console.log("update");
        this.updateProduct(this.product);
      } else {
        console.log("add");
        this.addNewProduct(this.product);
      }
      this.reset();
    },
    reset() {
      this.product = {
        name: "",
        brand: "",
        category: "",
        quantity: 0,
        unit: null,
        price: 0,
        id: null,
      };
      this.$emit("savedproduct", this.product);
    },    
  },
};
</script>

<style scoped lang="scss">
.productForm {
  padding: 1em 0;
  text-align: left;
}

.btn-primary {
  background: #114646 !important;
  border-color: #114646;

  i {
    margin-right: 0.3em;
  }
}
</style>
