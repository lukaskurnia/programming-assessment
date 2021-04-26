<script>
export default {
  name: "Feedback",
  props: {
    // feedbackType: {
    //   type: String,
    //   validator: value => {
    //     return ["run", "submit"].indexOf(value) !== -1;
    //   },
    //   default: "run",
    // },
    status: {
      type: String,
      validator: value => {
        return (
          [
            "run-error",
            "run-success",
            "submit-success",
            "submit-wrong",
            "submit-partial",
          ].indexOf(value) !== -1
        );
      },
      default: "run-success",
    },
  },
  computed: {
    successIndicator() {
      return this.status === "run-success" || this.status === "submit-success";
    },
    warningIndicator() {
      return this.status === "submit-partial";
    },
    dangerIndicator() {
      return this.status === "run-error" || this.status === "submit-wrong";
    },
    text() {
      switch (this.status) {
        case "run-error":
          return "Compile Error";
        case "run-success":
          return "Compile Success";
        case "submit-success":
          return "Congratulations!";
        case "submit-wrong":
        case "submit-partial":
          return "Wrong answer";
        default:
          return "Congratulations!";
      }
    },
    subText() {
      switch (this.status) {
        case "submit-success":
          return "Your answer is correct!";
        case "submit-wrong":
          return "Your answer is incorrect!";
        case "submit-partial":
          return "Your answer is partially correct, better luck next time :{";
        default:
          return "Your answer is correct!";
      }
    },
    message() {
      if (this.status === "run-error") {
        return "In function `_start': (.text+0x20): undefined reference to `main' collect2: error: ld returned 1 exit status";
      } else if (this.status === "run-success") {
        return "Your code has been successfully run! Don’t forget to submit your code by click “submit”";
      } else {
        return "";
      }
    },
  },
};
</script>

<template>
  <div v-if="status === 'run-success' || status === 'run-error'">
    <div
      :class="[$style.card, successIndicator ? $style.success : $style.failed]"
    >
      <p :class="$style.run">
        {{ text }}
      </p>
    </div>
    <div :class="$style.messageBox">
      <p :class="$style.title">Message:</p>
      <p :class="$style.msg">{{ message }}</p>
    </div>
  </div>
  <div
    v-else
    :class="[
      $style.flexCard,
      successIndicator
        ? $style.success
        : dangerIndicator
        ? $style.failed
        : $style.partial,
    ]"
  >
    <div :class="[$style.submit, warningIndicator ? $style.warning : '']">
      <p :class="$style.submitText">{{ text }}</p>
      <p :class="$style.submitSubText">{{ subText }}</p>
    </div>
    <font-awesome-icon
      :class="$style.icon"
      icon="check-circle"
      v-if="successIndicator"
    />
    <font-awesome-icon
      :class="$style.icon"
      icon="times"
      v-else-if="dangerIndicator"
    />
  </div>
</template>

<style lang="scss" module>
.card {
  width: 100%;
  padding: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
}

.success {
  background: $success;
}

.failed {
  background: $danger;
}

.partial {
  background: $warning;
}

.icon {
  font-size: 2rem;
  color: white;
}

.flexCard {
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.submit {
  color: white;

  &.warning {
    color: black;
  }
}

.submitText {
  font-size: 1.75rem;
  font-weight: bold;
}

.submitSubText {
  margin-top: 1rem;
  font-size: 0.875rem;
}

.run {
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
}

.messageBox {
  padding: 1rem;
  margin-top: 2rem;
  background: #f3f7f7;
  .title {
    font-size: 1.125rem;
    font-weight: bold;
  }

  .msg {
    margin-top: 1rem;
    font-size: 1.125rem;
    font-weight: bold;
  }
}
</style>
