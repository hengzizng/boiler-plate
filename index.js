/* express module을 가져온다 */
const express = require('express')
/* express module의 function을 이용해서 새로운 express app을 만든다 */
const app = express()
/* 5000번 포트를 백서버로 둔다 */
const port = 5000
/* body-parser를 가져온다 */
const bodyParser = require('body-parser');
/* User model을 가져온다 */
const { User } = require("./models/User");
/* key.js를 가져온다 */
const config = require('./config/key')


/* body-parser의 옵션을 준다 */
// application/x-www-form-urlencoded 로 된 데이터를 분석해서 가져올 수 있도록
app.use(bodyParser.urlencoded({extended: true}));
// application/json type의 데이터를 분석해서 가져올 수 있도록
app.use(bodyParser.json());


/* mongoose module을 가져온다 */
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
   /* 안쓰면 에러 발생 */
   useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
   /* MongoDB 연결 성공/실패 시 동작 */
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


/* root directory에 오면 Hello World! 출력
   브라우저 주소에 localhost:5000/ 입력하면 확인가능 */
app.get('/', (req, res) => res.send('Hello World!'))


/* 회원가입을 위한 Register Route 만들기
   Route의 Endpoint : /register
   callback function : request, response */
app.post('/register', (req, res) => {
   // 회원가입할 때 필요한 정보들을 client에서 가져오면
   // 그것들을 데이터베이스에 넣어준다.

   /* req.body 에는 json 형식으로 데이터들이 들어있는데
      이 데이터들은 body-parser가 client의 정보를 받아준 것  */
   const user = new User(req.body)

   /* save() : mongoDB에서 오는 method, 정보들이 user model에 저장됨
      err, userInfo : callback function */
   user.save((err, userInfo) => {
      /* 저장할 때 에러가 있으면 client에 에러 있다고 json 형식으로(에러 메시지 포함) 전달 */
      if(err) return res.json({ success: false, err})
      /* status(200)는 성공 의미 */
      return res.status(200).json({
         success: true
      })
   } )
})

/* port 5000번에서 app 실행
   app이 5000에 listen을 하면 console print */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))