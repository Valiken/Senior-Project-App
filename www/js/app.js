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

var sups = $.getJSON( "js/superintendents.json", function() {
  console.log( "success" );
})
  .done(function() {
    console.log( "second success" );
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });