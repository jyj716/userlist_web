var express = require('express') //라이브러리 가져다 씀 문자열''로 라이브러리명 혹은 파일명

var app = express()
var port = 8000
app.listen(port, function(){
    console.log(`Server is Running at http://localhost:8080`)
})