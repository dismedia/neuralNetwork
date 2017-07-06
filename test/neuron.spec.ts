
import {linearActivationFunctionFactory} from "../neuralNetwork/activationFunction";
import {Neuron, NeuronInput} from "../neuron";
import {MultiLayerNet} from "../neuralNetwork/net/multiLayerNet";
import {BackPropagationTrainer} from "../neuralNetwork/net/trainer";
/**
 * Created by Marcin on 30/06/17.
 */
const expect = require("chai").expect;

describe("Neuron", function() {
    it("neuron should give output", function() {

        let input=new Neuron()

        let neuron1=new Neuron(linearActivationFunctionFactory(3),[new NeuronInput(input,4)])
        let neuron2=new Neuron(linearActivationFunctionFactory(0.5),[new NeuronInput(input,6)])


        let out1: number;
        let out2: number;

        input.setInputSignal(1);
        neuron1.calculate();
        neuron2.calculate();
        out1=neuron1.getValue();
        out2=neuron2.getValue();

        expect(out1).to.equal(12);
        expect(out2).to.equal(3);

    });
});

describe("Multi Layer Net", function() {
    it("net should give output with valid dim", function() {

        let net=new MultiLayerNet([1,4,2],linearActivationFunctionFactory(1));

        net.setInput([3]);
        net.iterate();
        let output=net.getOutput();

        expect(output).to.be.an('array');
        expect(output.length).to.equal(2);

    });
});


describe("Trainer", function() {
    it("should calculate valid error", function() {

        let net=new MultiLayerNet([1,1],linearActivationFunctionFactory(1));

        net.getLayers()[1].getNeurons()[0].inputs[0].weight=1;
        const trainer=new BackPropagationTrainer(net);



        trainer.learn([1],[5]);

        let state=net.toReadableStructure();


    });
});