/**
 * Created by disme on 12/06/17.
 */

function substract(a: number[], b: number[]) {

    for (let i = 0; i < a.length; i++) {
        a[i] -= b[i];
    }

}

interface INeuron {
    setValue(value: number);
    getValue(): number;
    calculate();
    getId(): string;
    learningData: any;
    inputs: NeuronInput[];

    activation: (x: number) => number

}

class Neuron implements INeuron {
    inputs: NeuronInput[];
    activation: (x: number) => number;
    public value: number = 0;
    public id: string;

    public learningData;

    getId(): string {
        return this.id;
    }

    constructor(inputs: NeuronInput[] = null) {
        this.inputs = inputs;
        this.id = (Math.random() * 1000).toString(32);

        //this.activation = (x) => Math.max(Math.min(x, 1), -1);
        this.activation = (x) => 1 / (1 + Math.exp(-0.5 * x));

    }

    setValue(value: number) {
        this.value = value;
    }

    getValue(): number {
        return this.value;
    }

    calculate() {
        let value = this.inputs.map((i: NeuronInput) => i.input.getValue() * i.weight).reduce((a, v) => v + a, 0);


        this.setValue(this.activation(value));
    }
}

class NeuronInput {

    constructor(public input: Neuron, public weight: number = 0) {

    }

}

interface NeuronLayer {
    getNeurons(): Neuron[];
    toReadableStructure();

}

class FlatLayer implements NeuronLayer {
    private neurons: Neuron[];

    getNeurons(): Neuron[] {

        return this.neurons;
    }

    constructor(count: number, private otherLayer: FlatLayer = null) {
        let inputConnections = null;

        this.neurons = [];
        for (let i = 0; i < count; i++) {

            if (otherLayer) {
                inputConnections = otherLayer.getNeurons().map((n) => {
                    return new NeuronInput(n, 0)
                    //return new NeuronInput(n, Math.random() - 0.5)
                });
            }

            this.neurons.push(new Neuron(inputConnections))
        }
    }

    toReadableStructure() {

        return this.neurons.map((n) => {
            return {
                id: n.getId(),
                inputs: (n.inputs || []).map((i: NeuronInput) => {
                    return {
                        id: i.input.getId(), weight: i.weight
                    }
                }),
                value: n.getValue(),
                learningData: n.learningData
            }
        });
    }
}

interface INet {

    getLayers(): NeuronLayer[];
    toReadableStructure();
    setInput(values: number[]);

}

class PerceptronNet implements INet {
    private layers: NeuronLayer[];

    setInput(values: number[]) {

        const neurons = this.layers[0].getNeurons();
        if (neurons.length != values.length) return;

        this.layers[0].getNeurons().forEach((n, i) => {
            n.setValue(values[i])
        });

    }

    iterate() {

        for (let i = 1; i < this.layers.length; i++) {
            this.layers[i].getNeurons().forEach(n => {
                n.calculate();

            })
        }

    }

    constructor(layerSizes: number[]) {

        this.layers = [];

        let lastLayer = null;
        for (let i = 0; i < layerSizes.length; i++) {

            this.layers.push(new FlatLayer(layerSizes[i], lastLayer));
            lastLayer = this.layers[this.layers.length - 1];
        }
    }

    toReadableStructure() {

        return this.layers.map((l) => {
                return l.toReadableStructure();
            }
        )
    }

    getOutput() {



        var output=this.layers[this.layers.length - 1].getNeurons().map(n => n.getValue())

        return output;
    }

    getLayers(): NeuronLayer[] {
        return this.layers;
    }
}

class BackPropagationTrainer {

    private outputNeurons: INeuron[];
    private neurons: INeuron[];

    private learningRate = 0.01;

    constructor(private net: PerceptronNet) {

        this.neurons = [];

        net.getLayers().forEach(l => {
            let layerNeurons = l.getNeurons();

            this.neurons = this.neurons.concat(layerNeurons);
            layerNeurons.forEach(n => {
                n.learningData = {
                    err: 0
                }
            })
        })

        this.outputNeurons = net.getLayers()[net.getLayers().length - 1].getNeurons();

    }

    private addError(n: INeuron, desiredValue: number) {

        n.learningData.err += (n.getValue() - desiredValue)

        if (!n.inputs) return;

        n.inputs.forEach(ni => {

            this.addError(ni.input, desiredValue / ni.weight)

        })

    }

    learn(input: number[], output: number[]) {


        this.neurons.forEach(n => {
            n.learningData.err = 0;

        });




        this.net.setInput(input);
        this.net.iterate();

        this.outputNeurons.forEach((n, i) => this.addError(n, output[i]));

        console.log(JSON.stringify(this.net.toReadableStructure()));

        this.neurons.forEach(n => {

            //debugger;
            (n.inputs || []).forEach(i => {
                let di = (-n.learningData.err + i.input.getValue() * i.weight) / i.input.getValue() - i.weight;



                di *= this.learningRate;

                i.weight += di;
            })

        })

    }

}

let p1 = new PerceptronNet([1,1]);

let trainer = new BackPropagationTrainer(p1);


for (let k = 0; k < 1000; k++) {


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