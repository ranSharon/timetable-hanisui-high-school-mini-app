import axios from "axios";
import { SET_TIMETABLES } from "./types";

// Fetch timeTables from database
export const getTimetables = () => dispatch => {
    axios.get("/api/timeTables")
        .then(res => {
            console.log(res.data);
            dispatch({
                type: SET_TIMETABLES,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err.response.data);
        });
};