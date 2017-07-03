import {INeuron} from "./abstract";
import {MultiLayerNet} from "./multiLayerNet";
/**
 * Created by Marcin on 02/07/17.
 */

export class BackPropagationTrainer {

    private outputNeurons: INeuron[];
    private neurons: INeuron[];

    private learningRate = 0.01;

    constructor(private net: MultiLayerNet) {

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


            (n.inputs || []).forEach(i => {
                let di = (-n.learningData.err + i.input.getValue() * i.weight) / i.input.getValue() - i.weight;

                di *= this.learningRate;

                i.weight += di;
            })

        })

    }

}