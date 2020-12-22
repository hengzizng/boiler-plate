const express = require('express')
/* express module을 가져온다 */
const app = express()
/* express module의 function을 이용해서 새로운 express app을 만든다 */
const port = 5000
/* 5000번 포트를 백서버로 둔다 */

app.get('/', (req, res) => res.send('Hello World!'))
/* root directory에 오면 Hello World! 출력
   브라우저 주소에 localhost:5000/ 입력하면 확인가능 */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
/* port 5000번에서 app 실행
   app이 5000에 listen을 하면 console print */