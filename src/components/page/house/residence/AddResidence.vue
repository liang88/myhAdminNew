<template>
  <div id="addResidence">
    <div class="addResidence-wap">
      <el-form :model="ruleForm" :rules="rulesData" ref="ruleForm" label-width="90px">
        <el-row :gutter="0">
          <el-col :span="24" class="addResidence-w-title"><span>*</span>为必填选项</el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="4" class="addResidence-w-title" style="font-size: 24px;color: #333; margin-top: 20px; text-align: left;">核心信息</el-col>
          <el-col :span="20" class="addResidence-w-title"><p style="width: 100%; border-bottom: 1px solid #efefef;margin-top: 30px;"></p></el-col>
        </el-row>
        <el-row :gutter="20" v-if="updateYzAndMph">
          <el-col :span="12">
            <el-form-item label="房源类型" prop="resource">
              <el-radio-group v-model="ruleForm.resource" @change="clkBut">
                <el-radio-button label="出售"></el-radio-button>
                <el-radio-button label="出租"></el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-for="(item,index) in ruleForm.formDataList" :key="index" v-show="item.isType">
          <el-col :span="6">
            <el-form-item label="业主称呼" :prop="'formDataList.' + index + '.name'" :rules="rulesData.name">
              <el-input v-model="item.name" placeholder="请输入业主名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="业主电话" :prop="'formDataList.' + index + '.phone'" :rules="rulesData.phone">
              <el-input v-model="item.phone" placeholder="请输入业主电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="danger" v-if="ruleForm.formDataList.length > 1" @click.prevent="removeRow(index)">删除</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label=" " prop="">
              <el-button type="primary" icon="el-icon-circle-plus" @click="addRow">添加业主信息</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="updateYzAndMph">
          <el-col :span="6">
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
          <el-col :span="6">
            <el-form-item label="栋座" prop="buddingUse">
              <el-select v-model="budding.allName" @focus="focusSeatBuilding" @change="clkSeatBuilding" placeholder="请选择栋座" :disabled="ruleForm.village === ''">
                <el-option v-for="item in budding" :key="item.dzId" :label="item.allName" :value="item.dzId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单元" prop="unitUse">
              <el-select v-model="unit.dyAllName" @change="clkUnit" placeholder="请选择单元" :disabled="ruleForm.village === '' || ruleForm.buddingUse === ''">
                <el-option v-for="item in unit" :key="item.dyId" :label="item.dyAllName" :value="item.dyId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="房号" prop="unitUse">
              <el-select v-model="homeNumber.fangHao" @change="clkHome" placeholder="请选择房号" :disabled="ruleForm.village === '' || ruleForm.buddingUse === '' || ruleForm.unitUse === ''">
                <el-option v-for="item in homeNumber" :key="item.fhId" :label="item.fangHao" :value="item.fhId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="4" class="addResidence-w-title" style="font-size: 24px;color: #333; margin-top: 20px; text-align: left;">基本信息</el-col>
          <el-col :span="20" class="addResidence-w-title"><p style="width: 100%; border-bottom: 1px solid #efefef;margin-top: 30px;"></p></el-col>
        </el-row>
        <el-row :gutter="20">
