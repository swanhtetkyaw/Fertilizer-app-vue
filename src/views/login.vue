<template>
  <div id="login">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-form @submit.prevent="Login" id="login-form">
            <v-card class="mx-auto" max-width="400" :loading="loading" color="cyan">
              <v-card-title class="white--text text-center">LOGIN</v-card-title>
              <v-card-text style="max-width: 300px" class="mx-auto">
                <v-text-field v-model="email" label="email" color="white" prepend-icon="mdi-face"></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Password"
                  color="white"
                  prepend-icon="mdi-lock"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :loading="loading"
                  type="submit"
                  rounded
                  color="cyan"
                  dark
                  class="caption"
                  form="login-form"
                >LogIn</v-btn>
                <!-- <v-btn rounded color="cyan" dark class="caption" @click="loading = true">SignUp</v-btn> -->
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" top color="red" :timeout="timeout">
      {{ eMessage }}
      <v-btn dark text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { auth } from "@/firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      eMessage: "Wrong Username or Password",
      snackbar: false,
      timeout: 4000
    };
  },
  methods: {
    Login() {
      this.loading = true;
      let email = this.email;
      let password = this.password;

      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.loading = false;
          this.$router.push("/");
          // console.log(auth.currentUser.email);
          // console.log(crd.user.email);
          console.log("your Account is login");
        })
        .catch(() => {
          this.snackbar = true;
          this.loading = false;
          console.log("Something went wrong");
        });
    }
  }
};
</script>

<style>
</style>