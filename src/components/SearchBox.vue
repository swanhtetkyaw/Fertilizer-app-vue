<template>
  <form @submit.prevent="SearchByname">
    <div id="search-box" dark color="cyan" class="d-flex justify-space-around">
      <input
        type="text"
        placeholder="search..."
        class="caption search-input grey--text text--darken-4"
        v-model="search"
      />
      <div>
        <v-btn text fab dark small color="cyan">
          <v-icon class="white--text">mdi-magnify</v-icon>
        </v-btn>
      </div>
    </div>
  </form>
</template>

<script>
import db from "@/firebase";
export default {
  data() {
    return {
      search: "",
      result: [],
      disable: false
    };
  },
  methods: {
    SearchByname() {
      db.collection("Sales")
        .where("sname", "==", this.search)
        .get()
        .then(snapShots => {
          snapShots.forEach(doc => {
            this.result.push({
              ...doc.data(),
              id: doc.id
            });
          });
        })
        .then(() => {
          this.search = "";
          this.$emit("searchResult", this.result);
          this.$emit("disableBtn", this.disable);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style>
#search-box {
  box-sizing: border-box;
  height: 40px;
  background-color: cyan;
  border-radius: 30px;
}

.search-input {
  outline: none;
  border: none;
  width: 0;
  transition: 0.4s;
}

#search-box:hover > .search-input,
#search-box:active > .search-input {
  padding-left: 10px;
  width: 120px;
}
</style>