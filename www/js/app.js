//Variables used to connect application ajax calls to the json output on the website.
var generalUrl = 'http://www.trademains.com/index.php/component/supscrm_contacts/?task=generalinfo&format=ajax&callback=?';
var supsUrl = 'http://www.trademains.com/index.php/component/supscrm_contacts/?task=superintendents&format=ajax&callback=?';
var schooldistrictsUrl = 'http://www.trademains.com/index.php/component/supscrm_contacts/?task=schooldistricts&format=ajax&callback=?';
var ccschooldistrictsUrl = 'http://www.trademains.com/index.php/component/supscrm_contacts/?task=ccdistricts&format=ajax&callback=?';
var countysuperintendentUrl = 'http://www.trademains.com/index.php/component/supscrm_contacts/?task=countysupsandboard&format=ajax&callback=?';
var countyandschooldistrictUrl = '';
var teacherinformationUrl = 'http://www.trademains.com/index.php/component/supscrm_contacts/?task=teacherinfo&format=ajax&callback=?';
var enrollmentUrl = '';

//initial data to be called if ajax fails, or something catastrophic happens to the json calls that are on the server.
//json files will be stored locally with the rest of the javascript.
var initGeneral = 'js/initData/generalinfo.json';
var initSups = 'js/initData/sups.json';
var initSchoolDist = 'js/initData/SchoolDistricts.json';
var initCCSchoolDist = 'js/initData/CCDistricts.json';
var initCountySupsAndBoard = 'js/initData/countysupsandboard.json';
var initCountyAndDist = '';
var initTeacher = 'js/initData/teacherinfo.json';
var initEnrollment = '';

//error variables
var failedCalls=[];
var timeoutTime = 10000;

//Check for images for the county Super and Board
var imagesAvaliable = false;

//general information ajax call
$.ajax({
	url: generalUrl, 
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(json){
    	window.localStorage.setItem("generalinformationjson",JSON.stringify(json));
        //console.log(window.localStorage.getItem("generalinformationjson")); 
        generalInfoFill(json);
    },
    error: function(){
    	try{
        	generalInfoFill(JSON.parse(window.localStorage.getItem("generalinformationjson")));
        }
        catch(e){
            noLocalData("generalinformationjson");

            //Ajax call for no localdata && no connectivity. 
            $.ajax({
              	url: initGeneral,
              	contentType: "application/json",
          	    dataType: 'json',
          	    success: function(json){
          	    	//do NOT store this information in local storage!!!!!!!!!!! Emergency situations only! 
          	    	generalInfoFill(json);
          	    },
          	    error: function(){
          	    	//If all else fails print message to page stating that something has gone wrong and please try again later.
          	    	$('#generalError').append('It appears as though something has gone horribly wrong. Please connect to a network and try to access this application again. If this problem continues please contact an administrator!');
          	    }
            })

            console.log("sorry generalUrl data could not be located");
        }
    },
    timeout: timeoutTime
})

//superintendents ajax call 
$.ajax({
	url: supsUrl, 
	contentType: "application/json",
    dataType: 'jsonp',
    success: function(json){
        window.localStorage.setItem("superintendentjson",JSON.stringify(json));
        //console.log(window.localStorage.getItem("superintendentjson")); 
        supsDataFill(json);
    },
    error: function(){
    	try{
        	supsDataFill(JSON.parse(window.localStorage.getItem("superintendentjson")));
    	}
      	catch(e){
        	noLocalData("superintendentjson");

            //Ajax call for no localdata && no connectivity. 
            $.ajax({
              	url: initSups,
              	contentType: "application/json",
          	    dataType: 'json',
          	    success: function(json){
          	    	//do NOT store this information in local storage!!!!!!!!!!! Emergency situations only! 
          	    	supsDataFill(json);
          	    },
          	    error: function(){
          	    	//If all else fails print message to page stating that something has gone wrong and please try again later.
          	    	$('#supsError').append('It appears as though something has gone horribly wrong. Please connect to a network and try to access this application again. If this problem continues please contact an administrator!');
          	    }
            })

        	console.log("sorry supsUrl data could not be located");
      	}
    },
    timeout: timeoutTime
})

