/* Welcome to the app.js that powers the application! 
	
	What you will find in this first section is the variables that power the application and provide all of the information that is displayed. 
	The domain for the ajax calls is split into two parts first the var domain which provides the top level of the URL, this makes it easy to maintain the application in case of a server url change. 
	The second set of variables is the data init section. That section provides access to the backup json information that is shipped with the application. This is only used in case of an ajax failure. 
	The imagesAvaliable checks for the possibility of images for the county sups and board section. 
	Error variables are self explanatory. 

*/

//top domain for where the application information is going to be pulled from.
var domain = 'http://www.trademains.com';

//Variables used to connect application ajax calls to the json output on the website.
var generalUrl = '/index.php/component/supscrm_contacts/?task=generalinfo&format=ajax&callback=?';
var supsUrl = '/index.php/component/supscrm_contacts/?task=superintendents&format=ajax&callback=?';
var schooldistrictsUrl = '/index.php/component/supscrm_contacts/?task=schooldistricts&format=ajax&callback=?';
var ccschooldistrictsUrl = '/index.php/component/supscrm_contacts/?task=ccdistricts&format=ajax&callback=?';
var countysuperintendentUrl = '/index.php/component/supscrm_contacts/?task=countysupsandboard&format=ajax&callback=?';
var countyandschooldistrictUrl = '/index.php/component/supscrm_contacts/?task=countyandschooldistrict&format=ajax&callback=?';
var teacherinformationUrl = '/index.php/component/supscrm_contacts/?task=teacherinfo&format=ajax&callback=?';
var enrollmentUrl = '';
var ropUrl = '/index.php/component/supscrm_contacts/?task=rop&format=ajax&callback=?';

//initial data to be called if ajax fails, or something catastrophic happens to the json calls that are on the server.
//json files will be stored locally with the rest of the javascript.
var initGeneral = 'js/initData/generalinfo.json';
var initSups = 'js/initData/sups.json';
var initSchoolDist = 'js/initData/SchoolDistricts.json';
var initCCSchoolDist = 'js/initData/CCDistricts.json';
var initCountySupsAndBoard = 'js/initData/countysupsandboard.json';
var initCountyAndDist = 'js/initData/countyAndSchoolDist.json';
var initTeacher = 'js/initData/teacherinfo.json';
var initEnrollment = '';
var initROP = 'js/initData/ROPDist.json';

//Check for images for the county Super and Board
var imagesAvaliable = false;

//error variables
var failedCalls=[];
var timeoutTime = 10000;
var localInfoAlert = 'It appears as though you have opened the application for the first time without an internet connection! For the most up to date information, please connect to the internet and reopen the application.';
var infoLoadFailure = 'It appears as though something has gone horribly wrong. Please connect to a network and try to access this application again. If this problem continues please contact an administrator!';

/* The following section contains all of the ajax calls that are used to grab data from the SBCC server through a set of json dumps that provide us access to the data stored on the backend MySQL server.
	
	The ajax calls also have an ajax call inside of them that provide access to a set of stored json data that is shipped with the application. This data is used only in the event that someone downloads 
	the app and then opens it for the first time without access to the internet. 
	
	The ajax call also handles information when the first ajax call fails, it will then check localstorage, if localstorage contains the information then it will display that, otherwise it will restore to 
	local data, if local data fails, it will print an error message. 
*/ 

//general information ajax call
$.ajax({
	url: domain + generalUrl, 
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

          	    	$('#generalError').append(localInfoAlert);
          	    	generalInfoFill(json);
          	    },
          	    error: function(){
          	    	//If all else fails print message to page stating that something has gone wrong and please try again later.
          	    	$('#generalError').append(infoLoadFailure);
          	    }
            })

            console.log("sorry generalUrl data could not be located");
        }
    },
    timeout: timeoutTime
})

