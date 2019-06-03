<template>
  <div id="listOfBuilding">
    <div class="listOfBuilding-wap">
      <div class="listOfBuilding-w-content clear">
<!--         <div class="listOfBuilding-wc-but">
          <img src="static/images/add.png" alt="">
          <span>添加</span>
        </div> -->
        <div class="listOfBuilding-wc-but" @click="refresh">
          <img src="static/images/ref.png" alt="">
          <span>刷新</span>
        </div>
        <div class="listOfBuilding-wc-but" @click="delAll">
          <img src="static/images/del.png" alt="">
          <span>删除</span>
        </div>
      </div>
      <div class="listOfBuilding-input">
        <el-row :gutter="20">
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
          <el-col :span="2">
            <el-tooltip class="item" effect="dark" content="商圈筛选" placement="top">
              <p>商圈筛选 :</p>
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <template>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </template>
          </el-col>
          <el-col :span="4">
            <el-button @click="viewData ()" type="primary" style="width: 120px; float: right;">筛选</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="listOfBuilding-table">
      <div>
        <el-table border=""  ref="multipleTable" :data="view" tooltip-effect="dark" style="width: 100%;text-align: center" @selection-change="handleSelectionChange" :header-cell-style="tableHeaderColor" :default-sort = "{prop: 'referencePrice', order: 'descending'}" highlight-current-row>
          <el-table-column header-align="center" align="center" type="selection" fixed="left" ></el-table-column>
          <el-table-column header-align="center" align="center" type="index" label="序号" width="50"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="sqName" label="商圈名" ></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="addTime" label="添加时间"></el-table-column>
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
            </template>
          </el-table-column>
        </el-table>
        <v-Pagination :total="total" :current-page='current'  @pagechange="pagechange" class="clear"></v-Pagination>
      </div>
    </div>
    <div class="listOfBuilding-edit">
      <el-dialog title="修改商圈" :visible.sync="dialogFormVisible" center>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="" prop="name">
            <el-row :gutter="20">
              <el-col :span="4">
                商圈名称 ：
              </el-col>
              <el-col :span="20">
                <el-input v-model="ruleForm.name" placeholder="请输入商圈名称"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm ('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
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
        ruleForm: {
          name: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入商圈名称', trigger: 'blur' },
          ],
        },
        dialogFormVisible: false,
        sqId: '',
        area: [], // 区数据
        quUse: '', // 选中区
        view: [],
        input: '',
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
            console.log(response)
          if (response.data.status == 200) {
            // console.log(response.data.data)
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
        this.$post(/api/+'shangQuan/ofArea',{
          page:{
            pageSize: this.display,
            pageNum: this.current,
          },
          areaCode: this.quUse,
          sqName: this.input,
        }).then(response => {
          console.log(response)
          if (this.quUse == '') {
            this.view = []
          } else {
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$post(/api/+'/shangQuan/update',{
              sqId: this.sqId,
              sqName: this.ruleForm.name,
            }).then(response => {
              console.log(response)
              if (response.data.status === 200) {
                this.$message({
                  message: '更改成功',
                  type: 'success'
                });
                this.dialogFormVisible = false
                this.viewData ()
                this.ruleForm.name = ''
              } else if (response.data.status === 404) {
                this.$message.error(response.data.msg);
              } else {
                this.$message.error(response.data.msg);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      editor (val,val1) {
        // console.log(val,val1)
        this.sqId = val1[0].sqId
        this.dialogFormVisible = true
        this.ruleForm.name = val1[val].sqName
      },
      // 刷新
      refresh () {
        this.province = [] // 省数据
        this.city = [] // 市数据
        this.area = [] // 区数据
        this.provinceUse = '' // 选中省
        this.cityUse = '' // 选中市
        this.quUse = '' // 选中区
        this.view = []
        this.input = ''
        this.viewData ()
      },
      //      删除
      deleteRow(index, rows) {
        // console.log(index, rows)
        // console.log(index, rows[index].sqId)
        this.$confirm('确定删除《'+rows[index].sqName+'》吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$post(/api/+'/shangQuan/delete',{
            sqIds: [rows[index].sqId],
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
      delAll () {
        console.log(this.multipleSelection)
        if (this.multipleSelection.length == 0) {
          this.$message.error('暂时没有数据可以删除')
        } else {
          this.$confirm('确定删除选中的商圈吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.$post(/api/+'/shangQuan/delete',{
              sqIds: this.multipleSelection,
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
  #listOfBuilding{
    width: 100%;
    .listOfBuilding-wap{
      width: 100%;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.24);
      padding: 40px;
      box-sizing: border-box;
      .listOfBuilding-w-content{
        margin-bottom: 30px;
        .listOfBuilding-wc-but{
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
      .listOfBuilding-input{
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
    .listOfBuilding-table{
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
  #listOfBuilding .el-row {
    &:last-child {
      margin-bottom: 0;
    }
  }
  #listOfBuilding .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .listOfBuilding-input .el-select{
    width: 100% !important;
  }
  .listOfBuilding-edit .el-form-item__error{
    left: 17% !important;
  }
</style>