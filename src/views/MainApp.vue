<template>
  <div id="main-app">
    <v-app>
      <NavBar />
      <v-content class="ma-4">
        <router-view></router-view>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    NavBar
  }
};
</script>

<style>
</style>