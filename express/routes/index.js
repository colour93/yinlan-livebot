
// 引入库
const express = require('express');

const { version, publish } = require('../../temp/version.json');

const config = require('../../config.json');

// 初始化路由
const router = express.Router();

router.get('/', async (req, res) => {

    const status = config.link ? 'active' : 'uninitialized';
    
    res.send({
        status,
        yinlan: 'livebot',
        version,
        publish,
        uwu: 'Made with ♥ by colour93',
        doc: 'https://livebot.yinlan.furbot.icu',
        repo: 'https://github.com/colour93/yinlan-livebot'
    })
});

router.use('/transfer', require('./transfer'))

if (config.link) {
    if (process.env.dev) {
        router.use('/dash', require('./dash'));
    } else {
        router.use('/dash', require('../middlewares/auth'), require('./dash'));
    }
    router.use('/auth', require('./auth'))
} else {
    router.use('/welcome', require('./welcome'));
}


module.exports = router;