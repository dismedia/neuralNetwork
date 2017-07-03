import {INet, INeuronLayer} from "./abstract";
import {IActivationFunction} from "../activationFunction";
import {FlatLayer} from "./layer";
/**
 * Created by Marcin on 02/07/17.
 */

export class MultiLayerNet implements INet {
    private layers: INeuronLayer[];

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

    constructor(layerSizes: number[],af:IActivationFunction) {

        this.layers = [];

        let lastLayer = null;
        for (let i = 0; i < layerSizes.length; i++) {

            this.layers.push(new FlatLayer(layerSizes[i],af, lastLayer));
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

    getLayers(): INeuronLayer[] {
        return this.layers;
    }
}
