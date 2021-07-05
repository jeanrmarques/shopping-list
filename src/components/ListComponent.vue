<template>
  <div v-if="activeList" class="card">
    <div class="card-header">
      <h5><i class="fas fa-list-ul"></i> {{ getListName(activeList) }}</h5>
      <i id="btnDeleteList" class="fas fa-times"></i>
    </div>
    <div class="card-body">
      <AddItem :activeList="activeList" />

      <!-- List component -->
      <div class="activeList">
        <ul class="productsOnList list-group">
          <li
            class="list-group-item"
            :key="index"
            v-for="(p, index) in itemsInList(activeList)"
          >
            <span
              @click="removeItem(p.data)"
              class="removeItem btn btn-danger ms-3"
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
          </li>
        </ul>
      </div>
      <!-- -->
    </div>
    <div class="card-footer">
      <div class="listTotal">
        <i class="fas fa-coins"></i> Total: $
        {{ totalOnList(activeList).bought }}
        <span
          v-if="
            totalOnList(activeList).potential != totalOnList(activeList).bought
          "
          >(${{ totalOnList(activeList).potential }})</span
        >
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AddItem from "@/components/AddItem.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ListComponent",
  props: {
    activeList: String,
  },
  data() {
    return {};
  },
  components: {
    AddItem,
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
    listProgress(prods) {
      let len = prods.length;
      let count = 0;
      let pct = 0;
      for (let i = 0; i < len; i++) {
        if (prods[i].checked) {
          count++;
        }
      }
      pct = (count * 100) / len;

      return parseInt(pct);
    },
    totalOnList(list) {
      let items = this.itemsInList(list);
      let sum = parseFloat(0).toFixed(2);
      let checked = parseFloat(0).toFixed(2);
      let len = items.length;
      for (let i = 0; i < len; i++) {
        sum = (
          parseFloat(sum) +
          parseFloat(items[i].data.price * items[i].data.quantity)
        ).toFixed(2);
        if (items[i].data.checked) {
          checked = (
            parseFloat(checked) +
            parseFloat(items[i].data.price * items[i].data.quantity)
          ).toFixed(2);
        }
      }
      return { potential: sum, bought: checked };
    },
  },
  computed: {
    ...mapGetters(["itemsInList", "getListName"]),
  },
};
</script>

<style scoped lang="scss">
.removeItem {
  display: inline-block !important;
}

.card {
  h3,
  h4,
  h5 {
    margin: 0;
  }

  .card-header,
  .card-footer {
    position: relative;
    color: #fff;
    background: #114646;
    #btnDeleteList {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(-100%, -50%);
      cursor: pointer;
    }
  }

  .card-footer {
    i {
      float: left;
      margin-top: 0.3em;
    }
  }
}

.listTotal {
  text-align: right;
  font-size: 1.5em;
  font-weight: bold;
}

ul.productsOnList {
  list-style: none;
  text-align: left;

  li {
    padding: 1em;
    background: #ccc;
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
}
</style>
