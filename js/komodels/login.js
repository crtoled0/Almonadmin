function login() {
    var mainMod = this;
//Private

//Public
    var loadTranslatorModule = function(callback){
         $("body").append("<script src=\"js/kocommon/translator.js\"> </script>");
         var inter = setInterval(function(){
             if(koMods["translator"]){
                clearInterval(inter);
                koMods["translator"].loadDefaultLang(function(){
                  if(callback)
                      callback();
                });
             }
         },100);
    };
    mainMod.loginPageReady = ko.observable(false)
    mainMod.locale = function(attName, par){
         return koMods["translator"].translateAtt("login",attName, par);
    }
    mainMod.login = function(formElements){
        var emailId = $("#userEmail", $(formElements)).val();
        var pass = $("#pass", $(formElements)).val();
        var usrLogTitle = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(emailId)?"email":"userId";
        var keepSess = $("#keepSess", $(formElements)).is(":checked");
        var par = {};
        par[usrLogTitle] = emailId;
        par["password"] = pass;
        console.log(par);
        ajaxAdmin.callService("login",par,"POST",function(_res){
          if(_res.OK){
            sessionStorage.setItem("sessToken",_res.token);
            sessionStorage.setItem("loggedUser",JSON.stringify(_res.usr));
            if(keepSess)
                localStorage.setItem("sessToken",_res.token);

            location.href = "./index.html";
          }
        });
    };

    $(document).ready(function(){
        loadTranslatorModule(function(){
            koMods["translator"].loadModuleLocale({name:"login",locale:"/locale/login"},function(){
                  mainMod.loginPageReady(true);
            });
        });
    });
}

koMods = {};
koMods["login"] = new login();
ko.applyBindings(koMods["login"]);
