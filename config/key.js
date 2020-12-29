if(process.env.NODE_ENV === 'production') { /* 배포(deploy) 한 후에는 prod.js 사용 */
    module.exports = require('./prod');
} else { /* local 환경에서는(process.env.NODE_ENV = 'development') dev.js 사용 */
    module.exports = require('./dev');
}