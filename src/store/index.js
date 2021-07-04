import { createStore } from "vuex";
import { ProductService, ListService, UserService, ItemService } from "../backendService";

export default createStore({
  state: {
    products: [],
    items: [],
    lists: [],
    users: [],
  },
  getters: {
    productDetail: (state) => (id) => {
      return state.products.find(product => product.id === id);
    },
    itemsInList: (state, getters) => (list_id) => {
      let items = state.items.filter(item => item.list === list_id);
      let resp = [];
      for(let i = 0; i < items.length; i++){
        let details = getters.productDetail(items[i].product);
        let item = {
          data: items[i],
          details : details
        };
        resp.push(item);
      }
      return resp;
    }
  },  
  mutations: {
    // Setting up our data
    initializeProducts(state, products) {
      state.products = products;
    },
    initializeLists(state, lists) {
      state.lists = lists;
    },
    initializeUsers(state, users) {
      state.users = users;
    },
    initializeItems(state, items) {
      state.items = items;
    },

    // Basic mutations
    editItem (state, { item, quantity = item.quantity, checked = item.checked, price = item.price }) {
      item.quantity = quantity
      item.checked = checked
      item.price = price
    },
    addItem(state, item){
      state.items.push(item)
    },
    removeItem(state, item){
      state.todos.splice(state.items.indexOf(item), 1)
    }

  },
  actions: {
    // Setting up our store with data from the database
    async fetchProducts({ commit }) {
      let resp;

      try {
        resp = await ProductService.getProducts();
      } catch (err) {
        return;
      }

      commit("initializeProducts", resp);
    },

    async fetchItems({ commit }) {
      let resp;

      try {
        resp = await ItemService.getItems();
      } catch (err) {
        return;
      }

      commit("initializeItems", resp);
    },

    async fetchLists({ commit }) {
      let resp;

      try {
        resp = await ListService.getLists();
      } catch (err) {
        return;
      }

      commit("initializeLists", resp);
    },

    async fetchUsers({ commit }) {
      let resp;

      try {
        resp = await UserService.getUsers();
      } catch (err) {
        return;
      }

      commit("initializeUsers", resp);
    },

    // Interactions

    toggleItem({ commit }, item) {
      commit('editItem', { item, checked: !item.checked });
    },
    changeItemQuantity ({ commit }, {item, qty}) {
      commit('editItem', { item, quantity: qty });
    },
    changeItemPrice ({ commit }, {item, price}) {
      commit('editItem', { item, price: price });
    }
  },
  modules: {},
});
