<template>
  <main class="home">
    <div class="container">
      <div class="row align-items-center justify-content-center">
        <div class="col-lg-6">
          <ListComponent :activeList="activeList" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import ListComponent from "@/components/ListComponent.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    ListComponent,
  },
  computed: {
    ...mapGetters(["activeList"]),
  },
  async created() {
    this.$store.dispatch("fetchUsers");
    this.$store.dispatch("fetchLists");
    this.$store.dispatch("fetchProducts");
    this.$store.dispatch("fetchItems");
  },
};
</script>

<style lang="scss"></style>
