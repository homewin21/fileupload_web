<template>
  <div id="button" >
    <button @click="bindclick" >
      <span>{{msg}}</span>
    </button>
  </div>
</template>
<script>
export default {
  props:{
    msg:{
      default:'default'
    }
  },
  methods:{
    bindclick:function () {
      alert(this.msg)
    }
  }
}
</script>