//superintendents ajax call 
$.ajax({
	url: domain + supsUrl, 
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
          	    	$('#supsError').append('It appears as though you have opened the application for the first time without an internet connection! For the most up to date information, please connect to the internet and reopen the application.');
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
    url: domain + schooldistrictsUrl, 
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(json){
        window.localStorage.setItem("schooldistrictsjson",JSON.stringify(json));
        //console.log(window.localStorage.getItem("schooldistrictsjson"));    
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
          	    	$('#schoolDistrictsError').append('It appears as though you have opened the application for the first time without an internet connection! For the most up to date information, please connect to the internet and reopen the application.');
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
    url: domain + ccschooldistrictsUrl, 
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
          	    	$('#communityCollegeError').append('It appears as though you have opened the application for the first time without an internet connection! For the most up to date information, please connect to the internet and reopen the application.');
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

//rop ajax call
$.ajax({
    url: domain + ropUrl, 
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(json){
        window.localStorage.setItem("ropjson",JSON.stringify(json));
        //console.log(window.localStorage.getItem("ropjson"));
        ropDataFill(json);
    },
    error: function(){
        try{
          ropDataFill(JSON.parse(window.localStorage.getItem("ropjson")));
        }
        catch(e){
            noLocalData("ropjson");

            //Ajax call for no localdata && no connectivity. 
            $.ajax({
                url: initROP,
                contentType: "application/json",
                dataType: 'json',
                success: function(json){
                  //do NOT store this information in local storage!!!!!!!!!!! Emergency situations only! 
                  $('#ropError').append('It appears as though you have opened the application for the first time without an internet connection! For the most up to date information, please connect to the internet and reopen the application.');
                  ropDataFill(json);
                },
                error: function(){
                  //If all else fails print message to page stating that something has gone wrong and please try again later.
                  $('#ropError').append('It appears as though something has gone horribly wrong. Please connect to a network and try to access this application again. If this problem continues please contact an administrator!');
                }
            })

            console.log("sorry ccschooldistrictsUrl data could not be located");
        }    
    },
    timeout: timeoutTime
})

//county superintendents ajax call
$.ajax({
    url: domain + countysuperintendentUrl, 
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
          	    	$('#countySupsError').append('It appears as though you have opened the application for the first time without an internet connection! For the most up to date information, please connect to the internet and reopen the application.');
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
    url: domain + countyandschooldistrictUrl, 
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
          	    	$('#countySchoolError').append('It appears as though you have opened the application for the first time without an internet connection! For the most up to date information, please connect to the internet and reopen the application.');
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
    url: domain + teacherinformationUrl, 
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
          	    	$('#teacherError').append('It appears as though you have opened the application for the first time without an internet connection! For the most up to date information, please connect to the internet and reopen the application.');
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
    url: domain + enrollmentUrl, 
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
          	    	$('#enrollmentError').append('It appears as though you have opened the application for the first time without an internet connection! For the most up to date information, please connect to the internet and reopen the application.');
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

/* This section contains the population functions for the application. 
	Each page that requires data from the server has one of these functions. 
	These functions also dynamically add the HTML formatting as well as refreshing the page to display that information.
*/


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
  	}); // close each()
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
	}); // close each()
    
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
  	}); // close each()
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
  	}); // close each()
  	$('#communCollegeUl').append( items.join('') );
  	$('#communCollegeUl').listview('refresh'); 
}

function ropDataFill(json){
  	var items = [];
  	$.each(json, function(i, ropData){
      	items.push('<li data-role="list-divider">'
          	+ ropData.district_name 
          	+ '</li><li>'
          	+ ropData.district_address + ' '
          	+ ropData.district_city + ' '
          	+ ropData.district_state + ' '
          	+ ropData.district_zip_code 
          	+ '</li><li>'
          	+ '<a href="tel:1'+ ropData.district_phone.replace(/[^0-9]/g, '') + '">' + 'Phone: ' + ropData.district_phone + '</a>'
          	+ '</li><li>Fax: '
          	+ ropData.district_fax 
          	+ '</li><li>'
          	+ '<a href="' + ropData.district_website + '" data-rel="external">' + 'Website: ' + ropData.district_website + '</a>'
          	+ '</li>'
      	);
    }); // close each()
  $('#ropUl').append( items.join('') );
  $('#ropUl').listview('refresh'); 
}

