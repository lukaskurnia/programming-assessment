<script>
import { mapGetters, mapActions } from "vuex";
import { millisecondToTime } from "@/utils/datetime";
import SpeechBubble from "@/components/SpeechBubble";
import Loading from "@/components/Loading";
import Feedback from "./Feedback";
import Navigation from "./Navigation";
import Timer from "./Timer";
import CodeEditor from "./CodeEditor";
import Grader from "./Grader";
import ModalSummary from "./Modal/ModalSummary";
import ModalFinish from "./Modal/ModalFinish";
import ModalUpload from "./Modal/ModalUpload";
export default {
  name: "Utils",
  components: {
    Navigation,
    Timer,
    CodeEditor,
    Feedback,
    Grader,
    Loading,
    ModalSummary,
    ModalFinish,
    ModalUpload,
    SpeechBubble,
  },
  props: {
    currentNumber: {
      type: Number,
      default: 1,
    },
    testCases: Array,
    maxScores: Array,
    duration: Number,
    floatingTimer: {
      type: Boolean,
      default: false,
    },
    exam: Object,
    // exam contain: {
    //   score: Number,
    //   tries: Number,
    //   answers: Array of string ['',''] etc,
    //   status: string of run-error, run-success, submit-success, submit-partial, submit-wrong
    // }
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
      userData: {
        answer: [],
        status: [],
        score: [],
        tries: [],
      },

      modal: {
        name: "",
        active: false,
      },

      loading: false,
      loadingType: "run",
      delay: 1000,
    };
  },
  created() {
    this.fetchUserData();
    this.triggerTime();
    this.saveStorageInterval = setInterval(async () => {
      this.updateAnswer();
    }, this.autosaves);
  },
  beforeUnmount() {
    clearInterval(this.saveStorageInterval);
    clearInterval(this.remainingTimeInterval);
  },
  computed: {
    ...mapGetters({
      tutorialStep: "State/getTutorialStep",
    }),
    tutorialText() {
      if (this.tutorialStep === 2) {
        return "Navigate through questions with this navigation. You can also get information about the current question score and remaining tries.";
      } else if (this.tutorialStep === 3) {
        return "Don’t forget to check your remaining time!";
      } else if (this.tutorialStep === 4) {
        return "Write or upload your code here!";
      } else if (this.tutorialStep === 5) {
        return "Run to compile your code! Don’t worry, your remaining tries will not reduce unless you submitted your code :D";
      } else if (this.tutorialStep === 6) {
        return "After compile, don’t forget submit to grade your code!";
      } else if (this.tutorialStep === 7) {
        return "Review your work with summary! After you’ve done, finish your assignment :)";
      }
      return "";
    },
  },
  watch: {
    tutorialStep(val) {
      if (val === 2) {
        this.scrollTo("step-2");
      } else if (val === 4) {
        this.scrollTo("step-4");
      } else if (val === 5) {
        this.scrollTo("step-5");
      } else if (val === 6) {
        // For tutorial purpose only
        this.userData.status[this.currentNumber - 1] = "run-success";
        setTimeout(() => {
          this.scrollTo("step-6");
        }, 1000);
      } else if (val === 7) {
        // For tutorial purpose only
        this.userData.status[this.currentNumber - 1] = "";
        this.scrollTo("step-7");
      }
    },
    currentNumber() {
      this.currentTab = 0;
    },
  },
  methods: {
    ...mapActions({
      nextTutorial: "State/incrementTutorialStep",
      setStep: "State/setTutorialStep",
    }),
    scrollTo(id) {
      document.getElementById(id).scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    },
    openModal(val) {
      this.modal.active = true;
      this.modal.name = val;
    },
    closeModal() {
      this.modal.active = false;
      this.modal.name = "";
    },
    changeNumber(val) {
      this.$emit("change-number", val);
    },
    changeTab(val) {
      this.currentTab = val;
    },
    typeAnswer(val) {
      this.userData.answer[this.currentNumber - 1][this.currentTab] = val;
    },
    handleUpload(val) {
      this.userData.answer[this.currentNumber - 1][this.currentTab] = val;
    },
    fetchUserData() {
      this.exam.questions.map(el => {
        this.userData.answer.push(el.answers);
        this.userData.status.push(el.status);
        this.userData.score.push(el.score);
        this.userData.tries.push(el.tries);
      });
    },
    updateAnswer() {
      let data = [];
      for (let i = 0; i < this.exam.questions.length; i++) {
        let obj = {
          score: this.userData.score[i],
          tries: this.userData.tries[i],
          answers: this.userData.answer[i],
          status: this.userData.status[i],
        };
        data.push(obj);
      }
      this.$emit("update-exam", "questions", data);
      if (this.tutorialStep === -1) {
        // Only update to database when not in tutorial
        this.$emit("update-ls");
      }
    },
    disableElement() {
      return (
        this.tutorialStep !== -1 ||
        this.userData.tries[this.currentNumber - 1] === 0 ||
        this.userData.status[this.currentNumber - 1] === "submit-success"
      );
    },
    run() {
      this.loading = true;
      this.loadingType = "run";
      setTimeout(() => {
        this.loading = false;
      }, this.delay);

      // if there are user answer compile success, else compile error
      this.userData.status[this.currentNumber - 1] = this.userData.answer[
        this.currentNumber - 1
      ][0]
        ? "run-success"
        : "run-error";
      this.updateAnswer();
      this.scrollTo("step-6");
    },
    submit() {
      if (this.userData.tries[this.currentNumber - 1] > 0) {
        this.loading = true;
        this.loadingType = "submit";
        setTimeout(() => {
          this.loading = false;
        }, this.delay);

        const tc = this.testCases[this.currentNumber - 1];
        let sum = 0;
        let countZero = 0;
        for (let i = 0; i < tc.length; i++) {
          if (!tc[i]) countZero++;
          sum += tc[i];
        }
        this.userData.status[this.currentNumber - 1] =
          countZero === 0
            ? "submit-success"
            : countZero === tc.length
            ? "submit-wrong"
            : "submit-partial";
        this.userData.score[this.currentNumber - 1] = sum;
        if (
          this.userData.status[this.currentNumber - 1] === "submit-wrong" ||
          this.userData.status[this.currentNumber - 1] === "submit-partial"
        ) {
          this.userData.tries[this.currentNumber - 1]--;
        }
        this.updateAnswer();
        this.scrollTo("grader");
      }
    },
    finish() {
      this.updateAnswer();
      let sum = 0;
      for (let i = 0; i < this.userData.score.length; i++) {
        sum += this.userData.score[i];
      }
      const currentDate = new Date();
      const grade = Math.floor(sum / this.userData.score.length);
      this.$emit("update-exam", "finished_at", currentDate.getTime());
      this.$emit("update-exam", "grade", grade);
      if (this.tutorialStep === -1) {
        // Only update to database when not in tutorial
        this.$emit("update-ls");
      }
      this.$router.push({ name: "Home" });
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
        if (this.tutorialStep === -1) {
          // Only update to database when not in tutorial
          this.$emit("update-ls");
        }
      }

      const lastTime = startTime + this.duration;
      let examRemainingTime = Math.max(lastTime - currentTime, 0);

      this.remainingTimeInterval = setInterval(async () => {
        examRemainingTime = Math.max(examRemainingTime - 1000, 0);
        this.times = millisecondToTime(examRemainingTime);

        if (examRemainingTime <= 0) {
          if (this.isTimesUp === false) {
            this.isTimesUp = true;
            if (this.tutorialStep === -1) {
              // Only clickable when not in tutorial
              this.openModal("finish");
            }
          }
        }
      }, 1000);
    },
  },
};
</script>