//school districts ajax call
$.ajax({
    url: schooldistrictsUrl, 
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(json){
        window.localStorage.setItem("schooldistrictsjson",JSON.stringify(json));
        //console.log(window.localStorage.getItem("schooldistrictsjson"));    
        searchSupsAndDistricts("ade");
        schoolDistDataFill(json);        
    },
    error: function(){
        try{
            schoolDistDataFill(JSON.parse(window.localStorage.getItem("schooldistrictsjson")));
        }
        catch(e){
            noLocalData("schooldistrictsjson");

            //Ajax call for no localdata && no connectivity. 
            $.ajax({
              	url: initSchoolDist,
              	contentType: "application/json",
          	    dataType: 'json',
          	    success: function(json){
          	    	//do NOT store this information in local storage!!!!!!!!!!! Emergency situations only! 
          	    	schoolDistDataFill(json);
          	    },
          	    error: function(){
          	    	//If all else fails print message to page stating that something has gone wrong and please try again later.
          	    	$('#schoolDistrictsError').append('It appears as though something has gone horribly wrong. Please connect to a network and try to access this application again. If this problem continues please contact an administrator!');
          	    }
            })

            console.log("sorry schooldistrictsUrl data could not be located");
        }
    },
    timeout: timeoutTime
})
	  
//community college districts ajax call
$.ajax({
    url: ccschooldistrictsUrl, 
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(json){
        window.localStorage.setItem("ccschooldistrictsjson",JSON.stringify(json));
        //console.log(window.localStorage.getItem("ccschooldistrictsjson"));
        commCollegeDataFill(json);
    },
    error: function(){
        try{
    	    commCollegeDataFill(JSON.parse(window.localStorage.getItem("ccschooldistrictsjson")));
        }
        catch(e){
            noLocalData("ccschooldistrictsjson");

            //Ajax call for no localdata && no connectivity. 
            $.ajax({
              	url: initCCSchoolDist,
              	contentType: "application/json",
          	    dataType: 'json',
          	    success: function(json){
          	    	//do NOT store this information in local storage!!!!!!!!!!! Emergency situations only! 
          	    	commCollegeDataFill(json);
          	    },
          	    error: function(){
          	    	//If all else fails print message to page stating that something has gone wrong and please try again later.
          	    	$('#communityCollegeError').append('It appears as though something has gone horribly wrong. Please connect to a network and try to access this application again. If this problem continues please contact an administrator!');
          	    }
            })

            console.log("sorry ccschooldistrictsUrl data could not be located");
        }    
    },
    timeout: timeoutTime
})

//county superintendents ajax call
$.ajax({
    url: countysuperintendentUrl, 
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(json){
    	imagesAvaliable = true;
        window.localStorage.setItem("countysuperintendentjson",JSON.stringify(json));
        //console.log(window.localStorage.getItem("countysuperintendentjson"));       
        countySupsDataFill(json);       
    },
    error: function(){
        try{
        	imagesAvaliable = false;
        	countySupsDataFill(JSON.parse(window.localStorage.getItem("countysuperintendentjson")));
        }
        catch(e){
            noLocalData("countysuperintendentjson");
            imagesAvaliable = false;
            //Ajax call for no localdata && no connectivity. 
            $.ajax({
              	url: initCountySupsAndBoard,
              	contentType: "application/json",
          	    dataType: 'json',
          	    success: function(json){
          	    	//do NOT store this information in local storage!!!!!!!!!!! Emergency situations only! 
          	    	countySupsDataFill(json);
          	    },
          	    error: function(){
          	    	//If all else fails print message to page stating that something has gone wrong and please try again later.
          	    	$('#countySupsError').append('It appears as though something has gone horribly wrong. Please connect to a network and try to access this application again. If this problem continues please contact an administrator!');
          	    }
            })

            console.log("sorry countysuperintendentUrl data could not be located");
        }            
    },
    timeout: timeoutTime
})

//county and school districts ajax call 
$.ajax({
    url: countyandschooldistrictUrl, 
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(json){
        window.localStorage.setItem("countyandschooldistrictjson",JSON.stringify(json));
        console.log(window.localStorage.getItem("countyandschooldistrictjson"));
        countySchoolInfoDataFill(json);              
    },
    error: function(){
        try{
            countySchoolInfoDataFill(JSON.parse(window.localStorage.getItem("countyandschooldistrictjson")));
        }
        catch(e){
            noLocalData("countyandschooldistrictjson");

            //Ajax call for no localdata && no connectivity. 
            $.ajax({
              	url: initCountyAndDist,
              	contentType: "application/json",
          	    dataType: 'json',
          	    success: function(json){
          	    	//do NOT store this information in local storage!!!!!!!!!!! Emergency situations only! 
          	    	countySchoolInfoDataFill(json);
          	    },
          	    error: function(){
          	    	//If all else fails print message to page stating that something has gone wrong and please try again later.
          	    	$('#countySchoolError').append('It appears as though something has gone horribly wrong. Please connect to a network and try to access this application again. If this problem continues please contact an administrator!');
          	    }
            })            

            console.log("sorry countyandschooldistrictUrl data could not be located");
        }
    },
    timeout: timeoutTime
})

