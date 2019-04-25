var EventId = $.request.parameters.get('eventId');
function getDetails(){
                var pstmt="", object ={},objList=[];
                var conn = $.db.getConnection("Event_Planner.services::cred");
                var query_room = 'SELECT * FROM "EVENT_PLANNER"."ROOM_BOOKING" where "EVENT_ID" = '+EventId+' ORDER BY "STATUS"';
                pstmt = conn.prepareStatement(query_room);
                //pstmt.setString(1,EventId);
				var rs_room = pstmt.executeQuery();
				while(rs_room.next()){
				   object.user = rs_room.getString(1);
				    object.event = rs_room.getString(2);
				    object.room_no = rs_room.getString(3);
				    object.startDate = rs_room.getString(4);
				    object.endDate = rs_room.getString(5);
				    object.startTime = rs_room.getString(6);
				    object.endTime = rs_room.getString(7);
				    object.status=rs_room.getString(8);
				    object.rejectReason=rs_room.getString(9);
				    objList.push({
				        facility:"Room",
				        user:object.user,
				        event:object.event, 
				        // room_no:object.room_no,
				        request: 'Room: ' + object.room_no,
				        startTime:object.startTime,
				        endTime:object.endTime,
				        startDate:object.startDate,
				        endDate:object.endDate,
				        status:object.status,
				        rejectReason:object.rejectReason
				    });
				}
				var query_parking = 'SELECT * FROM "EVENT_PLANNER"."PARKING" where "EVENT_ID" = '+EventId+' ORDER BY "STATUS"';
                pstmt = conn.prepareStatement(query_parking);
                var rs_parking = pstmt.executeQuery();
				while(rs_parking.next()){
				    object.noOfParkingSpaces = rs_parking.getString(3);
				    object.startDate = rs_parking.getString(4);
				    object.endDate = rs_parking.getString(5);
				    object.startTime = rs_parking.getString(6);
				    object.endTime = rs_parking.getString(7);
				    object.status=rs_parking.getString(8);
				    object.rejectReason=rs_parking.getString(9);
				    objList.push({
				        facility: "Parking",
				        request: object.noOfParkingSpaces + ' parking spaces',
				        startDate: object.startDate,
				        endDate: object.endDate,
				        startTime: object.startTime,
				        from:object.startTime,
				        endTime: object.endTime,
				        to:object.endTime,
				        status:object.status,
				        rejectReason:object.rejectReason
				    });
				} 

				
				var query_gfm = 'SELECT * FROM "EVENT_PLANNER"."GFM" where "EVENT_ID" = '+EventId+' ORDER BY "STATUS"';
                pstmt = conn.prepareStatement(query_gfm);
                 
				var rs_gfm = pstmt.executeQuery();
				while(rs_gfm.next()){
				    object.category = rs_gfm.getString(3);
				    object.item = rs_gfm.getString(4);
				    object.quantity = rs_gfm.getString(5);
				    object.startDate = rs_gfm.getString(6);
				    object.endDate = rs_gfm.getString(7);
				    object.startTime = rs_gfm.getString(8);
				    object.endTime = rs_gfm.getString(9);
				    object.status=rs_gfm.getString(10);
				    object.rejectReason=rs_gfm.getString(11);
				    objList.push({
				        category: object.category,
				        item: object.item,
				        quantity: object.quantity,
				        startDate: object.startDate,
				        endDate: object.endDate,
				        startTime: object.startTime,
				        endTime: object.endTime,
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
 

           