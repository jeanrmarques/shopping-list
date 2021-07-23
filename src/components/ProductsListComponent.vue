<template>
  <ul class="list-group">
    <li class="list-group-item" :key="index" v-for="(p, index) in getProducts">
      {{ p.name }}
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProductListComponent",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["newProductInList", "addItem"]),
  },
  computed: {
    ...mapGetters(["getProducts"]),
  },
};
</script>

<style scoped lang="scss">
.list-group {
  padding: 1em;
  text-align: left;
}
</style>
