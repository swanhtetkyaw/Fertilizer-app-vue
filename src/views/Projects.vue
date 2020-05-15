<template>
  <div>
    <h1 class="subtitle-1 grey--text">Projects</h1>
    <div class="container">{{myproject[0].person}}'s Projects Content</div>
    <v-container class="pt-5">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="project in myproject"
          :key="project.name"
          :class="`${project.status}`"
        >
          <v-expansion-panel-header>
            {{project.title}}
            <span class="grey--text">created at {{project.due}}</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>{{project.content}}</v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
import db from "@/firebase";
export default {
  data() {
    return {
      projects: []
    };
  },
  computed: {
    myproject() {
      return this.projects.filter(project => {
        return project.person == "Swan Htet Kyaw";
      });
    }
  },
  created() {
    db.collection("projects").onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        console.log(change.doc);
        if (change.type === "added") {
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        }
      });
    });
  }
};
</script>

<style scoped>
.ongoing {
  border-left: 4px solid orange;
}
.complete {
  border-left: 4px solid rgb(119, 197, 223);
}
.overdue {
  border-left: 4px solid tomato;
}
</style>