"use strict";
/**
 * Created by disme on 13/06/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const multiLayerNet_1 = require("./neuralNetwork/net/multiLayerNet");
const activationFunction_1 = require("./neuralNetwork/activationFunction");
const trainer_1 = require("./neuralNetwork/net/trainer");
const visRunner_1 = require("./neuralNetwork/vis/visRunner");
let p1 = new multiLayerNet_1.MultiLayerNet([2, 2, 1], activationFunction_1.linearActivationFunctionFactory(1));
let trainer = new trainer_1.BackPropagationTrainer(p1);
const visRunner = new visRunner_1.VisRunner(p1);
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
//# sourceMappingURL=index.js.map