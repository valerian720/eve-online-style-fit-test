<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <span>Баллансиор</span>
        <small class="ultra-small mx-2 color-gray"><VersionDisplay /></small>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-link" to="/"
            >создание наборов модулей</router-link
          >
          <!-- <router-link class="nav-link" to="/about">About</router-link> -->
        </div>
      </div>
    </div>
  </nav>
  <router-view />
</template>
<script>
import VersionDisplay from "@/components/VersionDisplay.vue";
export default {
  name: "App",
  components: {
    VersionDisplay,
  },
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}
.ultra-small {
  font-size: 0.5em;
}
.color-gray {
  color: gray;
}
</style>
