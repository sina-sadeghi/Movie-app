import { combineReducers, createStore } from 'redux';
import PopupReducer from "./reducers/popup-reducer";


const rootReducer = combineReducers({
    PopupReducer: PopupReducer,
});


const store = createStore(rootReducer);

export default store;