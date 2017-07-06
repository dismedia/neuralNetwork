import {IActivationFunction, linearActivationFunctionFactory} from "./neuralNetwork/activationFunction";
import {INet, INeuron, INeuronInput, INeuronLayer} from "./neuralNetwork/net/abstract";
import {MultiLayerNet} from "./neuralNetwork/net/multiLayerNet";
/**
 * Created by disme on 12/06/17.
 */






export class Neuron implements INeuron {
    learningData: any;
    supportWeight:number;
    inputs: INeuronInput[];
    activation: IActivationFunction;
    public value: number = 0;
    public inputSignal:number=0;

    public id: string;



    getId(): string {
        return this.id;
    }

    constructor(af:IActivationFunction=linearActivationFunctionFactory(1),inputs: NeuronInput[] = null) {

        this.activation=af;
        this.inputs = inputs;

        this.id = (Math.random() * 1000).toString(32);

        this.supportWeight=Math.random()-0.5;

    }



    setInputSignal(value){

        this.inputSignal=value;
        this.setValue(this.activation.fx(this.inputSignal));

    }

    private setValue(value: number) {
        this.value = value;
    }

    getValue(): number {
        return this.value;
    }

    calculate() {

        if(!this.inputs) return;

        this.inputSignal = this.inputs.map((i: NeuronInput) => i.neuron.getValue() * i.weight).reduce((a, v) => v + a, 0);

        this.inputSignal+=this.supportWeight;

        this.setValue(this.activation.fx(this.inputSignal));
    }
}



export class NeuronInput implements INeuronInput {

    public learningData:any=null;
    constructor(public neuron: INeuron, public weight: number = 0) {

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