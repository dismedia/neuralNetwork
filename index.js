"use strict";
/**
 * Created by disme on 13/06/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var multiLayerNet_1 = require("./neuralNetwork/net/multiLayerNet");
var activationFunction_1 = require("./neuralNetwork/activationFunction");
var trainer_1 = require("./neuralNetwork/net/trainer");
var matrixResultRenderer_1 = require("./neuralNetwork/matrixResultRenderer");
var vis = new matrixResultRenderer_1.MatrixResultRender();
var matrixDim = 100;
var matrix = [];
for (var i = 0; i < matrixDim * matrixDim; i++)
    matrix.push(Math.random());
setTimeout(function () {
    vis.refresh({ data: matrix });
}, 2000);
var p1 = new multiLayerNet_1.MultiLayerNet([1, 1], activationFunction_1.linearActivationFunctionFactory(1));
var trainer = new trainer_1.BackPropagationTrainer(p1);
for (var k = 0; k < 1000; k++) {
    trainer.learn([0.1], [0.91]);
    console.log(p1.getOutput());
}
//# sourceMappingURL=index.js.map