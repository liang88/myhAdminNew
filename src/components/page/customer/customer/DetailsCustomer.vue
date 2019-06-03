<template>
  <div id="detailsCustomer">
    <div class="detailsCustomer-wapone">
      <div class="detailsCustomer-w-title clear">
        <el-row :gutter="2">
          <el-col :span="5">
            <p class="detailsCustomer-wt-p1">{{viewData.name}}</p>
            <p class="detailsCustomer-wt-p2">{{viewData.bianHao}}、{{viewData.dengJi}}类</p>
          </el-col>
          <el-col :span="12">
            &nbsp;
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-phone-outline" style="width: 100%" @click="lianXiClk">联系</el-button>
            <el-dialog
              title="客户信息"
              :visible.sync="lianXiShow"
              width="40%"
              center
              :close-on-click-modal="false" :close-on-press-escape="false">
              <div class="detailsCustomer-wt-liangxi">
                <p><span>客户称呼 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>{{lianXiView.name}}</p>
                <p><span>联系方式 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>{{lianXiView.phone}}</p>
                <p v-if="lianXiView.phoneTwo !== ''"><span>联系方式 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>{{lianXiView.phoneTwo}}</p>
                <p v-else></p>
              </div>
            </el-dialog>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-edit" style="width: 100%" @click="genJinShow = true">跟进</el-button>
            <el-dialog title="写跟进" :visible.sync="genJinShow" :close-on-click-modal="false" :close-on-press-escape="false">
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
          </el-col>
          <el-col :span="3">
            <el-dropdown trigger="click">
              <el-button type="primary">
                更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><p @click="kyStateShow = true">客源状态</p></el-dropdown-item>
                <el-dropdown-item><p @click="kyEditClk">编辑客源</p></el-dropdown-item>
                <el-dropdown-item><p @click="kyDel">删除客源</p></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dialog title="客源状态" :visible.sync="kyStateShow" center width=30% :close-on-click-modal="false" :close-on-press-escape="false">
              <el-form :model="form">
                <el-form-item label="客源状态" label-width="120">
                  <el-select v-model="kyState" placeholder="请选择客源状态" >
                    <el-option v-for="item in kyStateData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="kyStateShow = false">取 消</el-button>
                <el-button type="primary" @click="kyStateClk">确 定</el-button>
              </div>
            </el-dialog>
          </el-col>
        </el-row>
        <el-row :gutter="2" style="background: #f7f7f7; margin-top: 20px;">
          <el-col :span="24">
            <p class="detailsCustomer-wt-p3">{{viewData.kyType}} {{viewData.kyType === '求购' ? viewData.zongJiaDi : viewData.zuJiaDi}} - {{viewData.kyType === '求购' ? viewData.zongJiaGao : viewData.zuJiaGao}}<span v-if="viewData.kyType === '求购'">万元，</span><span v-else>元/月，</span>{{viewData.mianJiXiao}} - {{viewData.mianJiDa}}<span>㎡</span> 的{{viewData.leiXing}}</p>
            <p class="detailsCustomer-wt-p3">{{viewData.beiZhu}}</p>
          </el-col>
        </el-row>
      </div>
      <div class="detailsCustomer-w-pic">
        <div class="detailsCustomer-wp-title clear">
          <p>需 求</p>
          <!-- <p @click="adminPic">管理</p> -->
        </div>
        <div class="detailsCustomer-wp-nav">
          <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :span="6">
              <p class="detailsCustomer-wpn-p1">区域</p>
              <p class="detailsCustomer-wpn-p2">{{viewData.quYu}}</p>
            </el-col>
            <el-col :span="6">
              <p class="detailsCustomer-wpn-p1">商圈</p>
              <p class="detailsCustomer-wpn-p2">{{viewData.shangQuan}}</p>
            </el-col>
            <el-col :span="6">
              <p class="detailsCustomer-wpn-p1">小区</p>
              <p class="detailsCustomer-wpn-p2"><span v-for="item in viewData.xiaoQus">{{item}}、</span></p>
            </el-col>
            <el-col :span="6">
              <p class="detailsCustomer-wpn-p1">户型</p>
              <p class="detailsCustomer-wpn-p2">{{viewData.shiXiao}} - {{viewData.shiDa}} 室</p>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :span="6">
              <p class="detailsCustomer-wpn-p1">面积</p>
              <p class="detailsCustomer-wpn-p2">{{viewData.mianJiXiao}} - {{viewData.mianJiDa}} ㎡</p>
            </el-col>
            <el-col :span="6">
              <p class="detailsCustomer-wpn-p1">总价</p>
              <p class="detailsCustomer-wpn-p2">{{viewData.kyType === '求购' ? viewData.zongJiaDi : viewData.zuJiaDi}} - {{viewData.kyType === '求购' ? viewData.zongJiaGao : viewData.zuJiaGao}}<span v-if="viewData.kyType === '求购'"> 万元</span><span v-else> 元/月</span></p>
            </el-col>
            <el-col :span="6">
              <p class="detailsCustomer-wpn-p1">类型</p>
              <p class="detailsCustomer-wpn-p2">{{viewData.leiXing}}</p>
            </el-col>
            <el-col :span="6">
              <p class="detailsCustomer-wpn-p1">装修</p>
              <p class="detailsCustomer-wpn-p2"><span v-for="item in viewData.zhuangXius">{{item}} </span></p>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :span="6">
              <p class="detailsCustomer-wpn-p1">楼层</p>
              <p class="detailsCustomer-wpn-p2">{{viewData.louCengDi}} - {{viewData.louCengGao}} 层</p>
            </el-col>
            <el-col :span="6">
              <p class="detailsCustomer-wpn-p1">目的</p>
              <p class="detailsCustomer-wpn-p2">{{viewData.muDi}}</p>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="detailsCustomer-wapTwo">
      <div class="detailsCustomer-w-pic">
        <div class="detailsCustomer-wp-title clear">
          <p>跟 进</p>
        </div>
        <div class="detailsCustomer-wp-tabel">
          <el-table border=""  ref="multipleTable" :data="view" tooltip-effect="dark" style="width: 100%;text-align: center" :default-sort = "{prop: 'referencePrice', order: 'descending'}" highlight-current-row>
            <el-table-column header-align="center" align="center" type="index" label="序号" width="50"></el-table-column>
            <el-table-column header-align="center" align="center" show-overflow-tooltip prop="luRuRen" label="录入人"  width="150"></el-table-column>
            <el-table-column header-align="center" align="center" show-overflow-tooltip prop="addTime" label="跟进时间" width="200"></el-table-column>
            <el-table-column header-align="center" align="center" show-overflow-tooltip prop="neiRong" label="跟进内容"></el-table-column>
          </el-table>
          <v-Pagination :total="total" :current-page='current' :display='display' @pagechange="pagechange" class="clear"></v-Pagination>
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
    name: 'detailsCustomer',
    components: {
      vPagination,
    },
    data(){
      return {
        viewData: [],
        view: [],
        lianXiView: [],
        lianXiShow: false,
        genJinShow: false,
        kyStateShow: false,
        textarea3: '',
        form: {

        },
        kyState: '', // 客源状态
        // 客源状态
        kyStateData: [
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
        //        分页
        total: 0,     // 记录总条数
        display: 5,   // 每页显示条数
        current: 1,   // 当前的页数
      }
    },
    computed:{
      ...mapGetters ([
        'kyId',
        'kyEdit',
      ])
    },
    mounted () {
      this.customerView ()
    },
    methods:{
      kyEditClk () {
        this.$store.dispatch('set_ky_edit',true)
        this.$router.push('/addCustomer')
      },
      kyDel () {
        this.$confirm('此操作将永久删除该客源, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$post(/api/+'/keYuan/delete',{
            kyId: this.kyId
          }).then(response => {
            if (response.data.status === 200) {
              this.$message({
                  message: '删除成功',
                  type: 'success',
              });
              this.$router.push('/listCustomer')
            } else {
              this.$message.error(response.data.msg)
            }
          })
        }).catch(() => {
          this.fileListOne = []
          this.imagesViewTwo ()
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 客户信息
      lianXiClk () {
        this.lianXiShow = true
        this.$post(/api/+'/keYuan/viewPhone',{
          kyId: this.kyId,
        }).then(response => {
          console.log(response)
          if (response.data.status === 200) {
            this.lianXiView = response.data.data
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
        this.$post(/api/+'/kyFollow/add',{
          kyId: this.kyId,
          neiRong: this.textarea3
        }).then(response => {
          console.log(response)
          if (response.data.status === 200) {
            this.$message({
                message: '添加跟进成功',
                type: 'success',
            });
            this.genJinShow = false
            this.textarea3 = ''
            this.customerView ()
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },
      // 客源详情
      customerView () {
        this.$post(/api/+'/keYuan/detail',{
          kyId: this.kyId,
        }).then(response => {
          console.log(response)
          if (response.data.status === 200) {
            this.viewData = response.data.data
            this.kyState = response.data.data.kyState
            this.genjinView ()
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },
      // 跟进列表
      genjinView () {
        console.log(Number(this.display),Number(this.current))
        this.$post(/api/+'/kyFollow/list',{
          kyId: this.kyId,
          page:{
            pageSize: Number(this.display),
            pageNum: Number(this.current),
          },
        }).then(response => {
          console.log(response)
          if (response.data.status === 200) {
            this.view = response.data.data.list
            this.total = response.data.data.total
          } else {
            this.$message.error(response.data.msg);
          }
        })
      },
      // 更改客源状态
      kyStateClk () {
        console.log(this.kyState)
        this.$post(/api/+'/keYuan/updateKyState',{
          kyId: this.kyId,
          kyState: this.kyState,
        }).then(response => {
          console.log(response)
          if (response.data.status === 200) {
            this.$message({
                message: '修改成功',
                type: 'success',
            });
            this.customerView ()
            this.kyStateShow = false
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
  #detailsCustomer{
    width: 100%;
    .detailsCustomer-wapone{
      width: 100%;
      padding: 40px;
      background: #fff;
      border-radius: 10px;
      box-sizing: border-box;
      box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.24);
      .detailsCustomer-w-title{
        width: 100%;
        padding-bottom: 20px;
        border-bottom: 1px solid #efefef;
        .detailsCustomer-wt-p1{
          @include sc(30px,#333)
        }
        .detailsCustomer-wt-p2{
          @include sc(16px,#999);
          margin-top: 10px;
        }
        .detailsCustomer-wt-p3{
          @include sc(18px,#333);
          margin: 10px;
          line-height: 22px;
          text-align: justify;
          word-wrap:break-word;
        }
        .detailsCustomer-wt-liangxi{
          @include center;
          margin-top: 30px;
          p{
            margin-bottom: 10px;
            @include sc(18px,#333);
            span{
              @include sc(16px,#666);
            }
          }
        }
      }
      .detailsCustomer-w-pic{
        width: 100%;
        padding: 20px 0;
        .detailsCustomer-wp-title{
          width: 100%;
          p:nth-child(1){
            @include sc(26px,#449BE1);
            float: left;
            span{
              @include sc(16px,#666)
            }
          }
        }
        .detailsCustomer-wp-nav{
          width: 100%;
          .detailsCustomer-wpn-p1{
            @include sc(14px,#888);
          }
          .detailsCustomer-wpn-p2{
            @include sc(16px,#333);
            margin-top: 10px;
          }
        }
      }
    }
    .detailsCustomer-wapTwo{
      width: 100%;
      padding: 40px;
      background: #fff;
      border-radius: 10px;
      box-sizing: border-box;
      box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.24);
      margin-top: 15px;
      .detailsCustomer-w-pic{
        width: 100%;
        .detailsCustomer-wp-title{
          width: 100%;
          p:nth-child(1){
            @include sc(26px,#449BE1);
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
        .detailsCustomer-wp-tabel{
          width: 100%;
        }
      }
    }
  }
</style>
<style type="text/css">
  #detailsCustomer .el-dialog--center .el-dialog__body{
    height: 70px !important;
  }
</style>