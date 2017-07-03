"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by disme on 12/06/17.
 */
function substract(a, b) {
    for (var i = 0; i < a.length; i++) {
        a[i] -= b[i];
    }
}
var Neuron = (function () {
    function Neuron(af, inputs) {
        if (inputs === void 0) { inputs = null; }
        this.value = 0;
        this.activation = af;
        this.inputs = inputs;
        this.id = (Math.random() * 1000).toString(32);
        //this.activation = (x) => Math.max(Math.min(x, 1), -1);
    }
    Neuron.prototype.getId = function () {
        return this.id;
    };
    Neuron.prototype.setValue = function (value) {
        this.value = value;
    };
    Neuron.prototype.getValue = function () {
        return this.value;
    };
    Neuron.prototype.calculate = function () {
        var value = this.inputs.map(function (i) { return i.input.getValue() * i.weight; }).reduce(function (a, v) { return v + a; }, 0);
        this.setValue(this.activation.fx(value));
    };
    return Neuron;
}());
exports.Neuron = Neuron;
var NeuronInput = (function () {
    function NeuronInput(input, weight) {
        if (weight === void 0) { weight = 0; }
        this.input = input;
        this.weight = weight;
    }
    return NeuronInput;
}());
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