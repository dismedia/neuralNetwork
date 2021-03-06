import {IActivationFunction} from "../activationFunction";
/**
 * Created by Marcin on 02/07/17.
 */


export interface INeuronInput{
    neuron: INeuron,
    weight:number,



}

export interface INeuron {
    setInputSignal(value: number);
    getValue(): number;
    calculate();
    getId(): string;

    supportWeight:number;
    inputSignal:number;
    inputs: INeuronInput[];
    activation: IActivationFunction
    learningData: any;

}


export interface INeuronLayer {
    getNeurons(): INeuron[];
    toReadableStructure();

}

export interface INet {

    getLayers(): INeuronLayer[];
    toReadableStructure();
    setInput(values: number[]);
    getOutput();
    iterate();

}




