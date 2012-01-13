(function($) {
    $.fn.imageManipulation = function(options) {
        var settings = $.extend({
            'blur':false,
            invert:false,
            rotateClockwise:0,
            'rotateAntiClockwise':0,
            blackAndWhite:false,
            canvasWidth:0,
            canvasHeight:0
        }, options);

        var img = new Image();
        img.src = this.attr('src');
        if (img.complete) {
            var canvas = document.createElement("canvas");
            if (canvas && canvas.getContext) {
                var ctx = canvas.getContext("2d");
                if (ctx) {
                    var imgWidth = img.width;
                    var imgHeight = img.height;
                    var cw = imgWidth,ch = imgHeight,cy = 0,cx = 0;
                    var angle;
                    if (settings.rotateClockwise != 0) {
                        angle = settings.rotateClockwise;
                        switch (angle) {
                            case 90:
                                cw = imgHeight;
                                ch = imgWidth;
                                cy = imgHeight * (-1);
                                break;
                            case 180:
                                cx = imgWidth * (-1);
                                cy = imgHeight * (-1);
                                break;
                            case 270:
                            case -90:
                                cw = imgHeight;
                                ch = imgWidth;
                                cx = imgWidth * (-1);
                                break;
                        }
                        canvas.setAttribute('width', cw);
                        canvas.setAttribute('height', ch);
                        ctx.rotate(angle * (Math.PI / 180));
                        ctx.drawImage(img, cx, cy);
                    }

                    if (settings.rotateAntiClockwise != 0) {
                        angle = settings.rotateAntiClockwise;
                        switch (angle) {
                            case 90:
                                cw = imgHeight;
                                ch = imgWidth;
                                cx = imgWidth * (-1);
                                break;
                            case 180:
                                cx = imgWidth * (-1);
                                cy = imgHeight * (-1);
                                break;
                            case 270:
                            case -90:
                                cw = imgHeight;
                                ch = imgWidth;
                                cy = imgHeight * (-1);
                                break;
                        }
                        canvas.setAttribute('width', cw);
                        canvas.setAttribute('height', ch);
                        ctx.rotate((360 - angle) * (Math.PI / 180));
                        ctx.drawImage(img, cx, cy);
                    }
                    var imageData;
                    var rgbaComponent;
                    var it = 0;
                    var n;
                    if (settings.invert) {
                        canvas.width = imgWidth;
                        canvas.height = imgHeight;
                        ctx.drawImage(img, 0, 0);
                        imageData = ctx.getImageData(0, 0, imgWidth, imgHeight);
                        rgbaComponent = imageData.data;
                        for (it = 0,n = rgbaComponent.length; it < n; it += 4) {
                            rgbaComponent[it] = 255 - rgbaComponent[it];
                            rgbaComponent[it + 1] = 255 - rgbaComponent[it + 1];
                            rgbaComponent[it + 2] = 255 - rgbaComponent[it + 2];
                        }
                        ctx.putImageData(imageData, 0, 0);
                    }
                    if (settings.canvasHeight != 0 && settings.canvasWidth != 0) {
                        var cvCopy = document.createElement("canvas");
                        cvCopy.id = "canvasCopy";
                        document.body.appendChild(cvCopy);
                        var cvContext = cvCopy.getContext("2d");
                        var maxWidth = settings.canvasWidth;
                        var maxHeight = settings.canvasHeight;
                        var ratio = 1;
                        if (imgWidth > maxWidth)
                            ratio = maxWidth / imgWidth;
                        else if (imgHeight > maxHeight)
                            ratio = maxHeight / imgHeight;
                        cvCopy.width = imgWidth;
                        cvCopy.height = imgHeight;
                        cvContext.drawImage(img, 0, 0);
                        canvas.width = imgWidth * ratio;
                        canvas.height = imgHeight * ratio;
                        ctx.drawImage(cvCopy, 0, 0, canvas.width, canvas.height);
                        document.getElementsByTagName("body")[0].removeChild(document.getElementById("canvasCopy"))
                    }

                    if (settings.blackAndWhite) {
                        canvas.width = imgWidth;
                        canvas.height = imgHeight;
                        ctx.drawImage(img, 0, 0);
                        imageData = ctx.getImageData(0, 0, imgWidth, imgHeight);
                        rgbaComponent = imageData.data;
                        for (it = 0,n = rgbaComponent.length; it < n; it += 4) {
                            var blackWhite = rgbaComponent[it  ] * .3 + rgbaComponent[it + 1] * .59 + rgbaComponent[it + 2] * .11;
                            rgbaComponent[it] = blackWhite;
                            rgbaComponent[it + 1] = blackWhite;
                            rgbaComponent[it + 2] = blackWhite;
                        }
                        ctx.putImageData(imageData, 0, 0);
                    }


                    if (settings.blur) {
                        canvas.width = imgWidth;
                        canvas.height = imgHeight;
                        ctx.drawImage(img, 0, 0);
                        imageData = ctx.getImageData(0, 0, imgWidth, imgHeight);
                        rgbaComponent = imageData.data;
                        var redMixing = 0;
                        var greenMixing = 0;
                        var blueMixing = 0;
                        var surroundingDataIndex;
                        var surroundingPixelsCount = 0;
                        var totalRGBAComponentsWidthWise = 4 * imgWidth;
                        for (it = 0,n = rgbaComponent.length; it < n; it += 4) {
                            surroundingDataIndex = [it - totalRGBAComponentsWidthWise - 4,it - totalRGBAComponentsWidthWise,it - totalRGBAComponentsWidthWise + 4 ,it - 4,it + 4,it + totalRGBAComponentsWidthWise - 4 ,it + totalRGBAComponentsWidthWise,it + totalRGBAComponentsWidthWise + 4];
                            for (var i = 0; i < surroundingDataIndex.length; i++) {
                                if (surroundingDataIndex[i] > 0 && surroundingDataIndex[i] < rgbaComponent.length - 3) {
                                    redMixing += rgbaComponent[surroundingDataIndex[i]];
                                    greenMixing += rgbaComponent[surroundingDataIndex[i] + 1];
                                    blueMixing += rgbaComponent[surroundingDataIndex[i] + 2];
                                    surroundingPixelsCount++;
                                }
                            }
                            rgbaComponent[it] = (redMixing / surroundingPixelsCount);
                            rgbaComponent[it + 1] = (greenMixing / surroundingPixelsCount);
                            rgbaComponent[it + 2] = (blueMixing / surroundingPixelsCount);
                            surroundingPixelsCount = redMixing = greenMixing = blueMixing = 0;
                        }
                        ctx.putImageData(imageData, 0, 0);
                    }

                    $("#inverted").append(canvas)
                }
            }
        }

    }
}
        )
        (jQuery);