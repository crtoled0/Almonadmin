// Main viewmodel class
define(['jquery',
        'knockout',
        'bootstrap',
        'i18n!nls/nls.app.js',
        'i18nTool',
        'AjaxAdmin'],
  function($, ko, bt,i18nAtt,atTool, ajx) {
    return function appVM() {
        var mainMod = this;
    //Private
        var mainModules = {};
        var jQueryInit = function(){
            $("#side-menu li").click(function(){
                $("#side-menu li").removeClass("active");
                $(this).addClass("active");
            });
        };

        var hideAllModules = function(){
          console.log(koMods);
           for(var key in koMods){
             if(key !== "app")
              koMods[key].visible(false);
           }
        }

    //Public
        mainMod.locale = function(attrName, keys){
           return atTool.translateAtt(attrName, i18nAtt[attrName], keys);
        };
        mainMod.moduleConfig = ko.observable();

        mainMod.user = ko.observable();
        mainMod.koTlpCont = ko.observable();
        mainMod.sessTkn = ko.observable();
        mainMod.onkoModAppear = function(callback){
              console.log("app onLoad");
              console.log(ajx);
              /**
              for(var i in _mainModules){
                  mainModules[_mainModules[i].name] = _mainModules[i];
              }
              **/
              mainMod.loginUser(null,function(){
                if(sessionStorage.getItem("sessToken"))
                      mainMod.sessTkn(sessionStorage.getItem("sessToken"));
                else if(localStorage.getItem("sessToken")){
                      mainMod.sessTkn(localStorage.getItem("sessToken"));
                      //TODO Refresh Local Storage once in a while
                }
                else{
                    location.href="./login.html";
                }
                if(sessionStorage.getItem("loggedUser"))
                    mainMod.loadLoggedUser(JSON.parse(sessionStorage.getItem("loggedUser")));

                if(callback)
                    callback();
              });


        };

        mainMod.loadLoggedUser = function(usr){
            mainMod.user(JSON.parse(sessionStorage.getItem("loggedUser")));
        //    jQueryInit();
        };

        mainMod.loginUser = function(usr,callback){
          var par = {};
          par["userId"] = "maltesshelf";
          par["password"] = "Welcome1";
          console.log(par);
          ajx.callService("login",par,"POST",function(_res){
            if(_res.OK){
              sessionStorage.setItem("sessToken",_res.token);
              sessionStorage.setItem("loggedUser",JSON.stringify(_res.usr));
              callback();
            }
          });
        };

        mainMod.logOut = function(){
             sessionStorage.removeItem("loggedUser");
             sessionStorage.removeItem("sessToken");
             localStorage.removeItem("sessToken");
             location.href="./login.html";
        };

        mainMod.loadMainModule = function(mainModName){
            //var liNode = $(ev.currentTarget).parent();
          //  console.log($(ev.currentTarget));
            //$("#side-menu li").removeClass("active");
            //setTimeout(function(){
              //  liNode.addClass("active");
            //},250);
            hideAllModules();
            koMods[mainModName].visible(true);
            koMods[mainModName].onkoModAppear();
            //$(".mainModule").hide();
            //    $("#koMod"+mod2L.name).show();
          //  koMods[""].onkoModAppear();

        };
    };
});
