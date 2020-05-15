<template>
  <div>
    <h1 class="subtitle-1 grey--text">Dashboard</h1>
    <div class="container">Dashboard Context</div>
    <v-container class="my-5">
      <v-row class="mb-3 mx-0">
        <v-tooltip top>
          <template v-slot:activator="{on}">
            <v-btn small text color="grey" class="mr-2" @click="sort('title')" v-on="on">
              <v-icon>mdi-folder</v-icon>
              <span class="caption text-lowercase">By project name</span>
            </v-btn>
          </template>
          <span>Sort by project name</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{on}">
            <v-btn small text color="grey" @click="sort('person')" v-on="on">
              <v-icon>mdi-folder</v-icon>
              <span class="caption text-lowercase">By person</span>
            </v-btn>
          </template>
          <div>Hello</div>
          <span>World</span>
        </v-tooltip>

        <v-tooltip right>
          <template v-slot:activator="{on}">
            <v-btn small text color="grey" @click="sort('due')" v-on="on">
              <v-icon>mdi-folder</v-icon>
              <span class="caption text-lowercase">By Date</span>
            </v-btn>
          </template>
          <span>Sort by date</span>
        </v-tooltip>
      </v-row>

      <v-card flat class="px-3" v-for="project in projects" :key="project.id">
        <v-row row wrap>
          <v-col cols="12" md="6" :class="`pl-3 project ${project.status}`">
            <div class="caption grey--text">Project Title</div>
            <div>{{project.title}}</div>
          </v-col>
          <v-col xs="2">
            <div class="caption grey--text">Person</div>
            <div>{{project.person}}</div>
          </v-col>
          <v-col xs="2">
            <div class="caption grey--text">Due Date</div>
            <div>{{project.due}}</div>
          </v-col>
          <v-col xs="2">
            <!-- <div class="caption grey--text">Status</div>
            <div>{{project.status}}</div>-->

            <!-- <div align="right" class="mt-3">
              <v-chip small class="caption">{{project.status}}</v-chip>
            </div>-->
            <div align="right">
              <v-chip
                small
                :color="`${project.status}`"
                :class="`v-chip--active white--text caption my-2`"
              >{{project.status}}</v-chip>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-divider></v-divider>
        </v-row>
      </v-card>
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
  methods: {
    sort(prop) {
      this.projects.sort((a, b) => {
        return a[prop] < b[prop] ? -1 : 1;
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

<style>
.project.ongoing {
  border-left: 4px solid orange;
}
.project.complete {
  border-left: 4px solid rgb(119, 197, 223);
}
.project.overdue {
  border-left: 4px solid tomato;
}

.v-chip.ongoing {
  background: #fed330;
}
.v-chip.complete {
  background: #3cd1c2;
}
.v-chip.overdue {
  background: #fc5c65;
}
</style>