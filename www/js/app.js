// just to make the ajax calls look a little neater. 
var generalUrl = 'http://www.trademains.com/index.php/component/supscrm_contacts/?task=generalinfo&format=ajax&callback=?';
var supsUrl = 'http://www.trademains.com/index.php/component/supscrm_contacts/?task=superintendents&format=ajax&callback=?';
var schooldistrictsUrl = 'http://www.trademains.com/index.php/component/supscrm_contacts/?task=schooldistricts&format=ajax&callback=?';
var ccschooldistrictsUrl = 'http://www.trademains.com/index.php/component/supscrm_contacts/?task=ccdistricts&format=ajax&callback=?';
var countysuperintendentUrl = '';
var countyandschooldistrictUrl = '';
var teacherinformationUrl = '';
var enrollmentUrl = '';
var ropUrl = '';
//all dem links. 
var failedCalls=[];
var timeoutTime = 10000;
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
             schoolDistDataFill(json);          
          },
          error: function(){
            try{
              schoolDistDataFill(JSON.parse(window.localStorage.getItem("schooldistrictsjson")));
            }
            catch(e){
              noLocalData("schooldistrictsjson");
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
           //  console.log(window.localStorage.getItem("ccschooldistrictsjson"));
             commCollegeDataFill(json);
          },
          error: function(){
            try{
              commCollegeDataFill(JSON.parse(window.localStorage.getItem("ccschooldistrictsjson")));
            }
            catch(e){
              noLocalData("ccschooldistrictsjson");
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
             window.localStorage.setItem("countysuperintendentjson",JSON.stringify(json));
             console.log(window.localStorage.getItem("countysuperintendentjson"));       
             countySupsDataFill(json);       
          },
          error: function(){
            try{
              countySupsDataFill(JSON.parse(window.localStorage.getItem("countysuperintendentjson")));
            }
            catch(e){
              noLocalData("countysuperintendentjson");
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
             console.log(window.localStorage.getItem("teacherinformationjson"));      
             teacherDataFill(json);       
          },
          error: function(){
            try{
              teacherDataFill(JSON.parse(window.localStorage.getItem("teacherinformationjson")));
            }
            catch(e){
              noLocalData("teacherinformationjson");
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
              console.log("sorry enrollmentUrl data could not be located");
            }
            
          },
          timeout: timeoutTime
      })

//rop ajax call
$.ajax({
          url: ropUrl, 
          contentType: "application/json",
          dataType: 'jsonp',
          success: function(json){
             window.localStorage.setItem("ropjson",JSON.stringify(json));
             console.log(window.localStorage.getItem("ropjson"));
             ropDataFill(json);
          },
          error: function(){
            try{
              ropDataFill(JSON.parse(window.localStorage.getItem("ropjson")));
            }
            catch(e){
              noLocalData("ropjson");
              console.log("sorry ropUrl data could not be located");
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
      + '<br /><br />General Information'
      + generalData.phone + ' Fax ' + generalData.fax 
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

function countySupsDataFill(json){
  //keep filling
}

function countySchoolInfoDataFill(json){
  //fill out
}

function teacherDataFill(json){
  //more stuffff
}

function otherEnrollDataFill(json){
  //other stuff
}

function ropDataFill(json){
  //do stuffff
}

function noLocalData(failedajax){
  //this function collects all the failed ajax calls to be used to tell user what stuff is locally called
  //this function is called by all ajax calls that timeout
  failedCalls.push("failedajax");
}