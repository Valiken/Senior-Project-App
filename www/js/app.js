App = Ember.Application.create();

App.Router.map(function() {
	this.resource('booklet');
	this.resource('search');
	this.resource('about');
});

App.ApplicationView = Ember.View.extend({
  currentPathDidChange: function() {
    Ember.run.next( this, function() {
      this.$("ul.nav li:has(>a.active)").addClass('active');
      this.$("ul.nav li:not(:has(>a.active))").removeClass('active');
    });
  }.observes('controller.currentPath')
});

App.BookletRoute = Ember.Route.extend({
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