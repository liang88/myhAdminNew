<template>
	<div id="tags">
		<p class="tags-title" style="float: left;">当前位置：</p>
		<el-breadcrumb separator-class="el-icon-arrow-right" class="tags-mianbao" style="float: left;">
			<transition-group>
				<el-breadcrumb-item  v-for="(item,index) in levelList" :key="item.path" v-if="item.meta.title">
					<span   v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{item.meta.title}}</span>
					<router-link   v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
				</el-breadcrumb-item>
			</transition-group>
		</el-breadcrumb>
	</div>
</template>
<script type="text/javascript">
	export default {
		name: 'tags',
	  data(){
      return {
      	levelList:null
      }
	  },
	  components: {

	  },
    methods:{
      getBreadcrumb(){
        console.log(this.$route.matched)
        let matched=this.$route.matched.filter(item=>item.name)//$route.matched 将会是一个包含从上到下的所有对象 (副本)。
        const first=matched[0]
        // if(first && first.name !==''){//$route.name当前路由名称  ；$route.redirectedFrom重定向来源的路由的名字
        //   matched=[{ path: '', meta: { title: '' }}].concat(matched)
        // }
        this.levelList=matched
        console.log(this.levelList)
      }
    },
    created() {
      this.getBreadcrumb()
    },
    watch:{
      $route(){
        this.getBreadcrumb()
      }
    },
	}
</script>
<style type="text/css" lang="scss" scoped>
	#tags{
		.tags-title{
			font-size: 18px;
			color: #becbd9;
			line-height: 40px;
			margin-left: 40px;
		}
	}
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #282e33;
      cursor: text;
    }
  }
</style>
<style type="text/css">
		#tags .el-breadcrumb__inner{
			color: #282e33 !important;
			font-size: 18px !important;
			line-height: 40px !important;
		}
		#tags .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
			color: #282e33 !important;
			font-weight: 400 !important;
		}
		#tags .el-breadcrumb__separator{
			color: #282e33 !important;
		}
</style>