<template>
  <div id="listNewHouse">
    <div class="listNewHouse-wap">
      <div class="listNewHouse-w-content clear">
<!--         <div class="listNewHouse-wc-but">
          <img src="static/images/add.png" alt="">
          <span>添加</span>
        </div> -->
        <div class="listNewHouse-wc-but" @click="refresh">
          <img src="static/images/ref.png" alt="">
          <span>刷新</span>
        </div>
    <!--     <div class="listNewHouse-wc-but" @click="delAll">
          <img src="static/images/del.png" alt="">
          <span>删除</span>
        </div> -->
      </div>
      <div class="listNewHouse-input">
        <el-row :gutter="20">
          <el-col :span="2">
            <el-tooltip class="item" effect="dark" content="区域筛选" placement="top">
              <p>区域筛选 :</p>
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <template>
              <el-select v-model="province.province"  @focus="selectProvince" @change="selectCity" placeholder="请选择省" >
                <el-option v-for="item in province" :value="item.provinceCode" :label="item.province"></el-option>
              </el-select>
            </template>
          </el-col>
          <el-col :span="4">
            <template>
              <el-select v-model="city.city" @change="selectArea" placeholder="请选择市" >
                <el-option v-for="item in city" :value="item.cityCode" :label="item.city"></el-option>
              </el-select>
            </template>
          </el-col>
          <el-col :span="4">
            <template>
              <el-select v-model="area.area" @change="selectQu" placeholder="请选择区" >
                <el-option v-for="item in area" :value="item.areaCode" :label="item.area"></el-option>
              </el-select>
            </template>
          </el-col>
          <el-col :span="2">
            <el-tooltip class="item" effect="dark" content="新房状态" placement="top">
              <p>新房状态 :</p>
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <template>
              <el-select v-model="newHouse" placeholder="请选择新房状态">
                <el-option v-for="item in newHouseData" :key="item.value" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </template>
          </el-col>
          <el-col :span="4">
            <el-button @click="viewData ()" type="primary" style="width: 120px; float: right;">筛选</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="listNewHouse-table">
      <div>
        <el-table border=""  ref="multipleTable" :data="view" tooltip-effect="dark" style="width: 100%;text-align: center" @selection-change="handleSelectionChange" :header-cell-style="tableHeaderColor" :default-sort = "{prop: 'referencePrice', order: 'descending'}" highlight-current-row>
          <!-- <el-table-column header-align="center" align="center" type="selection" fixed="left" ></el-table-column> -->
          <el-table-column header-align="center" align="center" type="index" label="序号" width="50"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="" label="区域" >
            <template slot-scope="scope">
              {{ scope.row.province }}{{ scope.row.city }}{{ scope.row.area }}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="" label="小区名称" >
            <template slot-scope="scope">
              <img src="/static/images/zhiding.png" alt="" style="height: 12px" v-if="scope.row.zhiDing===true"> <img src="/static/images/re.png" alt="" style="height: 12px" v-if="scope.row.rePan===true"> {{ scope.row.xqName }}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="xfState" label="新房状态" ></el-table-column>
<!--           <el-table-column header-align="center" align="center" show-overflow-tooltip prop="" label="卖点列表" >
            <template slot-scope="scope">
              <span v-for="item in scope.row.maiDians">{{item}},</span>
            </template>
          </el-table-column> -->
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="" label="面积(小/大)" >
            <template slot-scope="scope">
              {{ scope.row.mianJiXiao }}/{{ scope.row.mianJiDa }}
            </template>
          </el-table-column>
          <!-- <el-table-column header-align="center" align="center" show-overflow-tooltip prop="shi" label="室列表" ></el-table-column> -->
          <el-table-column header-align="center" align="center" show-overflow-tooltip  prop="propertyConsultant" label="操作 " width="150" fixed="right"  class="list-tem-button">
            <template slot-scope="scope">
