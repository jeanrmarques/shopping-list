<template>
  <article id="root">
    <Header title="Shopping Tracker" />
    <router-view />
  </article>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style lang="scss">
:root {
  --main: #095bad;
  --secondary: #3593e0;
  --dark: #333;
}

article#root {
  min-height: 100vh;
}

.bg-image {
  background: url("./assets/busyconsumers_0.jpg") no-repeat;
  background-size: cover;
  z-index: 1;
  position: fixed;
  left: -2.5vw;
  display: block;
  width: 105vw;
  height: 105vh;
  filter: blur(5px) grayscale(0.9);
  top: -2.5vh;
}

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--dark);
  position: relative;
  z-index: 2;
  background: #1146467a;
}
</style>
