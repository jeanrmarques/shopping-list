<template>
  <main class="home">
    <Header title="Shopping Tracker" />
    <div class="container">
      <div class="row align-items-center justify-content-center">
        <div class="col-lg-6">
          <div v-if="activeList" class="card">
            <div class="card-header">
              <h5><i class="fas fa-list-ul"></i> {{ getActiveListName }}</h5>
              <i id="btnDeleteList" class="fas fa-times"></i>
            </div>
            <div class="card-body">
              <!-- Add item component -->
              <div class="AddItem">
                <select v-if="getProductsNotInList(activeList).length > 0" class="form-select form-select-lg mb-3" @change="addItemToList(activeList, $event)">
                  <option value=null >Select an existing product to add it to the list or...</option>
                  <option
                    :key="index"
                    v-for="(p, index) in getProductsNotInList(activeList)"
                    :value="p.id"
                  >
                    {{ p.name }}
                  </option>
                </select>
              </div>
              <!-- -->

              <!-- List component -->
              <div class="activeList">
                <ul class="productsOnList list-group">
                  <!-- Add product -->
                  <li id="addItemRow" class="list-group-item">
                    <span @click="newProductInList({list: activeList, ...newItemInList})" class="addItem btn btn-success ms-3"
                      ><i class="fa fa-plus"></i
                    ></span>
                    <input
                      id="newProductQty"
                      class="form-control me-3"
                      type="number"
                      min="0"
                      v-model="newItemInList.quantity"
                    />
                    <input
                      type="text"
                      id="newProductName"
                      class="form-control"
                      placeholder="Add a new product"
                      v-model="newItemInList.name"
                    />
                    <div class="price">
                      $
                      <input
                        id="newProductPrice"
                        class="form-control"
                        type="number"
                        min="0"
                        step=".01"
                        v-model="newItemInList.price"
                      />
                    </div>
                  </li>
                  <!-- -->
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
                <i class="fas fa-coins"></i> Total: $ {{ totalOnList(activeList).bought }}
                <span
                  v-if="
                    totalOnList(activeList).potential !=
                    totalOnList(activeList).bought
                  "
                  >(${{ totalOnList(activeList).potential }})</span
                >
              </div>           
            </div>
          </div>
        </div>
        <!-- <div class="col-lg-6"></div> -->
      </div>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      newItemInList: {
        name : "",
        quantity: 1,
        price: 0
      }
    };
  },
  components: {
    Header,
  },
  methods: {
    ...mapActions([
      // 'editItem',
      // 'removeItem',
      "toggleItem",
      "changeItemQuantity",
      "changeItemPrice",
      "addItem",
      "removeItem",
      "addProduct",
      "newProductInList",
      "removeProduct",
      "updateProduct",
      "setActiveList"
    ]),
    addItemToList(list, e) {
      let product = e.target.value;
      console.log(list, product);
      this.addItem({ list, product });
      e.target.value = "";
    },
    itemQuantityChange(item, e) {
      let qty = parseInt(e.target.value) || 0;
      this.changeItemQuantity({ item, qty });
    },
    itemPriceChange(item, e) {
      let price = parseFloat(e.target.value).toFixed(2);
      console.log("val is: " + e.target.value);
      if (price.isNaN || e.target.value == "") {
        price = parseInt(0);
      }
      this.changeItemPrice({ item, price });
    },
    showStore() {
      console.log(this.$store.state);
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
    ...mapGetters([
      "productDetail",
      "itemsInList",
      "getProducts",
      "getProductsNotInList",
      "getLists",
      "activeList",
      "getActiveListName"
    ]),
    lists: {
      get() {
        return this.$store.state.lists;
      },
      set() {
        console.log("Home.vue : Lists.set() : set");
      },
    },
    users: {
      get() {
        return this.$store.state.users;
      },
      set() {
        console.log("Home.vue : Users.set() : set");
      },
    },
  },
  async created() {
    this.$store.dispatch("fetchUsers");
    this.$store.dispatch("fetchLists");
    this.$store.dispatch("fetchProducts");
    this.$store.dispatch("fetchItems");
  },
};
</script>

<style lang="scss">
.bg-image {
  background: url('../assets/busyconsumers_0.jpg') no-repeat;
  background-size: cover;
  z-index: 1;
  position: fixed;
  left: -2.5vw;
  display: block;
  width: 105vw;
  height: 105vh;
  filter: blur(5px) grayscale(.9);
  top: -2.5vh;  
}

#app {
  position: relative;
  z-index: 2;
  background: #1146467a;
}

main.home {
  min-height: 100vh;
}

.removeItem {
  display: inline-block !important;
}

#newProductName {
  display: inline-block;
  width: 45%;
}

.card {
  h3,h4,h5 {
    margin: 0;
  }

  .card-header, .card-footer {
    position: relative;
    color: #FFF;
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
      margin-top: .3em;
    }
  }
}

.listTotal {
  text-align: right;
  font-size: 1.5em;
  font-weight: bold;
  // padding: 1em;
  // background: #333;
  // color: #fff;
  // margin: 0 0.5em;
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
