<template>
	<div id="headers">
		<div class="headers-logo">
			<img src="static/images/common/logo.png" alt="">
			<p>系统管理平台</p>
		</div>
		<div class="headers-nav">
			<div class="clear">
				<p v-for="(item,index) in maxTitle" :class="{active:index === cour}" @click="clkTitle (index)" ><router-link tag="span" :to="item.to">{{item.text}}</router-link></p>
			</div>
		</div>
		<div class="headers-news" @click.stop="">
			<div class="headers-n-indoor">
				<img src="static/images/common/news.png" alt="">
				<div class="headers-ni-newsnum">
					2
				</div>
			</div>
		</div>
    <div class="headers-admin">
      <div class="headers-a-head">
        <img :src="headPic" alt="">
      </div>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link headers-a-p">
          {{name}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-sort" @click.native="clkckCS" v-if="choseCity">切换城市</el-dropdown-item>
          <el-dropdown-item icon="el-icon-delete" @click.native="clkSignout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dialog title="选择城市和房源类型" :visible.sync="dialogFormVisible" center width="30%" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="选择城市" prop="cityUse" :label-width="formLabelWidth">
            <el-autocomplete
                v-model="form.cityUse"
                :fetch-suggestions="querySearchAsyncTwo"
                @select="handleSelectTwo"
                placeholder="请搜索城市添加"
                style="width: 100%;">
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="房源类型" prop="houseType" :label-width="formLabelWidth">
            <el-select v-model="form.houseType" placeholder="请选择房源类型" style="width: 100%;">
              <el-option label="新房" value="新房"></el-option>
              <el-option label="二手房" value="二手房"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" v-if="isNo">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
	</div>
</template>
<script type="text/javascript">
	import bus from './bus.js'
  import {mapGetters,mapState} from 'vuex'
  import {setCookie, getCookie, delCookie} from '../../util/cookie.js'
  export default {
		name: 'headers',
	  data(){
      return {
        name: '',
        headPic: '',
        choseCity: true,
        isNo: true,
      	cour: 0,
      	maxTitle: [
      		{
      			text: '首页',
      			to: '/',
      		},
      		{
      			text: '业务设置',
      			to: '/listShangQuan',
      		},
      		{
      			text: '房源管理',
      			to: getCookie('yeWuType') === '二手房' ? '/listResidence' : '/listNewHouse',
      		},
      		{
      			text: '客源管理',
      			to: '/listCustomer',
      		},
      		{
      			text: '设置',
      			to: '/myinformation',
      		},
      	],
        dialogFormVisible: false,
        citys: '',
        form: {
          city: '',
          cityUse: '',
          houseType: '',
        },
        cityCode: '',
        rules: {
          cityUse: [
            { required: true, message: '请选择城市', trigger: 'change' }
          ],
          houseType: [
            { required: true, message: '请选择房源类型', trigger: 'change' }
          ],
        },
        formLabelWidth: '80px'
      }
	  },
    computed: {
      // ...mapGetters([
      //   'roleName',
      //   'userId',
      //   'token',
      //   'realName'
      // ]),
    },
    mounted () {
      this.name = getCookie('userName')
      this.headPic = getCookie('headPic')
      if (getCookie('choseCity') === 'true') {
        this.choseCity = true
        if (getCookie('cityCode') === '') {
          this.dialogFormVisible = true
          this.isNo = false
        } else {
          this.dialogFormVisible = false
          this.isNo = true
        }
      } else {
        this.choseCity = false
      }
    },
	  methods: {
      clkckCS () {
        this.dialogFormVisible = true
        // console.log(1111111111111)
      },
      //@select="handleSelect"  是选中某一列触发的事件,在这里item为选中段字所在的对象
      //循环数据
      handleSelectTwo(item) {
          // console.log(item.commId);
          this.cityCode = item.cityCode
      },
      //queryString 为在框中输入的值
      //callback 回调函数,将处理好的数据推回
      querySearchAsyncTwo(queryString, callback) {
          var list = [{}];
           //调用的后台接口
          // console.log(queryString)
          // console.log(callback)
          let _this = this
          var data = {
            name: this.form.cityUse,
          }
          this.$post(/api/+'/city/likeName',data).then((response)=>{
              //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
              // for(let i of response.data){
              //     i.value = i.communityName;  //将想要展示的数据作为value
              // }
              // list = response.data;
              if (response.data.status === 200) {
                console.log(response)
                var obj = response.data.data
                for (var i = 0; i < obj.length; i++) {
                    obj[i].value = obj[i].city
                }
                list = obj;
                console.log(list)
                this.$message({
                    message: '搜索城市成功',
                    type: 'success',
                });
              } else {
                this.$message.error(data.message);
              }
              callback(list);
        }).catch((error)=>{
            console.log(error);
        });
      },
      submitForm(formName) {
        this.$router.push('/')
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$post(/api/+'/loginCity',{
              cityCode: this.cityCode,
              yeWuType: this.form.houseType,
            }).then(response => {
              console.log(response)
              if (response.data.status === 200) {
                this.dialogFormVisible = false
                setCookie('cityCode',this.cityCode,24*30)
                setCookie('yeWuType',this.form.houseType,24*30)
                history.go(0)
                this.$message({
                  message: '更换成功',
                  type: 'success'
                });
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
	  	clkTitle (index) {
	  		this.cour = index
	  		bus.$emit('slidebars',index)
	  	},
      clkSignout () {
        this.$confirm('确定退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
//          type: 'warning',
          center: true
        }).then(() => {
          this.$post(/api/+'/logout').then(response => {
            if (response.data.status === 200) {
              this.$message({
                type: 'success',
                message: '已退出登录!'
              });
              this.$router.push('/Login')
              delCookie('cityCode')
              delCookie('userName')
              delCookie('jsName')
              delCookie('headPic')
              delCookie('choseCity')
              delCookie('yeWuType')
            } else {
              this.$message.error(response.data.message);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });
        });
      },
//      vuex  分发actions 改变message的值
      updateMessage (e) {
        this.$store.commit('updateMessage', e.target.value)
      }
	  },
	}
</script>
<style lang="scss" scoped="">
  #headers .headers-news{
    width: 200px;
    margin-right: 0;
  }
  #headers .headers-news .headers-n-indoor{
    margin: 0 auto;
  }
  .headers-news{
    position: relative;
  }
  .headers-follow-up{
    width: 750px;
    height: 382px;
    padding: 30px 40px 40px 40px;
    box-sizing: border-box;
    background: #fff;
    position: absolute;
    top: 50px;
    left: -650px;
    box-shadow: 0 10px 30px #ccc;
    z-index: 12;
    // transition: all 0.5s ease;
    .headers-followUp-title{
      width: 100%;
      margin-bottom: 16px;
      p:nth-child(1){
        float: left;
        font-size: 18px;
        color: #282e33;
        font-weight: 600;
      }
      p:nth-child(3){
        font-size: 18px;
        color: #419eff;
      }
      p:nth-child(4){
        font-size: 16px;
        color: #becbd9;
        margin: 0 10px;
      }
      p:nth-child(5){
        font-size: 18px;
        color: #419eff;
      }
      p{
        float: right;
      }
      img{
        float: right;
        margin-left: 30px;
      }
    }
    .headers-followUp-li{
      width: 100%;
      height: 58px;
      line-height: 58px;
      p{
        float: left;
        font-size: 18px;
        color: #6e757a;
        margin-right: 10px;
      }
      p:nth-child(2){
        width: 36%;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap
      }
      p:last-child{
        float: right;
        padding: 11px 25px;
        line-height: 18px;
        margin-top: 10px;
        border: 1px solid #e1e3e6;
        border-radius: 4px;
        margin-right: 0;
      }
    }
  }
  .headers-follow-up:after{
    content: "";
    display: block;
    width: 0;
    height: 0;
    border: 12px solid #ccc;
    border-right-color: transparent;
    border-bottom-color: transparent;
    position: absolute;
    top: -12px;
    left: 650px;
    transform: rotate(45deg);
  }
  // .header-dialog-box{
  //   display: none;
  //   width: 620px;
  //   position: absolute;
  //   top: 50px;
  //   left:-310px;
  //   z-index: 12;
  //   font-size: 16px;
  //   background: #fff;
  //   transition:visibility 0.4s linear;
  //   .header-mess-list{
  //     text-align: center;
  //     line-height: 76px;
  //     background: #f4f7fa;
  //     position: relative;
  //     font-size: 24px;
  //     color: #282e33;
  //     i{
  //       display: block;
  //       width: 0;
  //       height: 0;
  //       border-width: 10px;
  //       border-style: solid;
  //       border-color: transparent transparent #f4f7fa transparent;
  //       position: absolute;
  //       top:-20px;
  //       left:310px;
  //     }
  //   }
  //   .footer-mess-list{
  //     background: #f4f7fa;
  //     width: 100%;
  //     height: 76px;
  //     color: #9ca6ad;
  //     >div{
  //       width: 50%;
  //       height: 100%;
  //       float: left;
  //     }
  //     >div:nth-child(1){
  //       text-align: right;
  //       line-height: 76px;
  //     }
  //     >div:nth-child(2){
  //       position: relative;
  //       top: 25px;
  //       img{
  //         float: left;
  //         z-index: 3;
  //       }
  //     }
  //   }
  //   .mess-list{
  //     line-height: 76px;
  //     padding: 0 28px 0 31px;
  //     box-sizing: border-box;
  //     >div{
  //       width: 100%;
  //       overflow: hidden;
  //       border-top: 1px solid #e1e3e6;
  //       >span{
  //         display: block;
  //       }
  //       >span:nth-child(1){
  //         float: left;
  //         width: 310px;
  //         overflow:hidden;
  //         display:block;
  //         text-overflow:ellipsis;
  //         white-space:nowrap;

  //       }
  //       >span:nth-child(2){
  //         float: right;
  //       }
  //     }
  //   }
  // }
</style>
