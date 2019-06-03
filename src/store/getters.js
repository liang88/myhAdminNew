const getters = {

  /* village.js */
  xqId: state => state.village.xqId,
  edit: state => state.village.edit,
  xfORxq: state => state.village.xfORxq,

  /* customer.js */
  kyId: state => state.customer.kyId,
  kyEdit: state => state.customer.kyEdit,

  /* residence.js */
  zzId: state => state.residence.zzId,
  zzEdit: state => state.residence.zzEdit,

  /* newhouse.js */
  xfId: state => state.newhouse.xfId,
  xfEdit: state => state.newhouse.xfEdit,

}
console.log(getters);
console.log('getters');
export default getters
