<template>
  <footer>
    <div class="container-fluid">
      <div class="row">
        <div class="col-4">
          <p v-if="copyright">
            <span class="badge bg-warning text-dark me-3">BETA</span>
            {{ copyright }}
          </p>
        </div>
        <div v-if="activeList" class="col-8">
          <ListTotal :activeList="activeList" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";
import ListTotal from "@/components/ListTotal.vue";

export default {
  name: "Footer",
  props: {
    copyright: String,
  },
  components: {
    ListTotal,
  },
  computed: {
    ...mapGetters(["activeList"]),
  },
};
</script>

<style scoped lang="scss">
footer {
  background: #114646;
  color: #fff;
  padding: 0.5em;
  display: block;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  font-size: 0.8em;

  p {
    margin: 0;
    text-align: left;
  }

  .listTotal {
    font-size: 1em;
    font-weight: normal;
  }
}
</style>
