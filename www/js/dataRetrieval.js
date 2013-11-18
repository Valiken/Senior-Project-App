var supsData = []; 

// just to make the ajax calls look a little neater. 
var generalUrl = '';
var supsUrl = 'http://www.trademains.com/index.php/component/supscrm_contacts/?task=superintendents&format=ajax&callback=?';
var schooldistrictsUrl = 'http://www.trademains.com/index.php/component/supscrm_contacts/?task=schooldistricts&format=ajax&callback=?';
var ccschooldistrictsUrl = 'http://www.trademains.com/index.php/component/supscrm_contacts/?task=ccdistricts&format=ajax&callback=?';
var countysuperintendentUrl = '';
var countyandschooldistrictUrl = '';
var teacherinformationUrl = '';
var enrollmentUrl = '';
var communitycollegeUrl = '';
var ropUrl = '';
//all dem links. 


//general information ajax call
$.ajax({
          url: generalUrl, 
          contentType: "application/json",
          dataType: 'jsonp',
          success: function(json){
             window.localStorage.setItem("generalinformationjson",JSON.stringify(json));
             console.log(window.localStorage.getItem("generalinformationjson"));

              
          },
          error: function(){
          	console.log("sorry generalUrl data could not be located");
          }
      })

//superintendents ajax call 
$.ajax({
	url: supsUrl, 
	contentType: "application/json",
    dataType: 'jsonp',
    success: function(json){
        window.localStorage.setItem("superintendentjson",JSON.stringify(json));
        console.log(window.localStorage.getItem("superintendentjson"));   	

    	supsData = json; 
		var items = [];
		$.each(json, function(i, supsData) {
          items.push('<li data-role="list-divider">' + supsData.district_name + '</li>' + '<li>' + supsData.sups_name_title + '</li>');
   		});  // close each()
   		$('#supsUL').append( items.join('') );
   		$('#supsUL').trigger("create");
   		$('#supsUL').listview('refresh');	
    },
    error: function(){
    	console.log("sorry supsUrl data could not be located");
    }

})

//school distrcits ajax call
$.ajax({
          url: schooldistrictsUrl, 
          contentType: "application/json",
          dataType: 'jsonp',
          success: function(json){
             window.localStorage.setItem("schooldistrictsjson",JSON.stringify(json));
             console.log(window.localStorage.getItem("schooldistrictsjson"));              
          },
          error: function(){
          	console.log("sorry schooldistrictsUrl data could not be located");
          }
      })
	  
//community college distrcits ajax call
$.ajax({
          url: ccschooldistrictsUrl, 
          contentType: "application/json",
          dataType: 'jsonp',
          success: function(json){
             window.localStorage.setItem("ccschooldistrictsjson",JSON.stringify(json));
             console.log(window.localStorage.getItem("ccschooldistrictsjson"));
          },
          error: function(){
          	console.log("sorry ccschooldistrictsUrl data could not be located");
          }
      })

//county superintendents ajax call
$.ajax({
          url: countysuperintendentUrl, 
          contentType: "application/json",
          dataType: 'jsonp',
          success: function(json){
             window.localStorage.setItem("countysuperintendentjson",JSON.stringify(json));
             console.log(window.localStorage.getItem("countysuperintendentjson"));              
          },
          error: function(){
          	console.log("sorry countysuperintendentUrl data could not be located");
          }
      })

//county and school districts ajax call 
$.ajax({
          url: countyandschooldistrictUrl, 
          contentType: "application/json",
          dataType: 'jsonp',
          success: function(json){
             window.localStorage.setItem("countyandschooldistrictjson",JSON.stringify(json));
             console.log(window.localStorage.getItem("countyandschooldistrictjson"));              
          },
          error: function(){
          	console.log("sorry countyandschooldistrictUrl data could not be located");
          }
      })

//teacher information ajax call
$.ajax({
          url: teacherinformationUrl, 
          contentType: "application/json",
          dataType: 'jsonp',
          success: function(json){
             window.localStorage.setItem("teacherinformationjson",JSON.stringify(json));
             console.log(window.localStorage.getItem("teacherinformationjson"));             
          },
          error: function(){
          	console.log("sorry teacherinformationUrl data could not be located");
          }
      })

//enrollment ajax call
$.ajax({
          url: enrollmentUrl, 
          contentType: "application/json",
          dataType: 'jsonp',
          success: function(json){
             window.localStorage.setItem("enrollmentjson",JSON.stringify(json));
             console.log(window.localStorage.getItem("enrollmentjson"));
          },
          error: function(){
          	console.log("sorry enrollmentUrl data could not be located");
          }
      })

//community college ajax call 
$.ajax({
          url: communitycollegeUrl, 
          contentType: "application/json",
          dataType: 'jsonp',
          success: function(json){
             window.localStorage.setItem("communitycollegejson",JSON.stringify(json));
             console.log(window.localStorage.getItem("communitycollegejson"));
          },
          error: function(){
          	console.log("sorry communitycollegeUrl data could not be located");
          }
      })

//rop ajax call
$.ajax({
          url: ropUrl, 
          contentType: "application/json",
          dataType: 'jsonp',
          success: function(json){
             window.localStorage.setItem("ropjson",JSON.stringify(json));
             console.log(window.localStorage.getItem("ropjson"));
          },
          error: function(){
          	console.log("sorry ropUrl data could not be located");
          }
      })
