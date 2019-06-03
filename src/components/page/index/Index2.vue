<template>
	<div id="index">
		<div class="index-top clear">
			<div class="index-t-left clear">
				<div class="index-tl-top clear">
					<p>门店房源</p>
					<div class="index-tlt-inp">
					  <el-select v-model="value" placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="index-tl-bottom">
					<div class="index-tlb-div">
						<p>18</p>
						<p>新房</p>
					</div>
					<div class="index-tlb-div">
						<p>18</p>
						<p>二手房</p>
					</div>
					<div class="index-tlb-div">
						<p>18</p>
						<p>租房</p>
					</div>
				</div>
			</div>
			<div class="index-t-right">
				<div class="index-tl-top clear">
					<p>门店客源</p>
					<div class="index-tlt-inp">
					  <el-select v-model="value" placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
				</div>
				<div class="index-tl-bottom">
					<div class="index-tlb-div">
						<p>18</p>
						<p>客源</p>
					</div>
					<div class="index-tlb-div">
						<p>18</p>
						<p>已跟进</p>
					</div>
					<div class="index-tlb-div">
						<p>18</p>
						<p>待跟进</p>
					</div>
				</div>
			</div>
		</div>
		<div class="index-center clear">
			<div class="index-c-left">
				<div class="index-cl-top clear">
					<p>新上房源（12）</p>
					<p>查看全部>></p>
				</div>
				<div class="index-cl-bottom">
					<ul>
						<li class="clear" v-for="item in 5">
							<p>2018-02-21 154548</p>
							<p><span>按时打卡了发斯蒂芬阿萨德按时打卡了发斯蒂芬阿萨德</span></p>
							<p>查看</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="index-c-right">
				<div class="index-cl-top clear">
					<p>待处理（12）</p>
					<p>全部租房</p>
					<span>|</span>
					<p>全部二手房</p>
				</div>
				<div class="index-cl-bottom">
					<ul>
						<li class="clear" v-for="item in 5">
							<p>2018-02-21 154548</p>
							<p><span>按时打卡了发斯蒂芬阿萨德按时打卡了发斯蒂芬阿萨德</span></p>
							<p>查看</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="index-bottomOne">
			<div class="index-bO-title clear">
				<p>业务数据</p>
				<div class="index-bOt-inp">
				  <el-select v-model="value" placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				</div>
				<div class="index-bOt-inp">
				  <el-select v-model="value" placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				</div>
			<!-- 	<div class="index-bBt-but">
					<el-button-group>
					  <el-button type="primary">近三日数据</el-button>
					  <el-button type="primary">下一页</el-button>
					  <el-button type="primary">下一页</el-button>
					</el-button-group>
				</div> -->
			</div>
			<div id="index-bO-echarts" class="index-bO-echarts"></div>
		</div>
		<div class="index-bottomTwo">
			<div class="index-bB-title clear">
				<p>统计信息</p>
				<div class="index-bBt-inp">
			    <el-date-picker
			      v-model="dataIime"
			      type="daterange"
			      align="right"
			      unlink-panels
			      range-separator="—"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期"
			      :picker-options="pickerOptions2">
			    </el-date-picker>
				</div>
			<!-- 	<div class="index-bBt-but">
					<el-button-group>
					  <el-button type="primary">近三日数据</el-button>
					  <el-button type="primary">下一页</el-button>
					  <el-button type="primary">下一页</el-button>
					</el-button-group>
				</div> -->
			</div>
			<div id="index-bB-echarts" class="index-bB-echarts"></div>
		</div>
	</div>
