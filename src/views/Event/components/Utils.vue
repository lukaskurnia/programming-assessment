<script>
import { millisecondToTime } from "@/utils/datetime";
import Navigation from "./Navigation";
import Timer from "./Timer";
import CodeEditor from "./CodeEditor";
export default {
  name: "Utils",
  components: {
    Navigation,
    Timer,
    CodeEditor,
  },
  props: {
    currentNumber: {
      type: Number,
      default: 1,
    },
    duration: Number,
    exam: Object,
  },
  data() {
    return {
      times: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      remainingTimeInterval: null, // Interval
      isTimesUp: false,
      currentTab: 0,
      userAnswer: null,
    };
  },
  created() {
    this.triggerTime();
    this.userAnswer = this.currentQuestion.answers;
  },
  beforeUnmount() {
    clearInterval(this.remainingTimeInterval);
  },
  watch: {
    currentNumber() {
      this.userAnswer = this.currentQuestion.answers;
    },
  },
  computed: {
    currentQuestion() {
      return this.exam.questions[this.currentNumber - 1];
    },
  },
  methods: {
    changeNumber(val) {
      this.$emit("change-number", val);
    },
    changeTab(val) {
      this.currentTab = val;
    },
    typeAnswer(val) {
      this.userAnswer[this.currentTab] = val;
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
          :currentQuestion="currentQuestion"
          :totalNumber="exam.questions.length"
          :current-number="currentNumber"
          @change-number="changeNumber"
        />
      </div>
      <div :class="$style.timerSection">
        <div>
          <Timer :time="times" />
        </div>
        <div :class="$style.btnGroup">
          <div>
            <button class="btn btn-primary" :class="$style.summaryBtn">
              Summary
            </button>
          </div>
          <div>
            <button class="btn btn-primary" :class="$style.finishBtn">
              Finish Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.middleSection">
      <div>
        <div :class="$style.codeHeader">
          <div
            v-for="num in currentQuestion.answers.length"
            :key="num - 1"
            :class="[$style.tab, num - 1 === currentTab ? $style.active : '']"
            @click="changeTab(num - 1)"
          >
            {{ num - 1 === 0 ? "solution.c" : "solution.h" }}
          </div>
        </div>
        <CodeEditor :code="userAnswer[currentTab]" @type-answer="typeAnswer" />
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

.middleSection {
  margin-top: 2rem;
}

.timerSection {
  justify-self: center;
}

.codeHeader {
  display: flex;

  .tab {
    width: 100%;
    max-width: 100px;
    position: relative;
    border-radius: 16px 16px 0 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    padding: 1rem;
    // background: #f7f7f7;
    background: $primary;
    color: white;
    transition: 0.3s all ease;
    cursor: pointer;

    &:not(:first-child) {
      margin-left: -5px;
    }

    &:hover {
      background-color: lighten($primary, 10);
      // background-color: white;
      // color: $primary;
      // color: #f7f7f7;
    }

    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;

    &.active {
      z-index: 1;
      font-weight: bold;
      color: $secondary;
      background: white;
      box-shadow: 0 2px 8px rgba($primary, 0.12);

      &:hover {
        background-color: lighten(white, 10);
      }
    }
  }
}

.btnGroup {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 1rem;
  column-gap: 1rem;

  .summaryBtn {
    width: 100%;
  }
  .finishBtn {
    width: 100%;
  }
}
</style>
