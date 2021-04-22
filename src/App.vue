<script>
import Layout from "./layout";
export default {
  name: "App",
  components: {
    Layout,
  },
};
</script>

<template>
  <layout>
    <router-view />
  </layout>
</template>

<style lang="scss">
body {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: inherit;
  font-family: "Open Sans", sans-serif;
}
</style>
