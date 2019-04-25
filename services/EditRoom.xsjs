var EventId = $.request.parameters.get('eventId');
var Status = $.request.parameters.get('status');
var UserId = $.request.parameters.get('userId');
var Reason = $.request.parameters.get('reason');
var Room = $.request.parameters.get('room');
var Start_Date = $.request.parameters.get('startDate');
var End_Date = $.request.parameters.get('endDate');
var Start_Time = $.request.parameters.get('startTime');
var End_Time = $.request.parameters.get('endTime');

function setRequestStatus(){
              var conn = $.db.getConnection("Event_Planner.services::cred");
                var success = false;
              var pstmt="";
            //   if(Status!=="")
            //   {
               var query = 'UPDATE "EVENT_PLANNER"."ROOM_BOOKING" SET "STATUS"=' + Status +' WHERE USER_ID='+ UserId +' AND EVENT_ID='+EventId;
               pstmt = conn.prepareStatement(query);
               pstmt.execute();
            //   }
            //   if(Room!=="")
            //   {
            //       var query_room =  'UPDATE "EVENT_PLANNER"."ROOM_BOOKING" SET "ROOM_NUMBER"=' + Room +' WHERE USER_ID='+ UserId +' AND EVENT_ID='+EventId;
            //       pstmt = conn.prepareStatement(query_room);
            //       pstmt.execute();
            //   }
            //   if(Start_Date!=="")
            //   {
            //       var query_startDate =  'UPDATE "EVENT_PLANNER"."ROOM_BOOKING" SET "START_DATE"=' + Start_Date +' WHERE USER_ID='+ UserId +' AND EVENT_ID='+EventId;
            //       pstmt = conn.prepareStatement(query_startDate);
            //       pstmt.execute();
            //   }
            //   if(End_Date!=="")
            //   {
            //       var query_endDate =  'UPDATE "EVENT_PLANNER"."ROOM_BOOKING" SET "END_DATE"=' + End_Date +' WHERE USER_ID='+ UserId +' AND EVENT_ID='+EventId;
            //       pstmt = conn.prepareStatement(query_endDate);
            //       pstmt.execute();
            //   }
            //   if(Start_Time!=="")
            //   {
            //       var query_startTime =  'UPDATE "EVENT_PLANNER"."ROOM_BOOKING" SET "START_TYM"=' + Start_Time +' WHERE USER_ID='+ UserId +' AND EVENT_ID='+EventId;
            //       pstmt = conn.prepareStatement(query_startTime);
            //       pstmt.execute();
            //   }
            //   if(End_Time!=="")
            //   {
            //       var query_endTime =  'UPDATE "EVENT_PLANNER"."ROOM_BOOKING" SET "END_TYM"=' + End_Time +' WHERE USER_ID='+ UserId +' AND EVENT_ID='+EventId;
            //       pstmt = conn.prepareStatement(query_endTime);
            //       pstmt.execute();
            //   }
            //   if(Reason!=="")
            //   {
            //       var query_reason =  'UPDATE "EVENT_PLANNER"."REJECT_REASON" SET "END_TYM"=' + Reason +' WHERE USER_ID='+ UserId +' AND EVENT_ID='+EventId;
            //       pstmt = conn.prepareStatement(query_reason);
            //       pstmt.execute();
            //   }
       
                 
				
				success=true;
				pstmt.close();
				
				conn.commit();  
				conn.close();
				return success;
}			
try{  
        	$.response.contentType = 'application/json';  
            var response = 'Success : ' + JSON.stringify( 
                setRequestStatus()
                );
            $.response.setBody(response);
        }  
catch(err){  
                  $.response.contentType = "text/plain";  
                  $.response.setBody("Error while executing query: [" + err.message + "]");  
                  $.response.returnCode = 200;  
        }

           