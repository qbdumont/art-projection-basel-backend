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
if (window.location.pathname === "/henna") {
    $(function () {
        var selection = null;

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
            selection = $(this).children().attr("id");
            var hennaSelection = "../assets/" + $(this).children().attr("id") + ".png";
            console.log("henna", hennaSelection)
            fabric.Image.fromURL(hennaSelection, function (img) {
                //  img.scale(0.5).set({
                //    left: 150,
                //    top: 150,
                //    angle: -15
                //  });
                canvasObj.add(img).setActiveObject(img);
            }, {
                left: 200,
                right: 100,
                top: 0,
                hasControls: false,
                hasRotatingPoint: false,
                lockMovementX: true,
                lockMovementY: true,
                hasBorders: false
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

        $(".submit-button").on("click", function () {
            //        var name = null;
            if (selection !== null) {
                console.log(selection);
                //            var name = prompt("Please enter your name");
                swal({
                        title: "Please enter your name",
                        type: "input",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        animation: "slide-from-top",
                        inputPlaceholder: "Write something"
                    },
                    function (inputValue) {
                        if (inputValue === false) return false;

                        if (inputValue === "") {
                            swal.showInputError("You need to write your name!");
                            return false
                        }

                        var data = {
                            selection: selection,
                            name: inputValue
                        };
                        if (data.name && data.selection) {
                            $.post("/henna-post", data)
                                .done(function (response) {
                                    if (response == "OK") {
                                        swal("Nice!", "Please see Henna Artist", "success");
                                        canvasObj.clear();
                                        selection = null;
                                    } else {
                                        swal({
                                            title: "Error!",
                                            text: "Save issue, please alert Rep",
                                            type: "error",
                                            confirmButtonText: "Cool"
                                        });
                                    }
                                });
                        }

                    });









            } else {
                console.log("no selection")
            }
        })
        $(".cancel-button").on("click", function () {
            canvasObj.clear();
            selection = null;
        })

    })
} else {

    (function worker() {
        var htmlText = "";
        $.ajax({
            url: '/update-images',
            success: function (data) {
                if ($('ul li').length > 1) {
                    console.log($('ul li').length, data.length);
                    if (data.length > $('ul li').length) {
                        for (var j = 1; j < (data.length - $('ul li').length) + 1; j++) {
                            console.log(j)
                            var htmlText = '<li><div class="item-container"><h1>' + data[data.length - j].name + '</h1><img src="../assets/' + data[data.length - j].henna + '.png" class="artist-image"><input '+data[data.length - j].checked+'type="checkbox" name="finished" onchange="markAsDone(this);"></div></li>'
                        }
                        $('ul').append(htmlText);
                    } else {
                        console.log("here")
                        for (var i = 0; i < data.length; i++) {
                            console.log(data[i].checked)
                            if (data[i].checked == "checked"){
                                var $selector = "ul.nav li:eq("+(i+1)+")";
                                $( "ul li:eq("+(i)+")").find('[type=checkbox]').prop('checked', true);
//                                if ($("H2:contains('"+data[i].name+"')").length) {
//                                    jQuery(this).closest('div').find('[type=checkbox]').prop('checked', true);
//                                }

                            }
                        }
                    }
                }
            },
            complete: function () {
                // Schedule the next request when the current one's complete
                setTimeout(worker, 5000);
            }
        });
    })();

    var markAsDone = function (index) {
        var doneData = {};
        doneData.name = index.name.split(",")[0];
        doneData.selection = index.name.split(",")[1];
//        var doneData = index.name.split(",");
        console.log(doneData);
        $.post("/finish", doneData)
            .done(function (response) {

            });
    }


}