<template>
  <v-app>
    <NavBar />
    <v-content class="ma-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "App",
  data: () => ({
    //
  }),
  components: {
    NavBar
  }
};
</script>

<style>
.whole-height {
  min-height: 3000px;
}
</style>
