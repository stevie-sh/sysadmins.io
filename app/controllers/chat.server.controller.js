'use strict';

exports.index = function (req, res) {
    res.render('mvp1', {
        user: req.user || null,
        request: req
    });
};