<template>
  <div :class="$style.utils">
    <ModalSummary
      v-show="modal.active && modal.name === 'summary'"
      :max-score="maxScores"
      :user-data="userData"
      :current-number="currentNumber"
      :time="times"
      @change-number="changeNumber"
      @close="closeModal"
    />
    <ModalFinish
      v-show="modal.active && modal.name === 'finish'"
      :is-times-up="isTimesUp"
      @finish="finish"
      @close="closeModal"
    />
    <ModalUpload
      v-show="modal.active && modal.name === 'upload'"
      @upload="handleUpload"
      @close="closeModal"
    />

    <div :class="$style.floatingTimer" v-show="floatingTimer">
      <Timer :time="times" :is-float="true" />
    </div>
    <div :class="$style.upperSection">
      <div
        :class="[
          $style.nav,
          $style.tutorialWrapper,
          tutorialStep === 2 ? $style.highlighted : '',
        ]"
      >
        <SpeechBubble
          v-if="tutorialStep === 2"
          :text="tutorialText"
          :is-top="false"
          :is-left="true"
          :arrow-left="false"
          :middle="true"
          @next-step="nextTutorial"
        />
        <Navigation
          id="step-2"
          :max-score="maxScores"
          :user-data="userData"
          :current-number="currentNumber"
          @change-number="changeNumber"
        />
      </div>
      <div :class="$style.timerSection">
        <div
          :class="[
            $style.tutorialWrapper,
            tutorialStep === 3 ? $style.highlighted : '',
          ]"
        >
          <SpeechBubble
            v-if="tutorialStep === 3"
            :text="tutorialText"
            :is-top="false"
            :is-left="true"
            :arrow-left="false"
            :middle="true"
            @next-step="nextTutorial"
          />
          <Timer id="step-3" :time="times" />
        </div>
        <div
          :class="[
            $style.tutorialWrapper,
            tutorialStep === 7 ? $style.highlighted : '',
          ]"
        >
          <SpeechBubble
            v-if="tutorialStep === 7"
            :text="tutorialText"
            :is-top="false"
            :is-left="true"
            :arrow-left="false"
            :wider="true"
            @next-step="nextTutorial"
          />
          <div :class="$style.btnGroup" id="step-7">
            <div>
              <button
                @click="this.tutorialStep === -1 && openModal('summary')"
                class="btn btn-primary"
                :class="$style.summaryBtn"
              >
                Summary
              </button>
            </div>
            <div>
              <button
                @click="this.tutorialStep === -1 && openModal('finish')"
                class="btn btn-primary"
                :class="$style.finishBtn"
              >
                Finish Assignment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="[
        $style.middleSection,
        $style.tutorialWrapper,
        tutorialStep === 4 ? $style.highlighted : '',
      ]"
    >
      <SpeechBubble
        v-if="tutorialStep === 4"
        :text="tutorialText"
        :is-top="true"
        :is-left="true"
        :arrow-left="false"
        @next-step="nextTutorial"
      />
      <div>
        <div :class="$style.codeHeader">
          <div
            v-for="num in userData.answer[currentNumber - 1].length"
            :key="num - 1"
            :class="[$style.tab, num - 1 === currentTab ? $style.active : '']"
            @click="changeTab(num - 1)"
          >
            {{ num - 1 === 0 ? "solution.c" : "solution.h" }}
          </div>
        </div>
        <CodeEditor
          :readonly="disableElement()"
          :code="userData.answer[currentNumber - 1][currentTab]"
          @type-answer="typeAnswer"
        />
        <div :class="$style.bottomGroup">
          <div
            id="step-4"
            :class="[$style.input, disableElement() ? $style.disabled : '']"
            @click="disableElement() || openModal('upload')"
          >
            <font-awesome-icon icon="upload" :class="$style.icon" />Upload code
          </div>
          <div>
            <div :class="$style.bottomBtn">
              <div
                :class="[
                  $style.tutorialWrapper,
                  tutorialStep === 5 ? $style.highlighted : '',
                ]"
              >
                <SpeechBubble
                  v-if="tutorialStep === 5"
                  :text="tutorialText"
                  :is-top="true"
                  :is-left="true"
                  :arrow-left="false"
                  :wider="true"
                  @next-step="nextTutorial"
                />
                <button
                  id="step-5"
                  @click="run"
                  class="btn btn-primary--alt"
                  :class="$style.runBtn"
                  :disabled="disableElement()"
                >
                  Run
                </button>
              </div>
              <button
                v-if="
                  userData.status[currentNumber - 1] &&
                  userData.status[currentNumber - 1] !== 'run-error'
                "
                :disabled="disableElement()"
                class="btn btn-primary"
                :class="[
                  $style.submitBtn,
                  tutorialStep === 6 ? $style.highlighted : '',
                ]"
                @click="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.loadingSection" v-if="loading">
      <Loading :run="loadingType === 'run'" />
    </div>
    <div
      :class="$style.bottomSection"
      v-if="userData.status[currentNumber - 1] && !loading"
    >
      <div
        :class="[
          $style.tutorialWrapper,
          tutorialStep === 6 ? $style.highlighted : '',
        ]"
      >
        <SpeechBubble
          v-if="tutorialStep === 6"
          :text="tutorialText"
          :is-top="true"
          :is-left="true"
          :arrow-left="false"
          :middle="true"
          @next-step="nextTutorial"
        />
        <Feedback id="step-6" :status="userData.status[currentNumber - 1]" />
      </div>
      <div
        :class="[
          $style.graderSection,
          $style.tutorialWrapper,
          tutorialStep === 6 ? $style.highlighted : '',
        ]"
        v-if="
          userData.status[currentNumber - 1] !== 'run-success' &&
          userData.status[currentNumber - 1] !== 'run-error'
        "
      >
        <Grader id="grader" :test-case="testCases[currentNumber - 1]" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.floatingTimer {
  position: fixed;
  top: 2rem;
  right: 3rem;
  z-index: 6;
  animation: showUp ease 0.3s;
}

