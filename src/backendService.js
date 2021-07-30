import axios from "axios";

// const url = "http://localhost:5555/api/";
const url = "http://localhost:3000/";
// const url = "http://192.168.100.15:3000/";

const user_url = url + "users/";
const product_url = url + "products/";
const list_url = url + "lists/";
const item_url = url + "items/";

class UserService {
  // Add User
  static addUser(user) {
    console.log("addUser API");
    console.log(user);
    return axios.post(user_url, {
      user,
    });
  }

  // Get Users
  static getUsers() {
    console.log("getUsers API");

    const promise = axios.get(user_url).then((response) => response.data);

    return promise;
  }

  // Update User
  static updateUser(user) {
    console.log("updateUser API");
    console.log(user);

    return axios.put(user_url, {
      user,
    });
  }

  // Delete User
  static deleteUser(id) {
    console.log("deleteUser API");
    console.log(id);

    return axios.delete(`${user_url}${id}`);
  }
}

class ProductService {
  // Add Product
  static addProduct(product) {
    console.log("addProduct API");
    console.log(product);
    return axios.post(product_url, product);
  }

  // Get Products
  static getProducts() {
    console.log("getProducts API");

    const promise = axios.get(product_url).then((response) => response.data);

    return promise;
  }

  // Update Product
  static updateProduct(product) {
    console.log("updateProduct API");
    console.log(product);
    let put_url = product_url + product.id;

    return axios.put(put_url, product);
  }

  // Delete Product
  static deleteProduct(id) {
    console.log("deleteProduct API");
    console.log(id);

    return axios.delete(`${product_url}${id}`);
  }
}

class ListService {
  // Add List
  static addList(list) {
    console.log("addList API");
    console.log(list);
    return axios.post(list_url, {
      list,
    });
  }

  // Get Lists
  static getLists() {
    console.log("getLists API");

    const promise = axios.get(list_url).then((response) => response.data);

    return promise;
  }

  // Update List
  static updateList(list) {
    console.log("updateList API");
    console.log(list);

    return axios.put(list_url, {
      list,
    });
  }

  // Delete List
  static deleteList(id) {
    console.log("deleteList API");
    console.log(id);

    return axios.delete(`${list_url}${id}`);
  }
}

class ItemService {
  // Add Item
  static addItem(item) {
    console.log("addItem API");
    console.log(item);
    return axios.post(item_url, {
      item,
    });
  }

  // Get Items
  static getItems() {
    console.log("getItems API");

    const promise = axios.get(item_url).then((response) => response.data);

    return promise;
  }

  // Update Item
  static updateItem(item) {
    console.log("updateItem API");
    console.log(item);

    return axios.put(item_url, {
      item,
    });
  }

  // Delete Item
  static deleteItem(id) {
    console.log("deleteItem API");
    console.log(id);

    return axios.delete(`${item_url}${id}`);
  }
}

export { UserService, ProductService, ListService, ItemService };
