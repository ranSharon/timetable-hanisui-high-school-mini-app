import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { setOptionsType, setSelectedOptions } from '../actions/optionsActions';

const Options = (props) => {
    const [options, setOptions] = useState([]);
    const [type, setType] = useState('')

    useEffect(() => {
        props.setSelectedOptions('');
        switch (props.type) {
            case 'teachers':
                setOptions(getAllTeachers());
                props.setOptionsType('מורה');
                setType('מורה');
                break;
            case 'classRooms':
                setOptions(getAllClassRooms());
                props.setOptionsType('חדר לימוד');
                setType('חדר לימוד');
                break;
            default:
                setOptions([]);
                break;
        }
    }, [])

    const getAllTeachers = () => {
        let teachers = [];
        let timeTables = [...props.timetables];

        for (let i = 0; i <= timeTables.length - 1; i++) {
            for (let j = 0; j <= timeTables[i].days.length - 1; j++) {
                for (let k = 0; k <= timeTables[i].days[j].hours.length - 1; k++) {
                    for (let l = 0; l <= timeTables[i].days[j].hours[k].constraints.length - 1; l++) {
                        for (let m = 0; m <= timeTables[i].days[j].hours[k].constraints[l].groupingTeachers.length - 1; m++) {
                            teachers = [...teachers, timeTables[i].days[j].hours[k].constraints[l].groupingTeachers[m]];
                        }
                    }
                }
            }
        }
        teachers = teachers.filter((item, index) => teachers.indexOf(item) === index);
        return teachers;
    };

    const getAllClassRooms = () => {
        let classRooms = [];
        let timeTables = [...props.timetables];
        for (let i = 0; i <= timeTables.length - 1; i++) {
            for (let j = 0; j <= timeTables[i].days.length - 1; j++) {
                for (let k = 0; k <= timeTables[i].days[j].hours.length - 1; k++) {
                    for (let l = 0; l <= timeTables[i].days[j].hours[k].constraints.length - 1; l++) {
                        classRooms = [...classRooms, timeTables[i].days[j].hours[k].constraints[l].classRoom];
                    }
                }
            }
        }
        classRooms = classRooms.filter((item, index) => classRooms.indexOf(item) === index);
        return classRooms;
    };

    return (
        <div className="input-group mt-3 mb-3">
            <div className="input-group-append">
                <label className="input-group-text" htmlFor="inputGroupSelect02">{type}</label>
            </div>
            <select className="custom-select" id="inputGroupSelect02" value={props.selectedOptions} onChange={(e) => props.setSelectedOptions(e.target.value)}>
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

const mapStateToProps = state => ({
    timetables: state.timetablesData.timetables,
    optionsType: state.optionsData.optionsType,
    selectedOptions: state.optionsData.selectedOptions
});

export default connect(mapStateToProps, { setOptionsType, setSelectedOptions })(Options);