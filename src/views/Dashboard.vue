<template>
  <div>
    <h1 class="subtitle-1 grey--text">Dashboard</h1>

    <div class="container">
      <div class="row justify-space-between">
        <div>Dashboard Context</div>
        <searchbox @searchResult="sales = $event" @disableBtn="disableBtnD" />
      </div>
    </div>

    <v-container class="my-5">
      <v-row class="mb-3 mx-0">
        <v-tooltip top>
          <template v-slot:activator="{on}">
            <v-btn small text color="grey" class="mr-2" @click="sort('title')" v-on="on">
              <v-icon>mdi-folder</v-icon>
              <span class="caption text-lowercase">By Fertilizer name</span>
            </v-btn>
          </template>
          <span>Sort by Fertilizer name</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{on}">
            <v-btn small text color="grey" @click="sort('name')" v-on="on">
              <v-icon>mdi-folder</v-icon>
              <span class="caption text-lowercase">By person</span>
            </v-btn>
          </template>
          <div>Sort by person</div>
        </v-tooltip>

        <v-tooltip right>
          <template v-slot:activator="{on}">
            <v-btn small text color="grey" @click="sort('createdAt')" v-on="on">
              <v-icon>mdi-folder</v-icon>
              <span class="caption text-lowercase">By Date</span>
            </v-btn>
          </template>
          <span>Sort by date</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <!-- search by date -->
        <v-menu
          max-width="290"
          v-model="searchMenu"
          :close-on-content-click="false"
          :return-value.sync="date"
        >
          <template v-slot:activator="{ on }" style="max-width: 100px">
            <v-btn rounded small color="cyan" dark v-on="on">
              <v-icon class="white--text" left>mdi-magnify</v-icon>Search By Date
            </v-btn>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="searchMenu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="searchByDate">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-row>

      <v-card flat class="px-3" v-for="saleItem in sales" :key="saleItem.id">
        <v-row row wrap>
          <v-col cols="12" md="3" :class="`pl-3 sale ${saleItem.status}`">
            <div class="caption grey--text">Buyer Name</div>
            <div>{{saleItem.name}}</div>
          </v-col>
          <v-col xs="4">
            <div class="caption grey--text">Fertilizer</div>
            <div v-for="(s,i) in saleItem.sale" :key="i">{{s.product}}</div>
          </v-col>
          <v-col xs="2">
            <div class="caption grey--text">Amount</div>
            <div v-for="(s,i) in saleItem.sale" :key="i">{{s.amount}}</div>
          </v-col>
          <v-col xs="1">
            <div class="caption grey--text">Price</div>
            <div v-for="(s,i) in saleItem.sale" :key="i">{{s.price}}</div>
          </v-col>
          <v-col xs="2">
            <div class="caption grey--text">Total</div>
            <div v-for="(s,i) in saleItem.sale" :key="i">{{s.price * s.amount}}</div>
          </v-col>
          <v-col cols="12" md="2">
            <!-- <div class="caption grey--text">Status</div>
            <div>{{project.status}}</div>-->

            <!-- <div align="right" class="mt-3">
              <v-chip small class="caption">{{project.status}}</v-chip>
            </div>-->
            <div align="right" @click.stop="dialog = true">
              <v-chip
                style="cursor: pointer"
                small
                :color="`${saleItem.status}`"
                :class="`v-chip--active white--text caption my-2`"
              >{{saleItem.status}}</v-chip>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-divider></v-divider>
        </v-row>
      </v-card>
      <v-row class="justify-space-between pt-3">
        <v-btn color="info" @click="prevPage" class="ml-3" small :disabled="first">
          <v-icon left>mdi-chevron-left</v-icon>Prev
        </v-btn>
        <v-btn color="info" @click="nextPage" class="mr-3" small :disabled="last">
          Next
          <v-icon right>mdi-chevron-right</v-icon>
        </v-btn>
      </v-row>

      <!-- popupbox -->
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
    </v-container>
  </div>
</template>

