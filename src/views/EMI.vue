<template>
  <div>
    <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-form-item label="Task ID">
        <el-input
          v-model="params.taskId"
          placeholder="Search Task ID"
        ></el-input>
      </el-form-item>
      <el-form-item label="Method">
        <el-select v-model="params.method" clearable placeholder="All">
          <el-option label="Pre" value="0"></el-option>
          <el-option label="Post" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Status">
        <el-select v-model="params.status" clearable placeholder="All">
          <el-option label="Error" value="0"></el-option>
          <el-option label="Diff" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit"
          >Search</el-button
        >
      </el-form-item>
    </el-form>
    <el-row :gutter="20">
      <el-col :span="6" v-for="emi in emis" :key="emi.id">
        <el-card shadow="hover" @click.native="diffShow(emi)">
          {{ emi.taskId }} {{ emiMethod(emi.method) }}
          {{ emiStatus(emi.status) }}
        </el-card>
      </el-col>
    </el-row>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.page"
      :page-sizes="[16, 32, 64]"
      :page-size="params.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    />
  </div>
</template>

<script>
import * as EMI from "@/api/emi";

export default {
  name: "EMI",
  data() {
    return {
      params: {
        taskId: null,
        method: null,
        status: null,
        page: 1,
        size: 16,
      },
      total: 0,
      emis: [],
    };
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
  methods: {
    emiList() {
      EMI.List(this.params).then((res) => {
        this.emis = res.data.records;
        this.total = res.data.total;
      });
    },
    handleSizeChange(size) {
      this.params.size = size;
      this.emiList();
    },
    handleCurrentChange(current) {
      this.params.page = current;
      this.emiList();
    },
    onSubmit() {
      this.emiList();
    },
    diffShow(emi) {
      let tabName = emi.taskId + "-" + emi.method;
      if (!this.diffTabs.find((tab) => tab.name === tabName)) {
        this.diffTabs.push({
          title: emi.taskId + this.emiMethod(emi.method),
          name: tabName,
        });
      }
      this.activeTabName = tabName;
      this.$router.push({
        name: "diff",
      });
    },
    emiMethod(code) {
      return code === 0 ? "Pre" : "Post";
    },
    emiStatus(code) {
      return code === 0 ? "Error" : "Diff";
    },
  },
  beforeMount() {
    this.emiList();
  },
};
</script>

<style>
.el-col {
  margin-bottom: 20px;
}
</style>