<script>
export default {
  name: "ModalSummary",
  props: {
    currentNumber: {
      type: Number,
      default: 1,
    },
    totalNumber: {
      type: Number,
      default: 5,
    },
    maxScore: Array,
    userData: Object,
    time: {
      // in milisecond
      type: Object,
    },
  },
  methods: {
    timeString(val) {
      if (val - 10 < 0) {
        return "0" + val;
      } else {
        return val;
      }
    },
    isLimit() {
      const limit = 5 * 60; // 5 minutes
      const timestamp =
        this.time.hours * 3600 + this.time.minutes * 60 + this.time.seconds;
      return timestamp > 0 && timestamp <= limit;
    },
    navigate(val) {
      this.$emit("change-number", val);
      this.$emit("close");
    },
    displayedScore(num) {
      if (
        this.userData.status[num] &&
        this.userData.status[num] !== "run-error" &&
        this.userData.status[num] !== "run-success"
      ) {
        return `${this.userData.score[num]}/${this.maxScore[num]}`;
      }
      return this.userData.score[num];
    },
    tries(num) {
      if (this.userData.status[num] === "submit-success") {
        return "Correct";
      } else if (this.userData.status[num] === "submit-wrong") {
        if (this.userData.tries[num] === 0) {
          return "Incorrect";
        }
      } else if (this.userData.status[num] === "submit-partial") {
        if (this.userData.tries[num] === 0) {
          return "Partially correct";
        }
      }
      return `Tries remaining: ${this.userData.tries[num]}`;
    },
    triesClass(num) {
      const { tries, successColor, wrongColor, partialColor } = this.$style;
      let style = [tries];
      if (this.userData.status[num] === "submit-success") {
        style.push(successColor);
      } else if (this.userData.status[num] === "submit-wrong") {
        if (this.userData.tries[num] === 0) {
          style.push(wrongColor);
        }
      } else if (this.userData.status[num] === "submit-partial") {
        if (this.userData.tries[num] === 0) {
          style.push(partialColor);
        }
      }
      return style;
    },
    numberClass(status, num) {
      const { number, current, successBg, wrongBg, partialBg } = this.$style;
      let style = [number];
      if (this.currentNumber === num) {
        style.push(current);
      } else {
        if (status === "submit-success") {
          style.push(successBg);
        } else if (status === "submit-partial") {
          style.push(partialBg);
        } else if (status === "submit-wrong") {
          style.push(wrongBg);
        }
      }
      return style;
    },
  },
};
</script>

<template>
  <div :class="$style.backdrop">
    <div :class="$style.wrapper">
      <font-awesome-icon
        @click="$emit('close')"
        :class="$style.icon"
        icon="times"
      />
      <div :class="$style.header">
        <p :class="$style.time">
          Time left:
          <span :class="isLimit() ? $style.blink : ''"
            >{{ timeString(time.hours) }}:{{ timeString(time.minutes) }}:{{
              timeString(time.seconds)
            }}
          </span>
        </p>
        <p :class="$style.title">Summary</p>
      </div>
      <div :class="$style.container">
        <div
          :class="$style.questionGroup"
          v-for="(item, idx) in userData.status"
          :key="idx"
        >
          <div :class="numberClass(item, idx + 1)" @click="navigate(idx + 1)">
            {{ idx + 1 }}
          </div>
          <div :class="$style.details">
            <p :class="$style.score">
              {{ displayedScore(idx) }}
            </p>
            <p :class="triesClass(idx)">{{ tries(idx) }}</p>
          </div>
        </div>
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
  width: 60%;
  padding: 3rem 5rem 5rem;

  position: relative;
  border-radius: 1rem;
}
.backdrop {
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 7;
  position: fixed;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
}

.header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  justify-self: center;
}

.container {
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem 1rem;
}

.questionGroup {
  display: flex;
  align-items: center;
}

.details {
  margin-left: 1rem;
}

.time {
  font-size: 1.125rem;
  span {
    color: $primary;
    font-weight: bold;
  }
}

.icon {
  cursor: pointer;
  top: 1.5rem;
  right: 1.5rem;
  position: absolute;
  font-size: 1.5rem;
}

.numberBox {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

.score {
  font-size: 1rem;
  font-weight: bold;
  color: $primary;
}

.tries {
  margin-top: 0.5rem;
}

.number {
  cursor: pointer;
  border-radius: 50%;
  min-width: 54px;
  min-height: 54px;
  max-width: 54px;
  max-height: 54px;
  color: black;
  background: white;
  border: 2px solid $primary;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  font-size: 1.25rem;
  font-weight: bold;
  justify-self: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: $primary;
    color: white;
  }
  &:active {
    transform: scale(0.9);
  }
}

.successColor {
  color: $success;
  font-weight: bold;
}
.wrongColor {
  color: $danger;
  font-weight: bold;
}
.partialColor {
  color: $partial;
  font-weight: bold;
}

.current {
  background: $primary;
  color: white;

  &:hover {
    background-color: lighten($primary, 10);
  }
}

.successBg {
  background: $success;
  font-weight: bold;
  color: white;
  border: 2px solid darken($success, 10);

  &:hover {
    background-color: lighten($success, 10);
  }
}
.wrongBg {
  background: $danger;
  font-weight: bold;
  color: white;
  border: 2px solid darken($danger, 10);
  &:hover {
    background-color: lighten($danger, 10);
  }
}
.partialBg {
  background: $partial;
  font-weight: bold;
  color: white;
  border: 2px solid darken($partial, 10);
  &:hover {
    background-color: lighten($partial, 10);
  }
}

.blink {
  color: $danger !important;
  animation: blinker 1.5s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0.5;
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
