'use strict';

(function() {
	// Authentication controller Spec
	describe('TicketController', function() {
		// Initialize global variables
		var TicketController,
			scope,
			Authentication,
			$state,
			$httpBackend,
			$stateParams,
			$location;

		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Load the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _$state_, _Authentication_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$state  = _$state_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;
			Authentication = _Authentication_;

      // Expect arbitrary requests to routes with 'views' somewhere in them
      $httpBackend.when('GET', /.+\/views\/.+/).respond(200);

			// Initialize the Authentication controller
			TicketController = $controller('TicketController', {
				$scope: scope
			});
		}));

		it('Should redirect to servers state after ticket submission', function () {
			//TODO: Add test for the expected HTTP post responses
			//			How to plug into a functions parameter for the http.success response	
			$httpBackend.expectPOST('/api/ticket').respond(200, { message: 'Ticket Successfully Created' });
			$httpBackend.expectPOST('/api/sendmail').respond(201);
			scope.authentication = Authentication;	
			scope.authentication.user = {
				"__v": 0,
				"provider": "local",
				"username": "rivanov",
				"created": "2015-08-07T10:31:30.688Z",
				"roles": [
					"user"
				],
				"email": "rivanov@gmail.com"
			};

			scope.ticket =	{	
					hostingService: "DigitalOcean",
					problem: "asdfasfd",
					server: {
						OS: "Ubuntu",
						name: "asdfasdf"
				}}
			scope.submitTicket();
			$httpBackend.flush();
			
			expect	
			expect($state.current.name).toBe('servers');	
		});
	}); // end describe
}());
