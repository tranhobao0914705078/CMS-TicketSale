import { combineReducers, applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { reducerTicket } from "./TicketReducer";
import { reducerManageTicket } from "./ManageTicket";

const rootReducer = combineReducers({
    ticket: reducerTicket,
    manage: reducerManageTicket
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunk];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    return createStore(rootReducer, composeEnhancers(middlewareEnhancer));
}
