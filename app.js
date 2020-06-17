var express = require('express') //라이브러리 가져다 씀 문자열''로 라이브러리명 혹은 파일명
var path = require('path')
var app = express()
//set메소드 - 초기한번세팅
//use메소드 - 미들웨어 등록
app.set('views', path.resolve(__dirname+ '/views'))//__dirname 절대경로
app.set('view engine', 'ejs')

app.use(express.urlencoded())
app.use(express.json())
//use인자값에 사용할 것들 등록

app.get('/hello',(request,response)=>{ //첫 매개변수는 요청한거 보냄 뒤 매개변수는 반응
    //console.log(request)
    response.render('hello.ejs')

})//첫 인자값은 기본경로 localhost에 '/hello'

//console.log(path.join(__dirname ,'/views'))
var port = 8000
//express라이브러리로 서버열기
app.listen(port, ()=>{
    console.log(`Server is Running at http://localhost:8080`)
})