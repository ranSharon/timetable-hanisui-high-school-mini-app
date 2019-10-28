import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { getTimetables } from '../actions/timetablesActions';
import ClassRooms from '../pages/ClassRooms';
import Teachers from '../pages/Teachers';

const NavBar = (props) => {
    const [teachers, setTeachers] = useState('text-secondary nav-link');
    const [classRooms, setclassRooms] = useState('text-secondary nav-link');

    useEffect(() => {
        props.getTimetables();
        const path = window.location.pathname.substr(1);
        handleTabClick(path);
    }, []);

    const handleTabClick = (tab) => {
        switch (tab) {
            case 'teachers':
                setTeachers('text-secondary nav-link active');
                setclassRooms('text-secondary nav-link');
                break;
            case 'classRooms':
                setTeachers('text-secondary nav-link');
                setclassRooms('text-secondary nav-link active');
                break;
            default:
                setTeachers('text-secondary nav-link');
                setclassRooms('text-secondary nav-link');
                break;
        }
    }

    return (
        <div className="container-fluid">
            {props.timetables.length === 0 ?
                (<div className="text-center mt-5">
                    <div className="spinner-border" style={{ "width": "3rem", "height": "3rem" }} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>)
                :
                (
                    <div>
                        <ul className="nav nav-tabs">
                            <li className="nav-item" onClick={() => handleTabClick('teachers')}>
                                <Link to="/teachers" className={teachers}>הצג מערכת שעות לפי מורים</Link>
                            </li>
                            <li className="nav-item" onClick={() => handleTabClick('classRooms')}>
                                <Link to="/classRooms" className={classRooms}>הצג מערכת שעות לפי כיתות לימוד</Link>
                            </li>

                        </ul>
                        <Route path="/teachers" component={Teachers} />
                        <Route path="/classRooms" component={ClassRooms} />
                    </div>
                )}
        </div>
    );
}


const mapStateToProps = state => ({
    timetables: state.timetablesData.timetables
});

export default connect(mapStateToProps, { getTimetables })(NavBar);