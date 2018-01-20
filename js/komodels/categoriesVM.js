// Main viewmodel class
define(['jquery',
        'knockout',
        'bootstrap',
        'i18n!nls/nls.categories.js',
        'i18nTool',
        'AjaxAdmin',
        'masonry.pkgd',
        'text!'+dom+'/templates/categories.html',
        'mmenu',
        'inspinia',
        'bootstrap2-toggle'],
  function($, ko, bt,i18nAtt,atTool, ajx, Masonry  ,htmTlp) {
    return function imagesModVM() {
      var mainMod = this;
      //Private
      var allUsrCats = [{
                "id": "1",
                "parentCategory": null,
                "name": "Grabados",
                "userId": "maltesshelf",
                "description": "En esta seccion encontraremos grabados y blablablabla"
            },
            {   "id": "2",
                "parentCategory": null,
                "name": "Oleos",
                "userId": "maltesshelf",
                "description": "En esta seccion encontraremos Oleos y Pastels y blablablabla",
                "childCategories": [
                    {
                        "id": "3",
                        "parentCategory": "2",
                        "name": "Oleos Negros",
                        "userId": "maltesshelf",
                        "description": "En esta seccion encontraremos Oleos y Pastels negros blablablabla"
                    },
                    {
                        "id": "4",
                        "parentCategory": "2",
                        "name": "Oleos Blancos",
                        "userId": "maltesshelf",
                        "description": "En esta seccion encontraremos Oleos y Pastels blancos blablablabla"
                    }
                ]
            }
        ];

      var catTemplate = {id:null,
                         description:"",
                         name: "",
                         parentCategory: null,
                         userId: null
                       };
      var initJS = function(){
          setTimeout(function(){
            $('nav#menu').mmenu({
                extensions	: [ 'theme-white' ],
                offCanvas: false,
                navbar: {
                  title: "Inicio"
                },
                navbars		: [
                  						{
                  							content		: [ 'searchfield' ]
                  						}, {
                  							content		: [ 'prev', 'breadcrumbs' ]
                  						}
                  					]
              });

              $('#catProducts .file-box').each(function() {
                   animationHover(this, 'pulse');
              });

            //  require(['switchery'], function(Switchery) {
            $('#catSection').bootstrapToggle('destroy');
            $('#catSection').bootstrapToggle({
                on: 'Edit Category',
                off: 'Select Products',
                onstyle: 'primary',
                offstyle:'warning',
                size: 'medium',
                style: 'sectionSwitcher',
                width: 150,
                height: 25
            });

            $('#catSection').change(function() {
                mainMod.editProdSecActive(!$(this).prop('checked'));
            });
          //    });



          },300);
      };

      //Public
        mainMod.welcomeMsg = ko.observable("Welcome To Main imagesMod Model");
        mainMod.template = htmTlp;
        mainMod.locale = function(attrName, keys){
           return atTool.translateAtt(attrName, i18nAtt[attrName], keys);
        };
        mainMod.visible = ko.observable(false);
        mainMod.loaded = ko.observable(false);
        mainMod.editProdSecActive = ko.observable(true);
        //-----
        mainMod.welcomeMsg = ko.observable("Welcome To images app Model");
        mainMod.userCategories = ko.observableArray(allUsrCats);
        mainMod.selectedcategory = ko.observable(JSON.parse(JSON.stringify(catTemplate)));
        mainMod.onkoModAppear = function(){
              console.log("Categories onLoad");
              initJS();
        };
        mainMod.selectParentCategory = function(){
           mainMod.pickCategoryMod(function(_selCat){
              console.log(_selCat);
           });
        };
        var afterPickCall;
        mainMod.pickCategoryMod = function(_afterPickCall){
           afterPickCall = _afterPickCall;
           $("#pickCategoryMod").appendTo("body").modal();
           setTimeout(function(){
             $('nav#pickcatMenu').mmenu({
                 extensions	: [ 'theme-white' ],
                 offCanvas: false,
                 navbar: {
                   title: "Inicio"
                 },
                 navbars		: [
                              {
                                content		: [ 'searchfield' ]
                              }, {
                                content		: [ 'prev', 'breadcrumbs' ]
                              }
                            ]
               });
           },300);
        };
        mainMod.pickCategorySelected = function(_node){
            afterPickCall(_node);
            $("#pickCategoryMod").modal("hide");
        }
//-- Finish
    };
 }
);