<!--               <el-button
                @click.native.prevent="deleteRow(scope.$index, view)"
                type="text">
                删除
              </el-button> -->
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
  import {setCookie, getCookie} from '../../../../util/cookie.js'
  import vPagination from '../../../common/Pagination.vue';
  export default {
    name: 'index',
    components: {
      vPagination,
    },
    data(){
      return {
        sqId: '',
        province: [], // 省数据
        city: [], // 市数据
        area: [], // 区数据
        provinceUse: '', // 选中省
        cityUse: '', // 选中市
        quUse: '', // 选中区
        newHouse: '',
        view: [],
        //        分页
        total: 0,     // 记录总条数
        display: 10,   // 每页显示条数
        current: 1,   // 当前的页数
        multipleSelection: [],
        // 朝向
        newHouseData: [
          {
            value: '1',
            label: '在售'
          },
          {
            value: '2',
            label: '待售'
          },
          {
            value: '3',
            label: '售罄'
          },
        ],
      }
    },
    mounted () {
      this.viewData ()
    },
    methods:{
      // 省
      selectProvince () {
        this.$post(/api/+'/province/all').then(response => {
          if (response.data.status == 200) {
            // console.log(response.data.data)
            this.province = response.data.data
          } else {
            // this.$message.error(response.data.error)
          }
        })
      },
      // 市
      selectCity (vId) {
        let obj = {}
        obj = this.province.find((item)=>{//这里的userList就是上面遍历的数据源
            return item.provinceCode === vId;//筛选出匹配数据
        })
        //console.log(obj.label)//我这边的name就是对应label的
        console.log(vId)
        this.provinceUse = vId
        this.$post(/api/+'/city/ofProvince',{
          provinceCode: this.provinceUse
        }).then(response => {
            console.log(response)
          if (response.data.status == 200) {
            console.log(response.data.data)
            this.city = response.data.data
          } else {
            // this.$message.error(response.data.error)
          }
        })
      },
      // 区
      selectArea (vId) {
        let obj = {}
        obj = this.city.find((item)=>{//这里的userList就是上面遍历的数据源
            return item.cityCode === vId;//筛选出匹配数据
        })
        //console.log(obj.label)//我这边的name就是对应label的
        console.log(vId)
        this.cityUse = vId
        this.$post(/api/+'/area/ofCity',{
          cityCode: this.cityUse
        }).then(response => {
            console.log(response)
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
      },
      viewData () {
        this.$post(/api/+'/xinFang/list',{
          page:{
            pageSize: this.display,
            pageNum: this.current,
          },
          provinceCode: this.provinceUse,
          cityCode: this.cityUse,
          areaCode: this.quUse,
          xfState: this.newHouse,
        }).then(response => {
          console.log(response)
          if (response.data.status === 200) {
            this.view = response.data.data.list
            this.total = response.data.data.total
          } else if (response.data.status === 404) {
            this.$message({
              showClose: true,
              message: response.data.msg,
              type: 'error'
            });
            this.view = []
          }
        })
      },
      //     分页
      pagechange:function(currentPage){
        console.log(this.current);
        this.current = currentPage
        this.viewData ()
        // ajax请求, 向后台发送 currentPage, 来获取对应的数据
      },
      // 刷新
      refresh () {
        this.sqId = ''
        this.province = [] // 省数据
        this.city = [] // 市数据
        this.area = [] // 区数据
        this.provinceUse = '' // 选中省
        this.cityUse = '' // 选中市
        this.quUse = '' // 选中区
        this.newHouse = ''
        this.viewData ()
      },
      //      删除
      deleteRow(index, rows) {
        // console.log(index, rows)
        // console.log(index, rows[index].xfId)
        this.$confirm('确定删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$post(/api/+'/xinFang/delete',{
            xfId: rows[index].xfId,
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
          _this.multipleSelection.push(element.sqId)
        })
      },
      // 删除多个
      // delAll () {
      //   console.log(this.multipleSelection)
      //   if (this.multipleSelection.length == 0) {
      //     this.$message.error('暂时没有数据可以删除')
      //   } else {
      //     this.$confirm('确定删除选中的商圈吗？', '提示', {
      //       confirmButtonText: '确定',
      //       cancelButtonText: '取消',
      //       type: 'warning',
      //       center: true
      //     }).then(() => {
      //       this.$post(/api/+'/shangQuan/delete',{
      //         sqIds: this.multipleSelection,
      //       }).then(response => {
      //         console.log(response)
      //         if (response.data.status === 200) {
      //           this.$message({
      //             type: 'success',
      //             message: '删除成功!'
      //           });
      //         } else {
      //           this.$message.error(response.data.msg)
      //         }
      //         this.viewData ()
      //       }).catch(err => {
      //         // console.log(err)
      //       })
      //     }).catch(() => {
      //       this.$message({
      //         type: 'info',
      //         message: '已取消删除'
      //       });
      //     });
      //   }
      // },
      look (val,val1) {
        // console.log(val,val1)
        this.$store.dispatch('set_xf_id',val1[val].xfId)
        this.$router.push('/detailsNewHouse')
      },
      // 修改table header的背景色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f7fa;color: #282e33;'
        }
      },
    },
    created(){
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
  @import '../../../../assets/mixin.scss';
  #listNewHouse{
    width: 100%;
    .listNewHouse-wap{
      width: 100%;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.24);
      padding: 40px;
      box-sizing: border-box;
      .listNewHouse-w-content{
        margin-bottom: 30px;
        .listNewHouse-wc-but{
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
      }
      .listNewHouse-input{
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
    .listNewHouse-table{
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
  #listNewHouse .el-row {
    &:last-child {
      margin-bottom: 0;
    }
  }
  #listNewHouse .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .listNewHouse-input .el-select{
    width: 100% !important;
  }
  .listNewHouse-edit .el-form-item__error{
    left: 17% !important;
  }
</style>