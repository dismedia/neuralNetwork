/**
 * Created by disme on 13/06/17.
 */


import {MultiLayerNet} from "./neuralNetwork/net/multiLayerNet";
import {
    bipolarLogisticActivationFunctionFactory, linearActivationFunctionFactory,
    logisticActivationFunctionFactory
} from "./neuralNetwork/activationFunction";
import {BackPropagationTrainer} from "./neuralNetwork/net/trainer";
import {MatrixResultRender} from "./neuralNetwork/vis/matrixResultRenderer";
import {VisRunner} from "./neuralNetwork/vis/visRunner";
import {INeuronInput} from "./neuralNetwork/net/abstract";


//let p1 = new MultiLayerNet([2,1],linearActivationFunctionFactory(1));
let p1 = new MultiLayerNet([2,20,1],bipolarLogisticActivationFunctionFactory(1));
//let p1 = new MultiLayerNet([2,4,1],logisticActivationFunctionFactory(1));


// const n10=p1.getLayers()[1].getNeurons()[0];
// n10.inputs[0].weight=0.5;
// n10.inputs[1].weight=0.5;







const trainer=new BackPropagationTrainer(p1);



let trainData=[

];


for(let i=0;i<1500;i++){

    let x=Math.random();
    let y=Math.random();

    let v=1;

    if((x<0.5 && y< 0.5)||(x>0.5 && y>0.5)) v=0;

    if((x>0.8 && y> 0.8)||(x<0.2 && y<0.2)) v=1;

    trainData.push([[x,y],[v]]);


}



const visRunner=new VisRunner(p1,trainData);

console.log(trainData.sort((a,b)=>{
    return a[1][0]-b[1][0];
}).map((g)=>[g[1][0],g[0][0],g[0][1]]));




setInterval(()=>{

    for(let k=0;k<10000;k++){
        let tData=trainData[Math.floor(Math.random()*trainData.length)]
        trainer.learn(tData[0],tData[1]);
    }

    visRunner.update();

    // let error=trainData.map(data=>{
    //
    //     p1.setInput(data[0]);
    //     p1.iterate();
    //     let o=p1.getOutput();
    //
    //
    //    console.log(data[0],data[1][0],o[0])
    //
    //    return Math.pow(data[1][0]-o[0],2)
    //
    // }).reduce((a,err)=>{
    //     return a+err
    // })








},30)

//trainer.learn([0.1], [0.91]);
// for (let k = 0; k < 1000; k++) {
//
//     trainer.learn([0.1], [0.91]);
//
//     visRunner.update();
//
//
//
// }
