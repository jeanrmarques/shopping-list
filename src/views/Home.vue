<template>
  <main class="home">
    <Header title="Shopping List" />

    <ul class="productsOnList">
      <li :key="index" v-for="(p, index) in itemsInList(activeList)">
        <input
          class="form-check-input"
          type="checkbox"
          :input-value="p.data.checked"
          @change="toggleItem(p.data)"          
        />
        <input
          class="form-control"
          type="number"
          min="0"
          :value="p.data.quantity"
          @change="itemQuantityChange(p.data, $event)"
          @keyup="itemQuantityChange(p.data, $event)"
        />
        - {{ p.details.name }} - {{ p.data.price }}
        <div class="price">
          $
          <input
            class="form-control"
            type="number"
            min="0"
            step=".01"
            :value="p.data.price"
            @change="itemPriceChange(p.data, $event)"
            @keyup="itemPriceChange(p.data, $event)"
          />    
          = [ $ {{ (p.data.price * p.data.quantity).toFixed(2) }} ]
        </div>  
      </li>
    </ul>
    <div class="listTotal">
      Total: $ {{ totalOnList(activeList).bought }}
      <span v-if="totalOnList(activeList).potential != totalOnList(activeList).bought"
        >(${{ totalOnList(activeList).potential }})</span
      >
    </div>    
  </main>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "Home",
  data() {
    return {
      activeList : "60d8a265983cb22b34e405ac",
      activeItems : []
    };
  },
  components: {
    Header,
  },
  methods: {
    ...mapActions([
      // 'editItem',
      // 'removeItem',
      'toggleItem',
      'changeItemQuantity',
      'changeItemPrice'
    ]),  
    itemQuantityChange(item, e) {
      let qty = parseInt(e.target.value) || 0;
      this.changeItemQuantity({item, qty});
    },
    itemPriceChange(item, e) {
      let price = parseFloat(e.target.value).toFixed(2);
      console.log('val is: '+ e.target.value);
      if(price.isNaN || e.target.value == ""){
        price = parseFloat(0).toFixed(2);
      }
      this.changeItemPrice({item, price});
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
      'productDetail',
      'itemsInList'
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
    }
  },
  async created() {
    this.$store.dispatch("fetchUsers");
    this.$store.dispatch("fetchLists");
    this.$store.dispatch("fetchProducts");
    this.$store.dispatch("fetchItems");
  },
};
</script>

<style scoped lang="scss">
.lists {
  list-style: none;
  padding: 0;

  .listTotal {
    text-align: right;
    padding: 1em;
    background: #333;
    color: #fff;
    margin: 0 0.5em;
  }
}
ul.productsOnList {
  list-style: none;
  text-align: left;
  padding: 0.5em;

  li {
    padding: 1em;
    background: #ccc;
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
