			var UsrId = $.request.parameters.get('user');
			var EventId = $.request.parameters.get('event');
			var people = $.request.parameters.get('people');
			var startTym = $.request.parameters.get('startTym');
			var endTym = $.request.parameters.get('endTym');
			var category = $.request.parameters.get('category');
			var costCenter  = $.request.parameters.get('costCenter');
			var invoice = $.request.parameters.get('invoice');
			var poNum   = $.request.parameters.get('poNum');
			var item = $.request.parameters.get('item');
			var quantity = $.request.parameters.get('qty');
			var roomNum = $.request.parameters.get('roomNum');
			var sender = $.request.parameters.get('sender');
			var receiver = $.request.parameters.get('receiver');
			var time = $.request.parameters.get('time');
			var message = $.request.parameters.get('message');
			var fromDate = $.request.parameters.get('fromDate');
			var toDate = $.request.parameters.get('toDate');
			var parking = $.request.parameters.get('parking');
			var status = $.request.parameters.get('status');
            var query="",pstmt="";
		
		function queryStat(){
			switch(category){
                case 'CAFETERIA'        : query =  'INSERT INTO  "EVENT_PLANNER"."CAFETERIA"(USER_ID,EVENT_ID,NUM_OF_PEOPLE,START_TYM,END_TYM,STATUS,START_DATE,END_DATE) VALUES(?,?,?,?,?,?,?,?)';
                                          break;
                case 'FINANCE'          : query =  'INSERT INTO "EVENT_PLANNER"."FINANCE" VALUES(?,?,?,?,?,?,?,?)'; 
                                          break;
                case 'SNACKS'           : 
                case 'STATIONARY'       : query =  'INSERT INTO  "EVENT_PLANNER"."GFM" VALUES(?,?,?,?,?,?,?,?,?,?)'; 
                                          break;
                case 'ROOM'             : query =  'INSERT INTO  "EVENT_PLANNER"."ROOM_BOOKING"(USER_ID,EVENT_ID,ROOM_NUMBER,START_TYM,END_TYM,STATUS,START_DATE,END_DATE) VALUES(?,?,?,?,?,?,?,?)'; 
                                          break;
                case 'CAFETERIA_CHAT'   : query = 'INSERT INTO  "EVENT_PLANNER"."CAFETERIA_CHAT"(USER_ID,EVENT_ID,SENDER,RECEIVER,TIME_MSG,MESSAGE) VALUES(?,?,?,?,?,?)';
                                          break;
                case 'GFM_CHAT'         : query = 'INSERT INTO  "EVENT_PLANNER"."GFM_CHAT"(USER_ID,EVENT_ID,SENDER,RECEIVER,TIME_MSG,MESSAGE) VALUES(?,?,?,?,?,?)';
                                          break;
                case 'FINANCE_CHAT' 	: query = 'INSERT INTO  "EVENT_PLANNER"."FINANCE_CHAT"(USER_ID,EVENT_ID,SENDER,RECEIVER,TIME_MSG,MESSAGE) VALUES(?,?,?,?,?,?)';
                                          break;
                case 'PARKING_CHAT' 	: query = 'INSERT INTO  "EVENT_PLANNER"."PARKING_CHAT"(USER_ID,EVENT_ID,SENDER,RECEIVER,TIME_MSG,MESSAGE) VALUES(?,?,?,?,?,?)';
                                          break;
                case 'IT_CHAT' 			: query = 'INSERT INTO  "EVENT_PLANNER"."IT_CHAT"(USER_ID,EVENT_ID,SENDER,RECEIVER,TIME_MSG,MESSAGE) VALUES(?,?,?,?,?,?)';
                                          break;    
                case 'ROOM_CHAT' 		: query = 'INSERT INTO  "EVENT_PLANNER"."ROOM_CHAT"(USER_ID,EVENT_ID,SENDER,RECEIVER,TIME_MSG,MESSAGE) VALUES(?,?,?,?,?,?)';
                                          break;        
                case 'REQUEST'  		: query = 'INSERT INTO  "EVENT_PLANNER"."REQUEST"(USER_ID,EVENT_ID,NUM_OF_PEOPLE,FROM_DATE,TO_DATE,STATUS,FROM_TIME,TO_TIME) VALUES(?,?,?,?,?,?,?,?)';
                                          break;
                case 'PARKING'  		: query = 'INSERT INTO  "EVENT_PLANNER"."PARKING"(USER_ID,EVENT_ID,NUM_OF_PARKING_SPACES,START_TYM,END_TYM,STATUS,START_DATE,END_DATE) VALUES(?,?,?,?,?,?,?,?)';
                                          break;
                }
		}
		
		function setStrings(){
			switch(category){
                    case 'FINANCE'  	:   pstmt.setString(1,UsrId);
											pstmt.setString(2,EventId);
											pstmt.setString(3,costCenter);
											pstmt.setString(4,invoice);
											pstmt.setString(5,poNum);
											pstmt.setString(7,fromDate);
											pstmt.setString(8,toDate);
											pstmt.setString(9,status);
											break;
                    
                    case 'CAFETERIA' 	:   pstmt.setString(1,UsrId);
											pstmt.setString(2,EventId);
											pstmt.setString(3,people);
											pstmt.setString(4,startTym);
											pstmt.setString(5,endTym);
											pstmt.setString(6,status);
											pstmt.setString(7,fromDate);
											pstmt.setString(8,toDate);
											break;
                       
                    case 'SNACKS'   	:   
											
                    case 'STATIONARY'	:   pstmt.setString(1,UsrId);
                                            pstmt.setString(2,EventId);
                                            pstmt.setString(3,category);
                                            pstmt.setString(4,item);
                                            pstmt.setString(5,quantity);
                                            pstmt.setString(6,fromDate);
                                            pstmt.setString(7,toDate); 
                                            pstmt.setString(8,startTym);
											pstmt.setString(9,endTym);
											pstmt.setString(10,status);
                                            break;
                                        
                    case 'ROOM'     	:   pstmt.setString(1,UsrId);
                                            pstmt.setString(2,EventId);
                                            pstmt.setString(3,roomNum);
                                            pstmt.setString(4,startTym);
                                            pstmt.setString(5,endTym); 
                                            pstmt.setString(6,status);
                                            pstmt.setString(7,fromDate);
											pstmt.setString(8,toDate);
                                            break;
                    case 'CAFETERIA_CHAT':
                    case 'FINANCE_CHAT':
                    case 'GFM_CHAT':
                    case 'IT_CHAT':
                    case 'PARKING_CHAT':
                    case 'ROOM_CHAT':      pstmt.setString(1,UsrId);
                                           pstmt.setString(2,EventId);
                                           pstmt.setString(3,sender);
                                           pstmt.setString(4,receiver);
                                           pstmt.setString(5,time);
                                           pstmt.setString(6,message);
                                           break;
										   
                    case 'REQUEST' :       pstmt.setString(1,UsrId);
                                           pstmt.setString(2,EventId);
                                           pstmt.setString(3,people);
                                           pstmt.setString(4,fromDate);
                                           pstmt.setString(5,toDate);
                                           pstmt.setString(6,status);
                                           pstmt.setString(7,startTym);
											pstmt.setString(8,endTym);
                                           break;
                    
                    case 'PARKING'   	:   pstmt.setString(1,UsrId);
											pstmt.setString(2,EventId);
											pstmt.setString(3,parking);
											pstmt.setString(4,startTym);
											pstmt.setString(5,endTym);
											pstmt.setString(6,status);
											pstmt.setString(7,fromDate);
											pstmt.setString(8,toDate);
											break;
                                     
                }
		}
		
	    function execute(){	
                var conn = $.db.getConnection("Event_Planner.services::cred");
                var success = false;
                queryStat();
                pstmt = conn.prepareStatement(query);
                setStrings();
                 
				pstmt.execute();
				success=true;
				pstmt.close();
				
				conn.commit();  
				conn.close();
				return success;

		}
	    
	    try{  
        	$.response.contentType = 'application/json';  
           // var callback = $.request.parameters.get('callback');
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
