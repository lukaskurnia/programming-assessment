<script>
import { millisecondToTime } from "@/utils/datetime";
import Navigation from "./Navigation";
import Timer from "./Timer";
export default {
  name: "Utils",
  components: {
    Navigation,
    Timer,
  },
  props: {
    currentNumber: {
      type: Number,
      default: 1,
    },
    questions: Array,
    exam: Object,
  },
  data() {
    return {
      times: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      duration: 310000, // 5 minute 10 second
      remainingTimeInterval: null, // Interval
      isTimesUp: false,
    };
  },
  created() {
    this.triggerTime();
  },
  beforeUnmount() {
    clearInterval(this.remainingTimeInterval);
  },
  methods: {
    changeNumber(val) {
      this.$emit("change-number", val);
    },
    async triggerTime() {
      let startTime;
      const currentDate = new Date();
      const currentTime = currentDate.getTime();
      if (this.exam.started_at) {
        startTime = this.exam.started_at;
      } else {
        startTime = currentTime;
        this.$emit("update-exam", "started_at", currentTime);
        this.$emit("update-ls");
      }

      const lastTime = startTime + this.duration;
      let examRemainingTime = Math.max(lastTime - currentTime, 0);

      this.remainingTimeInterval = setInterval(async () => {
        examRemainingTime = Math.max(examRemainingTime - 1000, 0);
        this.times = millisecondToTime(examRemainingTime);

        if (examRemainingTime <= 0) {
          if (this.isTimesUp === false) {
            this.isTimesUp = true;
            // TODO: Change to Modal
            this.$emit("update-exam", "finished_at", currentDate.getTime());
            this.$emit("update-ls");
            alert("Times up");
          }
        }
      }, 1000);
    },
  },
};
</script>

<template>
  <div :class="$style.utils">
    <div :class="$style.upperSection">
      <div :class="$style.navSection">
        <Navigation
          :questions="questions"
          :current-number="currentNumber"
          @change-number="changeNumber"
        />
      </div>
      <div :class="$style.timerSection">
        <div>
          <Timer :time="times" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.utils {
  width: 100%;
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.upperSection {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
}

.timerSection {
  justify-self: center;
}
</style>
