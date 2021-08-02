<template>
  <div class="listList">
    <div class="container">
      <h4>Lists</h4>
      <div class="row">
        <div class="col-12">
          <ul v-if="getLists.length > 0" class="list-group">
            <li
              class="list-group-item"
              :key="index"
              v-for="(l, index) in getLists"
            >
              <span class="title">
                {{ l.name }}
              </span>

              <div class="controls">
                <i
                  title="Edit"
                  @click="$emit('editlist', l)"
                  class="fas fa-edit"
                ></i>
                <i title="Remove" @click="remove(l)" class="fas fa-times"></i>
              </div>
            </li>
          </ul>
          <div v-else>
            <p>No lists registered.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ShowListsComponent",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["newList", "removeList"]),
    remove(p) {
      console.log("Remove:");
      console.log(p);
    },
  },
  computed: {
    ...mapGetters(["getLists"]),
  },
};
</script>

<style scoped lang="scss">
.listList {
  padding: 1.5rem 0;
  text-align: left;
}
.controls {
  float: right;
  transition: all 0.2s linear;
  pointer-events: none;
  // opacity: 0;
  // transform: scale(.3);

  i {
    display: inline-block;
    margin-left: 0.5em;
    cursor: pointer;
  }
}
.list-group {
  text-align: left;

  li {
    &:hover {
      .controls {
        pointer-events: initial;
        // opacity: 1;
        // transform: scale(1);
      }
    }
  }
}
</style>
