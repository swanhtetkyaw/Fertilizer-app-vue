<template>
  <div id="confirm-complete">
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title>Are u sure this product is checkout?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="dialog = false">Cancel</v-btn>

          <v-btn color="green darken-1" text @click="dialog = false">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
  methods: {}
};
</script>

<style>
</style>