<script>
import db from "@/firebase";
import searchbox from "@/components/SearchBox.vue";
import { mapMutations } from "vuex";
// import format from "date-fns/format";
// import parseISO from "date-fns/parseISO";
export default {
  data() {
    return {
      sales: [],
      lastVisible: null,
      firstVisible: null,
      firstItem: null,
      first: true,
      last: false,
      dialog: false,
      date: null,
      searchMenu: false
    };
  },
  components: {
    searchbox
  },
  methods: {
    ...mapMutations(["setFertilizers", "setBuyInfo"]),
    //simple sort
    sort(prop) {
      this.sales.sort((a, b) => {
        return a[prop] < b[prop] ? -1 : 1;
      });
    },
    //pagination :(
    nextPage() {
      let last = this.lastVisible;
      //check disable button
      if (last) {
        db.collection("Sales")
          .orderBy("createdAt", "desc")
          .startAfter(last)
          .limit(5)
          .get()
          .then(collections => {
            //for query pagination
            this.lastVisible = collections.docs[collections.docs.length - 1];
            this.firstVisible = collections.docs[0];
            //pagination button on and off
            this.first = false;
            let nextData = [];
            collections.forEach(doc => {
              nextData.push({ ...doc.data(), id: doc.id });
            });
            return nextData;
          })
          .then(nextData => {
            this.sales = nextData;
            let salesLength = this.sales.length;
            if (salesLength < 5) {
              this.last = true;
            }
          });
      }
    },
    prevPage() {
      let first = this.firstVisible;

      if (first) {
        db.collection("Sales")
          .orderBy("createdAt", "desc")
          .endBefore(first)
          .limitToLast(5)
          .get()
          .then(collections => {
            let f, fI;
            //for query pagination
            this.lastVisible = collections.docs[collections.docs.length - 1];
            this.firstVisible = collections.docs[0];
            //pagination btn on and off getting hard to read tho XD

            f = this.firstVisible;
            fI = this.firstItem;
            if (f.id === fI.id) {
              this.first = true;
              this.last = false;
            }
            // console.log(f.id);

            let prevData = [];
            collections.forEach(doc => {
              prevData.push({ ...doc.data(), id: doc.id });
            });
            return prevData;
          })
          .then(prevData => {
            this.sales = prevData;
          });
      }
    },
    disableBtnD() {
      this.first = true;
      this.last = true;
    },
    searchByDate() {
      let sDate = this.date;
      console.log(sDate);
      db.collection("Sales")
        .where("createdAt", "==", sDate)
        .get()
        .then(collections => {
          let data = [];
          collections.forEach(doc => {
            data.push({ ...doc.data(), id: doc.id });
          });
          console.log(data);
          return data;
        })
        .then(data => {
          console.log(data);
          this.sales = data;
          this.searchMenu = false;
          this.disableBtnD();
        })
        .catch(e => {
          console.log(e.message);
        });
    }
  },
  created() {
    //real time
    // db.collection("Sales")
    //   .orderBy("createdAt", "desc")
    //   .limit(5)
    //   .onSnapshot(res => {
    //     const changes = res.docChanges();

    //     changes.forEach(change => {
    //       // console.log(change.doc);
    //       if (change.type === "added") {
    //         this.sales.push({
    //           ...change.doc.data(),
    //           id: change.doc.id
    //         });
    //       }
    //     });
    //   });

    // not realtime
    db.collection("Sales")
      .orderBy("createdAt", "desc")
      .limit(5)
      .get()
      .then(collections => {
        this.lastVisible = collections.docs[collections.docs.length - 1];
        this.firstItem = collections.docs[0];
        // console.log(this.firstVisible);

        collections.forEach(doc =>
          this.sales.push({ ...doc.data(), id: doc.id })
        );
        console.log("hello");
      });

    //Inventor snapshot
    //trying another way to update
    db.collection("fertilizers").onSnapshot(docs => {
      var fertilizersInventory = [];
      docs.forEach(doc => {
        // console.log(doc.data());
        fertilizersInventory.push({ ...doc.data(), id: doc.id });
        // this.setFertilizers({ ...doc.data(), id: doc.id });
      });
      this.setFertilizers(fertilizersInventory);
    });
    //!!cant call any vue method and properties inside change events if i want to use with change event
    //!!weird Alert

    //buyInfo snapshot
    db.collection("buy").onSnapshot(snapshorts => {
      var callmutation = this.setBuyInfo;
      snapshorts.docChanges().forEach(function(change) {
        if (change.type === "added") {
          callmutation({ ...change.doc.data(), id: change.doc.id });
        }
      });
    });
  }
};
</script>

<style>
/* .project.ongoing {
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
*/

.sale.complete {
  border-left: 4px solid rgb(119, 197, 223);
}

.sale.Debt {
  border-left: 4px solid tomato;
}

.v-chip.Debt {
  background: #fc5c65;
}

.v-chip.complete {
  background: #3cd1c2;
}
</style>