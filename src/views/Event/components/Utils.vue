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
      // Time variable
      autosaves: 5000,
      times: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },

      // Interval variable
      remainingTimeInterval: null,
      saveStorageInterval: null,

      isTimesUp: false,
      currentTab: 0,
      userAnswer: [],
    };
  },
  created() {
    this.fetchAnswer();
    this.triggerTime();
    this.saveStorageInterval = setInterval(async () => {
      this.updateAnswer();
    }, this.autosaves);
  },
  beforeUnmount() {
    clearInterval(this.saveStorageInterval);
    clearInterval(this.remainingTimeInterval);
  },
  watch: {
    currentNumber() {
      this.currentTab = 0;
    },
  },
  methods: {
    changeNumber(val) {
      this.$emit("change-number", val);
    },
    changeTab(val) {
      this.currentTab = val;
      console.log(this.user);
    },
    typeAnswer(val) {
      this.userAnswer[this.currentNumber - 1][this.currentTab] = val;
    },
    handleUpload(evt) {
      const file = evt.target.files[0];
      const reader = new FileReader();

      reader.onload = e =>
        (this.userAnswer[this.currentNumber - 1][this.currentTab] =
          e.target.result);
      reader.readAsText(file);
    },
    fetchAnswer() {
      this.exam.questions.map(el => {
        this.userAnswer.push(el.answers);
      });
    },
    updateAnswer() {
      let data = [];
      for (let i = 0; i < this.exam.questions.length; i++) {
        let obj = {
          score: this.exam.questions[i].score,
          tries: this.exam.questions[i].tries,
          answers: this.userAnswer[i],
        };
        data.push(obj);
      }
      this.$emit("update-exam", "questions", data);
      this.$emit("update-ls");
    },
    submit() {
      //include grading
      this.updateAnswer();
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
          :currentQuestion="exam.questions[currentNumber - 1]"
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
            v-for="num in userAnswer[currentNumber - 1].length"
            :key="num - 1"
            :class="[$style.tab, num - 1 === currentTab ? $style.active : '']"
            @click="changeTab(num - 1)"
          >
            {{ num - 1 === 0 ? "solution.c" : "solution.h" }}
          </div>
        </div>
        <CodeEditor
          :code="userAnswer[currentNumber - 1][currentTab]"
          @type-answer="typeAnswer"
        />
        <div :class="$style.bottomGroup">
          <div :class="$style.input">
            <!-- TODO: Change to modal action -->
            <input type="file" id="upload" hidden @change="handleUpload" />
            <label for="upload"
              ><font-awesome-icon icon="upload" :class="$style.icon" />Upload
              code</label
            >
          </div>
          <div>
            <div :class="$style.bottomBtn">
              <button class="btn btn-primary--alt" :class="$style.runBtn">
                Run
              </button>
              <button
                class="btn btn-primary"
                :class="$style.submitBtn"
                @click="submit"
              >
                Submit
              </button>
            </div>
          </div>
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

.middleSection {
  margin-top: 2rem;
}

.timerSection {
  justify-self: center;
}

.codeHeader {
  display: flex;
  margin-bottom: -2px;

  .tab {
    width: 100%;
    max-width: 120px;
    position: relative;
    border-radius: 16px 16px 0 0;
    filter: drop-shadow(0px -4px 4px rgba(0, 0, 0, 0.12));
    padding: 1rem;
    background: $primary;
    color: white;
    transition: 0.3s all ease;
    cursor: pointer;

    &:not(:first-child) {
      margin-left: -10px;
    }

    &:hover {
      background-color: lighten($primary, 10);
    }

    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;

    &.active {
      z-index: 1;
      font-weight: bold;
      color: $secondary;
      background: white;
      box-shadow: none;
      filter: drop-shadow(0px -4px 4px rgba(0, 0, 0, 0.12));
      // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);

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

.bottomBtn {
  display: flex;
  width: 300px;
  button {
    max-width: 203px;
    width: 100%;
    &:not(:first-child) {
      margin-left: 1rem;
    }
  }
  // .submitBtn {
  // max-width: 203px;
  // width: 100%;
  // }

  // .runBtn {
  //   max-width: 203px;
  //   width: 100%;
  // }
}

.bottomGroup {
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .input {
    .icon {
      margin-right: 1rem;
      font-size: 1.5rem;
    }
    label {
      cursor: pointer;
      transition: 0.3s all ease;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
