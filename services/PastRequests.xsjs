var UsrId = $.request.parameters.get('user');
function getDetails(){
                var pstmt="", object ={},objList=[];
                var conn = $.db.getConnection("Event_Planner.services::cred");
                var query = 'SELECT * FROM "EVENT_PLANNER"."REQUEST" where "USER_ID" = '+ UsrId +' ORDER BY "STATUS"';
                pstmt = conn.prepareStatement(query);
                 
				var rs = pstmt.executeQuery();
				while(rs.next()){
				    object.user = rs.getString(1);
				    object.event = rs.getString(2);
				    object.num_of_people = rs.getString(3);
				    object.fromDate = rs.getString(4);
				    object.toDate = rs.getString(5);
				    object.startTym=rs.getString(6);
				    object.endTym=rs.getString(7);
				    object.status=rs.getString(8);
				    objList.push({
				        user:object.user,
				        event:object.event, 
				        num_of_people:object.num_of_people,
				        fromDate:object.fromDate,
				        toDate:object.toDate,
				        startTym:object.startTym,
				        endTym:object.endTym,
				        status:object.status
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
 

           