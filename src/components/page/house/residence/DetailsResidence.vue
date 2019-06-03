<template>
  <div id="detailsResidence">
    <div class="detailsResidence-wapone">
      <div class="detailsResidence-w-title clear">
        <div class="detailsResidence-wt-left">
          <img src="static/images/zhuzhai.png" alt="">
          <p class="detailsResidence-wtl-zi">{{view.bianHao}}</p>
        </div>
        <div class="detailsResidence-wt-right">
          <p>{{view.xqName}}</p>
          <p>
            <span>{{view.panBie}}</span>
            <span>{{view.fyState}}</span>
            <span>{{view.dengJi}} 类</span>
            <span v-for="item in view.peiTaos">{{item}}</span>
          </p>
          <p>{{view.zuShou}} <span v-if="view.shi !== ''">{{view.shi}}室</span><span v-if="view.ting !== ''">{{view.ting}}厅</span><span v-if="view.wei !== ''">{{view.wei}}卫</span><span v-if="view.yang !== ''">{{view.yang}}阳</span><span v-if="view.chu !== ''">{{view.chu}}厨</span> <span v-if="view.leiXing !== ''">的{{view.leiXing}}</span></p>
        </div>
        <el-dropdown trigger="click" style="float:right;">
          <el-button type="primary">
            更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><p @click="genJinShowClk">房源跟进</p></el-dropdown-item>
            <el-dropdown-item><p @click="fyEditClk" v-if="bianJiFyBt">编辑房源</p></el-dropdown-item>
            <el-dropdown-item><p @click="adminPic">图片管理</p></el-dropdown-item>
            <el-dropdown-item><p @click="dialogFormVisible = true" v-if="zhuanYiFyBt">转移房源</p></el-dropdown-item>
            <el-dropdown-item><p @click="fyStateShow = true" v-if="youWuXiaoBt">房源状态</p></el-dropdown-item>
            <el-dropdown-item><p @click="zhuanG" v-if="gongPanBt">设为公盘</p></el-dropdown-item>
            <el-dropdown-item><p @click="zhuanS" v-if="siPanBt">设为私盘</p></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="primary" icon="el-icon-phone-outline" style="float:right; margin-right: 5px;" @click="lianXiClk" v-if="viewYeZhuBt">查看</el-button>
        <!-- 查看业主信息 弹窗 -->
        <el-dialog title="客户信息" :visible.sync="lianXiShow" width="40%" center :close-on-click-modal="false" :close-on-press-escape="false" :before-close="closeYZ">
          <p class="detailsResidence-wt-liangxiOne"><span>门 &nbsp;牌&nbsp; 号 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>{{view.dzName}} · {{view.dyAllName}} · {{view.fangHao}}室</p>
          <div class="detailsResidence-wt-liangxi" v-for="item in lianXiView">
            <p><span>客户称呼 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>{{item.name}}</p>
            <p><span>联系方式 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>{{item.phone}}</p>
          </div>
        </el-dialog>
        <!-- 跟进 -->
        <el-dialog title="写跟进" :visible.sync="genJinShow" center width=30% :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 10}"
            placeholder="请输入内容"
            v-model="textarea3">
          </el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="genJinShow = false" v-if="isYzLook">取 消</el-button>
            <el-button type="primary" @click="genJinClk">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 转移房源 -->
        <el-dialog title="房源转移" :visible.sync="dialogFormVisible" center width=30% :close-on-click-modal="false" :close-on-press-escape="false">
          <p style="font-size: 16px;margin-bottom: 20px;">搜索人员名称</p>
          <el-autocomplete
              v-model="liuOne"
              :fetch-suggestions="querySearchAsyncOne"
              @select="handleSelectOne"
              placeholder="请输入关键字"
              style="width:100%">
          </el-autocomplete>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="transformAll">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 房源状态 -->
        <el-dialog title="房源状态" :visible.sync="fyStateShow" center width=30% :close-on-click-modal="false" :close-on-press-escape="false">
          <el-select v-model="fyState" placeholder="请选择客源状态" style="width: 100%;">
            <el-option v-for="item in fyStateData" :key="item.value" :label="item.label" :value="item.label"></el-option>
          </el-select>
          <div slot="footer" class="dialog-footer">
            <el-button @click="fyStateShow = false">取 消</el-button>
            <el-button type="primary" @click="fyStateClk">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="detailsResidence-w-pic">
        <div class="detailsResidence-wp-title clear">
          <p>图 片 &nbsp;<span>(共{{picLen}}张)</span></p>
        </div>
        <transition name="el-fade-in-linear">
          <div class="detailsResidence-wp-heibei" v-show="showAdminis">
            <div class="detailsResidence-wph-nav">
              <div class="detailsResidence-wphn-title">
                <p @click="clickPicNo">关闭</p>
                <p>图片管理</p>
                <p @click="">&nbsp;</p>
              </div>
              <div class="detailsResidence-wphn-pic">
                <el-upload
                  :action="/api/+'/upload/resource'"
                  accept="image/png, image/jpeg"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :before-upload="beforeAvatarUploadOne"
                  :data="{resType:'图片',subject:'房源',subjectId:zzId,detailType:''}"
                  :on-success="uploadPicOk"
                  multiple
                  :file-list="fileListOne">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisibleTwo">
                  <img width="100%" style="max-height: 600px;" :src="dialogImageUrl" alt="">
                </el-dialog>
              </div>
            </div>
          </div>
        </transition>
        <div class="detailsResidence-wp-swiper">
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
<!--       <div class="detailsResidence-w-describe">
        <p>
          {{view.jieShao}}
        </p>
      </div> -->
      <div class="detailsResidence-w-details">
        <div class="detailsResidence-wd-title clear">
          <p>信 息</p>
        </div>
        <el-row :gutter="0" style="margin: 0 0 20px 0;">
          <el-col :span="6">
            <p><span>建筑面积：</span>{{view.jianMian === ''?'--':view.jianMian}}<i>平米</i></p>
          </el-col>
          <el-col :span="6">
            <p><span>底价：</span>{{view.diJia === ''?'--':view.diJia}}<i v-if="view.zuShou === '出售'">万元</i><i v-if="view.zuShou === '出租'">元/月</i></p>
          </el-col>
          <el-col :span="6">
            <p><span>楼层：</span>{{view.louCeng === ''?'--':view.louCeng}}层</p>
          </el-col>
          <el-col :span="6">
            <p><span>总层：</span>{{view.zongCeng === ''?'--':view.zongCeng}}层</p>
          </el-col>
        </el-row>
        <el-row :gutter="0" style="margin: 20px 0;">
          <el-col :span="6">
            <p><span>类型：</span>{{view.leiXing === ''?'--':view.leiXing}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>朝向：</span>{{view.chaoXiang === ''?'--':view.chaoXiang}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>装修：</span>{{view.zhuangXiu === ''?'--':view.zhuangXiu}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>来源：</span>{{view.laiYuan === ''?'--':view.laiYuan}}</p>
          </el-col>
        </el-row>
        <el-row :gutter="0" style="margin: 20px 0;">
          <el-col :span="6">
            <p><span>现状：</span>{{view.xianZhuang === ''?'--':view.xianZhuang}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>电梯：</span>{{view.dianTi === ''?'--':view.dianTi}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>几梯：</span>{{view.jiTi === ''?'--':view.jiTi}}梯</p>
          </el-col>
          <el-col :span="6">
            <p><span>几户：</span>{{view.jiHu === ''?'--':view.jiHu}}户</p>
          </el-col>
        </el-row>
        <el-row :gutter="0" style="margin: 20px 0;">
          <el-col :span="6">
            <p><span>添加时间：</span>{{view.addTime === ''?'--':view.addTime}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>更新时间：</span>{{view.updateTime === ''?'--':view.updateTime}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>最近跟进时间：</span>{{view.followTime === ''?'--':view.followTime}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>最近带看时间：</span>{{view.dkFromTime === ''?'--':view.dkFromTime}}</p>
          </el-col>
        </el-row>
        <!-- 售 -->
        <el-row :gutter="0" style="margin: 20px 0;" v-if="view.zuShou === '出售'">
          <el-col :span="6">
            <p><span>总价：</span>{{view.jiaGe === ''?'--':view.jiaGe}}<i>万元</i></p>
          </el-col>
          <el-col :span="6">
            <p><span>单价：</span>{{view.danJia === ''?'--':view.danJia}}<i>元/平米</i></p>
          </el-col>
          <el-col :span="6">
            <p><span>买进价：</span>{{view.maiJinJia === ''?'--':view.maiJinJia}}<i>万元</i></p>
          </el-col>
          <el-col :span="6">
            <p><span>付款方式：</span>{{view.shouFkType === ''?'--':view.shouFkType}}</p>
          </el-col>
        </el-row>
        <el-row :gutter="0" style="margin: 20px 0;" v-if="view.zuShou === '出售'">
          <el-col :span="6">
            <p><span>室内面积：</span>{{view.shiMian === ''?'--':view.shiMian}}<i>平米</i></p>
          </el-col>
          <el-col :span="6">
            <p><span>房本年限：</span>{{view.fangBenNx === ''?'--':view.fangBenNx}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>是否唯一：</span>{{view.weiYi === ''?'--':view.weiYi}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>建筑结构：</span>{{view.jianZhuJg === ''?'--':view.jianZhuJg}}</p>
          </el-col>
        </el-row>
        <el-row :gutter="0" style="margin: 20px 0;" v-if="view.zuShou === '出售'">
          <el-col :span="6">
            <p><span>产证日：</span>{{view.chanZhengRi === ''?'--':view.chanZhengRi}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>产权性质：</span>{{view.chanQuanXz === ''?'--':view.chanQuanXz}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>产权年限：</span>{{view.chanQuanNx === ''?'--':view.chanQuanNx}}年</p>
          </el-col>
          <el-col :span="6">
            <p><span>产证情况：</span>{{view.chanZheng === ''?'--':view.chanZheng}}</p>
          </el-col>
        </el-row>
        <el-row :gutter="0" style="margin: 20px 0;" v-if="view.zuShou === '出售'">
          <el-col :span="6">
            <p><span>建筑年代：</span>{{view.jianZhuNd === ''?'--':view.jianZhuNd}}年</p>
          </el-col>
          <el-col :span="6">
            <p><span>有无抵押：</span>{{view.diYa === ''?'--':view.diYa}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>契税票日期：</span>{{view.qiShuiRi === ''?'--':view.qiShuiRi}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>还款方式：</span>{{view.hkType === ''?'--':view.hkType}}</p>
          </el-col>
        </el-row>
        <!-- 租 -->
        <el-row :gutter="0" style="margin: 20px 0;" v-if="view.zuShou === '出租'">
          <el-col :span="6">
            <p><span>租金：</span>{{view.zuJin === ''?'--':view.zuJin}}<i>元/月</i></p>
          </el-col>
          <el-col :span="6">
            <p><span>付款方式：</span>{{view.zuFkType === ''?'--':view.zuFkType}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>出租方式：</span>{{view.chuZuType === ''?'--':view.chuZuType}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>最短租期：</span>{{view.zuQi === ''?'--':view.zuQi}}</p>
          </el-col>
        </el-row>
        <el-row :gutter="0" style="margin: 20px 0;" v-if="view.zuShou === '出租'">
          <el-col :span="6">
            <p><span>物业费：</span>{{view.wuYeFei === ''?'--':view.wuYeFei}}</p>
          </el-col>
          <el-col :span="18">
            <p><span>包含费用：</span><i v-for="item in view.feiYongMxs">{{view.feiYongMxs === []?'--':item}} </i></p>
          </el-col>
        </el-row>
        <!-- 备注 -->
        <el-row :gutter="0" style="margin: 20px 0;">
          <el-col :span="24">
            <p><span>备注信息：</span>{{view.beiZhu === ''?'--':view.beiZhu}}</p>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="detailsResidence-waptwo">
      <div class="detailsResidence-w-details">
        <div class="detailsResidence-wd-title clear">
          <p>跟 进</p>
          <div class="detailsResidence-wp-tabel">
            <el-table border=""  ref="multipleTable" :data="viewGJ" tooltip-effect="dark" style="width: 100%;text-align: center" :default-sort = "{prop: 'referencePrice', order: 'descending'}" highlight-current-row>
              <el-table-column header-align="center" align="center" type="index" label="序号" width="50"></el-table-column>
              <el-table-column header-align="center" align="center" show-overflow-tooltip prop="luRuRen" label="录入人"  width="150"></el-table-column>
              <el-table-column header-align="center" align="center" show-overflow-tooltip prop="addTime" label="跟进时间" width="200"></el-table-column>
              <el-table-column show-overflow-tooltip prop="neiRong" label="跟进内容"></el-table-column>
            </el-table>
            <v-Pagination :total="total" :current-page='current' :display='display' @pagechange="pagechange" class="clear"></v-Pagination>
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
    name: 'detailsResidence',
    components: {
      vPagination,
    },
    data(){
      return {
        // 业主信息
        isYzLook: true,
        fvId: '',
        lianXiShow: false,
        lianXiView: [],
        // 跟进
        genJinShow: false,
        textarea3: '',
        // 转移房源
        dialogFormVisible: false,
        liuOne: '',
        fromCommunityOne: '',
        ryIdOne: '',
        fyStateShow: false,
        fyState: '',
        // 客源状态
        fyStateData: [
          {
            value: '1',
            label: '有效'
          },
          {
            value: '2',
            label: '无效-暂缓'
          },
          {
            value: '3',
            label: '无效-内成交'
          },
          {
            value: '4',
            label: '无效-外成交'
          },
          {
            value: '5',
            label: '无效-信息错误'
          },
          {
            value: '6',
            label: '无效-其他'
          },
        ],
        view: [],
        viewGJ: [],
        picView: [],
        swiperShow: false,
        swiper: null,
        // img upload
        dialogImageUrl: '',
        dialogVisibleTwo: false,
        showAdminis: false,
        fileListOne: [], // 图片展示
        picLen: '',
        // isShow: true,
        deleteImgBt: '',
        bianJiFyBt: '',
        zhuanYiFyBt: '',
        youWuXiaoBt: '',
        gongPanBt: '',
        siPanBt: '',
        viewYeZhuBt: '',
        //        分页
        total: 0,     // 记录总条数
        display: 5,   // 每页显示条数
        current: 1,   // 当前的页数
      }
    },
    computed:{
      ...mapGetters ([
        'zzId',
        'zzEdit',
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
    },
    methods:{
      // 查看完了弹出跟进
      closeYZ (done) {
        this.lianXiShow = false
        this.genJinShow = true
        this.isYzLook = false
      },
      fyEditClk () {
        console.log(11111)
        this.$store.dispatch('set_zz_edit',true)
        this.$router.push('/addResidence')
      },
      // 跟进
      genJinShowClk () {
        this.genJinShow = true
        this.isYzLook = true
      },
      // 客户信息
      lianXiClk () {
        this.lianXiShow = true
        this.$post(/api/+'/yeZhu/list',{
          fyId: this.zzId,
        }).then(response => {
          console.log(response)
          if (response.data.status === 200) {
            this.lianXiView = response.data.data.yzList
            this.fvId = response.data.data.fvId
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },
      // 添加跟进
      genJinClk () {
        if (this.textarea3.length < 6) {
          this.$message.error('跟进内容不少于“6”个字符');
          return
        }
        this.$post(/api/+'/fyFollow/add',{
          fyId: this.zzId,
          fyType: '住宅',
          neiRong: this.textarea3,
          fvId: this.fvId,
        }).then(response => {
          console.log(response)
          if (response.data.status === 200) {
            this.$message({
                message: '添加跟进成功',
                type: 'success',
            });
            this.genJinShow = false
            this.textarea3 = ''
            this.genjinView ()
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },
      // 转移房源 搜索人员
      //@select="handleSelect"  是选中某一列触发的事件,在这里item为选中段字所在的对象
      //循环数据
      handleSelectOne(item) {
          // console.log(item.commId);
          this.fromCommunityOne = item.name
          this.ryIdOne = item.ryId
      },
      //queryString 为在框中输入的值
      //callback 回调函数,将处理好的数据推回
      querySearchAsyncOne(queryString, callback) {
          var list = [{}];
           //调用的后台接口
          // console.log(queryString)
          // console.log(callback)
          let _this = this
          var data = {
            key: this.liuOne,
          }
          this.$post(/api/+'/renYuan/renYuansNameLike',data).then((response)=>{
              //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
              // for(let i of response.data){
              //     i.value = i.communityName;  //将想要展示的数据作为value
              // }
              // list = response.data;
              // console.log(response)
              if (response.data.status === 200) {
                console.log(response)
                var obj = response.data.data
                for (var i = 0; i < obj.length; i++) {
                    obj[i].value = obj[i].name
                }
                list = obj;
                // console.log(list)
                if (obj.length === 0) {
                  this.$message.error('没有搜到经纪人');
                } else {
                  this.$message({
                      message: '搜索经纪人成功',
                      type: 'success',
                  });
                }
              } else {
                this.$message.error(data.message);
              }
              callback(list);
        }).catch((error)=>{
            console.log(error);
        });
      },
      // 转移房源
      transformAll () {
        if (this.liuOne === '') {
          this.$message.error('名字不能为空')
          return
        }
        console.log(this.ryIdOne,this.fromCommunityOne,this.zzid)
        this.$post(/api/+'/fangYuan/zhuZhai/updateLuRuRen',{
          ryId: this.ryIdOne,
          ryName: this.fromCommunityOne,
          fyIds: [this.zzId]
        }).then(response => {
          console.log(response)
          if (response.data.status === 200) {
            this.$message({
                message: '转移房源成功',
                type: 'success',
            });
            this.liuOne = ''
            this.ryIdOne = ''
            this.fromCommunityOne = ''
            this.detailsView ()
          } else {
            this.$message.error(response.data.msg);
          }
        })
        this.dialogFormVisible = false
      },
      // 设为公盘
      zhuanG () {
        this.$post(/api/+'/fangYuan/zhuZhai/updatePanBie',{
          panBie: '公盘',
          fyId: this.zzId,
        }).then(response => {
          if (response.data.status === 200) {
            // console.log(response)
            this.$message({
                message: '转为公盘成功',
                type: 'success',
            });
            this.detailsView ()
          } else {
            // console.log(response)
            this.$message.error(response.data.msg);
          }
        })
      },
      // 设为私盘
      zhuanS () {
        this.$post(/api/+'/fangYuan/zhuZhai/updatePanBie',{
          panBie: '私盘',
          fyId: this.zzId,
        }).then(response => {
          if (response.data.status === 200) {
            // console.log(response)
            this.$message({
                message: '转为私盘成功',
                type: 'success',
            });
            this.detailsView ()
          } else {
            // console.log(response)
            this.$message.error(response.data.msg);
          }
        })
      },
      // 更改客源状态
      fyStateClk () {
        console.log(this.fyState)
        this.$post(/api/+'/fangYuan/zhuZhai/updateState',{
          fyId: this.zzId,
          fyState: this.fyState,
        }).then(response => {
          console.log(response)
          if (response.data.status === 200) {
            this.$message({
                message: '修改成功',
                type: 'success',
            });
            this.detailsView ()
            this.fyStateShow = false
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },
      // clkDoor () {
      //   this.isShow = !this.isShow
      //   this.$post(/api/+'/fyView/add',{
      //     fyId: this.zzId,
      //     targetType: '门牌号',
      //   }).then(response => {
      //     // console.log(response)
      //     if (response.data.status === 200) {
      //       console.log(response)
      //       this.fvId = response.data.fvId
      //       this.genJinShow = true
      //       this.isYzLook = false
      //     } else {
      //       this.$message.error(response.data.msg);
      //     }
      //   })
      // },
      adminPic () {
        this.showAdminis = !this.showAdminis
        this.imagesViewTwo ()
      },
      detailsView () {
        this.$post(/api/+'/fangYuan/zhuZhai/detail',{
          fyId: this.zzId,
        }).then(response => {
          this.genjinView ()
          // console.log(response.data.data.moreButton.deleteImgBt)
          if (response.data.status === 200) {
            this.deleteImgBt = response.data.data.moreButton.deleteImgBt
            this.bianJiFyBt = response.data.data.moreButton.bianJiFyBt
            this.zhuanYiFyBt = response.data.data.moreButton.zhuanYiFyBt
            this.youWuXiaoBt = response.data.data.moreButton.youWuXiaoBt
            this.gongPanBt = response.data.data.moreButton.gongPanBt
            this.siPanBt = response.data.data.moreButton.siPanBt
            this.viewYeZhuBt = response.data.data.moreButton.viewYeZhuBt

            this.view = response.data.data
            this.fyState = response.data.data.fyState
            this.imagesView ()
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },
      // 跟进列表
      genjinView () {
        console.log(Number(this.display),Number(this.current))
        this.$post(/api/+'/fyFollow/list',{
          fyId: this.zzId,
          fyType: '住宅',
          page:{
            pageSize: Number(this.display),
            pageNum: Number(this.current),
          },
        }).then(response => {
          // console.log(response)
          if (response.data.status === 200) {
            this.viewGJ = response.data.data.list
            this.total = response.data.data.total
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },
      //     分页
      pagechange:function(currentPage){
        console.log(this.current);
        this.current = currentPage
        this.genjinView ()
        // ajax请求, 向后台发送 currentPage, 来获取对应的数据
      },
      imagesView () {
        this.$post(/api/+'/search/resource',{
          subject: '房源',
          subjectId: this.zzId,
        }).then(response => {
          if (response.data.status === 200) {
            // console.log(response.data.data.length)
            this.picView = response.data.data
            if (response.data.data === []) {
              this.picLen = 0
            } else {
              this.picLen = response.data.data.length
            }
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },
      imagesViewTwo () {
        this.$post(/api/+'/search/resource',{
          subject: '房源',
          subjectId: this.zzId,
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
        if (this.deleteImgBt === false) {
          this.$message.error('您没有权限操作此图片');
          this.fileListOne = []
          this.imagesViewTwo ()
        } else {
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
            this.fileListOne = []
            this.imagesViewTwo ()
            _this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisibleTwo = true;
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
        this.$store.dispatch('set_xq_id',this.zzId)
        this.$router.push('/building')
      }
    },
    created(){
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
  @import '../../../../assets/mixin.scss';
  #detailsResidence{
    width: 100%;
    .detailsResidence-wapone{
      width: 100%;
      padding: 40px;
      background: #fff;
      border-radius: 10px;
      box-sizing: border-box;
      box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.24);
      .detailsResidence-w-title{
        width: 100%;
        padding-bottom: 20px;
        border-bottom: 1px solid #efefef;
        .detailsResidence-wt-left{
          width: 120px;
          height: 120px;
          border-radius: 20px;
          overflow: hidden;
          float: left;
          position: relative;
          img{
            width: 100%;
            @include center
          }
          .detailsResidence-wtl-zi{
            position: absolute;
            bottom: 5px;
            left: 50%;
            transform: translateX(-50%);
            @include sc(16px,#fff);
            font-weight: 600;
          }
        }
        .detailsResidence-wt-liangxi{
          margin-top: 30px;
          margin-left: 30%;
          p{
            margin-bottom: 10px;
            @include sc(18px,#333);
            span{
              @include sc(16px,#666);
            }
          }
        }
        .detailsResidence-wt-liangxiOne{
          margin-top: 30px;
          margin-left: 30%;
          margin-bottom: 10px;
          @include sc(18px,#333);
          span{
            @include sc(16px,#666);
          }
        }
        .detailsResidence-wt-right{
          float: left;
          margin-left: 40px;
          p:nth-child(1){
            @include sc(26px,#333);
            margin-top: 10px;
          }
          p:nth-child(2){
            @include sc(14px,#666);
            margin-top: 15px;
            span{
              padding: 2px 5px;
              margin-right: 5px;
              background: #f3f5d6;
              color: #bf8600;
            }
            span:nth-child(1){
              background: #dbf5d6;
              color: #1fbf00;
            }
            span:nth-child(2){
              background: #e1f7ff;
              color: #0091bf;
            }
            span:nth-child(3){
              background: #e8eaff;
              color: #552ab9;
            }
          }
          p:nth-child(3){
            @include sc(20px,#333);
            margin-top: 25px;
          }
        }
      }
      .detailsResidence-w-pic{
        width: 100%;
        padding: 20px 0;
        border-bottom: 1px solid #efefef;
        .detailsResidence-wp-title{
          width: 100%;
          p:nth-child(1){
            @include sc(28px,#449BE1);
            float: left;
            margin-bottom: 20px;
            span{
              @include sc(16px,#999)
            }
          }
          p:nth-child(2){
            @include sc(20px,#449BE1);
            float: right;
            cursor: pointer;
            margin-bottom: 20px;
          }
        }
        .detailsResidence-wp-heibei{
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 9;
          background: rgba(8, 26, 36, 0.6);
          .detailsResidence-wph-nav{
            width: 800px;
            padding: 40px;
            background: #fff;
            margin: 100px auto;
            border-radius: 10px;
            .detailsResidence-wphn-title{
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
            .detailsResidence-wphn-pic{
              width: 100%;
              max-height: 500px;
              overflow-x: hidden;
            }
          }
        }
        .detailsResidence-wp-swiper{
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
      .detailsResidence-w-describe{
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
      .detailsResidence-w-details{
        .detailsResidence-wd-title{
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
            @include sc(20px,#999);
          }
        }
      }
    }
    .detailsResidence-waptwo{
      width: 100%;
      padding: 40px;
      margin-top: 15px;
      background: #fff;
      border-radius: 10px;
      box-sizing: border-box;
      box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.24);
      .detailsResidence-w-details{
        .detailsResidence-wd-title{
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
      }
    }
  }
</style>
<style type="text/css">
  #detailsResidence .el-dialog{
    margin: 180px auto 0 !important;
  }
</style>