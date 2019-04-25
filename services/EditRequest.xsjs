var EventId = $.request.parameters.get('eventId');
/////////////////////WORKING CODE -1 START///////////////////////////////////////
// var Status = $.request.parameters.get('status');
// var UserId = $.request.parameters.get('userId');
/////////////////////WORKING CODE -1 END///////////////////////////////////////


function setRequestStatus(){
    
    /////////////////////WORKING CODE -2 START///////////////////////////////////////
    //           var conn = $.db.getConnection();
    //             var success = false;
    //           var pstmt="";
    //             var query = 'UPDATE "EVENT_PLANNER"."REQUEST" SET "STATUS"=' + Status +' WHERE USER_ID='+ UserId +' AND EVENT_ID='+EventId;
    //           pstmt = conn.prepareStatement(query);
        
                 
				// pstmt.execute();
				// success=true;
				// pstmt.close();
				
				// conn.commit();  
				// conn.close();
				// return success;
    /////////////////////WORKING CODE -2 END///////////////////////////////////////
              var conn = $.db.getConnection("Event_Planner.services::cred");
              var success = false;
              var pstmt="";
              
              var room_status;
              var parking_status;
              
              var query_room = 'select STATUS from ROOM_BOOKING where EVENT_ID = '+EventId;
              pstmt = conn.prepareStatement(query_room);
              var rs_room_status = pstmt.executeQuery();
              while(rs_room_status.next())
              {
                  room_status = rs_room_status.getString(1);
              }
        
              var query_parking = 'select STATUS from PARKING where EVENT_ID = '+EventId;
              pstmt = conn.prepareStatement(query_parking);
              var rs_parking_status = pstmt.executeQuery();
              while(rs_parking_status.next())
              {
                  parking_status = rs_parking_status.getString(1);
              }
              
              var query_request_status = 'UPDATE "EVENT_PLANNER"."REQUEST" SET "STATUS"=? WHERE EVENT_ID = '+EventId;
               pstmt = conn.prepareStatement(query_request_status);
              if(room_status === "NEW")
              {
                 pstmt.setString(1, 'NEW');  
              }
              else if(room_status==="ACCEPTED")
              {
                pstmt.setString(1, 'IN PROCESS');
              }
              else if(room_status==="REJECTED" || room_status==="CONFIRMED" || room_status==="DELETED")
              {
                pstmt.setString(1, 'OLD');
              }
              pstmt.executeQuery();

                 
				pstmt.execute();
				success=true;
				pstmt.close();
				
				conn.commit();  
				conn.close();
				
				return success;
		/////////////////////WORKING CODE -3 START///////////////////////////////////////		
				// return success;
	    /////////////////////WORKING CODE -3 END///////////////////////////////////////			
    
}			
try{  
      
 /////////////////////WORKING CODE -4 START///////////////////////////////////////
      	$.response.contentType = 'application/json'; 
            var response = 'Success : ' + JSON.stringify( 
                setRequestStatus()
                );
         $.response.setBody(response);        
/////////////////////WORKING CODE -4 START///////////////////////////////////////                
           
        }  
catch(err){  
                  $.response.contentType = "text/plain";  
                  $.response.setBody("Error while executing query: [" + err.message + "]");  
                  $.response.returnCode = 200;  
        }

           