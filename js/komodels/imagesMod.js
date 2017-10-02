function imagesMod() {
    var mainMod = this;
//Private
var initJqueryOnce = function(){
  $("#pickImageMod .modal-dialog").css({"position":"absolute","width":"80%","left":"15%"});
  setTimeout(function(){
    $('#pickImageMod .grid').masonry({
      itemSelector: '.grid-item',
      columnWidth: '.grid-item'
    //  columnWidth: '.grid-item'
    });
  },400);
  $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green',
  });
  $("div.imgContainer a.grid-item").mouseover(function(){
  	$(".imageOverDiv", $(this)).css("visibility","visible");
  });
  $("div.imgContainer a.grid-item").mouseout(function(){
  	$(".imageOverDiv", $(this)).css("visibility","hidden");
  });
}

var initJquery = function(){

};
//Public
    mainMod.moduleConfig = ko.observable();
    mainMod.locale = function(attName, par){
         return koMods.translator.translateAtt(mainMod.moduleConfig().name,attName, par);
    }

    mainMod.welcomeMsg = ko.observable("Welcome To images app Model");
    mainMod.imgMapp = ko.observable();
    mainMod.imagesArr = ko.observableArray([]);
    mainMod.selectedImgs = ko.observableArray([]);

    mainMod.onkoModAppear = function(){
          console.log(mainMod.moduleConfig().name+" onLoad");
    };

    mainMod.indexImages = function(imgArr){
        console.log("indexImages");
        mainMod.imagesArr(imgArr);
        var imgMapp = mainMod.imgMapp()?mainMod.imgMapp():{};
        for(var i in imgArr){
           if(!imgMapp[imgArr[i].id]){
              var thumImg = new Image();
              thumImg.src = imgArr[i].thumb;
              var imgNode = {thumbUrl:imgArr[i].thumb,
                             thumb: thumImg};
               imgMapp[imgArr[i].id] = imgNode;
           }
        }
        mainMod.imgMapp(imgMapp);
        setTimeout(function(){
           initJqueryOnce();
        },300);
    };

    mainMod.getImageFromIndex= function(img){
        if(mainMod.imgMapp()[img.id])
            return mainMod.imgMapp()[img.id].thumb.src;

        return img.thumb;//"<img src=\""+img.thumb+"\" />";

    };

    mainMod.openPickImageMod = function(){
       $("#pickImageMod").appendTo("body").modal();
       initJquery();
    };

    mainMod.selectImage = function(imgId){
        mainMod.selectedImgs.push(imgId);
    };

    mainMod.unselectImage = function(imgId){
         var tempArr = mainMod.selectedImgs();
          tempArr.splice(tempArr.indexOf(imgId),1);
         mainMod.selectedImgs(tempArr);
    };
}

koMods["imagesMod"] = new imagesMod();
