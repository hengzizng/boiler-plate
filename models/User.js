/* mongoose module을 가져온다 */
const mongoose = require('mongoose');
/* bcrypt module을 가져온다 */
const bcrypt = require('bcrypt');
const saltRounds = 10;
/* jsonwebtoken module을 가져온다 */
var jwt = require('jsonwebtoken');

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
userSchema.pre('save', function (next) {
    // 비밀번호를 암호화시킨다.

    /* 사용자가 입력한 비밀번호를 가져오기 위한 변수 */
    var user = this;

    /* 다른 정보가 아닌 password가 수정될 때만 암호화 작업 실행 */
    if (user.isModified('password')) {
        /**
         * npmjs.com/package/bcrypt 참고
         * genSalt로 salt 만듦
         * next()로 아래 코드의 다음 단계인 save 실행
         */
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);
            /** 
             * user.password : 사용자가 입력한 그대로의 비밀번호(PlainPassword)
             * hash : 암호화된 비밀번호
             */
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else { /* 다른 정보가 수정될 때는 바로 다음으로 넘어감(next()를 쓰지 않으면 현재 함수에서 멈춰있음) */
        next();
    }

})

/** 
 * userSchema를 가져와서 comparePassword 메소드 만듦
 * cb : callback
 */
userSchema.methods.comparePassword = function (plainPassword, cb) {
    // plainPassword 1234567    암호화된 비밀번호 $2b$10$hs/0yyBsUnyDDEv.j38s0OrCsSokxr1J5kICObGFO0ZFchbNYAMY.
    /* 암호화된 비밀번호를 복구하는것은 불가하기 때문에 plainPassword를 암호화해서 암호화된 비밀번호화 비교 */
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        /* 비밀번호가 같지 않으면 */
        if (err) return cb(err);
        /* 비밀번호가 같다면 err는 null이고 isMatch는 true => index.js의 comparePassword 함수를 호출한 부분으로 넘어감 */
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function (cb) {
    var user = this;
    // jsonwebtoken을 이용해서 token을 생성하기
    /** 
     * user._id : DB의 _id
     * user._id + 'secretToken' = token 이므로
     * token을 해석할 때 'secretToken'을 넣으면 user._id를 얻을 수 있다
     * sign 함수는 user._id의 plain object를 필요로 하므로 toHexString() 추가
     */
    var token = jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    });
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this.Number
    
    // 토큰을 decode 한다.
    /**
     * generateToken 시 사용한 'secretToken'을 사용
     * user._id + 'secretToken' = token 이므로
     * decoded = user._id
     */
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 아이디를 이요해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        /* findOne : mongoDB method (user id와 token을 사용해 찾는다.) */
        user.findOne({ "_id" : decoded, "token": token }, function (err, user) {
            /* 에러가 있으면 콜백으로 전달 */
            if (err) return cb(err);
            /* 에러가 없다면 콜백으로 유저 정보를 전달 */
            cb(null, user)
        })
    })
}


/* schema를 감싸주는 model */
const User = mongoose.model('User', userSchema);

/* User model을 다른곳에서도 사용할 수 있도록 export해준다 */
module.exports = { User };