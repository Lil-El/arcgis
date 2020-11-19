const store = { map: null, view: null };

export default function useStore({ map, view }) {
  if (map || view) {
    store.map = map;
    store.view = view;
  }
  return store;
}
