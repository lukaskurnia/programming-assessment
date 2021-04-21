<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      num : 0
    }
  },
  created() {
    if(localStorage.getItem('num')){
      this.num = parseInt(localStorage.getItem('num'))
    }
  },
  methods: {
    handleClick() {
      this.num++
      localStorage.setItem('num', this.num)

    }
  }
};
</script>


<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /> 
    <p>Current Number : {{num}}</p>
    <button @click="handleClick">Increment</button>
  </div>
</template>


<style lang="scss" module>
</style>