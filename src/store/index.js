import { createStore } from "vuex";
import {
  ProductService,
  ListService,
  UserService,
  ItemService,
} from "../backendService";

export default createStore({
  state: {
    products: [],
    items: [],
    lists: [],
    users: [],
    activeList: null,
  },
  getters: {
    getProducts: (state) => {
      return state.products;
    },
    getActiveListName: (state) => {
      let act = state.lists.filter((list) => list.id == state.activeList);
      if (act && act.length) {
        return act[0].name;
      } else {
        return null;
      }
    },
    getListName: (state) => (id) => {
      let act = state.lists.filter((list) => list.id == id);
      if (act && act.length) {
        return act[0].name;
      } else {
        return null;
      }
    },
    getLists: (state) => {
      return state.lists;
    },
    activeList: (state) => {
      return state.activeList;
    },
    getProductsNotInList: (state) => (list_id) => {
      let items = state.items.filter((item) => item.list === list_id);
      let res = [];
      for (let i = 0; i < state.products.length; i++) {
        let check = items.filter(
          (item) => item.product == state.products[i].id
        );
        if (check.length == 0) {
          res.push(state.products[i]);
        }
      }
      return res;
    },
    getTotals: (state, getters) => (id) => {
      let items = getters.itemsInList(id);
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
    productDetail: (state) => (id) => {
      return state.products.find((product) => product.id === id);
    },
    itemsInList: (state, getters) => (list_id) => {
      let items = state.items.filter((item) => item.list === list_id);
      let resp = [];
      for (let i = 0; i < items.length; i++) {
        let details = getters.productDetail(items[i].product);
        let item = {
          data: items[i],
          details: details,
        };
        resp.push(item);
      }
      return resp;
    },
    getItem: (state, getters) => (id) => {
      let itemData = state.items.find((item) => item.id == id);
      if (itemData) {
        let details = getters.productDetail(itemData.product);
        let item = {
          data: itemData,
          details: details,
        };
        return item;
      }
    },
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
    editProduct(
      state,
      {
        product,
        name = product.name,
        brand = product.brand,
        category = product.category,
      }
    ) {
      product.name = name;
      product.brand = brand;
      product.category = category;
    },
    addProduct(state, product) {
      state.products.push(product);
    },
    removeProduct(state, product) {
      state.items.splice(state.items.indexOf(product), 1);
    },

    editItem(
      state,
      {
        item,
        quantity = item.quantity,
        checked = item.checked,
        price = item.price,
      }
    ) {
      item.quantity = quantity;
      item.checked = checked;
      item.price = price;
    },
    addItem(state, item) {
      state.items.push(item);
    },
    removeItem(state, item) {
      state.items.splice(state.items.indexOf(item), 1);
    },

    setActiveList(state, id) {
      state.activeList = id;
    },
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
    addProduct({ commit }, { name }) {
      let id = Math.floor(Math.random() * 100000);
      let product = {
        id: id,
        name: name,
        brand: "",
        checked: false,
        category: 0,
      };
      commit("addProduct", product);
    },
    newProductInList({ commit }, { list, name, quantity, price }) {
      let id = Math.floor(Math.random() * 100000);
      let item_id = Math.floor(Math.random() * 100000);
      let product = {
        id: id,
        name: name,
        brand: "",
        checked: false,
        category: 0,
      };
      let item = {
        id: item_id,
        list: list,
        product: id,
        checked: false,
        quantity: quantity || 1,
        price: price || 0.0,
      };
      commit("addProduct", product);
      commit("addItem", item);
    },
    removeProduct({ commit }, product) {
      commit("removeProduct", product);
    },
    updateProduct({ commit }, { product, name, brand, category }) {
      commit("editProduct", {
        product,
        name: name,
        brand: brand,
        category: category,
      });
    },

    addItem({ commit }, { list, product }) {
      let id = Math.floor(Math.random() * 100000);
      let item = {
        id: id,
        list: list,
        product: product,
        checked: false,
        quantity: 1,
        price: 0.0,
      };
      commit("addItem", item);
    },
    removeItem({ commit }, item) {
      commit("removeItem", item);
    },
    toggleItem({ commit }, item) {
      commit("editItem", { item, checked: !item.checked });
    },
    changeItemQuantity({ commit }, { item, qty }) {
      commit("editItem", { item, quantity: qty });
    },
    changeItemPrice({ commit }, { item, price }) {
      commit("editItem", { item, price: price });
    },

    setActiveList({ commit }, id) {
      commit("setActiveList", id);
    },
  },
  modules: {},
});
