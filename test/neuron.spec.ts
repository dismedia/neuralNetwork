
import {linearActivationFunctionFactory} from "../neuralNetwork/activationFunction";
import {Neuron, NeuronInput} from "../neuron";
/**
 * Created by Marcin on 30/06/17.
 */
const expect = require("chai").expect;

describe("Neuron", function() {
    it("neuron should give output", function() {

        let input=new Neuron()

        let neuron1=new Neuron(linearActivationFunctionFactory(3),[new NeuronInput(input,4)])
        let neuron2=new Neuron(linearActivationFunctionFactory(0.5),[new NeuronInput(input,6)])


        let out1=0;
        let out2=0;

        input.setValue(1);
        neuron1.calculate();
        neuron2.calculate();
        out1=neuron1.getValue();
        out2=neuron2.getValue();

        expect(out1).to.equal(12);
        expect(out2).to.equal(3);




    });
});