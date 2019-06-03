import {getCookie} from '../../util/cookie.js'
const user = {
  state:{
    xqId: '',
    edit: false,
    xfORxq: false,
  },

  mutations: {
    SET_XQ_ID: (state, xqId) => {
      state.xqId = xqId
    },
    SET_EDIT: (state, edit) => {
      state.edit = edit
    },
    SET_XF_OR_XQ: (state, xfORxq) => {
      state.xfORxq = xfORxq
    },
  },

  actions:{
    set_xq_id({commit}, xqId) {
      console.log(xqId)
      commit('SET_XQ_ID',xqId)
    },
    set_edit({commit}, edit) {
      commit('SET_EDIT',edit)
    },
    set_xf_or_xq({commit}, xfORxq) {
      commit('SET_XF_OR_XQ',xfORxq)
    },
  },
}
export default user
