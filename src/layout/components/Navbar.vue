<script>
export default {
  name: "Navbar",
};
</script>

<template>
  <div :class="$style.navbar">
    <img
      @click="$router.push({ name: 'Home' })"
      :class="$style.logo"
      src="@/assets/logo-kuliah.png"
    />
    <div :class="$style.accountGroup">
      <font-awesome-icon :class="$style.iconUser" icon="user-circle" />
      <font-awesome-icon :class="$style.iconChevron" icon="chevron-down" />
    </div>
  </div>
</template>

<style lang="scss" module>
.navbar {
  position: sticky;
  top: 0;
  height: 4rem;
  width: 100%;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  padding: 0.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    width: 100%;
    max-width: 200px;
    margin-left: 1rem;
    cursor: pointer;
  }

  .accountGroup {
    padding: 1rem;
    cursor: not-allowed;

    .icon {
      &User {
        font-size: 1.5rem;
      }
      &Chevron {
        margin-left: 0.5rem;
        font-size: 1rem;
      }
    }
  }
}
</style>
