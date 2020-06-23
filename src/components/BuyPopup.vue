<template>
  <div id="buy-popup">
    <v-dialog v-model="dialog" max-width="500">
      <template v-slot:activator="{ on }">
        <v-btn class="mx-2" fab dark color="indigo" v-on="on">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline indigo white--text title">Add New Buy List</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="name" required :value="name" @input="addName"></v-text-field>
                <p>{{name}}</p>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Amount" type="number" required v-model="amount"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Price" type="number" required v-model="price"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Place" required v-model="place"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-spacer></v-spacer>
              <v-btn depressed small color="red" class="white--text" @click="dialog = false">Cancle</v-btn>
              <v-btn
                depressed
                small
                color="indigo"
                class="white--text ml-4"
                @click="SaveBuyInfo"
              >Save</v-btn>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from "@/firebase";
import { functions } from "@/firebase";
import { mapState } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      name: "",
      amount: null,
      price: null,
      place: null
    };
  },
  methods: {
    SaveBuyInfo() {
      const buyInfo = {
        name: this.name,
        amount: parseInt(this.amount),
        price: parseInt(this.price),
        place: this.place
      };
      //update the inventory
      //check the name in inventory with the added buyinfo fertilizer name
      //!!later build method on mutation
      let fertilizers = this.fertilizers;
      let checkFertilizer = fertilizers.filter(product => {
        return product.name == buyInfo.name;
      });
      console.log(checkFertilizer);
      // if the name is already exist update the amount
      if (checkFertilizer.length) {
        let totalAmount = buyInfo.amount + checkFertilizer[0].quantity;
        const BupdateInventory = functions.httpsCallable("BupdateInventory");

        //updated Inventory with callable firebase functions
        BupdateInventory({
          ...buyInfo,
          amount: totalAmount,
          id: checkFertilizer[0].id
        })
          .then(() => {
            console.log("updated the Inventory");
          })
          .catch(e => {
            console.log(e.message);
          });
      } else {
        //create new inventory
        const BcreateInventory = functions.httpsCallable("BcreateInventory");

        BcreateInventory({
          buyInfo
        }).then(() => {
          console.log("New Inventory is created");
        });
      }

      db.collection("buy")
        .add(buyInfo)
        .then(() => {
          this.dialog = false;
          console.log("New BuyInfo is Added!!");
        });
    },
    addName(v, e) {
      this.name = v;
      console.log(e);
      console.log(this.name);
    }
  },
  computed: {
    ...mapState(["fertilizers", "buyInfo"])
  },
  mounted() {}
};
</script>

<style>
</style>