import {IActivationFunction, linearActivationFunctionFactory} from "./neuralNetwork/activationFunction";
import {INet, INeuron, INeuronInput, INeuronLayer} from "./neuralNetwork/net/abstract";
import {MultiLayerNet} from "./neuralNetwork/net/multiLayerNet";
/**
 * Created by disme on 12/06/17.
 */

function substract(a: number[], b: number[]) {

    for (let i = 0; i < a.length; i++) {
        a[i] -= b[i];
    }

}







export class Neuron implements INeuron {
    inputs: INeuronInput[];
    activation: IActivationFunction;
    public value: number = 0;
    public id: string;

    public learningData;

    getId(): string {
        return this.id;
    }

    constructor(af:IActivationFunction=linearActivationFunctionFactory(1),inputs: NeuronInput[] = null) {

        this.activation=af;
        this.inputs = inputs;




        this.id = (Math.random() * 1000).toString(32);

        //this.activation = (x) => Math.max(Math.min(x, 1), -1);


    }



    setValue(value: number) {
        this.value = value;
    }

    getValue(): number {
        return this.value;
    }

    calculate() {
        let value = this.inputs.map((i: NeuronInput) => i.input.getValue() * i.weight).reduce((a, v) => v + a, 0);
        this.setValue(this.activation.fx(value));
    }
}



export class NeuronInput implements INeuronInput {

    constructor(public input: INeuron, public weight: number = 0) {

    }
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