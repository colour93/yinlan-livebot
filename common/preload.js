/**
 * 初始化的预处理
 */

const logger = require('npmlog');
const axios = require('axios');

const { configDB } = require('../db');

module.exports = async function () {

    // 读取环境变量
    if (process.env.NODE_ENV == 'development') process.env.dev = 1;
    if (process.env.dev) {
        logger.info("当前为开发环境");
        logger.warn("开发环境下身份验证将被禁用");
    }

    // 清空状态数据库
    configDB.prepare(`UPDATE statusConfig SET value = 0;`).run();

    // 设置默认 axios
    axios.default.withCredentials = true;

    startTimer();
}


/**
 * 标注启动时间
 */
function startTimer() {
    const ts = (new Date()).getTime();
    changes = configDB.prepare("UPDATE numberConfig SET value = ? WHERE key = 'startTime';").run(ts).changes;
    if (changes) logger.info("已记录启动时间");
    return;
}