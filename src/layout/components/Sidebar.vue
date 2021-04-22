<script>
export default {
  name: "Sidebar",
};
</script>

<template>
  <div :class="$style.sidebar">
    <font-awesome-icon :class="$style.icon" icon="bars" />
  </div>
</template>

<style lang="scss" module>
.sidebar {
  background: #272c33;
  display: flex;
  justify-content: center;
  padding: 0 1rem;
  position: relative;
}
.icon {
  position: sticky;
  top: 1.5rem;
  cursor: not-allowed;
  height: fit-content;
  font-size: 1.75rem;
  color: white;
}
</style>
