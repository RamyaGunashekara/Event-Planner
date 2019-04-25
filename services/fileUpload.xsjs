var theRequestParams = {};  
function getEntityContentName(entity) {  
    if (entity.headers) {  
        var i;  
        for (i = 0; i < entity.headers.length; i++) {  
            if (entity.headers[i].name && (entity.headers[i].name === "~content_name")) {  
                return entity.headers[i].value;  
            }  
        }  
    }  
    return null;  
}  
function extractMultiPartParameters(entities) {  
    var i,file;  
    for (i = 0; i < entities.length; i++) {  
        var contentName = getEntityContentName(entities[i]);  
        if (contentName) {  
            file = {};  
            file.mimeType = entities[i].contentType;  
        file.contents = entities[i].body.asArrayBuffer();  
            theRequestParams[contentName] = file;  
        }
    }  
    return file;
}  
try  
{  
          var conn = $.db.getConnection("Event_Planner.services::cred");  
          var filename = $.request.parameters.get("file_name");  
          var file1 = extractMultiPartParameters(filename);
          var pstmt = conn.prepareStatement('UPDATE "EVENT_PLANNER"."FINANCE" SET INVOICE = ? WHERE USER_ID=1');
          pstmt.setString(1,file1.contents);
          pstmt.execute();  
            
          pstmt.close();  
          conn.commit();  
          conn.close(); 
           $.response.setBody("[200]:Upload successful!");  
}  
 catch(err){  
                  $.response.contentType = "text/plain";  
                  $.response.setBody("Error while executing query: [" + err.message + "]");  
                  $.response.returnCode = 200; 
}