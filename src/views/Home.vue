<template>
  <main class="home">
    <Header title="Shopping List" />
    <!-- <Product /> -->
  </main>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import { ProductService, ListService, UserService } from "../backendService";
// import Product from "@/components/Product.vue";

export default {
  name: "Home",
  data() {
    return {
      products: [],
      lists: [],
      users: [],
    };
  },
  components: {
    // Product,
    Header,
  },
  async created() {
    try {
      this.products = await ProductService.getProducts();
      this.lists = await ListService.getLists();
      this.users = await UserService.getUsers();
    } catch (err) {
      console.log(err);
    }
  },
};
</script>
