<template>
  <div class="list-item">
    <span @click="removeItem(p.data)" class="removeItem btn btn-danger ms-3"
      ><i class="fa fa-times"></i
    ></span>
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="checkbox"
        :checked="p.data.checked"
        @change="toggleItem(p.data)"
      />
    </div>
    <input
      class="form-control me-3"
      type="number"
      min="0"
      :value="p.data.quantity"
      @change="itemQuantityChange(p.data, $event)"
      @keyup="itemQuantityChange(p.data, $event)"
    />
    <span class="productName">
      {{ p.details.name }}
    </span>
    <div class="price">
      $
      <input
        class="form-control"
        type="number"
        min="0"
        step=".01"
        :value="p.data.price"
        @change="itemPriceChange(p.data, $event)"
      />
      = [ $ {{ (p.data.price * p.data.quantity).toFixed(2) }} ]
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";

export default {
  name: "ListItemComponent",
  props: {
    p: Object,
  },
  methods: {
    ...mapActions([
      "toggleItem",
      "changeItemQuantity",
      "changeItemPrice",
      "removeItem",
    ]),
    itemQuantityChange(item, e) {
      let qty = parseInt(e.target.value) || 0;
      this.changeItemQuantity({ item, qty });
    },
    itemPriceChange(item, e) {
      let price = parseFloat(e.target.value).toFixed(2);
      if (price.isNaN || e.target.value == "") {
        price = parseInt(0);
      }
      this.changeItemPrice({ item, price });
    },
  },
};
</script>

<style scoped lang="scss">
.removeItem {
  display: inline-block !important;
}

.list-item {
  background: #fff;

  .btn {
    float: right;
  }

  input[type="number"] {
    display: inline-block;
    max-width: 60px;
    width: auto;
    text-align: left;
  }

  .price {
    float: right;
    input[type="number"] {
      display: inline-block;
      max-width: 100px;
      width: auto;
      text-align: left;
    }

    .history {
      font-size: 0.5em;
    }
  }
}
</style>
