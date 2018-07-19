var fs=require('fs')

const { spawn } = require('child_process');


app.use('/list',(_,res)=>fs.readdir('public/draw',(err,files)=>res.send(err?{code:500,msg:err}:{code:200,info:files})))
app.use('/save',(req,res)=>res.send(fs.writeFileSync('public/draw/'+req.body.name,req.body.content)||{code:200}))

app.use('/payadb',(req,res)=>{

    function modx(x) {
        return x*2+10
    }

    function mody(y) {
        return y*2+500
    }

    var name = req.body.name
    var text = fs.readFileSync('public/draw/' +name).toString()
    console.log(text)

    var obj = JSON.parse(text)
    const adb = spawn('adb', ['shell']);
    var cmd = ''

    for (var i=0; i<obj.length-1; i++){
        var x1=modx( obj[i].mouseX )
        var y1=mody( obj[i].mouseY )
        var x2=modx( obj[i+1].mouseX )
        var y2=mody( obj[i+1].mouseY )
        if(x1 && y1 && x2 && y2){
            cmd += `input swipe ${x1} ${y1} ${x2} ${y2}\n`
        }
    }

    console.log(cmd)
    setTimeout(function () {
        adb.stdin.write(cmd)
    },200)
    adb.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    adb.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    adb.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

    res.send({code:200})

})