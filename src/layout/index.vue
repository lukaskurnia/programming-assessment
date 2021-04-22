<script>
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
export default {
  name: "Layout",
  components: { Sidebar, Navbar },
};
</script>

<template>
  <div :class="$style.layout">
    <Sidebar />
    <div :class="$style.container">
      <Navbar />
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

.container {
  height: 100%;
  min-height: 100vh;
}
</style>
