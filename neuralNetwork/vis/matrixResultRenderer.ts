/**
 * Created by Marcin on 02/07/17.
 */
import * as d3 from "d3"
import {keys} from "d3-collection";


export interface IResultMatrix{
    data:Array<number>;
}

export class MatrixResultRender {
    private elements: any;
    private resultLayer:any;

    constructor(private matrixDim:number=10){

        const svg = d3.select("body").append("svg").attr("width","600px").attr("height","600px");


        const matrix:Array<number>= []
        for(let i=0;i< matrixDim* matrixDim;i++) matrix.push(Math.random());

        const tileSize=50;

        this.resultLayer = svg.append("g");

        this.elements = this.resultLayer.selectAll(".result")
            .data(matrix)
            .enter();

        this.elements
            .append("rect")
            .classed("result",true)
            .attr("fill", (d) => {
                return this.valueToColor(d)
            })
            .attr("x", (d, i) => tileSize*(i%matrixDim))
            .attr("y", (d, i) =>tileSize*(Math.floor(i/matrixDim)))
            .attr("stroke","white")
            .attr("width", tileSize)
            .attr("height",tileSize);


    }


    refresh(result:IResultMatrix){
        this.resultLayer.selectAll(".result")
            .data(result.data)
            .attr("fill", (d) => {
                return this.valueToColor(d)
            })



    }


    valueToColor(v:number ){
       return  d3.hsl(180+v*180, 1, 0.5).toString();
    }

}



