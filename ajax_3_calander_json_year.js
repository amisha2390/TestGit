

var curr_public_holiday;
var public_holidays=[];
var year_val;
var v_year;
var v_month=9;


var noof_req_received=0;
	 
/* get the slected month from cal */


function extract_year_month()
{
	console.log("******** step 0 ********** ");
	console.log("Entering extract_year_month");
     v_year=year_val;
	console.log("year_val is"+year_val);
	console.log(v_year + '#' +v_month);
	generate_dates(v_year,v_month);
}

/* iterate 12 times to get all public holidays of that  year */
function generate_dates(v_year,v_month){	
	console.log('Entering generate_dates');
	console.log('v_month' +v_month);
	console.log('v_year' +v_year);
	var i =0;
	public_holidays=[];
	/*for ( i= v_month; i <=12; i++) 
	{
	   console.log(i + ' #' +v_month);
	   var t=get_data(v_year,i); 	
	
	}	*/
	get_data(v_year,i);
}

/*send the year and  month to fetch holidays from url  - will be executed 12 times */
function get_data(v_year,v_month){
	console.log("Entering get_data - Month is "+ v_month);
    $.ajax({
	   url:'https://holidayapi.com/v1/holidays',
	   crossDomain: true,	 
	   dataType:    'json',
	   type:        'GET',
	   data: { 
	    "key":"0b736e52-d227-46c0-a650-08ea316709fa",
        "country": "IN", 
		"public":"true",
        "year": v_year
		
			}	   
		}).done(function( response ) {			
			var j=0;
			var i=0;
			var key_dates=[];
			var holiday_array=response.holidays;
			console.log('Month is '+ v_month);
			console.log('v_year #' +v_year);
			console.log('lengthofarrayis '+ Object.keys(holiday_array).length);
			console.log(response.status);
			if(response.status ==200)
			{
				noof_req_received=noof_req_received+1;
			}
			
					if(Object.keys(holiday_array).length !=0){
					
						Object.keys(holiday_array).forEach(function(key,value) {
							console.log(key);
							console.log(holiday_array[key]);
							for(j=0;j<Object.keys(holiday_array[key]).length ;j++)
							{
								public_holidays.push(holiday_array[key][j]);
								
							}
						});	
							
						console.log("public_holidays[key]"+public_holidays);
						console.log("public_holidays length "+public_holidays.length);	
						
					 }
					 	$("div.holiday_list").empty();
						create_list();
					})
			.fail(function( xhr, status, errorThrown ) {
			alert( "Sorry, there was a problem!" );
			alert( "Error: " + errorThrown );
			alert( "Status: " + status );
			console.dir( xhr );
		  }) 	
}

/* form the list element ND DISPLY*/
function create_list(){
	console.log('******** step 5 **********');
	console.log("Entering create_list");
	console.log(JSON.stringify(public_holidays));
	console.log('Keys - ' + Object.keys(public_holidays));
	console.log('no of req received ' + noof_req_received);

	
	var i=0;
	for( i=0;i<Object.keys(public_holidays).length;i++)
	{
	 var ele_name= public_holidays[i]["name"];
	 var ele_date=public_holidays[i]["date"];
	 var ele_observed=public_holidays[i]["observed"]; 
	 var ele_1 ='<a href="#" class="list-group-item list-group-item-action flex-column align-items-start ">';
	 var ele_2='	<div class="d-flex w-100 justify-content-between">';
	 var ele_3='	  <h5 class="mb-1">'+ ele_name +'</h5>';
	 var ele_4='	  <small>'+ ele_date+'</small>';
	 var ele_5='	</div>';
	 var ele_6='	<p class="mb-1">'+ele_observed+'</p>';
	 var ele_7='	<small>Donec id elit non mi porta.</small>';
	 var ele_8='</a>';
	 var ele_9=ele_1 +ele_2 + ele_3 +ele_4 +ele_5 + ele_6 + ele_7+ele_8;	  
	$("div.holiday_list").append(ele_9);
	}
	
}


$(document).ready(function(){
	
	$( "#datepick1" ).datepicker({ format: 'DD-MM-YYYY',  maxDate: '31-12-2017'});	 
	$('button').click(function(event) {  	
	
	var textbox_val=$("#datepick1").val();
	year_val=textbox_val.substring(6, 10);
	alert(year_val);
	console.log("year_val is"+year_val);
	
    extract_year_month();
	console.log("****************** step 3******************");
	console.log(JSON.stringify(public_holidays));
	console.log("****************** step 4******************");	

	
	/*var pollInterval= setInterval(function() { // run function every 2000 ms
    if(noof_req_received == 1)
	{
		$("div.holiday_list").empty();
		create_list();
	}
          }, 10);*/
		  
	


});	   

/*$(document).ajaxComplete(function(){
	$("div.holiday_list").empty();
    create_list();
});*/
});


	


	