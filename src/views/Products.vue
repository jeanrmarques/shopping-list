<template>
  <main class="products">
    <div class="container">
      <div class="row align-items-start justify-content-center">
        <div class="col-lg-6">
          <div class="card">
            <AddProduct />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <ProductsListComponent />
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
    return {};
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
