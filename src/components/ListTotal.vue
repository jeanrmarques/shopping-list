<template>
  <div class="listTotal">
    <i v-if="icon" class="fas fa-coins"></i> Total: $
    {{ totalOnList.bought }}
    <span v-if="totalOnList.potential != totalOnList.bought"
      >(${{ totalOnList.potential }})</span
    >
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";

export default {
  name: "ListTotal",
  props: {
    activeList: String,
    icon: Boolean,
  },
  computed: {
    ...mapGetters(["getTotals"]),
    totalOnList: function () {
      return this.getTotals(this.activeList);
    },
  },
};
</script>

<style scoped lang="scss">
.listTotal {
  text-align: right;
  font-size: 1.5em;
  font-weight: bold;

  i {
    float: left;
    margin-top: 0.3em;
  }
}
</style>
