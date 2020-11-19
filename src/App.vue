<template>
  <div>
    <h3>Widget:</h3>
    <div>
      <div>
        <label>
          Zoom
          <input type="checkbox" checked @change="chekcWidget('useZoom')" />
        </label>
      </div>
    </div>
    <Map :widgets="state" />
  </div>
</template>

<script>
import { loadModules } from "esri-loader";
import { computed, onMounted, reactive } from "vue";
import Map from "@/components/Map";
export default {
  components: { Map },
  setup() {
    const state = reactive({
      widgets: {},
    });
    return {
      state,
      chekcWidget(type) {
        state.widgets[type] = !state.widgets[type];
      },
    };
  },
};
</script>