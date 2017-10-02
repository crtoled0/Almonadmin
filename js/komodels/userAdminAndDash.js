function userAdminAndDash() {
    var mainMod = this;
//Private
    var sessTkn;
    var loggedUser;

    var initJquery = function(){
      $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-item'
      //  columnWidth: '.grid-item'
      });
    }
//Public
    mainMod.moduleConfig = ko.observable();
    mainMod.locale = function(attName, par){
         return koMods.translator.translateAtt(mainMod.moduleConfig().name,attName, par);
    }

    mainMod.welcomeMsg = ko.observable("Welcome To Main userAdminAndDash Model");
    mainMod.dashboard = ko.observable();
    mainMod.onkoModAppear = function(){
          console.log(mainMod.moduleConfig().name+" onLoad");
          sessTkn = koMods["app"].sessTkn();
          if(!sessTkn){
              koMods["app"].logOut();
              return;
          }
          ajaxAdmin.callService("getUserDashboard",null,"GET",sessTkn,function(_res){
            if(_res.user){
               console.log(_res);
               koMods["app"].user(_res.user);
               koMods["imagesMod"].indexImages(_res.images);
               mainMod.dashboard(_res);
               setTimeout(function(){
                 initJquery();
               },300);
            }
            else{
              if(_res.error.code === 1)
                    koMods["app"].logOut();
            }
          });
    };

     mainMod.editUser = function(){
        console.log("Edit User Clicked");
         koMods["imagesMod"].openPickImageMod();
     };

}

koMods["userAdminAndDash"] = new userAdminAndDash();
