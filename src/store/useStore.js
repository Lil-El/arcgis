import { reactive } from "vue";

const store = { map: null, view: null };

export default function useStore({ map, view }) {
  // if (store.map) {
  if (map || view) {
    store.map = map;
    store.view = view;
  }
  return store;
  // } else {
  //   const state = reactive({
  //     map: store.map,
  //     view: store.view,
  //   });
  //   return { ...state };
  // }
}
