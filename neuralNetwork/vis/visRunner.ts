import {MatrixResultRender} from "./matrixResultRenderer";
import {MultiLayerNet} from "../net/multiLayerNet";
import {INet} from "../net/abstract";
/**
 * Created by disme on 03/07/17.
 */

export class VisRunner {
    private matrixRenderer: MatrixResultRender;

    constructor(private net: INet,
                private trainData:Array<any>,
                private matrixDim = 50,
                private outputTransform: (o: any[]) => number = (a: any[]) => a[0]) {

        this.matrixRenderer = new MatrixResultRender(this.matrixDim,trainData)




    }

    update() {

        let data:number[]=[];
        const step = 1 / this.matrixDim;

        for (let y = 0; y < this.matrixDim; y++) {
            for (let x = 0; x < this.matrixDim; x++) {

                this.net.setInput([x * step, y * step]);
                this.net.iterate();
                data.push(this.outputTransform(this.net.getOutput()));

            }

        }

        this.matrixRenderer.refresh({
            data:data
        })

    }

}