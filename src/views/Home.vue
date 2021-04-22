<script>
export default {
  name: "Home",
  components: {},
  methods: {
    navigate() {
      this.$router.push({ name: "About", params: { is: 1 } });
    },
  },
};
</script>

<template>
  <div class="home">
    <p>This is Home</p>
    <button @click="navigate">Go to about</button>
  </div>
</template>

<style lang="scss" module>
.icon {
  font-size: 2rem;
  color: blue;
}
</style>
