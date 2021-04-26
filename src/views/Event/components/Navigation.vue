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
    currentQuestion: Object,
  },
  computed: {
    score() {
      return this.currentQuestion.score || 0;
    },
    tries() {
      return this.currentQuestion.tries || 10;
    },
  },
};
</script>

<template>
  <div :class="$style.navigation">
    <p :class="$style.title">Navigation</p>
    <div :class="$style.numberBox">
      <!-- idx start from 1 -->
      <div
        v-for="idx in totalNumber"
        :class="[$style.number, currentNumber === idx ? $style.current : '']"
        :key="idx"
        @click="$emit('change-number', idx)"
      >
        {{ idx }}
      </div>
    </div>
    <p :class="$style.score">
      Score: <span :class="$style.value">{{ score }}</span>
    </p>
    <p :class="$style.tries">Tries remaining: {{ tries }}</p>
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

    &.current {
      background: $primary;
      color: white;

      &:hover {
        background-color: lighten($primary, 10);
      }
    }
  }
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
</style>
