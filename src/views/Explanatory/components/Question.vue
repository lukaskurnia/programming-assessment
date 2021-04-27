<script>
export default {
  name: "Question",
  props: {
    question: {
      type: Object,
      default: function () {
        return {
          title: "Sample Question",
          subtitle: "This is some description for a question",
          example: "<p>Some example</p><p class='mt'>Return value</p>",
          desc:
            "<p>This is function description</p><p class='mt'>int a</p><p>int b</p><p class='mt'>Returns</p><p class='mt'>Constraints</p>",
          input: '<p class="code">a = 2</p><p class="code">b = 3</p>',
          output: '<p class="code">5</p>',
          explanation: "<p>2 + 3 = 5</p>",
        };
      },
    },
    currentNumber: {
      type: Number,
      default: 1,
    },
    totalQuestion: {
      type: Number,
      default: 5,
    },
  },
  methods: {
    next() {
      if (this.currentNumber < this.totalQuestion) {
        this.$emit("change-number", this.currentNumber + 1);
      }
    },
    prev() {
      if (this.currentNumber > 1) {
        this.$emit("change-number", this.currentNumber - 1);
      }
    },
  },
};
</script>
<template>
  <div :class="$style.question">
    <div :class="$style.header">
      <p :class="$style.title">{{ question.title }}</p>
      <div :class="$style.numberGroup">
        <font-awesome-icon
          @click="prev"
          :class="[$style.icon, currentNumber === 1 ? $style.disable : '']"
          icon="arrow-circle-left"
        />
        <p :class="$style.number">{{ currentNumber }}</p>
        <font-awesome-icon
          @click="next"
          :class="[
            $style.icon,
            currentNumber === totalQuestion ? $style.disable : '',
          ]"
          icon="arrow-circle-right"
        />
      </div>
    </div>
    <div :class="$style.questionBox">
      <p>{{ question.subtitle }}</p>
      <div :class="$style.questionElement">
        <p :class="$style.elementTitle">Example</p>
        <p
          class="clearfix"
          :class="$style.content"
          v-html="question.example"
        ></p>
      </div>
      <div :class="$style.questionElement">
        <p :class="$style.elementTitle">Description</p>
        <p class="clearfix" :class="$style.content" v-html="question.desc"></p>
      </div>
      <div :class="$style.questionElement">
        <p :class="$style.elementTitle">Sample Input</p>
        <div :class="$style.codeBox">
          <p class="clearfix" v-html="question.input"></p>
        </div>
      </div>
      <div :class="$style.questionElement">
        <p :class="$style.elementTitle">Sample output</p>
        <div :class="$style.codeBox">
          <p class="clearfix" v-html="question.output"></p>
        </div>
      </div>
      <div :class="$style.questionElement">
        <p :class="$style.elementTitle">Explanation</p>
        <p
          class="clearfix"
          :class="$style.content"
          v-html="question.explanation"
        ></p>
      </div>
    </div>
    <div :class="[$style.numberGroup, $style.right]">
      <font-awesome-icon
        @click="prev"
        :class="[$style.icon, currentNumber === 1 ? $style.disable : '']"
        icon="arrow-circle-left"
      />
      <p :class="$style.number">{{ currentNumber }}</p>
      <font-awesome-icon
        @click="next"
        :class="[
          $style.icon,
          currentNumber === totalQuestion ? $style.disable : '',
        ]"
        icon="arrow-circle-right"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@200;400&display=swap");
.question {
  width: 100%;
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    justify-content: space-between;

    .title {
      font-size: 1.25rem;
      font-weight: bold;
    }
  }

  .numberGroup {
    display: flex;

    &.right {
      align-self: flex-end;
    }

    .number {
      margin: 0 1rem;
      font-size: 1.25rem;
      font-weight: bold;
    }

    .icon {
      cursor: pointer;
      font-size: 1.5rem;
      color: $primary;

      &:hover {
        color: lighten($color: $primary, $amount: 10);
      }

      &.disable {
        cursor: not-allowed;
        opacity: 0.3;
      }
    }
  }
  &Box {
    margin: 3rem 0;
    font-size: 1.25rem;
  }

  &Element {
    margin-top: 1.5rem;
    .elementTitle {
      font-weight: bold;
    }

    .content {
      margin-top: 1rem;
    }

    .codeBox {
      background: #f3f7f7;
      padding: 1rem;
      margin-top: 1rem;
    }
  }
}
</style>
