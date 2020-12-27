/* express module을 가져온다 */
const express = require('express')
/* express module의 function을 이용해서 새로운 express app을 만든다 */
const app = express()
/* 5000번 포트를 백서버로 둔다 */
const port = 5000


/* mongoose module을 가져온다 */
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://hyejikim:1234@boilerplate.zebjf.mongodb.net/<dbname>?retryWrites=true&w=majority', {
   /* 안쓰면 에러 발생 */
   useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
   /* MongoDB 연결 성공/실패 시 동작 */
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


/* root directory에 오면 Hello World! 출력
   브라우저 주소에 localhost:5000/ 입력하면 확인가능 */
app.get('/', (req, res) => res.send('Hello World!'))
/* port 5000번에서 app 실행
   app이 5000에 listen을 하면 console print */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))