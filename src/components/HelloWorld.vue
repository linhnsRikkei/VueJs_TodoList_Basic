<template>
  <div class="text-[25px] flex flex-col justify-center items-center">
    <h1>Hello world</h1>
    <h3>{{ value }}</h3>
    <h3>{{ msg }}</h3>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      value: " welcome to Your web",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
