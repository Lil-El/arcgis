<template>
  <div class="menu">
    <div class="menu-item" v-for="opt in Object.keys(option)" :key="opt">
      <div class="menu-title">
        <span>{{opt}}</span>
      </div>
      <ul class="menu-list">
        <li v-for="item in Object.keys(option[opt])" :key="item">
          <label>
            <template v-if="option[opt][item].type==='checkbox'">
              <input
                :type="option[opt][item].type"
                :checked="option[opt][item].checked"
                @change="option[opt][item].use"
              />
              {{option[opt][item].label}}
            </template>
            <template v-else>
              <div>
                <button @click="option[opt][item].use">{{option[opt][item].label}}</button>
                <button @click="option[opt][item].unActive">unActive</button>
                <button @click="option[opt][item].clear">clear</button>
              </div>
              <button></button>
            </template>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getCurrentInstance } from "vue";
import option from "@/arcgis/option";
export default {
  setup () {
    return { option };
  },
};
</script>

<style lang="scss" scoped>
.menu {
  width: 250px;
  .menu-item {
    .menu-title {
      padding: 0 10px;
      height: 32px;
      line-height: 32px;
      font-weight: bold;
      background-color: #ccc;
      user-select: none;
    }
    .menu-list {
      list-style: none;
      margin: 0px 10px;
      label {
        user-select: none;
        input {
          margin-right: 5px;
        }
      }
      li {
        height: 28px;
        line-height: 28px;
      }
    }
  }
}
</style>