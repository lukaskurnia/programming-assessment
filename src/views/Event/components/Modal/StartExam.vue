<script>
import { millisecondToTime } from "@/utils/datetime";
export default {
  name: "StartExam",
  props: {
    duration: Number,
    useTutorial: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
  },
  computed: {
    time() {
      let obj = millisecondToTime(this.duration);
      const hour = obj.hours ? `${obj.hours} hours ` : "";
      const minutes = obj.minutes ? `${obj.minutes} minutes ` : "";
      const seconds = obj.seconds ? `${obj.seconds} seconds` : "";
      return `${hour}${minutes}${seconds}`;
    },
    titletext() {
      return this.title ? `${this.title}` : "Start assignment?";
    },
  },
  methods: {
    reset() {
      if (this.useTutorial) {
        this.$emit("reset-tutorial");
      } else {
        this.$emit("close");
      }
    },
    start() {
      this.$emit("start-exam");
    },
  },
};
</script>

<template>
  <div :class="$style.backdrop">
    <div :class="$style.wrapper">
      <p :class="$style.title">{{ titletext }}</p>
      <p :class="$style.subtitle">
        You have <b>{{ time }}</b> to solve this assignments
      </p>
      <div :class="$style.btnGroup">
        <button
          @click="reset"
          :class="$style.resetBtn"
          class="btn btn-primary--alt"
        >
          {{ useTutorial ? "See tutorial" : "Cancel" }}
        </button>
        <button @click="start" class="btn btn-primary">Start</button>
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

  .resetBtn {
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
