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

export const logisticActivationFunctionFactory:(k:number)=>IActivationFunction=(k)=>{
    return {
        fx:(x)=>1/(1+Math.exp(-k*x)),
        fdx:(x)=>k*Math.exp(k*x)/(Math.pow((Math.exp(k*x)+1),2))
    }
};


export const bipolarLogisticActivationFunctionFactory:(k:number)=>IActivationFunction=(k)=>{
    return {
        fx:(x)=>2/(1+Math.exp(-k*x))-1,
        fdx:(x)=>2*k*Math.exp(k*x)/(Math.pow((Math.exp(k*x)+1),2))
    }
};