//teacher information ajax call
$.ajax({
    url: teacherinformationUrl, 
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(json){ 
        window.localStorage.setItem("teacherinformationjson",JSON.stringify(json));
        //console.log(window.localStorage.getItem("teacherinformationjson"));      
        teacherDataFill(json); 
    },
    error: function(){
        try{
            teacherDataFill(JSON.parse(window.localStorage.getItem("teacherinformationjson")));
        }
        catch(e){
            noLocalData("teacherinformationjson");

            //Ajax call for no localdata && no connectivity. 
            $.ajax({
              	url: initTeacher,
              	contentType: "application/json",
          	    dataType: 'json',
          	    success: function(json){
          	    	//do NOT store this information in local storage!!!!!!!!!!! Emergency situations only! 
          	    	teacherDataFill(json);
          	    },
          	    error: function(){
          	    	//If all else fails print message to page stating that something has gone wrong and please try again later.
          	    	$('#teacherError').append('It appears as though something has gone horribly wrong. Please connect to a network and try to access this application again. If this problem continues please contact an administrator!');
          	    }
            })  

            console.log("sorry teacherinformationUrl data could not be located");
        }  
    },
    timeout: timeoutTime
})

//enrollment ajax call
$.ajax({
    url: enrollmentUrl, 
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(json){
        window.localStorage.setItem("enrollmentjson",JSON.stringify(json));
        console.log(window.localStorage.getItem("enrollmentjson"));
        otherEnrollDataFill(json);
    },
    error: function(){
        try{
        	otherEnrollDataFill(JSON.parse(window.localStorage.getItem("enrollmentjson")));
        }
        catch(e){
            noLocalData("enrollmentjson");

            //Ajax call for no localdata && no connectivity. 
            $.ajax({
              	url: initEnrollment,
              	contentType: "application/json",
          	    dataType: 'json',
          	    success: function(json){
          	    	//do NOT store this information in local storage!!!!!!!!!!! Emergency situations only! 
          	    	otherEnrollDataFill(json);
          	    },
          	    error: function(){
          	    	//If all else fails print message to page stating that something has gone wrong and please try again later.
          	    	$('#enrollmentError').append('It appears as though something has gone horribly wrong. Please connect to a network and try to access this application again. If this problem continues please contact an administrator!');
          	    }
            })  

            console.log("sorry enrollmentUrl data could not be located");
        }  
    },
    timeout: timeoutTime
})

function generalInfoFill(json){
  	var items = [];
  	$.each(json, function(i, generalData) {
    	items.push('<center>' 
      		+ generalData.gen_title 
      		+ '<br /><br />' 
      		+ '' + generalData.address + ' ' + generalData.city + ' ' + generalData.state + ' ' + generalData.zipcode 
      		+ '<br /><br />Phone: ' 
      		+ '<a href="tel:1'+ generalData.phone.replace(/[^0-9]/g, '') + '">' + generalData.phone + '</a> |' 
      		+ 'Fax ' + generalData.fax 
      		+ '<br /><br />'
      		+ '<a href="' + generalData.website + '" data-rel="external">' + generalData.website + '</a>'
      		+ '<br /><br />'
      		+ generalData.gen_description 
      		+ '</center>'
      	);
  	});  // close each()
  	$('#general_info').append( items.join('') );
  	$('#general_info').page('create');
}

function supsDataFill(json){
    var items = [];
    $.each(json, function(i, supsData) {
  		items.push('<li data-role="list-divider">' 
        	+ supsData.district_name 
        	+ '</li><li>' 
        	+ supsData.sups_name_title 
        	+ '</li>'
    	);
	});  // close each()
    
    $('#supsUL').append( items.join('') );
    $('#supsUL').listview('refresh'); 
}

