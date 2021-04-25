<script>
import Navigation from "./Navigation";
export default {
  name: "Utils",
  components: {
    Navigation,
  },
  props: {
    currentNumber: {
      type: Number,
      default: 1,
    },
    questions: Array,
  },
  methods: {
    changeNumber(val) {
      this.$emit("change-number", val);
    },
  },
};
</script>

<template>
  <div :class="$style.utils">
    <div :class="$style.upperSection">
      <div :class="$style.navSection">
        <Navigation
          :questions="questions"
          :current-number="currentNumber"
          @change-number="changeNumber"
        />
      </div>
      <div :class="$style.timerSection">Hai</div>
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
</style>
