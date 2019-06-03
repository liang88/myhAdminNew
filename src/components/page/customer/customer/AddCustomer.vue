<template>
  <div id="addCustomer">
    <div class="addCustomer-wap">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px">
        <el-row :gutter="0">
          <el-col :span="24" class="addCustomer-w-title"><span>*</span>为必填选项</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客源类型" prop="resource">
              <el-radio-group v-model="ruleForm.resource" @change="clkBut">
                <el-radio-button label="求购"></el-radio-button>
                <el-radio-button label="求租"></el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="等级" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择等级">
                <el-option label="A" value="A"></el-option>
                <el-option label="B" value="B"></el-option>
                <el-option label="C" value="C"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户称呼" prop="customerName">
              <el-input v-model="ruleForm.customerName" placeholder="请输入客户名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户电话1" prop="customerPhoneOne">
              <el-input v-model="ruleForm.customerPhoneOne" placeholder="请输入客户电话1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户电话2" prop="customerPhoneTwo">
              <el-input v-model="ruleForm.customerPhoneTwo" placeholder="请输入客户电话2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="border-bottom: 1px solid #efefef;">
          <el-col :span="24">
            <el-form-item label="备注" prop="remarks">
              <el-input type="textarea" v-model="ruleForm.remarks" :autosize="{ minRows: 4, maxRows: 10}" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px;">
          <el-col :span="12">
            <el-form-item label="区域" prop="quUse">
              <el-select v-model="area.area" @focus="selectArea" @change="selectQu" placeholder="请选择区" >
                <el-option v-for="item in area" :value="item.areaCode" :label="item.area"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商圈" prop="quanUse">
              <el-select v-model="shangquan.sqName" @change="selectQuan" placeholder="请选择商圈" >
                <el-option v-for="item in shangquan" :value="item.sqId" :label="item.sqName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="小区" prop="village">
              <el-select
                v-model="value9"
                multiple
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading">
                <el-option
                  v-for="item in options4"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="户型" prop="minHoume">
              <el-input v-model="ruleForm.minHoume" placeholder="户型最小值"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" style="line-height: 40px;">
            室
          </el-col>
          <el-col :span="1" style="line-height: 40px;">
            ——
          </el-col>
          <el-col :span="4">
            <el-input v-model="ruleForm.maxHoume" placeholder="户型最大值"></el-input>
          </el-col>
          <el-col :span="1" style="line-height: 40px;">
            室
          </el-col>
          <el-col :span="5">
            <el-form-item label="总价" prop="minPrice" v-if="ifBut === '求购'">
              <el-input v-model="ruleForm.minPrice" placeholder="总价最小值"></el-input>
            </el-form-item>
            <el-form-item label="租价" prop="minPriceZu" v-else>
              <el-input v-model="ruleForm.minPriceZu" placeholder="租价最小值"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" style="line-height: 40px;">
            <span v-if="ifBut === '求购'">万元</span>
            <span v-else>元/月</span>
          </el-col>
          <el-col :span="1" style="line-height: 40px;">
            ——
          </el-col>
          <el-col :span="4">
            <el-input v-model="ruleForm.maxPrice" v-if="ifBut === '求购'" placeholder="总价最大值"></el-input>
            <el-input v-model="ruleForm.maxPriceZu" v-else placeholder="租价最大值"></el-input>
          </el-col>
          <el-col :span="1" style="line-height: 40px;">
            <span v-if="ifBut === '求购'">万元</span>
            <span v-else>元/月</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
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
            <el-input v-model="ruleForm.maxAcreage" placeholder="面积最大值"></el-input>
          </el-col>
          <el-col :span="1" style="line-height: 40px;">
            ㎡
          </el-col>
          <el-col :span="5">
            <el-form-item label="楼层" prop="minFloor">
              <el-input v-model="ruleForm.minFloor" placeholder="楼层最小值"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" style="line-height: 40px;">
            层
          </el-col>
          <el-col :span="1" style="line-height: 40px;">
            ——
          </el-col>
          <el-col :span="4">
            <el-input v-model="ruleForm.maxFloor" placeholder="楼层最大值"></el-input>
          </el-col>
          <el-col :span="1" style="line-height: 40px;">
            层
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="类型" prop="houmeType">
              <el-select v-model="ruleForm.houmeType" placeholder="请选择类型">
                <el-option label="住宅" value="住宅"></el-option>
                <el-option label="别墅" value="别墅"></el-option>
                <el-option label="写字楼" value="写字楼"></el-option>
                <el-option label="商铺" value="商铺"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="装修" prop="zhuangxiu">
              <el-select v-model="ruleForm.zhuangxiu" placeholder="请选择装修（可多选）" multiple collapse-tags>
                <el-option label="毛坯" value="毛坯"></el-option>
                <el-option label="简装" value="简装"></el-option>
                <el-option label="普装" value="普装"></el-option>
                <el-option label="精装" value="精装"></el-option>
                <el-option label="豪装" value="豪装"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="ifBut === '求购'">
          <el-col :span="24">
            <el-form-item label="目的" prop="objective">
              <el-radio-group v-model="ruleForm.objective">
                <el-radio label="换房"></el-radio>
                <el-radio label="结婚"></el-radio>
                <el-radio label="就学"></el-radio>
                <el-radio label="投资"></el-radio>
                <el-radio label="其他"></el-radio>
              </el-radio-group>
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
        ifBut: '求购',
        area: [], // 区数据
        shangquan: [], // 区数据
        areaName: '',
        sqName: '',
        ruleForm: {
          resource: '求购',
          region: '',
          customerName: '',
          customerPhoneOne: '',
          customerPhoneTwo: '',
          remarks: '',
          quUse: '', // 选中区
          quanUse: '', // 选中区
          minHoume: '',
          maxHoume: '',
          minPrice: '',
          minPriceZu: '',
          maxPrice: '',
          maxPriceZu: '',
          minAcreage: '',
          maxAcreage: '',
          minFloor: '',
          maxFloor: '',
          houmeType: '',
          zhuangxiu: [],
          objective: '',
        },
        rules: {
          resource: [
            { required: true, message: '请选择客源类型', trigger: 'blur' }
          ],
          customerName: [
            { required: true, message: '请输入客户名称', trigger: 'blur' }
          ],
          customerPhoneOne: [
            { required: true, message: '请输入客户电话1', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                let reg = /^[1-9]+[0-9]*]*$/
                if (!reg.test(value)) {
                  callback(new Error('请输入数字'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            },
          ],
        },
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
        'kyId',
        'kyEdit',
      ])
    },
    mounted () {
      if (this.kyEdit === true) {
        this.editView ()
      }
    },
    methods: {
      remoteMethod(query) {
        this.$post(/api/+'/xiaoQu/like',{
          xqName: query,
        }).then(response => {
          console.log(response)
          if (response.data.status === 200) {
            let _this = this
            response.data.data.forEach( function(element, index) {
              // console.log(element.xqName)
              _this.states = response.data.data
              _this.list = _this.states.map(item => {
                return { value: item.xqName, label: item.xqName };
              });
            });
          }
        })
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options4 = [];
        }
      },
      clkBut (val) {
        this.ifBut = val
        if (this.ifBut === '求购') {
          this.ruleForm.minPriceZu = ''
          this.ruleForm.maxPriceZu = ''
        } else {
          this.ruleForm.minPrice = ''
          this.ruleForm.maxPrice = ''
        }
        // console.log(this.ifBut)
      },
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
        console.log(obj.area)//我这边的name就是对应label的
        console.log(vId)
        this.areaName = obj.area
        this.ruleForm.quUse = vId
        this.$post(/api/+'/shangQuan/ofArea',{
          areaCode: this.ruleForm.quUse,
          page:{
            pageSize: 100,
            pageNum: 1,
          }
        }).then(response => {
          this.shangquan = []
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
        this.ruleForm.quanUse = vId
        this.sqName = obj.sqName
      },
      editView () {
        this.$post(/api/+'/keYuan/detail',{
          kyId: this.kyId,
        }).then(response => {
          console.log(response.data.data)
          if (response.data.status === 200) {
            this.ifBut = response.data.data.kyType
            this.ruleForm.resource = response.data.data.kyType
            this.ruleForm.customerName = response.data.data.name
            this.ruleForm.customerPhoneOne = response.data.data.phone
            this.ruleForm.customerPhoneTwo = response.data.data.phoneTwo
            this.ruleForm.region = response.data.data.dengJi
            this.ruleForm.remarks = response.data.data.beiZhu
            this.areaName = response.data.data.quYu
            this.area.area = response.data.data.quYu
            this.ruleForm.quUse = response.data.data.areaCode
            this.sqName = response.data.data.shangQuan
            this.shangquan.sqName = response.data.data.shangQuan
            this.ruleForm.quanUse = response.data.data.sqId
            this.value9 = response.data.data.xiaoQus
            this.ruleForm.minHoume = response.data.data.shiXiao
            this.ruleForm.maxHoume = response.data.data.shiDa
            this.ruleForm.minPrice = response.data.data.zongJiaDi
            this.ruleForm.maxPrice = response.data.data.zongJiaGao
            this.ruleForm.minPriceZu = response.data.data.zuJiaDi
            this.ruleForm.maxPriceZu = response.data.data.zuJiaGao
            this.ruleForm.minAcreage = response.data.data.mianJiXiao
            this.ruleForm.maxAcreage = response.data.data.mianJiDa
            this.ruleForm.houmeType = response.data.data.leiXing
            this.ruleForm.minFloor = response.data.data.louCengDi
            this.ruleForm.maxFloor = response.data.data.louCengGao
            this.ruleForm.zhuangxiu = response.data.data.zhuangXius
            this.ruleForm.objective = response.data.data.muDi
          }
        })
      },
      submitForm(formName) {
        if (this.kyEdit === false) {
          this.urls = '/keYuan/add'
        } else if (this.kyEdit === true) {
          this.urls = '/keYuan/update'
        }
        if (this.ruleForm.minHoume > this.ruleForm.maxHoume && this.ruleForm.minHoume !== '' && this.ruleForm.maxHoume !== '') {
          this.$message.error('最小室不能大于最大室');
          return
        }
        if (this.ruleForm.minPrice > this.ruleForm.maxPrice && this.ruleForm.minPrice !== '' && this.ruleForm.maxPrice !== '') {
          this.$message.error('最小总价不能大于最大总价');
          return
        }
        if (this.ruleForm.minPriceZu > this.ruleForm.maxPriceZu && this.ruleForm.minPriceZu !== '' && this.ruleForm.maxPriceZu !== '') {
          this.$message.error('最小租价不能大于最大租价');
          return
        }
        if (Number(this.ruleForm.minAcreage) > Number(this.ruleForm.maxAcreage) && this.ruleForm.minAcreage !== '' && this.ruleForm.maxAcreage !== '') {
          this.$message.error('最小面积不能大于最大面积');
          console.log(1312312312312313123123123)
          return
        }
        if (this.ruleForm.minFloor > this.ruleForm.maxFloor && this.ruleForm.minFloor !== '' && this.ruleForm.maxFloor !== '') {
          this.$message.error('最小楼层不能大于最大楼层');
          return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$post(/api/+this.urls,{
              kyId: this.kyEdit === true ? this.kyId : '',
              kyType: this.ruleForm.resource,
              name: this.ruleForm.customerName,
              phone: this.ruleForm.customerPhoneOne,
              phoneTwo: this.ruleForm.customerPhoneTwo,
              dengJi: this.ruleForm.region,
              beiZhu: this.ruleForm.remarks,
              quYu: this.areaName,
              areaCode: this.ruleForm.quUse,
              shangQuan: this.sqName,
              sqId: this.ruleForm.quanUse,
              xiaoQus: this.value9,
              shiXiao: this.ruleForm.minHoume,
              shiDa: this.ruleForm.maxHoume,
              zongJiaDi: this.ruleForm.minPrice,
              zongJiaGao: this.ruleForm.maxPrice,
              zuJiaDi: this.ruleForm.minPriceZu,
              zuJiaGao: this.ruleForm.maxPriceZu,
              mianJiXiao: this.ruleForm.minAcreage,
              mianJiDa: this.ruleForm.maxAcreage,
              leiXing: this.ruleForm.houmeType,
              louCengDi: this.ruleForm.minFloor,
              louCengGao: this.ruleForm.maxFloor,
              zhuangXius: this.ruleForm.zhuangxiu,
              muDi: this.ruleForm.objective,
            }).then(response => {
              console.log(response)
              if (response.data.status === 200) {
                if (this.kyEdit === false) {
                  this.$store.dispatch('set_ky_id',response.data.data.kyId)
                  this.$router.push('/detailsCustomer')
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                } else if (this.kyEdit === true) {
                  this.$store.dispatch('set_ky_id',this.kyId)
                  this.$router.push('/detailsCustomer')
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
      this.$store.dispatch('set_ky_edit',false)
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