// Component HTML
<template>
  <section>
    <h4>Products</h4>
    <ul>
      <li :key="index" v-for="(product, index) in products">
        {{ product.name }}
        <span v-if="product.brand">({{ product.brand }})</span>
        <span v-if="product.price" class="price"
          >${{ product.price.last.value }}</span
        >
      </li>
      <li class="total">Total: ${{ total }}</li>
    </ul>
  </section>
</template>

// Component Javascript
<script>
export default {
  name: "Product",
  computed: {
    products: {
      get() {
        return this.$store.state.products;
      },
      set() {
        console.log("Products.set() : set");
      },
    },
    total: function () {
      let sum = 0;
      let len = this.products.length;
      for (let i = 0; i < len; i++) {
        sum += parseInt(this.products[i].price.last.value);
      }
      return sum;
    },
  },
};
</script>

// Component CSS
<style scoped lang="scss">
ul {
  list-style: none;
  padding: 0;
  text-align: left;

  li {
    display: block;
    padding: 1em;
    border: 1px solid #333;
    background: #c9c9c9;
    margin: 1em;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s linear;
    border-radius: 1em 0 1em 0;

    &:hover {
      background: #333;
      color: #fff;
      border-radius: 0 1em 0 1em;
    }

    .price {
      float: right;
    }

    &.total {
      text-align: right;
      pointer-events: none;
    }
  }
}
</style>
