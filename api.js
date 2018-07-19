var fs=require('fs')
app.use('/test',(req,res)=>{
    res.send({code:200})
})
app.use('/list',(req,res)=>{
    fs.readdir(__dirname + '/draw/', (err, files) =>{
        res.send(err?{code:500,msg:err}:{code:200,info:files})
    })
})
