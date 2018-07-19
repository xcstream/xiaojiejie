var fs=require('fs')

app.use('/list',(_,res)=>fs.readdir('public/draw',(err,files)=>res.send(err?{code:500,msg:err}:{code:200,info:files})))
app.use('/save',(req,res)=>{
    var name = req.body.name
    var content = req.body.content
    fs.writeFileSync('public/draw/'+name, content)
    res.send({code:200})
})