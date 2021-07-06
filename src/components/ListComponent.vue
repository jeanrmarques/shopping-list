<template>
  <div v-if="activeList" class="card">
    <div class="card-header">
      <h5><i class="fas fa-list-ul"></i> {{ getListName(activeList) }}</h5>
      <i id="btnDeleteList" class="fas fa-times"></i>
    </div>
    <div class="card-body">
      <AddItem :activeList="activeList" />
      <div class="activeList">
        <div class="productsOnList list-group">
          <ListItemComponent 
            :key="index"
            v-for="(p, index) in itemsInList(activeList)"
            :p="p"
            />
        </div>
      </div>
    </div>
    <div class="card-footer">
      <ListTotal :activeList="activeList" icon="true" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AddItem from "@/components/AddItem.vue";
import ListItemComponent from "@/components/ListItemComponent.vue";
import ListTotal from "@/components/ListTotal.vue";
import { mapGetters } from "vuex";

export default {
  name: "ListComponent",
  props: {
    activeList: String,
  },
  components: {
    AddItem,
    ListItemComponent,
    ListTotal,
  },
  methods: {
    listProgress(prods) {
      let len = prods.length;
      let count = 0;
      let pct = 0;
      for (let i = 0; i < len; i++) {
        if (prods[i].checked) {
          count++;
        }
      }
      pct = (count * 100) / len;

      return parseInt(pct);
    },
  },
  computed: {
    ...mapGetters(["itemsInList", "getListName"]),
  },
};
</script>

<style scoped lang="scss">
.card {
  h3,
  h4,
  h5 {
    margin: 0;
  }

  .card-header,
  .card-footer {
    position: relative;
    color: #fff;
    background: #114646;
    #btnDeleteList {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(-100%, -50%);
      cursor: pointer;
    }
  }
}
</style>
