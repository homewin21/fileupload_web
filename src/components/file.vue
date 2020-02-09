<template>
  <div >
      <Icon type="ios-paper" size="20" class="file" @click="bindclick" />
      <span v-text="fileName" class="file" @click="bindclick">
      </span>
  </div>
</template>
<script>
export default {
  props: {
    fileName: {
      default: "1"
    }
  },
  methods: {
    bindclick: function() {
      this.$axios
        .get("http://localhost:8081/getPath", {
          params: { path: this.fileName }
        })
        .then(resp => {
          console.log(resp);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
.file {
  cursor: pointer;
}
</style>

