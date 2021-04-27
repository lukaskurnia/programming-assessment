<script>
export default {
  name: "Grader",
  props: {
    testCase: Array,
  },
};
</script>

<template>
  <div :class="$style.grader">
    <p :class="$style.header">Test Case</p>
    <div>
      <div
        :class="[$style.box, item ? $style.success : $style.failed]"
        v-for="(item, idx) in testCase"
        :key="idx"
      >
        <p>
          <font-awesome-icon
            v-if="item"
            icon="check-circle"
            :class="$style.icon"
          />
          <font-awesome-icon v-else icon="times" :class="$style.icon" />
          Test Case {{ idx + 1 }}
        </p>
        <p>{{ item }}</p>
        <p v-if="item">Accepted</p>
        <p v-else>Wrong answer</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.grader {
  background: white;
  .header {
    padding: 1rem;
    text-align: center;
    width: 100%;
    background: $primary;
    color: white;
    font-size: 1.5rem;
  }

  .box {
    padding: 1.25rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
    border-bottom: solid 1px #9e9e9e;
    justify-items: center;
    font-size: 1.25rem;
    font-weight: bold;
    color: $danger;

    &.success {
      color: $success;
    }

    &.failed {
      color: $danger;
    }

    .icon {
      margin-right: 1rem;
    }
  }
}
</style>
