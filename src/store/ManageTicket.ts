import { stat } from 'fs';

export interface State {
    data: any[];
}

type Action = 
    | { type: "GET_DATA"; payload: any[]}
    | { type: "UPDATE_DATA"; payload: any[]}

export function reducerManageTicket(state: State, action: Action): State{
    switch(action.type){
        case "GET_DATA":
            return {...state, data: action.payload};
        case "UPDATE_DATA":
            const updatedData = action.payload.filter(item => item.status === 1);
            return {...state, data: updatedData};
        default: return state;
    }
}