<template>
  <div id="graph">
    <h1>Hello this is graph</h1>
    <p v-for="name in names" :key="name">{{name}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      names: this.$store.state.fertilizersName
    };
  }
};
</script>

<style>
</style>