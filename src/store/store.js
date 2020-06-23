import Vue from 'vue';
import Vuex from 'vuex';
import fromUnixTime from 'date-fns/fromUnixTime';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		count: 0,
		fertilizers: [],
		buyInfo: [],
		fertilizersName: []
	},
	mutations: {
		setFertilizers(state, value) {
			// state.fertilizers.push(value);
			state.fertilizers = value;
		},
		setBuyInfo(state, value) {
			//!!use action later
			if (value.date) {
				//formatting date
				var time = fromUnixTime(value.date.seconds).toString();
				var arrTime = time.split(' ');
				var formattedTime = `${arrTime[1]}-${arrTime[2]}-${arrTime[3]} (${arrTime[0]})`;
				var BuyDate = {
					date: formattedTime
				};
				state.buyInfo.push({ ...value, ...BuyDate });
				//set fertilizerName for option box
				state.buyInfo.forEach((info) => {
					if (state.fertilizersName.indexOf(info.name) === -1) {
						state.fertilizersName.push(info.name);
					}
				});
			}
		}
	},
	actions: {
		setBuyInfo({ commit }) {
			commit('setBuyinfo');
		}
	}
});