.nav {
  align-self: center;
}

.utils {
  width: 100%;
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
}

.upperSection {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
}

.middleSection {
  margin-top: 2rem;
}

.bottomSection {
  margin-top: 2rem;
}

.timerSection {
  justify-self: center;
}

.graderSection {
  margin-top: 1.5rem;
}

.loadingSection {
  margin-top: 2rem;
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

    &.active {
      z-index: 1;
      font-weight: bold;
      color: $secondary;
      background: white;
      box-shadow: none;
      filter: drop-shadow(0px -4px 4px rgba(0, 0, 0, 0.12));

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

  button {
    flex: 1;
    min-width: 203px;
    &:not(:first-child) {
      margin-left: 1rem;
    }
  }
  // .submitBtn {
  // max-width: 203px;
  // width: 100%;
  // }

  .runBtn {
    border: 1px solid $primary;
  }
}

.bottomGroup {
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .input {
    background: white;
    padding: 0.5rem;
    cursor: pointer;
    .icon {
      margin-right: 1rem;
      font-size: 1.5rem;
    }

    &:hover {
      opacity: 0.8;
    }

    &.disabled {
      cursor: not-allowed;
    }
  }
}

.highlighted {
  z-index: 10;
}
.tutorialWrapper {
  position: relative;
  width: 100%;
}

@keyframes showUp {
  0% {
    transform: translate(0, -3px) scale(1);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
}
</style>
