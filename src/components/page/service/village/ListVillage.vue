<template>
  <div id="listVillage">
    <div class="listVillage-wap">
      <div class="listVillage-w-content clear">
       <!--  <div class="listVillage-wc-but">
          <img src="static/images/add.png" alt="">
          <span>添加</span>
        </div> -->
        <div class="listVillage-wc-but" @click="refresh">
          <img src="static/images/ref.png" alt="">
          <span>刷新</span>
        </div>
        <div class="listVillage-wc-but" @click="delAll">
          <img src="static/images/del.png" alt="">
          <span>删除</span>
        </div>
      </div>
      <div class="listVillage-input">
        <el-row :gutter="20" style="margin-bottom: 30px;">
          <el-col :span="2">
            <el-tooltip class="item" effect="dark" content="区域筛选" placement="top">
              <p>区域筛选 :</p>
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <template>
              <el-select v-model="area.area" @focus="selectArea" @change="selectQu" placeholder="请选择区/县" >
                <el-option v-for="item in area" :value="item.areaCode" :label="item.area"></el-option>
              </el-select>
            </template>
          </el-col>
          <el-col :span="4">
            <template>
              <el-select v-model="shangquan.sqName" @change="selectQuan" placeholder="请选择商圈" >
                <el-option v-for="item in shangquan" :value="item.sqId" :label="item.sqName"></el-option>
              </el-select>
            </template>
          </el-col>
          <el-col :span="2">
            <el-tooltip class="item" effect="dark" content="小区关键字" placement="top">
              <p>小区关键字 :</p>
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <template>
              <el-input v-model="areaZi" placeholder="小区关键字"></el-input>
            </template>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom: 30px;">
          <el-col :span="2">
            <el-tooltip class="item" effect="dark" content="参考均价" placement="top">
              <p>参考均价 :</p>
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <template>
              <el-input v-model="minPrice" placeholder="请输入最低价格"></el-input>
            </template>
          </el-col>
          <el-col :span="2">
            <p style="text-align: center;"> 元 / ㎡ - </p>
          </el-col>
          <el-col :span="4">
            <template>
              <el-input v-model="maxPrice" placeholder="请输入最高价格"></el-input>
            </template>
          </el-col>
          <el-col :span="2">
            <p style="text-align: left;"> 元 / ㎡ </p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="2">
            <el-tooltip class="item" effect="dark" content="建造年代" placement="top">
              <p>建造年代 :</p>
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <template>
              <el-input v-model="minYear" placeholder="建造年代"></el-input>
            </template>
          </el-col>
          <el-col :span="2">
            <p style="text-align: center;"> —— </p>
          </el-col>
          <el-col :span="4">
            <template>
              <el-input v-model="maxYear" placeholder="建造年代"></el-input>
            </template>
          </el-col>
          <el-col :span="5">
            &nbsp;
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="viewData ()" style="width: 100%">筛选</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="listVillage-table">
      <div>
        <el-table border=""  ref="multipleTable" :data="view" tooltip-effect="dark" style="width: 100%;text-align: center" :header-cell-style="tableHeaderColor" @selection-change="handleSelectionChange" :default-sort = "{prop: 'referencePrice', order: 'descending'}" highlight-current-row>
          <el-table-column header-align="center" align="center" type="selection" fixed="left" ></el-table-column>
          <el-table-column header-align="center" align="center" type="index" label="序号" width="50"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="xqName" label="小区名称" ></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="junJia" label="均价(元/平)"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="jianZhuNianDai" label="建造年代"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="luRuRen" label="录入人"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip  prop="propertyConsultant" label="操作 " width="150" fixed="right"  class="list-tem-button">
            <template slot-scope="scope">
           <el-button
                @click.native.prevent="editor(scope.$index, view)"
                type="text">
                编辑
              </el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.$index, view)"
                type="text">
                删除
              </el-button>
              <el-button
                @click.native.prevent="look(scope.$index, view)"
                type="text">
                查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <v-Pagination :total="total" :current-page='current'  @pagechange="pagechange" class="clear"></v-Pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import vPagination from '../../../common/Pagination.vue';
  import {setCookie, getCookie} from '../../../../util/cookie.js'
  export default {
    name: 'index',
    components: {
      vPagination,
    },
    data(){
      return {
        area: [], // 区数据
        quUse: '', // 选中区
        shangquan: [], // 区数据
        quanUse: '', // 选中区
        areaZi: '',
        minPrice: '',
        maxPrice: '',
        minYear: '',
        maxYear: '',
        view: [],
        //        分页
        total: 0,     // 记录总条数
        display: 10,   // 每页显示条数
        current: 1,   // 当前的页数
        multipleSelection: [],
      }
    },
    mounted () {
      this.viewData ()
    },
    methods:{
      // 区
      selectArea () {
        this.$post(/api/+'/area/ofCity',{
          cityCode: getCookie('cityCode'),
        }).then(response => {
            // console.log(unescape(getCookie('jsName')))
          if (response.data.status == 200) {
            console.log(response.data.data)
            this.area = response.data.data
          } else {
            // this.$message.error(response.data.error)
          }
        })
      },
      // 选择区
      selectQu (vId) {
        let obj = {}
        obj = this.area.find((item)=>{//这里的userList就是上面遍历的数据源
            return item.areaCode === vId;//筛选出匹配数据
        })
        //console.log(obj.label)//我这边的name就是对应label的
        console.log(vId)
        this.quUse = vId
        this.$post(/api/+'/shangQuan/ofArea',{
          areaCode: this.quUse,
          page:{
            pageSize: 100,
            pageNum: 1,
          }
        }).then(response => {
            // console.log(unescape(getCookie('jsName')))
          if (response.data.status == 200) {
            console.log(response.data.data)
            this.shangquan = response.data.data.list
          } else {
            // this.$message.error(response.data.error)
          }
        })
      },
      // 选择商圈
      selectQuan (vId) {
        let obj = {}
        obj = this.shangquan.find((item)=>{//这里的userList就是上面遍历的数据源
            return item.sqId === vId;//筛选出匹配数据
        })
        //console.log(obj.label)//我这边的name就是对应label的
        console.log(vId)
        this.quanUse = vId
      },
      viewData () {
        if (this.minPrice > this.maxPrice && this.minPrice !== '' && this.maxPrice !== '') {
          this.$message.error('最小价格不能大于最大价格');
          return
        }
        if (this.minYear > this.maxYear && this.minYear !== '' && this.maxYear !== '') {
          this.$message.error('最小年代不能大于最大年代');
          return
        }
        this.$post(/api/+'/xiaoQu/list',{
          page:{
            pageSize: Number(this.display),
            pageNum: Number(this.current),
          },
          areaCode: this.quUse,
          sqId: this.quanUse,
          keyWord: this.areaZi,
          fromJunJia: this.minPrice,
          toJunJia: this.maxPrice,
          fromJianZhuNianDai: this.minYear,
          toJianZhuNianDai: this.maxYear,
        }).then(response => {
          if (response.data.status === 200) {
            this.view = response.data.data.list
            this.total = response.data.data.total
          } else if (response.data.status === 404) {
            this.$message.error(response.data.msg);
            this.view = []
          }
        })
      },
      editor (val,val1) {
        // console.log(val,val1)
        this.$store.dispatch('set_xq_id',val1[val].xqId)
        this.$store.dispatch('set_edit',true)
        this.$router.push('/addVillage')
      },
      // 刷新
      refresh () {
        this.area = [] // 区数据
        this.quUse = '' // 选中区
        this.shangquan = [] // 区数据
        this.quanUse = '' // 选中区
        this.areaZi = ''
        this.minPrice = ''
        this.maxPrice = ''
        this.minYear = ''
        this.maxYear = ''
        this.view = []
        this.viewData ()
      },
      //      删除
      deleteRow(index, rows) {
        // console.log(index, rows)
        // console.log(index, rows[index].sqId)
        this.$confirm('确定删除《'+rows[index].xqName+'》吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$post(/api/+'/xiaoQu/delete',{
            xqIds: [rows[index].xqId],
          }).then(response => {
            // console.log(response)
            if (response.data.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              this.$message.error(response.data.msg)
            }
            this.viewData ()
          }).catch(err => {
            // console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //     表格选中事件
      handleSelectionChange(val) {
        let _this = this
        _this.multipleSelection = []
        val.forEach( function(element, index) {
          // console.log(element.companyId)
          _this.multipleSelection.push(element.xqId)
        })
      },
      // 删除多个
      delAll () {
        console.log(this.multipleSelection)
        if (this.multipleSelection.length == 0) {
          this.$message.error('暂时没有数据可以删除')
        } else {
          this.$confirm('确定删除选中的小区吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.$post(/api/+'/xiaoQu/delete',{
              xqIds: this.multipleSelection,
            }).then(response => {
              console.log(response)
              if (response.data.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              } else {
                this.$message.error(response.data.msg)
              }
              this.viewData ()
            }).catch(err => {
              // console.log(err)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      look (val,val1) {
        console.log(val,val1)
        this.$store.dispatch('set_xq_id',val1[val].xqId)
        this.$router.push('/detailsVillage')
      },
      // 修改table header的背景色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f7fa;color: #282e33;'
        }
      },
      //     分页
      pagechange:function(currentPage){
        console.log(this.current);
        this.current = currentPage
        this.viewData ()
        // ajax请求, 向后台发送 currentPage, 来获取对应的数据
      },
    },
    created(){
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
  @import '../../../../assets/mixin.scss';
  #listVillage{
    width: 100%;
    .listVillage-wap{
      width: 100%;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.24);
      padding: 40px;
      box-sizing: border-box;
      .listVillage-w-content{
        margin-bottom: 30px;
        .listVillage-wc-but{
          padding: 12px 26px;
          padding-left: 60px;
          margin-right: 30px;
          background: $green;
          border-radius: 4px;
          @include sc(18px,$fc);
          float: left;
          position: relative;
          cursor: pointer;
          img{
            @include ct;
            left: 30px;
          }
        }
        .listVillage-wc-search{
          width: 30%;
          height: 48px;
          float: right;
          .listVillage-wcs-but{
            float: right;
          }
          .listVillage-wcs-inp{
            float: right;
            width: 80%;
          }
        }
      }
      .listVillage-input{
        width: 100%;
        p{
          text-align: right;
          font-size: 16px;
          color: #666;
          line-height: 40px;
          width: 100%;
          overflow:hidden; //超出的文本隐藏
          text-overflow:ellipsis; //溢出用省略号显示
          white-space:nowrap; //溢出不换行
        }
      }
    }
    .listVillage-table{
      width: 100%;
      border-radius: 10px;
      margin-top: 15px;
      background: #fff;
      box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.24);
      padding: 40px;
      box-sizing: border-box;
    }
  }
</style>
<style type="text/css">
  #listVillage .el-row {
    &:last-child {
      margin-bottom: 0;
    }
  }
  #listVillage .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .listVillage-input .el-select{
    width: 100% !important;
  }
</style>