<!--           <el-col :span="6">
            <el-form-item label="等级" prop="level">
              <el-select v-model="ruleForm.level" placeholder="请选择等级">
                <el-option v-for="item in levelData" :key="item.value" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="6">
            <el-form-item label="盘别" prop="trayOther">
              <el-select v-model="ruleForm.trayOther" placeholder="请选择盘别">
                <el-option v-for="item in trayOtherData" :key="item.value" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="建筑面积" prop="acreage">
              <el-input v-model="ruleForm.acreage" placeholder="建筑面积 (平米)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="底价" prop="bottomPrice">
              <el-input v-model="ruleForm.bottomPrice" :placeholder="ifButs === true ? '底价 (万元)' : '底价 (元/月)'"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="几梯" prop="ladder">
              <el-input v-model="ruleForm.ladder" placeholder="几梯"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="几户" prop="household">
              <el-input v-model="ruleForm.household" placeholder="几户"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="楼层" prop="floor">
              <el-input v-model="ruleForm.floor" placeholder="楼层"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="总层" prop="totalLevel">
              <el-input v-model="ruleForm.totalLevel" placeholder="总层"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="类型" prop="type">
              <el-select v-model="ruleForm.type" placeholder="请选择类型">
                <el-option v-for="item in typeData" :key="item.value" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="朝向" prop="orientation">
              <el-select v-model="ruleForm.orientation" placeholder="请选择朝向">
                <el-option v-for="item in orientationData" :key="item.value" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="装修" prop="zhuangX">
              <el-select v-model="ruleForm.zhuangX" placeholder="请选择装修">
                <el-option v-for="item in zhuangXData" :key="item.value" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="来源" prop="source">
              <el-select v-model="ruleForm.source" placeholder="请选择来源">
                <el-option v-for="item in sourceData" :key="item.value" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="现状" prop="status">
              <el-select v-model="ruleForm.status" placeholder="请选择现状">
                <el-option v-for="item in statusData" :key="item.value" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="电梯" prop="elevator">
              <el-select v-model="ruleForm.elevator" placeholder="请选择电梯">
                <el-option v-for="item in elevatorData" :key="item.value" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="室" prop="room">
              <el-input v-model="ruleForm.room" placeholder="室"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="厅" prop="hall">
              <el-input v-model="ruleForm.hall" placeholder="厅"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="卫" prop="toilet">
              <el-input v-model="ruleForm.toilet" placeholder="卫"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="阳" prop="balcony">
              <el-input v-model="ruleForm.balcony" placeholder="阳"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="厨" prop="kitchen">
              <el-input v-model="ruleForm.kitchen" placeholder="厨"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="配套" prop="kitchen">
              <el-checkbox-group v-model="ruleForm.checkList">
                <el-checkbox v-for="item in checkListData" :label="item"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注" prop="reamarks">
              <el-input type="textarea" autosize placeholder="备注" v-model="ruleForm.reamarks" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="4" class="addResidence-w-title" style="font-size: 24px;color: #333; margin-top: 20px; text-align: left;">更多信息</el-col>
          <el-col :span="20" class="addResidence-w-title"><p style="width: 100%; border-bottom: 1px solid #efefef;margin-top: 30px;"></p></el-col>
        </el-row>
        <div v-if="ifButs">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="总价" prop="totalPrice">
                <el-input v-model="ruleForm.totalPrice" placeholder="总价 (万元)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="原值" prop="bidPrice">
                <el-input v-model="ruleForm.bidPrice" placeholder="买进价 (万元)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="室内面积" prop="homeArea">
                <el-input v-model="ruleForm.homeArea" placeholder="室内面积 (平)"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="房本年限" prop="houseYears">
                <el-select v-model="ruleForm.houseYears" placeholder="请选择房本年限">
                  <el-option v-for="item in houseYearsData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="唯一" prop="only">
                <el-select v-model="ruleForm.only" placeholder="请选择唯一">
                  <el-option v-for="item in onlyData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="建筑结构" prop="buddingTure">
                <el-select v-model="ruleForm.buddingTure" placeholder="请选择建筑结构">
                  <el-option v-for="item in buddingTureData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="建筑年代" prop="buddingYears">
                <el-input v-model="ruleForm.buddingYears" placeholder="建筑年代 (年)"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="产权性质" prop="CQxingzhi">
                <el-select v-model="ruleForm.CQxingzhi" placeholder="请选择产权性质">
                  <el-option v-for="item in CQxingzhiData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="产权年限" prop="CQyears">
                <el-select v-model="ruleForm.CQyears" placeholder="请选择产权年限">
                  <el-option v-for="item in CQyearsData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="产证情况" prop="CQqingkuang">
                <el-select v-model="ruleForm.CQqingkuang" placeholder="请选择产证情况">
                  <el-option v-for="item in CQqingkuangData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="产证日" prop="CQzheng">
                <el-date-picker type="date" placeholder="产证日" v-model="ruleForm.CQzheng" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="抵押" prop="mortgage">
                <el-select v-model="ruleForm.mortgage" placeholder="请选择抵押">
                  <el-option v-for="item in mortgageData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="付款方式" prop="paymentType">
                <el-select v-model="ruleForm.paymentType" placeholder="请选择付款方式">
                  <el-option v-for="item in paymentTypeData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="契税票日期" prop="qiShui">
                <el-date-picker type="date" placeholder="契税票日期" v-model="ruleForm.qiShui" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="还款方式" prop="paymentTypeHuan">
                <el-select v-model="ruleForm.paymentTypeHuan" placeholder="请选择还款方式">
                  <el-option v-for="item in paymentTypeHuanData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-if="!ifButs">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="租金" prop="rent">
                <el-input v-model="ruleForm.rent" placeholder="租金 (元/月)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="付款方式" prop="paymentTypeZu">
                <el-select v-model="ruleForm.paymentTypeZu" placeholder="请选择付款方式">
                  <el-option v-for="item in paymentTypeZuData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="出租方式" prop="zuType">
                <el-select v-model="ruleForm.zuType" placeholder="请选择出租方式">
                  <el-option v-for="item in zuTypeData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="最短租期" prop="zuShort">
                <el-select v-model="ruleForm.zuShort" placeholder="请选择最短租期">
                  <el-option v-for="item in zuShortData" :key="item.value" :label="item.label" :value="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="物业费" prop="propertyFee">
                <el-input v-model="ruleForm.propertyFee" placeholder="物业费"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="包含费用" prop="costFee">
                <el-checkbox-group v-model="ruleForm.costFee">
                  <el-checkbox v-for="(item,index) in costFeeData" :label="item" :key="index"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-row :gutter="20">
          <el-col :span="8">&nbsp;</el-col>
          <el-col :span="4">
            <el-button type="primary" @click="submitFormAndOk">保存</el-button>
          </el-col>
          <el-col :span="4" v-show="isZzEdit">
            <el-button type="primary" @click="submitFormAndFor" v-if="ifButs">添加同住宅出租</el-button>
            <el-button type="primary" @click="submitFormAndFor" v-if="!ifButs">添加同住宅出售</el-button>
          </el-col>
          <el-col :span="8">&nbsp;</el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {setCookie, getCookie} from '../../../../util/cookie.js'
  import {mapGetters,mapState} from 'vuex'
  export default {
    name: 'addResidence',
    data(){
      return {
        isTong: true,
        ifButs: true,
        isZzEdit: true,
        status200: '',
        urls: '',
        updateYzAndMph: true,
        ifBut: '出售',
        xqName: '',
        xqId: '',
        budding: [],
        unit: [],
        homeNumber: [],
        ruleForm: {
          resource: '出售',
          formDataList: [
            {
              name: '',
              phone: '',
              isType: true,
            },
          ],
          village: '',        // 小区
          buddingUse: '',     // 楼栋id
          buddingNameUse: '',
          unitUse: '',        // 单元id
          unitNameUse: '',
          homeUse: '',        // 房号id
          homeNameUse: '',
          // level: '',          // 等级
          trayOther: '',      // 盘别
          acreage:'',         // 建筑面积
          bottomPrice: '',    // 底价
          ladder: '',         // 几梯
          household: '',      // 几户
          floor: '',
          totalLevel: '',
          type: '',
          orientation: '',
          zhuangX: '',
          source: '',         // 来源
          status: '',
          elevator: '',
          room: '',
          hall: '',
          toilet: '',
          balcony: '',
          kitchen: '',
          checkList: [],
          reamarks: '',
          // 出售
          totalPrice: '',     // 总价
          bidPrice: '',       // 买进价
          homeArea: '',       // 室内面积
          houseYears: '',
          only: '',
          buddingTure: '',    // 建筑结构
          buddingYears: '',   // 建筑年代
          CQxingzhi: '',
          CQyears: '',
          CQqingkuang: '',
          CQzheng: '',
          mortgage: '',       // 抵押
          paymentType: '',    // 付款方式
          qiShui: '',         // 契税票日期
          paymentTypeHuan: '',
          // 出租
          rent: '',           // 租金
          paymentTypeZu: '',  // 付款方式（租）
          zuType: '',         // 出租方式
          zuShort: '',        // 最短租期
          propertyFee: '',    // 物业费
          costFee: [],        // 费用明细
        },
        rulesData: {
          resource: [
            { required: true, message: '请选择客源类型', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入业主名称', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入业主电话', trigger: 'blur' }
          ],
          village: [
            { required: true, message: '请搜索小区添加', trigger: 'blur' }
          ],
          buddingUse: [
            { required: true, message: '请选择楼栋', trigger: 'change' }
          ],
          unitUse: [
            { required: true, message: '请选择单元', trigger: 'change' }
          ],
          // level: [
          //   { required: true, message: '请选择等级', trigger: 'change' }
          // ],
          trayOther: [
            { required: true, message: '请选择盘别', trigger: 'change' }
          ],
          acreage: [
            { required: true, message: '请输入建筑面积', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
                if (!reg.test(value)) {
                  callback(new Error('最多两位小数，不能为0'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            },
          ],
          bottomPrice: [
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
          room: [
            { required: true, message: '请输入卧室数', trigger: 'blur' },
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
          hall: [
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
                if (value === '' && this.ifBut === '出租') {
                  callback(new Error('卫生间不能为空'));
                } else if (!reg.test(value) && value !== '') {
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
          ladder: [
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
          household: [
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
          floor: [
            {
              validator: (rule, value, callback) => {
                let reg = /^[1-9]\d*$/
                if (!reg.test(value) && value !== '') {
                  callback(new Error('1-99的整数'));
                } else if (Number(value) > Number(this.ruleForm.totalLevel) && this.ruleForm.totalLevel !== '') {
                  callback(new Error('小于等于总层'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            },
          ],
          totalLevel: [
            {
              validator: (rule, value, callback) => {
                let reg = /^[1-9]\d*$/
                if (!reg.test(value) && value !== '') {
                  callback(new Error('1-99的整数'));
                } else if (Number(value) < Number(this.ruleForm.floor) && this.ruleForm.floor !== '') {
                  callback(new Error('大于等于楼层'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            },
          ],
          reamarks: [
            {
              validator: (rule, value, callback) => {
                if (value.length > 200) {
                  callback(new Error('200字符以内'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            },
          ],
          // 出售
          totalPrice: [
            {
              required: true,
              validator: (rule, value, callback) => {
                let reg = /^(?!0\d+)\d+$/
                if (value === '' && this.ifBut === '出售') {
                  callback(new Error('请输入总价'));
                } else if (!reg.test(value)) {
                  callback(new Error('大于等于0的整数'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            },
          ],
          bidPrice: [
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
          homeArea: [
            {
              validator: (rule, value, callback) => {
                let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
                if (!reg.test(value) && value !== '') {
                  callback(new Error('最多两位小数，不能为0'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            },
          ],
          buddingYears: [
            {
              validator: (rule, value, callback) => {
                let reg =  /^\d{4}$/
                if (Number(value) < 1950 &&  value !== '') {
                  callback(new Error('建筑年代大于1950'));
                } else if (!reg.test(value) &&  value !== '') {
                  callback(new Error('建筑年代为四位整数'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            },
          ],
          // 出租
          rent: [
            { required: true, message: '请输入租金', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                if (value === '' && this.ifBut === '出租') {
                  callback(new Error('请输入租金'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            },
          ],
          paymentTypeZu: [
            { required: true, message: '请选择付款方式', trigger: 'change' },
            {
              validator: (rule, value, callback) => {
                if (value === '' && this.ifBut === '出租') {
                  callback(new Error('请选择付款方式'));
                } else {
                  callback();
                }
              },
              trigger: 'change',
            },
          ],
        },
        // 朝向
        // levelData: [
        //   {
        //     value: '1',
        //     label: 'A'
        //   },
        //   {
        //     value: '2',
        //     label: 'B'
        //   },
        //   {
        //     value: '3',
        //     label: 'C'
        //   },
        // ],
        // 朝向
        trayOtherData: [
          {
            value: '1',
            label: '公盘'
          },
          {
            value: '2',
            label: '私盘'
          },
        ],
        // 类型
        typeData: [
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
        // 来源
        sourceData: [
          {
            value: '1',
            label: '上门'
          },
          {
            value: '2',
            label: '电话'
          },
          {
            value: '3',
            label: '洗盘'
          },
          {
            value: '4',
            label: '网络'
          },
          {
            value: '5',
            label: '陌拜'
          },
          {
            value: '6',
            label: '转介绍'
          },
          {
            value: '7',
            label: '老客户'
          },
        ],
        // 现状
        statusData: [
          {
            value: '1',
            label: '空置'
          },
          {
            value: '2',
            label: '自住'
          },
          {
            value: '3',
            label: '在租'
          },
        ],
        // 电梯
        elevatorData: [
          {
            value: '1',
            label: '有'
          },
          {
            value: '2',
            label: '无'
          },
        ],
        // 配套
        checkListData: [
          '床','电视','空调','冰箱','洗衣机','沙发','餐桌'
        ],
        // 房本年限
        houseYearsData: [
          {
            value: '1',
            label: '满五'
          },
          {
            value: '2',
            label: '满二'
          },
          {
            value: '3',
            label: '不满二'
          },
        ],
        // 唯一
        onlyData: [
          {
            value: '1',
            label: '是'
          },
          {
            value: '2',
            label: '否'
          },
        ],
        // 建筑结构
        buddingTureData: [
          {
            value: '1',
            label: '钢混'
          },
          {
            value: '2',
            label: '砖混'
          },
          {
            value: '3',
            label: '砖木'
          },
          {
            value: '4',
            label: '钢结构'
          },
        ],
        // 产权性质
       CQxingzhiData: [
          {
            value: '1',
            label: '商品房'
          },
          {
            value: '2',
            label: '商住两用'
          },
          {
            value: '3',
            label: '经济适用房'
          },
          {
            value: '4',
            label: '安置房'
          },
          {
            value: '5',
            label: '公房'
          },
          {
            value: '6',
            label: '小产权'
          },
          {
            value: '7',
            label: '其他'
          },
        ],
        // 产权年限
       CQyearsData: [
          {
            value: '1',
            label: '70'
          },
          {
            value: '2',
            label: '50'
          },
          {
            value: '3',
            label: '40'
          },
        ],
        // 产权情况
       CQqingkuangData: [
          {
            value: '1',
            label: '不动产证'
          },
          {
            value: '2',
            label: '双证齐全'
          },
          {
            value: '3',
            label: '房产证'
          },
          {
            value: '4',
            label: '土地证'
          },
          {
            value: '5',
            label: '未出证'
          },
        ],
        // 付款方式
       paymentTypeData: [
          {
            value: '1',
            label: '全款'
          },
          {
            value: '2',
            label: '分期'
          },
          {
            value: '3',
            label: '按揭'
          },
        ],
        // 抵押
       mortgageData: [
          {
            value: '1',
            label: '有'
          },
          {
            value: '2',
            label: '无'
          },
        ],
        // 还款方式
       paymentTypeHuanData: [
          {
            value: '1',
            label: '自己还'
          },
          {
            value: '2',
            label: '客户还'
          },
          {
            value: '3',
            label: '其他'
          },
        ],
        // 付款方式 (租)
       paymentTypeZuData: [
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
        // 出租方式 (租)
       zuTypeData: [
          {
            value: '1',
            label: '整租'
          },
          {
            value: '2',
            label: '合租'
          },
        ],
        // 最短租期
       zuShortData: [
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
        // 配套
        costFeeData: [
          '物业费','水费','电费','燃气费','宽带费','取暖费','停车费','有线电视费','垃圾清运费'
        ],
      }
    },
    computed:{
      ...mapGetters ([
        'zzId',
        'zzEdit',
      ])
    },
    mounted () {
      if (this.zzEdit === true) {
        this.zzEditView ()
        this.isZzEdit = false
      }
    },
    methods: {
      // 新增属性列
      addRow() {
        this.ruleForm.formDataList.push({
          name: '',
          phone: '',
          isType: true,
        });
      },
      // 删除属性列
      removeRow(index) {
        console.log(index)
        this.ruleForm.formDataList.splice(index, 1);
      },
      //@select="handleSelect"  是选中某一列触发的事件,在这里item为选中段字所在的对象
      //循环数据
      handleSelectTwo(item) {
          // console.log(item.commId);
          this.xqName = item.xqName
          this.xqId = item.xqId
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
      // 栋座
      focusSeatBuilding () {
        this.$post(/api/+'/dongZuo/dongZuos',{
          xqId: this.xqId,
          page:{
            pageNum: 1,
            pageSize: 1000,
          }
        }).then(response => {
          if (response.data.status === 200) {
            console.log(response.data.data)
            this.budding = response.data.data.list
          } else {
            // this.$message.error(response.data.error)
          }
        })
      },
      // 选择栋座
      clkSeatBuilding (vId) {
        let obj = {}
        obj = this.budding.find((item)=>{//这里的userList就是上面遍历的数据源
            return item.dzId === vId;//筛选出匹配数据
        })
        //console.log(obj.label)//我这边的name就是对应label的
        console.log(vId)
        this.ruleForm.buddingUse = vId
        this.ruleForm.buddingNameUse = obj.allName
        this.$post(/api/+'/danYuan/search',{
          dzId: this.ruleForm.buddingUse,
          page:{
            pageSize: 100,
            pageNum: 1,
          }
        }).then(response => {
            // console.log(unescape(getCookie('jsName')))
          if (response.data.status === 200) {
            console.log(response.data.data)
            this.unit = response.data.data
          } else {
            // this.$message.error(response.data.error)
          }
        })
      },
      // 选择单元
      clkUnit (vId) {
        let obj = {}
        obj = this.unit.find((item)=>{//这里的userList就是上面遍历的数据源
            return item.dyId === vId;//筛选出匹配数据
        })
        //console.log(obj.label)//我这边的name就是对应label的
        console.log(vId)
        this.ruleForm.unitUse = vId
        this.ruleForm.unitNameUse = obj.dyAllName
        this.$post(/api/+'/fangHao/search',{
          dyId: this.ruleForm.unitUse,
        }).then(response => {
            console.log(response)
          if (response.data.status === 200) {
            // console.log(response.data.data)
            this.homeNumber = response.data.data
          } else {
            // this.$message.error(response.data.error)
          }
        })
      },
      // 选择房号
      clkHome (vId) {
        let obj = {}
        obj = this.homeNumber.find((item)=>{//这里的userList就是上面遍历的数据源
            return item.fhId === vId;//筛选出匹配数据
        })
        //console.log(obj.label)//我这边的name就是对应label的
        console.log(vId)
        this.ruleForm.homeUse = vId
        this.ruleForm.homeNameUse = obj.fangHao
        this.noRepeat ()
      },
      // 房源查重
      noRepeat () {
        this.$post(/api/+'/fangYuan/checkRepet',{
          fyType: '住宅',
          zuShou: this.ruleForm.resource,
          xqId: this.xqId,
          dzId: this.ruleForm.buddingUse,
          dyId: this.ruleForm.unitUse,
          fhId: this.ruleForm.homeUse,
        }).then(response => {
          console.log(response)
          if (response.data.status === 200) {
            console.log(response)
          } else {
            this.homeNumber.fangHao = ''
            this.$message.error(response.data.msg);
          }
        })
      },
      clkBut (val) {
        this.ifBut = val
        if (this.ifBut === '出售') {
          this.ifBut === '出租'
          this.ifButs = true
        } else if (this.ifBut === '出租') {
          this.ifBut === '出售'
          this.ifButs = false
        }
      },
      yeZhuList () {
        this.$post(/api/+'/yeZhu/list',{
          fyId: this.zzId,
        }).then(response => {
          console.log(response.data.data.yzList)
          if (response.data.status === 200) {
            this.ruleForm.formDataList = response.data.data.yzList
            for (var i = 0; i < response.data.data.yzList.length; i++) {
              this.ruleForm.formDataList[i].isType = this.updateYzAndMph
              console.log(this.ruleForm.formDataList[i].isType)
            }
          }
        })
      },
      zzEditView () {
        this.$post(/api/+'/fangYuan/zhuZhai/detail',{
          fyId: this.zzId,
        }).then(response => {
          // console.log(response.data.data.peiTaos)
          console.log(response.data.data.moreButton.updateYzAndMph)
          if (response.data.status === 200) {
            this.updateYzAndMph = response.data.data.moreButton.updateYzAndMph
            this.yeZhuList ()
            let data = response.data.data
            this.ifBut = data.zuShou
            this.ruleForm.resource = data.zuShou
            if (this.ruleForm.resource === '出售') {
              this.ifBut === '出租'
              this.ifButs = true
            } else if (this.ruleForm.resource === '出租') {
              this.ifBut === '出租'
              this.ifButs = false
            }
            this.xqId = data.xqId
            this.xqName = data.xqName
            this.ruleForm.village = data.xqName
            this.ruleForm.buddingUse = data.dzId
            this.ruleForm.buddingNameUse = data.dzName
            this.budding.allName = data.dzName
            this.ruleForm.unitUse = data.dyId
            this.ruleForm.unitNameUse = data.dyAllName
            this.unit.dyAllName = data.dyAllName
            this.ruleForm.homeUse = data.fhId
            this.ruleForm.homeNameUse = data.fangHao
            this.homeNumber.fangHao = data.fangHao
            // this.ruleForm.level = data.dengJi
            this.ruleForm.trayOther = data.panBie
            this.ruleForm.bottomPrice = data.diJia
            this.ruleForm.acreage = data.jianMian
            this.ruleForm.room = data.shi
            this.ruleForm.hall = data.ting
            this.ruleForm.toilet = data.wei
            this.ruleForm.balcony = data.yang
            this.ruleForm.kitchen = data.chu
            this.ruleForm.ladder = data.jiTi
            this.ruleForm.household = data.jiHu
            this.ruleForm.floor = data.louCeng
            this.ruleForm.totalLevel = data.zongCeng
            this.ruleForm.type = data.leiXing
            this.ruleForm.orientation = data.chaoXiang
            this.ruleForm.zhuangX = data.zhuangXiu
            this.ruleForm.source = data.laiYuan
            this.ruleForm.status = data.xianZhuang
            this.ruleForm.elevator = data.dianTi
            this.ruleForm.checkList = data.peiTaos
            this.ruleForm.reamarks = data.beiZhu
            // 出售
            this.ruleForm.totalPrice = data.jiaGe
            this.ruleForm.bidPrice = data.maiJinJia
            this.ruleForm.homeArea = data.shiMian
            this.ruleForm.houseYears = data.fangBenNx
            this.ruleForm.only = data.weiYi
            this.ruleForm.buddingTure = data.jianZhuJg
            this.ruleForm.buddingYears = data.jianZhuNd
            this.ruleForm.CQxingzhi = data.chanQuanXz
            this.ruleForm.CQyears = data.chanQuanNx
            this.ruleForm.CQqingkuang = data.chanZheng
            this.ruleForm.CQzheng = data.chanZhengRi
            this.ruleForm.paymentType = data.shouFkType
            this.ruleForm.mortgage = data.diYa
            // 出租
            this.ruleForm.rent = data.zuJin
            this.ruleForm.paymentTypeZu = data.zuFkType
            this.ruleForm.zuType = data.chuZuType
            this.ruleForm.zuShort = data.zuQi
            this.ruleForm.propertyFee = data.wuYeFei
            this.ruleForm.costFee = data.feiYongMxs
            this.ruleForm.qiShui = data.qiShuiRi
            this.ruleForm.paymentTypeHuan = data.hkType
          }
        })
      },
      submitForm(formName) {
        console.log(this.ruleForm.formDataList)
        if (this.zzEdit === false) {
          this.urls = '/fangYuan/zhuZhai/add'
        } else if (this.zzEdit === true) {
          this.urls = '/fangYuan/zhuZhai/update'
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$post(/api/+this.urls,{
              fyId: this.zzEdit === true ? this.zzId : '',
              zuShou: this.ruleForm.resource,
              yeZhuVos: this.ruleForm.formDataList,
              xqId: this.xqId,
              xqName: this.xqName,
              dzId: this.ruleForm.buddingUse,
              dzName: this.ruleForm.buddingNameUse,
              dyId: this.ruleForm.unitUse,
              dyAllName: this.ruleForm.unitNameUse,
              fhId: this.ruleForm.homeUse,
              fangHao: this.ruleForm.homeNameUse,
              // dengJi: this.ruleForm.level,
              panBie: this.ruleForm.trayOther,
              diJia: this.ruleForm.bottomPrice,
              jianMian: this.ruleForm.acreage,
              shi: this.ruleForm.room,
              ting: this.ruleForm.hall,
              wei: this.ruleForm.toilet,
              yang: this.ruleForm.balcony,
              chu: this.ruleForm.kitchen,
              jiTi: this.ruleForm.ladder,
              jiHu: this.ruleForm.household,
              louCeng: this.ruleForm.floor,
              zongCeng: this.ruleForm.totalLevel,
              leiXing: this.ruleForm.type,
              chaoXiang: this.ruleForm.orientation,
              zhuangXiu: this.ruleForm.zhuangX,
              laiYuan: this.ruleForm.source,
              xianZhuang: this.ruleForm.status,
              dianTi: this.ruleForm.elevator,
              peiTaoList: this.ruleForm.checkList,
              beiZhu: this.ruleForm.reamarks,
              // 出售
              jiaGe: this.ruleForm.totalPrice,
              maiJinJia: this.ruleForm.bidPrice,
              shiMian: this.ruleForm.homeArea,
              fangBenNx: this.ruleForm.houseYears,
              weiYi: this.ruleForm.only,
              jianZhuJg: this.ruleForm.buddingTure,
              jianZhuNd: this.ruleForm.buddingYears,
              chanQuanXz: this.ruleForm.CQxingzhi,
              chanQuanNx: this.ruleForm.CQyears,
              chanZheng: this.ruleForm.CQqingkuang,
              chanZhengRi: this.ruleForm.CQzheng,
              shouFkType: this.ruleForm.paymentType,
              diYa: this.ruleForm.mortgage,
              qiShuiRi: this.ruleForm.qiShui,
              hkType: this.ruleForm.paymentTypeHuan,
              // 出租
              zuJin: this.ruleForm.rent,
              zuFkType: this.ruleForm.paymentTypeZu,
              chuZuType: this.ruleForm.zuType,
              zuQi: this.ruleForm.zuShort,
              wuYeFei: this.ruleForm.propertyFee,
              feiYongMxList: this.ruleForm.costFee,
            }).then(response => {
              console.log(response)
              this.status200 = response.data.status
              if (response.data.status === 200) {
                if (this.zzEdit === false) {
                  if (this.isTong === true) {
                    this.$store.dispatch('set_zz_id',response.data.data.fyId)
                    this.$router.push('/detailsResidence')
                  }
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                } else if (this.zzEdit === true) {
                  this.$store.dispatch('set_zz_id',this.zzId)
                  this.$router.push('/detailsResidence')
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
      submitFormAndOk () {
        this.isTong = true
        this.submitForm('ruleForm')
      },
      submitFormAndFor () {
        this.isTong = false
        this.submitForm('ruleForm')
      },
    },
    watch: {
      status200: {
        handler(newVal) {
          if (this.ifBut === '出售') {
            if (this.status200 == 200) {
              this.ruleForm.resource = '出租'
              this.ifBut === '出租'
              this.ifButs = false
              this.ruleForm.bottomPrice = ''
              this.isZzEdit = false
            }
          } else if (this.ifBut === '出租') {
            if (this.status200 == 200) {
              this.ruleForm.resource = '出售'
              this.ifBut === '出售'
              this.ifButs = true
              this.ruleForm.bottomPrice = ''
              this.isZzEdit = false
            }
          }
        },
      }
    },
    //离开当前页面后执行
    destroyed: function () {
      this.$store.dispatch('set_zz_edit',false)
    },
  }
</script>
<style  lang="scss" scoped>
  @import "../../../../assets/mixin.scss";
  #addResidence .addResidence-wap{
    width: 100%;
    padding: 40px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.24);
    .addResidence-w-title{
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
  #addResidence .el-select{
    width: 100% !important;
  }
  #addResidence .labelMar{
    margin-left: 0 !important;
  }
  #addResidence .el-button--primary{
    width: 100% !important;
  }
  #addResidence .el-col-1{
    padding-right: 0 !important;
  }
</style>