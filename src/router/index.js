import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	// mode: 'history',
  routes: [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: { title: '自述文件' },
        children:[
          {
            path: '/index',
            component: resolve => require(['../components/page/index/Index.vue'], resolve),
            name: 'index',
            meta: { title: '首页' }
          },
          {
            path: '/listShangQuan',
            component: resolve => require(['../components/page/service/shangQuan/ListShangQuan.vue'], resolve),
            name: 'listShangQuan',
            meta: { title: '商圈列表' }
          },
          {
            path: '/addShangQuan',
            component: resolve => require(['../components/page/service/shangQuan/AddShangQuan.vue'], resolve),
            name: 'addShangQuan',
            meta: { title: '商圈添加' }
          },
          {
            path: '/listVillage',
            component: resolve => require(['../components/page/service/village/ListVillage.vue'], resolve),
            name: 'listVillage',
            meta: { title: '小区列表' }
          },
          {
            path: '/addVillage',
            component: resolve => require(['../components/page/service/village/AddVillage.vue'], resolve),
            name: 'addVillage',
            meta: { title: '添加小区' }
          },
          {
            path: '/detailsVillage',
            component: resolve => require(['../components/page/service/village/DetailsVillage.vue'], resolve),
            name: 'detailsVillage',
            meta: { title: '小区详情' }
          },
          {
            path: '/building',
            component: resolve => require(['../components/page/service/village/Building.vue'], resolve),
            name: 'building',
            meta: { title: '楼栋管理' }
          },
          {
            path: '/addCustomer',
            component: resolve => require(['../components/page/customer/customer/AddCustomer.vue'], resolve),
            name: 'addCustomer',
            meta: { title: '添加客源' }
          },
          {
            path: '/listCustomer',
            component: resolve => require(['../components/page/customer/customer/ListCustomer.vue'], resolve),
            name: 'listCustomer',
            meta: { title: '客源列表' }
          },
          {
            path: '/detailsCustomer',
            component: resolve => require(['../components/page/customer/customer/DetailsCustomer.vue'], resolve),
            name: 'detailsCustomer',
            meta: { title: '客源详情' }
          },
          {
            path: '/listResidence',
            component: resolve => require(['../components/page/house/residence/ListResidence.vue'], resolve),
            name: 'listResidence',
            meta: { title: '住宅列表' }
          },
          {
            path: '/addResidence',
            component: resolve => require(['../components/page/house/residence/AddResidence.vue'], resolve),
            name: 'addResidence',
            meta: { title: '添加住宅' }
          },
          {
            path: '/detailsResidence',
            component: resolve => require(['../components/page/house/residence/DetailsResidence.vue'], resolve),
            name: 'detailsResidence',
            meta: { title: '住宅详情' }
          },
          {
            path: '/listNewHouse',
            component: resolve => require(['../components/page/house/newHouse/ListNewHouse.vue'], resolve),
            name: 'listNewHouse',
            meta: { title: '新房列表' }
          },
          {
            path: '/addNewHouse',
            component: resolve => require(['../components/page/house/newHouse/AddNewHouse.vue'], resolve),
            name: 'addNewHouse',
            meta: { title: '添加新房' }
          },
          {
            path: '/detailsNewHouse',
            component: resolve => require(['../components/page/house/newHouse/DetailsNewHouse.vue'], resolve),
            name: 'detailsNewHouse',
            meta: { title: '新房详情' }
          },
        ]
    },
    {
        path: '/Login',
        component: resolve => require(['../components/page/Login.vue'], resolve),
        meta: { title: '自述文件' },
    }
  ]
})
