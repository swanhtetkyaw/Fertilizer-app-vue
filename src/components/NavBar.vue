<template>
  <nav>
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>Awesome You just add a new project</span>
      <v-btn text color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-app-bar app>
      <v-app-bar-nav-icon class="grey-text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="grey--text">
        <span class="font-weight-light">TODO</span>
        <span>APP</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Menu -->
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on" color="grey">
            <v-icon left>mdi-chevron-down</v-icon>
            <!-- or use mdi-chevron-down -->
            <span>Menu</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="link in links" :key="link.text" :to="link.route">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- Menu end -->
      <v-btn text small color="grey">
        <span>Sign-Out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- Nav drawer -->
    <v-navigation-drawer app v-model="drawer" color="indigo">
      <v-row class="my-7 flex-column">
        <v-responsive class="mt-5 text-center mr-n3">
          <v-avatar size="100">
            <img src="/avatar-1.png" alt="me" />
          </v-avatar>
        </v-responsive>
        <div class="subheading text-center white--text">Swan Htet Kyaw</div>
        <!-- popup button -->
        <Popup @projectAdded="snackbar = true" />
      </v-row>

      <v-list shaped>
        <v-list-item-group>
          <v-list-item v-for="link in links" :key="link.text" :to="link.route">
            <v-list-item-icon>
              <v-icon class="white--text">{{link.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- Nav drawer end -->
  </nav>
</template>

<script>
import Popup from "./Popup";
export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: "mdi-view-dashboard", text: "Dashboard", route: "/" },
        { icon: "mdi-folder", text: "My Projects", route: "/projects" },
        { icon: "mdi-account", text: "Team", route: "/team" }
      ],
      snackbar: false
    };
  },
  components: {
    Popup
  }
};
</script>

<style>
</style>