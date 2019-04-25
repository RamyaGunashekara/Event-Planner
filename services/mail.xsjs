function getDL(category){
try
	{
    var DL = "";
	var query = 'select * from "EVENT_PLANNER"."DL_LIST"';
	
    var conn = $.db.getConnection("Event_Planner.services::cred");
    var pstm= conn.prepareStatement(query);  
    
    var rs=pstm.executeQuery();
    
    while(rs.next())
    {
        if(rs.getString(2)===category){
            DL = rs.getString(1);
        }
    }
    pstm.close();  
   	}
catch(e)
{
	$.response.setBody(JSON.stringify(e.message));
	$.response.contentType = "application/json";
    $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
}
    return DL;
}

var EmailSubject = $.request.parameters.get('EmailSubject');
var attachment = $.request.parameters.get('attachment');
var RequestLink = $.request.parameters.get('link');
var category = $.request.parameters.get('category');

var EmailRecipients = "ramya.g@sap.com";

   var  mailObj = {  
        sender:    { "address": "ramya.g@sap.com"},  
        to:       EmailRecipients,
        subject:  EmailSubject,  
        subjectEncoding: "UTF-8",
        parts:  [ new $.net.Mail.Part({  
            type: $.net.Mail.Part.TYPE_TEXT,  
            text: "Email test.",  
            contentType: "text/html"  
        })]  
    } ;
    var mail = new $.net.Mail(mailObj);
    mail.parts[0].text = "Dear colleague, <br> <br> There is a new request under your name. <br> Please find the details in <br><br> Best Regards, <br> Event Planner Team";
    mail.parts.push(new $.net.Mail.Part({
                type: $.net.Mail.Part.TYPE_ATTACHMENT,
                data: 'Hi, This is a test attachment',
                contentType: "text/plain",
                fileName: attachment
}));
    
var returnValue;
var response="";
try {
                returnValue = mail.send();
                response = "Email with MessageId = " + returnValue.messageId +
                                "   and final reply = " + returnValue.finalReply + "is sent succesfully";

                
                $.response.setBody(JSON.stringify(response));
            	$.response.contentType = "application/json";
            	$.response.status = $.net.http.OK;
            	
} catch (e) {
                response = "Error message" + e.message;
                $.response.setBody(JSON.stringify(response));
            	$.response.contentType = "application/json";
            	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
}




