<script>
export default {
  name: "SpeechBubble",
  props: {
    text: String,
    isTop: Boolean,
    isLeft: Boolean,
    arrowLeft: Boolean,
    wider: {
      default: false,
      type: Boolean,
    },
    middle: {
      default: false,
      type: Boolean,
    },
  },
  methods: {
    next() {
      this.$emit("next-step");
    },
  },
};
</script>

<template>
  <div
    :class="[
      $style.speechBubble,
      isTop ? $style.top : $style.bottom,
      isLeft ? $style.left : $style.right,
      wider ? $style.wide : '',
      middle ? $style.middle : '',
    ]"
  >
    <div :class="$style.bubbleContent">
      <div :class="$style.mainContent">
        <p :class="$style.messageText">
          {{ text }}
        </p>
        <button @click="next" class="btn btn-primary" :class="$style.customBtn">
          <p>Next</p>
          <font-awesome-icon :class="$style.icon" icon="chevron-right" />
        </button>
      </div>
      <div
        :class="[
          $style.arrow,
          isTop ? $style.bottom : $style.top,
          arrowLeft ? $style.left : $style.right,
        ]"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" module>
.speechBubble {
  position: absolute;
  background: #ffffff;
  width: 700px;
  -webkit-box-shadow: 0px 0px 40px -1px rgba(0, 0, 0, 0.32);
  -moz-box-shadow: 0px 0px 40px -1px rgba(0, 0, 0, 0.32);
  box-shadow: 0px 0px 40px -1px rgba(0, 0, 0, 0.32);
  border: none;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  &.top {
    bottom: 105%;

    &.middle {
      bottom: 150%;
    }

    &.wide {
      bottom: 180%;
    }
  }

  &.left {
    right: 50%;
  }

  &.right {
    left: 50%;
  }

  &.bottom {
    top: 100%;

    &.middle {
      top: 120%;
    }

    &.wide {
      top: 180%;
    }
  }

  .bubbleContent {
    position: relative;
  }

  .mainContent {
    display: flex;
    justify-content: space-between;
  }

  .messageText {
    text-align: left;
  }

  .messageText {
    font-size: 1rem;
    font-weight: normal;
    color: black;
  }
}

.customBtn {
  width: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
}

.icon {
  margin-left: 0.5rem;
}

.arrow {
  position: absolute;
  width: 0;
  height: 0;
  // z-index: -1;

  &.top {
    border-left: 1.75rem solid transparent;
    border-right: 1.75rem solid transparent;
    border-bottom: 2rem solid white;
    border-radius: 4px;
    top: -3rem;
  }

  &.bottom {
    border-left: 1.75rem solid transparent;
    border-right: 1.75rem solid transparent;
    border-top: 2rem solid white;
    border-radius: 4px;
    bottom: -3rem;
  }

  &.right {
    right: 1.25rem;
  }

  &.left {
    left: 1.25rem;
  }
}
</style>
