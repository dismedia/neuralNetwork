/**
 * Created by disme on 13/06/17.
 */


import {MultiLayerNet} from "./neuralNetwork/net/multiLayerNet";
import {linearActivationFunctionFactory} from "./neuralNetwork/activationFunction";
import {BackPropagationTrainer} from "./neuralNetwork/net/trainer";
import {MatrixResultRender} from "./neuralNetwork/vis/matrixResultRenderer";
import {VisRunner} from "./neuralNetwork/vis/visRunner";


let p1 = new MultiLayerNet([2,2,1],linearActivationFunctionFactory(1));
let trainer = new BackPropagationTrainer(p1);

const visRunner=new VisRunner(p1);
trainer.learn([0.1], [0.91]);
visRunner.update();

// for (let k = 0; k < 1000; k++) {
//
//     trainer.learn([0.1], [0.91]);
//
//     visRunner.update();
//
//
//
// }
