import {IActivationFunction} from "../activationFunction";
/**
 * Created by Marcin on 02/07/17.
 */


export interface INeuronInput{
    input: INeuron,
    weight:number

}

export interface INeuron {
    setValue(value: number);
    getValue(): number;
    calculate();
    getId(): string;
    learningData: any;
    inputs: INeuronInput[];

    activation: IActivationFunction

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




