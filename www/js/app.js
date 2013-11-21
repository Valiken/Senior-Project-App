	
	var db;
	var isOnline = false;
    // Wait for device API libraries to load
    // place these listeners on load of the page
    document.addEventListener("deviceready", onDeviceReady, false);
	document.addEventListener("online", onOnline, false);
	document.addEventListener("offline", onOffline, false);

    // device APIs are available
    //
    function onDeviceReady() {
    	
		alert("device ready");
		if(isOnline) {
			//do json call and storage

		}
		else {
			if(checkDB()) {
				//alert user that they are using the local storage
			
			
			}
			else {
				//alert user no data has been loaded because no connection and no local storage
				//Option 1: Redirect to error/positive feedback page
				//Option 2: Update button for user to continue checking or exit app
				//
			}
		
		}
    }

    
	//check if json has been stored
	//TODO change to checking for json
	function checkDB(){
		var a= window.localStorage.getItem("dbexists");
		if(a == "true") return true;
		else return false;
	}
	
	function onOffline() {
    // Handle the offline event
		//alert("youre offline...");
		isOnline = false;
	}

	function onOnline() {
    // Handle the online event
		//alert("youre online!");
		isOnline = true;
	}

