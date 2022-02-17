<template>
  <el-menu :default-active="activeIndex" mode="horizontal" router>
    <el-menu-item index="/emi">EMI</el-menu-item>
    <el-menu-item index="/diff">Diff</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    activeIndex() {
      if (this.$route.matched.length > 1) {
        return this.$route.matched[0].path;
      } else {
        return this.$route.path;
      }
    },
  },
};
</script>

<style scoped>
.el-menu {
  margin-bottom: 20px;
}
</style>