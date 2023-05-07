<template>
  <div class="home">
    <FitComponent msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import FitComponent from "@/components/FitComponent.vue";

export default {
  name: "HomeView",
  components: {
    FitComponent,
  },
};
</script>