//The if else statement is here to determine whether or not it is possible to load images into the application.
function countySupsDataFill(json){
  	if(imagesAvaliable != false){
  		console.log('this is true');
		
		var count_sups_items = [];
	  	$.each(json.countysups, function(i, countData){
	    	count_sups_items.push(countData.name + ' ' + countData.job_title + '<br />');
	  	}); // close each()

	  	var count_board_items = [];
	  	$.each(json.countyboard, function(i, boardData){
	    	count_board_items.push(boardData.name + ' ' + boardData.area + '<br />');
	  	}); // close each()

	  	$('#countySupsContent').append(count_sups_items.join(''));
	  	$('#countySupsContent').append(count_board_items.join(''));
	  	$('#general_info').page('create');  	
  	}
  	else{
  		console.log('this is false');

		var count_sups_items = [];
	  	$.each(json.countysups, function(i, countData){
	    	count_sups_items.push(countData.name + ' ' + countData.job_title + '<br />');
	  	}); // close each()

	  	var count_board_items = [];
	  	$.each(json.countyboard, function(i, boardData){
	    	count_board_items.push(boardData.name + ' ' + boardData.area + '<br />');
	  	}); // close each()

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
        	+ '<br />' + '<br />'
        );
  	}); // close each()
  
  	//array for second bold section and source
  	var avg_Salary_Title = [];
  	$.each(json.teacherSalary, function(i, avgSalary){
	  	avg_Salary_Title.push('<b>' 
	  		+ avgSalary.catTitle 
	  		+ '</b>' + '<br />' 
	  		+ avgSalary.source
	  	);
  	}); // close each()

  	//array for school districts
  	var avg_Salary_District = [];
  	$.each(json.teacherSalary, function(i, districts){
    	avg_Salary_District.push(districts.districtsType 
    		+ '<br />'
    	);
  	}); // close each()

  	//array for minimum salary
    var minimum_salary = [];
    $.each(json.teacherSalary, function(i, districts){
      avg_Salary_District.push(districts.minimum 
        + '<br />'
        );
    }); // close each()

	//array for max salary
    var maximum_salary = [];
    $.each(json.teacherSalary, function(i, districts){
      	avg_Salary_District.push(districts.maximum 
        	+ '<br />'
        );
    }); // close each()

  	//array for teacher eth/race title
 	var ethnic_Racial_Dist_Title = [];
  	$.each(json.teacherEthnicDist, function(i, teacherEthnicity){
    	ethnic_Racial_Dist_Title.push('<b>'
        	+ teacherEthnicity.catTitle + '</b>'
    		+ '<br />' + teacherEthnicity.source 
    		+ '<br />' + '<br />'
    	);
  	}); // close each()

    //array for ehtnicity/race and percentage
    var ethnic_Racial_Dist_Items = [];
    $.each(json.teacherEthnicDist, function(i, teacherEthnicity){
      	ethnic_Racial_Dist_Items.push(teacherEthnicity.teacher_ethnicity 
        	+ ' ' 
        	+ teacherEthnicity.teacher_percent 
        	+ '<br />'
        );
    }); // close each()

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
  failedCalls.push(failedajax);
}

/*This will be the search algorithm that powers the entire search function for the application. 
It will pull data from the json that is either pulled from the website or stored locally and be able to dynamically add content to the search page as results. 
If a user submits information that matches a school district or a super intendent for a school district it will output a combined field with the districts information + the superintendents name. 
If the user input does not match either a superintendent or a school district, the search function will look through the rest of the data and determine if it is in another table, 
if it is it will direct the user to that page within the application. If it is not the application will inform the user that it was unable to find the item that they were searching for.*/

function search(searchfield){
  

  //clear search content
  $('#searchSchoolDistUl').empty();
  $('#searchAppUl').empty();
  //if blank, just clear screen and exit
  if(!searchfield) return;

  var categoryHits = searchCategories(searchfield);
  var supsdistHits = searchSupsAndDistricts(searchfield);

  //message if no hits and escape
  if((categoryHits.length + supsdistHits.length) == 0){
    $('#searchAppUl').append('<li>\"We\'re sorry, we were unable to find anything matching your search, please try again.\"</li>');
    return;
  }
  //add search content to page
  var items = [];
  $.each(supsdistHits, function(i,schoolDistData){
    items.push('<li data-role="list-divider">'
        + addHighlight(searchfield, schoolDistData.district_name)
        + '</li><li>'
        + addHighlight(searchfield, schoolDistData.address) + ' '
        + addHighlight(searchfield, schoolDistData.city) + ' '
        + addHighlight(searchfield, schoolDistData.state) + ' '
        + addHighlight(searchfield, schoolDistData.zipcode) 
        + '</li><li>'
        + '<a href="tel:1'+ schoolDistData.phone.replace(/[^0-9]/g, '') + '">' + 'Phone: ' + addHighlight(searchfield, schoolDistData.phone) + '</a>'
        + '</li><li>Fax: '
      + addHighlight(searchfield, schoolDistData.fax) 
        + '</li><li>'
        + '<a href="' + schoolDistData.website + '" data-rel="external">' + 'Website: ' + addHighlight(searchfield, schoolDistData.website) + '</a>'
        + '</li><li>Enrollment: '
      + addHighlight(searchfield, schoolDistData.enrollment)
        + '</li><li>Grades: '
        + addHighlight(searchfield, schoolDistData.grades)
        + '</li><li>Squre Miles: '
        + addHighlight(searchfield, schoolDistData.square_miles)
        +'</li><li>Superintendent: '
        + addHighlight(searchfield, schoolDistData.superintendent)
        +'</li>'
    );
  });
  var cat_items = [];
  $.each(categoryHits, function(i, catData){
    cat_items.push('<li><a href=\"'
      +catData[1]
      +'\">'
      +addHighlight(searchfield, catData[0])
      +'</a></li>'
    );
  });
  $('#searchAppUl').append( cat_items.join('') );
  $('#searchAppUl').listview('refresh'); 
  $('#searchSchoolDistUl').append( items.join('') );
  $('#searchSchoolDistUl').listview('refresh'); 
}

