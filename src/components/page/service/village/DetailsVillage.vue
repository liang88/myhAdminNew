<template>
  <div id="detailsVillage">
    <div class="detailsVillage-wapone">
      <div class="detailsVillage-w-title clear">
        <div class="detailsVillage-wt-left">
          <img src="static/images/xiaoqu.png" alt="">
        </div>
        <div class="detailsVillage-wt-right">
          <p>{{view.xqName}}</p>
          <p>{{view.area}} - {{view.sqName}} - {{view.diZhi}}</p>
          <p>{{view.junJia}}元/平</p>
        </div>
      </div>
      <div class="detailsVillage-w-pic">
        <div class="detailsVillage-wp-title clear">
          <p>图 片 &nbsp;<span>(共{{picLen}}张)</span></p>
          <p @click="adminPic" v-if="view.opBt">管理</p>
        </div>
        <transition name="el-fade-in-linear">
          <div class="detailsVillage-wp-heibei" v-show="showAdminis">
            <div class="detailsVillage-wph-nav">
              <div class="detailsVillage-wphn-title">
                <p @click="clickPicNo">关闭</p>
                <p>图片管理</p>
                <p @click="">&nbsp;</p>
              </div>
              <div class="detailsVillage-wphn-pic">
            <el-upload
              :action="/api/+'/upload/resource'"
              accept="image/png, image/jpeg"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :before-upload="beforeAvatarUploadOne"
              :data="{resType:'图片',subject:'小区',subjectId:xqId,detailType:''}"
              :on-success="uploadPicOk"
              multiple
              :file-list="fileListOne">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" style="max-height: 600px;" :src="dialogImageUrl" alt="">
            </el-dialog>
              </div>
            </div>
          </div>
        </transition>
        <div class="detailsVillage-wp-swiper">
          <div class="swiper-container">
              <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(item,index) in picView">
                    <img :src="item.resUrl" alt="" @click="swiperT (index)">
                  </div>
              </div>
              <!-- 如果需要导航按钮 -->
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
          </div>
          <transition name="el-fade-in">
            <div class="houseimgswiper-heibei" v-show="swiperShow">
              <div class="mySwiperThree">
                  <div class="swiper-wrapper">
                      <div class="swiper-slide" v-for="item in picView">
                        <img :src="item.resUrl" alt="">
                      </div>
                  </div>
                  <!-- 如果需要分页器 -->
                  <!-- <div class="swiper-pagination"></div> -->
                  <!-- 如果需要导航按钮 -->
                  <div class="swiper-button-prev"></div>
                  <div class="swiper-button-next"></div>
              </div>
              <img class="houseimgswiper-h-img" src="static/images/cha.png" @click="swipernone ()">
            </div>
          </transition>
        </div>
      </div>
      <div class="detailsVillage-w-describe">
        <p>
          {{view.jieShao}}
        </p>
      </div>
      <div class="detailsVillage-w-details">
        <div class="detailsVillage-wd-title clear">
          <p>信 息</p>
        </div>
        <el-row :gutter="0" style="margin: 0 0 20px 0;">
          <el-col :span="6">
            <p><span>类型：</span>{{view.xqType === ''?'--':view.xqType}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>物业公司：</span>{{view.wuYe === ''?'--':view.wuYe}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>物业费：</span>{{view.wuYeFei === ''?'--':view.wuYeFei}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>物业电话：</span>{{view.wuYePhone === ''?'--':view.wuYePhone}}</p>
          </el-col>
        </el-row>
        <el-row :gutter="0" style="margin: 20px 0;">
          <el-col :span="6">
            <p><span>总建筑面积：</span>{{view.jianZhuZmj === ''?'--':view.jianZhuZmj}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>建筑年代：</span>{{view.jianZhuNd === ''?'--':view.jianZhuNd}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>开发商：</span>{{view.kaiFaShang === ''?'--':view.kaiFaShang}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>绿化率：</span>{{view.lvHuaLv === ''?'--':view.lvHuaLv}} %</p>
          </el-col>
        </el-row>
        <el-row :gutter="0" style="margin: 20px 0;">
          <el-col :span="6">
            <p><span>容积率：</span>{{view.rongJiLv === ''?'--':view.rongJiLv}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>车位：</span>{{view.cheWeiShu === ''?'--':view.cheWeiShu}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>物业类型：</span>{{view.wyLeiXing === ''?'--':view.wyLeiXing}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>总栋数：</span>{{view.dongShu === ''?'--':view.dongShu}}</p>
          </el-col>
        </el-row>
        <el-row :gutter="0" style="margin: 20px 0;">
          <el-col :span="6">
            <p><span>总户数：</span>{{view.huShu === ''?'--':view.huShu}}</p>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="detailsVillage-waptwo">
      <div class="detailsVillage-w-nav">
        <div class="detailsVillage-wn-title clear">
          <p>楼 栋</p>
          <p @click="clkBuilding" v-if="view.opBt">管理</p>
        </div>
        <div class="detailsVillage-wn-swiper">
          <div class="swiper-containerOne">
              <div class="swiper-wrapper">
                  <div class="swiper-slide clear" v-for="(item,index) in buildings">
                    <img src="static/images/building.png" alt="">
                    <div class="swiper-s-p">
                      <p>{{item.dzAllName}}</p>
                      <p>共 {{item.dyCount}} 单元</p>
                      <p>共 {{item.fhCount}} 户</p>
                    </div>
                  </div>
              </div>
              <!-- 如果需要导航按钮 -->
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
          </div>
        </div>
      </div>
      <div class="detailsVillage-w-navTwo">
        <div class="detailsVillage-wn-title clear">
          <p>户 型</p>
          <p @click="dialogFormVisible = true" v-if="view.opBt">添加</p>
        </div>
        <el-dialog title="添加户型" :visible.sync="dialogFormVisible" width="30%" center :close-on-click-modal="false" :close-on-press-escape="false">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="户型名称" prop="name" :label-width="formLabelWidth">
              <el-input v-model="form.name" auto-complete="off" placeholder="请输入户型名称"></el-input>
            </el-form-item>
            <el-form-item label="卧室" prop="bedRoom" :label-width="formLabelWidth">
              <el-input v-model="form.bedRoom" auto-complete="off" placeholder="请输入卧室数量"></el-input>
            </el-form-item>
            <el-form-item label="客厅" prop="livingRoom" :label-width="formLabelWidth">
              <el-input v-model="form.livingRoom" auto-complete="off" placeholder="请输入客厅数量"></el-input>
            </el-form-item>
            <el-form-item label="卫生间" prop="toilet" :label-width="formLabelWidth">
              <el-input v-model="form.toilet" auto-complete="off" placeholder="请输入卫生间数量"></el-input>
            </el-form-item>
            <el-form-item label="阳台" prop="balcony" :label-width="formLabelWidth">
              <el-input v-model="form.balcony" auto-complete="off" placeholder="请输入阳台数量"></el-input>
            </el-form-item>
            <el-form-item label="厨房" prop="kitchen" :label-width="formLabelWidth">
              <el-input v-model="form.kitchen" auto-complete="off" placeholder="请输入厨房数量"></el-input>
            </el-form-item>
            <el-form-item label="面积" prop="mianji" :label-width="formLabelWidth">
              <el-input v-model="form.mianji" auto-complete="off" placeholder="请输入面积数量"></el-input>
            </el-form-item>
            <el-form-item label="朝向" prop="orientation" :label-width="formLabelWidth">
              <el-select v-model="form.orientation" placeholder="请选择朝向" style="width: 100%;">
                <el-option v-for="item in orientationData" :key="item.value" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="reamarks" :label-width="formLabelWidth">
              <el-input type="textarea" autosize placeholder="备注" v-model="form.reamarks" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('form')">下一步</el-button>
          </div>
        </el-dialog>
        <el-dialog title="添加户型" :visible.sync="dialogImgVisible" width="380px" center :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
          <el-upload
            class="avatar-uploader"
            :action="/api/+'/upload/resource'"
            accept="image/png, image/jpeg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-change="gaibianshi"
            :before-upload="beforeAvatarUpload"
            :file-list="flielists"
            :data="{resType:'图片',subject:'户型',subjectId:hxId}"
            style="display: block;width: 200px;height:200px;margin: 0 auto;">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="avatar-uploader-heibei" @click.stop="clkHeiBei" v-if="imgHeiBei">
              <i class="el-icon-delete heibeiiocn"></i>
            </div>
          </el-upload>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="quedingImg">确 定</el-button>
          </div>
        </el-dialog>
        <div style="margin-top: 10px; margin-bottom: 20px;">
          <el-radio-group v-model="hXShai" size="small" @change="huxingView ()">
            <el-radio-button label="一室"></el-radio-button>
            <el-radio-button label="二室" ></el-radio-button>
            <el-radio-button label="三室"></el-radio-button>
            <el-radio-button label="四室"></el-radio-button>
            <el-radio-button label="五室及以上"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="detailsVillage-wn-table">
          <el-table border=""  ref="multipleTable" :data="viewHuXing" tooltip-effect="dark" style="width: 100%;text-align: center" @selection-change="handleSelectionChange" :header-cell-style="tableHeaderColor" :default-sort = "{prop: 'referencePrice', order: 'descending'}" highlight-current-row>
            <!-- <el-table-column header-align="center" align="center" type="selection" fixed="left" ></el-table-column> -->
            <el-table-column header-align="center" align="center" type="index" label="序号" width="50"></el-table-column>
            <el-table-column header-align="center" align="center" show-overflow-tooltip prop="hxName" label="户型名称" ></el-table-column>
            <el-table-column header-align="center" align="center" show-overflow-tooltip prop="" label="室/厅/卫/阳/厨">
              <template slot-scope="scope">
                {{ scope.row.woShi }}/{{ scope.row.keTing }}/{{ scope.row.weiShengJian }}/{{ scope.row.yangTai }}/{{ scope.row.chuFang }}
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" show-overflow-tooltip prop="mianJi" label="面积" ></el-table-column>
            <el-table-column header-align="center" align="center" show-overflow-tooltip prop="chaoXiang" label="朝向" ></el-table-column>
            <el-table-column header-align="center" align="center" show-overflow-tooltip prop="" label="户型图片" >
              <template slot-scope="scope">
                <img :src="scope.row.huXingImg" alt="" style="max-width: 40px; max-height: 30px;" @click="clkImg(scope.$index, viewHuXing)">
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" show-overflow-tooltip prop="miaoShu" label="描述" ></el-table-column>
            <el-table-column header-align="center" align="center" show-overflow-tooltip prop="addTimeStr" label="添加时间" ></el-table-column>
            <el-table-column header-align="center" align="center" show-overflow-tooltip prop="updateTimeStr" label="修改时间" ></el-table-column>
            <el-table-column header-align="center" align="center" show-overflow-tooltip  prop="propertyConsultant" label="操作 " width="150" fixed="right"  class="list-tem-button" v-if="view.opBt">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="editor(scope.$index, viewHuXing)"
                  type="text">
                  编辑
                </el-button>
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, viewHuXing)"
                  type="text">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog
            title="图片"
            :visible.sync="centerDialogVisible"
            max-width="80%"
            center>
            <img :src="tableImg" alt="" style="max-width: 100%; max-height: 500px; margin: 0 auto; display: block;" @click="centerDialogVisible = false">
          </el-dialog>
        </div>
      </div>
    </div>
    <div class="detailsVillage-wapthree">
      <div class="detailsVillage-w-nav">
        <div class="detailsVillage-wn-title clear">
          <p>周 边</p>
          <!-- <p @click="clkBuilding">管理</p> -->
        </div>
        <div class="detailsVillage-wn-zhou">
          <div id="container"></div>
          <div id="result">
            <div class="result-top">
              <p v-for="(item,index) in mapData" @click="clkMapData (index)" :class="{addClassMap:index === cour}" >{{item.text}}</p>
            </div>
            <div class="result-bottom" id="result-bottom">
              <p class="result-b-p clear" v-for="(item,index) in mapDataTwo" @click="clkMapDataTwo (index)" :class="{addClassMapTwo:index === courTwo}">
                <span class="span1" :class="{addClassSpan:index === courTwo}">{{item.text}}</span>
                <span>{{item.maps}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import vPagination from '../../../common/Pagination.vue';
  import {setCookie, getCookie} from '../../../../util/cookie.js'
  import {mapGetters,mapState} from 'vuex'
  import Swiper from 'swiper';
  export default {
    name: 'detailsVillage',
    components: {
      vPagination,
    },
    data(){
      return {
        view: [],
        picView: [],
        swiperShow: false,
        swiper: null,
        // img upload
        dialogImageUrl: '',
        dialogVisible: false,
        showAdminis: false,
        fileListOne: [], // 图片展示
        buildings: [], // 楼栋展示
        picLen: '',

        hXShai: '一室',  // 户型筛选
        viewHuXing: [],
        centerDialogVisible: false,
        tableImg: '',

        dialogFormVisible: false, // 添加户型
        dialogImgVisible: false, // 添加图片
        imageUrl: '',
        hxId: '',
        hxEdit: false,
        urls: '',
        flielists: [],
        imgHeiBei: false,
        resId: '',
        url: '',
        form: {
          name: '',
          bedRoom: '',
          livingRoom: '',
          toilet: '',
          balcony: '',
          kitchen: '',
          mianji: '',
          orientation: '',
          reamarks: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入户型名称', trigger: 'blur' }
          ],
          bedRoom: [
            { required: true, message: '请输入卧室数量', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                let reg = /^([1-9]\d|\d)$/
                if (!reg.test(value)) {
                  callback(new Error('0-99的整数'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            },
          ],
          livingRoom: [
            {
              validator: (rule, value, callback) => {
                let reg = /^([1-9]\d|\d)$/
                if (!reg.test(value) && value !== '') {
                  callback(new Error('0-99的整数'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            },
          ],
          toilet: [
            {
              validator: (rule, value, callback) => {
                let reg = /^([1-9]\d|\d)$/
                if (!reg.test(value) && value !== '') {
                  callback(new Error('0-99的整数'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            },
          ],
          balcony: [
            {
              validator: (rule, value, callback) => {
                let reg = /^([1-9]\d|\d)$/
                if (!reg.test(value) && value !== '') {
                  callback(new Error('0-99的整数'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            },
          ],
          kitchen: [
            {
              validator: (rule, value, callback) => {
                let reg = /^([1-9]\d|\d)$/
                if (!reg.test(value) && value !== '') {
                  callback(new Error('0-99的整数'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            },
          ],
        },
        formLabelWidth: '90px',
        // 朝向
        orientationData: [
          {
            value: '1',
            label: '东'
          },
          {
            value: '2',
            label: '南'
          },
          {
            value: '3',
            label: '西'
          },
          {
            value: '4',
            label: '北'
          },
          {
            value: '5',
            label: '东南'
          },
          {
            value: '6',
            label: '东北'
          },
          {
            value: '7',
            label: '西南'
          },
          {
            value: '8',
            label: '西北'
          },
          {
            value: '9',
            label: '东西'
          },
          {
            value: '10',
            label: '南北'
          },
        ],

        cour: 0,
        mapData: [
          {
            text: '公交',
            textdata: '公交',
          },
          {
            text: '地铁',
            textdata: '地铁',
          },
          {
            text: '学校',
            textdata: '学校',
          },
          {
            text: '医院',
            textdata: '医院',
          },
          {
            text: '购物',
            textdata: '购物',
          },
          {
            text: '生活',
            textdata: '生活',
          },
          {
            text: '娱乐',
            textdata: '娱乐',
          },
        ],
        mapText: '公交',
        courTwo: -1,
        mapDataTwo: [
          {
            text: '暂无数据',
            maps: '暂无数据',
          },
        ],
        lnglat: '',
      }
    },
    computed:{
      ...mapGetters ([
        'xqId',
        'edit',
        'xfORxq',
      ])
    },
    mounted () {
      new Swiper ('.swiper-container', {
        slidesPerView: 6,
        spaceBetween: 30,
        observer:true,
        observeParents:true,
        centeredSlides : false,
        // centerInsufficientSlides: true,
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        onSlideChangeEnd: function(swiper){
          swiper.update()
          // mySwiper.startAutoplay()
          mySwiper.reLoop()
        },
      })
      new Swiper ('.swiper-containerOne', {
        slidesPerView: 4,
        spaceBetween: 30,
        observer:true,
        observeParents:true,
        // centerInsufficientSlides: true,
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        onSlideChangeEnd: function(swiper){
          swiper.update()
          // mySwiper.startAutoplay()
          mySwiper.reLoop()
        },
      })
      this.detailsView ()
      this.maps ()
      // this.huxingView ()
    },
    methods:{
      clkMapData (index) {
        this.cour = index
        this.mapText = this.mapData[index].textdata
        console.log(this.mapText)
        this.maps()
      },
      clkMapDataTwo (index) {
        this.courTwo = index
      },
      maps () {
        var lnglat
        var that = this
        var map = new AMap.Map("container", {
          zoom: 13,
          resizeEnable: true
        });
        //地理编码实现方法
        AMap.plugin('AMap.Geocoder', function () {//回调函数
          //实例化Geocoder
          var geocoder = new AMap.Geocoder({
              //city: "010"//城市，默认：“全国”
          });
          //地理编码
          geocoder.getAddress(that.lnglat, function(status, result) {
            if (status === 'complete'&&result.regeocode) {
              var address = result.regeocode.formattedAddress;
              that.names = address
              lnglat = that.lnglat
              that.mapsTwo (map,lnglat)
              that.marker (map,lnglat)
            }else{console.log(JSON.stringify(result))}
          });
        })
      },
      marker (map,lnglat) {
        // 创建一个 Icon
        var startIcon = new AMap.Icon({
          // 图标尺寸
          size: new AMap.Size(22, 22),
          // 图标的取图地址
          image: './static/images/mapicon.png',
          // 图标所用图片大小
          imageSize: new AMap.Size(22, 22),
        });
        // 将 icon 传入 marker
        var startMarker = new AMap.Marker({
          position: lnglat.split(',').map(Number),
          icon: startIcon,
        });
        // 将 markers 添加到地图
        map.add([startMarker]);

        //创建信息窗体
        var infoWindow = new AMap.InfoWindow({
          isCustom:true,
          content:'<div style="padding:10px 20px;background:#62a82f;color:#fff;font-size:14px;border-radius:2px;">'+this.names+'</div>',//信息窗体的内容
          offset:new AMap.Pixel(20, -35), //偏移量
        });
        infoWindow.open(map,startMarker.getPosition());
      },
      mapsTwo (map,lnglat) {
        var that = this
        AMap.service(["AMap.PlaceSearch"], function() {
            //构造地点查询类
            var placeSearch = new AMap.PlaceSearch({
                type: that.mapText, // 兴趣点类别
                pageSize: 50, // 单页显示结果条数
                pageIndex: 1, // 页码
                // city: "010", // 兴趣点城市
                // citylimit: true,  //是否强制限制在设置的城市内搜索
                map: map, // 展现结果的地图实例
                panel: "result-bottom", // 结果列表将在此容器中进行展示。
                autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
            });
            // console.log(lnglat.split(',').map(Number))
            var cpoint = lnglat.split(',').map(Number) //中心点坐标
            // console.log(cpoint)
            placeSearch.searchNearBy('', cpoint, 5000, function(status, result) {
              // console.log(result)
              // result.poiList.pois.forEach(function(element,index){   //<strong>ES6写法</strong>
              //   console.log(element.address)
              //   console.log(index)
              // })
              var page = document.getElementsByClassName('amap_lib_placeSearch_page')[0]
              page.style.display = 'none'
              var scrollTop = document.getElementById('result-bottom')
              scrollTop.scrollTop = 0
            });
        });
      },

      adminPic () {
        this.showAdminis = !this.showAdminis
        this.imagesViewTwo ()
      },
      detailsView () {
        var detailsUrl
        if (this.xfORxq === true) {
          detailsUrl = 'xinFang/xiaoQu'
        } else {
          detailsUrl = '/xiaoQu/detail'
        }
        console.log(detailsUrl)
        this.$post(/api/+detailsUrl,{
          xqId: this.xqId,
        }).then(response => {
          if (response.data.status === 200) {
            console.log(response.data.data.opBt)
            this.view = response.data.data
            this.lnglat = response.data.data.jingWeiDu
            this.imagesView ()
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },
      imagesView () {
        var imageUrl
        if (this.xfORxq === true) {
          imageUrl = '/xinFang/resources'
        } else {
          imageUrl = '/search/resource'
        }
        this.$post(/api/+imageUrl,{
          subject: '小区',
          subjectId: this.xqId,
        }).then(response => {
          if (response.data.status === 200) {
            console.log(response.data.data.length)
            this.picView = response.data.data
            if (response.data.data === []) {
              this.picLen = 0
            } else {
              this.picLen = response.data.data.length
            }
            this.buildingView ()
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },
      buildingView () {
        var buildingUrl
        if (this.xfORxq === true) {
          buildingUrl = '/xinFang/xqDongZuos'
        } else {
          buildingUrl = '/dongZuo/xiaoQuDongZuos'
        }
        this.maps ()
        this.$post(/api/+buildingUrl,{
          xqId: this.xqId,
          page: {
            pageNum: 1,
            pageSize: 100,
          }
        }).then(response => {
          // console.log(response)
          if (response.data.status === 200) {
            // console.log(response)
            this.buildings = response.data.data.list
            this.huxingView ()
          } else {

          }
        })
      },
      imagesViewTwo () {
        this.$post(/api/+'/search/resource',{
          subject: '小区',
          subjectId: this.xqId,
        }).then(response => {
          if (response.data.status === 200) {
            for (var i = 0; i < response.data.data.length; i++) {
              if (response.data.data[i].resType === '图片') {
                this.fileListOne.push({url: response.data.data[i].resUrl,resId: response.data.data[i].resId})
                // console.log(this.fileListOne)
              } else if (response.data.data[i].resType === '视频') {
                this.fileListTwo.push({url: response.data.data[i].resUrl})
              }
            }
            // this.dataPic = response.data.data
          } else {
            this.fileListOne = []
            this.$message.error(response.data.msg);
          }
        })
      },
      // 删除图片
      handleRemove(file, fileList) {
        console.log(file, fileList);
        let urls,resId
        let _this = this
        if (file.response !== undefined) {
          urls = file.response.data.resUrl
          resId = file.response.data.resId
        } else {
          urls = file.url
          resId = file.resId
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          _this.$post(/api/+'/delete/resource',[{
            resId: resId,
            url: urls,
          }]).then(response => {
            if (response.data.status === 200) {
              _this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.imagesView ()
            } else {
              _this.$message.error(response.data.msg);
            }
          })
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          });
          this.fileListOne = []
          this.imagesViewTwo ()
        });
        console.log(urls)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 图片判断
      beforeAvatarUploadOne(file) {
        const isJPG = file.type === 'image/jpeg'
        const isJPG1 = file.type === 'image/jpg'
        const isJPG2 = file.type === 'image/png'
        const isLt5M = file.size / 1024 / 1024 < 5;
        const isLt500k = file.size / 1024 > 500;
        if (!isJPG && !isJPG1 && !isJPG2) {
          this.$message.error('上传图片只能是 jpeg 、 png格式!')
          return false
        }
        if (!isLt5M && !isLt500k) {
          this.$message.error('上传图片不能大于5MB/张,小于500KB/张!')
          return false
        }
      },
      uploadPicOk (response,file, fileList) {
        console.log(response)
        let _this = this
        if (response.status === 200) {
          _this.$message({
            message: '上传成功',
            type: 'success'
          });
          this.imagesView ()
        } else {
          _this.$message.error(response.msg);
        }
      },
      clickPicNo () {
        this.showAdminis = !this.showAdminis
        this.fileListOne = []
      },
      swiperT (index) {
        this.swiperShow = true
        this.swiper = new Swiper ('.mySwiperThree', {
          pagination : '.mySwiperThree',
          speed:0,
          observer:true,
          observeParents:true,
          // loop: true,
          // effect : 'fade',//切换效果
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          onSlideChangeEnd: function(swiper){
            swiper.update()
            // mySwiper.startAutoplay()
            mySwiper.reLoop()
          },
        })
        this.swiper.slideTo(index, 1, false)
      },
      swipernone () {
        this.swiper = null
        this.swiperShow = false
      },
      clkBuilding () {
        this.$store.dispatch('set_xq_id',this.xqId)
        this.$router.push('/building')
      },
      // 户型
      // 户型
      // 户型
      // 户型
      // 户型
      huxingView () {
        var huxingUrl
        if (this.xfORxq === true) {
          huxingUrl = '/xinFang/huXings'
        } else {
          huxingUrl = '/huXing/search'
        }
        this.$post(/api/+huxingUrl,{
          xqId: this.xqId,
          woShi: this.hXShai,
        }).then(response => {
          // console.log(response)
          if (response.data.status === 200) {
            // console.log(response)
            if (response.data.data === []) {
              this.viewHuXing = []
            } else {
              this.viewHuXing = response.data.data
            }
          } else {
            this.$message.error(response.data.msg);
            this.viewHuXing = []
          }
        })
      },
      editor (index, rows) {
        // console.log(index, rows)
        this.$post(/api/+'/huXing/detail',{
          hxId: rows[index].hxId,
        }).then(response => {
          if (response.data.status === 200) {
            this.dialogFormVisible = true
            this.hxId = response.data.data.hxId
            this.form.name = response.data.data.hxName
            this.form.bedRoom = response.data.data.woShi
            this.form.livingRoom = response.data.data.keTing
            this.form.toilet = response.data.data.weiShengJian
            this.form.balcony = response.data.data.yangTai
            this.form.kitchen = response.data.data.chuFang
            this.form.mianji = response.data.data.mianJi
            this.form.orientation = response.data.data.chaoXiang
            this.form.reamarks = response.data.data.miaoShu
            this.imageUrl = response.data.data.huXingImg
            this.resId = response.data.data.resId
            this.url = response.data.data.huXingImg
            this.hxEdit = true
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },
      submitForm(formName) {
        if (this.hxEdit === false) {
          this.urls = '/huXing/add'
        } else if (this.hxEdit === true) {
          this.urls = '/huXing/update'
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$post(/api/+this.urls,{
              hxId: this.hxEdit === true ? this.hxId : '',
              hxName: this.form.name,
              xqId: this.xqId,
              woShi: this.form.bedRoom,
              keTing: this.form.livingRoom,
              weiShengJian: this.form.toilet,
              yangTai: this.form.balcony,
              chuFang: this.form.kitchen,
              mianJi: this.form.mianji,
              chaoXiang: this.form.orientation,
              miaoShu: this.form.reamarks,
            }).then(response => {
              // console.log(response.data.data.hxId)
              if (response.data.status === 200) {
                this.dialogFormVisible = false
                this.dialogImgVisible = true
                this.huxingView ()
                if (this.hxEdit === false) {
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                  this.hxId = response.data.data.hxId
                } else if (this.hxEdit === true) {
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                }
                console.log(this.imageUrl)
                if (this.imageUrl !== null) {
                  this.imgHeiBei = true
                } else {
                  this.imgHeiBei = false
                }
                this.$refs[formName].resetFields();
                this.form.name = ''
                this.form.bedRoom = ''
                this.form.livingRoom = ''
                this.form.toilet = ''
                this.form.balcony = ''
                this.form.kitchen = ''
                this.form.mianji = ''
                this.form.orientation = ''
                this.form.reamarks = ''
                this.hxEdit = false
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
      // 图片上传成功
      handleAvatarSuccess(res, file) {
        // console.log(res, file)
        this.resId = res.data.resId
        this.url = res.data.resUrl
        this.flielists = []
        this.imageUrl = URL.createObjectURL(file.raw);
        if (this.imageUrl !== '') {
          this.imgHeiBei = true
        } else {
          this.imgHeiBei = false
        }
        this.$message({
          message: '图片上传成功',
          type: 'success'
        });
        this.huxingView ()
      },
      clkHeiBei () {
        this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
        }).then(() => {
          this.$post(/api/+'/delete/resource',[{
            resId: this.resId,
            url: this.url,
          }]).then(response => {
            if (response.data.status === 200) {
              this.$message({
                message: '图片删除成功',
                type: 'success'
              });
              this.imageUrl = ''
              this.imgHeiBei = false
              this.huxingView ()
            } else {
              this.$message.error(response.data.msg);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        });
      },
      gaibianshi (file, fileList) {
        // if (fileList.length > 1) {
        //   console.log(file, fileList)
        // }
      },
      // 图片判断
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isJPG1 = file.type === 'image/jpg'
        const isJPG2 = file.type === 'image/png'
        const isLt5M = file.size / 1024 / 1024 < 5;
        const isLt500k = file.size / 1024 > 500;
        if (!isJPG && !isJPG1 && !isJPG2) {
          this.$message.error('上传图片只能是 jpeg 、 png格式!')
          return false
        }
        if (!isLt5M && !isLt500k) {
          this.$message.error('上传图片不能大于5MB/张,小于500KB/张!')
          return false
        }
      },
      quedingImg () {
        this.dialogImgVisible = false
        this.imageUrl = ''
      },
      // click table 的img、
      clkImg (val,val1) {
        console.log(val,val1)
        this.tableImg = val1[val].huXingImg
        this.centerDialogVisible = true
      },
      //      删除
      deleteRow(index, rows) {
        // console.log(index, rows)
        // console.log(index, rows[index].sqId)
        this.$confirm('确定删除《'+rows[index].hxName+'》吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$post(/api/+'/huXing/delete',{
            hxId: rows[index].hxId,
            resId: rows[index].resId,
            hxImg: rows[index].huXingImg,
          }).then(response => {
            // console.log(response)
            if (response.data.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.huxingView ()
            } else {
              this.$message.error(response.data.msg)
            }
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
      // 修改table header的背景色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f7fa;color: #282e33;'
        }
      },
    },
    //离开当前页面后执行
    destroyed: function () {
      this.$store.dispatch('set_xf_or_xq',false)
    },
  }
</script>

<style type="text/css" lang="scss" scoped>
  @import '../../../../assets/mixin.scss';
  #detailsVillage .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  #detailsVillage .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  #detailsVillage .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
  }
  #detailsVillage .avatar-uploader{
    position: relative;
  }
  #detailsVillage .avatar-uploader:hover .avatar-uploader-heibei{
    background: rgba(0,0,0,.5);
  }
  #detailsVillage .avatar-uploader:hover .avatar-uploader-heibei .heibeiiocn{
    color: #fff;
  }
  #detailsVillage .avatar-uploader .avatar-uploader-heibei{
    width: 200px;
    height: 200px;
    background: transparent;
    position: absolute;
    top: 0;
    left: 0;
    transition: all .5s;
  }
  #detailsVillage .avatar-uploader .avatar-uploader-heibei .heibeiiocn{
    font-size: 40px;
    color: transparent;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    transition: all .5s;
  }
  #detailsVillage .avatar {
    width: 200px;
    height: 200px;
    display: block;
  }
  #detailsVillage{
    width: 100%;
    .detailsVillage-wapone{
      width: 100%;
      padding: 40px;
      background: #fff;
      border-radius: 10px;
      box-sizing: border-box;
      box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.24);
      .detailsVillage-w-title{
        width: 100%;
        padding-bottom: 20px;
        border-bottom: 1px solid #efefef;
        .detailsVillage-wt-left{
          width: 166px;
          height: 166px;
          border-radius: 28px;
          overflow: hidden;
          float: left;
          position: relative;
          img{
            // width: 100%;
            @include center
          }
        }
        .detailsVillage-wt-right{
          float: left;
          margin-left: 40px;
          p:nth-child(1){
            @include sc(30px,#333);
            margin-top: 20px;
          }
          p:nth-child(2){
            @include sc(20px,#666);
            margin-top: 15px;
          }
          p:nth-child(3){
            @include sc(24px,#F54158);
            margin-top: 25px;
          }
        }
      }
      .detailsVillage-w-pic{
        width: 100%;
        padding: 20px 0;
        border-bottom: 1px solid #efefef;
        .detailsVillage-wp-title{
          width: 100%;
          p:nth-child(1){
            @include sc(28px,#449BE1);
            float: left;
            margin-bottom: 20px;
            span{
              @include sc(16px,#666)
            }
          }
          p:nth-child(2){
            @include sc(20px,#449BE1);
            float: right;
            cursor: pointer;
            margin-bottom: 20px;
          }
        }
        .detailsVillage-wp-heibei{
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 9;
          background: rgba(8, 26, 36, 0.6);
          .detailsVillage-wph-nav{
            width: 800px;
            padding: 40px;
            background: #fff;
            margin: 100px auto;
            border-radius: 10px;
            .detailsVillage-wphn-title{
              width: 100%;
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
              p{
                @include sc(18px,#449BE1)
                line-height: 20px;
                cursor: pointer;
              }
              p:nth-child(2n){
                @include sc(20px,#333);
                cursor: text;
              }
            }
            .detailsVillage-wphn-pic{
              width: 100%;
              max-height: 500px;
              overflow-x: hidden;
            }
          }
        }
        .detailsVillage-wp-swiper{
          width: 100%;
          height: 166px;
          .swiper-container{
            height: 100%;
            .swiper-wrapper{
              height: 100%;
              .swiper-slide{
                height: 100%;
                position: relative;
                overflow: hidden;
                img{
                  height: 100%;
                  @include center;
                  cursor: pointer;
                }
              }
            }
          }
          .houseimgswiper-heibei{
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 9999;
            background: rgba(8, 26, 36, 0.6);
          }
          .mySwiperThree{
            height: 100%;
          }
          .mySwiperThree .swiper-button-prev, .swiper-container-rtl .swiper-button-next{
            width: 30px;
            height: 60px;
            background-image: url('/static/images/b-left.png');
            -webkit-background-size: 30px 60px;
            background-size: 30px 60px;
            position: absolute;
            top: 50%;
            left: 20%;
            margin-left: -45px;
            z-index: 9999;
          }
          .mySwiperThree .swiper-button-next, .swiper-container-rtl .swiper-button-prev{
            width: 30px;
            height: 60px;
            background-image: url('/static/images/b-right.png');
            -webkit-background-size: 30px 600px;
            background-size: 30px 60px;
            position: absolute;
            top: 50%;
            right: 20%;
            margin-right: -45px;
            z-index: 9999;
          }
          .mySwiperThree .swiper-wrapper .swiper-slide{
            position: relative;
          }
          .mySwiperThree .swiper-wrapper .swiper-slide img{
            display: block;
            height: 70%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%)
          }
          .houseimgswiper-h-img{
            position: absolute;
            top: 10%;
            right: 10%;
            cursor: pointer;
            z-index: 9999;
          }
        }
      }
      .detailsVillage-w-describe{
        width: 100%;
        padding: 20px 0;
        border-bottom: 1px solid #efefef;
        p{
          @include sc(18px,#666);
          line-height: 30px;
          text-indent:2em;
          text-align: justify;
        }
      }
      .detailsVillage-w-details{
        .detailsVillage-wd-title{
          width: 100%;
          p:nth-child(1){
            @include sc(28px,#449BE1);
            float: left;
            margin-bottom: 20px;
            span{
              @include sc(16px,#666)
            }
          }
        }
        width: 100%;
        padding-top: 20px;
        p{
          @include sc(20px,#333);
          span{
            @include sc(20px,#666);
          }
        }
      }
    }
    .detailsVillage-waptwo{
      width: 100%;
      padding: 40px;
      margin-top: 15px;
      background: #fff;
      border-radius: 10px;
      box-sizing: border-box;
      box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.24);
      .detailsVillage-w-nav{
        width: 100%;
        overflow-x: hidden;
        .detailsVillage-wn-title{
          width: 100%;
          p:nth-child(1){
            @include sc(28px,#449BE1);
            float: left;
            margin-bottom: 20px;
            span{
              @include sc(16px,#666)
            }
          }
          p:nth-child(2){
            @include sc(20px,#449BE1);
            float: right;
            cursor: pointer;
            margin-bottom: 20px;
          }
        }
        .detailsVillage-wn-swiper{
          width: 100%;
          height: 166px;
          .swiper-containerOne{
            height: 100%;
            position: relative;
            .swiper-wrapper{
              height: 100%;
              .swiper-slide{
                height: 100%;
                position: relative;
                overflow: hidden;
                display: flex;
                display: -webkit-flex;
                align-items: center;
                img{
                  height: 100%;
                  float: left;
                }
                .swiper-s-p{
                  float: left;
                  margin-left: 20px;
                  p:nth-child(1){
                    @include sc(20px,#333);
                    margin-bottom: 10px;
                  }
                  p:nth-child(2){
                    @include sc(18px,#666);
                    margin-bottom: 10px;
                  }
                  p:nth-child(3){
                    @include sc(14px,#666);
                  }
                }
              }
            }
          }
        }
      }
      .detailsVillage-w-navTwo{
        width: 100%;
        overflow-x: hidden;
        .detailsVillage-wn-title{
          width: 100%;
          margin-top: 40px;
          p:nth-child(1){
            @include sc(28px,#449BE1);
            float: left;
            margin-bottom: 20px;
            span{
              @include sc(16px,#666)
            }
          }
          p:nth-child(2){
            @include sc(20px,#449BE1);
            float: right;
            cursor: pointer;
            margin-bottom: 20px;
          }
        }
        .detailsVillage-wn-table{
          width: 100%;
        }
      }
    }
    .detailsVillage-wapthree{
      width: 100%;
      padding: 40px;
      margin-top: 15px;
      background: #fff;
      border-radius: 10px;
      box-sizing: border-box;
      box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.24);
      .detailsVillage-w-nav{
        width: 100%;
        overflow-x: hidden;
        .detailsVillage-wn-title{
          width: 100%;
          p:nth-child(1){
            @include sc(28px,#449BE1);
            float: left;
            margin-bottom: 20px;
            span{
              @include sc(16px,#666)
            }
          }
          p:nth-child(2){
            @include sc(20px,#449BE1);
            float: right;
            cursor: pointer;
            margin-bottom: 20px;
          }
        }
        .detailsVillage-wn-zhou{
          width: 100%;
          height: 550px;
          position: relative;
          #container{
            width: 100%;
            height: 100%;
          }
          #result{
            width: 360px;
            height: 500px;
            background: #fff;
            position: absolute;
            right: 20px;
            top: 20px;
            box-shadow: 10px 10px 30px #b7b7b7;
          }
          #result .result-top{
            width: 100%;
            height: 76px;
            background: #f5f5f5;
            display: -webkit-flex;
            display: -moz-flex;
            display: -ms-flex;
            display: -o-flex;
            display: flex;
            -webkit-justify-content: space-around;
            justify-content: space-around;
          }
          #result .result-top p{
            font-size: 18px;
            color: #808080;
            line-height: 76px;
            cursor: pointer;
          }
          #result .result-top .addClassMap{
            color: #1fa0ff;
            font-size: 18px;
            font-weight: 600;
            position: relative;
          }
          #result .result-top .addClassMap:after{
            content: "";
            width: 30px;
            height: 3px;
            background: #1fa0ff;
            position: absolute;
            left: 50%;
            bottom: 20px;
            transform: translateX(-50%)
          }
          #result .result-bottom{
            width: 100%;
            height: 424px;
            overflow-x: hidden;
          }
          #result .result-bottom::-webkit-scrollbar {/*滚动条整体样式*/
              width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
              height: 4px;
              cursor: pointer;
          }
          #result .result-bottom::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
              border-radius: 5px;
              -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
              background: rgba(0,0,0,0.2);
          }
          #result .result-bottom::-webkit-scrollbar-track {/*滚动条里面轨道*/
              -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
              border-radius: 0;
              background: rgba(0,0,0,0.1);
          }
          #result .result-bottom .result-b-p{
            height: 66px;
            line-height: 66px;
            padding: 0 30px 0 20px;
            cursor: pointer;
            border-bottom: 1px solid #ededed;
          }
          #result .result-bottom .result-b-p:hover{
            background: #f5f5f5;
            color: #62a82f;
            transition: all 0.5s ease;
          }
          #result .result-bottom .addClassMapTwo{
            background: #1fa0ff;
            color: #1fa0ff;
          }
          #result .result-bottom .result-b-p:hover span:nth-child(1){
            background: url('/static/images/firstLevelPage/secondLevelPage/a-gj2.png') no-repeat;
            background-position: 0px 22px;
          }
          #result .result-bottom .result-b-p span{
            font-size: 14px;
          }
          #result .result-bottom .result-b-p .span1{
            float: left;
            padding-left: 34px;
            background: url('/static/images/firstLevelPage/secondLevelPage/a-gj1.png') no-repeat;
            background-position: 0px 22px;
          }
          #result .result-bottom .result-b-p .addClassSpan{
            background: url('/static/images/firstLevelPage/secondLevelPage/a-gj2.png') no-repeat;
            background-position: 0px 22px;
          }
          #result .result-bottom .result-b-p span:nth-child(2){
            float: right;
          }
        }
      }
    }
  }
</style>