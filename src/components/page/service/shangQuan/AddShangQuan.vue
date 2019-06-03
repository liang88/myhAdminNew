<template>
  <div id="addShangQuan">
    <div class="addShangQuan-wap">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-row :gutter="0">
          <el-col :span="24" class="addShangQuan-w-title"><span>*</span>为必填选项</el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="2" class="addShangQuan-w-name"><span>*</span>区 / 县 :</el-col>
          <el-col :span="10">
            <el-form-item label="" prop="quUse">
              <el-select v-model="area.area" @focus="selectArea" @change="selectQu" placeholder="请选择区" >
                <el-option v-for="item in area" :value="item.areaCode" :label="item.area"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="2" class="addShangQuan-w-name"><span>*</span>商圈 :</el-col>
          <el-col :span="10">
            <el-form-item label="" prop="input">
              <el-input v-model="ruleForm.input" placeholder="请输入商圈名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="10">&nbsp;</el-col>
          <el-col :span="4">
            <el-button type="primary" @click="submitForm ('ruleForm')">保存</el-button>
          </el-col>
          <el-col :span="10">&nbsp;</el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {setCookie, getCookie} from '../../../../util/cookie.js'
  export default {
    name: 'addShangQuan',
    data(){
      return {
        area: [], // 区数据
        ruleForm: {
          quUse: '', // 选中区
          input: '',
        },
        areaDan: '',
        rules: {
          quUse: [
            { required: true, message: '请选择区/县', trigger: 'change' },
          ],
          input: [
            { required: true, message: '请输入商圈名称', trigger: 'blur' },
          ],
        },
      }
    },
    mounted () {
    },
    methods: {
      // 区
      selectArea (vId) {
        this.$post(/api/+'/area/ofCity',{
          cityCode: getCookie('cityCode')
        }).then(response => {
            // console.log(response)
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
        // console.log(obj.area)//我这边的name就是对应label的
        // console.log(vId)
        this.areaDan = obj.area
        this.ruleForm.quUse = vId
      },
      submitForm(formName) {
        console.log(this.ruleForm.quUse,this.areaDan,this.ruleForm.input)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$post(/api/+'/shangQuan/add',{
              areaCode: this.ruleForm.quUse,
              area: this.areaDan,
              sqName: this.ruleForm.input,
            }).then(response => {
              console.log(response)
              if (response.data.status === 200) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
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

    },
    created(){
    },
    components: {
    }
  }
</script>
<style  lang="scss" scoped>
  @import "../../../../assets/mixin.scss";
  #addShangQuan .addShangQuan-wap{
    width: 100%;
    padding: 40px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.24);
    .addShangQuan-w-title{
      @include sc(16px,#666)
      position: relative;
      padding-left: 15px;
      margin-bottom: 30px;
      span{
        @include sc(22px,#F82C2C)
        position: absolute;
        top: 2px;
        left: 0px;
      }
    }
    .addShangQuan-w-name{
      @include sc(16px,#666)
      position: relative;
      padding-left: 15px;
      line-height: 40px;
      span{
        @include sc(22px,#F82C2C)
        position: absolute;
        top: 4px;
        left: 0px;
      }
    }
  }
</style>
<style type="text/css">
  #addShangQuan .el-row {
    &:last-child {
      margin-bottom: 0;
    }
  }
  #addShangQuan .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .addShangQuan-wap .el-select{
    width: 100% !important;
  }
  .addShangQuan-wap .el-button--primary{
    width: 100% !important;
  }
</style>