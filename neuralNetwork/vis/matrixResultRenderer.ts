/**
 * Created by Marcin on 02/07/17.
 */
import * as d3Selection from "d3-selection"
import * as d3Color from "d3-color"
import {keys} from "d3-collection";

export interface IResultMatrix {
    data: Array<number>;
}

export class MatrixResultRender {
    tileSize: number;
    private elements: any;
    private resultLayer: any;
    private trainDataLayer: any;

    constructor(private matrixDim: number,private trainData: Array<any>) {

        const svg = d3Selection.select("body").append("svg").attr("width", "600px").attr("height", "600px");

        const matrix: Array<number> = []
        for (let i = 0; i < matrixDim * matrixDim; i++) matrix.push(Math.random());

        this.tileSize = 10;

        this.resultLayer = svg.append("g");
        this.trainDataLayer = svg.append("g");

        this.updateTrainData();

        this.elements = this.resultLayer.selectAll(".result")
            .data(matrix)
            .enter();

        this.elements
            .append("rect")
            .classed("result", true)
            .attr("fill", (d) => {
                return this.valueToColor(d)
            })
            .attr("x", (d, i) => this.tileSize * (i % matrixDim))
            .attr("y", (d, i) => this.tileSize * (Math.floor(i / matrixDim)))
            .attr("stroke", "white")
            .attr("width", this.tileSize)
            .attr("height", this.tileSize);

    }

    updateTrainData() {

        this.trainDataLayer.selectAll(".trainData")
            .data(this.trainData)
            .enter()
            .append("circle")
            .classed("trainData", true)
            .attr("cx", (d, i) => this.tileSize * d[0][0] * this.matrixDim)
            .attr("cy", (d, i) => this.tileSize * d[0][1] * this.matrixDim)

            .attr("stroke", "black")
            .attr("r", 3)
            .attr("fill", (d) => {
                return this.valueToColor(d[1]);
            })
    }

    refresh(result: IResultMatrix) {
        this.resultLayer.selectAll(".result")
            .data(result.data)
            .attr("fill", (d) => {
                return this.valueToColor(d)
            })

    }

    valueToColor(v: number) {
        return  v<0.5?d3Color.hsl(60+v*60, 1, 0.5):d3Color.hsl(150+v*60, 1, 0.5);
        //return  d3.hsl(180+v*60, 1, 0.5).toString();
        //return d3.hsl(180, 0, v).toString();
    }

}