function searchCategories(searchfield){
  //array to hold all hits
  var hits = [];

  //2d array containing category name and link
  var categories = [['General Information','#bookletPageOne'],
                    ['County Superintendents','#bookletPageTwo'],
                    ['County School District Information','#bookletPageThree'],
                    ['Superintendents','#bookletPageFour'],
                    ['Teacher Information','#bookletPageFive'],
                    ['Enrollment Other Programs','#bookletPageSix'],
                    ['School District','#bookletPageSeven'],
                    ['About','#about'],
                    ['Homepage','#index']];

  //create regex from search term
  var searchregex = new RegExp('(?:'+searchfield+')','i');

  //look through each category for hits
  $.each(categories, function(i,data){
    if(searchregex.test(data[0])){
      //add to hit array
      hits.push(data);
    }
  });
  //return hits array
  //console.log(hits);
  return hits;
}

function searchSupsAndDistricts(searchfield){
  //array to hold all hits
  var hits = [];

  //get parsed jsons to search through
  var supsjson = JSON.parse(window.localStorage.getItem("superintendentjson"));
  var distjson = JSON.parse(window.localStorage.getItem("schooldistrictsjson"));
  var ccjson = JSON.parse(window.localStorage.getItem("ccschooldistrictsjson"));
  var ropjson = JSON.parse(window.localStorage.getItem("ropjson"));
  //create regex containing search term pattern
  var searchregex = new RegExp('(?:'+searchfield+')','i');
  //look through all district data for a hit using foreach loop
  $.each(distjson, function(i,data){
    var isfound = false;
    //console.log(data);
    $.each(data, function(i,insideData){
      isFound = searchregex.test(insideData);
      if(isFound){
        return false;
      }
    });
    if(isFound){
      //add to hit array using another function
      var sd = getSchoolDistrict(data, 'school district');
      if(!checkForDuplicate(hits, sd)){
        hits.push(sd);
      }
    }
  });

  //search through supers data
  $.each(supsjson, function(i,data){
    var isfound = false;
    $.each(data, function(i,insideData){
      isFound = searchregex.test(insideData);
      if(isFound){
        return false;
      }
    });
    if(isFound){
      //add to hit array using another function
      var sd = getSchoolDistrict(data, 'superintendent');
      if(!checkForDuplicate(hits, sd)){
        hits.push(sd);
      }
    }
  });

  // search through community college data
  $.each(ccjson, function(i,data){
    var isfound = false;
    //console.log(data);
    $.each(data, function(i,insideData){
      isFound = searchregex.test(insideData);
      if(isFound){
        return false;
      }
    });
    if(isFound){
      //add to hit array using another function
      var sd = getSchoolDistrict(data, 'community college district');
      if(!checkForDuplicate(hits, sd)){
        hits.push(sd);
      }
    }
  });

  //search through rop data
  $.each(ropjson, function(i,data){
    var isfound = false;
    //console.log(data);
    $.each(data, function(i,insideData){
      isFound = searchregex.test(insideData);
      if(isFound){
        return false;
      }
    });
    if(isFound){
      //add to hit array using another function
      var sd = getSchoolDistrict(data, 'rop');
      if(!checkForDuplicate(hits, sd)){
        hits.push(sd);
      }
    }
  });

  //console.log(hits);
  return hits;
}

