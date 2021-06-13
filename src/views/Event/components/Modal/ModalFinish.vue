<script>
export default {
  name: "ModalFinish",
  props: {
    isTimesUp: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    finish() {
      this.$emit("finish");
    },
  },
};
</script>

<template>
  <div :class="$style.backdrop">
    <div :class="[$style.wrapper, isTimesUp ? $style.timesup : '']">
      <p v-if="isTimesUp" :class="$style.title">Times Up!</p>
      <p v-if="!isTimesUp" :class="$style.title">Finish Assignment</p>
      <font-awesome-icon
        v-if="!isTimesUp"
        :class="$style.icon"
        icon="exclamation-circle"
      />
      <p v-if="!isTimesUp" :class="$style.subtitle">
        Are you sure you want to finish the assignment?
      </p>
      <div :class="$style.btnGroup">
        <button
          v-if="!isTimesUp"
          @click="$emit('close')"
          class="btn btn-primary--alt"
          :class="$style.customBtn"
        >
          Cancel
        </button>
        <button @click="finish" class="btn btn-primary">Finish</button>
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

  &.timesup {
    width: 40%;
  }
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
  margin-top: 2rem;
  display: flex;
  width: 100%;
  justify-content: center;

  .customBtn {
    border: 1px solid $primary;
  }

  button {
    width: 100%;
    max-width: 228px;

    &:not(:first-child) {
      margin-left: 4rem;
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
