<template>
  <div class="listForm">
    <div class="container">
      <h4 v-if="list.id">Edit List</h4>
      <h4 v-else>Add List</h4>
      <div class="row mb-3">
        <div class="col">
          <label class="form-label">Name</label>
          <input v-model="list.name" type="text" class="form-control" />
        </div>
      </div>
      <div class="row mb-3">
        <input v-model="list.id" type="hidden" />
        <div class="col-5">
          <label class="form-label">Budget</label>
          <input
            v-model="list.budget"
            type="number"
            min="0"
            class="form-control"
            step=".01"
          />
        </div>
        <div class="col-3">
          <label class="form-label">Active</label>
          <input
            v-model="list.active"
            type="checkbox"
            class="form-check-input"
          />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-2 col-md-6"></div>
        <div class="col-5 col-md-3">
          <a v-if="list.id" @click="reset" class="w-100 btn btn-primary"
            ><i class="fas fa-save"></i> Cancel</a
          >
        </div>
        <div class="col-5 col-md-3">
          <a @click="save" class="w-100 btn btn-primary"
            ><i class="fas fa-save"></i> Save</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "addList",
  props: {
    editing: {
      type: Object,
    },
  },
  watch: {
    editing: function () {
      this.list = JSON.parse(JSON.stringify(this.editing));
    },
  },
  data() {
    return {
      list: JSON.parse(JSON.stringify(this.editing)),
    };
  },
  methods: {
    ...mapActions(["addList", "updateList"]),
    save() {
      if (this.list.id) {
        console.log("update");
        this.updateList(this.list);
      } else {
        console.log("add");
        this.addList(this.list);
      }
      this.reset();
    },
    reset() {
      this.list = {
        owner: null,
        name: "",
        active: false,
        budget: null,
        createdAt: null,
        id: null,
      };
      this.$emit("savedlist", this.list);
    },
  },
};
</script>

<style scoped lang="scss">
.listForm {
  padding: 1.5rem 0;
  text-align: left;
}

.btn-primary {
  background: #114646 !important;
  border-color: #114646;

  i {
    margin-right: 0.3em;
  }
}
</style>