//function that returns a school district object based on given data
function getSchoolDistrict(initialdata, datatype){
  switch (datatype){
    case 'superintendent':
      var schooldata;
      var distjson = JSON.parse(window.localStorage.getItem("schooldistrictsjson"));
      $.each(distjson, function(i,data){
          if(data.district_name == initialdata.district_name){
            schooldata = data;
            return false;
          }
      });
      //in case of cc district
      if(!schooldata){
        var ccjson = JSON.parse(window.localStorage.getItem("ccschooldistrictsjson"));
        $.each(ccjson, function(i,data){
          if(data.district_name == initialdata.district_name){
            schooldata = data;
            return false;
          }
        });
        //in case of rop
        if(!schooldata){
          var ropjson = JSON.parse(window.localStorage.getItem("ropjson"));
          $.each(ropjson, function(i,data){
            if(data.district_name == initialdata.district_name){
              schooldata = data;
              return false;
            }
          });
          return new SchoolDistrict(schooldata.district_name, schooldata.district_address, schooldata.district_city, schooldata.district_state, schooldata.district_zip_code, schooldata.district_phone, schooldata.district_fax, schooldata.district_website, 0, "ROP", 0, initialdata.sups_name_title);
        }
        return new SchoolDistrict(schooldata.district_name, schooldata.district_address, schooldata.district_city, schooldata.district_state, schooldata.district_zip_code, schooldata.district_phone, schooldata.district_fax, schooldata.district_website, schooldata.district_enrollment, "CC", 0, initialdata.sups_name_title);
      }
      

      return new SchoolDistrict(schooldata.district_name, schooldata.district_address, schooldata.district_city, schooldata.district_state, schooldata.district_zip_code, schooldata.district_phone, schooldata.district_fax, schooldata.district_website, schooldata.district_enrollment, schooldata.district_grades, schooldata.district_square_miles, initialdata.sups_name_title);
    case 'school district':
      var supsname;
      var supsjson = JSON.parse(window.localStorage.getItem("superintendentjson"));
      $.each(supsjson, function(i,data){
          if(data.district_name == initialdata.district_name){
            supsname = data.sups_name_title;
            return false;
          }
      });
      return new SchoolDistrict(initialdata.district_name, initialdata.district_address, initialdata.district_city, initialdata.district_state, initialdata.district_zip_code, initialdata.district_phone, initialdata.district_fax, initialdata.district_website, initialdata.district_enrollment, initialdata.district_grades, initialdata.district_square_miles, supsname);
    case 'community college district':
      var supsname;
      var supsjson = JSON.parse(window.localStorage.getItem("superintendentjson"));
      $.each(supsjson, function(i,data){
          if(data.district_name == initialdata.district_name){
            supsname = data.sups_name_title;
            return false;
          }
      });
      return new SchoolDistrict(initialdata.district_name, initialdata.district_address, initialdata.district_city, initialdata.district_state, initialdata.district_zip_code, initialdata.district_phone, initialdata.district_fax, initialdata.district_website, initialdata.district_enrollment, 'CC', 0, supsname);
    case 'rop':
      var supsname;
      var ropjson = JSON.parse(window.localStorage.getItem("superintendentjson"));
      $.each(ropjson, function(i,data){
          if(data.district_name == initialdata.district_name){
            supsname = data.sups_name_title;
            return false;
          }
      });
      return new SchoolDistrict(initialdata.district_name, initialdata.district_address, initialdata.district_city, initialdata.district_state, initialdata.district_zip_code, initialdata.district_phone, initialdata.district_fax, initialdata.district_website, 0, 'ROP', 0, supsname);
  }
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
  this.equals = function(aSchoolDistrict){
    return (district_name == aSchoolDistrict.district_name) && (address == aSchoolDistrict.address);
  };
}

//helper function to check if a school district object is already in the array
function checkForDuplicate(anArray, aSchoolDistrict){
  var hasDuplicate = false;
  $.each(anArray, function(i, element){
    if(element.equals(aSchoolDistrict)){
      hasDuplicate = true;
      return false;
    }
  });
  return hasDuplicate;
}

//adds functionality to search button
$( ".searchbutton" ).bind( "click", function(event, ui) {

  search($(".searchfield").val());
});
//add submit event handler to search text input
$("form").submit(function(event, ui) {
  search($(".searchfield").val());
  return false;
});

function addHighlight(searchfield, aString){
  var myregex = new RegExp(searchfield,'gi');
  var results = myregex.exec(aString);
  if(!(results == null)) return aString.replace(myregex,'<mark>'+results[0]+'</mark>');
  else return aString;
}