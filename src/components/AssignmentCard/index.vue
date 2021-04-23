<script>
export default {
  name: "AssignmentsCard",
  props: {
    grade: [Number, String],
    title: String,
    isFinished: {
      default: false,
      type: Boolean,
    },
    day: String,
    date: {
      default: "",
      type: String,
    },
    time: {
      default: "",
      type: String,
    },
  },
  computed: {
    datetime() {
      return `${this.date}, ${this.time}`;
    },
  },
};
</script>

<template>
  <div :class="$style.card">
    <div :class="$style.gradeBox">
      <p :class="$style.title">Grade</p>
      <div :class="$style.grade">
        <p>{{ grade }}</p>
      </div>
    </div>
    <div :class="$style.informationBox">
      <p :class="$style.title">{{ title }}</p>
      <p v-if="!isFinished" :class="$style.text">
        You haven’t finished this assignments yet
      </p>
      <div v-else>
        <p :class="$style.text">
          Finished
          <font-awesome-icon :class="$style.iconCheck" icon="check-circle" />
        </p>
        <div :class="$style.time">
          <p>Submitted {{ day }},</p>
          <p>{{ datetime }}</p>
        </div>
      </div>
    </div>
    <div :class="$style.floatingGroup">
      <p v-if="isFinished" :class="$style.review">Review</p>
      <font-awesome-icon
        :class="$style.iconChevron"
        icon="chevron-circle-right"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
$blue-1: #00316d;
$blue-2: #0d62ac;
.card {
  cursor: pointer;
  position: relative;
  background: $blue-1;
  border-radius: 1rem;
  padding: 2rem 2.5rem;
  display: flex;
  align-items: center;
  transition: all 0.25s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    -webkit-box-shadow: 0px 2px 8px darken($color: $blue-1, $amount: 5);
    -moz-box-shadow: 0px 2px 8px darken($color: $blue-1, $amount: 5);
    box-shadow: 0px 2px 8px darken($color: $blue-1, $amount: 5);
  }
}
.informationBox {
  margin-left: 2rem;
  color: white;

  .title {
    font-size: 1.25rem;
  }

  .text {
    font-size: 1rem;
    margin-top: 1rem;
  }

  .time {
    margin-top: 1rem;
  }
}

.icon {
  &Chevron {
    font-size: 2rem;
    color: white;
  }

  &Check {
    font-size: 1rem;
    color: #72d572;
    margin-left: 0.5rem;
  }
}
.floatingGroup {
  position: absolute;
  display: flex;
  align-items: center;
  right: 2rem;

  .review {
    margin-right: 1rem;
    font-size: 1.25rem;
    color: white;
    font-weight: bold;
  }
}

.gradeBox {
  height: 125px;
  width: 125px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;

  .title {
    border-radius: 12px 12px 0 0;
    font-size: 1rem;
    text-align: center;
    background: $blue-2;
    padding: 0.2rem;
    color: white;
  }

  .grade {
    border-radius: 0 0 12px 12px;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e8ebe9;
    color: $blue-1;
    font-size: 3rem;
    font-weight: bold;
  }
}
</style>
