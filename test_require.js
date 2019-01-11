


// function findmax(number){
//     var maxval = array[0][number]
//     for(i in array)
//          {
//          if(array[i][number] > maxval)
//          maxval = array[i][number]
//          }
//          return maxval;
//         }
//     var max =[]
//           max[0] =findmax(0);
//           max[1] =findmax(1);
//           max[2] =findmax(2);
//           max[3] =findmax(3);


// function findmin(number){
// var minval = array[0][number]
//  for(i in array)
//                  {
//                  if(array[i][number] < minval)
//                  minval = array[i][number]
//                  }
//                  return minval;
//                 }
//                 var min =[]
//                  min[0] =findmin(0);
//              min[1] =findmin(1);
//                 min[2] =findmin(2);
//                  min[3] =findmin(3);
 
 
           
//      for(j in array)
//      {
//          for(let i=0;i<4;i++)
//          {
//              array[j][i] = (array[j][i]-min[i])/(max[i]-min[i])
//          }
//      }
//   //console.log(array)          
// const arrayin = []
// const arrayout =[]
// for( i in array)
// arrayin[i]= array[i].slice(0,3)
// for(i in array)
// arrayout[i] = array[i].splice(3,1)
// //console.log(arrayout)

const model = tf.sequential();

model.add(tf.layers.lstm({      // add one hiddenlayer   //lstm is atype of layer 
    units: 500,
    inputShape: [3,1],      // dimension  include number of timestep  and the dimension of value such as [1,2,3] have 3  step and 1 dimension value
    returnSequences: false    // true = return , false =not return
}));


model.add(tf.layers.dense({      //สร้างเส้นเชื่อมระหว่าง node
    units: 1,                    // จะให้ออกมากี่ค่า
    kernelInitializer: 'VarianceScaling', // random weigth 
    activation: 'relu'                     // ใส่ function ปรับค่า ex. Relu ปรับค่าที่น้อยกว่า 0 เป้น 0
}));

const LEARNING_RATE = 0.06;                            
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
                batchSize: 1,      // train ครั้งนึงกี่ก้อนต่อ 1 รอบ ex. [1,2,3]  คือ 1 ก้อน
                epochs: 10,       // train กี่รอบ
                shuffle:true,       // ดึงแบบ random หรือไม่
                validationSplit: 0.2  // เป็นการใส่จำนวนข้อมูล  test เพื่อ เทียบความแม่นกับ train 
            });
    }

    trainXS =  tf.tensor2d(arrayin)
    trainXS =  tf.reshape(arrayin,[-1,3,1])
    trainYS = tf.tensor1d(arrayout)
    trainYS = tf.reshape(arrayout,[-1,1])
  
    await trainModel();

    const saveResult = await model.save('file://model'); // สร้างใน server   ที่เดียวกับ .js
   
    const load = async () => {
        const model = await tf.loadModel('file://model/model.json');   //รูปแบบไฟล์ แล้วกอปส่วนนี้ไปใช้ก็พอ 
           console.log("complete")                                                            // ไม่ต้องไปใส่ใน loop request ,response ให้ dowืload ไว้
      };
      
    load();
    
    const data = [[33.8,32.98,32.89]]
     input = tf.tensor2d(data)
     input = tf.reshape(input,[-1,3,1]);
    const r = model.predict(input);
    let result = r.dataSync()[0];
    console.log(result);
}
    main();

   

   
