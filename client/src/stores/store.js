import * as actionTypes from '../constants/actions';

const initialState = {
    keycloak: null,
    authenticated: false
};

const reducer = (state = initialState, action) => {
        switch(action.type) {
            case actionTypes.NAME_OF_ACTION:
                return {
                    ...state,
                    keycloak: action.keycloak.token,
                    authenticated: true
                };
            default:
                return state;
    }
};

export default reducer;