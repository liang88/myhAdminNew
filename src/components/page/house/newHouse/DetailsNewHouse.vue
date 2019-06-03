<template>
  <div id="detailsResidence">
    <div class="detailsResidence-wapone">
      <div class="detailsResidence-w-title clear">
        <div class="detailsResidence-wt-left">
          <img src="static/images/zhuzhai.png" alt="">
          <!-- <p class="detailsResidence-wtl-zi">{{view.bianHao}}</p> -->
        </div>
        <div class="detailsResidence-wt-right">
          <p style="cursor: pointer;" @click="clkXqName">{{view.xqName}} <span style="font-size: 18px;">{{view.province}}{{view.city}}{{view.area}}</span></p>
          <p>
            <span>{{view.xfState}}</span>
            <span v-for="item in view.maiDians">{{item}}</span>
          </p>
          <p><span v-if="view.shi !== ''" v-for="item in view.shis">{{item}} </span></p>
        </div>
        <el-dropdown trigger="click" style="float:right;" v-if="view.moreBt">
          <el-button type="primary">
            更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><p @click="genJinShow = true">房源跟进</p></el-dropdown-item>
            <el-dropdown-item><p @click="clkEdit">编辑房源</p></el-dropdown-item>
            <el-dropdown-item><p @click="deleteRow">删除房源</p></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 跟进 -->
        <el-dialog title="写跟进" :visible.sync="genJinShow" center width=30% :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 10}"
            placeholder="请输入内容"
            v-model="textarea3">
          </el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="genJinShow = false">取 消</el-button>
            <el-button type="primary" @click="genJinClk">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="detailsResidence-w-details">
        <div class="detailsResidence-wd-title clear">
          <p>信 息</p>
        </div>
        <el-row :gutter="0" style="margin: 0 0 20px 0;">
          <el-col :span="6">
            <p><span>均价：</span>{{view.junJia === ''?'--':view.junJia}}<i>元/㎡</i></p>
          </el-col>
          <el-col :span="6">
            <p><span>面积：</span>{{view.mianJiXiao === ''?'--':view.mianJiXiao}}㎡ ~ {{view.mianJiDa === ''?'--':view.mianJiDa}}㎡</p>
          </el-col>
          <el-col :span="6">
            <p><span>机构名称：</span>{{view.jgName === ''?'--':view.jgName}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>装修：</span>{{view.zhuangXiu === ''?'--':view.zhuangXiu}}</p>
          </el-col>
        </el-row>
        <el-row :gutter="0" style="margin: 20px 0;">
          <el-col :span="6">
            <p><span>开盘日：</span>{{view.kaiPanRiStr === ''?'--':view.kaiPanRiStr}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>交房日：</span>{{view.jiaoFangRiStr === ''?'--':view.jiaoFangRiStr}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>添加时间：</span>{{view.addTimeStr === ''?'--':view.addTimeStr}}</p>
          </el-col>
        </el-row>
        <!-- 备注 -->
        <el-row :gutter="0" style="margin: 20px 0;">
          <el-col :span="24">
            <p><span>优惠：</span>{{view.youHui === ''?'--':view.youHui}}</p>
          </el-col>
        </el-row>
        <el-row :gutter="0" style="margin: 20px 0;">
          <el-col :span="24">
            <p><span>佣金：</span>{{view.yongJin === ''?'--':view.yongJin}}</p>
          </el-col>
        </el-row>
        <el-row :gutter="0" style="margin: 20px 0;">
          <el-col :span="24">
            <p><span>说明：</span>{{view.shuoMing === ''?'--':view.shuoMing}}</p>
          </el-col>
        </el-row>
        <el-row :gutter="0" style="margin: 20px 0;">
          <el-col :span="24">
            <p><span>备注：</span>{{view.beiZhu === ''?'--':view.beiZhu}}</p>
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
              <el-table-column header-align="center" align="center" show-overflow-tooltip prop="addTimeStr" label="跟进时间" width="200"></el-table-column>
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
        xqId: '',
        // 跟进
        genJinShow: false,
        textarea3: '',

        view: [],
        viewGJ: [],
        picView: [],
        swiperShow: false,
        swiper: null,
        //        分页
        total: 0,     // 记录总条数
        display: 5,   // 每页显示条数
        current: 1,   // 当前的页数
      }
    },
    computed:{
      ...mapGetters ([
        'xfId',
        'xfEdit',
      ])
    },
    mounted () {
      this.detailsView ()
    },
    methods:{
      // 跳转小区详情
      clkXqName () {
        this.$store.dispatch('set_xq_id',this.xqId)
        this.$store.dispatch('set_xf_or_xq',true)
        this.$router.push('/detailsVillage')
      },
      // 编辑新房
      clkEdit () {
        // this.$store.dispatch('set_xf_id',this.xfId)
        this.$store.dispatch('set_xf_edit',true)
        this.$router.push('/addNewHouse')
      },
      // 添加跟进
      genJinClk () {
        if (this.textarea3.length < 6) {
          this.$message.error('跟进内容不少于“6”个字符');
          return
        }
        this.$post(/api/+'/xfFollow/add',{
          xfId: this.xfId,
          neiRong: this.textarea3,
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
      //      删除
      deleteRow() {
        // console.log(index, rows)
        // console.log(index, rows[index].xfId)
        this.$confirm('确定删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$post(/api/+'/xinFang/delete',{
            xfId: this.xfId,
          }).then(response => {
            // console.log(response)
            if (response.data.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.$router.push('/listNewHouse')
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
      detailsView () {
        this.$post(/api/+'/xinFang/detail',{
          xfId: this.xfId,
        }).then(response => {
          this.genjinView ()
          console.log(response.data.data.moreBt)
          if (response.data.status === 200) {
            this.view = response.data.data
            this.xqId = response.data.data.xqId
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },
      // 跟进列表
      genjinView () {
        console.log(Number(this.display),Number(this.current))
        this.$post(/api/+'/xfFollow/list',{
          xfId: this.xfId,
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
              background: #e1f7ff;
              color: #0091bf;
            }
            span:nth-child(1){
              background: #dbf5d6;
              color: #1fbf00;
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