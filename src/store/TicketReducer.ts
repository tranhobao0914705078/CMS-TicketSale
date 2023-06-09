import { stat } from "fs";

export interface State {
    data: any[];
}

type Action = 
    | {type: "GET_DATA"; payload: any[]}
    | {type: "ADD_DATA"; payload: any}
    | {type: "UPDATE_DATA"; payload: any[]};

const initialState: State = {
    data: []
}

export function reducerTicket(state: State = initialState, action: Action): State {
    switch(action.type){
        case "GET_DATA":
            return {...state, data: action.payload};
        case "ADD_DATA":
            return {...state, data: [...state.data, action.payload]};
        case "UPDATE_DATA":
            return {...state, data: action.payload};
        default:
            return state;
    }
}