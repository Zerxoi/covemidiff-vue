<template>
  <div>
    <h2>DiffTab</h2>
    <div>{{ tab }}</div>
  </div>
</template>

<script>
export default {
  name: "DiffTab",
  data() {
    return {
      tab: null,
    };
  },
  computed: {
    taskId() {
      return this.$route.params.taskId;
    },
    method() {
      return this.$route.params.method;
    },
    diffTabs: {
      get() {
        return this.$store.state.diffTabs;
      },
      set(val) {
        this.$store.commit("updateDiffTabs", val);
      },
    },
  },
  created() {
    let tabName = this.taskId + "-" + this.method;
    this.tab = this.diffTabs.find((tab) => tab.name === tabName);
  },
};
</script>

<style>
</style>