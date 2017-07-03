"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const activationFunction_1 = require("./neuralNetwork/activationFunction");
/**
 * Created by disme on 12/06/17.
 */
function substract(a, b) {
    for (let i = 0; i < a.length; i++) {
        a[i] -= b[i];
    }
}
class Neuron {
    constructor(af = activationFunction_1.linearActivationFunctionFactory(1), inputs = null) {
        this.value = 0;
        this.activation = af;
        this.inputs = inputs;
        this.id = (Math.random() * 1000).toString(32);
        //this.activation = (x) => Math.max(Math.min(x, 1), -1);
    }
    getId() {
        return this.id;
    }
    setValue(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    calculate() {
        let value = this.inputs.map((i) => i.input.getValue() * i.weight).reduce((a, v) => v + a, 0);
        this.setValue(this.activation.fx(value));
    }
}
exports.Neuron = Neuron;
class NeuronInput {
    constructor(input, weight = 0) {
        this.input = input;
        this.weight = weight;
    }
}
exports.NeuronInput = NeuronInput;
/*
 for(let i=p1.getLayers().length-1, layer=p1.getLayers()[i];i>0;i--){

 let prevOutVector=[]

 layer.getNeurons().forEach((n,i)=>{


 n.learningData={
 err:n.getValue()-outVector[i]
 };




 })

 */ 
//# sourceMappingURL=neuron.js.map