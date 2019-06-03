<template>
	<div id="slidebar">
		<div class="slidebar-wap">
			<el-menu class="sidebar-el-menu" :default-active="onRoutes" :default-openeds="openeds" :collapse="false" background-color="#334154"
		    text-color="#ccc" active-text-color="#fff" unique-opened router>
		    <template v-for="one in ones">
	        <!--循环-->
	        <template v-if="one.twos">
            <el-submenu :index="one.id" :key="one.id" @click.native.stop="clkOnes" v-if="one.disable">
              <template slot="title">
                  <img class="icon-all" :src="one.url" alt=""></i><span slot="title">{{ one.title }}</span>
              </template>
              <!--3级菜单-->
              <template v-for="(two,itwo) in one.twos">
<!--                 <template v-if="two.threes">
  <el-submenu :index="two.id" :key="two.id" @click.native.stop="clkTwos">
    <template slot="title">
      <span slot="title" style="margin-left: 60px;">{{ two.title }}</span>
    </template>
     第三级
    <el-menu-item v-for="(three,ithree) in two.threes" :key="ithree" :index="three.id" @click="clkThree (ithree)" :class="{actives:ithree === cour1}">
      {{ three.title }}
    </el-menu-item>
  </el-submenu>
</template> -->
                <!-- 没有子集的二级 -->
                <template>
                  <el-menu-item :key="two.id" :index="two.id" @click="clkTwo (itwo)" :class="{actives:itwo === cour}">
                    <span slot="title">{{ two.title }}</span>
                  </el-menu-item>
                </template>
              </template>
            </el-submenu>
	        </template>
	        <!-- 没有子集的一级 -->
	        <template v-else>
            <el-menu-item :index="one.id" :key="one.id">
              <img class="icon-all" :src="one.url" alt=""><span slot="title">{{ one.title }}</span>
            </el-menu-item>
	        </template>
		    </template>
			</el-menu>
		</div>
	</div>
