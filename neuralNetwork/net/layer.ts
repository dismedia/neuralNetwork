import {INeuron, INeuronLayer} from "./abstract";
import {IActivationFunction} from "../activationFunction";
import {Neuron, NeuronInput} from "../../neuron";
/**
 * Created by Marcin on 02/07/17.
 */

export class FlatLayer implements INeuronLayer {
    private neurons: INeuron[];

    getNeurons(): INeuron[] {

        return this.neurons;
    }

    constructor(count: number,af:IActivationFunction, private otherLayer: FlatLayer = null) {
        let inputConnections = null;

        this.neurons = [];
        for (let i = 0; i < count; i++) {

            if (otherLayer!=null) {
                inputConnections = otherLayer.getNeurons().map((n) => {
                    //return new NeuronInput(n, 0)
                    return new NeuronInput(n, (Math.random()*1 - 0.5)*10)
                });
            }

            this.neurons.push(new Neuron(af,inputConnections))
        }
    }

    toReadableStructure() {

        return this.neurons.map((n) => {
            return {
                id: n.getId(),
                inputs: (n.inputs || []).map((i: NeuronInput) => {

                    return {
                        id: i.neuron.getId(), weight: i.weight, learningData: i.learningData
                    }
                }),
                value: n.getValue(),

            }
        });
    }
}