function schoolDistDataFill(json){
  	var items = [];
  	$.each(json, function(i, schoolDistData){
    	items.push('<li data-role="list-divider">'
      		+ schoolDistData.district_name 
      		+ '</li><li>'
      		+ schoolDistData.district_address + ' '
      		+ schoolDistData.district_city + ' '
      		+ schoolDistData.district_state + ' '
      		+ schoolDistData.district_zip_code 
      		+ '</li><li>'
      		+ '<a href="tel:1'+ schoolDistData.district_phone.replace(/[^0-9]/g, '') + '">' + 'Phone: ' + schoolDistData.district_phone + '</a>'
      		+ '</li><li>Fax: '
     		+ schoolDistData.district_fax 
      		+ '</li><li>'
      		+ '<a href="' + schoolDistData.district_website + '" data-rel="external">' + 'Website: ' + schoolDistData.district_website + '</a>'
      		+ '</li><li>Enrollment: '
     		+ schoolDistData.district_enrollment
      		+ '</li><li>Grades: '
      		+ schoolDistData.district_grades
      		+ '</li><li>Squre Miles: '
      		+ schoolDistData.district_square_miles
      		+'</li>'
    	);
  	});
  	$('#schoolDistUl').append( items.join('') );
  	$('#schoolDistUl').listview('refresh'); 
}

function commCollegeDataFill(json){
 	var items = [];
 	$.each(json, function(i, commcollData){
    	items.push('<li data-role="list-divider">'
      		+ commcollData.district_name 
      		+ '</li><li>'
      		+ commcollData.district_address + ' '
      		+ commcollData.district_city + ' '
      		+ commcollData.district_state + ' '
      		+ commcollData.district_zip_code 
      		+ '</li><li>'
      		+ '<a href="tel:1'+ commcollData.district_phone.replace(/[^0-9]/g, '') + '">' + 'Phone: ' + commcollData.district_phone + '</a>'
      		+ '</li><li>Fax: '
      		+ commcollData.district_fax 
      		+ '</li><li>'
      		+ '<a href="' + commcollData.district_website + '" data-rel="external">' + 'Website: ' + commcollData.district_website + '</a>'
      		+ '</li><li>Enrollment: '
      		+ commcollData.district_enrollment
      		+ '</li>'
    	);
  	});
  	$('#communCollegeUl').append( items.join('') );
  	$('#communCollegeUl').listview('refresh'); 
}

//add parameter in ajax call to check whether or not we have a data connection if not pass false to not pass image field and change formatting.
function countySupsDataFill(json){
  	if(imagesAvaliable != false){
  		console.log('this is true');
		
		var count_sups_items = [];
	  	$.each(json.countysups, function(i, countData){
	    	count_sups_items.push(countData.name + ' ' + countData.job_title + '<br />');
	  	}); 

	  	var count_board_items = [];
	  	$.each(json.countyboard, function(i, boardData){
	    	count_board_items.push(boardData.name + ' ' + boardData.area + '<br />');
	  	});

	  	$('#countySupsContent').append(count_sups_items.join(''));
	  	$('#countySupsContent').append(count_board_items.join(''));
	  	$('#general_info').page('create');  	
  	}
  	else{
  		console.log('this is false');

		var count_sups_items = [];
	  	$.each(json.countysups, function(i, countData){
	    	count_sups_items.push(countData.name + ' ' + countData.job_title + '<br />');
	  	}); 

	  	var count_board_items = [];
	  	$.each(json.countyboard, function(i, boardData){
	    	count_board_items.push(boardData.name + ' ' + boardData.area + '<br />');
	  	});

	  	$('#countySupsContent').append(count_sups_items.join(''));
	  	$('#countySupsContent').append(count_board_items.join(''));
	  	$('#general_info').page('create');  
  	} 
}

function countySchoolInfoDataFill(json){
  //fill out
}

