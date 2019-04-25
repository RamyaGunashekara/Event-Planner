var UsrId = $.request.parameters.get('user');
var event = $.request.parameters.get('event');
function getDetails(){
                var pstmt="", object ={},objList=[];
                var conn = $.db.getConnection("Event_Planner.services::cred");
                var query = 'SELECT * from "EVENT_PLANNER"."FINANCE" where USER_ID = '+UsrId+' and EVENT_ID = '+event;
                pstmt = conn.prepareStatement(query);
                 
				var rs = pstmt.executeQuery();
				while(rs.next()){
				    object.cost_center = rs.getString(3);
				    object.invoice = rs.getString(4);
				    object.po = rs.getString(5);
				    objList.push({
				        CC:object.cost_center,
				        Invoice:object.invoice,
				        PO:object.po
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
 

           