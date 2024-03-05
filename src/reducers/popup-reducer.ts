import {MENU_POPUP} from '@/actions/popup-action';

const initialState = {
    state: ''
}

const PopupReducer = (state = initialState, action: { type: string, payload: { state: string } }) => {
    switch (action.type) {
        case MENU_POPUP:
            return {
                menuPopupState: action.payload.state
            }
        default:
            return state
    }
}

export default PopupReducer;