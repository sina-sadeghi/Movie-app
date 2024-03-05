export const MENU_POPUP = "MENU_POPUP";

export const MenuPopup = (state: boolean) => {
    return {
        type: MENU_POPUP,
        payload: {
            state: state
        },
    };
}
