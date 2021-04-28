const { User } = require("../models/User");

let auth = (req, res, next) => {
    // 인증처리를 하는 곳

    // 클라이언트 쿠키에서 x_auth 토큰을 가져온다.
    let token = req.cookies.x_auth;

    // 토큰을 복호화한 후 유저를 찾는다.
    /* findByToken : User.js 내 함수 */
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        // 유저가 없으면 인증 no
        if (!user) return res.json({ isAuth: false, error: true })

        // 유저가 있으면 인증 ok
        req.token = token;
        req.user = user;
        /* auth는 미들웨어이므로 다음 단계로 갈 수 있도록 next 써준다. */
        next();
    })


}

/* module.exports : 다른 파일에서도 사용할 수 있도록 해준다. */
module.exports = { auth };