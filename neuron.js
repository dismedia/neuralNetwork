/**
 * Created by disme on 12/06/17.
 */
function substract(a, b) {
    for (var i = 0; i < a.length; i++) {
        a[i] -= b[i];
    }
}
var Neuron = (function () {
    function Neuron(inputs) {
        if (inputs === void 0) { inputs = null; }
        this.value = 0;
        this.inputs = inputs;
        this.id = (Math.random() * 1000).toString(32);
        //this.activation = (x) => Math.max(Math.min(x, 1), -1);
        this.activation = function (x) { return 1 / (1 + Math.exp(-0.5 * x)); };
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
        this.setValue(this.activation(value));
    };
    return Neuron;
}());
var NeuronInput = (function () {
    function NeuronInput(input, weight) {
        if (weight === void 0) { weight = 0; }
        this.input = input;
        this.weight = weight;
    }
    return NeuronInput;
}());
var FlatLayer = (function () {
    function FlatLayer(count, otherLayer) {
        if (otherLayer === void 0) { otherLayer = null; }
        this.otherLayer = otherLayer;
        var inputConnections = null;
        this.neurons = [];
        for (var i = 0; i < count; i++) {
            if (otherLayer) {
                inputConnections = otherLayer.getNeurons().map(function (n) {
                    return new NeuronInput(n, 0);
                    //return new NeuronInput(n, Math.random() - 0.5)
                });
            }
            this.neurons.push(new Neuron(inputConnections));
        }
    }
    FlatLayer.prototype.getNeurons = function () {
        return this.neurons;
    };
    FlatLayer.prototype.toReadableStructure = function () {
        return this.neurons.map(function (n) {
            return {
                id: n.getId(),
                inputs: (n.inputs || []).map(function (i) {
                    return {
                        id: i.input.getId(), weight: i.weight
                    };
                }),
                value: n.getValue(),
                learningData: n.learningData
            };
        });
    };
    return FlatLayer;
}());
var PerceptronNet = (function () {
    function PerceptronNet(layerSizes) {
        this.layers = [];
        var lastLayer = null;
        for (var i = 0; i < layerSizes.length; i++) {
            this.layers.push(new FlatLayer(layerSizes[i], lastLayer));
            lastLayer = this.layers[this.layers.length - 1];
        }
    }
    PerceptronNet.prototype.setInput = function (values) {
        var neurons = this.layers[0].getNeurons();
        if (neurons.length != values.length)
            return;
        this.layers[0].getNeurons().forEach(function (n, i) {
            n.setValue(values[i]);
        });
    };
    PerceptronNet.prototype.iterate = function () {
        for (var i = 1; i < this.layers.length; i++) {
            this.layers[i].getNeurons().forEach(function (n) {
                n.calculate();
            });
        }
    };
    PerceptronNet.prototype.toReadableStructure = function () {
        return this.layers.map(function (l) {
            return l.toReadableStructure();
        });
    };
    PerceptronNet.prototype.getOutput = function () {
        var output = this.layers[this.layers.length - 1].getNeurons().map(function (n) { return n.getValue(); });
        return output;
    };
    PerceptronNet.prototype.getLayers = function () {
        return this.layers;
    };
    return PerceptronNet;
}());
var BackPropagationTrainer = (function () {
    function BackPropagationTrainer(net) {
        var _this = this;
        this.net = net;
        this.learningRate = 0.01;
        this.neurons = [];
        net.getLayers().forEach(function (l) {
            var layerNeurons = l.getNeurons();
            _this.neurons = _this.neurons.concat(layerNeurons);
            layerNeurons.forEach(function (n) {
                n.learningData = {
                    err: 0
                };
            });
        });
        this.outputNeurons = net.getLayers()[net.getLayers().length - 1].getNeurons();
    }
    BackPropagationTrainer.prototype.addError = function (n, desiredValue) {
        var _this = this;
        n.learningData.err += (n.getValue() - desiredValue);
        if (!n.inputs)
            return;
        n.inputs.forEach(function (ni) {
            _this.addError(ni.input, desiredValue / ni.weight);
        });
    };
    BackPropagationTrainer.prototype.learn = function (input, output) {
        var _this = this;
        this.neurons.forEach(function (n) {
            n.learningData.err = 0;
        });
        this.net.setInput(input);
        this.net.iterate();
        this.outputNeurons.forEach(function (n, i) { return _this.addError(n, output[i]); });
        console.log(JSON.stringify(this.net.toReadableStructure()));
        this.neurons.forEach(function (n) {
            //debugger;
            (n.inputs || []).forEach(function (i) {
                var di = (-n.learningData.err + i.input.getValue() * i.weight) / i.input.getValue() - i.weight;
                di *= _this.learningRate;
                i.weight += di;
            });
        });
    };
    return BackPropagationTrainer;
}());
var p1 = new PerceptronNet([1, 1]);
var trainer = new BackPropagationTrainer(p1);
for (var k = 0; k < 1000; k++) {
    trainer.learn([0.1], [0.91]);
    console.log(p1.getOutput());
}
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