import { createStore } from "vuex";
import { ProductService, ListService, UserService } from "../backendService";

export default createStore({
  state: {
    products: [],
    lists: [],
    users: [],
  },
  mutations: {
    saveProducts(state, products){
      state.products = products
    },
    saveLists(state, lists){
      state.lists = lists
    },
    saveUsers(state, users){
      state.users = users
    },
    
  },
  actions: {
    async fetchProducts({ commit }){
      let resp;

      try {
        resp = await ProductService.getProducts();
      } catch (err) {
        return
      }

      commit('saveProducts', resp);
    },

    async fetchLists({ commit }){
      let resp;

      try {
        resp = await ListService.getLists();
      } catch (err) {
        return
      }

      commit('saveLists', resp);
    },

    async fetchUsers({ commit }){
      let resp;

      try {
        resp = await UserService.getUsers();
      } catch (err) {
        return
      }

      commit('saveUsers', resp);
    },
  },
  modules: {},
});
