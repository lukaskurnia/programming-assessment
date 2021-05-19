<script>
import { mapActions, mapGetters } from "vuex";
import AssignmentCard from "@/components/AssignmentCard";
import ResetButton from "@/components/ResetButton";
import StartExam from "./Event/components/Modal/StartExam";
import { EXAMS } from "@/constants/exam";
export default {
  name: "Home",
  components: { AssignmentCard, ResetButton, StartExam },
  data() {
    return {
      course: "IF 1210 - Dasar Pemrograman",
      exams: EXAMS,
      modal: false,
      selectedEvent: {
        duration: null,
        id: null,
        title: "",
      },
    };
  },
  created() {
    this.initialize();
    this.checkUserFirstTime();
  },
  computed: {
    ...mapGetters({
      tutorialStep: "State/getTutorialStep",
    }),
    unfinished() {
      const data = this.exams.filter(el => {
        return el.finished_at === null;
      });
      // sort ascending by id_event
      data.sort((a, b) => a.id_event - b.id_event);
      return data;
    },
    finished() {
      const data = this.exams.filter(el => {
        return el.finished_at !== null;
      });
      data.sort((a, b) => {
        // sort by last finished
        if (a.finished_at > b.finished_at) {
          return -1;
        }
        if (a.finished_at < b.finished_at) {
          return 1;
        }
        return 0;
      });
      return data;
    },
  },
  methods: {
    ...mapActions({
      setStep: "State/setTutorialStep",
    }),
    initialize() {
      if (!localStorage.getItem("exam")) {
        localStorage.setItem("exam", JSON.stringify(this.exams));
      } else {
        this.exams = JSON.parse(localStorage.getItem("exam"));
      }
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
    handleModal(id, duration, title) {
      this.modal = true;
      this.selectedEvent.id = id;
      this.selectedEvent.duration = duration;
      this.selectedEvent.title = title;
    },
    closeModal() {
      this.modal = false;
    },
    navigate(id) {
      this.$router.push({ name: "Event", params: { id_event: id } });
    },
    navigateExplanatory(id) {
      this.$router.push({ name: "Explanatory", params: { id_event: id } });
    },
  },
};
</script>

<template>
  <div :class="$style.home">
    <StartExam
      v-show="modal"
      :duration="selectedEvent.duration"
      :title="selectedEvent.title"
      @close="closeModal"
      @start-exam="navigate(selectedEvent.id)"
    />
    <div :class="$style.header">{{ course }}</div>
    <div :class="$style.body">
      <p :class="$style.title">Your assignments:</p>
      <div :class="$style.unfinishedSection">
        <p :class="$style.title">Not Finished</p>
        <div :class="$style.container">
          <div
            :class="$style.cardContainer"
            v-for="(assignment, idx) in unfinished"
            :key="idx"
          >
            <AssignmentCard
              @click="
                assignment.started_at
                  ? navigate(assignment.id_event)
                  : handleModal(
                      assignment.id_event,
                      assignment.duration,
                      assignment.title
                    )
              "
              :grade="assignment.grade"
              :title="assignment.title"
              :ongoing="assignment.started_at ? true : false"
            />
          </div>
        </div>
      </div>

      <div :class="$style.finishedSection">
        <p :class="$style.title">Finished</p>
        <div :class="$style.container">
          <div
            :class="$style.cardContainer"
            v-for="(assignment, idx) in finished"
            :key="idx"
          >
            <AssignmentCard
              @click="navigateExplanatory(assignment.id_event)"
              :grade="assignment.grade"
              :title="assignment.title"
              :finished="assignment.finished_at"
            />
          </div>
        </div>
      </div>
    </div>
    <ResetButton />
  </div>
</template>

<style lang="scss" module>
.home {
  padding: 2rem;
  position: relative;
}

.header {
  padding: 1.5rem;
  font-size: 3rem;
  background: white;
}

.body {
  margin-top: 2rem;
  background: white;
  padding: 1.5rem;

  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .unfinishedSection,
  .finishedSection {
    margin-top: 2rem;
    .title {
      font-size: 1.25rem;
      font-weight: bold;
    }

    .container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 2rem;
      border-bottom: 1px solid #9e9e9e;

      .cardContainer {
        padding: 2rem;
        &:not(:last-child) {
          border-bottom: solid 1px #9e9e9e;
        }
        &:nth-last-child(2) {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
