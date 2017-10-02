function app() {
    var mainMod = this;
//Private
    var mainModules = {};
    var jQueryInit = function(){
        $("#side-menu li").click(function(){
            $("#side-menu li").removeClass("active");
            $(this).addClass("active");
        });
    }
//Public
    mainMod.moduleConfig = ko.observable();
    mainMod.locale = function(attName, par){
         return koMods.translator.translateAtt(mainMod.moduleConfig().name,attName, par);
    };
    mainMod.user = ko.observable();
    mainMod.sessTkn = ko.observable();
    mainMod.onkoModAppear = function(_mainModules){
          console.log("app onLoad");
          for(var i in _mainModules){
              mainModules[_mainModules[i].name] = _mainModules[i];
          }
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
    };

    mainMod.loadLoggedUser = function(usr){
        mainMod.user(JSON.parse(sessionStorage.getItem("loggedUser")));
        jQueryInit();
    };

    mainMod.logOut = function(){
         sessionStorage.removeItem("loggedUser");
         sessionStorage.removeItem("sessToken");
         localStorage.removeItem("sessToken");
         location.href="./login.html";
    };

    mainMod.loadMainModule = function(mainModName){
        var mod2L = mainModules[mainModName];
        $(".mainModule").hide();
        if(!mod2L.type || mod2L.type !== "page"){
            $("#koMod"+mod2L.name).show();
            koMods[mod2L.name].onkoModAppear();
        }
    };
}

koMods["app"] = new app();
