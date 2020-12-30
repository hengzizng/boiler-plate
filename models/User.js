/* mongoose module을 가져온다 */
const mongoose = require('mongoose');
/* bcrypt module을 가져온다 */
const bcrypt = require('bcrypt')
const saltRounds = 10

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

/* User 객체의 .save() 를 실행하기 전에 실행하는 부분(next를 통해 다음 부분으로 넘어감) */
userSchema.pre('save', function( next ){
    // 비밀번호를 암호화시킨다.

    /* 사용자가 입력한 비밀번호를 가져오기 위한 변수 */
    var user = this;

    /* 다른 정보가 아닌 password가 수정될 때만 암호화 작업 실행 */
    if(user.isModified('password')) {
        /* npmjs.com/package/bcrypt 참고
           genSalt로 salt 만듦
           next()로 아래 코드의 다음 단계인 save 실행 */
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if(err) return next(err)
            /* user.password : 사용자가 입력한 그대로의 비밀번호(PlainPassword)
               hash : 암호화된 비밀번호 */
            bcrypt.hash(user.password, salt, function (err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    }

})

/* schema를 감싸주는 model */
const User = mongoose.model('User', userSchema)

/* User model을 다른곳에서도 사용할 수 있도록 export해준다 */
module.exports = {User}