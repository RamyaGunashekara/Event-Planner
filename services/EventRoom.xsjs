var EventId = $.request.parameters.get('eventId');
function getDetails(){
                var pstmt="", object ={},objList=[];
                var conn = $.db.getConnection("Event_Planner.services::cred");
              
                var query = 'SELECT * FROM "EVENT_PLANNER"."ROOM_BOOKING" where "EVENT_ID" = '+ EventId + ' ORDER BY "STATUS"';
                pstmt = conn.prepareStatement(query);
                 
				var rs = pstmt.executeQuery();
				while(rs.next()){
				    object.user = rs.getString(1);
				    object.event = rs.getString(2);
				    object.room_no = rs.getString(3);
				    object.startDate = rs.getString(4);
				    // object.endDate = rs.getString(5);
				    object.startTime = rs.getString(6);
				    object.endTime = rs.getString(7);
				    object.status=rs.getString(8);
				    object.rejectReason=rs.getString(9);
				    objList.push({
				        user:object.user,
				        event:object.event, 
				        room_no:object.room_no,
				        startTime:object.startTime,
				        endTime:object.endTime,
				        startDate:object.startDate,
				        // endDate:object.endDate,
				        status:object.status,
				        rejectReason:object.rejectReason
				    });
				}
				pstmt.close();
				
				conn.commit();
				conn.close();
				return objList;
}			
    try{  
        	$.response.contentType = 'application/json';  
            var response =  JSON.stringify( 
                 getDetails() 
                );
            $.response.setBody(response);
        }  
        catch(err){  
                  $.response.contentType = "text/plain";  
                  $.response.setBody("Error while executing query: [" + err.message + "]");  
                  $.response.returnCode = 200;  
        }  
 

           