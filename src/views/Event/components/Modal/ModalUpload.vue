<script>
import Loading from "@/components/Loading";
export default {
  name: "ModalUpload",
  data() {
    return {
      step: 1,
      filename: "No file chosen",
      tempFile: "",
      loading: false,
    };
  },
  components: {
    Loading,
  },
  methods: {
    next() {
      if (this.step < 2) {
        this.step++;
      }
    },
    close() {
      this.step = 1;
      this.filename = "No file chosen";
      this.tempFile = "";
      this.loading = false;
      this.$emit("close");
    },
    tryUpload(evt) {
      const file = evt.target.files[0];
      const reader = new FileReader();
      this.filename = file.name;

      reader.onload = e => (this.tempFile = e.target.result);
      reader.readAsText(file);
    },
    upload() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$emit("upload", this.tempFile);
        this.close();
      }, 1000);
    },
  },
};
</script>

<template>
  <div :class="$style.backdrop">
    <div :class="$style.wrapper">
      <font-awesome-icon @click="close" icon="times" :class="$style.icon" />
      <p :class="$style.title">Upload Code</p>
      <Loading v-if="loading" :upload="true" />
      <div v-else>
        <p :class="$style.subtitle" v-if="step === 1">
          Uploading a file will replace the current content in your code editor.
          Would you like to continue?
        </p>
        <div :class="$style.uploader" v-if="step === 2">
          <input type="file" id="upload" hidden @change="tryUpload" />
          <label class="btn btn-primary--alt" for="upload"
            ><font-awesome-icon
              icon="upload"
              :class="$style.iconUpload"
            />Choose file</label
          >
          <p :class="$style.filename">{{ filename }}</p>
        </div>
        <div :class="$style.btnGroup">
          <button
            v-if="step === 1"
            @click="close"
            :class="$style.noBtn"
            class="btn btn-primary--alt"
          >
            No
          </button>
          <button
            v-if="step === 1"
            @click="next"
            :class="$style.contBtn"
            class="btn btn-primary"
          >
            Yes
          </button>
          <button
            v-if="step === 2"
            @click="upload"
            :disabled="!tempFile"
            :class="$style.contBtn"
            class="btn btn-primary"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  --modal-animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-name: modalShowUp;
  animation-duration: var(--modal-animation-duration);
  animation-timing-function: ease;

  background: white;
  max-width: 700px;
  width: 50%;
  padding: 2.5rem 3rem 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;

  position: relative;
}
.backdrop {
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 200;
  position: fixed;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 2rem;
  font-weight: bold;
}

.icon {
  cursor: pointer;
  top: 1.5rem;
  right: 1.5rem;
  position: absolute;
  font-size: 1.5rem;
}

.subtitle {
  margin-top: 2.5rem;
  font-size: 1.25rem;
}

.uploader {
  margin-top: 2.5rem;
  display: flex;
  align-items: center;
  .iconUpload {
    margin-right: 1rem;
  }

  .filename {
    margin-left: 1.5rem;
  }
}

.btnGroup {
  justify-content: flex-end;
  margin-top: 6rem;
  display: flex;
  width: 100%;

  button {
    width: 100%;

    &:not(:first-child) {
      margin-left: 1rem;
    }
  }

  .contBtn {
    max-width: 194px;
  }

  .noBtn {
    max-width: 138px;
  }
}

@keyframes modalShowUp {
  0% {
    transform: translate(0, 10px) scale(1);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
}
</style>
