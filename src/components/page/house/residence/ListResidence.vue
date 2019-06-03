<template>
  <div id="listResidence">
    <div class="listResidence-wap">
      <div class="listResidence-w-content clear">
       <!--  <div class="listResidence-wc-but">
          <img src="static/images/add.png" alt="">
          <span>添加</span>
        </div> -->
        <div class="listResidence-wc-but" @click="refresh">
          <img src="static/images/ref.png" alt="">
          <span>刷新</span>
        </div>
<!--         <div class="listResidence-wc-but" @click="dialogFormVisible = true" style="padding-left: 30px;">
          <i class="el-icon-sort"></i>
          <span>客源转移</span>
        </div> -->
<!--         <div class="listResidence-wc-search" @click="clkSearch">
          <img src="static/images/search.png" alt="">
        </div>
        <div class="listResidence-wc-inp">
          <el-input v-model="inputSearch" placeholder="客户/电话/编号"></el-input>
        </div>
        <div class="listResidence-wc-select">
          <template>
            <el-select v-model="search" placeholder="请选择">
              <el-option v-for="item in searchData" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </template>
        </div> -->
      </div>
      <div class="listResidence-input">
        <el-row :gutter="20" style="margin-bottom: 30px;">
          <el-col :span="2">
            <el-tooltip class="item" effect="dark" content="客源类型" placement="top">
              <p class="listResidence-i-title">客源类型 :</p>
            </el-tooltip>
          </el-col>
          <el-col :span="10">
            <template>
              <el-radio-group v-model="resource">
                <el-radio border label="出售"></el-radio>
                <el-radio border label="出租"></el-radio>
              </el-radio-group>
            </template>
          </el-col>
          <el-col :span="10">
            &nbsp;
          </el-col>
          <el-col :span="2">
            <el-button type="primary" style="width: 100%;" @click="viewData ()">筛选</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom: 30px;">
          <el-col :span="2">
            <p class="listResidence-i-title">户型 :</p>
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
            <p class="listResidence-i-title" style="text-align: left;">室</p>
          </el-col>
          <el-col :span="2">
            <p class="listResidence-i-title">面积 :</p>
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
            <p class="listResidence-i-title" style="text-align: left;">㎡</p>
          </el-col>
          <el-col :span="2">
            <p class="listResidence-i-title">价格 :</p>
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
            <p class="listResidence-i-title" style="text-align: left;" v-if="resource === '出售'">万元</p>
            <p class="listResidence-i-title" style="text-align: left;" v-else-if="resource === '出租'">元/月</p>
            <p class="listResidence-i-title" style="text-align: left;" v-else>——</p>
          </el-col>
        </el-row>
        <div class="listResidence-wc-wap">
          <el-collapse @change="handleChange">
            <el-collapse-item>
              <template slot="title">
                <div class="listResidence-wcw-title">
                  <div>
                    <p>更多<img :class="{listResidence_wcwt_img:addImgClass === 1}" src="static/images/shuangjt.png" alt=""></p>
                  </div>
                </div>
              </template>
              <el-row :gutter="20" style="margin-bottom: 30px;">
                <el-col :span="2">
                  <p class="listResidence-i-title">区/县 :</p>
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
                  <p class="listResidence-i-title">商圈 :</p>
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
                  <p class="listResidence-i-title">楼栋 :</p>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="gallery" placeholder="楼座" style="width: 27% !important;"></el-input>
                  <el-input v-model="unit" placeholder="单元" style="width: 27% !important;"></el-input>
                  <el-input v-model="roomNumber" placeholder="房号" style="width: 26% !important;"></el-input>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-bottom: 30px;">
                <el-col :span="2">
                  <p class="listResidence-i-title">等级 :</p>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="level" placeholder="请选择等级(可多选)" multiple collapse-tags>
                    <el-option v-for="item in levelData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="1">
                  &nbsp;
                </el-col>
                <el-col :span="2">
                  <p class="listResidence-i-title">类型 :</p>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="homeType" placeholder="请选择类型(可多选)" multiple collapse-tags>
                    <el-option v-for="item in homeTypeData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="1">
                  &nbsp;
                </el-col>
                <el-col :span="2">
                  <p class="listResidence-i-title">装修 :</p>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="zhuangX" placeholder="请选择装修(可多选)" multiple collapse-tags>
                    <el-option v-for="item in zhuangXData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-bottom: 30px;">
                <el-col :span="2">
                  <p class="listResidence-i-title">朝向 :</p>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="orientation" placeholder="请选择朝向(可多选)" multiple collapse-tags>
                    <el-option v-for="item in orientationData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="1">
                  &nbsp;
                </el-col>
                <el-col :span="2">
                  <p class="listResidence-i-title">状态 :</p>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="state" placeholder="请选择状态">
                    <el-option v-for="item in stateData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="1">
                  &nbsp;
                </el-col>
                <el-col :span="2">
                  <p class="listResidence-i-title">楼层 :</p>
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
                  <p class="listResidence-i-title" style="text-align: left;">层</p>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-bottom: 30px;">
                <el-col :span="2">
                  <p class="listResidence-i-title">门店 :</p>
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
                  <p class="listResidence-i-title">录入人 :</p>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="ren" @change="changeRen" placeholder="录入人 (请先选择门店)" >
                    <el-option v-for="item in renData" :value="item.ryId" :label="item.name"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="1">
                  &nbsp;
                </el-col>
                <el-col :span="2">
                  <p class="listResidence-i-title">盘别 :</p>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="panBie" placeholder="盘别" >
                    <el-option v-for="item in panBieData" :value="item.label" :label="item.label"></el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-bottom: 30px;">
                <el-col :span="2">
                  <p class="listResidence-i-title">排序 :</p>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="sort" @change="changeSort" placeholder="排序" >
                    <el-option v-for="item in sortData" :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="1">
                  &nbsp;
                </el-col>
                <el-col :span="2">
                  <el-tooltip class="item" effect="dark" content="搜索类型" placement="top">
                    <p class="listResidence-i-title">搜索类型 :</p>
                  </el-tooltip>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="searchState" placeholder="搜索类型" >
                    <el-option v-for="item in searchStateData" :value="item.label" :label="item.label"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="1">
                  &nbsp;
                </el-col>
                <el-col :span="2">
                  <el-tooltip class="item" effect="dark" content="搜索关键字" placement="top">
                    <p class="listResidence-i-title">搜索关键字 :</p>
                  </el-tooltip>
                </el-col>
                <el-col :span="5">
                  <el-input v-model="searchZi" placeholder="搜索关键字"></el-input>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-bottom: 30px;" v-if="resource === '出售'">
                <el-col :span="2">
                  <p class="listResidence-i-title">单价 :</p>
                </el-col>
                <el-col :span="2">
                  <el-input v-model="minDanJia" placeholder="最小值"></el-input>
                </el-col>
                <el-col :span="1" style="line-height: 38px;text-align: center;">
                  ——
                </el-col>
                <el-col :span="2">
                  <el-input v-model="maxDanJia" placeholder="最大值"></el-input>
                </el-col>
                <el-col :span="1">
                  <p class="listResidence-i-title" style="text-align: left;">元/㎡</p>
                </el-col>
                <el-col :span="2">
                  <p class="listResidence-i-title">房龄 :</p>
                </el-col>
                <el-col :span="2">
                  <el-input v-model="minHomeAge" placeholder="最小值"></el-input>
                </el-col>
                <el-col :span="1" style="line-height: 38px;text-align: center;">
                  ——
                </el-col>
                <el-col :span="2">
                  <el-input v-model="maxHomeAge" placeholder="最大值"></el-input>
                </el-col>
                <el-col :span="1">
                  <p class="listResidence-i-title" style="text-align: left;">年</p>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-bottom: 30px;" v-else>
                <el-col :span="2">
                  <el-tooltip class="item" effect="dark" content="付款方式" placement="top">
                    <p class="listResidence-i-title">付款方式 :</p>
                  </el-tooltip>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="payment" placeholder="请选择付款方式级(可多选)" multiple collapse-tags>
                    <el-option v-for="item in paymentData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="1">
                  &nbsp;
                </el-col>
                <el-col :span="2">
                  <el-tooltip class="item" effect="dark" content="最短租期" placement="top">
                    <p class="listResidence-i-title">最短租期 :</p>
                  </el-tooltip>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="leaseTerm" placeholder="请选择最短租期(可多选)" multiple collapse-tags>
                    <el-option v-for="item in leaseTermData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
    <div class="listResidence-table">
      <div>
        <el-table border=""  ref="multipleTable" :data="view" tooltip-effect="dark" style="width: 100%;text-align: center" :header-cell-style="tableHeaderColor" @selection-change="handleSelectionChange" :default-sort = "{prop: 'referencePrice', order: 'descending'}" highlight-current-row>
          <!-- <el-table-column header-align="center" align="center" type="selection" fixed="left" ></el-table-column> -->
          <!-- <el-table-column header-align="center" align="center" type="selection" fixed="left" ></el-table-column> -->
          <!-- <el-table-column header-align="center" align="center" type="index" fixed="left" label="序号" width="50"></el-table-column> -->
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="bianHao" label="编号" fixed="left"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="" width="60" label="图片">
            <template slot-scope="scope">
              <img src="static/images/listImg.png" width="30px" alt="" v-if="scope.row.fyImg !== ''">
              <img src="static/images/listImg1.png" width="30px" alt="" v-else>
            </template>
          </el-table-column>
