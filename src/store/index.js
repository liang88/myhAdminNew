import Vue from 'vue'
import Vuex from 'vuex'
import village from  './modules/village'
import customer from  './modules/customer'
import residence from  './modules/residence'
import newhouse from  './modules/newhouse'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    village,
    customer,
    residence,
    newhouse,
  },
  getters,
})
console.log(store);
console.log('store');
export default store
