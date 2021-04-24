<script>
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
export default {
  name: "Layout",
  components: { Sidebar, Navbar },
  data() {
    return {
      isSidebar: false,
      isNavbar: false,
    };
  },
  computed: {
    layoutClass() {
      const { layout, noSidebar } = this.$style;
      if (this.isSidebar) {
        return [layout];
      }
      return [noSidebar];
    },
  },
  watch: {
    $route(to) {
      this.isSidebar = to.meta.sidebar;
      this.isNavbar = to.meta.navbar;
    },
  },
};
</script>

<template>
  <div :class="layoutClass">
    <Sidebar v-if="isSidebar" />
    <div :class="$style.container">
      <Navbar v-if="isNavbar" />
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" module>
.layout {
  display: grid;
  grid-template-columns: 5% auto;
  width: 100%;
  background: #eef5f9;
}

.noSidebar {
  display: initial;
}

.container {
  background: #eef5f9;
  height: 100%;
  min-height: 100vh;
}
</style>
