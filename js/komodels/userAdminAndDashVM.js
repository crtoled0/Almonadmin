// Main viewmodel class
define(['jquery',
        'knockout',
        'bootstrap',
        'i18n!nls/nls.userAdminAndDash.js',
        'i18nTool',
        'AjaxAdmin',
        'masonry.pkgd',
        'text!'+dom+'/templates/userAdminAndDash.html',
        'mmenu',
        'inspinia'],
  function($, ko, bt,i18nAtt,atTool, ajx, Masonry , htmTlp) {
    return function userAdminAndDashVM() {
        var mainMod = this;
    //Private
        var sessTkn;
        var loggedUser;
        var initJquery = function(){
          require(['jquery-bridget/jquery-bridget'],
            function( jQueryBridget ) {
                jQueryBridget( 'masonry', Masonry, $);
                $('.grid').masonry({itemSelector: '.grid-item',
                                    columnWidth: '.grid-item'});
           });

           setTimeout(function(){
             $('nav#menudashcats').mmenu({
                 extensions	: [ 'theme-white' ],
                 offCanvas: false,
                 navbar: {
                   title: "Categorias"
                 },
                 navbars		: [
                   						{
                   							content		: [ 'searchfield' ]
                   						}, {
                   							content		: [ 'prev', 'breadcrumbs' ]
                   						}
                   					]
               });
               $('.file-box').each(function() {
                    animationHover(this, 'pulse');
               });
           },300);


        };
    //Public
        mainMod.welcomeMsg = ko.observable("Welcome To Main userAdminAndDash Model");
        mainMod.template = htmTlp;
        mainMod.locale = function(attrName, keys){
           return atTool.translateAtt(attrName, i18nAtt[attrName], keys);
        };
        mainMod.visible = ko.observable(false);
        mainMod.loaded = ko.observable(false);
        mainMod.dashboard = ko.observable();
        mainMod.onkoModAppear = function(){
            if(!mainMod.loaded()){
                  console.log("Loading dashboard Data");
                  sessTkn = koMods["app"].sessTkn();
                  if(!sessTkn){
                      koMods["app"].logOut();
                      return;
                  }
                  ajx.callService("getUserDashboard",null,"GET",sessTkn,function(_res){
                    if(_res.user){
                       console.log(_res);
                       koMods["app"].user(_res.user);
                       if(koMods["imagesMod"])
                          koMods["imagesMod"].indexImages(_res.images);
                       mainMod.dashboard(_res);
                       setTimeout(function(){
                         initJquery();
                         mainMod.loaded(true);
                       },300);
                    }
                    else{
                      if(_res.error.code === 1)
                            koMods["app"].logOut();
                    }
                  });
             }
        };

         mainMod.editUser = function(){
            console.log("Edit User Clicked");
             koMods["imagesMod"].openPickImageMod();
         };

    };
 }
);
