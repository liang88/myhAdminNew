import {getCookie} from '../../util/cookie.js'
const user = {
  state:{
    zzId: '',
    zzEdit: false,
  },

  mutations: {
    SET_ZZ_ID: (state, zzId) => {
      state.zzId = zzId
    },
    SET_ZZ_EDIT: (state, zzEdit) => {
      state.zzEdit = zzEdit
    },
  },

  actions:{
    set_zz_id({commit}, zzId) {
      console.log(zzId)
      commit('SET_ZZ_ID',zzId)
    },
    set_zz_edit({commit}, zzEdit) {
      commit('SET_ZZ_EDIT',zzEdit)
    },
  },
}
export default user
