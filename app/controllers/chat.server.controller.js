'use strict';

exports.index = function (req, res) {
    res.render('chat', {
        user: req.user || null,
        request: req
    });
};
