<script>
export default {
  name: "Navigation",
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

    isReview: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    displayedScore() {
      if (
        this.isReview ||
        (this.userData.status[this.currentNumber - 1] &&
          this.userData.status[this.currentNumber - 1] !== "run-error" &&
          this.userData.status[this.currentNumber - 1] !== "run-success")
      ) {
        return `${this.userData.score[this.currentNumber - 1]}/${
          this.maxScore[this.currentNumber - 1]
        }`;
      }
      return this.userData.score[this.currentNumber - 1];
    },
    tries() {
      if (this.userData.status[this.currentNumber - 1] === "submit-success") {
        return "Correct";
      } else if (
        this.userData.status[this.currentNumber - 1] === "submit-wrong"
      ) {
        if (
          this.userData.tries[this.currentNumber - 1] === 0 ||
          this.isReview
        ) {
          return "Incorrect";
        }
      } else if (
        this.userData.status[this.currentNumber - 1] === "submit-partial"
      ) {
        if (
          this.userData.tries[this.currentNumber - 1] === 0 ||
          this.isReview
        ) {
          return "Partially correct";
        }
      }
      if (this.isReview) {
        return "Incorrect";
      }
      return `Tries remaining: ${this.userData.tries[this.currentNumber - 1]}`;
    },
    triesClass() {
      const { tries, successColor, wrongColor, partialColor } = this.$style;
      let style = [tries];
      if (this.userData.status[this.currentNumber - 1] === "submit-success") {
        style.push(successColor);
      } else if (
        this.userData.status[this.currentNumber - 1] === "submit-wrong"
      ) {
        if (
          this.userData.tries[this.currentNumber - 1] === 0 ||
          this.isReview
        ) {
          style.push(wrongColor);
        }
      } else if (
        this.userData.status[this.currentNumber - 1] === "submit-partial"
      ) {
        if (
          this.userData.tries[this.currentNumber - 1] === 0 ||
          this.isReview
        ) {
          style.push(partialColor);
        }
      } else if (
        this.isReview &&
        this.userData.tries[this.currentNumber - 1] > 0
      ) {
        style.push(wrongColor);
      }
      return style;
    },
  },
  methods: {
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
        } else if (status === "submit-wrong" || this.isReview) {
          style.push(wrongBg);
        }
      }
      return style;
    },
  },
};
</script>

<template>
  <div :class="$style.navigation">
    <p :class="$style.title">Navigation</p>
    <div :class="$style.numberBox">
      <div
        v-for="(item, idx) in userData.status"
        :class="numberClass(item, idx + 1)"
        :key="idx"
        @click="$emit('change-number', idx + 1)"
      >
        {{ idx + 1 }}
      </div>
    </div>
    <p :class="$style.score">
      Score: <span :class="$style.value">{{ displayedScore }}</span>
    </p>
    <p :class="triesClass">{{ tries }}</p>
  </div>
</template>

<style lang="scss" module>
.navigation {
  width: 100%;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba($color: $primary, $alpha: 0.12);
  border-radius: 1rem;
  padding: 1rem;

  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }
}

.numberBox {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

.score {
  font-size: 1.5rem;
  margin-top: 1.5rem;

  .value {
    font-weight: bold;
    color: $primary;
  }
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
</style>
