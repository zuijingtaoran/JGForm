<%@ WebHandler Language="C#" Class="post" %>

using System;
using System.Web;

public class post : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        context.Response.Write("Hello World");
        var form = context.Request.Form;
        string type = form["type"];
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}