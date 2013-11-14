var supsData = []; 
var url = 'http://www.trademains.com/index.php/component/supscrm_contacts/?task=superintendents&format=ajax&callback=?';

$.ajax({
	url: url, 
	contentType: "application/json",
    dataType: 'jsonp',
    success: function(json){
    	supsData = json; 
		var items = [];
		$.each(json, function(i, supsData) {
          items.push('<li data-role="list-divider">' + supsData.district_name + '</li>' + '<li>' + supsData.sups_name_title + '</li>');
   		});  // close each()
   		$('#supsUL').append( items.join('') );
   		$('#supsUL').trigger("create");
   		$('#supsUL').listview('refresh');
    }
})

$.ajax({
          url: 'http://www.trademains.com/index.php/component/supscrm_contacts/?task=schooldistricts&format=ajax&callback=?', 
          contentType: "application/json",
          dataType: 'jsonp',
          success: function(json){
             window.localStorage.setItem("schooldistrictsjson",JSON.stringify(json));
             console.log(window.localStorage.getItem("schooldistrictsjson"));

              
          }
      })