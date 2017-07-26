
//next 为路由都不匹配的时候最后一个接住错误最后一个页面接住404
var file = require("../models/file.js");
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var sd = require("silly-datetime");


exports.showIndex = function(request,response,next){


file.getAllAlbums(function(err,allAlabums){

	if(err){
		next();
		return;
	}

	response.render("index",{
	"albums":allAlabums
});



})




}

exports.showAlbum = function(request,response,next){
	//获取地址参数
var albumName = request.params.albumName;

	file.getAllImagesByAlbumName(albumName,function(err,allImages){
			if(err){
				next();
				return;
			}

			response.render("album",{
				"albumname": albumName,
				"images":allImages

			})

	})


}


/*显示上传路由界面*/

exports.showUp = function(request,response){

	file.getAllAlbums(function(err,allAlabums){

		response.render("up",{
		"albums":allAlabums

	})

	})

	

}

//上传文件
//
exports.dopost = function(request,response){


		/*长传工具包很好用*/
		var form = new formidable.IncomingForm();
 		form.uploadDir = path.normalize(__dirname + "/../tempup");
 
   
 
    form.parse(request, function(err, fields, files,next) {

    	if(err){
    		next();
    		return;
    	}
    
    	 var size = parseInt(files.tupian.size)
    	 if(size > 1000000){
    	 	console.log(size)
    	 	response.send("图片应该小于1M");
    	 	//然后删除图片
    	 	fs.unlink(files.tupian.path);
    	 	
    	 	return;
    	 }


    	  //改名字病移动文件夹
    var extname = path.extname(files.tupian.name)

    var ran = parseInt(Math.random() * 89999 + 10000);
   var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
   var wenjianjia = fields.wenjianjia;
   var oldpath = files.tupian.path;

    var newpath = path.normalize(__dirname + "/../uploads/" + wenjianjia + "/" + ttt + ran + extname);
   console.log(newpath)
   fs.rename(oldpath,newpath,function(err){
            if(err){
            	console.log(err)
                response.send("改名失败");
                return;
            }
            response.send("成功");
        });
   		// var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
     //    var ran = parseInt(Math.random() * 89999 + 10000);
     //    var extname = path.extname(files.tupian.name);

     //    var wenjianjia = fields.wenjianjia;
     //    var oldpath = files.tupian.path ;
     //    var newpath = path.normalize(__dirname + "/../uploads/" + wenjianjia + "/" + ttt + ran + extname);
     //    fs.rename(oldpath,newpath,function(err){
     //        if(err){
     //            response.send("改名失败");
     //            return;
     //        }
     //        response.send("成功");
     //    });











    });

   
 
  return;


}

 
 	
  
  

