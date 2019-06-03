<template>
  <div id="login">
    <div class="login-bg">
      <div class="login-b-nav">
        <p>后台管理系统</p>
        <div class="login-bn-input">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="" prop="phone">
              <el-row :gutter="10">
                <el-col class="login-bni-zi" :span="6">手机号 :</el-col>
                <el-col :span="18">
                  <el-input v-model="ruleForm.phone"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-row :gutter="10">
                <el-col class="login-bni-zi" :span="6">密码 :</el-col>
                <el-col :span="18">
                  <el-input v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {setCookie, getCookie} from '../../util/cookie.js'
  // import {mapState} from 'vuex'
  // import {getCookie} from '../../util/cookie.js'

  export default {
    name: 'login',
    data() {
      return {
        ruleForm: {
          phone: '',
          password: '',
        },
        rules: {
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        }
      }
    },
    computed: {
    },
    mounted() {
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$post(/api/+'/login',{
              phone: this.ruleForm.phone,
              password: this.ruleForm.password,
            }).then(response => {
              console.log(response)
              if (response.data.status === 200) {
                setCookie('cityCode',response.data.data.cityCode,24*30)
                setCookie('userName',response.data.data.name,24*30)
                setCookie('jsName',response.data.data.jsname,24*30)
                setCookie('headPic',response.data.data.touXiang,24*30)
                setCookie('choseCity',response.data.data.choseCity,24*30)
                setCookie('yeWuType',response.data.data.yeWuType,24*30)
                this.$message({
                  showClose: true,
                  message: '登陆成功',
                  type: 'success'
                });
                this.$router.push('/index')
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
    components: {}
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/mixin.scss';
  #login{
    width: 100%;
    height: 100%;
    .login-bg{
      width: 100%;
      height: 100%;
      background: url('../../assets/images/loginbg.jpg');
      background-size: cover;
      .login-b-nav{
        width: 500px;
        @include center;
        p{
          @include sc(30px,#fff);
          font-weight: 600;
          margin-bottom: 30px;
          text-align: center;
        }
        .login-bn-input{
          width: 100%;
          padding: 40px;
          background: rgba(255,255,255,0.3);
          border-radius: 10px;
          box-sizing: border-box;
          box-shadow: 2px -2px 0 rgba(255,255,255,0.8);
          .login-bni-zi{
            @include sc(18px,#fff)
          }
        }
      }
    }
  }
</style>
<style type="text/css">
  .login-bn-input .el-form-item__error{
    left: 106px !important;
    color: #ff2424 !important;
  }
  .login-bn-input .el-button--primary{
    display: block;
    margin:  0 auto;
  }
</style>