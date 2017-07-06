"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const activationFunction_1 = require("./neuralNetwork/activationFunction");
/**
 * Created by disme on 12/06/17.
 */
class Neuron {
    constructor(af = activationFunction_1.linearActivationFunctionFactory(1), inputs = null) {
        this.value = 0;
        this.inputSignal = 0;
        this.activation = af;
        this.inputs = inputs;
        this.id = (Math.random() * 1000).toString(32);
        this.supportWeight = Math.random() - 0.5;
    }
    getId() {
        return this.id;
    }
    setInputSignal(value) {
        this.inputSignal = value;
        this.setValue(this.activation.fx(this.inputSignal));
    }
    setValue(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    calculate() {
        if (!this.inputs)
            return;
        this.inputSignal = this.inputs.map((i) => i.neuron.getValue() * i.weight).reduce((a, v) => v + a, 0);
        this.inputSignal += this.supportWeight;
        this.setValue(this.activation.fx(this.inputSignal));
    }
}
exports.Neuron = Neuron;
class NeuronInput {
    constructor(neuron, weight = 0) {
        this.neuron = neuron;
        this.weight = weight;
        this.learningData = null;
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