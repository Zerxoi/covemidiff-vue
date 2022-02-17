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
  props: {
    tabName: String,
  },
  computed: {
    diffTabs: {
      get() {
        return this.$store.state.diffTabs;
      },
      set(val) {
        this.$store.commit("updateDiffTabs", val);
      },
    },
    activeTabName: {
      get() {
        return this.$store.state.activeTabName;
      },
      set(val) {
        this.$store.commit("updateActiveTabName", val);
      },
    },
  },
  created() {
    this.tab = this.diffTabs.find((tab) => tab.name === this.tabName);
  },
};
</script>

<style>
</style>