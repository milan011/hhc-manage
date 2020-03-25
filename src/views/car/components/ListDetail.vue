<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input 
        placeholder="价格:"
        :disabled="true"
        style="width: 70px;" 
        class="filter-item">
      </el-input>
      <el-input 
        placeholder="从"
        clearable 
        v-model.number="listQuery.SaleAMTMin"
        style="width: 75px;" 
        class="filter-item">
      </el-input>
      <el-input 
        placeholder="到"
        clearable 
        v-model.number="listQuery.SaleAMTMax"
        @change="handleFilterQuick"
        style="width: 75px;" 
        class="filter-item">
      </el-input>
      <!-- <el-input-number v-model="listQuery.SaleAMTMin" @change="" :min="1" :max="10" label="价格"></el-input-number> -->
      <el-select clearable style="width:100px;" v-model="listQuery.Transmission" class="filter-item" @change="handleFilterQuick" filterable placeholder="变速箱">
        <el-option v-if="index != 0" v-for="(trans, index) in transmissionOptions" :key="index" :label="trans" :value="index"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="showSelect">{{ $t('table.search') }}</el-button>
      <el-button v-if="showResetFilter" v-waves class="filter-item" type="warning" icon="el-icon-search" @click="listQueryReset">{{ $t('table.searchReset') }}</el-button>
      <el-button v-if="!isAll" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;">
      <!-- <el-table-column :label="$t('table.id')" :resizable="false" show-overflow-tooltip width="60%" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ID }}</span>
        </template>
      </el-table-column> -->
      <el-table-column :label="$t('car.name')" width="200%" :resizable="false" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.FullName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('car.SaleAMT')" :resizable="false" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.SaleAMT }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('car.Mileage')" :resizable="false" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Mileage }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('car.Transmission')" :resizable="false" show-overflow-tooltip align="center">
        <template slot-scope="scope">
      <span>{{ transmissionOptions[scope.row.Transmission]}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('car.Out_color')" :resizable="false" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          <span>{{ outColorOptions[scope.row.Out_color] }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('car.Car_Status')" :resizable="false" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.Car_Status | statusFilter">
            <span>{{ carStatusConfig[scope.row.Car_Status] }}</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('car.CreateDate')" :resizable="false" width="150px" align="center">
        <template slot-scope="scope">
          <span>
            {{ scope.row.CreateDate | parseTime('{y}-{m}-{d}') }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('car.CreateName')" show-overflow-tooltip :resizable="false" width="150px" align="center">
        <template slot-scope="scope">
          <span>
            <span v-if="scope.row.CreateName">{{scope.row.CreateName}}</span>
            <span v-else></span>
            |
            <span v-if="scope.row.shopname">{{scope.row.shopname}}</span>
            <span v-else></span>
          </span>
        </template>
      </el-table-column>
      <el-table-column v-if="isAll" :label="$t('table.actions')" :resizable="false" align="center" width="100%" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleShow(scope.row)">
            {{ $t('table.show') }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column v-else :label="$t('table.actions')" :resizable="false" align="center" width="180%" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleShow(scope.row)">
            {{ $t('table.show') }}
          </el-button>
          <!-- <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">
            {{ $t('table.delete') }}
          </el-button> -->
          <el-dropdown>
            <el-button type="primary" size="mini">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button type="success" size="mini" @click="handleShow(scope.row)">
                  {{ $t('table.show') }}
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type="success" size="mini" @click="handleShow(scope.row)">
                  跟进
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type="success" size="mini" @click="handleShow(scope.row)">
                  协议
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type="success" size="mini" @click="handleShow(scope.row)">
                  废弃
                </el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.PageIndex" :total="total" background layout="total, prev, pager, next" @current-change="handleCurrentChange" />
    </div>
    <el-dialog title="车源详情" width="75%" top="5vh" :visible.sync="dialogDetailVisible">
      <el-tabs type="border-card">
        <el-tab-pane v-if="!isAll" label="客户">
          <el-row :gutter="12">
            <el-col :span="4">
              <el-card shadow="always">
                思域 2008款 1.8L EXI MT 纪念经典版
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="hover">
                鼠标悬浮时显示
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane  label="信息">
          <el-row :gutter="12">
            <el-col :span="4">
              <el-card shadow="hover">
                编号:{{ carDetail.cars && carDetail.cars.ID }}
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                车型:{{ carDetail.cars && carDetail.cars.FullName}}
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                VIN码:{{ carDetail.cars && carDetail.cars.VIN}}
              </el-card>
            </el-col><el-col :span="4">
              <el-card shadow="hover">
                车型类别:{{ carDetail.cars && carTypeConfig[carDetail.cars.CarType]}}
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="4">
              <el-card shadow="hover">
                价格:{{ carDetail.cars && carDetail.cars.BasePrice}}万-{{ carDetail.cars && carDetail.cars.SaleAMT}}万
              </el-card>
            </el-col><el-col :span="4">
              <el-card shadow="hover">
                指导价:{{ carDetail.cars && carDetail.cars.InitPrice/10000}}
              </el-card>
            </el-col><el-col :span="4">
              <el-card shadow="hover">
                评估价 :{{ carDetail.cars && carDetail.cars.EvalAMT}}万
              </el-card>
            </el-col><el-col :span="4">
              <el-card shadow="hover">
                行驶里程:{{ carDetail.cars && carDetail.cars.Mileage}} 万
              </el-card>
            </el-col><el-col :span="4">
              <el-card shadow="hover">
                变速箱:{{ carDetail.cars && transmissionOptions[carDetail.cars.Transmission]}}
              </el-card>
            </el-col><el-col :span="4">
              <el-card shadow="hover">
                排量:{{ carDetail.cars && carDetail.cars.Capacity}}
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="12">        
            <el-col :span="4">
              <el-card shadow="hover">
                门店:{{ carDetail.shop && carDetail.shop.name}}
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="hover">
                负责人:{{ carDetail.cars && carDetail.cars.CreateName}}
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="hover">
                外观颜色:{{ carDetail.cars && outColorOptions[carDetail.cars.Out_color]}}
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="hover">
                内饰颜色:{{ carDetail.cars && inColorConfig[carDetail.cars.Inside_color]}}
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="hover">
                车龄(年):{{ carDetail.cars && (new Date().getFullYear() - (carDetail.cars.BuyDate.split("T")[0].substring(0,4)))}}
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="hover">
                过户次数:{{ carDetail.cars && carDetail.cars.Sale_number}}
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="6">
              <el-card shadow="hover">
                上传:{{ carDetail.cars && carDetail.cars.CreateDate.split("T")[0]}}
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover">
                上牌:{{ carDetail.cars && carDetail.cars.BuyDate.split("T")[0]}}
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover">
                到检:{{ carDetail.cars && carDetail.cars.InspectionTime.split("T")[0]}}
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover">
                保险到期:{{ carDetail.cars && carDetail.cars.Safe_end.split("T")[0] }}
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="6">
              <el-card shadow="hover">
                上牌城市:{{ carDetail.cars && carDetail.cars.CityName}}
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover">
                保险类别:{{ carDetail.cars && safeTypeConfig[carDetail.cars.Safe_type]}}
              </el-card>
            </el-col>
            <el-col v-if="carDetail.cars && (carDetail.cars.CreateId == currentUserId)" :span="12">
              <el-card shadow="hover">
                客户:{{ carDetail.customer && (carDetail.customer.name)}} | {{ carDetail.customer && (carDetail.customer.telephone)}}
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                销售顾问备注:{{ carDetail.cars && carDetail.cars.XS_description}}
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                评估师描述:{{ carDetail.cars && carDetail.cars.Pg_description}}
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                客户描述:{{ carDetail.cars && carDetail.cars.Description}}
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="图片">
          <el-tabs tab-position="left" style="overflow:auto">
            <el-tab-pane label="基本图片">
              <el-row :gutter="12">
                <el-col v-if="carDetail.carimages && img.imagetype === 101" :span="6" v-for="(img, index) in carDetail.carimages" :key="index">
                  <el-card>
                    <el-image 
                      fit="contain"  
                      :src="baseUrl + img.filename"
                      :preview-src-list="[baseUrl + img.filename]" >
                    </el-image>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="证件图片">证件图片</el-tab-pane>
            <el-tab-pane label="其他图片">
              <el-row :gutter="12">
                <el-col v-if="carDetail.carimages &&　img.imagetype === 0" :span="6" v-for="(img, index) in carDetail.carimages" :key="index">
                  <el-card>
                    <el-image 
                      fit="contain"  
                      :src="baseUrl + img.filename"
                      :preview-src-list="[baseUrl + img.filename]" >
                    </el-image>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="评估">
          <el-tab-pane label="静态检测">静态检测</el-tab-pane>
          <el-tab-pane label="动态检测">动态检测</el-tab-pane>
          <el-tab-pane label="非常规技术检测">非常规技术检测</el-tab-pane>
        </el-tab-pane>
        <el-tab-pane label="跟踪">
          跟踪
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog title="搜索车源" width="65%" :visible.sync="dialogSelectVisible">     
      <el-row>
        <!-- <el-col :span="8" style="text-align: left;">
          <el-input placeholder="请输入内容" v-model="input1">
            <template slot="prepend">Http://</template>
            <el-select clearable style="width:70%;" v-model="listQuery.IsPutOn" class="filter-item" filterable placeholder="上架状态">
              <el-option v-if="index != 0" v-for="(trans, index) in transmissionOptions" :key="index" :label="trans" :value="index"/>
            </el-select>
          </el-input>
        </el-col> -->
        <el-col v-if="!isAll" :span="4" style="text-align: center;">
          <div class="grid-content bg-purple">
            <!-- <div style="display:inline-block">
              <span>上架状态:</span>
            </div> -->
            <el-select clearable style="width:80%;" v-model="listQuery.IsPutOn" class="filter-item" filterable placeholder="上架状态">
              <!-- <template slot = "prefix">
                <span class = 'prefixSlot'>上架状态</span>
              </template> -->
              <el-option v-for="(sale, key, index) in onSaleConfig" :key="index" :label="sale" :value="key"/>
            </el-select>
          </div>
        </el-col>
        <el-col v-if="!isAll" :span="4" style="text-align: center;">
          <div class="grid-content bg-purple">
            <el-select clearable style="width:80%;" v-model="listQuery.Car_Status" class="filter-item" filterable placeholder="车源状态">
              <el-option v-for="(st, key, index) in carStatusConfig" :key="index" :label="st" :value="key"/>
            </el-select>
          </div>
        </el-col>
        <el-col  :span="4" style="text-align: center;">
          <div class="grid-content bg-purple">
            <el-select clearable style="width:80%;" v-model="listQuery.CarType" class="filter-item" filterable placeholder="车辆类型">
              <el-option v-for="(type, key, index) in carTypeConfig" :key="key" :label="type" :value="key"/>
            </el-select>
          </div>
        </el-col>
        <el-col v-if="!isAll" :span="4" style="text-align: center;">
          <div class="grid-content bg-purple">
            <el-select clearable style="width:80%;" v-model="listQuery.IsEval" class="filter-item" filterable placeholder="评估状态">
              <el-option v-for="(eva, key, index) in evalConfig" :key="index" :label="eva" :value="key"/>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4" style="text-align: center;">
          <div class="grid-content bg-purple">
            <el-select clearable style="width:80%;" v-model="listQuery.Out_color" class="filter-item" filterable placeholder="外观">
              <el-option  v-for="(color, key, index) in outColorOptions" :key="index" :label="color" :value="key"/>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4" style="text-align: center;">
          <div class="grid-content bg-purple">
            <el-select clearable style="width:80%;" v-model="listQuery.Transmission" class="filter-item" filterable placeholder="变速箱">
              <el-option v-if="index != 0" v-for="(trans, index) in transmissionOptions" :key="index" :label="trans" :value="index"/>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" style="text-align: center;">
          <div class="grid-content bg-purple">
            <el-select clearable style="width:30%;" v-model="brandLetter" class="filter-item" filterable placeholder="选择" @change="getBrandByLetter">
              <el-option v-for="(letter, index) in letterConfig" :key="index" :label="letter" :value="letter"/>
            </el-select>
            <el-select clearable style="width:60%;" v-model="listQuery.Factory" class="filter-item" filterable placeholder="品牌">
              <el-option  v-for="(bra, index) in brandList" :key="index" :label="bra.brand" :value="bra.brand"/>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8" style="text-align: center;">
          <div class="grid-content bg-purple">
            <el-input 
              placeholder="从"
              clearable 
              style="width:58%;" 
              v-model.number="listQuery.SaleAMTMin"
              class="filter-item">
              <template slot="prepend">价格(万)</template>
            </el-input>
            <el-input 
              placeholder="到"
              clearable 
              v-model.number="listQuery.SaleAMTMax"
              style="width:32%;" 
              class="filter-item">
            </el-input>
          </div>
        </el-col>
        <el-col :span="8" style="text-align: center;">
          <div class="grid-content bg-purple">
            <el-input 
              placeholder="从"
              clearable 
              style="width:58%;" 
              v-model.number="listQuery.MileageMin"
              class="filter-item">
              <template slot="prepend">里程(万)</template>
            </el-input>
            <el-input 
              placeholder="到"
              clearable 
              v-model.number="listQuery.MileageMax"
              style="width:32%;" 
              class="filter-item">
            </el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" style="text-align: center;">
          <div class="grid-content bg-purple">
            <el-date-picker
              v-model="listQuery.StarTime"
              type="date"
              style="width:45%;"
              placeholder="开始日期">
            </el-date-picker>
            <el-date-picker
              v-model="listQuery.EndTime"
              type="date"
              style="width:45%;"
              placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-col>
        <!-- <el-col :span="8" style="text-align: center;">
          <div class="grid-content bg-purple">
            <el-select clearable style="width:80%;" v-model="listQuery.IsPutOn" class="filter-item" filterable placeholder="排量">
              <el-option v-if="index != 0" v-for="(trans, index) in transmissionOptions" :key="index" :label="trans" :value="index"/>
            </el-select>
          </div>
        </el-col> -->
        <!-- <el-col :span="8" style="text-align: center;">
          <div class="grid-content bg-purple">
            <el-input 
              placeholder="从"
              clearable 
              v-model.number="listQuery.SaleAMTMin"
              style="width: 75px;" 
              class="filter-item">
              <template slot="prepend">过户次数</template>
            </el-input>
          </div>
        </el-col> -->
      </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelFilter">取 消</el-button>
        <el-button type="primary" @click="handleFilter">搜 索</el-button>
      </span>
    </el-dialog>
    <!-- 组件 -->
    <!-- <car-components ref="carChild"></car-components>  -->
  </div>
</template>
<script>
  import { getCarList, getCarInfo, createCar, updateCar, deleteCar} from '@/api/car'
  import { getBrandList } from '@/api/common'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime } from '@/utils'
  import { isEmpty } from '@/common.js'
  import { ROAST_CONFIG } from '@/config.js'
  import { transmissionConfig, outColorConfig, carStatusConfig, onSaleConfig, evalConfig,saleNumberConfig, carTypeConfig, letterConfig ,inColorConfig,safeTypeConfig}  from '@/config.js'
  // import CarComponents from './components/CarComponents'

const calendarTypeOptions = [
  { key: 'web', display_name: 'web' },
  { key: 'api', display_name: 'api' },
]

// arr to obj ,such as { web : "web", api : "api" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ListDeatil',
  // components: { CarComponents },
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'danger',
        4: 'warning',
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  props: {
    isAll: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      brandLetter: null,
      brandAll: [],
      brandList: [],
      showResetFilter: false,
      carDetail:{
        cars: null,
        shop: null,
        customer: null,
        carimages: null,
      },
      listQuery: {
        IsPutOn: null,
        CreateID: this.$store.getters.userId,
        PageIndex: 1,
        PageSize: 10,
        Code: "",
        IsEval: null,
        Shop_Id: this.$store.getters.shopId,
        CarType: null,
        Factory: "",
        Transmission: null,
        Out_color: null,
        Capacity: "0",
        Sale_number: null,
        StarTime: "",
        EndTime: "",
        MileageMin: "",
        MileageMax: "",
        SaleAMTMin: "",
        SaleAMTMax: "",
        Car_Status: '1',
        RoleName: this.$store.getters.roles[0],
        updatetime: ""
      },
      calendarTypeOptions,
      transmissionOptions: transmissionConfig,
      outColorOptions: outColorConfig,
      carStatusConfig,
      onSaleConfig,
      evalConfig,
      saleNumberConfig,
      letterConfig,
      carTypeConfig,
      inColorConfig,
      safeTypeConfig,
      baseUrl: ROAST_CONFIG.APP_URL,
      currentUserId:　this.$store.getters.userId,
      showReviewer: false,
      temp: {
        id: undefined,
        name: '',
        chart: null,
        cancreate : '1',
        discountrate : 0,
        paymenttype: '1',
      },
      dialogSelectVisible: false,
      dialogDetailVisible: false,
      setRateVisible: false,
      carName: '',
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      pvData: [],
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在3到5个字符', trigger: 'blur'},
        ],
        chart: [{ required: true, message: '请选择库存种类', trigger: 'change' }],
        quantitybreak: [ 
          { required: true, message: '折扣率', trigger: 'change'}, 
        ],
      },
      chartMasterList: [],
    }
  },
  created() {
    console.log('all', this.isAll)
    Promise.all([
      this.getList(),
      this.getAllBrand(),
      // this.getAllChartMasters(),
    ])
  },
  methods: {
    getList() {
      var _this = this
      _this.listLoading = true
      console.log(_this.listQuery)
      getCarList(_this.listQuery).then(response => {
        _this.list = response.Data.DataList
        _this.total = response.Data.Total
        // Just to simulate the time of the request
        setTimeout(() => {
          _this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    /*getAllChartMasters(){
      var _this = this
      chartMasterAll().then(response => {
        _this.chartMasterList = response.data
      })
    },*/
    getAllBrand(){ //获取所有品牌
      var _this = this
      getBrandList().then(response => {
        _this.brandAll = response.Data
        console.log(response)
      })
    },
    getBrandByLetter(){  //根据首字母确定品牌
      var _this = this
      _this.brandList = []
      _this.listQuery.Factory = null
      // console.log(_this.brandLetter)
      // console.log(_this.brandAll)
      _this.brandAll.forEach(function(ele,index){ //遍历全部车型数组,找出对应首字母
        if(ele.CarTypeMark == _this.brandLetter){
          console.log(ele);
          _this.brandList = _this.brandAll[index].BrandLst
          return true
        }
      })
      console.log(_this.brandList)
    },
    showSelect(){
      var _this = this
      _this.dialogSelectVisible = true
    },
    handleFilterQuick() { //快捷筛选
      var _this = this
      console.log(_this.listQuery)
      // return false
      _this.listQuery.PageIndex = 1
      _this.getList()
    },
    handleFilter() { //筛选
      var _this = this
      console.log(_this.listQuery)
      // return false
      _this.listQuery.PageIndex = 1
      _this.getList()
      _this.dialogSelectVisible = false
      _this.showResetFilter = true
    },
    cancelFilter(){ //取消筛选
      var _this = this
      _this.listQueryReset()
      _this.dialogSelectVisible = false
    },
    listQueryReset(){ //筛选重置
      var _this = this
      _this.listQuery = {
        IsPutOn: null,
        CreateID: this.$store.getters.userId,
        PageIndex: 1,
        PageSize: 10,
        Code: "",
        IsEval: null,
        Shop_Id: this.$store.getters.shopId,
        CarType: null,
        Factory: "",
        Transmission: null,
        Out_color: null,
        Capacity: "0",
        Sale_number: null,
        StarTime: "",
        EndTime: "",
        MileageMin: "",
        MileageMax: "",
        SaleAMTMin: "",
        SaleAMTMax: "",
        Car_Status: '1',
        RoleName: this.$store.getters.roles[0],
        updatetime: ""
      }
      _this.getList()
      _this.showResetFilter = false
    },
    handleSizeChange(val) {
      var _this = this
      _this.listQuery.limit = val
      _this.getList()
      _this.dialogSelectVisible = false
    },
    handleCurrentChange(val) {
      var _this = this
      _this.listQuery.PageIndex = val
      _this.getList()
    },
    handleModifyStatus(row, status) {
      var _this = this
      _this.$confirm('确定要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.temp = Object.assign({}, row)
        deleteCar(_this.temp).then((response) => {
          if(!response.data.status){
            _this.$notify({
              title: '失败',
              message: response.data.message,
              type: 'warning',
              duration: 8000
            })
          }else{
            const index = _this.list.indexOf(row)
            _this.list.splice(index, 1)
            _this.total = _this.total - 1
            _this.dialogFormVisible = false
            _this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          }   
        })
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    resetTemp() {
      var _this = this
      _this.temp = {
        id: undefined,
        name: '',
        chart: null,
        cancreate : '1',
        discountrate : 0,
        paymenttype: '1',
      }
    },
    handleCreate() {
      var _this = this
      _this.resetTemp()
      _this.dialogStatus = 'create'
      _this.dialogFormVisible = true
      _this.$nextTick(() => {
        _this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      var _this = this
      _this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createCar(_this.temp).then((response) => {
            const response_data = response.data
            if(response_data.status){
              _this.temp.id = response_data.data.id
              _this.list.unshift(response_data.data)
              _this.total = _this.total + 1
              _this.dialogFormVisible = false
              _this.$notify({
                title: '成功',
                message: response_data.message,
                type: 'success',
                duration: 2000
              })
            }else{
              _this.$notify.error({
                title: '失败',
                message: response_data.message,
                duration: 2000
              })
            }
            
          })
        }
      })
    },
    handleUpdate(row) {
      var _this = this
      row.chart = parseInt(row.chart)
      _this.temp = Object.assign({}, row) // copy obj
      _this.dialogStatus = 'update'
      _this.dialogFormVisible = true
      _this.$nextTick(() => {
        _this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      var _this = this
      _this.$refs['dataForm'].validate((valid) => {
        if (valid) {       
          const tempData = Object.assign({}, _this.temp)
          updateCar(tempData).then((response) => {
            const response_data = response.data
            if(response_data.status){
              for (const v of _this.list) {
                if (v.id === _this.temp.id) {
                  const index = _this.list.indexOf(v)
                  _this.list.splice(index, 1, response_data.data)
                  break
                }
              }
              _this.dialogFormVisible = false
              _this.$notify({
                title: '成功',
                message: response_data.message,
                type: 'success',
                duration: 2000
              })
            }else{
              _this.$notify.error({
                title: '失败',
                message: response_data.message,
                duration: 2000
              })
            }
          })
        }
      })
    },
    handleShow(row) {
      var _this = this
      /*_this.temp = Object.assign({}, row) // copy obj
      console.log(_this.temp)*/
      console.log(row)
      getCarInfo(row.ID).then(response => {
        console.log(response)
        _this.carDetail = response.Data
        _this.dialogDetailVisible = true
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '未获取车源信息,请刷新后重试'
        });          
      })
   
    },
    handleSetChild(row){
      var _this = this
      _this.$refs.carChild.handleStockCategory(row) 
    },
  }
}
</script>
<style>
  .el-select /deep/ .el-input--prefix .el-input__inner {
    padding-left: 50%;
  }
  .el-input-group__prepend{
    padding: 0 10px;
  }
  .el-dialog__body {
    padding: 10px 20px;
  }
</style>
<style lang="scss" scoped>
  .prefixSlot{
    height: 36px;
    width: 90px;
    display: block;
    line-height: 36px;
    border-right: 1px solid #f1f1f1;
  }
  .el-dialog__body {
    padding: 15px 15px;
  }
  .el-dialog__header {
     padding-top: 10px; 
  }
  .el-form-item{
    margin-bottom: 15px;
  }
  .el-row {
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    margin-bottom:5px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }white
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 16px;
  }
  .row-bg {
    padding: 5px 0;
    background-color: #f9fafc;
  }
  .self-style{
    text-align: -webkit-center;
    font-size: 14px;
    padding: 5px 0px;
  }
</style>