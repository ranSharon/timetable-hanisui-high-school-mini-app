const express = require('express');
const router = express.Router();
const TimeTable = require('../models/timeTable');

router.get('/timeTables', (req, res) => {
    TimeTable.find(function (err, timeTable) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(timeTable);
        }
    });
});

module.exports = router;