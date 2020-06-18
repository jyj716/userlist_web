var express = require("express");
var mysql = require("mysql")
// var x = express() 대신 router메소드를 실행시킴.
// 추측 : router가 미들웨어로서 동작하기 때문에 다른데서 호출할 때 get, post를 사용하기 위해 존재하는 듯.
var router = express.Router()


sql_config = {
    host:'localhost',
    user:"root",
    password:"1234",
    database:"o2" // 설정해놓은 데이터 베이스 이름
}


var db = mysql.createConnection(sql_config)
router.get('/topic/add', (req, res)=>{
    var sql = 'SELECT * FROM topic'
    db.query(sql, (err, result)=>{
        if(err){
            console.log(err)
            res.status(500).send("intenal Server Error")
        } else {
            console.log(result)
            res.render("add", {topics:result})
        }
    })
})


// post : 홈페이지에서 무언가를 실행시켜서 동작시킬때(여기서는 제출) 어떤 반응을 보일 것인가.
router.post('/topic/add', (req, res)=>{
    var title = req.body.title 
    var description = req.body.description
    var author = req.body.author
    console.log(`title은 ${title} 설명은 ${description} 글쓴이는 ${author}`)
    var sql = 'INSERT INTO topic (title, description, author)  VALUES (?,?,?)'
    var queryData = [title, description, author]
    // db에 무언가 넣어줘야 할때 query문과 callback함수 사이에 넣어준다.
    db.query(sql,  queryData, (err, result)=>{
        if(err){
            console.log(err)
            res.status(500).send("internal Server Error")
        } else {
            console.log(result)
            res.redirect('/topic/add')
            // res.send("<h1>success</h1>")
        }
    })
})


router.get(['/topic','/topic/:id'], (req, res)=>{
    var sql =`SELECT * FROM topic`
    db.query(sql, (err, results)=>{
        var id = req.params.id
        if(id){
            var sql = `SELECT * FROM topic WHERE id= ${id}`
            console.log(id)
            db.query(sql, (err, result)=>{
                if(err) {
                    console.log(err)
                } else {
                    console.log(result[0])
                    res.render('view',{topics : results, topic : result[0]})
                }
            })
        } else {
            res.render('view',{topics : results, topic : undefined})
        }
    })
})
// 미들웨어로 등록 ... 다른곳에서 import할 수 있게
module.exports = router;