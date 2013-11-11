	
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
			//make the database
			db = window.openDatabase("Database", "1.0", "Local Database", 200000);
			db.transaction(populateDB, errorCB, successCB);
		}
		else {
			if(checkDB()) {
				//alert user that they are using the local database
			
			
			}
			else {
				//alert user no data has been loaded because no connection and no local db created
			
			}
		
		}
    }

    // Populate the database, and record date that database was made
    //
    function populateDB(tx) {
		//drop all tables then create all tables
		
		
		//use data from json call to make sql statements to add data into db
		//need some way to deal with failure to connect to server
		
		
		//write into local storage date of db created
		
		
		//change checkdb local storage variable to true
		
		
		
		
		
		//code example to create tables and insert data
        /*tx.executeSql('DROP TABLE IF EXISTS DEMO');
        tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
		*/
    }

    // Transaction error callback
    //
    function errorCB(tx, err) {
        alert("Error processing SQL: "+err);
    }

    // Transaction success callback
    // 
    function successCB() {
        alert("success!");
    }
	
	//check if a db exists by checking associated key
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

