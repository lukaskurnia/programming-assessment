<script>
export default {
  name: "ResetButton",
  methods: {
    reset() {
      localStorage.clear();
      location.reload();
    },
  },
};
</script>

<template>
  <div @click="reset" :class="$style.reset">Reset</div>
</template>

<style lang="scss" module>
.reset {
  position: fixed;
  right: 2rem;
  bottom: 1rem;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  background: red;
  cursor: pointer;
  color: white;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(red, 0.16);

  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s all ease;

  &:hover {
    transform: translateY(-3px);
    background-color: lighten(red, 10);
  }

  &:active {
    transform: scale(0.9);
  }
}
</style>
