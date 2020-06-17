var express = require('express') //라이브러리 가져다 씀 문자열''로 라이브러리명 혹은 파일명
var path = require('path')
var mysql = require('mysql')
var apiRouter = require('./routes/api_router')

var app = express()

var db = mysql.createConnection(sql_config)

//set메소드 - 초기한번세팅
//use메소드 - 미들웨어 등록
app.set('views', path.resolve(__dirname+ '/views'))//__dirname 절대경로
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/', apiRouter)
//use인자값에 사용할 것들 등록
/////////////////////////////////////////////////
app.get('/hello',(request,response)=>{ //첫 매개변수는 요청한거 보냄 뒤 매개변수는 반응
    //console.log(request)
    var name = "AAA"
    response.render('hello.ejs',{data:name})//파일을 보낼 때 사용
})//첫 인자값은 기본경로 localhost에 '/hello'
/////////////////////////////////////////////////
app.get('/data',(req,res)=>{
    var sql = 'SELECT * FROM topic'
    db.query(sql,(err, result)=>{
        if(err){
            console.log(err)
        } else{
            //console.log(result[0].description)
            //res.send(result[0].author+"수업은 "+result[0].description)
            //res.send(`${result[0].author} 수업은 ${result[0].title}`)
            res.render('data.ejs',{data:result})
        }

    })

})
///////////////////////////////////////////////////
//console.log(path.join(__dirname ,'/views'))
var port = 8000
//express라이브러리로 서버열기
app.listen(port, ()=>{
    console.log(`Server is Running at http://localhost:${port}`)
})