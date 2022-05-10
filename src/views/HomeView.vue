<template>
  <div class="home flex flex-col justify-center items-center">
    <img alt="Vue logo" src="../assets/logo.png" class="w-[100px]" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
};
</script>
