<template>
    <div class="AddItem">
        <select v-if="getProductsNotInList(activeList).length > 0" class="form-select form-select-lg mb-3" @change="addItemToList(activeList, $event)">
            <option value=null >Select an existing product to add it to the list or...</option>
            <option
            :key="index"
            v-for="(p, index) in getProductsNotInList(activeList)"
            :value="p.id"
            >
            {{ p.name }}
            </option>
        </select>
        <div id="addItemRow">
            <span @click="newProductInList({list: activeList, ...newItemInList})" class="addItem btn btn-success ms-3"
                ><i class="fa fa-plus"></i
            ></span>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
            </div>                    
            <input
                id="newProductQty"
                class="form-control me-3"
                type="number"
                min="0"
                v-model="newItemInList.quantity"
            />
            <input
                type="text"
                id="newProductName"
                class="form-control"
                placeholder="Add a new product"
                v-model="newItemInList.name"
            />
            <div class="price">
                $
                <input
                id="newProductPrice"
                class="form-control"
                type="number"
                min="0"
                step=".01"
                v-model="newItemInList.price"
                />
            </div>                  
        </div>
    </div>
</template>
 
<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: '',
    props: {
        activeList: String,
    },    
    data() {
        return {
            newItemInList: {
                name : "",
                quantity: 1,
                price: 0,
                id: null
            }
        }
    },
    methods: {
        ...mapActions([
        "newProductInList",
        "addItem"
        ]),  
        addItemToList(list, e) {
        let product = e.target.value;
        this.addItem({ list, product });
        e.target.value = "";
        },
    },
    computed: {
        ...mapGetters([
        "getProductsNotInList"
        ]),
    }    
};
</script>
 
<style scoped lang='scss'>
#newProductName {
  display: inline-block;
  width: 45%;
} 
</style>