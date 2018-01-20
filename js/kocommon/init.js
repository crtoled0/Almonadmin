var dom = "/almonadmin";
var koMods = {};
require.config({
  //    config: {
    //          i18n: {
      //            locale: 'es'
        //      }
      //},
      shim: {
          'bootstrap': {
              deps: ['jquery']
          },
          'knockout': {
              deps: ['jquery']
          },
          'jquery.metisMenu': {
              deps: ['jquery']
          },
          'jquery.slimscroll': {
              deps: ['jquery']
          },
          'jquery.peity': {
              deps: ['jquery']
          },
          'masonry.pkgd': {
              deps: ['jquery']
          },
          'inspinia': {
              deps: ['jquery','jquery.metisMenu']
          },
          'pace': {
              deps: ['jquery']
          },
          'icheck': {
              deps: ['jquery']
          },
          'mmenu': {
              deps: ['jquery']
          },
          'bootstrap2-toggle': {
                deps: ['jquery', 'bootstrap']
            }
      },
      paths: {
          'jquery': dom+'/js/jquery-1.10.2',
          'knockout': dom+'/js/knockout-3.4.2',
          'bootstrap': dom+'/js/bootstrap.min',
          'jquery.metisMenu': dom+'/js/plugins/metisMenu/jquery.metisMenu',
          'jquery.slimscroll': dom+'/js/plugins/slimscroll/jquery.slimscroll.min',
          'jquery.peity': dom+'/js/plugins/peity/jquery.peity.min',
          'masonry.pkgd': dom+'/js/masonry.pkgd.min',
          'inspinia': dom+'/js/inspinia',
          'pace': dom+'/js/plugins/pace/pace.min',
          'icheck': dom+'/js/plugins/iCheck/icheck.min',
          'i18n': dom+'/js/i18n',
          'i18nTool': dom+'/js/lib/i18nTool',
          'AjaxAdmin': dom+'/js/lib/AjaxAdmin',
          'arrTool': dom+'/js/lib/arrTools',
          'text': dom+'/js/text',
          'mmenu': dom+'/js/plugins/mmenu/jquery.mmenu.all',
          'bootstrap2-toggle': dom+'/js/plugins/bootstrap2-toggle/bootstrap2-toggle.min'
      }
});
require(['knockout',
         'js/komodels/appVM.js',
         'js/komodels/imagesModVM.js',
         'js/komodels/userAdminAndDashVM.js',
         'js/komodels/categoriesVM.js',
         'js/komodels/productsVM.js',
         'js/komodels/myEventsVM.js'],
  function(ko, appMod, imgMod,usrAdmMod, catsMod, prodMod,myEMod) {
    koMods["app"] = new appMod();
    koMods["imagesMod"] = new imgMod();
    koMods["userAdminAndDash"] = new usrAdmMod();
    koMods["categories"] = new catsMod();
    koMods["products"] = new prodMod();
    koMods["myEvents"] = new myEMod();
    ko.applyBindings(koMods["app"]);
    koMods["app"].onkoModAppear(function(){
      var tlp = $(koMods["imagesMod"].template);
      $("koTlpCont").append(tlp);
      ko.applyBindings(koMods["imagesMod"], tlp[0]);
      //-------------------------------------------------------------
      tlp = $(koMods["userAdminAndDash"].template);
      $("koTlpCont").append(tlp);
      ko.applyBindings(koMods["userAdminAndDash"], tlp[0]);
      //-------------------------------------------------------------
      tlp = $(koMods["categories"].template);
      $("koTlpCont").append(tlp);
      ko.applyBindings(koMods["categories"], tlp[0]);
      //-------------------------------------------------------------
      tlp = $(koMods["products"].template);
      $("koTlpCont").append(tlp);
      ko.applyBindings(koMods["products"], tlp[0]);
      //-------------------------------------------------------------
      tlp = $(koMods["myEvents"].template);
      $("koTlpCont").append(tlp);
      ko.applyBindings(koMods["myEvents"], tlp[0]);

      koMods["userAdminAndDash"].onkoModAppear();
      koMods["userAdminAndDash"].visible(true);
    });

   }
);
