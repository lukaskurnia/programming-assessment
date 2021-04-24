<script>
import { EVENT_DATA } from "@/constants/event";
import Question from "./components/Question";
export default {
  name: "Event",
  components: {
    Question,
  },
  data() {
    return {
      event: {},
      currentNumber: 1,
      totalQuestion: 1,
    };
  },
  created() {
    window.scrollTo(0, 0);

    // Fetch problemset
    this.event = EVENT_DATA.find(
      el => el.id_event === parseInt(this.$route.params.id_event)
    );
    this.totalQuestion = this.event.questions.length;
  },
  mounted() {
    // on scroll effect
    window.addEventListener("scroll", this.addOnScrollEvent);
    this.addOnScrollEvent();
  },
  unmounted() {
    window.removeEventListener("scroll", this.addOnScrollEvent);
  },
  computed: {
    currentQuestion() {
      return this.event.questions[this.currentNumber - 1];
    },
  },
  methods: {
    addOnScrollEvent() {
      const $header = document.getElementById("header");
      $header.style.zIndex = window.pageYOffset > 40 ? 2 : 0;
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
        <span @click="$router.push({ name: 'Home' })"
          >IF 1210 - Dasar Pemrograman / </span
        >{{ event.name }}
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
      <div :class="$style.questionBox">
        <Question
          @change-number="changeNumber"
          :question="currentQuestion"
          :current-number="currentNumber"
          :total-question="totalQuestion"
        />
      </div>
      <div>This section is in progress</div>
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
  }

  .content {
    padding: 2rem;
    display: grid;
    grid-template-columns: 40% 60%;
    column-gap: 1rem;
  }
}
</style>
