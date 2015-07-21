'use strict';

module.exports = function(app) {
    var chat = require('../../app/controllers/chat.server.controller');
    app.route('/chat').get(chat.index, function (req, res){
    });
};
