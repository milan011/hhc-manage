/**
 * Defines the API route we are using.
 */
var api_url = 'http://testapi.simaxian.com/api';
// var api_url = 'http://www.mycnc.net/api';
var app_url = 'http://www.mycnc.net';
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

//车源状态
const carStatus = {
  0: '废弃',
  1: '正常', 
  4: '已交易',
}
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
    carStatus,
}

/*export const zrConfig = {
    infoSelfStatus: infoSelfStatus,
    jituanStatus: jituanStatus,
};*/
