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
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
    };
  },
  watch: {
    currentNumber(val) {
      this.currentPage = Math.ceil(val / this.pageSize);
    },
  },
  computed: {
    numberList() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = Math.min(
        this.currentPage * this.pageSize,
        this.userData.status.length
      );
      const score = this.userData.score.slice(start, end);
      const status = this.userData.status.slice(start, end);
      const tries = this.userData.tries.slice(start, end);
      const list = {
        score,
        status,
        tries,
      };
      return list;
    },
    totalPage() {
      return Math.ceil(this.userData.status.length / this.pageSize);
    },
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
      return `Tries remaining: ${this.userData.tries[this.currentNumber - 1]}`;
    },
    status() {
      if (this.userData.status[this.currentNumber - 1] === "submit-success") {
        return "Correct";
      } else if (
        this.userData.status[this.currentNumber - 1] === "submit-wrong"
      ) {
        return "Incorrect";
      } else if (
        this.userData.status[this.currentNumber - 1] === "submit-partial"
      ) {
        return "Partially correct";
      }
      if (this.isReview) {
        return "Incorrect";
      }
      return "";
    },
    triesClass() {
      const { tries, successColor, wrongColor, partialColor } = this.$style;
      let style = [tries];
      if (this.userData.status[this.currentNumber - 1] === "submit-success") {
        style.push(successColor);
      } else if (
        this.userData.status[this.currentNumber - 1] === "submit-wrong"
      ) {
        style.push(wrongColor);
      } else if (
        this.userData.status[this.currentNumber - 1] === "submit-partial"
      ) {
        style.push(partialColor);
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
    next() {
      if (this.currentPage < this.totalPage) {
        this.currentPage++;
      }
    },
    prev() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    calculateNumber(val) {
      return val + 1 + (this.currentPage - 1) * this.pageSize;
    },
  },
};
</script>

<template>
  <div :class="$style.navigation">
    <div :class="$style.header">
      <p :class="$style.title">Navigation</p>
      <div :class="$style.pagination" v-if="totalPage > 1">
        <font-awesome-icon
          @click="prev"
          :class="[$style.icon, currentPage === 1 ? $style.disable : '']"
          icon="chevron-left"
        />
        <p :class="$style.page">{{ currentPage }}</p>
        <font-awesome-icon
          @click="next"
          :class="[
            $style.icon,
            currentPage === totalPage ? $style.disable : '',
          ]"
          icon="chevron-right"
        />
      </div>
    </div>
    <div :class="$style.numberBox">
      <div
        v-for="(item, idx) in numberList.status"
        :class="numberClass(item, calculateNumber(idx))"
        :key="idx"
        @click="$emit('change-number', calculateNumber(idx))"
      >
        {{ calculateNumber(idx) }}
      </div>
    </div>
    <p :class="$style.score">
      Score: <span :class="$style.value">{{ displayedScore }}</span>
    </p>
    <p :class="triesClass">{{ status }}</p>
    <p
      v-if="
        userData.tries[currentNumber - 1] > 0 &&
        userData.status[currentNumber - 1] !== 'submit-success' &&
        !isReview
      "
      :class="$style.tries"
    >
      {{ tries }}
    </p>
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

.header {
  display: flex;
  justify-content: space-between;
}

.pagination {
  display: flex;

  &.right {
    align-self: flex-end;
  }

  .page {
    margin: 0 1rem;
    font-size: 1.25rem;
    font-weight: bold;
  }

  .icon {
    cursor: pointer;
    font-size: 1.5rem;
    color: $primary;

    &:hover {
      color: lighten($color: $primary, $amount: 10);
    }

    &.disable {
      cursor: not-allowed;
      opacity: 0.3;
    }
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
