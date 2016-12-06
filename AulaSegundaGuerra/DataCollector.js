var debug = true;
var timer;
var currentScreen = "";
var idClass = "";
var answerlist = ["0","0","0"]; 
var iterador = 0;

onload =  function(e){

	var html = document.querySelectorAll("html");
    currentScreen = e.target.baseURI.split("/").slice(-1)[0];
	for (var i=0;  i < html.length; i++) {
		html[i].addEventListener("click", listenClick);
	}

    timer = setInterval(overflowTimer, 2000);
}

function overflowTimer(){
    var timestamp = new Date().getTime();

    if (currentScreen == "questionario.html" && idClass == "") idClass = "Q:1:H:1-1";

    if(debug) {
       /* console.log("-------after two seconds----------");
        console.log("DataCollector timestamp: "+timestamp);
        console.log("Tela Atual: "+currentScreen);*/
    }

    $.post("http://localhost:5000/storage/1",
        {
            idUser: "2",
            timeStamp: timestamp,
            tipo: null,
            tela: currentScreen,
            tag: null,
            x: null,
            y: null,
            classId: idClass
        },
        function(data, status){
            //console.log("PLAYER------Data: " + data + "\nStatus: " + status);
            response = data.recommendation[0].recommendation;
            questions = data.recommendation[1].questions;
            response = response.split(";");
            questions = questions.split(",")
            console.log("response: " + response);
            //console.log("response len: " + response.length);
            console.log("questions: " + questions);
        });
}

var escolha;
window.confirm = function(al, $){
    return function(msg) {
        al.call(window,msg);
        $(window).trigger("confirmacao");
    };
}(window.confirm, window.jQuery);


$(window).on("confirmacao", function(e) {
    console.log("escolhi: "+escolha);
});


function listenClick(e){
    clearInterval(timer);
    timer = setInterval(overflowTimer, 2000);
    currentScreen = e.target.baseURI.split("/").slice(-1)[0];
    idClass = e.target.className;
    //console.log ("Aqui 2");

    //console.log("IDCLASS: " + idClass);

     var timestamp = new Date().getTime();
    /*var tag = e.target.localName;
    if (e.target.localName == "input") {
       // console.log("INPUT");
        tag = e.target.localName + "-" + e.target.defaultValue;
        //console.log("INPUT: " + tag);
    }*/

  /*  if(debug) {
       console.log("-----------------");
        console.log(e);
        console.log("tela:" + currentScreen);
        console.log("x: " + e.screenX + " y: " + e.screenY);
        console.log(e.type);
        console.log("target id: " + e.target.id);
        console.log("target class: " + e.target.className);
        console.log("selected option:", e.target.defaultValue);
        console.log(e.target.localName);
      //  console.log(tag);
        console.log(e.timeStamp);
        console.log(e.which);
        console.log("DataCollector timestamp: "+timestamp); 
    }*/

    //e.target.defaultValue == "A" || e.target.defaultValue == "B" || e.target.defaultValue == "C" 
    //    || e.target.defaultValue == "D" || e.target.defaultValue == "E"
    //console.log("selected option:" + e.target.defaultValue);

    if (e.target.className ==  "Q:1:H:1-1 list-group-item" ||
        e.target.className ==  "Q:2:H:1-2 list-group-item" ||
        e.target.className ==  "Q:3:H:1-3 list-group-item" ||
        e.target.className ==  "Q:4:H:1-1 list-group-item" ||
        e.target.className ==  "Q:5:H:1-2 list-group-item" ||
        e.target.className ==  "Q:6:H:1-3 list-group-item") {
    //    console.log("class name " + e.target.className[2]);
        i = parseInt(e.target.className[2])
        console.log(i);
        iterador = i-1;
    }

    if (e.target.defaultValue != undefined) {
        console.log("target class: " + e.target.className[2]);
        i = parseInt(e.target.className[2])
        console.log(i);
        iterador = i-1;
        answerlist[iterador] = e.target.defaultValue;
        console.log(answerlist);
    }

    $.post("http://localhost:5000/storage/1",
    {
      idUser: "2",
      timeStamp: timestamp,
      tipo: e.type,
      tela: currentScreen,
      tag: e.target.localName,
      x:e.screenX,
      y:e.screenY,
      classId: idClass
    },
    function(data, status){
            response = data.recommendation[0].recommendation;
            questions = data.recommendation[1].questions;
            response = response.split(";");
            questions = questions.split(",")
            console.log("response: " + response);
            //console.log("response len: " + response.length);
            console.log("questions: " + questions);
        });
}

function listemMouseOver(e){
	console.log(e.target);
}

function listemMouseOut(e){
	console.log(e.target);
}
