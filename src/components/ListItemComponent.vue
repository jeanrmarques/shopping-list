<template>
  <div :class="[p.data.checked ? 'filled' : '', 'list-group-item']">
    <span @click="removeItem(p.data)" class="removeItem btn btn-danger"
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
      class="form-control input-quantity me-2"
      type="number"
      min="0"
      :value="p.data.quantity"
      :disabled="p.data.checked == true"
      @change="itemQuantityChange(p.data, $event)"
      @keyup="itemQuantityChange(p.data, $event)"
    />
    <span class="productName">
      {{ p.details.brand }}
      {{ p.details.name + " " + p.details.quantity + p.details.unit }}
    </span>
    <div class="price">
      $
      <input
        class="form-control"
        type="number"
        min="0"
        step=".01"
        :value="p.data.price"
        :disabled="p.data.checked == true"
        @change="itemPriceChange(p.data, $event)"
      />
      <input
        class="form-control sum"
        type="text"
        readonly
        :value="'$ ' + (p.data.price * p.data.quantity).toFixed(2)"
      />
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

.list-group-item {
  background: var(--light);
  text-align: left;

  &.filled {
    background: var(--green);
    color: var(--light);

    input[type="text"],
    input[type="number"] {
      background: transparent;
      border-color: transparent;
      color: var(--light);
    }
  }

  .form-check-inline {
    float: left;
    margin-right: 0.6em;
  }

  input {
    box-shadow: none !important;
  }

  .form-check-input {
    width: 2em;
    height: 2em;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s linear;

    &:checked {
      background-color: var(--green);
      border-color: transparent;
      transform: scale(1.5);
    }

    &:hover {
      background-color: var(--green);
    }
  }
  .btn {
    float: right;
  }

  .removeItem {
    transform: scale(0.6);
    border-radius: 50%;
  }

  input.sum {
    max-width: 5em;
    display: inline;
  }

  input[type="number"] {
    display: inline-block;
    max-width: 4em;
    width: auto;
    text-align: left;
    padding-right: 0;

    &.input-quantity {
      max-width: 2.5em;
    }
  }

  .productName {
    text-transform: uppercase;
  }

  .price {
    float: right;
    input[type="number"] {
      display: inline-block;
      width: auto;
      text-align: left;
    }

    .history {
      font-size: 0.5em;
    }
  }
}
</style>
