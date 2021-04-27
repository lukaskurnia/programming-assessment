<script>
export default {
  name: "Loading",
  props: {
    run: {
      type: Boolean,
      default: true,
    },
    upload: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<template>
  <div :class="$style.loading">
    <p v-if="run && !upload">Compiling your answer</p>
    <p v-if="!run && !upload">Grading your answer</p>
    <div :class="$style.loader"></div>
    <p v-if="upload" :class="$style.text">Uploading code..</p>
    <p v-else :class="$style.text">Result will be displayed here shortly</p>
  </div>
</template>

<style lang="scss" module>
.loading {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .text {
    margin-top: 1rem;
  }

  .loader {
    margin-top: 1rem;
    border: 8px solid #f3f7f7;
    border-radius: 50%;
    border-top: 8px solid $primary;
    width: 48px;
    height: 48px;
    -webkit-animation: spin 1s linear infinite; /* Safari */
    animation: spin 1s linear infinite;
  }
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
