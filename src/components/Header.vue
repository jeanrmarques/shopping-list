<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <a class="navbar-brand me-3 ms-3"
        ><i class="fas fa-shopping-basket"></i> {{ title }}
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link active" aria-current="page" href="#"
            ><i class="fas fa-home"></i> Home</a
          >
          <a
            class="nav-link disabled"
            href="#"
            tabindex="-1"
            aria-disabled="true"
            ><i class="fas fa-info"></i> About</a
          >
          <a
            class="nav-link disabled"
            href="#"
            tabindex="-1"
            aria-disabled="true"
            ><i class="fas fa-carrot"></i> Products</a
          >
          <a
            class="nav-link disabled"
            href="#"
            tabindex="-1"
            aria-disabled="true"
            ><i class="fas fa-list-ul"></i> Lists</a
          >
          <a
            class="nav-link disabled"
            href="#"
            tabindex="-1"
            aria-disabled="true"
            ><i class="fas fa-chart-bar"></i> Stats</a
          >
          <a
            class="nav-link disabled"
            href="#"
            tabindex="-1"
            aria-disabled="true"
            ><i class="fas fa-user-plus"></i> Register</a
          >
        </div>
      </div>
      <form class="d-flex">
        <a href="#" class="btn btn-dark me-3"
          ><i class="fas fa-sign-in-alt"></i> Login</a
        >
        <div class="Select List">
          <select
            class="form-select form-select"
            @change="selectedList($event)"
          >
            <option value="">Select a list</option>
            <option :key="index" v-for="(l, index) in getLists" :value="l.id">
              {{ l.name }}
            </option>
          </select>
        </div>
      </form>
    </div>
  </nav>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Header",
  props: {
    title: String,
  },
  methods: {
    ...mapActions(["setActiveList"]),
    selectedList(e) {
      let list_id = e.target.value;
      if (list_id && list_id.length > 0) {
        this.setActiveList(list_id);
      } else {
        this.setActiveList(null);
      }
    },
  },
  computed: {
    ...mapGetters(["getLists", "activeList"]),
  },
};
</script>

<style scoped lang="scss">
.navbar {
  background: #114646;
  margin-bottom: 1em;
}
.navbar-brand {
  // font-family: 'Comfortaa', cursive;
  padding: 0;
  font-size: 1.5em;
  color: #fff;
}
</style>
