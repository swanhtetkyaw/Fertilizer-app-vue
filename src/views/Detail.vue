<template>
  <div id="detail">
    <h1>Detail Page</h1>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="desserts"
        item-key="name"
        group-by="category"
        class="elevation-1"
        show-group-by
      ></v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>