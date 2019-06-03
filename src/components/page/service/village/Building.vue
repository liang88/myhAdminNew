<template>
  <div id="building">
    <div class="building-wap clear">
      <div class="building-w-left">
        <div class="building-wl-operation">
          <el-row>
            <el-button icon="el-icon-delete" style="float: left" @click="delAll"></el-button>
            <el-button icon="el-icon-plus" style="float: right" @click="addBuilding"></el-button>
          </el-row>
        </div>
        <template>
          <el-table border=""  ref="multipleTable" :data="buildingView" tooltip-effect="dark" style="width: 100%;text-align: center" @selection-change="handleSelectionChange" :default-sort = "{prop: 'referencePrice', order: 'descending'}" highlight-current-row :height="tableHeight" @row-click="clkRow">
            <el-table-column header-align="center" align="center" type="selection"></el-table-column>
            <el-table-column header-align="center" align="center" show-overflow-tooltip label="楼栋名称" >
              <template slot-scope="scope">
                <p>{{scope.row.dzName}}{{scope.row.houZhui}}</p>
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" show-overflow-tooltip  prop="propertyConsultant" label="操作 " width="100" class="list-tem-button">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="editorBuilding(scope.$index, buildingView)"
                  type="text">
                  编辑
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="编辑楼栋" :visible.sync="dialogFormVisible" center>
          <el-form :model="form">
            <el-form-item label="楼栋名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" placeholder="楼栋名称"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editBuildingOk">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="新增楼栋" :visible.sync="addFormBuilding" center :close-on-click-modal="false" :close-on-press-escape="false">
          <template>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="单个新增" name="first">
                <template>
                  <div>
                    <el-form :model="formData" :inline="true" ref="formData" size="medium" label-width="80px">
                      <el-row style="padding: 10px;">
                        <el-form-item label="楼座" prop="building" :rules="moreRules.building">
                          <el-input v-model="formData.building" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="statusBuilding">
                          <el-select v-model="formData.statusBuilding" @change="clkStatus" placeholder="请选择内容" style="width: 100px;">
                            <el-option v-for="item in statusData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-row>
                      <el-row style="border-bottom: 1px solid #f0f0f0;padding: 10px;">
                        <el-form-item label="起始楼层" prop="fromBuilding" :rules="moreRules.fromBuilding">
                          <el-input v-model="formData.fromBuilding" placeholder="请输入起始楼层,例如“1”"></el-input>
                        </el-form-item>
                        <el-form-item label="结束楼层" prop="toBuilding" :rules="moreRules.toBuilding">
                          <el-input v-model="formData.toBuilding" placeholder="请输入结束楼层,例如“9”"></el-input>
                        </el-form-item>
                      </el-row>
                      <el-row v-for="(item,index) in formData.powerAttrList" :key="index" style="padding: 10px;">
                        <el-form-item label="单元" :prop="'powerAttrList.' + index + '.dyName'" :rules="[{ required: true, message: '单元名称不能为空',trigger: 'blur'}]">
                          <el-input v-model="item.dyName" placeholder="请输入单元名称"/>
                        </el-form-item>
                        <el-form-item label="" :prop="'powerAttrList.' + index + '.dyHouZhui'">
                          <el-select v-model="item.dyHouZhui" @change="clkStatusUnit" placeholder="请选择内容" style="width: 100px;">
                            <el-option v-for="item1 in statusUnitData" :key="item1.value" :label="item1.label" :value="item1.value"></el-option>
                          </el-select>
                        </el-form-item>
                        <p style="width: 100%;padding:10px 0"></p>
                        <el-form-item label="起始房号"  :prop="'powerAttrList.' + index + '.fromFangHao'" :rules="moreRules.fromFangHao">
                          <el-input v-model="item.fromFangHao" placeholder="请输入起始房号"></el-input>
                        </el-form-item>
                        <el-form-item label="结束房号"  :prop="'powerAttrList.' + index + '.toFangHao'" :rules="moreRules.toFangHao">
                          <el-input v-model="item.toFangHao" placeholder="请输入起始房号"></el-input>
                        </el-form-item>
                        <p style="margin-left: 80px; margin-top: 10px; color: #ce3a3a;">起始房号和结束房号同为"数字"或"字母，例如"起始房号：A 结束房号：C"</p>
                        <p style="width: 100%;padding:10px 0"></p>
                        <el-button type="danger" v-if="formData.powerAttrList.length > 1" size="medium" @click="removeRow(index)">
                          删除
                        </el-button>
                      </el-row>
                      <el-row>
                        <el-button type="primary" size="medium" @click="addRow" style="margin: 10px;">新增单元</el-button>
                      </el-row>
                    </el-form>
                  </div>
                </template>
              </el-tab-pane>
              <el-tab-pane label="批量新增" name="second">
                <template>
                  <div>
                    <el-form :model="formDataMall" :inline="true" ref="formDataMall" size="medium" label-width="80px">
                      <el-row style="padding: 10px;">
                        <el-form-item label="楼座" prop="buildingTwo">
                          <el-input v-model="formDataMall.buildingTwo" placeholder="前缀" style="width: 100px;"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="fromBuildingTwo" :rules="moreRulesMall.fromBuildingTwo">
                          <el-input v-model="formDataMall.fromBuildingTwo" placeholder="起始楼栋" style="width: 150px;"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="toBuildingTwo" :rules="moreRulesMall.toBuildingTwo">
                          <el-input v-model="formDataMall.toBuildingTwo" placeholder="结束楼栋" style="width: 150px;"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="statusBuildingTwo">
                          <el-select v-model="formDataMall.statusBuildingTwo" @change="clkStatus" placeholder="请选择内容" style="width: 100px;">
                            <el-option v-for="item in statusData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-row>
                      <el-row style="border-bottom: 1px solid #f0f0f0;padding: 10px;">
                        <el-form-item label="起始楼层" prop="fromBuildingTwoOne" :rules="moreRulesMall.fromBuildingTwoOne">
                          <el-input v-model="formDataMall.fromBuildingTwoOne" placeholder="请输入起始楼层,例如“1”"></el-input>
                        </el-form-item>
                        <el-form-item label="结束楼层" prop="toBuildingTwoOne" :rules="moreRulesMall.toBuildingTwoOne">
                          <el-input v-model="formDataMall.toBuildingTwoOne" placeholder="请输入结束楼层,例如“9”"></el-input>
                        </el-form-item>
                      </el-row>
                      <el-row v-for="(item,index) in formDataMall.powerAttrList" :key="index" style="padding: 10px;">
                        <el-form-item label="单元" :prop="'powerAttrList.' + index + '.dyName'" :rules="[{ required: true, message: '单元名称不能为空',trigger: 'blur'}]">
                          <el-input v-model="item.dyName" placeholder="请输入单元名称"/>
                        </el-form-item>
                        <el-form-item label="" :prop="'powerAttrList.' + index + '.dyHouZhui'">
                          <el-select v-model="item.dyHouZhui" @change="clkStatusUnit" placeholder="请选择内容" style="width: 100px;">
                            <el-option v-for="item1 in statusUnitData" :key="item1.value" :label="item1.label" :value="item1.value"></el-option>
                          </el-select>
                        </el-form-item>
                        <p style="width: 100%;padding:10px 0"></p>
                        <el-form-item label="起始房号"  :prop="'powerAttrList.' + index + '.fromFangHao'" :rules="moreRulesMall.fromFangHao">
                          <el-input v-model="item.fromFangHao" placeholder="请输入起始房号"></el-input>
                        </el-form-item>
                        <el-form-item label="结束房号"  :prop="'powerAttrList.' + index + '.toFangHao'" :rules="moreRulesMall.toFangHao">
                          <el-input v-model="item.toFangHao" placeholder="请输入起始房号"></el-input>
                        </el-form-item>
                        <p style="margin-left: 80px; margin-top: 10px; color: #ce3a3a;">起始房号和结束房号同为"数字"或"字母，例如"起始房号：A 结束房号：C"</p>
                        <p style="width: 100%;padding:10px 0"></p>
                        <el-button type="danger" v-if="formDataMall.powerAttrList.length > 1" size="medium" @click="removeRowTwo(index)">
                          删除
                        </el-button>
                      </el-row>
                      <el-row>
                        <el-button type="primary" size="medium" @click="addRowTwo" style="margin: 10px;">新增单元</el-button>
                      </el-row>
                    </el-form>
                  </div>
                </template>
              </el-tab-pane>
            </el-tabs>
          </template>
          <div slot="footer" class="dialog-footer">
            <el-button @click="noSubmitFormTwo('formDataMall')" v-show="oneAndTwo">取 消</el-button>
            <el-button @click="noSubmitForm('formData')" v-show="!oneAndTwo">取 消</el-button>
            <el-button type="primary" @click="submitFormTwo('formDataMall')" v-show="oneAndTwo">确 定</el-button>
            <el-button type="primary" @click="submitForm('formData')" v-show="!oneAndTwo">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="building-w-center">
        <div class="building-wl-operation">
          <el-row style="height: 40px;">
            <!-- <el-button icon="el-icon-delete" style="float: left"></el-button> -->
            <!-- <el-button icon="el-icon-plus" style="float: right"></el-button> -->
          </el-row>
        </div>
        <template>
          <el-table border=""  ref="multipleTable" :data="unitView" tooltip-effect="dark" style="width: 100%;text-align: center" @selection-change="handleSelectionChange" :default-sort = "{prop: 'referencePrice', order: 'descending'}" highlight-current-row :height="tableHeight" @row-click="clkRowUnit">
        <el-table-column highlight-current-row="true"  header-align="center" align="center" type="index" label="序号"></el-table-column>
            <el-table-column header-align="center" align="center" show-overflow-tooltip prop="dyName" label="单元名称" >
              <template slot-scope="scope">
                <p>{{scope.row.dyName}} {{scope.row.dyZhouZhui}}</p>
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" show-overflow-tooltip  prop="propertyConsultant" label="操作 " width="150" class="list-tem-button">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="editorUnit(scope.$index, unitView)"
                  type="text">
                  编辑
                </el-button>
                <el-button
                  @click.native.prevent="delUnit(scope.$index, unitView)"
                  type="text">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="编辑单元" :visible.sync="unitShow" center>
          <el-form :model="formUnit">
            <el-form-item label="单元名称" :label-width="formLabelWidth">
              <el-input v-model="formUnit.name" autocomplete="off" placeholder="单元名称"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="unitShow = false">取 消</el-button>
            <el-button type="primary" @click="editUnitOk">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="building-w-right">
        <div class="building-wl-operation">
          <el-row>
            <el-button icon="el-icon-delete" style="float: left" @click="delAllHome"></el-button>
            <el-button icon="el-icon-plus" style="float: right" @click="addHome" v-show="addHomeButShow"></el-button>
          </el-row>
        </div>
        <template>
          <el-table border=""  ref="multipleTable" :data="homeView" tooltip-effect="dark" style="width: 100%;text-align: center" @selection-change="homeClick" :default-sort = "{prop: 'referencePrice', order: 'descending'}" highlight-current-row :height="tableHeight">
            <el-table-column header-align="center" align="center" type="selection"></el-table-column>
            <el-table-column header-align="center" align="center" show-overflow-tooltip prop="louCeng" label="楼层" ></el-table-column>
            <el-table-column header-align="center" align="center" show-overflow-tooltip prop="fangHao" label="房号名称" ></el-table-column>
            <el-table-column header-align="center" align="center" show-overflow-tooltip  prop="propertyConsultant" label="操作 " width="100" class="list-tem-button">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="editHome(scope.$index, homeView)"
                  type="text">
                  编辑
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="编辑房号" :visible.sync="homeShow" center>
          <el-form :model="formHome">
            <el-form-item label="房号名称" :label-width="formLabelWidth">
              <el-input v-model="formHome.name" autocomplete="off" placeholder="房号名称"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="homeShow = false">取 消</el-button>
            <el-button type="primary" @click="editHomeOk">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="新增房号" :visible.sync="addHomeShow" center>
          <el-form :model="addFormHome">
            <el-form-item label="楼层数" :label-width="formLabelWidth">
              <el-input v-model="addFormHome.louceng" autocomplete="off" placeholder="楼层数 1-99" style="padding-bottom: 20px;"></el-input>
            </el-form-item>
            <el-form-item label="房号名称" :label-width="formLabelWidth">
              <el-input v-model="addFormHome.fanghao" autocomplete="off" placeholder="房号名称"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addHomeShow = false">取 消</el-button>
            <el-button type="primary" @click="addHomeOk">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {mapGetters,mapState} from 'vuex'
  export default {
    name: 'building',
    components: {
      
    },
    data(){
      return {
        multipleSelection: [],
        isClickHome: [],
        view: [],
        buildingView: [],
        unitView: [],
        homeView: [],
        tableHeight: window.innerHeight - 248+'px', // 表格高度
        dialogFormVisible: false, // 编辑楼栋
        addFormBuilding: false, // 添加楼栋
        oneAndTwo: false,
        rowDzId: '', // 栋座id
        rowDyId: '', // 单元id
        form: {
          name: '',
        },
        dzId: '',
        unitShow: false,
        formUnit: {
          name: '',
        },
        dyId: '',
        homeShow: false,
        formHome: {
          name: '',
        },
        fhId: '',
        addHomeShow: false,
        addHomeButShow: false,
        addFormHome: {
          louceng: '',
          fanghao: '',
        },
        formLabelWidth: '120px',
        activeName: 'first',
        formData: {
          building: '',
          statusBuilding: '栋',
          fromBuilding: '',
          toBuilding: '',
          powerAttrList: [{
            dyName: '',
            dyHouZhui: '单元',
            fromFangHao: '',
            toFangHao: '',
          }],
        },
        moreRules: {
          // building: [{required: true, message: '请输入排序', trigger: 'change'},
          //   {
          //     validator: (rule, value, callback) => {
          //       if (value < 0) {
          //         callback(new Error('必须大于0'));
          //       } else if (value.length > 5) {
          //         callback(new Error('不超过5位数字'));
          //       } else if (!value) {
          //         callback(new Error('排序不能为空'));
          //       } else {
          //         callback();
          //       }
          //     },
          //     trigger: 'blur',
          //   },
          // ],
          building: [{required: true, message: '请输入楼栋名称', trigger: 'blur'}],
          fromBuilding: [{required: true, message: '请输入起始楼层,例如“1”', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                let reg = /^[1-9][0-9]{0,1}$/
                if (!reg.test(value)) {
                  callback(new Error('请输入1-99的数字'));
                } else if (Number(value) > Number(this.formData.toBuilding) && this.formData.toBuilding != '') {
                  callback(new Error('起始楼层必须小于结束楼层'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            },
          ],
          toBuilding: [{required: true, message: '请输入结束楼层,例如“9”', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                let reg = /^[1-9][0-9]{0,1}$/
                if (!reg.test(value)) {
                  callback(new Error('请输入1-99的数字'));
                } else if (Number(value) < Number(this.formData.fromBuilding) && this.formData.fromBuilding != '') {
                  callback(new Error('结束楼层必须大于起始楼层'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            },
          ],
          // fromFangHao: [{required: true, message: '请输入起始房号,例如“1”', trigger: 'blur'},
          //   {
          //     validator: (rule, value, callback) => {
          //       let reg = /^[1-9][0-9]{0,1}$/
          //       if (!reg.test(value)) {
          //         callback(new Error('请输入1-99的数字'));
          //       } else {
          //         callback();
          //       }
          //     },
          //     trigger: 'blur',
          //   },
          // ],
          // toFangHao: [{required: true, message: '请输入起始房号,例如“9”', trigger: 'blur'},
          //   {
          //     validator: (rule, value, callback) => {
          //       let reg = /^[1-9][0-9]{0,1}$/
          //       if (!reg.test(value)) {
          //         callback(new Error('请输入1-99的数字'));
          //       } else {
          //         callback();
          //       }
          //     },
          //     trigger: 'blur',
          //   },
          // ],
        },
        formDataMall: {
          buildingTwo: '',
          fromBuildingTwo: '',
          toBuildingTwo: '',
          statusBuildingTwo: '栋',
          fromBuildingTwoOne: '',
          toBuildingTwoOne: '',
          powerAttrList: [{
            dyName: '',
            dyHouZhui: '单元',
            fromFangHao: '',
            toFangHao: '',
          }],
        },
        moreRulesMall: {
          // building: [{required: true, message: '请输入排序', trigger: 'change'},
          //   {
          //     validator: (rule, value, callback) => {
          //       if (value < 0) {
          //         callback(new Error('必须大于0'));
          //       } else if (value.length > 5) {
          //         callback(new Error('不超过5位数字'));
          //       } else if (!value) {
          //         callback(new Error('排序不能为空'));
          //       } else {
          //         callback();
          //       }
          //     },
          //     trigger: 'blur',
          //   },
          // ],
          fromBuildingTwo: [{required: true, message: '请输入起始楼栋名称', trigger: 'blur'}],
          toBuildingTwo: [{required: true, message: '请输入结束楼栋名称', trigger: 'blur'}],
          fromBuildingTwoOne: [{required: true, message: '请输入起始楼层,例如“1”', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                let reg = /^[1-9][0-9]{0,1}$/
                if (!reg.test(value)) {
                  callback(new Error('请输入1-99的数字'));
                } else if (Number(value) > Number(this.formData.toBuildingTwoOne) && this.formData.toBuildingTwoOne != '') {
                  callback(new Error('起始楼层必须小于结束楼层'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            },
          ],
          toBuildingTwoOne: [{required: true, message: '请输入结束楼层,例如“9”', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                let reg = /^[1-9][0-9]{0,1}$/
                if (!reg.test(value)) {
                  callback(new Error('请输入1-99的数字'));
                } else if (Number(value) < Number(this.formData.fromBuildingTwoOne) && this.formData.fromBuildingTwoOne != '') {
                  callback(new Error('结束楼层必须大于起始楼层'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            },
          ],
          // fromFangHao: [{required: true, message: '请输入起始房号,例如“1”', trigger: 'blur'},
          //   {
          //     validator: (rule, value, callback) => {
          //       let reg = /^[1-9][0-9]{0,1}$/
          //       if (!reg.test(value)) {
          //         callback(new Error('请输入1-99的数字'));
          //       } else {
          //         callback();
          //       }
          //     },
          //     trigger: 'blur',
          //   },
          // ],
          // toFangHao: [{required: true, message: '请输入起始房号,例如“9”', trigger: 'blur'},
          //   {
          //     validator: (rule, value, callback) => {
          //       let reg = /^[1-9][0-9]{0,1}$/
          //       if (!reg.test(value)) {
          //         callback(new Error('请输入1-99的数字'));
          //       } else {
          //         callback();
          //       }
          //     },
          //     trigger: 'blur',
          //   },
          // ],
        },
        // 状态
        statusUse: '',
        statusData: [
          {
            value: '1',
            label: '栋'
          },
          {
            value: '2',
            label: '弄'
          },
          {
            value: '3',
            label: '座'
          },
          {
            value: '4',
            label: '号楼'
          },
          {
            value: '5',
            label: '胡同'
          },
        ],
        // 状态
        statusUnitUse: '',
        statusUnitData: [
          {
            value: '1',
            label: '单元'
          },
          {
            value: '2',
            label: '栋'
          },
          {
            value: '3',
            label: '幢'
          },
          {
            value: '4',
            label: '号'
          },
          {
            value: '5',
            label: '号楼'
          },
          {
            value: '6',
            label: '阁'
          },
          {
            value: '7',
            label: '苑'
          },
          {
            value: '8',
            label: '梯'
          },
          {
            value: '9',
            label: '轩'
          },
        ],
      }
    },
    computed:{
      ...mapGetters ([
        'xqId',
      ])
    },
    mounted () {
      this.loudong ()
    },
    methods:{
      // 新增属性列
      addRow() {
        this.formData.powerAttrList.push({
          dyName: '',
          dyHouZhui: '单元',
          fromFangHao: '',
          toFangHao: '',
        });
      },
      // 新增属性列two
      addRowTwo() {
        this.formDataMall.powerAttrList.push({
          dyName: '',
          dyHouZhui: '单元',
          fromFangHao: '',
          toFangHao: '',
        });
      },
      // 删除属性列
      removeRow(index) {
        this.formData.powerAttrList.splice(index, 1);
      },
      // 删除属性列
      removeRowTwo(index) {
        this.formDataMall.powerAttrList.splice(index, 1);
      },
      //下拉框选中事件 状态
      clkStatus(vId){//这个vId也就是value值
        // console.log(ha)
        let obj = {}
        obj = this.statusData.find((item)=>{//这里的userList就是上面遍历的数据源
            return item.value === vId;//筛选出匹配数据
        })
        console.log(obj.label)//我这边的name就是对应label的
        console.log(vId)
        this.statusUse = obj.label
      },
      //下拉框选中事件 状态
      clkStatusUnit(vId){//这个vId也就是value值
        // console.log(ha)
        let obj = {}
        obj = this.statusUnitData.find((item)=>{//这里的userList就是上面遍历的数据源
            return item.value === vId;//筛选出匹配数据
        })
        console.log(obj.label)//我这边的name就是对应label的
        console.log(vId)
        this.statusUnitUse = obj.label
      },
      // 保存添加楼栋
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$post(/api/+'/dongZuo/oneAdd',{
              xqId: this.xqId,
              dzName: this.formData.building,
              dzHouZhui: this.formData.statusBuilding,
              fromLouCeng: this.formData.fromBuilding,
              toLouCeng: this.formData.toBuilding,
              dyList: this.formData.powerAttrList,
            }).then(response => {
              console.log(response)
              if (response.data.status === 200) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.formData.powerAttrList = [{
                  dyName: '',
                  dyHouZhui: '单元',
                  fromFangHao: '',
                  toFangHao: '',
                }]
                this.formData.building = ''
                this.formData.statusBuilding = '栋'
                this.formData.fromBuilding = ''
                this.formData.toBuilding = ''
                this.addFormBuilding = !this.addFormBuilding
                this.loudong ()
                // this.$refs[formName].resetFields();
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
      // 保存添加楼栋
      submitFormTwo(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$post(/api/+'/dongZuo/batchAdd',{
              xqId: this.xqId,
              dzQianZhui: this.formDataMall.buildingTwo,
              fromDzName: this.formDataMall.fromBuildingTwo,
              toDzName: this.formDataMall.toBuildingTwo,
              dzHouZhui: this.formDataMall.statusBuildingTwo,
              fromLouCeng: this.formDataMall.fromBuildingTwoOne,
              toLouCeng: this.formDataMall.toBuildingTwoOne,
              dyList: this.formDataMall.powerAttrList,
            }).then(response => {
              console.log(response)
              if (response.data.status === 200) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.formDataMall.powerAttrList = [{
                  dyName: '',
                  dyHouZhui: '单元',
                  fromFangHao: '',
                  toFangHao: '',
                }]
                this.formDataMall.buildingTwo = ''
                this.formDataMall.fromBuildingTwo = ''
                this.formDataMall.toBuildingTwo = ''
                this.formDataMall.statusBuildingTwo = '栋'
                this.formDataMall.fromBuildingTwoOne = ''
                this.formDataMall.toBuildingTwoOne = ''
                this.addFormBuilding = !this.addFormBuilding
                this.loudong ()
                // this.$refs[formName].resetFields();
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
      noSubmitForm (formName) {
        this.formData.powerAttrList = [{
          dyName: '',
          dyHouZhui: '单元',
          fromFangHao: '',
          toFangHao: '',
        }]
        this.formData.building = ''
        this.formData.statusBuilding = '栋'
        this.formData.fromBuilding = ''
        this.formData.toBuilding = ''
        this.addFormBuilding = !this.addFormBuilding
        this.loudong ()
        // this.$refs[formName].resetFields();
      },
      noSubmitFormTwo (formName) {
        this.formDataMall.powerAttrList = [{
          dyName: '',
          dyHouZhui: '单元',
          fromFangHao: '',
          toFangHao: '',
        }]
        this.formDataMall.buildingTwo = ''
        this.formDataMall.fromBuildingTwo = ''
        this.formDataMall.toBuildingTwo = ''
        this.formDataMall.statusBuildingTwo = '栋'
        this.formDataMall.fromBuildingTwoOne = ''
        this.formDataMall.toBuildingTwoOne = ''
        this.addFormBuilding = !this.addFormBuilding
        this.loudong ()
        // this.$refs[formName].resetFields();
      },
      // 楼栋展示
      loudong () {
        this.$post(/api/+'/dongZuo/dongZuos',{
          xqId: this.xqId,
          page:{
            pageSize: 100,
            pageNum: 1,
          },
        }).then(response => {
          console.log(response,this.xqId)
          if (response.data.status === 200) {
            this.buildingView = response.data.data.list
          }
        })
      },
      //     表格选中事件
      handleSelectionChange(val) {
        let _this = this
        _this.multipleSelection = []
        val.forEach( function(element, index) {
          // console.log(element.companyId)
          _this.multipleSelection.push(element.dzId)
        })
        console.log(_this.multipleSelection)
      },
      // 删除多个楼栋
      delAll () {
        console.log(this.multipleSelection)
        if (this.multipleSelection.length == 0) {
          this.$message.error('暂时没有数据可以删除')
        } else {
          this.$confirm('确定删除选中的楼栋吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.$post(/api/+'/dongZuo/batchDelete',{
              dzIds: this.multipleSelection,
            }).then(response => {
              console.log(response)
              if (response.data.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              } else {
                this.$message.error(response.data.msg)
              }
              this.loudong ()
            }).catch(err => {
              // console.log(err)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      //      删除 单个单元
      delUnit(index, rows) {
        console.log(index, rows[index].dyId)
        this.$confirm('确定删除单元《'+rows[index].dyName+'》吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$post(/api/+'/danYuan/delete',{
            dyId: Number(rows[index].dyId),
          }).then(response => {
            console.log(response)
            if (response.data.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              this.$message.error(response.data.msg)
            }
            this.unitViewData ()
          }).catch(err => {
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //     表格选中事件 房号
      homeClick(val) {
        let _this = this
        _this.isClickHome = []
        val.forEach( function(element, index) {
          // console.log(element.companyId)
          _this.isClickHome.push(element.fhId)
        })
        console.log(_this.isClickHome)
      },
      // 删除多个房号
      delAllHome () {
        console.log(this.isClickHome)
        if (this.isClickHome.length == 0) {
          this.$message.error('暂时没有数据可以删除')
        } else {
          this.$confirm('确定删除选中的房号吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.$post(/api/+'/fangHao/delete',{
              fhIds: this.isClickHome,
            }).then(response => {
              console.log(response)
              if (response.data.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              } else {
                this.$message.error(response.data.msg)
              }
              this.homeViewData ()
            }).catch(err => {
              // console.log(err)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      // 编辑楼栋
      editorBuilding (val,val1) {
        this.form.name = val1[val].dzName
        this.dzId = val1[val].dzId
        this.dialogFormVisible = !this.dialogFormVisible
      },
      // 确定编辑
      editBuildingOk () {
        if (this.form.name === '') {
          this.$message.error('名称不能为空')
          return
        }
        this.$post(/api/+'/dongZuo/updateName',{
          dzId: this.dzId,
          dzName: this.form.name,
        }).then(response => {
          if (response.data.status === 200) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.dialogFormVisible = !this.dialogFormVisible
            this.loudong ()
          } else {
            this.$message.error(response.data.msg)
          }
        })
      },
      // 编辑单元
      editorUnit (val,val1) {
        this.formUnit.name = val1[val].dyName
        this.dyId = val1[val].dyId
        this.unitShow = !this.unitShow
        console.log(val,val1)
      },
      // 确定编辑 单元
      editUnitOk () {
        console.log(this.formUnit.name,this.dyId)
        if (this.formUnit.name === '') {
          this.$message.error('名称不能为空')
          return
        }
        this.$post(/api/+'/danYuan/updateName',{
          dyId: this.dyId,
          dyName: this.formUnit.name,
        }).then(response => {
          console.log(response)
          if (response.data.status === 200) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.unitShow = !this.unitShow
            this.unitViewData ()
          } else {
            this.$message.error(response.data.msg)
          }
        })
      },
      // 编辑房号
      editHome (val,val1) {
        this.formHome.name = val1[val].fangHao
        this.fhId = val1[val].fhId
        this.homeShow = !this.homeShow
        console.log(val,val1)
      },
      // 确定编辑 房号
      editHomeOk () {
        // console.log(this.formHome.name,this.dyId)
        if (this.formHome.name === '') {
          this.$message.error('名称不能为空')
          return
        }
        this.$post(/api/+'/fangHao/update',{
          fhId: this.fhId,
          fangHao: this.formHome.name,
        }).then(response => {
          console.log(response)
          if (response.data.status === 200) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.homeShow = !this.homeShow
            this.homeViewData ()
          } else {
            this.$message.error(response.data.msg)
          }
        })
      },
      // 楼栋添加按钮
      addBuilding () {
        // console.log(1)
        this.addFormBuilding = !this.addFormBuilding
      },
      // 添加房号
      addHome () {
        this.addHomeShow = !this.addHomeShow
      },
      addHomeOk () {
        let reg = /^[1-9][0-9]{0,1}$/
        if (!reg.test(this.addFormHome.louceng)) {
          this.$message.error('楼层为“1-99”的数字')
          return
        }
        // console.log(this.rowDzId,this.rowDyId,this.addFormHome.louceng,this.addFormHome.fanghao)
        this.$post(/api/+'/fangHao/add',{
          dzId: this.rowDzId,
          dyId: this.rowDyId,
          louCeng: this.addFormHome.louceng,
          fangHao: this.addFormHome.fanghao,
        }).then(response => {
          console.log(response)
          if (response.data.status === 200) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.homeViewData ()
            this.addHomeShow = !this.addHomeShow
            this.addFormHome.louceng = ''
            this.addFormHome.fanghao = ''
          } else {
            this.$message.error(response.data.msg)
          }
        })
      },
      // 切换楼栋  单个添加  还是批量添加
      handleClick(tab, event) {
        // console.log(tab.index, event);
        if (tab.index == 0) {
          this.oneAndTwo = false
        } else if (tab.index == 1) {
          this.oneAndTwo = true
        }
      },
      // 楼栋点击一行
      clkRow (row, column, event) {
        this.rowDzId = row.dzId
        // console.log(row, column, event)
        this.unitView = []
        this.unitViewData ()
        this.homeView = []
        this.addHomeButShow = false
      },
      // 单元点击一行
      clkRowUnit (row, column, event) {
        this.rowDyId = row.dyId
        // console.log(row, column, event)
        this.homeView = []
        this.homeViewData ()
        this.addHomeButShow = true
      },
      // 单元展示
      unitViewData () {
        this.$post(/api/+'/danYuan/search',{
          dzId: this.rowDzId,
        }).then(response => {
          console.log(response)
          if (response.data.status === 200) {
            this.unitView = response.data.data
          }
        })
      },
      // 房号展示
      homeViewData () {
        this.$post(/api/+'/fangHao/search',{
          dyId: this.rowDyId,
        }).then(response => {
          console.log(response)
          if (response.data.status === 200) {
            this.homeView = response.data.data
          }
        })
      },
    },
    created(){
    }
  }
</script>

<style type="text/css" lang="scss" scoped>
  @import '../../../../assets/mixin.scss';
  #building{
    width: 100%;
    .building-wap{
      width: 100%;
      padding: 40px;
      background: #fff;
      border-radius: 10px;
      box-sizing: border-box;
      box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.24);
      .building-w-left{
        width: 33%;
        float: left;
        .building-wl-operation{
          width: 100%;
          margin-bottom: 20px;
        }
      }
      .building-w-center{
        width: 33%;
        margin-left: 1%;
        float: left;
        .building-wl-operation{
          width: 100%;
          margin-bottom: 20px;
        }
      }
      .building-w-right{
        width: 32%;
        margin-left: 1%;
        float: left;
        .building-wl-operation{
          width: 100%;
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
<style type="text/css">
  #building .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
    border-right: none !important;
  }
  #building .el-form-item{
    margin-bottom: 0;
  }
  #building .el-dialog--center{
    max-height: 70% !important;
    overflow-x: hidden;
  }
</style>