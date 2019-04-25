var query,pstmt;
var category = $.request.parameters.get('category');
var UserId = $.request.parameters.get('user');
var EventId = $.request.parameters.get('event');
var status = $.request.parameters.get('status');
var RejectReason = $.request.parameters.get('rejectReason');

function getTableName(){
    var table;
 switch(category){
                case 'CAFETERIA'        : table = '"CAFETERIA"';
                                          break;
                case 'FINANCE'          : table = '"FINANCE"';
                                          break;
                case 'SNACKS'           : 
                case 'STATIONARY'       : table = '"GFM"';
                                          break;
                 case 'ROOM'             : table = '"ROOM_BOOKING"';
                                           break;
                case 'REQUEST'  		: table = '"REQUEST"';
                                           break;
                 case 'PARKING'  		: table = '"PARKING"';
                                          break;
}

/*if(category = "ROOM")
{
    table = '"ROOM_BOOKING"';
}*/


    return table;
}

/*function setStrings(){
			switch(category){
                    case 'FINANCE'  	:  pstmt.setString(1,status);
                                            pstmt.setString(2,RejectReason);
                                            pstmt.setString(3,UserId);
											pstmt.setString(4,EventId);	
											break;
                    
                    case 'CAFETERIA' 	:  pstmt.setString(1,status);
                                            pstmt.setString(2,RejectReason);
                                            pstmt.setString(3,UserId);
											pstmt.setString(4,EventId);
											break;
                       
                    case 'SNACKS'   	:   
											
                    case 'STATIONARY'	:   pstmt.setString(1,status);
                                            pstmt.setString(2,UserId);
											pstmt.setString(3,EventId);
											pstmt.setString(4,RejectReason);
											break;
                                        
                    case 'ROOM'     	:   pstmt.setString(1,status);
                                            pstmt.setString(2,RejectReason);
                                            pstmt.setString(3,UserId);
											pstmt.setString(4,EventId);
											break;
                    
                    case 'REQUEST' :        pstmt.setString(1,status);
                                            pstmt.setString(2,RejectReason);
                                            pstmt.setString(3,UserId);
											pstmt.setString(4,EventId);
											break;
                    
                    case 'PARKING'   	:   pstmt.setString(1,status);
                                            pstmt.setString(2,RejectReason);
                                            pstmt.setString(3,UserId);
											pstmt.setString(4,EventId);
										
											break;
                                     
                }
		}
*/
function execute(){	
                var conn = $.db.getConnection("Event_Planner.services::cred");
                var success = false;
                var table = getTableName();
                query = 'UPDATE "EVENT_PLANNER".'+ table +' SET STATUS=?, REJECT_REASON=? WHERE USER_ID=? AND EVENT_ID=?';
                pstmt = conn.prepareStatement(query);
                $.response.setBody(table);
               // setStrings();
            //   pstmt.setString(1,table);
               pstmt.setString(1,status);
              pstmt.setString(2,RejectReason);
               pstmt.setString(3,UserId);
			   pstmt.setString(4,EventId);
                 
				pstmt.execute();
				success=true;
				pstmt.close();
				
				conn.commit();  
				conn.close();
				return success;

		}
		
try{  
    
        	$.response.contentType = 'application/json';  
            var response = 'Success : ' + JSON.stringify(
                 execute() 
                );
            $.response.setBody(response);
        }  
        catch(err){  
                  $.response.contentType = "text/plain";  
                  $.response.setBody("Error while executing query: [" + err.message + "]");  
                  $.response.returnCode = 200;  
        }
