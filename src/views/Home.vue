<script>
import AssignmentCard from "@/components/AssignmentCard";
import { UNFINISHED_ASSIGNMENTS, FINISHED_ASSIGNMENTS } from "@/constants/home";
export default {
  name: "Home",
  components: { AssignmentCard },
  data() {
    return {
      course: "IF 1210 - Dasar Pemrograman",
      unfinished: UNFINISHED_ASSIGNMENTS,
      finished: FINISHED_ASSIGNMENTS,
    };
  },
  methods: {
    navigate(id) {
      this.$router.push({ name: "Event", params: { id_event: id } });
    },
  },
};
</script>

<template>
  <div :class="$style.home">
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
              @click="navigate(assignment.id_event)"
              :grade="assignment.grade"
              :title="assignment.title"
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
              @click="navigate(assignment.id_event)"
              :grade="assignment.grade"
              :title="assignment.title"
              :day="assignment.day"
              :time="assignment.time"
              :date="assignment.date"
              :is-finished="assignment.isFinished"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.home {
  padding: 2rem;
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
