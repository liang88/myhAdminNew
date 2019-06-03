<template>
  <div id="listVillage">
    <div class="listVillage-wap">
      <div class="listVillage-w-content clear">
       <!--  <div class="listVillage-wc-but">
          <img src="static/images/add.png" alt="">
          <span>添加</span>
        </div> -->
        <div class="listVillage-wc-but" @click="refresh">
          <img src="static/images/ref.png" alt="">
          <span>刷新</span>
        </div>
        <div class="listVillage-wc-but" @click="dialogFormVisible = true" style="padding-left: 30px;">
          <i class="el-icon-sort"></i>
          <span>客源转移</span>
        </div>
        <div class="listVillage-wc-search" @click="clkSearch">
          <img src="static/images/search.png" alt="">
        </div>
        <div class="listVillage-wc-inp">
          <el-input v-model="inputSearch" placeholder="客户/电话/编号"></el-input>
        </div>
        <div class="listVillage-wc-select">
          <template>
            <el-select v-model="search" placeholder="请选择">
              <el-option v-for="item in searchData" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </template>
        </div>
      </div>
      <div class="listVillage-input">
        <el-row :gutter="20" style="margin-bottom: 30px;">
          <el-col :span="2">
            <el-tooltip class="item" effect="dark" content="客源类型" placement="top">
              <p class="listVillage-i-title">客源类型 :</p>
            </el-tooltip>
          </el-col>
          <el-col :span="10">
            <template>
              <el-radio-group v-model="resource">
                <el-radio border label="求购"></el-radio>
                <el-radio border label="求租"></el-radio>
              </el-radio-group>
            </template>
          </el-col>
          <el-col :span="10">
            &nbsp;
          </el-col>
          <el-col :span="2">
            <el-button type="primary" style="width: 100%;" @click="clkCcreen">筛选</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom: 30px;">
          <el-col :span="2">
            <p class="listVillage-i-title">户型 :</p>
          </el-col>
          <el-col :span="2">
            <el-input v-model="minHome" placeholder="最小值"></el-input>
          </el-col>
          <el-col :span="1" style="line-height: 38px;text-align: center;">
            ——
          </el-col>
          <el-col :span="2">
            <el-input v-model="maxHome" placeholder="最大值"></el-input>
          </el-col>
          <el-col :span="1">
            <p class="listVillage-i-title" style="text-align: left;">室</p>
          </el-col>
          <el-col :span="2">
            <p class="listVillage-i-title">面积 :</p>
          </el-col>
          <el-col :span="2">
            <el-input v-model="minAcreage" placeholder="最小值"></el-input>
          </el-col>
          <el-col :span="1" style="line-height: 38px;text-align: center;">
            ——
          </el-col>
          <el-col :span="2">
            <el-input v-model="maxAcreage" placeholder="最大值"></el-input>
          </el-col>
          <el-col :span="1">
            <p class="listVillage-i-title" style="text-align: left;">㎡</p>
          </el-col>
          <el-col :span="2">
            <p class="listVillage-i-title">价格 :</p>
          </el-col>
          <el-col :span="2">
            <el-input v-model="minPrice" placeholder="最小值"></el-input>
          </el-col>
          <el-col :span="1" style="line-height: 38px;text-align: center;">
            ——
          </el-col>
          <el-col :span="2">
            <el-input v-model="maxPrice" placeholder="最大值"></el-input>
          </el-col>
          <el-col :span="1">
            <p class="listVillage-i-title" style="text-align: left;" v-if="resource === '求购'">万元</p>
            <p class="listVillage-i-title" style="text-align: left;" v-else-if="resource === '求租'">元/月</p>
            <p class="listVillage-i-title" style="text-align: left;" v-else>——</p>
          </el-col>
        </el-row>
        <div class="listVIllage-wc-wap">
          <el-collapse @change="handleChange">
            <el-collapse-item>
              <template slot="title">
                <div class="listVIllage-wcw-title">
                  <div>
                    <p>更多<img :class="{listVIllage_wcwt_img:addImgClass === 1}" src="static/images/shuangjt.png" alt=""></p>
                  </div>
                </div>
              </template>
              <el-row :gutter="20" style="margin-bottom: 30px;">
                <el-col :span="2">
                  <p class="listVillage-i-title">区/县 :</p>
                </el-col>
                <el-col :span="5">
                  <template>
                    <el-select v-model="area.area" @focus="selectArea" @change="selectQu" placeholder="请选择区/县" >
                      <el-option v-for="item in area" :value="item.areaCode" :label="item.area"></el-option>
                    </el-select>
                  </template>
                </el-col>
                <el-col :span="1">
                  &nbsp;
                </el-col>
                <el-col :span="2">
                  <p class="listVillage-i-title">商圈 :</p>
                </el-col>
                <el-col :span="5">
                  <template>
                    <el-select v-model="shangquan.sqName" @change="selectQuan" placeholder="请选择商圈" >
                      <el-option v-for="item in shangquan" :value="item.sqId" :label="item.sqName"></el-option>
                    </el-select>
                  </template>
                </el-col>
                <el-col :span="1">
                  &nbsp;
                </el-col>
                <el-col :span="2">
                  <p class="listVillage-i-title">小区 :</p>
                </el-col>
                <el-col :span="5">
                  <template>
                    <el-autocomplete
                        v-model="liu"
                        :fetch-suggestions="querySearchAsyncTwo"
                        @select="handleSelectTwo"
                        placeholder="请输入关键字"
                    >
                    </el-autocomplete>
                  </template>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-bottom: 30px;">
                <el-col :span="2">
                  <p class="listVillage-i-title">等级 :</p>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="level" placeholder="请选择等级" >
                    <el-option v-for="item in levelData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="1">
                  &nbsp;
                </el-col>
                <el-col :span="2">
                  <p class="listVillage-i-title">类型 :</p>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="homeType" placeholder="请选择类型" >
                    <el-option v-for="item in homeTypeData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="1">
                  &nbsp;
                </el-col>
                <el-col :span="2">
                  <p class="listVillage-i-title">装修 :</p>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="zhuangX" placeholder="请选择装修" >
                    <el-option v-for="item in zhuangXData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-bottom: 30px;">
                <el-col :span="2">
                  <el-tooltip class="item" effect="dark" content="录入时间" placement="top">
                    <p class="listVillage-i-title">录入时间 :</p>
                  </el-tooltip>
                </el-col>
                <el-col :span="5">
                  <el-date-picker
                    v-model="startTime"
                    type="date"
                    placeholder="起始录入时间"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-col>
                <el-col :span="1">
                  &nbsp;
                </el-col>
                <el-col :span="2">
                  <el-tooltip class="item" effect="dark" content="录入时间" placement="top">
                    <p class="listVillage-i-title">录入时间 :</p>
                  </el-tooltip>
                </el-col>
                <el-col :span="5">
                  <el-date-picker
                    v-model="endTime"
                    type="date"
                    placeholder="结束录入时间"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-col>
                <el-col :span="1">
                  &nbsp;
                </el-col>
                <el-col :span="2">
                  <p class="listVillage-i-title">楼层 :</p>
                </el-col>
                <el-col :span="2">
                  <el-input v-model="minLouceng" placeholder="最小值"></el-input>
                </el-col>
                <el-col :span="1" style="line-height: 38px;text-align: center;">
                  ——
                </el-col>
                <el-col :span="2">
                  <el-input v-model="maxLouceng" placeholder="最大值"></el-input>
                </el-col>
                <el-col :span="1">
                  <p class="listVillage-i-title" style="text-align: left;">层</p>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-bottom: 30px;">
                <el-col :span="2">
                  <p class="listVillage-i-title">门店 :</p>
                </el-col>
                <el-col :span="5">
                  <el-select
                    v-model="menDian"
                    multiple
                    collapse-tags
                    placeholder="请选择门店(可多选)"
                    @focus="selectMenDian"
                    @change="selectRen"
                    @remove-tag="removeTag">
                    <el-option
                      v-for="item in menDianData"
                      :key="item.mdId"
                      :label="item.mdName"
                      :value="item.mdId">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="1">
                  &nbsp;
                </el-col>
                <el-col :span="2">
                  <p class="listVillage-i-title">录入人 :</p>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="ren" @change="changeRen" placeholder="录入人 (请先选择门店)" >
                    <el-option v-for="item in renData" :value="item.ryId" :label="item.name"></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
    <div class="listVillage-table">
      <div>
        <el-table border=""  ref="multipleTable" :data="view" tooltip-effect="dark" style="width: 100%;text-align: center" :header-cell-style="tableHeaderColor" @selection-change="handleSelectionChange" :default-sort = "{prop: 'referencePrice', order: 'descending'}" highlight-current-row>
          <!-- <el-table-column header-align="center" align="center" type="selection" fixed="left" ></el-table-column> -->
          <el-table-column header-align="center" align="center" type="selection" fixed="left" ></el-table-column>
          <el-table-column header-align="center" align="center" type="index" label="序号" width="50"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="kyType" label="客源类型" ></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="name" label="客源姓名"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="dengJi" label="客源等级"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="quYu" label="区域"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="shangQuan" label="商圈"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="xiaoQu" label="小区"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="" label="户型（室）">
            <template slot-scope="scope">
              {{ scope.row.shiXiao }} - {{ scope.row.shiDa }}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="" label="价格">
            <template slot-scope="scope">
              {{ scope.row.jiaGeDi }} - {{ scope.row.jiaGeGao }}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="" label="面积">
            <template slot-scope="scope">
              {{ scope.row.mianJiXiao }} - {{ scope.row.mianJiDa }}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="addTime" width="200" label="录入时间"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip  prop="propertyConsultant" label="操作 " fixed="right"  class="list-tem-button">
            <template slot-scope="scope">
