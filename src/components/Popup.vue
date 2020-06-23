<template>
  <div class="text-center mt-3">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn class="blue lighten-3" dark text v-on="on">Add New Sales</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Add a New Sales</v-card-title>
        <v-card-text>
          <v-form class="px-3" ref="form" lazy-validation>
            <v-text-field label="Name" v-model="name" prepend-icon="mdi-face"></v-text-field>

            <v-row
              align="center"
              class="ml-5 mb-0"
              v-for="(field,index) in inputField"
              :key="field"
            >
              <v-col class="d-flex" cols="12" sm="6">
                <v-select
                  :items="items"
                  label="Fertilizer Name.."
                  v-model="product[index]"
                  menu-props="auto"
                ></v-select>
              </v-col>
              <v-col class="d-flex" cols="12" sm="6">
                <v-text-field label="amount.." v-model="amount[index]" type="number"></v-text-field>
              </v-col>
              <!-- add more field -->
            </v-row>
            <div id="AddField" class="text-center">
              <v-btn color="primary" fab x-small dark @click="moreField">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn
                class="ml-2"
                color="red"
                fab
                x-small
                dark
                @click="lessField"
                v-if="inputField > 1"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </div>

            <v-menu max-width="290">
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="formattedDate"
                  label="Due Date"
                  prepend-icon="mdi-calendar-range"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="due"></v-date-picker>
            </v-menu>

            <v-row align="center" class="ml-7">
              <v-radio-group v-model="status" row>
                <v-radio label="Debt" value="Debt" color="red"></v-radio>
                <v-radio label="Complete" value="complete" color="primary"></v-radio>
              </v-radio-group>
            </v-row>
            <v-row>
              <v-spacer></v-spacer>
              <v-btn tile outlined color="error" class="mt-3 mr-5" @click="closeModel">Cancle</v-btn>
              <v-btn text class="success mx-0 mt-3" @click="showData" :loading="loading">Add Sale</v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import format from "date-fns/format";
// import parseISO from "date-fns/parseISO";
import db from "@/firebase";
import { functions } from "@/firebase";
import { mapState } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      name: "",
      product: [],
      due: null,
      status: "",
      loading: false,
      amount: [],
      inputField: 1,
      saleInfo: [],
      items: this.$store.state.fertilizersName,
      prices: [40500, 20700, 20000, 38000]
      // inputRules: [v => v.length >= 3 || "Minimum length is 3 characters"],
      // dateRules: [v => v.length !== 0 || "You Must add Date!"],
      // inputAmountRules: [v => v > 0 || "Minimum amount is 1"]
    };
  },
  methods: {
    //set data to firebase
    showData() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        // console.log(this.title + " " + this.information);
        // this.dialog = false;
        var productLength = this.product.length;
        // console.log(productLength);
        for (let x = 0; x < productLength; x++) {
          let priceIndex = this.items.indexOf(this.product[x]);
          let price = this.prices[priceIndex];
          // console.log(price);
          this.saleInfo[x] = {
            product: this.product[x],
            amount: parseInt(this.amount[x]),
            price
          };
        }

        let sname = this.name
          .trim()
          .toLowerCase()
          .replace(/\s/g, "");

        const sale = {
          name: this.name.trim(),
          sname,
          sale: this.saleInfo,
          status: this.status,
          createdAt: this.due
        };

        //get name
        let saleI = this.saleInfo;
        let fertilizers = this.fertilizers;
        // console.log(saleI);
        //loop through name to track how many product did he buy
        saleI.forEach(s => {
          let checkFertilizer = fertilizers.filter(product => {
            return product.name == s.product;
          });
          let updatedAmount = checkFertilizer[0].quantity - s.amount;

          const SupdateInventory = functions.httpsCallable("SupdateInventory");

          SupdateInventory({
            amount: updatedAmount,
            id: checkFertilizer[0].id
          })
            .then(() => {
              console.log("the amount is updated");
            })
            .catch(e => {
              console.log(e.message);
            });
          // console.log(s.product);
        });

        db.collection("Sales")
          .add(sale)
          .then(() => {
            this.$refs.form.reset();
            this.loading = false;
            this.dialog = false;
            this.$emit("projectAdded");
            console.log("Data is send");
          });
      }
    },
    closeModel() {
      this.$refs.form.reset();
      this.dialog = false;
    },
    moreField() {
      let index = this.inputField - 1;
      let checkProduct = this.product[index];
      let checkAmount = this.amount[index];

      if (checkProduct && checkAmount) {
        this.inputField++;
      }

      // console.log(this.saleInfo);

      // var fertilizerSales = {
      //   product: this.product,
      //   amount: this.amount
      // }
    },
    lessField() {
      //delete the last index of the array when the input field is reduced
      this.inputField--;
      var guard = this.inputField;
      var len = this.product.length;
      //not good
      if (guard == 0) {
        this.product = [];
        this.amount = [];
      }
      if (guard < len) {
        this.product.pop();
        this.amount.pop();
        this.saleInfo.pop();
      }
      // console.log(this.saleInfo);
    }
  },
  computed: {
    ...mapState(["fertilizers"]),
    formattedDate() {
      // return this.due ? format(parseISO(this.due), "do MMM yyyy") : "";
      return this.due ? this.due : "";
    }
  }
};
</script>

<style>
</style>