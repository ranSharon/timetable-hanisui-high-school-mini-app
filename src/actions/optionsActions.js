import { SET_OPTIONS_TYPE, SET_SELECTED_OPTION } from '../actions/types';

export const setOptionsType = (optionsType) => dispatch => {
    dispatch({
        type: SET_OPTIONS_TYPE,
        payload: optionsType
    });
};

export const setSelectedOptions = (selectedOption) => dispatch => {
    dispatch({
        type: SET_SELECTED_OPTION,
        payload: selectedOption
    });
};