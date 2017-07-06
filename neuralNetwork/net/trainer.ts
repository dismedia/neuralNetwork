import {INeuron, INeuronInput} from "./abstract";
import {MultiLayerNet} from "./multiLayerNet";
/**
 * Created by Marcin on 02/07/17.
 */

export class BackPropagationTrainer {

    private outputNeurons: INeuron[];
    private neurons: INeuron[];

    private learningRate = 0.001;

    constructor(private net: MultiLayerNet) {

        this.neurons = [];

       this.resetErrors();

       this.neurons=this.neurons.concat(...net.getLayers().map(l=>l.getNeurons()))

       this.outputNeurons = net.getLayers()[net.getLayers().length - 1].getNeurons();

    }

    private resetErrors(){
        this.net.getLayers().forEach((l) => {
            let layerNeurons = l.getNeurons();

            layerNeurons.forEach((n: INeuron) => {

                n.learningData = {
                    err: 0
                }
            })
        });
    }

    private  addError(n: INeuron, connectedNeuronError: number, weight) {

        n.learningData.err += n.activation.fdx(n.inputSignal) * weight * (connectedNeuronError);



    }

    private addLastLayerError(n: INeuron, desiredValue: number):number {



        n.learningData.err = n.activation.fdx(n.inputSignal) * (desiredValue);

        if (!n.inputs) return;



        return desiredValue - n.getValue();

    }

    learn(input: number[], desiredOutput: number[]) {


        this.resetErrors();

        this.net.setInput(input);
        this.net.iterate();
        const output = this.net.getOutput();

        const layers = this.net.getLayers();
        let currentLayer = layers.length - 1;

        let lastLayerSumError=0;


        layers[currentLayer].getNeurons().forEach((n, index) => {
            lastLayerSumError+=this.addLastLayerError(n, desiredOutput[index] - output[index])
        });

        for (currentLayer; currentLayer > 0; currentLayer--) {
            layers[currentLayer].getNeurons().forEach((n) => n.inputs.forEach((ni: INeuronInput) => {
               this.addError(ni.neuron, n.learningData.err, ni.weight)
            }))
        }


        //console.log(lastLayerSumError);

        this.neurons.forEach(n=>{

            if(n.inputs){
                n.inputs.forEach(ni=>{

                    ni.weight+=ni.neuron.getValue()*n.learningData.err*this.learningRate;
                    n.supportWeight+=n.learningData.err*this.learningRate;

                })
            }

        })

    }

}