<template>
  <div id="addCustomer">
    <div class="addCustomer-wap">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px">
        <el-row :gutter="0">
          <el-col :span="24" class="addCustomer-w-title"><span>*</span>为必填选项</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="销售状态" prop="xsState">
              <el-select v-model="ruleForm.xsState" placeholder="请选择销售状态">
                <el-option label="在售" value="在售"></el-option>
                <el-option label="待售" value="待售"></el-option>
                <el-option label="售罄" value="售罄"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="小区" prop="village">
              <el-autocomplete
                  v-model="ruleForm.village"
                  :fetch-suggestions="querySearchAsyncTwo"
                  @select="handleSelectTwo"
                  placeholder="请搜索小区添加"
                  style="width: 100%;">
              </el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="均价" prop="junjia">
              <el-input v-model="ruleForm.junjia" placeholder="均价 元/㎡"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" style="line-height: 40px;">
            元/㎡
          </el-col>
          <el-col :span="5">
            <el-form-item label="面积" prop="minAcreage">
              <el-input v-model="ruleForm.minAcreage" placeholder="面积最小值"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" style="line-height: 40px;">
            ㎡
          </el-col>
          <el-col :span="1" style="line-height: 40px;">
            ——
          </el-col>
          <el-col :span="4">
            <el-form-item label="" prop="maxAcreage">
              <el-input v-model="ruleForm.maxAcreage" placeholder="面积最大值" style="margin-left: -90px !important; width: 160%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" style="line-height: 40px;">
            ㎡
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="卧室" prop="houme">
              <el-select v-model="ruleForm.houme" placeholder="请选择卧室（可多选）" multiple>
                <el-option label="1室" value="1室"></el-option>
                <el-option label="2室" value="2室"></el-option>
                <el-option label="3室" value="3室"></el-option>
                <el-option label="4室" value="4室"></el-option>
                <el-option label="5室" value="5室"></el-option>
                <el-option label="5室以上" value="5室以上"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="装修" prop="zhuangxiu">
              <el-select v-model="ruleForm.zhuangxiu" placeholder="请选择装修（可多选）" multiple>
                <el-option label="毛坯" value="毛坯"></el-option>
                <el-option label="简装" value="简装"></el-option>
                <el-option label="中装" value="中装"></el-option>
                <el-option label="精装" value="精装"></el-option>
                <el-option label="豪装" value="豪装"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="优惠信息" prop="discount">
              <el-input v-model="ruleForm.discount" placeholder="请输入优惠信息"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="佣金说明" prop="yongjin">
              <el-input v-model="ruleForm.yongjin" placeholder="请输入佣金说明"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="卖点" prop="sellingPoint">
              <el-checkbox-group v-model="ruleForm.sellingPoint">
                <el-checkbox v-for="(item,index) in sellingPointData" :label="item" :key="index"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="说明" prop="explain">
              <el-input type="textarea" v-model="ruleForm.explain" :autosize="{ minRows: 4, maxRows: 10}" placeholder="请输入说明"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注" prop="remarks">
              <el-input type="textarea" v-model="ruleForm.remarks" :autosize="{ minRows: 4, maxRows: 10}" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="开盘日" prop="openingDate">
              <el-date-picker
                v-model="ruleForm.openingDate"
                type="date"
                placeholder="开盘日"
                value-format="yyyy-MM-dd"
                style="width: 100% !important;">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交房日" prop="closingDay">
              <el-date-picker
                v-model="ruleForm.closingDay"
                type="date"
                placeholder="交房日"
                value-format="yyyy-MM-dd"
                style="width: 100% !important;">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="门店" prop="quUse">
              <el-select v-model="mendian.mdName" @focus="selectMendian" @change="changeMendian" placeholder="请选择区" >
                <el-option v-for="item in mendian" :value="item.mdId" :label="item.mdName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">&nbsp;</el-col>
          <el-col :span="4">
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          </el-col>
          <el-col :span="10">&nbsp;</el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {setCookie, getCookie} from '../../../../util/cookie.js'
  import {mapGetters,mapState} from 'vuex'
  export default {
    name: 'addCustomer',
    data(){
      return {
        xqName: '',
        xqId: '',
        mendian: [],
        mendianUse: '',
        ruleForm: {
          xsState: '',
          village: '',        // 小区
          junjia: '',
          minAcreage: '',
          maxAcreage: '',
          houme: [],
          zhuangxiu: [],
          discount: '',
          yongjin: '',
          sellingPoint: [],
          explain: '',
          remarks: '',
          openingDate: '',
          closingDay: '',
        },
        rules: {
          xsState: [
            { required: true, message: '请选择销售状态', trigger: 'blur' }
          ],
          village: [
            { required: true, message: '请搜索小区添加', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                if (this.xqId === '') {
                  callback(new Error('请选择小区'));
                } else {
                  callback();
                }
              },
              trigger: 'change',
            },
          ],
          junjia: [
            {
              validator: (rule, value, callback) => {
                let reg = /^(?!0\d+)\d+$/
                if (!reg.test(value) && value !== '') {
                  callback(new Error('大于等于0的整数'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            },
          ],
          minAcreage: [
            {
              validator: (rule, value, callback) => {
                let reg = /^(?!0\d+)\d+$/
                let reg1 = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
                if (!reg.test(value) && value !== '' && !reg1.test(value)) {
                  callback(new Error('大于等于0的整数,最多两位小数'));
                } else if (Number(value) > Number(this.ruleForm.maxAcreage) && value !== '' && this.ruleForm.maxAcreage !== '') {
                  callback(new Error('小于最大面积'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            },
          ],
          maxAcreage: [
            {
              validator: (rule, value, callback) => {
                let reg = /^(?!0\d+)\d+$/
                let reg1 = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
                if (!reg.test(value) && value !== '' && !reg1.test(value)) {
                  callback(new Error('大于等于0的整数,最多两位小数'));
                } else if (Number(value) < Number(this.ruleForm.minAcreage) && value !== '' && this.ruleForm.minAcreage !== '') {
                  callback(new Error('大于最小面积'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            },
          ],
        },
        sellingPointData: [
          '绿化率高','车位充足','品牌地产','配套成熟','现房','学区房','近地铁','花园洋房','小户型','低密度','优惠楼盘'
        ],
        options4: [],
        value9: [],
        list: [],
        loading: false,
        states: [],
        urls: '',
      }
    },
    computed:{
      ...mapGetters ([
        'xfId',
        'xfEdit',
      ])
    },
    mounted () {
      if (this.xfEdit === true) {
        this.editView ()
      }
    },
    methods: {
      //@select="handleSelect"  是选中某一列触发的事件,在这里item为选中段字所在的对象
      //循环数据
      handleSelectTwo(item) {
          // console.log(item);
          this.xqName = item.xqName
          this.xqId = item.xqId
          this.$post(/api/+'/xinFang/checkRepet',{
            xqId: this.xqId
          }).then(response => {
            if (response.data.status !== 200) {
              this.$message.error(response.data.msg);
            }
          })
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
            xqName: this.ruleForm.village,
          }
          this.$post(/api/+'/xiaoQu/like',data).then((response)=>{
              //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
              // for(let i of response.data){
              //     i.value = i.communityName;  //将想要展示的数据作为value
              // }
              // list = response.data;
              if (response.data.status === 200) {
                console.log(response)
                var obj = response.data.data
                for (var i = 0; i < obj.length; i++) {
                    obj[i].value = obj[i].xqName
                }
                list = obj;
                console.log(list)
                this.$message({
                    message: '搜索小区成功',
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
      // 门店
      selectMendian (vId) {
        this.$post(/api/+'/menDian/listAll').then(response => {
            console.log(response)
          if (response.data.status == 200) {
            // console.log(response.data.data)
            this.mendian = response.data.data
          } else {
            // this.$message.error(response.data.error)
          }
        })
      },
      // 选择门店
      changeMendian (vId) {
        let obj = {}
        obj = this.mendian.find((item)=>{//这里的userList就是上面遍历的数据源
            return item.mdId === vId;//筛选出匹配数据
        })
        this.mendianUse = vId
      },
      editView () {
        this.$post(/api/+'/xinFang/detail',{
          xfId: this.xfId,
        }).then(response => {
          console.log(response.data.data.maiDians)
          if (response.data.status === 200) {
            this.ruleForm.xsState = response.data.data.xfState
            this.xqId = response.data.data.xqId
            this.xqName = response.data.data.xqName
            this.ruleForm.village = response.data.data.xqName
            this.ruleForm.junjia = response.data.data.junJia
            this.ruleForm.minAcreage = response.data.data.mianJiXiao
            this.ruleForm.maxAcreage = response.data.data.mianJiDa
            this.ruleForm.houme = response.data.data.shis
            this.ruleForm.zhuangxiu = response.data.data.zhuangXius
            this.ruleForm.discount = response.data.data.youHui
            this.ruleForm.yongjin = response.data.data.yongJin
            this.ruleForm.sellingPoint = response.data.data.maiDians
            this.ruleForm.explain = response.data.data.shuoMing
            this.ruleForm.remarks = response.data.data.beiZhu
            this.ruleForm.openingDate = response.data.data.kaiPanRiStr
            this.ruleForm.closingDay = response.data.data.jiaoFangRiStr
            this.mendianUse = response.data.data.jgId
            this.mendian.mdName = response.data.data.jgName
          }
        })
      },
      submitForm(formName) {
        if (this.xfEdit === false) {
          this.urls = '/xinFang/add'
        } else if (this.xfEdit === true) {
          this.urls = '/xinFang/update'
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$post(/api/+this.urls,{
              xfId: this.xfEdit === true ? this.xfId : '',
              xfState: this.ruleForm.xsState,
              xqId: this.xqId,
              xqName: this.xqName,
              junJia: this.ruleForm.junjia,
              mianJiXiao: this.ruleForm.minAcreage,
              mianJiDa: this.ruleForm.maxAcreage,
              shis: this.ruleForm.houme,
              zhuangXius: this.ruleForm.zhuangxiu,
              youHui: this.ruleForm.discount,
              yongJin: this.ruleForm.yongjin,
              maiDians: this.ruleForm.sellingPoint,
              shuoMing: this.ruleForm.explain,
              beiZhu: this.ruleForm.remarks,
              kaiPanRiStr: this.ruleForm.openingDate,
              jiaoFangRiStr: this.ruleForm.closingDay,
              jgId: this.mendianUse,
            }).then(response => {
              console.log(response)
              if (response.data.status === 200) {
                if (this.xfEdit === false) {
                  this.$store.dispatch('set_xf_id',response.data.data.xfId)
                  this.$router.push('/detailsNewHouse')
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                } else if (this.xfEdit === true) {
                  this.$store.dispatch('set_xf_id',this.xfId)
                  this.$router.push('/detailsNewHouse')
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                }
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
    //离开当前页面后执行
    destroyed: function () {
      this.$store.dispatch('set_xf_edit',false)
    },
  }
</script>
<style  lang="scss" scoped>
  @import "../../../../assets/mixin.scss";
  #addCustomer .addCustomer-wap{
    width: 100%;
    padding: 40px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.24);
    .addCustomer-w-title{
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
  }
</style>
<style type="text/css">
  #addCustomer .el-select{
    width: 100% !important;
  }
  #addCustomer .labelMar{
    margin-left: 0 !important;
  }
  #addCustomer .el-button--primary{
    width: 100% !important;
  }
  #addCustomer .el-col-1{
    padding-right: 0 !important;
  }
</style>