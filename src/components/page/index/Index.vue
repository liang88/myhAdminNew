<template>
	<div id="index">
        <router-link tag="p" to="/index/listShangQuan">欢迎进入满易房系统管理后台</router-link>
	</div>
</template>
<script type="text/javascript">
	// 引入echarts
	// import echarts from 'echarts'
	export default {
	name: 'index',
        data(){
            return {

            }
        },
	  mounted () {

	  },
	  methods: {

	  },
	  components: {

	  }
	}
</script>
<style type="text/css" lang="scss" scoped>
    #index{
        width: 100%;
        height: 100%;
        background: #eff2f5;
        p{
            font-size: 30px;
            font-weight: 600;
            color: #419eff;
            text-align: center;
            margin-top: 346px;
        }
    }
</style>
