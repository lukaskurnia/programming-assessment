<script>
import { VCodeMirror } from "vue3-code-mirror";
export default {
  name: "CodeEditor",
  components: {
    VCodeMirror,
  },
  props: {
    code: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      mode: {
        name: "javascript",
        json: true,
      },
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: "text/javascript",
        theme: "default",
        lineNumbers: true,
        line: true,
        // more codemirror options, 更多 codemirror 的高级配置...
      },
    };
  },
  methods: {
    changeCode(val) {
      this.$emit("type-answer", val);
    },
  },
};
</script>

<template>
  <div>
    <v-code-mirror
      :class="$style.editor"
      :value="code"
      :options="cmOptions"
      :mode="mode"
      :autoheight="true"
      :readonly="false"
      @update:value="changeCode"
    />
  </div>
</template>

<style lang="scss" module>
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap");
.editor {
  min-height: 500px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  * {
    font-family: "Source Code Pro", monospace !important;
  }
}
</style>
