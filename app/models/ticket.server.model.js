'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

/**
 * Ticket Schema
 */
var TicketSchema = new Schema({
	server : { type: Schema.Types.Mixed, ref:'Server' },
	user : { type: Schema.Types.Mixed, ref:'User' },	
	//questions : [{type: Schema.Types.Mixed, ref: 'Question'}],
	// responses : [{
	// 	id : Number,
	// 	completed : Boolean,
	// 	token : String,
	// 	metadata : {
	// 		browser : String,
	// 		platform : String,
	// 		date_land : Date,
	// 		date_submit : Date,
	// 		user_agent : String,
	// 		referrer : String,
	// 		network_id : String
	// 	},
	// 	answers : {type: Schema.Types.Mixed, ref: 'Answer'}
	// }],
	hostingService : String,
	problem : String,	
	created_at : Date
});

var ServerSchema = new Schema({
	name : String,
	OS : String,
  });

var QuestionSchema = new Schema({
	id : String,
	question : String
});
var AnswerSchema = new Schema({
	questionId_0 : String,
	questionId_1 : String,
	questionId_2 : String,
	questionId_3 : String,
	questionId_4 : String,
	questionId_5 : String
});

mongoose.model('Server', ServerSchema);
mongoose.model('Question', QuestionSchema);
mongoose.model('Answer', AnswerSchema);
mongoose.model('Ticket', TicketSchema);
