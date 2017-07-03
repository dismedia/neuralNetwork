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

            if (otherLayer) {
                inputConnections = otherLayer.getNeurons().map((n) => {
                    //return new NeuronInput(n, 0)
                    return new NeuronInput(n, Math.random() - 0.5)
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
                        id: i.input.getId(), weight: i.weight
                    }
                }),
                value: n.getValue(),
                learningData: n.learningData
            }
        });
    }
}
