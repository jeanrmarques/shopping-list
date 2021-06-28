<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String,
  },
  data() {
    return {
      dataSet: "something",
    };
  },
};
</script>

<style scoped lang="scss"></style>
