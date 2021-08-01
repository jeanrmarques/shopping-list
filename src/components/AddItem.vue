<template>
  <ul class="list-group">
    <li class="list-group-item">
      <div class="list-item">
        <span @click="addToList()" class="addItem btn btn-success ms-3"
          ><i class="fa fa-plus"></i
        ></span>
        <input
          class="form-control input-quantity me-3"
          type="number"
          min="0"
          v-model="newItemInList.quantity"
        />
        <div v-if="!addNew" class="input-product">
          <select
            class="form-select form-select"
            v-model="newItemInList.product"
            @change="selected"
          >
            <option value="null">Select a product</option>
            <option
              :key="index"
              v-for="(p, index) in getProductsNotInList(activeList)"
              :value="p.id"
            >
              {{ p.brand }} {{ p.name + " " + p.quantity + p.unit }} (${{
                p.price
              }})
            </option>
          </select>
          <span
            class="
              position-absolute
              top-0
              start-0
              translate-middle
              badge
              rounded-pill
              bg-success
            "
          >
            {{ getProductsNotInList(activeList).length }}
          </span>
        </div>

        <input
          v-else
          type="text"
          id="newProductName"
          class="form-control input-product"
          placeholder="Add a new product"
          v-model="newItemInList.name"
        />
        <div v-if="switchEnabled" class="form-check form-switch">
          <input
            title="New Product"
            class="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            v-model="addNew"
            @change="clearForm()"
          />
          <label for="">New</label>
        </div>
        <div class="price">
          $
          <input
            class="form-control"
            type="number"
            min="0"
            step=".01"
            v-model="newItemInList.price"
          />
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "",
  props: {
    activeList: String,
  },
  data() {
    return {
      newItemInList: {
        name: "",
        quantity: 1,
        price: 0,
        product: "null",
      },
      addNew: false,
    };
  },
  methods: {
    ...mapActions(["newProductInList", "addItem"]),
    selected() {
      let selectedProd = this.productDetail(this.newItemInList.product);
      this.newItemInList.price = selectedProd.price;
    },
    addToList() {
      let obj = { list: this.activeList, ...this.newItemInList };
      console.log(obj);
      if (this.addNew) {
        this.newProductInList(obj);
      } else {
        this.addItem(obj);
      }
      if (this.getProductsNotInList(this.activeList).length < 1) {
        this.addNew = true;
      }
      this.clearForm();
    },
    clearForm() {
      this.newItemInList = {
        name: "",
        quantity: 1,
        price: 0,
        product: "null",
      };
    },
  },
  computed: {
    ...mapGetters(["getProductsNotInList", "productDetail"]),
    switchEnabled: function () {
      if (this.getProductsNotInList(this.activeList).length < 1) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.list-group {
  margin-bottom: 1em;

  .list-group-item {
    padding: 1em 0.5em 0.5em;
  }
}

option {
  text-transform: uppercase;
}

.form-check-input {
  &:checked {
    background-color: var(--green);
    border-color: var(--darkgreen);
  }
}

.input-product {
  width: 100%;
  max-width: 45%;
  display: inline-block;
  position: relative;
}

.list-item {
  background: var(--light);
  text-align: left;

  .form-switch {
    position: relative;
    display: inline-block;
    margin-left: 0.5em;

    label {
      font-size: 0.8em;
    }
  }

  .form-check-inline {
    float: left;
    margin-right: 0.6em;
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
