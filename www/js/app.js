App = Ember.Application.create();

App.Router.map(function() {
	this.resource('home');
	this.resource('fingertip');
	this.resource('search');
	this.resource('saved');
});

App.FingertipRoute = Ember.Route.extend({
	model: function() {
		return sups;
	}
});

var sups = [{
	id: '1',
	district_name: "Adelanto School District",
	sups_name_title: "Dr. Lily Matos DeBlieux"
}, {
	id: '2',
	district_name: "Alta Loma School District",
	sups_name_title: "Mr. Michael Whisenand"
}, {	
	id: '3',
	district_name: "Apple Valley Unified School District",
	sups_name_title: "Mr. Thomas Hoegerman"
}, {
	id: '4',
	district_name: "Baker Valley Unified School District",
	sups_name_title: "Ms. Ronda Tremblay"
}];

