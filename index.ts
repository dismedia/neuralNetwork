/**
 * Created by disme on 13/06/17.
 */


import {MultiLayerNet} from "./neuralNetwork/net/multiLayerNet";
import {linearActivationFunctionFactory} from "./neuralNetwork/activationFunction";
import {BackPropagationTrainer} from "./neuralNetwork/net/trainer";
import {MatrixResultRender} from "./neuralNetwork/matrixResultRenderer";


const vis=new MatrixResultRender()


const matrixDim=100;
const matrix:Array<number>= []
for(let i=0;i< matrixDim* matrixDim;i++) matrix.push(Math.random());

setTimeout(()=>{
    vis.refresh({data:matrix});
},2000)





let p1 = new MultiLayerNet([1,1],linearActivationFunctionFactory(1));

let trainer = new BackPropagationTrainer(p1);


for (let k = 0; k < 1000; k++) {

    trainer.learn([0.1], [0.91]);
    console.log(p1.getOutput());


}