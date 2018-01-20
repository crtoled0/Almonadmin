// Main viewmodel class
define(['jquery',
        'knockout',
        'bootstrap',
        'i18n!nls/nls.categories.js',
        'i18nTool',
        'AjaxAdmin',
        'masonry.pkgd',
        'text!'+dom+'/templates/categories.html'],
  function($, ko, bt,i18nAtt,atTool, ajx, Masonry , htmTlp) {
    return function imagesModVM() {
      var mainMod = this;
      //Private

      //Public
        mainMod.welcomeMsg = ko.observable("Welcome To Main imagesMod Model");
        mainMod.template = htmTlp;
        mainMod.locale = function(attrName, keys){
           return atTool.translateAtt(attrName, i18nAtt[attrName], keys);
        };
        mainMod.visible = ko.observable(false);
        //-----
        mainMod.welcomeMsg = ko.observable("Welcome To images app Model");
        mainMod.onkoModAppear = function(){
              console.log("Categories onLoad");
        };
//-- Finish
    };
 }
);
