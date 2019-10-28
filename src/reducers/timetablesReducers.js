import { SET_TIMETABLES } from '../actions/types';

const initialState = {
    timetables: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_TIMETABLES:
            return {
                ...state,
                timetables: [...action.payload]
            };
        default:
            return state;
    }
}