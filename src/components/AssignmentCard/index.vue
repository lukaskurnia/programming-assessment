<script>
import { toReadable } from "@/utils/datetime";
export default {
  name: "AssignmentsCard",
  props: {
    grade: Number,
    title: String,
    finished: Number,
    ongoing: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    datetime() {
      if (this.finished) {
        return toReadable(this.finished);
      }
      return "";
    },
  },
};
</script>

<template>
  <div :class="$style.card">
    <div v-if="finished" :class="$style.grade">
      <p>{{ grade }}</p>
      <p :class="$style.title">Grade</p>
    </div>
    <div v-else :class="$style.codeBox">
      <font-awesome-icon icon="laptop-code" :class="$style.iconCode" />
    </div>
    <div :class="$style.informationBox">
      <p :class="$style.title">{{ title }}</p>
      <p v-if="!finished && ongoing" :class="$style.text">
        <font-awesome-icon
          :class="$style.iconWarning"
          icon="exclamation-circle"
        />
        Your assignment is ongoing
      </p>
      <p v-else-if="!finished && !ongoing" :class="$style.text">
        You haven’t finished this assignments yet
      </p>
      <div v-else>
        <p :class="$style.text">
          Finished
          <font-awesome-icon :class="$style.iconCheck" icon="check-circle" />
        </p>
        <div :class="$style.time">
          <p>Submitted at,</p>
          <p>{{ datetime }}</p>
        </div>
      </div>
    </div>
    <div :class="$style.floatingGroup">
      <p v-if="finished" :class="$style.review">Review</p>
      <font-awesome-icon
        :class="$style.iconChevron"
        icon="chevron-circle-right"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
.card {
  cursor: pointer;
  position: relative;
  background: $primary;
  border-radius: 1rem;
  padding: 2rem 2.5rem;
  display: flex;
  align-items: center;
  transition: all 0.25s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    -webkit-box-shadow: 0px 2px 8px darken($color: $primary, $amount: 5);
    -moz-box-shadow: 0px 2px 8px darken($color: $primary, $amount: 5);
    box-shadow: 0px 2px 8px darken($color: $primary, $amount: 5);
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
    color: $success;
    margin-left: 0.5rem;
  }

  &Warning {
    font-size: 1rem;
    margin-right: 0.5rem;
    color: white;
  }

  &Code {
    font-size: 72px;
    color: white;
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

.codeBox {
  height: 125px;
  width: 125px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.grade {
  height: 125px;
  width: 125px;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #e8ebe9;
  border: 4px solid $secondary;
  color: $primary;
  font-size: 3rem;
  font-weight: bold;

  .title {
    font-size: 1rem;
    text-align: center;
    padding: 0.2rem;
    color: $secondary;
  }
}
</style>
