'use strict';

exports.index = function (req, res) {
    res.render('index', {
        user: req.user || null,
        request: req
    });
};
