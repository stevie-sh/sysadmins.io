'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * JsonRequest Schema
 */
var JsonRequestSchema = new Schema({
	statusCode : Number,

	body : {
		http_status:  Number,
		stats : 
		{
			responses : {
				showing : Number,
				total : Number,
				completed : Number	
			}				
		},
		questions : [{type: Schema.Types.Mixed, ref: 'Question'}],
		responses : [{
			id : Number,
			completed : Boolean,
			token : String,
			metadata : {
				browser : String,
				platform : String,
				date_land : Date,
				date_submit : Date,
				user_agent : String,
				referrer : String,
				network_id : String
			},
			hidden : [],
			answers : {type: Schema.Types.Mixed, ref: 'Answer'}
		}]
			
	}
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

//mongoose.model('Question', QuestionSchema);
//mongoose.model('Answer', AnswerSchema);
mongoose.model('JsonRequest', JsonRequestSchema);
