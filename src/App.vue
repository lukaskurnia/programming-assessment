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
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </layout>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap");
@import "./styles/components/btn";
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

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.clearfix {
  .mt {
    margin-top: 1rem;
  }

  .code {
    font-family: "Source Code Pro", monospace;
  }
}
</style>
