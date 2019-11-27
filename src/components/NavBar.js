import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { getTimetables } from '../actions/timetablesActions';
import ClassRooms from '../pages/ClassRooms';
import Teachers from '../pages/Teachers';
import { useDispatch, useSelector } from 'react-redux';

const NavBar = () => {
    const [teachers, setTeachers] = useState('text-secondary nav-link');
    const [classRooms, setClassRooms] = useState('text-secondary nav-link');
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('useEffect NavBar');
        dispatch(getTimetables());
        const path = window.location.pathname.substr(1);
        handleTabClick(path);
    }, [dispatch]);

    const handleTabClick = tab => {
        switch (tab) {
            case 'teachers':
                setTeachers('text-secondary nav-link active');
                setClassRooms('text-secondary nav-link');
                break;
            case 'classRooms':
                setTeachers('text-secondary nav-link');
                setClassRooms('text-secondary nav-link active');
                break;
            default:
                setTeachers('text-secondary nav-link');
                setClassRooms('text-secondary nav-link');
                break;
        }
    };

    return (
        <div className="container-fluid">
            {state.timetablesData.timetables.length === 0 ? (
                <div className="text-center mt-5">
                    <div
                        className="spinner-border"
                        style={{ width: '3rem', height: '3rem' }}
                        role="status"
                    >
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                <div>
                    <ul className="nav nav-tabs">
                        <li
                            className="nav-item"
                            onClick={() => handleTabClick('teachers')}
                        >
                            <Link to="/teachers" className={teachers}>
                                הצג מערכת שעות לפי מורים
                            </Link>
                        </li>
                        <li
                            className="nav-item"
                            onClick={() => handleTabClick('classRooms')}
                        >
                            <Link to="/classRooms" className={classRooms}>
                                הצג מערכת שעות לפי כיתות לימוד
                            </Link>
                        </li>
                    </ul>
                    <Route path="/teachers" component={Teachers} />
                    <Route path="/classRooms" component={ClassRooms} />
                </div>
            )}
        </div>
    );
};

export default NavBar;