</template>
<script type="text/javascript">
	// 引入echarts
	import echarts from 'echarts'
	export default {
		name: 'index',
	  data(){
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '选项1',
        dataIime: '',
        pickerOptions2: {
          shortcuts: [{
            text: '最近三日',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
	  },
	  mounted () {
	    this.echartsOne ()
	    this.echartsTwo ()
	  },
	  methods: {
	  	// 柱状图 业务数据
	  	echartsOne () {
	  		let myChart = echarts.init(document.getElementById('index-bO-echarts'));
				// 指定图表的配置项和数据
        let option = {
				    color: ['#419eff', '#9c8fd5'],
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'shadow'
				        }
				    },
            grid:{
                x:40,
                y:40,
                x2:0,
                y2:40,
                borderWidth:1
            },
				    legend: {
				        data: ['房源', '客源']
				    },
				    // 切换按钮
				    // toolbox: {
				    //     show: true,
				    //     orient: 'vertical',
				    //     left: 'right',
				    //     top: 'center',
				    //     feature: {
				    //         // mark: {show: true},
				    //         // dataView: {show: true, readOnly: false},
				    //         // magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
				    //         // restore: {show: true},
				    //         // saveAsImage: {show: true}
				    //     }
				    // },
				    calculable: true,
            //-------------   x轴   -------------------
            xAxis: {
                show:true,                  //---是否显示
                position:'bottom',          //---x轴位置
                offset:0,                   //---x轴相对于默认位置的偏移
                type:'category',            //---轴类型，默认'category'
                name:'月份',              //---轴名称
                nameLocation:'end',         //---轴名称相对位置
                nameTextStyle:{             //---坐标轴名称样式
                    color:"#fff",
                    padding:[5,0,0,-5], //---坐标轴名称相对位置
                },
                nameGap:15,                 //---坐标轴名称与轴线之间的距离
                //nameRotate:270,           //---坐标轴名字旋转

                axisLine:{                  //---坐标轴 轴线
                    show:true,                  //---是否显示

                    //------------------- 箭头 -------------------------
                    symbol:['none', 'none'],   //---是否显示轴线箭头
                    symbolSize:[8, 8] ,         //---箭头大小
                    symbolOffset:[0,7],         //---箭头位置

                    //------------------- 线 -------------------------
                    lineStyle:{
                        color:'#9ca6ad',
                        width:1,
                        type:'solid',
                    },
                },
                axisTick:{                  //---坐标轴 刻度
                    show:false,                  //---是否显示
                    inside:true,                //---是否朝内
                    lengt:3,                    //---长度
                    lineStyle:{
                        //color:'red',          //---默认取轴线的颜色
                        width:1,
                        type:'solid',
                    },
                },
                axisLabel:{                 //---坐标轴 标签
                    show:true,                  //---是否显示
                    inside:false,               //---是否朝内
                    rotate:0,                   //---旋转角度
                    margin: 20,                  //---刻度标签与轴线之间的距离
                    //color:'red',              //---默认取轴线的颜色
                },
                splitLine:{                 //---grid 区域中的分隔线
                    show:false,                 //---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
                    lineStyle:{
                        //color:'red',
                        //width:1,
                        //type:'solid',
                    },
                },
                splitArea:{                 //--网格区域
                    show:false,                 //---是否显示，默认false
                },
                data: ["你","我","他","唐","老","鸭","的"],//内容
            },
            //----------------------  y轴  ------------------------
            yAxis: {
                show:true,                  //---是否显示
                position:'left',            //---y轴位置
                offset:0,                   //---y轴相对于默认位置的偏移
                type:'value',           //---轴类型，默认'category'
                name:'销量',              //---轴名称
                nameLocation:'end',         //---轴名称相对位置value
                nameTextStyle:{             //---坐标轴名称样式
                    color:"#fff",
                    padding:[5,0,0,5],  //---坐标轴名称相对位置
                },
                nameGap:15,                 //---坐标轴名称与轴线之间的距离
                //nameRotate:270,           //---坐标轴名字旋转

                axisLine:{                  //---坐标轴 轴线
                    show:true,                  //---是否显示

                    //------------------- 箭头 -------------------------
                    symbol:['none', 'none'],   //---是否显示轴线箭头
                    symbolSize:[8, 8] ,         //---箭头大小
                    symbolOffset:[0,7],         //---箭头位置

                    //------------------- 线 -------------------------
                    lineStyle:{
                        color:'#9ca6ad',
                        width:0,
                        type:'solid',
                    },
                },
                axisTick:{                  //---坐标轴 刻度
                    show:false,                  //---是否显示
                    inside:true,                //---是否朝内
                    lengt:3,                    //---长度
                    lineStyle:{
                        //color:'red',          //---默认取轴线的颜色
                        width:1,
                        type:'solid',
                    },
                },
                axisLabel:{                 //---坐标轴 标签
                    show:true,                  //---是否显示
                    inside:false,               //---是否朝内
                    rotate:0,                   //---旋转角度
                    margin: 8,                  //---刻度标签与轴线之间的距离
                    //color:'red',              //---默认取轴线的颜色
                },
                splitLine:{                 //---grid 区域中的分隔线
                    show:true,                  //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
                    lineStyle:{
                        color:'#e5e5e5',
                        width:1,
                        type:'solid',          //---类型
                    },
                },
                splitArea:{                 //--网格区域
                    show:false,                 //---是否显示，默认false
                }
            },
				    series: [
				        {
				            name: '房源',
				            type: 'bar',
				            barGap: 0,
				            barWidth: 24,//柱图宽度
				            // label: labelOption,
				            data: [320, 332, 301, 334, 390, 390, 182]
				        },
				        {
				            name: '客源',
				            type: 'bar',
				            barGap: 0,
				            barWidth: 24,//柱图宽度
				            // label: labelOption,
				            data: [220, 182, 191, 234, 290, 191, 290]
				        },
				    ],
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
	  	},
	  	// 折线图 统计信息
	  	echartsTwo () {
	  		let myChart = echarts.init(document.getElementById('index-bB-echarts'))
				// 指定图表的配置项和数据
        let option = {
			    tooltip: {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['新增二手房量','新增租房量','新增客源量','跟进客源量']
			    },
			    grid: {
                x:40,
                y:40,
                x2:0,
                y2:40,
                borderWidth:1
			    },
				    // 切换按钮
				    // toolbox: {
				    //     show: true,
				    //     orient: 'vertical',
				    //     left: 'right',
				    //     top: 'center',
				    //     feature: {
				    //         mark: {show: true},
				    //         dataView: {show: true, readOnly: false},
				    //         magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
				    //         restore: {show: true},
				    //         saveAsImage: {show: true}
				    //     }
				    // },
            //-------------   x轴   -------------------
            xAxis: {
                show:true,                  //---是否显示
                position:'bottom',          //---x轴位置
                offset:0,                   //---x轴相对于默认位置的偏移
                type:'category',            //---轴类型，默认'category'
                name:'月份',              //---轴名称
                nameLocation:'end',         //---轴名称相对位置
                nameTextStyle:{             //---坐标轴名称样式
                    color:"#fff",
                    padding:[5,0,0,-5], //---坐标轴名称相对位置
                },
                nameGap:15,                 //---坐标轴名称与轴线之间的距离
                //nameRotate:270,           //---坐标轴名字旋转

                axisLine:{                  //---坐标轴 轴线
                    show:true,                  //---是否显示

                    //------------------- 箭头 -------------------------
                    symbol:['none', 'none'],   //---是否显示轴线箭头
                    symbolSize:[8, 8] ,         //---箭头大小
                    symbolOffset:[0,7],         //---箭头位置

                    //------------------- 线 -------------------------
                    lineStyle:{
                        color:'#9ca6ad',
                        width:1,
                        type:'solid',
                    },
                },
                axisTick:{                  //---坐标轴 刻度
                    show:false,                  //---是否显示
                    inside:true,                //---是否朝内
                    lengt:3,                    //---长度
                    lineStyle:{
                        //color:'red',          //---默认取轴线的颜色
                        width:1,
                        type:'solid',
                    },
                },
                axisLabel:{                 //---坐标轴 标签
                    show:true,                  //---是否显示
                    inside:false,               //---是否朝内
                    rotate:0,                   //---旋转角度
                    margin: 20,                  //---刻度标签与轴线之间的距离
                    //color:'red',              //---默认取轴线的颜色
                },
                splitLine:{                 //---grid 区域中的分隔线
                    show:false,                 //---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
                    lineStyle:{
                        //color:'red',
                        //width:1,
                        //type:'solid',
                    },
                },
                splitArea:{                 //--网格区域
                    show:false,                 //---是否显示，默认false
                },
                data: ["你","我","他","唐","老","鸭","的","的"],//内容
            },
            //----------------------  y轴  ------------------------
            yAxis: {
                show:true,                  //---是否显示
                position:'left',            //---y轴位置
                offset:0,                   //---y轴相对于默认位置的偏移
                type:'value',           //---轴类型，默认'category'
                name:'销量',              //---轴名称
                nameLocation:'end',         //---轴名称相对位置value
                nameTextStyle:{             //---坐标轴名称样式
                    color:"#fff",
                    padding:[5,0,0,5],  //---坐标轴名称相对位置
                },
                nameGap:15,                 //---坐标轴名称与轴线之间的距离
                //nameRotate:270,           //---坐标轴名字旋转

                axisLine:{                  //---坐标轴 轴线
                    show:true,                  //---是否显示

                    //------------------- 箭头 -------------------------
                    symbol:['none', 'none'],   //---是否显示轴线箭头
                    symbolSize:[8, 8] ,         //---箭头大小
                    symbolOffset:[0,7],         //---箭头位置

                    //------------------- 线 -------------------------
                    lineStyle:{
                        color:'#9ca6ad',
                        width:0,
                        type:'solid',
                    },
                },
                axisTick:{                  //---坐标轴 刻度
                    show:false,                  //---是否显示
                    inside:true,                //---是否朝内
                    lengt:3,                    //---长度
                    lineStyle:{
                        //color:'red',          //---默认取轴线的颜色
                        width:1,
                        type:'solid',
                    },
                },
                axisLabel:{                 //---坐标轴 标签
                    show:true,                  //---是否显示
                    inside:false,               //---是否朝内
                    rotate:0,                   //---旋转角度
                    margin: 8,                  //---刻度标签与轴线之间的距离
                    //color:'red',              //---默认取轴线的颜色
                },
                splitLine:{                 //---grid 区域中的分隔线
                    show:true,                  //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
                    lineStyle:{
                        color:'#e5e5e5',
                        width:1,
                        type:'solid',          //---类型
                    },
                },
                splitArea:{                 //--网格区域
                    show:false,                 //---是否显示，默认false
                }
            },
			    series: [
			        {
			            name:'新增二手房量',
			            type:'line',
			            stack: '总量',
                  itemStyle : {
                      normal : {
                      	color: "#419eff",
                      	borderWidth: 10,
                          lineStyle:{
                              color:'#419eff'
                          }
                      }
                  },
			            data:[120, 132, 101, 134, 90, 230, 210, 210]
			        },
			        {
			            name:'新增租房量',
			            type:'line',
			            stack: '总量',
                  itemStyle : {
                      normal : {
                      	color: "#9c8fd5",
                      	borderWidth: 10,
                          lineStyle:{
                              color:'#9c8fd5'
                          }
                      }
                  },
			            data:[220, 182, 191, 234, 290, 330, 310, 210]
			        },
			        {
			            name:'新增客源量',
			            type:'line',
			            stack: '总量',
                  itemStyle : {
                      normal : {
                      	color: "#f4c22b",
                      	borderWidth: 10,
                          lineStyle:{
                              color:'#f4c22b'
                          }
                      }
                  },
			            data:[150, 232, 201, 154, 190, 330, 410, 210]
			        },
			        {
			            name:'跟进客源量',
			            type:'line',
			            stack: '总量',
                  itemStyle : {
                      normal : {
                      	color: "#1ee8b6",
                      	borderWidth: 10,
                          lineStyle:{
                              color:'#1ee8b6'
                          }
                      }
                  },
			            data:[320, 332, 301, 334, 390, 330, 320, 210]
			        },
			    ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
	  	},
	  },
	  components: {

	  }
	}
</script>
<style type="text/css" lang="scss" scoped>
	@import '../../../assets/minxi.scss';
	#index{
		background: #eff2f5;
		.index-top{
			width: 100%;
			height: 346px;
			background: #eff2f5;
			margin-bottom: 40px;
			.index-t-left{
				width: 50%;
				height: 100%;
				background: #fff;
				float: left;
				border-right: 20px solid #eff2f5;
				box-sizing: border-box;
				.index-tl-top{
					width: 100%;
					height: 42px;
					padding: 40px;
					box-sizing: border-box;
					p{
						float: left;
						@include sc(24px,$shfz);
						font-weight: 600;
					}
					.index-tlt-inp{
						float: right;
						width: 138px;
					}
				}
				.index-tl-bottom{
					width: 100%;
					margin-top: 74px;
				  display: -webkit-flex;
				  display: -moz-flex;
				  display: -ms-flex;
				  display: -o-flex;
				  display: flex;
				  justify-content: space-around;
					.index-tlb-div{
						width: 160px;
						height: 120px;
						border-radius: 6px;
						p:nth-child(1){
							@include sc(48px,#fff);
							font-weight: 600;
							text-align: center;
							margin-top: 20px;
						}
						p:nth-child(2){
							@include sc(18px,#fff);
							text-align: center;
							margin-top: 8px;
						}
					}
					.index-tlb-div:nth-child(1){
					  background: -webkit-linear-gradient(left, #469cf8 , #7fd0ff); /* Safari 5.1 - 6.0 */
					  background: -o-linear-gradient(left, #469cf8, #7fd0ff); /* Opera 11.1 - 12.0 */
					  background: -moz-linear-gradient(left, #469cf8, #7fd0ff); /* Firefox 3.6 - 15 */
					  background: linear-gradient(left, #469cf8 , #7fd0ff); /* 标准的语法 */
					  box-shadow: 0px 22px 60px #97a6b6;
					}
					.index-tlb-div:nth-child(2){
					  background: -webkit-linear-gradient(left, #66c1a2 , #8af3d9); /* Safari 5.1 - 6.0 */
					  background: -o-linear-gradient(left, #66c1a2, #8af3d9); /* Opera 11.1 - 12.0 */
					  background: -moz-linear-gradient(left, #66c1a2, #8af3d9); /* Firefox 3.6 - 15 */
					  background: linear-gradient(left, #66c1a2 , #8af3d9); /* 标准的语法 */
					  box-shadow: 0px 22px 60px #9dc9bd;
					}
					.index-tlb-div:nth-child(3){
					  background: -webkit-linear-gradient(left, #899fd4 , #a389d4); /* Safari 5.1 - 6.0 */
					  background: -o-linear-gradient(left, #899fd4, #a389d4); /* Opera 11.1 - 12.0 */
					  background: -moz-linear-gradient(left, #899fd4, #a389d4); /* Firefox 3.6 - 15 */
					  background: linear-gradient(left, #899fd4 , #a389d4); /* 标准的语法 */
					  box-shadow: 0px 22px 60px #afabca;
					}
				}
			}
			.index-t-right{
				width: 50%;
				height: 100%;
				background: #fff;
				float: right;
				border-left: 20px solid #eff2f5;
				box-sizing: border-box;
				.index-tl-top{
					width: 100%;
					height: 42px;
					padding: 40px;
					box-sizing: border-box;
					p{
						float: left;
						@include sc(24px,$shfz);
						font-weight: 600;
					}
					.index-tlt-inp{
						float: right;
						width: 138px;
					}
				}
				.index-tl-bottom{
					width: 100%;
					margin-top: 74px;
				  display: -webkit-flex;
				  display: -moz-flex;
				  display: -ms-flex;
				  display: -o-flex;
				  display: flex;
				  justify-content: space-around;
					.index-tlb-div{
						width: 160px;
						height: 120px;
						border-radius: 6px;
						p:nth-child(1){
							@include sc(48px,#fff);
							font-weight: 600;
							text-align: center;
							margin-top: 20px;
						}
						p:nth-child(2){
							@include sc(18px,#fff);
							text-align: center;
							margin-top: 8px;
						}
					}
					.index-tlb-div:nth-child(1){
					  background: -webkit-linear-gradient(left, #4a78ef , #769bf6); /* Safari 5.1 - 6.0 */
					  background: -o-linear-gradient(left, #4a78ef, #769bf6); /* Opera 11.1 - 12.0 */
					  background: -moz-linear-gradient(left, #4a78ef, #769bf6); /* Firefox 3.6 - 15 */
					  background: linear-gradient(left, #4a78ef , #769bf6); /* 标准的语法 */
					  box-shadow: 0px 22px 60px #97a6cb;
					}
					.index-tlb-div:nth-child(2){
					  background: -webkit-linear-gradient(left, #03a9f5 , #73d3ff); /* Safari 5.1 - 6.0 */
					  background: -o-linear-gradient(left, #03a9f5, #73d3ff); /* Opera 11.1 - 12.0 */
					  background: -moz-linear-gradient(left, #03a9f5, #73d3ff); /* Firefox 3.6 - 15 */
					  background: linear-gradient(left, #03a9f5 , #73d3ff); /* 标准的语法 */
					  box-shadow: 0px 22px 60px #8db1c2;
					}
					.index-tlb-div:nth-child(3){
					  background: -webkit-linear-gradient(left, #66d39a , #9fe852); /* Safari 5.1 - 6.0 */
					  background: -o-linear-gradient(left, #66d39a, #9fe852); /* Opera 11.1 - 12.0 */
					  background: -moz-linear-gradient(left, #66d39a, #9fe852); /* Firefox 3.6 - 15 */
					  background: linear-gradient(left, #66d39a , #9fe852); /* 标准的语法 */
					  box-shadow: 0px 22px 60px #a4bf94;
					}
				}
			}
		}
		.index-center{
			width: 100%;
			height: 524px;
			margin-bottom: 40px;
			.index-c-left{
				width: 50%;
				height: 100%;
				background: #fff;
				border-right: 20px solid #eff2f5;
				box-sizing: border-box;
				float: left;
				.index-cl-top{
					box-sizing: border-box;
					padding: 40px;
					p:nth-child(1){
						float: left;
						@include sc(24px,$shfz);
						font-weight: 600;
					}
					p:nth-child(2){
						float: right;
						@include sc(18px,$green);
						cursor: pointer;
					}
				}
				.index-cl-bottom{
					width: 100%;
					ul{
						li{
							width: 100%;
							height: 76px;
							box-sizing: border-box;
							padding: 0 40px;
							background: #fff;
							transition: all 0.3s ease;
							p{
								@include sc(18px,$qhfz);
								line-height: 76px;
							}
							p:nth-child(1){
								float: left;
								width: 28%;
						    overflow:hidden;
						    text-overflow:ellipsis;
						    white-space:nowrap
							}
							p:nth-child(2){
								float: left;
								width: 50%;
						    overflow:hidden;
						    text-overflow:ellipsis;
						    white-space:nowrap
							}
							p:nth-child(3){
								float: right;
								cursor: pointer;
								line-height: 18px;
								padding: 10px 20px;
								background: #fff;
								border: 1px solid #e1e3e6;
								border-radius: 4px;
								margin-top: 16px;
							}
						}
						li:hover{
							background: #f4f7fa;
							transition: all 0.3s ease;
						}
					}
				}
			}
			.index-c-right{
				width: 50%;
				height: 100%;
				background: #fff;
				border-left: 20px solid #eff2f5;
				box-sizing: border-box;
				float: right;
				.index-cl-top{
					box-sizing: border-box;
					padding: 40px;
					p:nth-child(1){
						float: left;
						@include sc(24px,$shfz);
						font-weight: 600;
					}
					p:nth-child(2){
						float: right;
						@include sc(18px,$green);
						cursor: pointer;
					}
					span:nth-child(3){
						float: right;
						@include sc(14px,#e1e3e6);
						margin: 2px 10px;
					}
					p:nth-child(4){
						float: right;
						@include sc(18px,$green);
						cursor: pointer;
					}
				}
				.index-cl-bottom{
					width: 100%;
					ul{
						li{
							width: 100%;
							height: 76px;
							box-sizing: border-box;
							padding: 0 40px;
							background: #fff;
							transition: all 0.3s ease;
							p{
								@include sc(18px,$qhfz);
								line-height: 76px;
							}
							p:nth-child(1){
								float: left;
								width: 28%;
						    overflow:hidden;
						    text-overflow:ellipsis;
						    white-space:nowrap
							}
							p:nth-child(2){
								float: left;
								width: 50%;
						    overflow:hidden;
						    text-overflow:ellipsis;
						    white-space:nowrap
							}
							p:nth-child(3){
								float: right;
								cursor: pointer;
								line-height: 18px;
								padding: 10px 20px;
								background: #fff;
								border: 1px solid #e1e3e6;
								border-radius: 4px;
								margin-top: 16px;
							}
						}
						li:hover{
							background: #f4f7fa;
							transition: all 0.3s ease;
						}
					}
				}
			}
		}
		.index-bottomOne{
			width: 100%;
			height: 660px;
			background: #fff;
			padding: 40px;
			box-sizing: border-box;
			.index-bO-title{
				p{
					@include sc(24px,$shfz);
					margin-bottom: 56px;
					float: left;
				}
				.index-bOt-inp{
					float: right;
					margin-left: 20px;
				}
			}
			.index-bO-echarts{
				width: 100%;
				height: 500px;
			}
		}
		.index-bottomTwo{
			width: 100%;
			height: 660px;
			background: #fff;
			padding: 40px;
			box-sizing: border-box;
			.index-bB-title{
				width: 100%;
				p{
					@include sc(24px,$shfz);
					margin-bottom: 56px;
					float: left;
				}
				.index-bBt-but{
					float: right;
				}
				.index-bBt-inp{
					float: right;
				}
			}
			.index-bB-echarts{
				width: 100%;
				height: 500px;
			}
		}
	}
</style>
<style type="text/css">
	.addcustomer-wc-inp .el-form-item__content{
		margin: 0 !important;
		width: 100%;
	}
	.el-form-item{
		margin: 0;
	}
	.el-input__inner{
		height: 42px;
		border-radius: 0;
	}
	.el-select{
		width: 100%;
	}
	.el-date-editor.el-input, .el-date-editor.el-input__inner{
		width: 100%;
	}
	.el-radio+.el-radio{
		margin-left: 60px;
	}
	.addcustomer-wci-danone .el-radio+.el-radio{
		margin-left: 160px;
	}
	.el-radio__label{
		font-size: 16px;
	}
	.el-checkbox-button:first-child .el-checkbox-button__inner{
		border-radius: 0;
	}
	.el-checkbox-button:last-child .el-checkbox-button__inner{
		border-radius: 0;
	}
	.el-checkbox-button__inner{
		border: 1px solid #dcdfe6;
		margin-right: 10px;
	}
	.el-textarea__inner{
		border-radius: 0;
	}
</style>
