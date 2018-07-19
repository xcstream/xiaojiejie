var fs=require('fs')

app.use('/list',(_,res)=>fs.readdir('public/draw',(err,files)=>res.send(err?{code:500,msg:err}:{code:200,info:files})))
