<script>
import { getCurrentInstance } from "vue";
export default {
  props: ["widgets"],
  inheritAttrs: false,
  setup(props, { emit }) {
    let { widgets } = props;
    let chekcWidget = (type) => {
      widgets = { ...widgets, [type]: !widgets[type] };
      emit("update:widgets", widgets);
    };
    return () => (
      <div class="menu">
        <div class="menu-item">
          <div class="menu-title">
            <span>Widgets</span>
          </div>
          <ul class="menu-list">
            <li>
              <label>
                <input
                  type="checkbox"
                  checked
                  onChange={() => chekcWidget("zoom")}
                />
                Zoom
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  onChange={() => chekcWidget("compass")}
                />
                Compass
              </label>
            </li>
          </ul>
        </div>
      </div>
    );
  },
};
</script>

<style lang="scss">
.menu {
  width: 180px;
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