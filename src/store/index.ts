import { combineReducers, applyMiddleware, createStore, compose } from "redux";
import ThunkMiddleware  from "redux-thunk";
import { reducerTicket } from "./TicketReducer";

const ticketReducer = combineReducers({
    ticket: reducerTicket
})

declare global{
    interface Window{
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppState = ReturnType<typeof ticketReducer>;

export default function configureStore(){
    const middlewares = [ThunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    return createStore(ticketReducer, composeEnhancers(middlewareEnhancer));

}