<!--            <el-button
                @click.native.prevent="editor(scope.$index, view)"
                type="text">
                编辑
              </el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.$index, view)"
                type="text">
                删除
              </el-button> -->
              <el-button
                @click.native.prevent="look(scope.$index, view)"
                type="text">
                查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="客源转移" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false">
          <p style="font-size: 16px;margin-bottom: 20px;">搜索客源名称</p>
          <el-autocomplete
              v-model="liuOne"
              :fetch-suggestions="querySearchAsyncOne"
              @select="handleSelectOne"
              placeholder="请输入关键字"
          >
          </el-autocomplete>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="transformAll">确 定</el-button>
          </div>
        </el-dialog>
        <v-Pagination :total="total" :current-page='current'  @pagechange="pagechange" class="clear"></v-Pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import vPagination from '../../../common/Pagination.vue';
  import {setCookie, getCookie} from '../../../../util/cookie.js'
  export default {
    name: 'index',
    components: {
      vPagination,
    },
    data(){
      return {
        dialogFormVisible: false,
        formLabelWidth: '120px',
        resource: '求购', // 类型
        minHome: '',
        maxHome: '',
        minAcreage: '',
        maxAcreage: '',
        minPrice: '',
        maxPrice: '',
        area: [], // 区数据
        quUse: '', // 选中区
        shangquan: [], // 区数据
        quanUse: '', // 选中区
        addImgClass: 0,
        liu: '',
        liuOne: '',
        fromCommunityTwo: '',
        fromCommunityOne: '',
        ryIdOne: '',
        level: '',
        homeType: '',
        zhuangX: '',
        startTime: '',
        endTime: '',
        minLouceng: '',
        maxLouceng: '',
        menDianData: [],
        menDian: [],
        renData: [],
        ren: '',
        view: [],
        //        分页
        total: 0,     // 记录总条数
        display: 10,   // 每页显示条数
        current: 1,   // 当前的页数
        multipleSelection: [],
        // 朝向
        levelData: [
          {
            value: '1',
            label: 'A'
          },
          {
            value: '2',
            label: 'B'
          },
          {
            value: '3',
            label: 'C'
          },
        ],
        // 类型
        homeTypeData: [
          {
            value: '1',
            label: '住宅'
          },
          {
            value: '2',
            label: '别墅'
          },
          {
            value: '3',
            label: '写字楼'
          },
          {
            value: '4',
            label: '商铺'
          },
        ],
        // 装修
        zhuangXData: [
          {
            value: '1',
            label: '毛坯'
          },
          {
            value: '2',
            label: '简装'
          },
          {
            value: '3',
            label: '普装'
          },
          {
            value: '4',
            label: '精装'
          },
          {
            value: '5',
            label: '豪装'
          },
        ],
        inputSearch: '',
        search: '',
        // 筛选
        searchData: [
          {
            value: '客户',
            label: '客户'
          },
          {
            value: '电话',
            label: '电话'
          },
          {
            value: '编号',
            label: '编号'
          },
        ],
      }
    },
    mounted () {
      this.viewData ()
    },
    methods:{
      // 搜索
      clkSearch () {
        if (this.search === '') {
          this.$message.error('请选择搜索类型')
          return
        }
        if (this.inputSearch === '') {
          this.$message.error('请填写搜索内容')
          return
        }
        this.resource = '' // 类型
        this.minHome = ''
        this.maxHome = ''
        this.minAcreage = ''
        this.maxAcreage = ''
        this.minPrice = ''
        this.maxPrice = ''
        this.area = [] // 区数据
        this.quUse = '' // 选中区
        this.shangquan = [] // 区数据
        this.quanUse = '' // 选中区
        this.addImgClass = 0
        this.liu = ''
        this.fromCommunityTwo = ''
        this.level = ''
        this.homeType = ''
        this.zhuangX = ''
        this.startTime = ''
        this.endTime = ''
        this.minLouceng = ''
        this.maxLouceng = ''
        this.menDianData = []
        this.menDian = []
        this.renData = []
        this.ren = ''
        this.viewData ()
      },
      clkCcreen () {
        if (this.resource === '') {
          this.$message.error('请选择客源类型')
          return
        }
        this.search = ''
        this.inputSearch = ''
        this.viewData ()
      },
      // 筛选 更多
      handleChange(val) {
        console.log(val.length);
        this.addImgClass = val.length
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
            this.shangquan = []
            this.quanUse = ''
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
        //console.log(obj.label)//我这边的name就是对应label的
        console.log(vId)
        this.quUse = vId
        this.$post(/api/+'/shangQuan/ofArea',{
          areaCode: this.quUse,
          page:{
            pageSize: 100,
            pageNum: 1,
          }
        }).then(response => {
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
        this.quanUse = vId
      },
      //@select="handleSelect"  是选中某一列触发的事件,在这里item为选中段字所在的对象
      //循环数据
      handleSelectTwo(item) {
          // console.log(item.commId);
          this.fromCommunityTwo = item.xqName
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
            xqName: this.liu,
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
                // console.log(response)
                var obj = response.data.data
                for (var i = 0; i < obj.length; i++) {
                    obj[i].value = obj[i].name
                }
                list = obj;
                // console.log(list)
                this.$message({
                    message: '搜索经纪人成功',
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
      removeTag () {
        this.renData = []
        this.ren = ''
      },
      // 门店
      selectMenDian () {
        this.$post(/api/+'/menDian/listAll').then(response => {
            // console.log(unescape(getCookie('jsName')))
          if (response.data.status == 200) {
            console.log(response.data.data)
            this.menDianData = response.data.data
          } else {
            // this.$message.error(response.data.error)
          }
        })
      },
      // 选择录入人
      selectRen (vId) {
        let obj = {}
        obj = this.menDianData.find((item)=>{//这里的userList就是上面遍历的数据源
            return item.mdId === vId;//筛选出匹配数据
        })
        //console.log(obj.label)//我这边的name就是对应label的
        console.log(this.menDian.map(Number))
        this.menDian = vId
        this.$post(/api/+'/renYuan/renYuansOfJgIds',{
          jgIds: this.menDian.map(Number)
        }).then(response => {
          this.renData = []
          this.ren = ''
            // console.log(unescape(getCookie('jsName')))
          if (response.data.status == 200) {
            console.log(response.data.data)
            this.renData = response.data.data
          } else {
            // this.$message.error(response.data.error)
          }
        })
      },
      // 选择录入人
      changeRen (vId) {
        let obj = {}
        obj = this.renData.find((item)=>{//这里的userList就是上面遍历的数据源
            return item.ryId === vId;//筛选出匹配数据
        })
        //console.log(obj.label)//我这边的name就是对应label的
        console.log(vId)
        this.ren = vId
      },
      viewData () {
        console.log(this.startTime,this.endTime)
        if (this.minHome > this.maxHome && this.minHome !== '' && this.maxHome !== '') {
          this.$message.error('最小室不能大于最大室');
          return
        }
        if (this.minPrice > this.maxPrice && this.minPrice !== '' && this.maxPrice !== '') {
          this.$message.error('最小价格不能大于最大价格');
          return
        }
        if (this.minAcreage > this.maxAcreage && this.minAcreage !== '' && this.maxAcreage !== '') {
          this.$message.error('最小面积不能大于最大面积');
          return
        }
        if (this.minLouceng > this.maxLouceng && this.minLouceng !== '' && this.maxLouceng !== '') {
          this.$message.error('最小楼层不能大于最大楼层');
          return
        }
        this.$post(/api/+'/keYuan/list',{
          page:{
            pageSize: Number(this.display),
            pageNum: Number(this.current),
          },
          kyType: this.resource,
          shiXiao: this.minHome,
          shiDa: this.maxHome,
          mianJiXiao: this.minAcreage,
          mianJiDa: this.maxAcreage,
          jiaGeDi: this.minPrice,
          jiaGeGao: this.maxPrice,
          areaCode: this.quUse,
          sqId: this.quanUse,
          xiaoQu: this.fromCommunityTwo,
          dengJi: this.level,
          leiXing: this.homeType,
          zhuangXiu: this.zhuangX,
          fromAddTime: this.startTime,
          toAddTime: this.endTime,
          louCengDi: this.minLouceng,
          louCengGao: this.maxLouceng,
          mdIds: this.menDian,
          luRuRenId: this.ren,
          ssType: this.search,
          ssKey: this.inputSearch,
        }).then(response => {
          console.log(response)
          if (response.data.status === 200) {
            this.view = response.data.data.list
            this.total = response.data.data.total
          } else if (response.data.status === 404) {
            this.$message.error(response.data.msg);
            this.view = []
          }
        })
      },
      // editor (val,val1) {
      //   // console.log(val,val1)
      //   this.$store.dispatch('set_xq_id',val1[val].xqId)
      //   this.$store.dispatch('set_edit',true)
      //   this.$router.push('/addVillage')
      // },
      // 刷新
      refresh () {
        this.resource = '求购' // 类型
        this.minHome = ''
        this.maxHome = ''
        this.minAcreage = ''
        this.maxAcreage = ''
        this.minPrice = ''
        this.maxPrice = ''
        this.area = [] // 区数据
        this.quUse = '' // 选中区
        this.shangquan = [] // 区数据
        this.quanUse = '' // 选中区
        this.addImgClass = 0
        this.liu = ''
        this.fromCommunityTwo = ''
        this.level = ''
        this.homeType = ''
        this.zhuangX = ''
        this.startTime = ''
        this.endTime = ''
        this.minLouceng = ''
        this.maxLouceng = ''
        this.menDianData = []
        this.menDian = []
        this.renData = []
        this.ren = ''
        this.search = ''
        this.inputSearch = ''
        this.viewData ()
      },
      //      删除
      // deleteRow(index, rows) {
      //   // console.log(index, rows)
      //   // console.log(index, rows[index].sqId)
      //   this.$confirm('确定删除《'+rows[index].xqName+'》吗？', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning',
      //     center: true
      //   }).then(() => {
      //     this.$post(/api/+'/xiaoQu/delete',{
      //       xqIds: [rows[index].xqId],
      //     }).then(response => {
      //       // console.log(response)
      //       if (response.data.status === 200) {
      //         this.$message({
      //           type: 'success',
      //           message: '删除成功!'
      //         });
      //       } else {
      //         this.$message.error(response.data.msg)
      //       }
      //       this.viewData ()
      //     }).catch(err => {
      //       // console.log(err)
      //     })
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消删除'
      //     });
      //   });
      // },
      //     表格选中事件
      handleSelectionChange(val) {
        let _this = this
        _this.multipleSelection = []
        val.forEach( function(element, index) {
          console.log(element.kyId)
          _this.multipleSelection.push(element.kyId)
        })
      },
      // 删除多个
      // delAll () {
      //   console.log(this.multipleSelection)
      //   if (this.multipleSelection.length == 0) {
      //     this.$message.error('暂时没有数据可以删除')
      //   } else {
      //     this.$confirm('确定删除选中的小区吗？', '提示', {
      //       confirmButtonText: '确定',
      //       cancelButtonText: '取消',
      //       type: 'warning',
      //       center: true
      //     }).then(() => {
      //       this.$post(/api/+'/xiaoQu/delete',{
      //         xqIds: this.multipleSelection,
      //       }).then(response => {
      //         console.log(response)
      //         if (response.data.status === 200) {
      //           this.$message({
      //             type: 'success',
      //             message: '删除成功!'
      //           });
      //         } else {
      //           this.$message.error(response.data.msg)
      //         }
      //         this.viewData ()
      //       }).catch(err => {
      //         // console.log(err)
      //       })
      //     }).catch(() => {
      //       this.$message({
      //         type: 'info',
      //         message: '已取消删除'
      //       });
      //     });
      //   }
      // },
      transformAll () {
        if (this.liuOne === '') {
          this.$message.error('名字不能为空')
          return
        }
        this.$post(/api/+'/keYuan/batch/updateLuRuRen',{
          ryId: this.ryIdOne,
          ryName: this.fromCommunityOne,
          kyIds: this.multipleSelection
        }).then(response => {
          if (response.data.status === 200) {
            this.$message({
                message: '转移客源成功',
                type: 'success',
            });
            this.liuOne = ''
            this.ryIdOne = ''
            this.fromCommunityOne = ''
            this.multipleSelection = []
            this.viewData ()
          } else {
            this.$message.error(response.data.msg);
          }
        })
        this.dialogFormVisible = false
      },
      look (val,val1) {
        console.log(val,val1)
        this.$store.dispatch('set_ky_id',val1[val].kyId)
        this.$router.push('/detailsCustomer')
      },
      // 修改table header的背景色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f7fa;color: #282e33;'
        }
      },
      //     分页
      pagechange:function(currentPage){
        console.log(this.current);
        this.current = currentPage
        this.viewData ()
        // ajax请求, 向后台发送 currentPage, 来获取对应的数据
      },
    },
    created(){
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
  @import '../../../../assets/mixin.scss';
  #listVillage{
    width: 100%;
    .listVillage-wap{
      width: 100%;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.24);
      padding: 40px;
      box-sizing: border-box;
      .listVillage-w-content{
        margin-bottom: 30px;
        .listVillage-wc-but{
          padding: 12px 26px;
          padding-left: 60px;
          margin-right: 30px;
          background: $green;
          border-radius: 4px;
          @include sc(18px,$fc);
          float: left;
          position: relative;
          cursor: pointer;
          img{
            @include ct;
            left: 30px;
          }
        }
        .listVillage-wc-search{
          width: 7%;
          height: 40px;
          background: #409eff;
          float: right;
          border-radius: 4px;
          position: relative;
          cursor: pointer;
          img{
            @include center;
          }
        }
        .listVillage-wc-inp{
          width: 20%;
          float: right;
        }
        .listVillage-wc-select{
          width: 8%;
          float: right;
        }
      }
      .listVillage-input{
        width: 100%;
        .listVillage-i-title{
          font-size: 16px;
          color: #666;
          line-height: 40px;
          width: 100%;
          text-align: right;
          overflow:hidden; //超出的文本隐藏
          text-overflow:ellipsis; //溢出用省略号显示
          white-space:nowrap; //溢出不换行
        }
        .listVIllage-wc-wap{
          width: 100%;
          height: 100%;
          .listVIllage-wcw-title{
            width: 100%;
            height: 0;
            padding: 25px 20px;
            box-sizing: border-box;
            background: $qhbg;
            div{
              width: 100%;
              border-bottom: 1px dashed #becbd9;
              position: relative;
              p{
                padding: 0 30px;
                background: $qhbg;
                position: absolute;
                @include center;
                font-size: 16px;
                color: $shfz;
                img{
                  margin-left: 10px;
                  transform: rotate(-180deg) ;
                  transition: all .3s ease;
                }
                .listVIllage_wcwt_img{
                  transform: rotate(0deg );
                  transition: all .3s ease;
                }
              }
            }
          }
        }
      }
    }
    .listVillage-table{
      width: 100%;
      border-radius: 10px;
      margin-top: 15px;
      background: #fff;
      box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.24);
      padding: 40px;
      box-sizing: border-box;
    }
  }
</style>
<style type="text/css">
  #listVillage .el-row {
    &:last-child {
      margin-bottom: 0;
    }
  }
  #listVillage .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  #listVillage .listVillage-input .el-select{
    width: 100% !important;
  }
  #listVillage .el-collapse-item__arrow{
    display: none;
  }
  #listVillage .el-collapse-item__content{
    padding-bottom: 0 !important;
    margin-top: 30px;
  }
  #listVillage .el-autocomplete{
    width: 100% !important;
  }
  #listVillage .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100% !important;
  }
</style>