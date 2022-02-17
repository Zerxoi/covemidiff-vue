<template>
  <div>
    <el-tabs
      v-if="diffTabs.length"
      v-model="activeTabName"
      type="card"
      closable
      @tab-remove="handleRemove"
    >
      <el-tab-pane
        :key="diff.name"
        v-for="diff in diffTabs"
        :label="diff.title"
        :name="diff.name"
      >
        <diff-tab :tab-name="diff.name" />
      </el-tab-pane>
    </el-tabs>
    <el-empty v-else description="无标签"></el-empty>
  </div>
</template>

<script>
import DiffTab from "./DiffTab.vue";
export default {
  name: "Diff",
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
  methods: {
    handleRemove(targetName) {
      let tabs = this.diffTabs;
      let activeName = this.activeTabName;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.activeTabName = activeName;
      this.diffTabs = tabs.filter((tab) => tab.name !== targetName);
    },
  },
  components: {
    DiffTab,
  },
};
</script>

<style>
</style>