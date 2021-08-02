<template>
  <main class="lists">
    <div class="container">
      <div class="row align-items-start justify-content-center">
        <div class="col-lg-6 mb-3">
          <div class="card">
            <AddList
              v-on:savedlist="editing = $event"
              v-bind:editing="editing"
            />
          </div>
        </div>
        <div class="col-lg-6 mb-5">
          <div class="card">
            <ShowListsComponent v-on:editlist="editing = $event" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import ShowListsComponent from "@/components/ShowListsComponent.vue";
import AddList from "@/components/AddList.vue";
import { mapGetters } from "vuex";

export default {
  name: "Lists",
  data() {
    return {
      editing: {
        owner: null,
        name: "",
        active: false,
        budget: null,
        createdAt: null,
        id: null,
      },
    };
  },
  components: {
    ShowListsComponent,
    AddList,
  },
  computed: {
    ...mapGetters(["activeList"]),
  },
};
</script>

<style lang="scss"></style>
