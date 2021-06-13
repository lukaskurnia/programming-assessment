<script>
export default {
  name: "StartTutorial",
  methods: {
    skip() {
      this.$emit("skip");
    },
    next() {
      this.$emit("next-step");
    },
  },
};
</script>

<template>
  <div :class="$style.backdrop">
    <div :class="$style.wrapper">
      <p :class="$style.title">
        Hi, It seem’s like you are new with this programming assessment !
      </p>
      <p :class="$style.subtitle">Do you want to see tutorial?</p>
      <div :class="$style.btnGroup">
        <button
          @click="skip"
          :class="$style.skipBtn"
          class="btn btn-primary--alt"
        >
          No, skip tutorial
        </button>
        <button @click="next" class="btn btn-primary">Yes, show me!</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  --modal-animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-name: modalShowUp;
  animation-duration: var(--modal-animation-duration);
  animation-timing-function: ease;

  background: white;
  max-width: 900px;
  width: 60%;
  padding: 5rem;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.backdrop {
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 200;
  position: fixed;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
}

.icon {
  font-size: 200px;
  color: $partial;
  margin-top: 2rem;
}

.subtitle {
  margin-top: 2rem;
  font-size: 1.5rem;
}

.btnGroup {
  margin-top: 4rem;
  display: flex;
  width: 100%;
  justify-content: center;

  .skipBtn {
    border: 1px solid $primary;
  }

  button {
    width: 100%;
    max-width: 228px;

    &:not(:first-child) {
      margin-left: 8rem;
    }
  }
}

@keyframes modalShowUp {
  0% {
    transform: translate(0, 10px) scale(1);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
}
</style>