<!--           <el-table-column header-align="center" align="center" show-overflow-tooltip prop="fyType" label="房源类型" ></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="zuShou" label="租售"></el-table-column>
 -->      <el-table-column header-align="center" align="center" show-overflow-tooltip prop="xqName" width="120" label="小区名称"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="panBie" label="公私盘"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="dengJi" label="等级"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="shi" label="室/厅">
            <template slot-scope="scope">
              {{ scope.row.shi }}/{{ scope.row.ting }}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="jianMian" label="面积"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="louCeng" label="楼层/总层">
            <template slot-scope="scope">
              {{ scope.row.louCeng }}/{{ scope.row.zongCeng }}
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="chaoXiang" label="朝向"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="zhuangXiu" label="装修"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip v-if="ch" prop="jiaGe" label="总价（万）"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip v-if="ch" prop="danJia" label="单价（元/平米）"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip v-if="zh" prop="zuJin" label="租金（元/月）"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip v-if="zh" prop="zuFkType" label="付款方式"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="addTimeStr" width="120" label="录入时间"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="neiRong" width="70" label="跟进"></el-table-column>
          <el-table-column header-align="center" align="center" show-overflow-tooltip prop="propertyConsultant" label="操作 " fixed="right"  class="list-tem-button">
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
<!--         <el-dialog title="客源转移" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false">
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
        </el-dialog> -->
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
        ch: '',
        zh: '',
        // dialogFormVisible: false,
        formLabelWidth: '120px',
        resource: '出售', // 类型
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
        gallery: '',
        unit: '',
        roomNumber: '',
        // liuOne: '',
        // fromCommunityOne: '',
        // ryIdOne: '',
        level: [],
        homeType: [],
        zhuangX: [],
        orientation: [],
        state: '',
        minLouceng: '',
        maxLouceng: '',
        menDianData: [],
        menDian: [],
        renData: [],
        ren: '',
        panBie: '',
        sort: '',
        searchState: '',
        searchZi: '',
        minDanJia: '',
        maxDanJia: '',
        minHomeAge: '',
        maxHomeAge: '',
        payment: [], // 付款方式
        leaseTerm: [],
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
            label: '普通住宅'
          },
          {
            value: '2',
            label: '复式'
          },
          {
            value: '3',
            label: '公寓'
          },
          {
            value: '4',
            label: 'SOHO'
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
            label: '中装'
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
        // 状态
        stateData: [
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
        // 盘别
        panBieData: [
          {
            value: '1',
            label: '公盘'
          },
          {
            value: '2',
            label: '私盘'
          },
        ],
        // 排序
        sortUse: '',
        sortData: [
          {
            value: 'addTimeDesc',
            label: '最新挂牌时间'
          },
          {
            value: 'xqName',
            label: '小区名称'
          },
          {
            value: 'zongJiaDesc',
            label: '总价(租金)从高到低'
          },
          {
            value: 'zongJiaAsc',
            label: '总价(租金)从低到高'
          },
          {
            value: 'mianJiDesc',
            label: '面积从大到小'
          },
          {
            value: 'mianJiAsc',
            label: '面积从小到大'
          },
          {
            value: 'flTimeDesc',
            label: '跟进时间从近到远'
          },
          {
            value: 'flTimeAsc',
            label: '跟进时间从远到近'
          },
          {
            value: 'louCengDesc',
            label: '楼层从高到低'
          },
          {
            value: 'louCengAsc',
            label: '楼层从低到高'
          },
        ],
        // 搜索类型
        searchStateData: [
          {
            value: '1',
            label: '小区'
          },
          {
            value: '2',
            label: '编号'
          },
        ],
        // 付款方式
        paymentData: [
          {
            value: '1',
            label: '押一付三'
          },
          {
            value: '2',
            label: '押一付二'
          },
          {
            value: '3',
            label: '押一付一'
          },
          {
            value: '4',
            label: '年付'
          },
          {
            value: '5',
            label: '半年付'
          },
          {
            value: '6',
            label: '面议'
          },
        ],
        // 最短租期
        leaseTermData: [
          {
            value: '1',
            label: '一年'
          },
          {
            value: '2',
            label: '两年'
          },
          {
            value: '3',
            label: '两年以上'
          },
          {
            value: '4',
            label: '半年'
          },
          {
            value: '5',
            label: '一季度'
          },
          {
            value: '6',
            label: '一个月'
          },
        ],
        // inputSearch: '',
        // search: '',
        // // 筛选
        // searchData: [
        //   {
        //     value: '客户',
        //     label: '客户'
        //   },
        //   {
        //     value: '电话',
        //     label: '电话'
        //   },
        //   {
        //     value: '编号',
        //     label: '编号'
        //   },
        // ],
      }
    },
    mounted () {
      this.viewData ()
    },
    methods:{
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
      changeSort (vId) {
        let obj = {}
        obj = this.sortData.find((item)=>{//这里的userList就是上面遍历的数据源
            return item.label === vId;//筛选出匹配数据
        })
        //console.log(obj.label)//我这边的name就是对应label的
        console.log(vId)
        this.sortUse = vId
      },
      //@select="handleSelect"  是选中某一列触发的事件,在这里item为选中段字所在的对象
      //循环数据
      // handleSelectOne(item) {
      //     // console.log(item.commId);
      //     this.fromCommunityOne = item.name
      //     this.ryIdOne = item.ryId
      // },
      // //queryString 为在框中输入的值
      // //callback 回调函数,将处理好的数据推回
      // querySearchAsyncOne(queryString, callback) {
      //     var list = [{}];
      //      //调用的后台接口
      //     // console.log(queryString)
      //     // console.log(callback)
      //     let _this = this
      //     var data = {
      //       key: this.liuOne,
      //     }
      //     this.$post(/api/+'/renYuan/renYuansNameLike',data).then((response)=>{
      //         //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
      //         // for(let i of response.data){
      //         //     i.value = i.communityName;  //将想要展示的数据作为value
      //         // }
      //         // list = response.data;
      //         // console.log(response)
      //         if (response.data.status === 200) {
      //           // console.log(response)
      //           var obj = response.data.data
      //           for (var i = 0; i < obj.length; i++) {
      //               obj[i].value = obj[i].name
      //           }
      //           list = obj;
      //           // console.log(list)
      //           this.$message({
      //               message: '搜索经纪人成功',
      //               type: 'success',
      //           });
      //         } else {
      //           this.$message.error(data.message);
      //         }
      //         callback(list);
      //   }).catch((error)=>{
      //       console.log(error);
      //   });
      // },
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
        this.$post(/api/+'/fangYuan/zhuZhai/list',{
          page:{
            pageSize: Number(this.display),
            pageNum: Number(this.current),
          },
          zuShou: this.resource,
          fromShi: this.minHome,
          toShi: this.maxHome,
          fromMianJi: this.minAcreage,
          toMianJi: this.maxAcreage,
          fromJiaGe: this.minPrice,
          toJiaGe: this.maxPrice,
          areaCode: this.quUse,
          sqId: this.quanUse,
          dzName: this.gallery,
          dyAllName: this.unit,
          fangHao: this.roomNumber,
          dengJis: this.level,
          leiXings: this.homeType,
          zhuangXius: this.zhuangX,
          chaoXiangs: this.orientation,
          fyState: this.state,
          fromLouCeng: this.minLouceng,
          toLouCeng: this.maxLouceng,
          mdIds: this.menDian,
          luRuRenId: this.ren,
          panBie: this.panBie,
          paiXu: this.sortUse,
          ssType: this.searchState,
          ssKey: this.searchZi,
          fromDanJia: this.minDanJia,
          toDanJia: this.maxDanJia,
          fromFangLing: this.minHomeAge,
          toFangLing: this.maxHomeAge,
          zuFkTypes: this.payment,
          zuQis: this.leaseTerm,
        }).then(response => {
          console.log(response.data.data.list)
          if (response.data.status === 200) {
            if (response.data.data.list === []) {
              this.view = []
              if (response.data.data.list[0].zuShou === '出售') {
                this.ch = true
                this.zh = false
              } else if (response.data.data.list[0].zuShou === '出租') {
                this.zh = true
                this.ch = false
              }
            } else {
              this.view = response.data.data.list
            }
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
        this.resource = '出售', // 类型
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
        this.gallery = ''
        this.unit = ''
        this.roomNumber = ''
        this.level = []
        this.homeType = []
        this.zhuangX = []
        this.orientation = []
        this.state = ''
        this.minLouceng = ''
        this.maxLouceng = ''
        this.menDianData = []
        this.menDian = []
        this.renData = []
        this.ren = ''
        this.panBie = ''
        this.sort = ''
        this.searchState = ''
        this.searchZi = ''
        this.minDanJia = ''
        this.maxDanJia = ''
        this.minHomeAge = ''
        this.maxHomeAge = ''
        this.payment = [] // 付款方式
        this.leaseTerm = []
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
      // transformAll () {
      //   if (this.liuOne === '') {
      //     this.$message.error('名字不能为空')
      //     return
      //   }
      //   this.$post(/api/+'/keYuan/batch/updateLuRuRen',{
      //     ryId: this.ryIdOne,
      //     ryName: this.fromCommunityOne,
      //     kyIds: this.multipleSelection
      //   }).then(response => {
      //     if (response.data.status === 200) {
      //       this.$message({
      //           message: '转移客源成功',
      //           type: 'success',
      //       });
      //       this.liuOne = ''
      //       this.ryIdOne = ''
      //       this.fromCommunityOne = ''
      //       this.multipleSelection = []
      //       this.viewData ()
      //     } else {
      //       this.$message.error(response.data.msg);
      //     }
      //   })
      //   this.dialogFormVisible = false
      // },
      look (val,val1) {
        // console.log(val,val1)
        this.$store.dispatch('set_zz_id',val1[val].fyId)
        this.$router.push('/detailsResidence')
      },
      // 修改table header的背景色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: #f4f7fa;color: #282e33;'
        }
      },
      //     分页
      pagechange:function(currentPage){
        // console.log(this.current);
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
  #listResidence{
    width: 100%;
    .listResidence-wap{
      width: 100%;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.24);
      padding: 40px;
      box-sizing: border-box;
      .listResidence-w-content{
        margin-bottom: 30px;
        .listResidence-wc-but{
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
        .listResidence-wc-search{
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
        .listResidence-wc-inp{
          width: 20%;
          float: right;
        }
        .listResidence-wc-select{
          width: 8%;
          float: right;
        }
      }
      .listResidence-input{
        width: 100%;
        .listResidence-i-title{
          font-size: 16px;
          color: #666;
          line-height: 40px;
          width: 100%;
          text-align: right;
          overflow:hidden; //超出的文本隐藏
          text-overflow:ellipsis; //溢出用省略号显示
          white-space:nowrap; //溢出不换行
        }
        .listResidence-wc-wap{
          width: 100%;
          height: 100%;
          .listResidence-wcw-title{
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
                .listResidence_wcwt_img{
                  transform: rotate(0deg );
                  transition: all .3s ease;
                }
              }
            }
          }
        }
      }
    }
    .listResidence-table{
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
  #listResidence .el-row {
    &:last-child {
      margin-bottom: 0;
    }
  }
  #listResidence .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  #listResidence .listResidence-input .el-select{
    width: 100% !important;
  }
  #listResidence .el-collapse-item__arrow{
    display: none;
  }
  #listResidence .el-collapse-item__content{
    padding-bottom: 0 !important;
    margin-top: 30px;
  }
  #listResidence .el-autocomplete{
    width: 100% !important;
  }
  #listResidence .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100% !important;
  }
</style>