</template>
<script type="text/javascript">
	import bus from './bus.js'
  import {setCookie, getCookie, delCookie} from '../../util/cookie.js'
	export default {
		name: 'slidebar',
	  data(){
      return {
      	cour: 0,
      	cour1: 0,
      	openeds: ['/'],
      	ones: [],
        // 设置
      	ones0: [
      		{
      			title: '添加二手房',
      			// id: '/addoldhousing',
      			// url: require('../../assets/images/a.png'),
            disable: true,
      		},
      		{
      			title: '添加租房',
      			// id: '/addRenting',
      			// url: require('../../assets/images/b.png'),
            disable: true,
      		},
      		{
      			title: '添加客源',
      			// id: '/addCustomer',
      			// url: require('../../assets/images/c.png'),
            disable: true,
      		},
          {
            title: '二手房列表',
            // id: '/listoldhousing',
            // url: require('../../assets/images/d.png'),
            disable: true,
          },
          {
            title: '租房列表',
            // id: '/listRenting',
            // url: require('../../assets/images/d.png'),
            disable: true,
          },
          {
            title: '客源列表',
            // id: '/listCustomer',
            // url: require('../../assets/images/d.png'),
            disable: true,
          },
          {
            title: '新房列表',
            // id: '/list',
            // url: require('../../assets/images/d.png'),
            disable: true,
          },
          {
            title: '小区列表',
            // id: '/listCell',
            // url: require('../../assets/images/d.png'),
            disable: true,
          },
          {
            title: '我的账号',
            // id: '/myinformation',
            // url: require('../../assets/images/d.png'),
            disable: true,
          },
      	],
        // 业务设置
      	ones1: [
      		{
      			title: '商圈管理',
      			id: '/',
      			url: require('../../assets/images/a.png'),
            disable: true,
      			twos: [
      				{
	      				title: '商圈列表',
	      				id: '/listShangQuan',
                url: require('../../assets/images/head.png'),
                disable: true,
      				},
      				{
	      				title: '添加商圈',
	      				id: '/addShangQuan',
	      				url: require('../../assets/images/head.png'),
                disable: true,
      				},
      			]
      		},
          // {
          //   title: '新房管理',
          //   id: '/12sad331',
          //   url: require('../../assets/images/a.png'),
          //   twos: [
          //     {
          //       title: '楼盘列表',
          //       id: '/list',
          //       url: require('../../assets/images/head.png'),
          //     },
          //     {
          //       title: '添加楼盘',
          //       id: '/addRealEstate',
          //       url: require('../../assets/images/head.png'),
          //     },{
          //       title: '添加户型',
          //       id: '/addingUnits',
          //       url: require('../../assets/images/head.png'),
          //     }
          //   ]
          // },
      		{
      			title: '小区管理',
      			id: '/1撒旦法',
      			url: require('../../assets/images/b.png'),
            disable: true,
      			twos: [
              {
                title: '小区列表',
                id: '/listVillage',
                url: require('../../assets/images/head.png'),
                disable: true,
              },
      				{
	      				title: '添加小区',
	      				id: '/addVillage',
	      				url: require('../../assets/images/head.png'),
                disable: true,
      				},
      			]
      		},
      		// {
      		// 	title: '组织结构',
      		// 	id: '/撒旦法爱上',
      		// 	url: require('../../assets/images/c.png'),
      		// 	twos: [
      		// 		{
	      	// 			title: '公司管理',
	      	// 			id: '/twoasds32',
	      	// 			url: require('../../assets/images/head.png'),
        //         threes: [
        //           {
        //             title: '公司列表',
        //             id: '/listCompany',
        //             url: require('../../assets/images/head.png'),
        //           },
        //           {
        //             title: '添加公司',
        //             id: '/addCompany',
        //             url: require('../../assets/images/head.png'),
        //           },
        //         ]
      		// 		},
        //       {
        //         title: '部门管理',
        //         id: '/twogsas32',
        //         url: require('../../assets/images/head.png'),
        //         threes: [
        //           {
        //             title: '部门列表',
        //             id: '/listDepartment',
        //             url: require('../../assets/images/head.png'),
        //           },
        //           {
        //             title: '添加部门',
        //             id: '/addDepartment',
        //             url: require('../../assets/images/head.png'),
        //           },
        //         ]
        //       },
        //       {
        //         title: '门店管理',
        //         id: '/twos32',
        //         url: require('../../assets/images/head.png'),
        //         threes: [
        //           {
        //             title: '门店列表',
        //             id: '/listOfStores',
        //             url: require('../../assets/images/head.png'),
        //           },
        //           {
        //             title: '添加门店',
        //             id: '/addStores',
        //             url: require('../../assets/images/head.png'),
        //           },
        //         ]
        //       },
        //       {
        //         title: '员工管理',
        //         id: '/twgasdos32',
        //         url: require('../../assets/images/head.png'),
        //         threes: [
        //           {
        //             title: '员工列表',
        //             id: '/listEmployee',
        //             url: require('../../assets/images/head.png'),
        //           },
        //           {
        //             title: '添加员工',
        //             id: '/addEmployee',
        //             url: require('../../assets/images/head.png'),
        //           },
        //         ]
        //       },
      		// 	]
      		// },
      	],
        // 房源管理
        ones2: [
          {
            title: '住宅管理',
            id: '/',
            url: require('../../assets/images/a.png'),
            disable: true,
            twos: [
              {
                title: '住宅列表',
                id: '/listResidence',
                url: require('../../assets/images/head.png'),
                disable: true,
              },
              {
                title: '添加住宅',
                id: '/addResidence',
                url: require('../../assets/images/head.png'),
                disable: true,
              },
            ],
          },
          {
            title: '新房管理',
            id: '/1',
            url: require('../../assets/images/a.png'),
            disable: true,
            twos: [
              {
                title: '新房列表',
                id: '/listNewHouse',
                url: require('../../assets/images/head.png'),
                disable: true,
              },
              {
                title: '添加新房',
                id: '/addNewHouse',
                url: require('../../assets/images/head.png'),
                disable: true,
              },
            ],
          },
        ],
        // 客源管理
        ones3: [
          {
            title: '客源管理',
            id: '/',
            url: require('../../assets/images/a.png'),
            disable: true,
            twos: [
              {
                title: '客源列表',
                id: '/listCustomer',
                url: require('../../assets/images/head.png'),
                disable: true,
              },
              {
                title: '添加客源',
                id: '/addCustomer',
                url: require('../../assets/images/head.png'),
                disable: true,
              },
            ]
          },
        ],
        // 设置
        ones4: [
          {
            title: '设置',
            id: '/',
            url: require('../../assets/images/a.png'),
            disable: true,
            twos: [
              {
                title: '账号设置',
                id: '/sfgad',
                url: require('../../assets/images/head.png'),
                disable: true,
                threes: [
                  {
                    title: '账号信息',
                    id: '/myinformation',
                    url: require('../../assets/images/head.png'),
                    disable: true,
                  },
                  {
                    title: '修改密码',
                    id: '/setPassword',
                    url: require('../../assets/images/head.png'),
                    disable: true,
                  },
                ]
              },
              {
                title: '权限设置',
                id: '/twsdfgos1',
                url: require('../../assets/images/head.png'),
                disable: true,
              },
              {
                title: '其他设置',
                id: '/setDays',
                url: require('../../assets/images/head.png'),
                disable: true,
              },
            ]
          },
        ],
      }
	  },
		computed:{
	    onRoutes(){
        return this.$route.path.replace('/','');
	    }
		},
	  mounted () {
	  	this.maxNav ()
      if (getCookie('yeWuType') === '二手房') {
        this.ones2[0].disable = true
        this.ones2[1].disable = true
      } else if (getCookie('yeWuType') === '新房') {
        this.ones2[0].disable = false
        this.ones2[1].disable = true
      }
	  },
	  methods: {
	  	//获取header的index来切换slidebar
	  	maxNav () {
		  	this.ones = this.ones0
		  	bus.$on('slidebars', val => {
		  		if (val === 0) {
		  			this.ones = this.ones0
            this.cour = 0
		  		} else if (val === 1) {
		  			this.ones = this.ones1
            this.openeds = ['/']
            this.cour = 0
		  		} else if (val === 2){
            this.ones = this.ones2
            this.openeds = [getCookie('yeWuType') === '二手房' ? '/' : '/1',getCookie('yeWuType') === '二手房' ? '/listResidence' : '/listNewHouse']
            this.cour = 0
          } else if (val === 3){
            this.ones = this.ones3
            this.cour = 0
            this.openeds = ['/']
          } else if (val === 4){
            this.ones = this.ones4
            this.openeds = ['/','/sfgad']
            this.cour = 0
          }
		  	})
	  	},
	  	clkTwo (index) {
	  		event.stopPropagation()
	  		this.cour = index
	  		this.cour1 = -1
	  	},
	  	clkThree (index) {
	  		event.stopPropagation()
	  		this.cour1 = index
	  		this.cour = -1
	  		console.log(index)
	  	},
	  	clkTwos () {
	  		this.cour = -1
	  		this.cour1 = 0
	  		// console.log(index)
	  	},
	  	clkOnes () {
	  		this.cour = 0
	  		this.cour1 = 0
	  	},
	  },
	}
</script>
<style type="text/css">
	.el-menu-item, .el-submenu__title{
		height: 76px !important;
		line-height: 76px;
		padding-left: 60px !important;
		border-bottom: 1px solid #001528;
	}
	.icon-all{
		margin-right: 40px;
	}
	.el-submenu .el-menu-item{
		background: #001528 !important;
		height: 76px;
		line-height: 76px;
		padding-left: 120px !important;
	}
	.el-submenu .el-menu-item:hover{
		background: #419eff !important;
		color: #fff !important;
	}
	.el-submenu .actives,.el-menu-item .actives{
		background: #419eff !important;
		color: #fff !important;
		box-shadow: -15px 0px 20px #001528;
    position: relative;
    z-index: 9;
		transition: all 0.5s ease;
	}
	.el-submenu .actives:after,.el-menu-item .actives:after{
		display: block;
		content: "";
		width: 15px;
		height: 15px;
		background: #eff2f5;
		position: absolute;
		right: -8px;
		top: 50%;
		transform: translateY(-50%) rotate(45deg);
		transition: all 0.5s ease;
	}
	.el-submenu__icon-arrow{
		right: 50px;
	}
  .el-submenu.is-active .el-submenu__title{
    border-bottom: 1px solid #001528;
  }
</style>
