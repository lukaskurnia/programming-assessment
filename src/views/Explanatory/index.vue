<script>
import { EVENT_DATA } from "@/constants/event";
import { EXAMS } from "@/constants/exam";
import Question from "./components/Question";
import Utils from "./components/Utils";
export default {
  name: "Event",
  components: {
    Question,
    Utils,
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
    this.scrollTop();

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
  mounted() {
    // on scroll effect
    window.addEventListener("scroll", this.addOnScrollEvent);
    this.addOnScrollEvent();
  },
  unmounted() {
    window.removeEventListener("scroll", this.addOnScrollEvent);
  },
  watch: {
    currentNumber() {
      this.scrollTop();
    },
  },
  computed: {
    currentQuestion() {
      return this.event.questions[this.currentNumber - 1];
    },
  },
  methods: {
    initialize() {
      if (!localStorage.getItem("exam")) {
        localStorage.setItem("exam", JSON.stringify(this.exams));
      } else {
        this.exams = JSON.parse(localStorage.getItem("exam"));
      }
    },
    scrollTop() {
      window.scrollTo(0, 0);
    },
    addOnScrollEvent() {
      const $header = document.getElementById("header");
      $header.style.zIndex = window.pageYOffset > 10 ? 5 : 0;
      $header.style.boxShadow =
        window.pageYOffset > 10 ? "0 2px 8px rgba(0,0,0,0.12)" : "none";
    },
    changeNumber(val) {
      this.currentNumber = val;
    },
  },
};
</script>

<template>
  <div :class="$style.event">
    <div :class="$style.header" id="header">
      <p :class="$style.breadcrumb">
        <span :class="$style.nav" @click="$router.push({ name: 'Home' })"
          >IF 1210 - Dasar Pemrograman</span
        >
        / {{ event.name }}
      </p>

      <div :class="$style.leftContent">
        <button
          :class="$style.backBtn"
          class="btn btn-primary"
          @click="$router.push({ name: 'Home' })"
        >
          <font-awesome-icon icon="arrow-left" :class="$style.icon" />
          Back
        </button>
        <p :class="$style.title">{{ event.name }}</p>
        <p :class="$style.reviewBadge">Review</p>
      </div>
    </div>
    <div :class="$style.content">
      <div>
        <Question
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

    .title {
      font-size: 1.5rem;
    }
  }

  .leftContent {
    margin-top: 1rem;
    display: flex;
    align-items: center;
  }

  .reviewBadge {
    // background: #c9c9c9;
    // color: white;
    background: linear-gradient(93.02deg, #eabf59 19.98%, #ffdf6a);
    color: #700000;
    width: 100px;
    text-align: center;
    padding: 0.5rem;
    margin-left: 1rem;
    border-radius: 0.25rem;
    font-weight: bold;
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
</style>
