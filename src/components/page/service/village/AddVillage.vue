<template>
  <div id="addShangQuan">
    <div class="addShangQuan-wap">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-row :gutter="20">
          <el-col :span="24" class="addShangQuan-w-title"><span>*</span>为必填选项</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="2" class="addShangQuan-w-name"><span>*</span>区域 :</el-col>
          <el-col :span="4">
            <el-form-item label="" prop="quUse">
              <el-select v-model="area.area" @focus="selectArea" @change="selectQu" placeholder="请选择区" >
                <el-option v-for="item in area" :value="item.areaCode" :label="item.area"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="addShangQuan-w-name">商圈 :</el-col>
          <el-col :span="4">
            <el-form-item label="" prop="quanUse">
              <el-select v-model="shangquan.sqName" @change="selectQuan" placeholder="请选择商圈" >
                <el-option v-for="item in shangquan" :value="item.sqId" :label="item.sqName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="addShangQuan-w-name"><span>*</span>小区 :</el-col>
          <el-col :span="4">
            <el-form-item label="" prop="village">
              <el-input v-model="ruleForm.village" placeholder="请输入小区名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="2" class="addShangQuan-w-name">地址 :</el-col>
          <el-col :span="10">
            <el-form-item label="" prop="address">
              <el-input v-model="ruleForm.address" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="" prop="">
              <el-button icon="el-icon-location" @click="clkHeiBei">地图选址</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <transition name="el-fade-in-linear">
          <div class="addShangQuan-w-heibei" v-show="isHeiBei">
            <div class="addShangQuan-wh-nav">
              <div id="container" class="map" tabindex="0">
              </div>
              <el-button type="primary" round class="container-but" @click="clkHeiBeiNo">选好了 确认选址</el-button>
              <div id="pickerBox">
                <input v-model="addressTwo" id="pickerInput" placeholder="输入关键字选取地点" />
                <div id="poiInfo"></div>
              </div>
            </div>
          </div>
        </transition>
        <el-row :gutter="20">
          <el-col :span="24" class="addShangQuan-w-name" style="border-bottom: 1px dashed #ccc;margin-bottom: 20px;"></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="2" class="addShangQuan-w-name">
            <el-tooltip class="item" effect="dark" content="物业类型" placement="top"><p>物业类型 :</p></el-tooltip>
          </el-col>
          <el-col :span="22">
            <el-form-item label="" prop="checkList">
              <el-checkbox-group v-model="ruleForm.checkList">
                <el-checkbox v-for="city in citiesTwo" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="2" class="addShangQuan-w-name">
            <el-tooltip class="item" effect="dark" content="小区均价" placement="top"><p><span>*</span>小区均价 :</p></el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-form-item label="" prop="junjia">
              <el-input v-model="ruleForm.junjia" placeholder="请输入小区均价"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="addShangQuan-w-name">元/㎡</el-col>
          <el-col :span="2" class="addShangQuan-w-name">
            <el-tooltip class="item" effect="dark" content="小区栋数" placement="top"><p>小区栋数 :</p></el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-form-item label="" prop="builings">
              <el-input v-model="ruleForm.builings" placeholder="请输入小区栋数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="addShangQuan-w-name">栋</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="2" class="addShangQuan-w-name">
            <el-tooltip class="item" effect="dark" content="小区总户数" placement="top"><p>小区总户数 :</p></el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-form-item label="" prop="door">
              <el-input v-model="ruleForm.door" placeholder="请输入小区总户数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="addShangQuan-w-name">户</el-col>
          <el-col :span="2" class="addShangQuan-w-name">
            <el-tooltip class="item" effect="dark" content="建筑年代" placement="top"><p>建筑年代 :</p></el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-form-item label="" prop="yesrs">
              <el-input v-model="ruleForm.yesrs" placeholder="请输入建筑年代"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="addShangQuan-w-name">年</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="2" class="addShangQuan-w-name">
            <el-tooltip class="item" effect="dark" content="开发商" placement="top"><p>开发商 :</p></el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-form-item label="" prop="developers">
              <el-input v-model="ruleForm.developers" placeholder="请输入开发商"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="addShangQuan-w-name">&nbsp;</el-col>
          <el-col :span="2" class="addShangQuan-w-name">
            <el-tooltip class="item" effect="dark" content="物业费用" placement="top"><p>物业费用 :</p></el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-form-item label="" prop="propertyCosts">
              <el-input v-model="ruleForm.propertyCosts" placeholder="请输入物业费用"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="2" class="addShangQuan-w-name">
            <el-tooltip class="item" effect="dark" content="物业公司" placement="top"><p>物业公司 :</p></el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-form-item label="" prop="propertyCompany">
              <el-input v-model="ruleForm.propertyCompany" placeholder="请输入物业公司"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="addShangQuan-w-name">&nbsp;</el-col>
          <el-col :span="2" class="addShangQuan-w-name">
            <el-tooltip class="item" effect="dark" content="物业电话" placement="top"><p>物业电话 :</p></el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-form-item label="" prop="propertyPhone">
              <el-input v-model="ruleForm.propertyPhone" placeholder="请输入物业电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="2" class="addShangQuan-w-name">
            <el-tooltip class="item" effect="dark" content="建筑面积" placement="top"><p>建筑面积 :</p></el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-form-item label="" prop="covered">
              <el-input v-model="ruleForm.covered" placeholder="请输入建筑面积"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="addShangQuan-w-name">㎡</el-col>
          <el-col :span="2" class="addShangQuan-w-name">
            <el-tooltip class="item" effect="dark" content="绿化率" placement="top"><p>绿化率 :</p></el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-form-item label="" prop="green">
              <el-input v-model="ruleForm.green" placeholder="请输入绿化率"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="addShangQuan-w-name">%</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="2" class="addShangQuan-w-name">
            <el-tooltip class="item" effect="dark" content="容积率" placement="top"><p>容积率 :</p></el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-form-item label="" prop="plotRatio">
              <el-input v-model="ruleForm.plotRatio" placeholder="请输入容积率"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="addShangQuan-w-name">&nbsp;</el-col>
          <el-col :span="2" class="addShangQuan-w-name">
            <el-tooltip class="item" effect="dark" content="车位数量" placement="top"><p>车位数量 :</p></el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-form-item label="" prop="cart">
              <el-input v-model="ruleForm.cart" placeholder="请输入车位数量"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="2" class="addShangQuan-w-name">
            <el-tooltip class="item" effect="dark" content="小区介绍" placement="top"><p>小区介绍 :</p></el-tooltip>
          </el-col>
          <el-col :span="22">
            <el-form-item label="" prop="status">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8}"
                placeholder="请输入小区介绍"
                v-model="ruleForm.textarea">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">&nbsp;</el-col>
          <el-col :span="4">
            <el-button type="primary" style="margin-top: 40px;" @click="submitForm ('ruleForm')">保存</el-button>
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
    name: 'addShangQuan',
    data(){
      return {
        locations: '',
        isHeiBei: false,
        geocoder: '',
        marker: '',
        addressTwo: '',
        urls: '',
        area: [], // 区数据
        shangquan: [], // 区数据
        areaName: '',
        sqName: '',
        ruleForm: {
          quUse: '', // 选中区
          quanUse: '', // 选中区
          village: '',
          address: '',
          checkList: [], // 物业类型
          junjia: '', // 均价
          builings: '',
          door: '', // 户数
          yesrs: '',
          developers: '', // 开发商
          propertyCosts: '', // 物业费用
          propertyCompany: '', // 物业公司
          propertyPhone: '', // 物业电话
          covered: '', // 建筑面积
          green: '', // 绿化率
          plotRatio: '', // 容积率
          cart: '', // 车位
          textarea: '',
        },
        rules: {
          quUse: [
            { required: true, message: '请选择区/县', trigger: 'change' },
          ],
          village: [
            { required: true, message: '请输入小区名称', trigger: 'blur' },
          ],
          junjia: [
            { required: true, message: '请输入小区均价', trigger: 'blur' },
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
          builings: [
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
          door: [
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
          yesrs: [
            {
              validator: (rule, value, callback) => {
                let reg = /^\+?[1-9][0-9]*$/
                if (!reg.test(value) && value !== '') {
                  callback(new Error('大于等于1950的4位整数'));
                } else if (value < 1950 && value !== '') {
                  callback(new Error('大于等于1950的4位整数'));
                } else if (value.length !== 4 && value !== '') {
                  callback(new Error('大于等于1950的4位整数'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            },
          ],
          covered: [
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
          green: [
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
          plotRatio: [
            {
              validator: (rule, value, callback) => {
                let reg = /^(?!0\d+)\d+$/
                let regx = /^[0-9]+\.?[0-9]+?$/
                if (!reg.test(value) && value !== '' && !regx.test(value)) {
                  callback(new Error('大于等于0的整数或小数'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            },
          ],
          cart: [
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
        },
        // 点击选择 再次点击取消
        citiesTwo: [
          '住宅',
          '别墅',
          '商铺',
          '写字楼',
          '公寓',
        ],
      }
    },
    computed:{
      ...mapGetters ([
        'xqId',
        'edit',
      ])
    },
    mounted () {
      if (this.edit === true) {
        this.editView ()
      } else {
        this.maps ()
      }
      // console.log(getCookie('cityCode'))
    },
    methods: {
      clkHeiBei () {
        this.isHeiBei = true
      },
      clkHeiBeiNo () {
        this.isHeiBei = false
      },
      maps () {
        var _this = this
        var map = new AMap.Map("container", {
          zoom: 12,
          resizeEnable: true
        });
        if (this.edit === true) {
          _this.regeoCode (_this.locations,map)
        }
        map.on('click', function(e) {
          // console.log(e.lnglat.getLng() + ',' + e.lnglat.getLat())
          _this.locations = e.lnglat.getLng() + ',' + e.lnglat.getLat()
          var lnglatXY=[e.lnglat.getLng(), e.lnglat.getLat()];//地图上所标点的坐标
          _this.regeoCode (lnglatXY,map)
        });
        AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {
          var poiPicker = new PoiPicker({
            city: getCookie('cityCode'),
            input: 'pickerInput'
          });
          //初始化poiPicker
          _this.poiPickerReady(poiPicker,map);
        });
      },
      // 地图选点
      regeoCode(lnglatXY,map) {
        var _this = this
        if(!this.geocoder){
          this.geocoder = new AMap.Geocoder({
            city: "", //城市设为北京，默认：“全国”
            radius: 1000 //范围，默认：500
          });
        }
        if(!this.marker){
          this.marker = new AMap.Marker();
          map.add(this.marker);
        }
        var lnglatXY=_this.locations.split(',').map(Number);//地图上所标点的坐标
        this.marker.setPosition(lnglatXY);
        this.geocoder.getAddress(lnglatXY, function(status, result) {
          if (status === 'complete'&&result.regeocode) {
            var address = result.regeocode.formattedAddress;
            _this.addressTwo = address;
            infoWindow.setContent('<div style="font-size:20px;color:#333;">选点信息: <p style="font-size:16px;color:#666;">'+_this.addressTwo+'</p></div>');
          }else{
            _this.$message.error('暂无信息')
            _this.addressTwo = '暂无信息'
          }
        });
        map.clearMap();
        var marker = new AMap.Marker({
            map: map,
            position: lnglatXY
        });
        var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -20)
        });
        AMap.event.addListener(marker, 'click', function () {
          infoWindow.open(map, marker.getPosition());
        });
        infoWindow.setMap(map);
        infoWindow.setPosition(lnglatXY);

      },
      poiPickerReady(poiPicker,map) {
        var _this = this
        window.poiPicker = poiPicker;
        var marker = new AMap.Marker();
        var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -20)
        });
        //选取了某个POI
        poiPicker.on('poiPicked', function(poiResult) {
          var source = poiResult.source,
            poi = poiResult.item,
            info = {
              source: source,
              id: poi.id,
              location: poi.location.toString(),
              address: poi.address,
              name: poi.name,
            };
          marker.setMap(map);
          infoWindow.setMap(map);

          marker.setPosition(poi.location);
          infoWindow.setPosition(poi.location);

          infoWindow.setContent('<div style="font-size:20px;color:#333;">选点信息: <p style="font-size:16px;color:#666;">' + JSON.stringify(info.address+info.name) + '</p></div>');
          _this.locations = info.location
          console.log(_this.locations)
          infoWindow.open(map, marker.getPosition());
          // 点击弹出窗体
          AMap.event.addListener(marker, 'click', function () {
            infoWindow.open(map, marker.getPosition());
          });

          map.setCenter(marker.getPosition());
        });
        poiPicker.onCityReady(function() {
          poiPicker.suggest('小区');
        });
      },
      editView () {
        this.$post(/api/+'/xiaoQu/detail',{
          xqId: this.xqId,
        }).then(response => {
          console.log(response.data.data)
          if (response.data.status === 200) {
            this.area.area = response.data.data.area // 选中区
            this.areaName = response.data.data.area // 选中区
            this.ruleForm.quUse = response.data.data.areaCode // 选中区
            this.ruleForm.quanUse = response.data.data.sqId // 选中区
            this.shangquan.sqName = response.data.data.sqName
            this.sqName = response.data.data.sqName
            this.ruleForm.village = response.data.data.xqName
            this.ruleForm.address = response.data.data.diZhi
            this.locations = response.data.data.jingWeiDu
            this.maps ()
            if (response.data.data.wyLeiXings === null) {
              this.ruleForm.checkList =[]
            } else {
              this.ruleForm.checkList = response.data.data.wyLeiXings // 物业类型
            }
            this.ruleForm.junjia = response.data.data.junJia // 均价
            this.ruleForm.builings = response.data.data.dongShu
            this.ruleForm.door = response.data.data.huShu // 户数
            this.ruleForm.yesrs = response.data.data.jianZhuNd
            this.ruleForm.developers = response.data.data.kaiFaShang // 开发商
            this.ruleForm.propertyCosts = response.data.data.wuYeFei // 物业费用
            this.ruleForm.propertyCompany = response.data.data.wuYe // 物业公司
            this.ruleForm.propertyPhone = response.data.data.wuYePhone // 物业电话
            this.ruleForm.covered = response.data.data.jianZhuZmj // 建筑面积
            this.ruleForm.green = response.data.data.lvHuaLv // 绿化率
            this.ruleForm.plotRatio = response.data.data.rongJiLv // 容积率
            this.ruleForm.cart = response.data.data.cheWeiShu // 车位
            this.ruleForm.textarea = response.data.data.jieShao
          }
        })
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
      submitForm(formName) {
        if (this.edit === false) {
          this.urls = '/xiaoQu/add'
        } else if (this.edit === true) {
          this.urls = '/xiaoQu/update'
        }
        if (this.locations === '') {
          this.$message.error('请选择地图位置');
          return
        }
        console.log(this.locations)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$post(/api/+this.urls,{
              xqId: this.edit === true ? this.xqId : '',
              areaCode: this.ruleForm.quUse,
              area: this.areaName,
              sqId: this.ruleForm.quanUse,
              sqName: this.sqName,
              xqName: this.ruleForm.village,
              diZhi: this.ruleForm.address,
              jingWeiDu: this.locations,
              junJia: this.ruleForm.junjia,
              dongShu: this.ruleForm.builings,
              huShu: this.ruleForm.door,
              wyLeiXings: this.ruleForm.checkList,
              jianZhuNd: this.ruleForm.yesrs,
              kaiFaShang: this.ruleForm.developers,
              wuYeFei: this.ruleForm.propertyCosts,
              wuYe: this.ruleForm.propertyCompany,
              wuYePhone: this.ruleForm.propertyPhone,
              jianZhuZmj: this.ruleForm.covered,
              lvHuaLv: this.ruleForm.green,
              rongJiLv: Number(this.ruleForm.plotRatio),
              cheWeiShu: this.ruleForm.cart,
              jieShao: this.ruleForm.textarea,
            }).then(response => {
              console.log(response)
              if (response.data.status === 200) {
                if (this.edit === false) {
                  this.$store.dispatch('set_xq_id',response.data.data.xqId)
                  this.$router.push('/detailsVillage')
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                } else if (this.edit === true) {
                  this.$store.dispatch('set_xq_id',this.xqId)
                  this.$router.push('/detailsVillage')
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                }
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
    //离开当前页面后执行
    destroyed: function () {
      this.$store.dispatch('set_edit',false)
    },
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
      p{
        width: 100%;
        overflow:hidden; //超出的文本隐藏
        text-overflow:ellipsis; //溢出用省略号显示
        white-space:nowrap; //溢出不换行
      }
    }
    .addShangQuan-w-heibei{
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.5);
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 999;
      .addShangQuan-wh-nav{
        width: 80%;
        height: 80%;
        padding: 20px;
        margin: 50px auto;
        background: #fff;
        box-sizing: border-box;
        position: relative;
        #container{
          width: 100%;
          height: 100%;
        }
        .container-but{
          position: absolute;
          width: 150px !important;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          box-shadow: 0px 0px 10px #999;
        }
        #pickerBox {
            position: absolute;
            z-index: 9999;
            top: 50px;
            left: 50px;
            width: 300px;
            border-radius: 5px;
            background: #fff;
            box-shadow: 0px 0px 10px #333;
        }
        #pickerInput {
            width: 290px;
            padding: 5px 5px;
            border-radius: 5px;
            border: 0;
        }
        #poiInfo {
            background: #fff;
        }
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
/*   .addShangQuan-wap .el-button--primary{
    width: 100% !important;
  } */
  #addShangQuan .amap-ui-poi-picker-search-results-container, .amap-ui-poi-picker-sugg-container{
    max-height: 500px !important;
  }
</style>