<template>
  <main class="products">
    <div class="container">
      <div class="row align-items-start justify-content-center">
        <div class="col-lg-6">
          <div class="card">
            <AddProduct
              v-on:savedproduct="editing = $event"
              v-bind:editing="editing"
            />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <ProductsListComponent v-on:editproduct="editing = $event" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import ProductsListComponent from "@/components/ProductsListComponent.vue";
import AddProduct from "@/components/AddProduct.vue";
import { mapGetters } from "vuex";

export default {
  name: "Products",
  data() {
    return {
      editing: {
        name: "",
        brand: "",
        category: "",
        quantity: 0,
        unit: null,
        price: 0,
        id: null,
      },
    };
  },
  components: {
    ProductsListComponent,
    AddProduct,
  },
  computed: {
    ...mapGetters(["activeList"]),
  },
};
</script>

<style lang="scss"></style>
