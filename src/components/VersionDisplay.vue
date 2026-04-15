<!-- eslint-disable vue/no-parsing-error -->
<template>
  <span>{{ getVersion() }} {{ getBuildDateTime() }}</span>
</template>

<script lang="js">
export default {
  name: "VersionDisplay",
  methods: {
    getVersion() {
      return process.env.VUE_APP_GIT_HASH;
    },
    getBuildDateTime() {
      return process.env.VUE_APP_BUILD_DATETIME;
    }
  },
};
</script>

<style lang="less"></style>
