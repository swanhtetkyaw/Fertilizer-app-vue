<template>
  <div class="text-center mt-3">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn class="blue lighten-3" dark text v-on="on">Add New Project</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Add a New Project</v-card-title>
        <v-card-text>
          <v-form class="px-3" ref="form" lazy-validation>
            <v-text-field
              label="Title"
              v-model="title"
              prepend-icon="mdi-folder"
              :rules="inputRules"
            ></v-text-field>
            <v-textarea
              label="Information"
              v-model="information"
              prepend-icon="mdi-book"
              :rules="inputRules"
            ></v-textarea>

            <v-menu max-width="290">
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="formattedDate"
                  label="Due Date"
                  prepend-icon="mdi-calendar-range"
                  v-on="on"
                  :rules="dateRules"
                ></v-text-field>
              </template>
              <v-date-picker v-model="due"></v-date-picker>
            </v-menu>

            <v-btn text class="success mx-0 mt-3" @click="showData" :loading="loading">Add Project</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import db from "@/firebase";
export default {
  data() {
    return {
      dialog: false,
      title: "",
      information: "",
      due: null,
      loading: false,
      inputRules: [v => v.length >= 3 || "Minimum length is 3 characters"],
      dateRules: [v => v.length !== 0 || "You Must add Date!"]
    };
  },
  methods: {
    showData() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        // console.log(this.title + " " + this.information);
        // this.dialog = false;
        const project = {
          title: this.title,
          person: "Mg Aung Kyaw",
          status: "overdue",
          due: this.formattedDate,
          content: this.information
        };

        db.collection("projects")
          .add(project)
          .then(() => {
            this.loading = false;
            this.dialog = false;
            this.$emit("projectAdded");
            console.log("Data is send");
          });
      }
    }
  },
  computed: {
    formattedDate() {
      return this.due ? format(parseISO(this.due), "do MMM yyyy") : "";
    }
  }
};
</script>

<style>
</style>