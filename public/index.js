//function readTextFile(file) {
//    console.log(file)
//    var rawFile = new XMLHttpRequest();
//    rawFile.open("GET", file, false);
//
//    rawFile.onreadystatechange = function () {
//        console.log(rawFile.response);
//        document.body.appendChild("<img src="+rawFile.response+" />");
//        
//        
//        if (rawFile.readyState === 4) {
//            if (rawFile.status === 200 || rawFile.status == 0) {
//                var allText = rawFile.responseText;
//                var img = new Image();
//                var div = document.getElementById('images');
////
//                img.onload = function () {
//                    if(document.body != null){ document.body.appendChild("<img src="+allText+" />")}
//
////                    div.appendChild(img);
//                };
//
////                img.src = allText;
////                alert(allText);
//            }
//        }
//    }
//    rawFile.send(null);
//}
//setTimeout(function(){ readTextFile("/images/1492468976599.json"); }, 3000);
//
$(function () {
    $('.multiple-items').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 0,
        centerMode: true
    });
    let canvas = new Canvas('wtd_background_image');
    let canvasObj = new fabric.Canvas('wtd_background_image');

    function Canvas(id) {
        this.canvas = document.createElement('canvas');
        this.canvas.id = id;
        document.getElementById("container").appendChild(this.canvas);
        return this.canvas;
    }
    canvasObj.setWidth($('.canvas-container').width());
    canvasObj.setHeight($('.canvas-container').height());

    // for demonstration
    //let circle = new fabric.Circle({radius: 20, fill: '#07C', left: 30, top: 30});
    //canvasObj.add(circle);
    //    var canvas = new Canvas('sdfsc');

    //var canvas = new fabric.Canvas('c');



    $(".item").on("click", function () {
        var hennaSelection = "../assets/" + $(this).children().attr("id") + ".png";
        console.log("henna", hennaSelection)
        fabric.Image.fromURL(hennaSelection, function (img) {
            //  img.scale(0.5).set({
            //    left: 150,
            //    top: 150,
            //    angle: -15
            //  });
            canvasObj.add(img).setActiveObject(img);
        },
        {
            left:300,
            right:300,
            top:100,
            hasControls: false,
            hasRotatingPoint: false,
            lockMovementX: true,
            lockMovementY: true
        });

    })
    var info = document.getElementById('info');

    canvasObj.on({
        'touch:gesture': function () {
            var text = document.createTextNode(' Gesture ');
            info.insertBefore(text, info.firstChild);
        },
        'touch:drag': function () {
            var text = document.createTextNode(' Dragging ');
            info.insertBefore(text, info.firstChild);
        },
        'touch:orientation': function () {
            var text = document.createTextNode(' Orientation ');
            info.insertBefore(text, info.firstChild);
        },
        'touch:shake': function () {
            var text = document.createTextNode(' Shaking ');
            info.insertBefore(text, info.firstChild);
        },
        'touch:longpress': function () {
            var text = document.createTextNode(' Longpress ');
            info.insertBefore(text, info.firstChild);
        }
    });
});