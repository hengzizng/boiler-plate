## package.json 설명    
---
### "scripts"
+ "start": "node index.js"    
  - start를 하면 node앱을 실행, 실행할 때 시작점은 index.js    
  - ```npm run start``` 명령어를 통해 실행    
* "backend": "nodemon index.js"    
  - backend를 하면 nodemon을 통해 앱을 실행, 실행할 때 시작점은 index.js
  - ```npm run backend``` 명령어를 통해 실행    

### "devDependencies"    
+ "nodemon"    
  - "dependencies" 가 아닌 "devDependencies" 에 위치한 이유는 
  ```npm install nodemon --save-dev``` 명령어에서 -dev가 붙었기 때문    
    
    
    
### npm 명령어 하나하나 기억하기 위해 gitignore 사용하지 않음    

