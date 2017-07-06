"use strict";
/**
 * Created by disme on 13/06/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const multiLayerNet_1 = require("./neuralNetwork/net/multiLayerNet");
const activationFunction_1 = require("./neuralNetwork/activationFunction");
const trainer_1 = require("./neuralNetwork/net/trainer");
const visRunner_1 = require("./neuralNetwork/vis/visRunner");
//let p1 = new MultiLayerNet([2,1],linearActivationFunctionFactory(1));
let p1 = new multiLayerNet_1.MultiLayerNet([2, 20, 1], activationFunction_1.bipolarLogisticActivationFunctionFactory(1));
// const n10=p1.getLayers()[1].getNeurons()[0];
// n10.inputs[0].weight=0.5;
// n10.inputs[1].weight=0.5;
console.log(p1.getOutput());
const visRunner = new visRunner_1.VisRunner(p1);
visRunner.update();
const trainer = new trainer_1.BackPropagationTrainer(p1);
let trainData = [
    [[0.0, 0.0], [0]],
    [[1.0, 0.0], [0]],
    [[0.0, 1.0], [0]],
    [[1.0, 1.0], [0]],
    [[0.5, 0.5], [1]],
    [[0.6, 0.6], [1]],
    [[0.4, 0.4], [1]],
    [[0.2, 0.2], [0]],
    [[0.8, 0.2], [0]],
    [[0.2, 0.8], [0]],
    [[0.8, 0.8], [0]],
];
setInterval(() => {
    for (let k = 0; k < 10000; k++) {
        let tData = trainData[Math.floor(Math.random() * trainData.length)];
        trainer.learn(tData[0], tData[1]);
    }
    visRunner.update();
    let error = trainData.map(data => {
        p1.setInput(data[0]);
        p1.iterate();
        let o = p1.getOutput();
        console.log(data[0], data[1][0], o[0]);
        return Math.pow(data[1][0] - o[0], 2);
    }).reduce((a, err) => {
        return a + err;
    });
    console.log(p1.getLayers()[1].getNeurons()[0].inputs[0].weight);
}, 30);
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
//# sourceMappingURL=index.js.map