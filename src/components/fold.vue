<template>
  <div id="fold" >
      <Icon type="md-folder" size="20" class="fold" @click="bindclick"/>
      <span v-text="foldName" class="fold" @click="bindclick">
      </span>
  </div>
</template>
<script>
export default {
  props: {
    foldName: {
      default: "1"
    },
      path: {
        default: "/"
      }
  },
  methods: {
    bindclick: function() {
      console.log(this.path)
      this.$axios
        .get("http://localhost:8081/getPath", {
          params: { path: this.path+"\\"+this.foldName }
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
.fold {
  cursor: pointer;
}
</style>