function teacherDataFill(json){
  	//array for first bold section
	var total_Teachers_Countywide_Items = [];

  	$.each(json.totalTeachersCountyWide, function(i, totalTeachers){
  		total_Teachers_Countywide_Items.push('<b>' 
    		+ totalTeachers.catTitle 
    		+ '</b>' + ' ' + 
        	totalTeachers.numberTeachers 
        	+ '<br />' 
        	+ totalTeachers.source 
        	+ '<br />' + '<br />');
  	});
  
  	//array for second bold section and source
  	var avg_Salary_Title = [];
  	$.each(json.teacherSalary, function(i, avgSalary){
	  	avg_Salary_Title.push('<b>' 
	  		+ avgSalary.catTitle 
	  		+ '</b>' + '<br />' 
	  		+ avgSalary.source);
  	});

  	//array for school districts
  	var avg_Salary_District = [];
  	$.each(json.teacherSalary, function(i, districts){
    	avg_Salary_District.push(districts.districtsType 
    		+ '<br />');
  	});

  	//array for minimum salary
    var minimum_salary = [];
    $.each(json.teacherSalary, function(i, districts){
      avg_Salary_District.push(districts.minimum 
        + '<br />');
    });

	  //array for max salary
    var maximum_salary = [];
    $.each(json.teacherSalary, function(i, districts){
      avg_Salary_District.push(districts.maximum 
        + '<br />');
    });

  	//array for teacher eth/race title
 	  var ethnic_Racial_Dist_Title = [];
  	$.each(json.teacherEthnicDist, function(i, teacherEthnicity){
    	ethnic_Racial_Dist_Title.push('<b>'
        + teacherEthnicity.catTitle + '</b>'
    		+ '<br />' + teacherEthnicity.source + '<br />' + '<br />');
  	});

    //array for ehtnicity/race and percentage
    var ethnic_Racial_Dist_Items = [];
    $.each(json.teacherEthnicDist, function(i, teacherEthnicity){
      ethnic_Racial_Dist_Items.push(teacherEthnicity.teacher_ethnicity 
        + ' ' + teacherEthnicity.teacher_percent + '<br />');
    });

 	  $('#teachersCountywide').append(total_Teachers_Countywide_Items.join(''));
  	$('#avgTeacherSalary').append(avg_Salary_Title);
  	$('#districts').append(avg_Salary_District);
  	$('#minimum').append(minimum_salary);
  	$('#maximum').append(maximum_salary);
  	$('#teacherEthnicRacialDist').append(ethnic_Racial_Dist_Title[0]);
    $('#teacherEthnicRacialDist').append(ethnic_Racial_Dist_Items);
}

function otherEnrollDataFill(json){
  //other stuff
 
}

function noLocalData(failedajax){
  //this function collects all the failed ajax calls to be used to tell user what stuff is locally called
  //this function is called by all ajax calls that timeout
  failedCalls.push("failedajax");
}

/*This will be the search algorithm that powers the entire search function for the application. 
It will pull data from the json that is either pulled from the website or stored locally and be able to dynamically add content to the search page as results. 
If a user submits information that matches a school district or a super intendent for a school district it will output a combined field with the districts information + the superintendents name. 
If the user input does not match either a superintendent or a school district, the search function will look through the rest of the data and determine if it is in another table, 
if it is it will direct the user to that page within the application. If it is not the application will inform the user that it was unable to find the item that they were searching for.*/
function search(searchfield){
  var categoryHits = searchCategories(searchfield);
  var supsdistHits = searchSupsAndDistricts(searchfield);

  $.each(categoryHits, function(i,hit){
    //append link to search page
  });

  $.each(supsdistHits, function(i, hit){
    //append info
  })
}

function searchCategories(searchfield){

}

function searchSupsAndDistricts(searchfield){
  //array to hold all hits
  var hits = [];

  //get parsed jsons to search through
  var supsjson = JSON.parse(window.localStorage.getItem("superintendentjson"));
  var distjson = JSON.parse(window.localStorage.getItem("schooldistrictsjson"));

  //create regex containing search term pattern
  var searchregex = new RegExp('(?:'+searchfield+')','i');
  //look through all district data for a hit using foreach loop
  $.each(distjson, function(i,data){
    var isfound = false;
    //console.log(data);
    $.each(data, function(i,insideData){
      isFound = searchregex.test(insideData);
      return false;
    });
    if(isFound){
      //add to hit array using another function
      console.log(data);
    }
  });

  $.each(supsjson, function(i,data){
    var isfound = false;
    //console.log(data);
    $.each(data, function(i,insideData){
      isFound = searchregex.test(insideData);
      return false;
    });
    if(isFound){
      //add to hit array using another function
      console.log(data);
    }
  });


}



//class definition of a school district object
function SchoolDistrict(district_name, address, city, state, zipcode, phone, fax, website, enrollment, grades, square_miles, superintendent){
  this.district_name = district_name;
  this.address = address;
  this.city = city;
  this.state = state;
  this.zipcode = zipcode;
  this.phone = phone;
  this.fax = fax;
  this.website = website;
  this.enrollment = enrollment;
  this.grades = grades;
  this.square_miles = square_miles;
  this.superintendent = superintendent;

  // checks if 2 school districts are the same based on name and address
  function equals(aSchoolDistrict){
    return (district_name == aSchoolDistrict.district_name) && (address == aSchoolDistrict.address);
  }
}