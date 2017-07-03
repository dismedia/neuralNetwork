/**
 * Created by Marcin on 02/07/17.
 */

export interface IActivationFunction{
    fx:(x:number)=>number,
    fdx:(x:number)=>number,

}


export const linearActivationFunctionFactory:(k:number)=>IActivationFunction=(k)=>{
    return {
        fx:(x)=>k*x,
        fdx:(x)=>k
    }
};