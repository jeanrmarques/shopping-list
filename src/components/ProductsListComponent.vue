<template>
  <div class="productList">
    <div class="container">
      <h4>Products</h4>
      <div class="row">
        <div class="col-12">
          <ul v-if="getProducts.length > 0" class="list-group">
            <li
              class="list-group-item"
              :key="index"
              v-for="(p, index) in getProducts"
            >
              <span class="title">
                {{ p.brand }} {{ p.name }} {{ p.quantity }}{{ p.unit }}
              </span>

              <div class="controls">
                <i
                  title="Edit"
                  @click="$emit('editproduct', p)"
                  class="fas fa-edit"
                ></i>
                <i title="Remove" @click="remove(p)" class="fas fa-times"></i>
              </div>
            </li>
          </ul>
          <div v-else>
            <p>No products registered.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
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
    remove(p) {
      console.log("Remove:");
      console.log(p);
    },
  },
  computed: {
    ...mapGetters(["getProducts"]),
  },
};
</script>

<style scoped lang="scss">
.productList {
  padding: 1.5rem 0;
  text-align: left;
}
.controls {
  float: right;
  transition: all 0.2s linear;
  pointer-events: none;
  // opacity: 0;
  // transform: scale(.3);

  i {
    display: inline-block;
    margin-left: 0.5em;
    cursor: pointer;
  }
}
.list-group {
  text-align: left;

  li {
    &:hover {
      .controls {
        pointer-events: initial;
        // opacity: 1;
        // transform: scale(1);
      }
    }
  }
}
</style>
