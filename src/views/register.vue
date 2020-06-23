<template>
  <div id="login">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-form @submit.prevent="register">
            <v-card class="mx-auto" max-width="400" :loading="loading" color="cyan">
              <v-card-title class="white--text text-center">Register</v-card-title>
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
                  type="submit"
                  rounded
                  color="cyan"
                  dark
                  class="caption"
                  :loading="loading"
                >Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { auth } from "@/firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false
    };
  },
  methods: {
    register() {
      let email = this.email;
      let password = this.password;
      this.loading = true;
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(crd => {
          this.loading = false;
          this.$router.push("/");

          console.log(crd);
          console.log("your Account is created");
        })
        .catch(e => {
          console.log(e.message);
          this.loading = false;
          console.log("Something went wrong");
        });
    }
  }
};
</script>

<style>
</style>