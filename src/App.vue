<template>
  <v-app>
    <NavBar :key="$route.fullPath" />
    <v-content class="ma-4">
      <router-view></router-view>
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/views/footer.vue";
// import LogIn from "@/components/login.vue";
// import { mapActions } from "vuex";
// import fromUnixTime from "date-fns/fromUnixTime";
export default {
  name: "App",
  data() {
    return {
      test: [],
      t: "hello"
    };
  },
  components: {
    NavBar,
    Footer
  }
};
</script>

<style>
.whole-height {
  min-height: 3000px;
}
</style>
