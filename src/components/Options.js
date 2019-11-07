import React, { useState, useEffect } from 'react';
// import { connect } from "react-redux";
import { setSelectedOptions } from '../actions/optionsActions';
import { useDispatch, useSelector } from "react-redux";

const Options = (props) => {
    const [options, setOptions] = useState([]);
    const [type, setType] = useState('');
    const selectedOption = useSelector(state => state.optionsData.selectedOption);
    const timetables = useSelector(state => state.timetablesData.timetables);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('useEffect Options');
        const getAllOptions = (optionType) => {
            let options = [];
            // let timeTables = [...props.timetables];
            let timeTables = [...timetables];
            for (let i = 0; i <= timeTables.length - 1; i++) {
                for (let j = 0; j <= timeTables[i].days.length - 1; j++) {
                    for (let k = 0; k <= timeTables[i].days[j].hours.length - 1; k++) {
                        for (let l = 0; l <= timeTables[i].days[j].hours[k].constraints.length - 1; l++) {
                            if (optionType === 'teachers') {
                                for (let m = 0; m <= timeTables[i].days[j].hours[k].constraints[l].groupingTeachers.length - 1; m++) {
                                    options = [...options, timeTables[i].days[j].hours[k].constraints[l].groupingTeachers[m]];
                                }
                            }
                            if (optionType === 'classRooms') {
                                for (let l = 0; l <= timeTables[i].days[j].hours[k].constraints.length - 1; l++) {
                                    options = [...options, timeTables[i].days[j].hours[k].constraints[l].classRoom];
                                }
                            }

                        }
                    }
                }
            }
            options = options.filter((item, index) => options.indexOf(item) === index);
            return options;
        };

        // props.setSelectedOptions('');
        dispatch(setSelectedOptions(''));
        switch (props.type) {
            case 'teachers':
                setOptions(getAllOptions('teachers'));
                setType('מורה');
                break;
            case 'classRooms':
                setOptions(getAllOptions('classRooms'));
                setType('חדר לימוד');
                break;
            default:
                setOptions([]);
                break;
        }
    }, [dispatch, props.type, timetables])

    return (
        <div className="input-group mt-3 mb-3">
            <div className="input-group-append">
                <label className="input-group-text" htmlFor="inputGroupSelect02">{type}</label>
            </div>
            {/* <select className="custom-select" id="inputGroupSelect02" value={props.selectedOptions} onChange={(e) => props.setSelectedOptions(e.target.value)}> */}
            <select className="custom-select" id="inputGroupSelect02" value={selectedOption} onChange={(e) => dispatch(setSelectedOptions(e.target.value))}>
                <option value="">{type}...</option>
                {options.sort().map((option, index) =>
                    <option
                        key={index}
                        value={option}
                    >
                        {option}
                    </option>
                )}
            </select>
        </div>
    );
};

// const mapStateToProps = state => ({
//     timetables: state.timetablesData.timetables,
//     selectedOptions: state.optionsData.selectedOptions
// });

// export default connect(mapStateToProps, { setSelectedOptions })(Options);
export default Options;