import {getCookie} from '../../util/cookie.js'
const user = {
  state:{
    xfId: '',
    xfEdit: false,
  },

  mutations: {
    SET_XF_ID: (state, xfId) => {
      state.xfId = xfId
    },
    SET_XF_EDIT: (state, xfEdit) => {
      state.xfEdit = xfEdit
    },
  },

  actions:{
    set_xf_id({commit}, xfId) {
      console.log(xfId)
      commit('SET_XF_ID',xfId)
    },
    set_xf_edit({commit}, xfEdit) {
      commit('SET_XF_EDIT',xfEdit)
    },
  },
}
export default user
