const tf =require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const fs = require('fs')
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
//console.log(newarr)
var temp =[]
var temp1 = []
var arrayin =[]
var arrayout =[]
for(let i=4; i<newarr.length-4; i+2){
     
    // for(let l = i+1;l<=i+3;i++){
    //     temp1.push(newarr[l]);
    //     arrayout.push(temp1)
    //     temp1= []
    // }
    
    for(let k =i-4;k<=i;k++){
     temp.push(newarr[k]);
     arrayin.push(temp);
     temp =[]
    }

}
  console.log(arrayin[0]);
  //console.log(arrayout[3]);
