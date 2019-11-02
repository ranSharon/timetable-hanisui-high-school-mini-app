import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { CSVLink } from "react-csv";

const Timetable = (props) => {
    const [lessons, setLessons] = useState([]);
    const [csvBtnDisabled, setCsvBtnDisabled] = useState(true);
    const [csvData, setCsvData] = useState([]);
    const [csvFileName, setCsvFileName] = useState('');

    useEffect(() => {
        setLessons(getLessonsForSelectedOption());
    }, [props.selectedOption]);

    const getLessonsForSelectedOption = () => {
        let lessonsFotSelectedOption = [];
        const timeTables = [...props.timetables];

        for (let i = 0; i <= timeTables.length - 1; i++) {
            for (let j = 0; j <= timeTables[i].days.length - 1; j++) {
                for (let k = 0; k <= timeTables[i].days[j].hours.length - 1; k++) {
                    for (let l = 0; l <= timeTables[i].days[j].hours[k].constraints.length - 1; l++) {
                        if (props.type === 'teachers') {
                            for (let m = 0; m <= timeTables[i].days[j].hours[k].constraints[l].groupingTeachers.length - 1; m++) {
                                if (props.selectedOption === timeTables[i].days[j].hours[k].constraints[l].groupingTeachers[m]) {
                                    lessonsFotSelectedOption = [...lessonsFotSelectedOption, {
                                        dayAndHour: timeTables[i].days[j].day + ' ' + timeTables[i].days[j].hours[k].hour,
                                        lesson: { ...timeTables[i].days[j].hours[k].constraints[l] }
                                    }];
                                }
                            }
                        }
                        if (props.type === 'classRooms') {
                            if (props.selectedOption === timeTables[i].days[j].hours[k].constraints[l].classRoom) {
                                lessonsFotSelectedOption = [...lessonsFotSelectedOption, {
                                    dayAndHour: timeTables[i].days[j].day + ' ' + timeTables[i].days[j].hours[k].hour,
                                    lesson: { ...timeTables[i].days[j].hours[k].constraints[l] }
                                }]
                            }
                        }
                    }
                }
            }
        }
        lessonsFotSelectedOption = [...getUnique(lessonsFotSelectedOption, 'dayAndHour')];
        lessonsFotSelectedOption.forEach(lesson => {
            lesson['day'] = lesson['dayAndHour'].split(' ')[0];
            lesson['hour'] = parseInt(lesson['dayAndHour'].split(' ')[1]);
        })
        if (lessonsFotSelectedOption.length === 0) {
            setCsvBtnDisabled(true);
        } else {
            setCsvBtnDisabled(false);
        }
        setCsvData(lessonsToCsv(lessonsFotSelectedOption));
        setCsvFileName(fileNameFotSelectedOption());
        return lessonsFotSelectedOption;
    };

    const lessonsToCsv = (array) => {
        const csv = [
            [
                'Subject',
                'Start Date',
                'Start Time',
                'End Date',
                'End Time',
                'All Day Event',
                'Description',
                'Location',
                'Private'
            ]
        ];
        for (let i = 0; i <= array.length - 1; i++) {
            const subject = ('שיעור" ' + array[i].lesson.subject + ' עבור כיתות ' + array[i].lesson.classNumber.join(',')).split('"').join(' ');
            const description = ('נלמד על ידי ' + array[i].lesson.groupingTeachers.join(',') + ' ביום ' + array[i].day).split('"').join(' ');
            const location = ('בכיתה ' + array[i].lesson.classRoom).split('"').join(' ');
            let startTime = '';
            let endTime = '';
            if(array[i].hour - 1 > 12){
                startTime = (array[i].hour - 13) + ':00 PM';
            } else {
                startTime = (array[i].hour - 1) + ':00 AM';
            }
            if(array[i].hour > 12){
                endTime = (array[i].hour - 12) + ':00 PM';
            } else {
                endTime = (array[i].hour) + ':00 AM';
            }
            const lesson = [
                subject,
                '',
                startTime,
                '',
                endTime,
                'False',
                description,
                location,
                'False'
            ];
            csv.push(lesson);
        }
        return csv;
    }

    const fileNameFotSelectedOption = () => {
        let fileName = 'לוח-שיעורים-עבור';
        if (props.type === 'teachers') {
            fileName += '-המורה-' + props.selectedOption.split(' ').join('-');
        }
        if (props.type === 'classRooms') {
            fileName += '-הכיתה-' + props.selectedOption.split(' ').join('-');
        }
        return fileName + '.csv';
    }

    const getUnique = (arr, comp) => {
        const unique = arr
            .map(e => e[comp])

            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);

        return unique;
    }

    const createTimeTableView = () => {
        return (
            <div className="row justify-content-center m-0">
                <div className="col col-1 border border-dark text-center" value='שעות'>שעות
                {createTimeCol()}
                </div>
                <div className="col-11 row">
                    <div className="col-2 border border-dark text-center" ><div className="border-bottom border-dark" style={{ "marginRight": "-15px", "marginLeft": "-15px" }} value='ראשון'>ראשון</div>
                        {createEmptyBoxs('ראשון')}
                        {createBoxesForDay('ראשון', 0)}
                    </div>
                    <div className="col-2 border border-dark text-center" ><div className="border-bottom border-dark" style={{ "marginRight": "-15px", "marginLeft": "-15px" }} value='שני'>שני</div>
                        {createEmptyBoxs('שני')}
                        {createBoxesForDay('שני', 1)}
                    </div>
                    <div className="col-2 border border-dark text-center" ><div className="border-bottom border-dark" style={{ "marginRight": "-15px", "marginLeft": "-15px" }} value='שלישי'>שלישי</div>
                        {createEmptyBoxs('שלישי')}
                        {createBoxesForDay('שלישי', 2)}
                    </div>
                    <div className="col-2 border border-dark text-center" ><div className="border-bottom border-dark" style={{ "marginRight": "-15px", "marginLeft": "-15px" }} value='רביעי'>רביעי</div>
                        {createEmptyBoxs('רביעי')}
                        {createBoxesForDay('רביעי', 3)}
                    </div>
                    <div className="col-2 border border-dark text-center" ><div className="border-bottom border-dark" style={{ "marginRight": "-15px", "marginLeft": "-15px" }} value='חמישי'>חמישי</div>
                        {createEmptyBoxs('חמישי')}
                        {createBoxesForDay('חמישי', 4)}
                    </div>
                    <div className="col-2 border border-dark text-center" ><div className="border-bottom border-dark" style={{ "marginRight": "-15px", "marginLeft": "-15px" }} value='שישי'>שישי</div>
                        {createEmptyBoxs('שישי')}
                        {createBoxesForDay('שישי', 5)}
                    </div>
                </div>
            </div>
        );
    }

    const createTimeCol = () => {
        let TimeCol = [];
        for (let i = 7; i < 20; i++) {
            let time = i + ':00-' + (i + 1) + ':00';
            TimeCol = [...TimeCol,
            <div key={i} className="row border-top border-dark text-center" style={{ "height": "50px" }}>{time}</div>
            ];
        }
        return TimeCol;
    }

    const createEmptyBoxs = (day) => {
        if (props.timetables.length === 0) {
            return null;
        }
        if (objectEmpty(props.timetables[0])) {
            return null;
        }
        let dayView = {};
        let days = [...props.timetables[0].days];
        for (let i = 0; i <= days.length - 1; i++) {
            if (days[i].day === day) {
                dayView = { ...days[i] };
                break;
            }
        }
        if (objectEmpty(dayView)) {
            return null;
        }

        let emptyBoxes = [];
        for (let j = 8; j < dayView.hours[0].hour; j++) {
            emptyBoxes = [...emptyBoxes, <div key={j} style={{ "height": "50px", "width": "162px" }}></div>];
        }

        return emptyBoxes;
    }

    const createBoxesForDay = (day, col) => {
        if (objectEmpty(props.timetables[0])) {
            return null;
        }
        let dayView = {};
        let days = [...props.timetables[0].days];
        for (let i = 0; i <= days.length - 1; i++) {
            if (days[i].day === day) {
                dayView = { ...days[i] };
                break;
            }
        }

        if (objectEmpty(dayView)) {
            return null;
        }

        let hoursBoxes = [];
        let prevId = '';
        for (let i = 0; i <= dayView.hours.length - 1; i++) {
            let borderBottom = '';
            if (i === dayView.hours.length - 1) {
                borderBottom = "border-bottom";
            }
            let height = 50;
            let borderRadius = '';
            let subject = '';
            let teachers = '';
            let classes = '';
            let grouping = '';
            let classRoom = '';
            for (let j = 0; j <= lessons.length - 1; j++) {
                if (day === lessons[j].day && dayView.hours[i].hour === lessons[j].hour) {
                    if (prevId !== lessons[j].lesson._id) {
                        height = height * parseInt(lessons[j].lesson.hours);
                        borderRadius = 'rounded';
                        subject = lessons[j].lesson.subject + ', ';
                        teachers = arrayToText(lessons[j].lesson.groupingTeachers) + ', ';
                        classes = arrayToText(lessons[j].lesson.classNumber) + ', ';
                        grouping = isGrouping(lessons[j].lesson.subjectGrouping);
                        classRoom = lessons[j].lesson.classRoom;
                        prevId = lessons[j].lesson._id;
                    }
                }
            }
            hoursBoxes = [...hoursBoxes,
            <div
                key={i}
                className={"row text-center border-top border-dark " + borderBottom + " " + borderRadius}
                style={{ "fontSize": '11px', "height": height + "px", "marginRight": "-15px", "marginLeft": "-15px", "backgroundColor": "white" }}
            >
                {subject}
                {teachers}
                {classes}
                {grouping}
                {classRoom}
            </div>
            ];
        }

        return hoursBoxes;
    }

    const objectEmpty = (obj) => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    const arrayToText = (array) => {
        let text = ``;
        array.forEach(element => {
            text = `${text} ${element},`;
        });
        return text.substr(0, text.length - 1);
    };

    const isGrouping = (bool) => {
        let text = ``;
        if (bool) {
            text = `הקבצות ,`
        }
        return text;
    }

    return (
        <div >
            <CSVLink data={csvData} filename={csvFileName}>
                <button
                    type="button"
                    className="btn btn-secondary mb-3"
                    disabled={csvBtnDisabled}>
                    ייצא לקובץ-CSV
                </button>
            </CSVLink>
            {createTimeTableView()}
        </div>
    );
}

const mapStateToProps = state => ({
    timetables: state.timetablesData.timetables,
    selectedOption: state.optionsData.selectedOption
});

export default connect(mapStateToProps, null)(Timetable);