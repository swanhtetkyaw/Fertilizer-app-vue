<template>
  <div id="buy">
    <h1>BuyInfo</h1>
    <v-container>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="4">
          <v-text-field
            v-model="search"
            clearable
            dense
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-data-table :headers="headers" :items="buyInfo" :items-per-page="5" class="elevation-1"></v-data-table>
    </v-container>
    <v-container>
      <v-row>
        <v-spacer></v-spacer>
        <BuyPopup />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import BuyPopup from "@/components/BuyPopup.vue";
export default {
  data() {
    return {
      buyInfo: this.$store.state.buyInfo,
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name"
        },
        { text: "Quantity", value: "amount" },
        { text: "BuyPrice", value: "price" },
        { text: "Place", value: "place" },
        { text: "Date", value: "date" }
      ]
    };
  },
  created() {
    // var arr = [];
    // var buyinfo = this.buyInfo;

    // buyinfo.forEach(buy => {
    //   if (arr.indexOf(buy.name) === -1) {
    //     arr.push(buy.name);
    //   }
    // });
    // console.log(arr);
    console.log(this.buyInfo);
  },
  components: {
    BuyPopup
  }
};
</script>

<style>
</style>