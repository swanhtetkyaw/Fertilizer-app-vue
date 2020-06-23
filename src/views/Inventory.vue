<template>
  <div id="inventory">
    <h1>Inventory</h1>
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
      <v-data-table :headers="headers" :items="fertilizers" :items-per-page="5" class="elevation-1"></v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fertilizers: this.$store.state.fertilizers,
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name"
        },
        { text: "Quantity", value: "quantity" },
        { text: "SalePrice", value: "salePrice" }
      ]
    };
  }
};
</script>

<style>
</style>