var fs = require("fs");
//主要业务逻辑模块就是遍历循环然后追加数组然后返回数组渲染页面
exports.getAllAlbums = function(callback){

    fs.readdir("./uploads",function(err,files){

        if(err){
            callback("没有找到文件",null);
        }
        // 如果有文件
        var allAlabums = [];

        (function iterator(i){
            if(i == files.length){
                console.log(allAlabums);
                callback(null,allAlabums)
                return false

            }
            fs.stat("./uploads/"+ files[i],function(err,stats){
                if(err){
                    callback("没有找到文件"+files[i],null)
                }
                if(stats.isDirectory()){
                    allAlabums.push(files[i]);
                }
                iterator(i+1)


            })



        })(0)


    })

}


exports.getAllImagesByAlbumName = function(albumName,callback){
    fs.readdir("./uploads/" + albumName,function(err,files){
        if(err){
            callback("没有找到uploads文件",null);
            return;
        }
        var allImages = [];
        (function iterator(i){
            if(i == files.length){
                //遍历结束
                console.log(allImages);
                callback(null,allImages);
                return;
            }
            fs.stat("./uploads/" + albumName + "/" + files[i],function(err,stats){
                if(err){
                    callback("找不到文件" + files[i] , null);
                    return;
                }
                if(stats.isFile()){
                    allImages.push(files[i]);
                }
                iterator(i + 1);
            });
        })(0);
    });
}



















// exports.getAllImagesByAlbumName = function( albumName,callback){

//  fs.readdir("./uploads/"+ albumName,function(err,files){

//         if(err){
//             callback("没有找到文件",null);
//         }
//         // 如果有文件
//         var imagesarry = [];

//         (function iterator(i){
//             if(i == files.length){
//                 console.log(imagesarry);
//                 callback(null,imagesarry)
//                 return false

//             }
//             fs.stat("./uploads/"+ albumName+"/"+ files[i],function(err,stats){
//                 if(err){
//                     callback("没有找到文件"+files[i],null)
//                     return false
//                 }
//                 if(stats.isFile()){
//                     imagesarry.push(files[i]);
//                 }
//                 iterator(i+1)


//             })



//         })(0)


//     })






// }