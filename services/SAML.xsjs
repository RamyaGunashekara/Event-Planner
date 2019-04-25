function getUserInfo() {
    try {
        //var userId = $.session.getUsername();
        var body1 = {
            "UserID": $.session.getUsername(),                        
            "FirstName": $.session.getFirst_name,
            "LastName": $.session.getLast_name,
            "Email": $.session.getEmail
        };
        

        $.response.setBody(JSON.stringify(body1));
    } catch (e) {

        $.response.setBody(e.message);

    }
}
switch ($.request.method) {
    case xsruntime.net.http.GET:
        getUserInfo();
        break;
    default:
        $.response.status = $.net.http.METHOD_NOT_ALLOWED;
        $.response.setBody("The specified HTTP method is not supported");
}