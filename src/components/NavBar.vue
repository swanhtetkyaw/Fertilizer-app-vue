<template>
  <nav>
    <!-- snackbar -->
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>Awesome You just add a new Sale</span>
      <v-btn text color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <!-- snackbar -->

    <!-- drawer -->
    <v-app-bar app>
      <v-app-bar-nav-icon v-if="islogin" class="grey-text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="grey--text">
        <span class="font-weight-light">Fertilizer</span>
        <span>APP</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!islogin" class="caption grey--text" small text to="login">Login</v-btn>
      <v-btn v-if="!islogin" class="caption grey--text" small text to="register">Signup</v-btn>
      <!-- profile -->
      <div v-if="islogin" id="profile" class="mr-2" @click="sendDashboard">
        <div class="px-2 py-1">
          <v-avatar size="30" class="mr-2">
            <img src="/avatar-1.png" alt="SwanHtetKyaw" />
          </v-avatar>
          <span class="caption grey--text">Swanhtetkyaw</span>
        </div>
      </div>

      <!-- profile -->
      <!-- Menu -->
      <v-menu offset-y v-if="islogin">
        <template v-slot:activator="{ on }">
          <v-btn color="grey lighten-3" fab x-small depressed v-on="on">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
          <!-- or use mdi-chevron-down -->
        </template>
        <v-list>
          <v-list-item-group class="primary--text">
            <v-list-item v-for="link in links" :key="link.text" :to="link.route">
              <v-list-item-title class="caption">{{ link.text }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="SignOut" id="signout">
              <v-list-item-title class="caption">LogOut</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <!-- Menu end -->
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
import { auth } from "@/firebase";
import Popup from "./Popup";
export default {
  data() {
    return {
      drawer: false,
      islogin: false,
      currentUser: null,
      links: [
        { icon: "mdi-view-dashboard", text: "Dashboard", route: "/" },
        { icon: "mdi-store", text: "Buy", route: "/buy" },
        {
          icon: "mdi-folder",
          text: "Inventory",
          route: "/inventory"
        },
        { icon: "mdi-receipt", text: "Graph", route: "/graph" },
        { icon: "mdi-account", text: "Admin", route: "/team" }
      ],
      snackbar: false
    };
  },
  components: {
    Popup
  },
  methods: {
    SignOut() {
      auth.signOut().then(() => {
        this.$router.push("/login");
        console.log("You are log out");
      });
    },
    sendDashboard() {
      this.$router.push("/");
    }
  },
  created() {
    if (auth.currentUser) {
      this.islogin = true;
      this.currentUser = auth.currentUser.email;
    }
  }
};
</script>

<style>
#profile {
  border-radius: 15px;
  cursor: pointer;
}

#profile:hover {
  background-color: #eeeeee;
}
</style>