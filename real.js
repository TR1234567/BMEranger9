
const tf =require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const fs = require('fs')
var Cat = require("./model/cat");
var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/testdb', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express()
app.listen(80, () => console.log(`Example app listening on port`))
const csv = fs.readFileSync('sanam.csv','utf8')
function csvToArray (csv) {
    rows = csv.split("\n");

    return rows.map(function (row) {
    	return row.split(";");
    });
};



var array = csvToArray(csv);
//console.log(a[0])
 array.splice(0,1)
 //console.log(array[365])
 array.splice(365,1)
 //console.log(array.length)
for(i in array)
array[i] = array[i].map(Number)

for(i in array){
    
    array[i].splice(0,6)
}
for(i in array){
    
    array[i].splice(16,3)
}
//console.log(array[0])

var newarr = []
for(i in array ){
 for(let j = 0;j<array[0].length;j++)
     newarr.push(array[i][j])
 }



 function findmax(array){
        var maxval = array[0]
        for(i in array)
             {
             if(array[i] > maxval)
             maxval = array[i]
             }
             return maxval;
            }
            function findmin(array){
                var minval = array[0]
                for(i in array)
                     {
                     if(array[i] < minval)
                     minval = array[i]
                     }
                     return minval;
                    }           
 const max = findmax(newarr)
 const min = findmin(newarr)
 function normal(max,min){
    for(j in newarr)
         {
            
                 newarr[j] = (newarr[j]-min)/(max-min)

         }
         return  newarr
 }
  newarr = normal(max,min)


function seperatein(newarr){
    var temp = [];
    var arrayin = [];
    var count = 0;
    for(let i = 0;i<newarr.length;i++){
        if(count == 5){
            arrayin.push(temp)
            temp = [];
            i = i+2;
            count = 0;
        }
        else{
             temp.push(newarr[i]);
             count = count +1;
        }
    }
   return arrayin             
}


function seperateout(newarr){
    var temp = []
    var count = 0 ;
    var arrayout = [];
    for(let i=4;i<newarr.length;i++){
     if(count == 3){
         arrayout.push(temp)
         temp = [];
         count = 0
         i = i+4
     }
     else{
         temp.push(newarr[i])
         count = count+1;
        
     }
    }
      
    return arrayout 
}

const arrayin = seperatein(newarr)
//console.log(arrayin[0])
const arrayout = seperateout(newarr)
//console.log(arrayout[0])

//  var arrayin = []
// var arrayout =[]
//   var nub =0
//   var arraytemp = []
//   var arrayt = []

// for(let i=0;i<newarr.length;i++ ){
//      if(nub == 5){
//         arrayt.push(newarr[i]);
//            i++;
//         arrayt.push(newarr[i]);
//            i++
//         arrayt.push(newarr[i]);
           
//         arrayin.push(arraytemp);
//         arrayout.push(arrayt);
//      arraytemp = []
//      nub =0 ;
//      }
//      else{
//      arraytemp.push(newarr[i]);
//      arrayt =[]
//      nub ++;

//      }
//  }
//console.log(arrayin.length)

const model = tf.sequential();

model.add(tf.layers.lstm({      // add one hiddenlayer   //lstm is atype of layer 
    units: 50,
    inputShape: [5,1],      // dimension  include number of timestep  and the dimension of value such as [1,2,3] have 3  step and 1 dimension value
    returnSequences: false   // true = return , false =not return
}));

model.add(tf.layers.dropout(0.5));


model.add(tf.layers.dense({      //สร้างเส้นเชื่อมระหว่าง node
    units: 3 ,                // จะให้ออกมากี่ค่า
    kernelInitializer: 'VarianceScaling', // random weigth 
    activation: 'relu'                    // ใส่ function ปรับค่า ex. Relu ปรับค่าที่น้อยกว่า 0 เป้น 0
}));


const LEARNING_RATE = 0.001;                            
const optimizer = tf.train.adam(LEARNING_RATE); 


model.compile({
    optimizer: optimizer,                
    loss: 'meanSquaredError',    // ตัววัด errror ตัวปรับ weigh
    metrics: ['accuracy'],
});

async function main(){
	async function trainModel(){
        const history = await model.fit(    //train model 
            trainXS,
            trainYS,
            {
                batchSize: 5,      // train ครั้งนึงกี่ก้อนต่อ 1 รอบ ex. [1,2,3]  คือ 1 ก้อน
                epochs: 40,       // train กี่รอบ
                shuffle:true,       // ดึงแบบ random หรือไม่
                validationSplit: 0.2  // เป็นการใส่จำนวนข้อมูล  test เพื่อ เทียบความแม่นกับ train 
            });
    }

    trainXS =  tf.tensor2d(arrayin)
    trainXS =  tf.reshape(arrayin,[-1,5,1])
    trainYS = tf.tensor2d(arrayout)
    trainYS =  tf.reshape(arrayout,[-1,3])
   // trainYS = tf.reshape(arrayout,[-1,1])
  
    await trainModel();

    const saveResult = await model.save('file://model'); // สร้างใน server   ที่เดียวกับ .js
   
    const load = async () => {
        const model = await tf.loadModel('file://model/model.json');   //รูปแบบไฟล์ แล้วกอปส่วนนี้ไปใช้ก็พอ 
           console.log("complete")                                                            // ไม่ต้องไปใส่ใน loop request ,response ให้ dowืload ไว้
      };
      
    load();

   
    app.get('/get', function(req, res) {
        Cat.find({}, function(err, records) {
            if (err) console.log(err)
            else res.json({ results: records });
            var data = records;
            
         });
    })

 
    //  var data = [[ 0.052754025541365905,
    //     0.046640755136035536,
    //     0.1271515824541921,
    //     0.1441421432537479,
    //     0.19977790116601886 
    //     ]]
     input = tf.tensor2d(data)
     input = tf.reshape(input,[-1,5,1]);
     const r = model.predict(input);
    let result = r.dataSync();
console.log(result[0]*max,result[1]*max,result[2]*max);
     
}
    main();


    
