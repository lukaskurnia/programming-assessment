<script>
export default {
  name: "Timer",
  data() {
    return {
      limit: 5 * 60, // 5 minutes
    };
  },
  props: {
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
      const timestamp =
        this.time.hours * 3600 + this.time.minutes * 60 + this.time.seconds;
      return timestamp > 0 && timestamp <= this.limit;
    },
  },
};
</script>

<template>
  <div :class="$style.timer">
    <p :class="$style.title">Time left:</p>
    <div :class="$style.timeBox">
      <div :class="[$style.card, isLimit() ? $style.blink : '']">
        <p :class="[$style.value, isLimit() ? $style.blink : '']">
          {{ timeString(time.hours) }}
        </p>
        <p :class="$style.label">Hour</p>
      </div>
      <div :class="[$style.card, isLimit() ? $style.blink : '']">
        <p :class="[$style.value, isLimit() ? $style.blink : '']">
          {{ timeString(time.minutes) }}
        </p>
        <p :class="$style.label">Minute</p>
      </div>
      <div :class="[$style.card, isLimit() ? $style.blink : '']">
        <p :class="[$style.value, isLimit() ? $style.blink : '']">
          {{ timeString(time.seconds) }}
        </p>
        <p :class="$style.label">Second</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.timer {
  width: 100%;
  background: white;
  padding: 1rem;

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
  }
}
.timeBox {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 1rem;
  margin-top: 1rem;
}

.card {
  background: $primary;
  padding: 1.5rem;
  height: 140px;
  width: 104px;
  border-radius: 0.5rem;
  color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &.blink {
    background: $danger;
  }

  .value {
    font-size: 2.5rem;

    &.blink {
      animation: blinker 1.5s linear infinite;

      @keyframes blinker {
        50% {
          opacity: 0.5;
        }
      }
    }
  }

  .label {
    font-size: 1.5rem;
  }
}
</style>
