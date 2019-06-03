import {getCookie} from '../../util/cookie.js'
const user = {
  state:{
    kyId: '',
    kyEdit: false,
  },

  mutations: {
    SET_KY_ID: (state, kyId) => {
      state.kyId = kyId
    },
    SET_KY_EDIT: (state, kyEdit) => {
      state.kyEdit = kyEdit
    },
  },

  actions:{
    set_ky_id({commit}, kyId) {
      // console.log(kyId)
      commit('SET_KY_ID',kyId)
    },
    set_ky_edit({commit}, kyEdit) {
      commit('SET_KY_EDIT',kyEdit)
    },
  },
}
export default user
