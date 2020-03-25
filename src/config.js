/**
 * Defines the API route we are using.
 */
var api_url = 'http://testapi.simaxian.com/api';
// var api_url = 'http://www.mycnc.net/api';
var app_url = 'http://testapi.simaxian.com/';
/*var api_url = 'http://www.erpwm.com/api';
var app_url = 'http://www.erpwm.com';*/
/*var gaode_maps_js_api_key = '33c20882595f1fecc2d31c8c73a38da7';

switch( process.env.NODE_ENV ){
    case 'development':
        api_url = 'http://roast.test/api/v1';
        app_url = 'http://roast.test';
        break;
    case 'production':
        api_url = 'http://roast.demo.laravelacademy.org/api/v1';
        app_url = 'http://roast.demo.laravelacademy.org';
        break;
}*/
const ROAST_CONFIG = {
    API_URL: api_url,
    APP_URL: app_url,
    // GAODE_MAPS_JS_API_KEY: gaode_maps_js_api_key
};

//变速箱
const transmissionConfig = ['不限', '手动', '自动'];

//上架
const onSaleConfig = {
  0: '未上架',
  1: '上架',
};

//车辆类型
const carTypeConfig = {
  1:'轿车',
  2:'SUV',
  3:'面包',
  4:'客车',
  5:'货车',
  6:'MPV',
};

//过户次数
const saleNumberConfig = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
};

//评估状态
const evalConfig = {
  0: '未评估',
  1: '已评估',
};

//外观颜色
const outColorConfig = {
  0: '其他',
  1: '黑', 
  2: '白',
  3: '银白',
  4: '红',
  5: '蓝',
  6: '银',
  7: '橙',
  8: '深灰',
  9: '香槟金',
  10: '灰',
  11: '棕',
  12: '绿',
  13: '紫',
};

//内饰
const inColorConfig = {
  1: '深色',
  2: '浅色',
  3: '其他',
};

//保险

const safeTypeConfig = {
  1:'交强险+商业险',
  2:'交强险',
  3:'商业险',
  4:'其它',
};

//车源状态
const carStatusConfig = {
  '0': '废弃',
  '1': '正常', 
  '4': '已交易',
}

//排量
const cipycityConfig = {
  '0': '不限',
  '1': '0.8L',
  '2': '1.0L',
  '3': '1.0T',
  '4': '1.2L',
  '30' :'1.2T',
  '23' :'1.3L',
  '29' :'1.3T',
  '5': '1.4L',
  '6': '1.4T',
  '7': '1.5L',
  '8': '1.5T',
  '9': '1.6L',
  '10': '1.6T',
  '11': '1.8L',
  '12': '1.8T',
  '13': '2.0L',
  '14': '2.0T',
  '15': '2.2L',
  '26': '2.2T',
  '25': '2.3L',
  '31': '2.3T',
  '16': '2.4L',
  '17': '2.4T',
  '18': '2.5L',
  '27': '2.7L',
  '22': '2.8L',
  '33': '2.8T',
  '19': '3.0L',
  '24': '3.0T',
  '20': '3.5L',
  '28': '3.8L',
  '21': '4.0L',
  '34': '4.2L',  
  '32': '4.8L',
};

const letterConfig = ['A','B','C','D','F','G','H','J','K','L','M','N','O','Q','R','S','T','V','W','X','Y','Z']

/*const carStatus = [
  {'key': '1', 'day': '星期一'},
  {'key': '2', 'day': '星期二'},
  {'key': '3', 'day': '星期三'},
  {'key': '4', 'day': '星期四'},
  {'key': '5', 'day': '星期五'},
  {'key': '6', 'day': '星期六'},
  {'key': '0', 'day': '星期天'},
]*/

export { 
    ROAST_CONFIG, 
    transmissionConfig,
    outColorConfig,
    carStatusConfig,
    onSaleConfig,
    evalConfig,
    saleNumberConfig,
    carTypeConfig,
    cipycityConfig,
    letterConfig,
    inColorConfig,
    safeTypeConfig,
}

/*export const zrConfig = {
    infoSelfStatus: infoSelfStatus,
    jituanStatus: jituanStatus,
};*/
