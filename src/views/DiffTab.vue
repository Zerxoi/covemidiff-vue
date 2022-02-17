<template>
  <div>
    <div class="button-bar">
      <el-button @click="insertReason" :disabled="buttonDisabled">
        Show Reason
      </el-button>
    </div>
    <code-diff
      :old-string="gcov"
      :new-string="llvmcov"
      output-format="side-by-side"
      language="C"
    />
  </div>
</template>

<script>
import { CodeDiff } from "v-code-diff";

import * as Diff from "@/api/diff";

export default {
  name: "DiffTab",
  data() {
    return {
      buttonDisabled: false,
      gcov: "",
      llvmcov: "",
      tab: null,
      diffs: null,
      diffIndex: 0,
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
  methods: {
    insertReason() {
      this.buttonDisabled = true;
      let bodies = document.getElementsByClassName("d2h-diff-tbody");
      let gcovBody = bodies[0];
      let llvmcovBody = bodies[1];
      let gcovLines = bodies[0].children;
      let llvmcovLines = bodies[1].children;
      this.insertReasonInner(
        gcovBody,
        llvmcovBody,
        gcovLines,
        llvmcovLines,
        true
      );
      this.insertReasonInner(
        gcovBody,
        llvmcovBody,
        gcovLines,
        llvmcovLines,
        false
      );
    },
    insertReasonInner(gcovBody, llvmcovBody, gcovLines, llvmcovLines, isGcov) {
      let lines;
      if (isGcov) {
        lines = gcovLines;
      } else {
        lines = llvmcovLines;
      }
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (
          line.children.length > 0 &&
          parseInt(line.children[0].innerText) ===
            this.diffs[this.diffIndex].lineNum
        ) {
          let diff = this.diffs[this.diffIndex];
          this.diffIndex++;
          if (this.diffIndex >= this.diffs.length) {
            return;
          }
          let gcovTr = document.createElement("tr");
          let llvmcovTr = document.createElement("tr");
          let numTd = document.createElement("td");
          let lineTd = document.createElement("td");
          lineTd.style.color = "#409EFF";
          lineTd.innerText = diff.reason;
          if (diff.fileTypeId == 0) {
            gcovTr.appendChild(numTd);
            gcovTr.appendChild(lineTd);
          } else {
            llvmcovTr.appendChild(numTd);
            llvmcovTr.appendChild(lineTd);
          }
          gcovBody.insertBefore(gcovTr, gcovLines[i + 1]);
          llvmcovBody.insertBefore(llvmcovTr, llvmcovLines[i + 1]);
        }
      }
    },
  },
  created() {
    this.tab = this.diffTabs.find((tab) => tab.name === this.tabName);
    let arr = this.tabName.split("-");
    let params = { taskId: arr[0], method: arr[1] };
    Diff.Contents(params).then((res) => {
      this.gcov = res.data.gcov;
      this.llvmcov = res.data.llvmcov;
    });
    Diff.List(params).then((res) => {
      this.diffs = res.data;
    });
  },
  components: {
    CodeDiff,
  },
};
</script>

<style scoped>
.button-bar {
  margin-bottom: 10px;
}
</style>