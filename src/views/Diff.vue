<template>
  <div>
    <el-tabs
      v-model="activeTabName"
      type="card"
      closable
      @tab-click="handleClick"
      @tab-remove="handleRemove"
    >
      <el-tab-pane
        :key="diff.name"
        v-for="diff in diffTabs"
        :label="diff.title"
        :name="diff.name"
      >
        <keep-alive>
          <router-view />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
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
};
</script>

<style>
</style>