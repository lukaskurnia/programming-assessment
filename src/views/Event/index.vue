<script>
import { mapActions, mapGetters } from "vuex";
import { EVENT_DATA } from "@/constants/event";
import { EXAMS } from "@/constants/exam";
import SpeechBubble from "@/components/SpeechBubble";
import Question from "./components/Question";
import StartTutorial from "./components/Modal/StartTutorial";
import StartExam from "./components/Modal/StartExam";
import Utils from "./components/Utils";
export default {
  name: "Event",
  components: {
    Question,
    StartTutorial,
    StartExam,
    Utils,
    SpeechBubble,
  },
  data() {
    return {
      event: {},
      currentExam: {},
      exams: EXAMS,
      currentNumber: 1,
      totalQuestion: 1,
      floatingTimer: false,
    };
  },
  created() {
    this.initialize();
    this.checkUserFirstTime();
    this.fetchAllData();
    this.scrollTop();
  },
  mounted() {
    // on scroll effect
    window.addEventListener("scroll", this.addOnScrollEvent);
    this.addOnScrollEvent();
  },
  unmounted() {
    window.removeEventListener("scroll", this.addOnScrollEvent);
  },
  watch: {
    tutorialStep(val) {
      if (val === 1) {
        this.scrollTo("step-1");
      }
    },
    currentNumber() {
      this.scrollTop();
    },
  },
  computed: {
    ...mapGetters({
      tutorialStep: "State/getTutorialStep",
    }),
    tutorialText() {
      if (this.tutorialStep === 1) {
        return "This is  where your question will be displayed! There are navigation buttons for navigating to next or previous question.";
      }
      return "";
    },
    currentQuestion() {
      return this.event.questions[this.currentNumber - 1];
    },
  },
  methods: {
    ...mapActions({
      nextTutorial: "State/incrementTutorialStep",
      setStep: "State/setTutorialStep",
    }),
    initialize() {
      if (!localStorage.getItem("exam")) {
        localStorage.setItem("exam", JSON.stringify(this.exams));
      } else {
        this.exams = JSON.parse(localStorage.getItem("exam"));
      }
    },
    fetchAllData() {
      // Fetch problemset
      this.event = EVENT_DATA.find(
        el => el.id_event === parseInt(this.$route.params.id_event)
      );
      this.totalQuestion = this.event.questions.length;
      // Fetch Exam
      this.currentExam = this.exams.find(
        el => el.id_event === parseInt(this.$route.params.id_event)
      );
    },
    checkUserFirstTime() {
      // 1 = first time. 0 = not first time
      let firstTime;
      if (localStorage.getItem("first_time")) {
        firstTime = parseInt(localStorage.getItem("first_time"));
      } else {
        firstTime = 1;
        localStorage.setItem("first_time", firstTime);
      }

      if (firstTime && this.tutorialStep === -1) {
        // case step 0 then start tutorial
        this.setStep(0);
      }
    },
    startExam() {
      this.finishTutorial();
      this.initialize();
      this.fetchAllData();
      location.reload();
    },
    finishTutorial() {
      localStorage.setItem("first_time", 0);
      this.setStep(-1);
    },
    scrollTop() {
      window.scrollTo(0, 0);
    },
    scrollTo(id) {
      document.getElementById(id).scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    },
    addOnScrollEvent() {
      const $header = document.getElementById("header");
      setTimeout(() => {
        this.floatingTimer = window.pageYOffset > 400 ? true : false;
      }, 100);
      $header.style.zIndex = window.pageYOffset > 10 ? 10 : 0;
      $header.style.boxShadow =
        window.pageYOffset > 10 ? "0 2px 8px rgba(0,0,0,0.12)" : "none";
    },
    changeNumber(val) {
      this.currentNumber = val;
    },
    updateUserExams(key, value) {
      const idx = this.exams.findIndex(
        el => el.id_event === parseInt(this.$route.params.id_event)
      );
      this.exams[idx][key] = value;
    },
    updateLS() {
      localStorage.setItem("exam", JSON.stringify(this.exams));
    },
  },
};
</script>

<template>
  <div :class="$style.event">
    <StartTutorial
      v-show="tutorialStep === 0"
      @next-step="nextTutorial"
      @skip="setStep(8)"
    />
    <StartExam
      v-show="tutorialStep === 8"
      :duration="event.duration"
      :use-tutorial="true"
      @reset-tutorial="setStep(1)"
      @start-exam="startExam"
    />
    <div
      :class="$style.overlay"
      v-if="tutorialStep > 0 && tutorialStep <= 7"
    ></div>

    <div :class="$style.header" id="header">
      <p :class="$style.breadcrumb">
        <span :class="$style.nav" @click="$router.push({ name: 'Home' })"
          >IF 1210 - Dasar Pemrograman</span
        >
        / {{ event.name }}
      </p>
      <div :class="$style.headerContent">
        <button
          :class="$style.backBtn"
          class="btn btn-primary"
          @click="$router.push({ name: 'Home' })"
        >
          <font-awesome-icon icon="arrow-left" :class="$style.icon" />
          Back
        </button>
        <p :class="$style.title">{{ event.name }}</p>
      </div>
    </div>
    <div :class="$style.content">
      <div
        :class="[
          $style.tutorialWrapper,
          tutorialStep === 1 ? $style.highlighted : '',
        ]"
      >
        <SpeechBubble
          v-if="tutorialStep === 1"
          :text="tutorialText"
          :is-top="true"
          :is-left="false"
          :arrow-left="true"
          @next-step="nextTutorial"
        />
        <Question
          id="step-1"
          @change-number="changeNumber"
          :question="currentQuestion"
          :current-number="currentNumber"
          :total-question="totalQuestion"
        />
      </div>
      <div>
        <Utils
          :current-number="currentNumber"
          :duration="event.duration"
          :exam="currentExam"
          :max-scores="event.max_score"
          :test-cases="event.test_case"
          :floating-timer="floatingTimer"
          @update-exam="updateUserExams"
          @update-ls="updateLS"
          @change-number="changeNumber"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.event {
  .header {
    width: 100%;
    background: white;
    padding: 1.5rem 2rem;

    position: sticky;
    top: 0;
    transition: all 0.25s ease-in-out;

    &Content {
      margin-top: 1rem;
      display: flex;
      align-items: center;
    }

    .title {
      font-size: 1.5rem;
    }
  }

  .backBtn {
    margin-right: 1rem;
    width: 100%;
    max-width: 110px;
  }

  .breadcrumb {
    font-size: 1rem;

    .nav {
      cursor: pointer;

      &:hover {
        color: lighten($color: #000000, $amount: 20);
      }
    }
  }

  .content {
    max-width: 1600px;
    margin: auto;
    padding: 2rem;
    display: grid;
    grid-template-columns: 40% 60%;
    column-gap: 1rem;
  }
}

.highlighted {
  z-index: 10;
}
.tutorialWrapper {
  position: relative;
  width: 100%;
}

.overlay {
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10;
  position: fixed;
  width: 100vw;
  height: 100vh;
}
</style>
