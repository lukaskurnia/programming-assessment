<script>
import { toReadable } from "@/utils/datetime";
import Feedback from "../../Event/components/Feedback";
import Navigation from "../../Event/components/Navigation";
import CodeEditor from "../../Event/components/CodeEditor";
import Grader from "../../Event/components/Grader";
import ModalSummary from "../../Event/components/Modal/ModalSummary";
export default {
  name: "Utils",
  components: {
    Navigation,
    CodeEditor,
    Feedback,
    Grader,
    ModalSummary,
  },
  props: {
    currentNumber: {
      type: Number,
      default: 1,
    },
    testCases: Array,
    maxScores: Array,
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
    };
  },
  created() {
    this.fetchUserData();
  },
  watch: {
    currentNumber() {
      this.currentTab = 0;
    },
  },
  computed: {
    datetime() {
      if (this.exam.finished_at) {
        return toReadable(this.exam.finished_at);
      }
      return "";
    },
    total() {
      let sum = 0;
      for (let item of this.maxScores) {
        sum += item;
      }
      return sum;
    },
    marks() {
      let sum = 0;
      for (let item of this.userData.score) {
        sum += item;
      }
      return sum;
    },
  },
  methods: {
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
    fetchUserData() {
      this.exam.questions.map(el => {
        this.userData.answer.push(el.answers);
        this.userData.status.push(el.status);
        this.userData.score.push(el.score);
        this.userData.tries.push(el.tries);
      });
    },
  },
};
</script>

<template>
  <div :class="$style.utils">
    <ModalSummary
      v-show="modal.active && modal.name === 'summary'"
      :is-review="true"
      :grade="exam.grade"
      :max-score="maxScores"
      :user-data="userData"
      :current-number="currentNumber"
      @change-number="changeNumber"
      @close="closeModal"
    />

    <div :class="$style.upperSection">
      <div :class="$style.navSection">
        <Navigation
          :is-review="true"
          :max-score="maxScores"
          :user-data="userData"
          :current-number="currentNumber"
          @change-number="changeNumber"
        />
      </div>

      <div :class="$style.infoBox">
        <div :class="$style.info">
          <p>Completed on</p>
          <span>:</span>
          <p>
            <b>{{ datetime }}</b>
          </p>
          <p>Marks</p>
          <span>:</span>
          <p>
            <b>{{ marks }}/{{ total }}</b>
          </p>
          <p>Grade</p>
          <span>:</span>
          <p>
            <b>{{ exam.grade }}/100</b>
          </p>
        </div>
        <div :class="$style.btnGroup">
          <button
            @click="openModal('summary')"
            class="btn btn-primary"
            :class="$style.summaryBtn"
          >
            Summary
          </button>

          <button
            @click="$router.push({ name: 'Home' })"
            class="btn btn-primary"
            :class="$style.finishBtn"
          >
            Finish Review
          </button>
        </div>
      </div>
    </div>
    <div :class="$style.middleSection">
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
          :readonly="true"
          :code="userData.answer[currentNumber - 1][currentTab]"
        />
      </div>
    </div>
    <div
      :class="$style.bottomSection"
      v-if="userData.status[currentNumber - 1]"
    >
      <div>
        <Feedback :status="userData.status[currentNumber - 1]" />
      </div>
      <div
        :class="$style.graderSection"
        v-if="
          userData.status[currentNumber - 1] !== 'run-success' &&
          userData.status[currentNumber - 1] !== 'run-error'
        "
      >
        <Grader :test-case="testCases[currentNumber - 1]" />
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

.graderSection {
  margin-top: 1.5rem;
}

.infoBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem;

  .info {
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 0.5rem;
  }
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
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .summaryBtn {
    width: 100%;
  }
  .finishBtn {
    width: 100%;
    margin-top: 2rem;
  }
}
</style>
