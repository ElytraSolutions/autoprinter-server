var label;
var file = document.getElementById('upload-area');

function toggleBarVisibility() {
    var e = document.getElementById("bar_blank");
    e.style.display = (e.style.display == "block") ? "none" : "block";
}

function createRequestObject() {
    
    var http;
    
    http = new XMLHttpRequest();
    
    return http;
}

function sendRequest() {

    var http = createRequestObject();
    http.open("GET", "./AutoPrinter/upload_progress.php");
    http.onreadystatechange = function () { handleResponse(http); };
    http.send(null);
}

function RemoveStatus(){

    if(document.getElementById("status").innerHTML == "Upload Sucessful."){

        document.getElementById("status").innerHTML = "";

    }

}

function handleResponse(http) {

    var response;
    if (http.readyState == 4) {
        response = http.responseText;
        document.getElementById("bar_color").style.width = response + "%";
        document.getElementById("status").innerHTML = response + "%";

        if (response < 100) {
            setTimeout("sendRequest()", 1000);
        }
        else {
            toggleBarVisibility();
            document.getElementById("status").innerHTML = "Upload Sucessful.";
        }
    }
}

function startUpload() {
    toggleBarVisibility();
    setTimeout("sendRequest()", 1000);
}

(function () {
    
    document.getElementById("myForm").onsubmit = startUpload;

})();

file.addEventListener('change', filePresent);

function filePresent(){
    const name  = document.getElementById('upload-area').files[0].name;
    label = document.getElementById('label');
    label.innerHTML = name + ' || ' + returnFileSize(document.getElementById("upload-area").files[0].size);
}

function returnFileSize(number) {
    console.log(number);
    if(number < 1024) {
      return number + 'Bytes';
    } else if(number >= 1024 && number < 1048576) {
      return (number/1024).toFixed(1) + 'KB';
    } else if(number >= 1048576) {
      return (number/1048576).toFixed(1) + 'MB';
    }
}
  