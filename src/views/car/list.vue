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
        v-model.number="listQuery.SaleAMTMin"
        style="width: 75px;" 
        class="filter-item">
      </el-input>
      <!-- <el-input-number v-model="listQuery.SaleAMTMin" @change="" :min="1" :max="10" label="价格"></el-input-number> -->
      <el-select clearable style="width:100px;" v-model="listQuery.Transmission" class="filter-item" filterable placeholder="变速箱">
        <el-option v-if="index != 0" v-for="(trans, index) in transmissionOptions" :key="index" :label="trans" :value="index"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <!-- <el-tooltip class="item" effect="dark" content="注意:默认只导出当月信息,如需导出其他月,请选择筛选条件" placement="top">
        <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
      </el-tooltip> -->
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
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
            <span>{{ carStatus[scope.row.Car_Status] }}</span>
          </el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('car.cancreate')" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          <span>
            <el-tag :type="scope.row.cancreate | statusFilter">
              {{ cancreateStatus[scope.row.cancreate] }}
            </el-tag>
          </span>
        </template>
      </el-table-column> -->
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
      <el-table-column :label="$t('table.actions')" :resizable="false" align="center" width="230%" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handleShow(scope.row)">
            {{ $t('table.show') }}
          </el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">
            {{ $t('table.edit') }}
          </el-button>
          <!-- <el-button type="success" size="mini" @click="handleSetChild(scope.row)">
            {{ $t('table.setOrther') }}
          </el-button> -->
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :total="total" background layout="total, prev, pager, next" @current-change="handleCurrentChange" />
    </div>
    <!-- <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="150px" style="width: 400px;margin:0px auto;">
        <el-form-item :label="$t('car.name')" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item :label="$t('car.chart')" prop="chart">
          <el-select 
            v-model="temp.chart" 
            class="filter-item" 
            filterable 
            clearable 
            placeholder="输入区域搜索">
            <el-option v-for="chart in chartMasterList" :key="chart.id" :label="chart.chartdescription" :value="chart.id"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('car.paymenttype')">
          <el-radio-group @change="" v-model="temp.paymenttype">
            <el-radio-button label="1">次月截止</el-radio-button>
            <el-radio-button label="2">N天后截止</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('temp.cancreate')">
          <el-switch
            v-model="temp.cancreate"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0">
          </el-switch>
        </el-form-item>
        <el-form-item :label="$t('temp.discountrate')" prop="discountrate">
          <el-input-number 
            v-model='temp.discountrate'   
            :min="0" 
            :max="1" 
            :precision="2"
            :step="0.1"
            label="折扣率">
          </el-input-number>
        </el-form-item>  
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{ $t('table.confirm') }}</el-button>
        <el-button v-else type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog> -->
    <!-- 组件 -->
    <!-- <car-components ref="carChild"></car-components>  -->
  </div>
</template>
<script>
  import { getCarList,  createCar, updateCar, deleteCar} from '@/api/car'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime } from '@/utils'
  import { isEmpty } from '@/common.js'
  import { transmissionConfig, outColorConfig, carStatus }  from '@/config.js'
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
  name: 'car',
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
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        IsPutOn: "-1",
        CreateID: this.$store.getters.userId,
        PageIndex: 1,
        PageSize: 10,
        Code: "",
        IsEval: "-1",
        Shop_Id: this.$store.getters.shopId,
        CarType: "0",
        Factory: "",
        Transmission: null,
        Out_color: "0",
        Capacity: "0",
        Sale_number: "-1",
        StarTime: "",
        EndTime: "",
        MileageMin: "",
        MileageMax: "",
        SaleAMTMin: "",
        SaleAMTMax: "",
        Car_Status: "1",
        RoleName: this.$store.getters.roles[0],
        updatetime: ""
      },
      calendarTypeOptions,
      transmissionOptions: transmissionConfig,
      outColorOptions: outColorConfig,
      carStatus,
      showReviewer: false,
      temp: {
        id: undefined,
        name: '',
        chart: null,
        cancreate : '1',
        discountrate : 0,
        paymenttype: '1',
      },
      dialogFormVisible: false,
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
    Promise.all([
      this.getList(),
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
        _this.total = response.Data.total
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
    handleFilter() {
      var _this = this
      _this.listQuery.page = 1
      _this.getList()
    },
    handleSizeChange(val) {
      var _this = this
      _this.listQuery.limit = val
      _this.getList()
    },
    handleCurrentChange(val) {
      var _this = this
      _this.listQuery.page = val
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
      row.taxprovinceid = row.belongs_to_taxprovinces.taxprovincename
      row.cashsalebranch = row.belongs_to_custbranch.brname
      row.cashsalecustomer = row.belongs_to_debtors_master.name
      _this.temp = Object.assign({}, row) // copy obj
      console.log(_this.temp)
      _this.dialogInfoVisible = true
    },
    handleSetChild(row){
      var _this = this
      _this.$refs.carChild.handleStockCategory(row) 
    },
  }
}
</script>
<style lang="scss" scoped>
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