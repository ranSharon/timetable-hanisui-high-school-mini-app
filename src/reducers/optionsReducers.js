import { SET_OPTIONS_TYPE, SET_SELECTED_OPTION } from '../actions/types';

const initialState = {
    optionsType: '',
    selectedOption: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_OPTIONS_TYPE:
            return {
                ...state,
                optionsType: action.payload
            };
        case SET_SELECTED_OPTION:
            return {
                ...state,
                selectedOption: action.payload
            };
        default:
            return state;
    }
}