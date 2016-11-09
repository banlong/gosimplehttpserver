//Create SVG/Image for chart
function createSVG(){
    //Select the SVG to export
    var svg = document.querySelector( "svg" );
    //Get data
    var svgData = new XMLSerializer().serializeToString(svg);

    //Create canvas, container of image from svg
    var canvas = document.createElement( "canvas" );
    var ctx = canvas.getContext( "2d" );
    var img = document.createElement( "img" );

    //image has to be loaded before we can get the image string
    //btoa = Encode a string in base-64
    img.setAttribute( "src", "data:image/svg+xml;base64," + window.btoa(svgData) );
    img.onload = function() {
        ctx.drawImage( img, 0, 0 );
        // Now is done, can I upload this image to server?
        var canvasURL = canvas.toDataURL("image/png");
        console.log(canvasURL);

        //Save image
        //canvas.toBlob(function(blob) {
        //    saveAs(blob, "pretty.png", true);
        //});

        //Display image
        var imgElement = document.getElementById("exportImage");
        imgElement.src = canvasURL;
        console.log(imgElement.src);

        //Upload image
        upload(canvasURL);
    };

}

//Save SVG as PNG in local machine
function saveSVG(){
    bb = new window.WebKitBlobBuilder || window.MozBlobBuilder;
    var svg = document.querySelector( "svg" );
    bb.append(svg.toSVG());
    var blob = bb.getBlob("application/svg+xml;charset=" + svg.characterSet);
    saveAs(blob,"name.svg");
}

//Upload image string to server
function upload(canvasURL){
    canvasURL = canvasURL.replace("data:image/png;base64,", "");
    // Create a new FormData object.
    var formData = new FormData();

    // Files
    formData.append("bar", canvasURL);

    // Set up the request.
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload', true);

    // Send the Data.
    xhr.send(formData);
}