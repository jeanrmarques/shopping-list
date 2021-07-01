<template>
  <main class="home">
    <Header title="Shopping List" />
    
    <Product />
  </main>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Product from "@/components/Product.vue";

export default {
  name: "Home",
  data() {
    return {

    }
  },
  components: {
    Product,
    Header,
  },
  computed: {
    lists: {
      get(){
        return this.$store.state.lists
      },
      set(){
        console.log('Home.vue : Lists.set() : set');
      }
    },
    users: {
      get(){
        return this.$store.state.users
      },
      set(){
        console.log('Home.vue : Users.set() : set');
      }
    }    
  },
  created() {
    this.$store.dispatch('fetchProducts');
    this.$store.dispatch('fetchUsers');
    this.$store.dispatch('fetchLists');
  }
};
</script>
