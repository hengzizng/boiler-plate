/* mongoose module을 가져온다 */
const mongoose = require('mongoose');

/* 가져온 mongoose를 이용해 schema 생성 */
const userSchema = mongoose.Schema({
    /* 필드 작성 */
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { /* user가 관리자일수도, 일반 사용자일수도 있음 */
        type: Number,
        default: 0
    },
    image: String,
    token: { /* token을 이용해 유효성 관리 */
        type: String
    },
    tokenExp: { /* token의 유효기간 */
        type: Number
    }
})

/* schema를 감싸주는 model */
const User = mongoose.model('User', userSchema)

/* User model을 다른곳에서도 사용할 수 있도록 export해준다 */
module.exports = {User}