var words = [
	new Word(0, "A", "Empieza por A:", " Prenda de vestir que se pone sobre las demás para protegerse del frío. ", "Abrigo"),
	new Word(1, "B", "Empieza por B:", " Tomar un líquido. ", "Beber"),
	new Word(2, "C", "Empieza por C:", " Joya que se pone alrededor del cuello. ", "Collar"),
	new Word(3, "D", "Empieza por D:", " Lugar en el que hace muchísimo calor, en donde apenas llueve, lleno de arena, y donde casi no hay vegetación.", "Desierto"),
	new Word(4, "E", "Empieza por E:", " Persona que cuida enfermos y ayuda a los doctores.", "Enfermero"),
	new Word(5, "F", "Empieza por F:", " Vehículo más pequeño que un camión que sirve para llevar mercancías", "Furgoneta"),
	new Word(6, "G", "Empieza por G:", " Establecimiento al lado de una carretera donde se vende gasolina y gasoil.", "Gasolinera"),
	new Word(7, "H", "Empieza por H:", " Parte en la que algunos animales tienen la boca y la nariz. ", "Hocico"),
	new Word(8, "I", "Empieza por I:", "  Tierra rodeada de agua por todas partes.", "Isla"),
	new Word(9, "J", "Empieza por J:", " Prenda de vestir, generalmente de lana, que te cubre hasta la cintura. ", "Jersey"),
	new Word(10, "L", "Empieza por L:", " Objeto que se utiliza para escribir o dibujar, formado por un tubo hueco con una mina de grafito en el interior.", "Lápiz"),
	new Word(11, "M", "Empieza por M:", "Planta con flores de pétalos blancos o amarillos, con el centro anaranjado.", "Margarita"),
	new Word(12, "N", "Empieza por N:", " Nombre de una fruta que tiene mucho zumo que además es de ese color.", "Naranja"),
	new Word(13, "Ñ", "Contiene la Ñ:", " Madera de los árboles que se corta en trozos para hacer fuego", "Leña"),
	new Word(14, "O", "Empieza por O:", " Pequeño agujero que se encuentra en el centro de la tripa. ", "Ombligo"),
	new Word(15, "P", "Empieza por P:", "  Instrumento de pintura con un mango largo y pelos en el extremo.", "Pincel"),
	new Word(16, "Q", "Empieza por Q:", " Sentir amor o cariño por algo o alguien. Desear algo. ", "Querer"),
	new Word(17, "R", "Empieza por R:", " Operación quirúrgica para reconstruir o modificar la nariz.", "Rinoplastia"),	  
	new Word(18, "S", "Empieza por S:", " Contrario de acompañado", "Solo"),
	new Word(19, "T", "Empieza por T:", " Dispositivo que se utiliza para medir el tiempo transcurrido, generalmente en horas, minutos y segundos.", "Temporizador"),
	new Word(20, "U", "Empieza por U:", " Frutos que suelen ir en racimo", "Uvas"),
	new Word(21, "V", "Empieza por V:", " Líquido de sabor ácido que utilizamos como aliño en las ensaladas o en otros platos. ", "Vinagre"),
	new Word(22, "X", "Contiene la X:", " Viaje que se realiza con los compañeros del colegio en autobús para visitar un lugar. ", "Excursión"),
	new Word(23, "Y", "Empieza por Y:", " Alimento muy bueno que se hace con leche, es blanco, pero a veces se le añaden sabores de frutas y azúcar.", "Yogur"),
	new Word(24, "Z", "Empieza por Z:", " Planta que tiene una raíz comestible alargada de color anaranjado, y que les gusta mucho a los conejos. .", "Zanahoria")
];



//Mostrar la pregunta y la pista 
function showDefinition(pos) {
	$("#js--hint").html(words[pos].hint);
	$("#js--definition").html(words[pos].definition);
}


// Función para comprobar la respuesta
function checkAnswer(pos) {
	var userAnswer = $("#js--user-answer").val().toLowerCase();
	if (userAnswer == words[pos].word.toLowerCase()) {
	  words[pos].correct = true;
	  $(".circle .item").eq(words[pos].idNumber).addClass("item--success");
	  alert("¡Respuesta correcta!");
	} else {
	  words[pos].correct = false;
	  $(".circle .item").eq(words[pos].idNumber).addClass("item--failure");
	  alert("Respuesta incorrecta. La respuesta correcta era: " + words[pos].word);
	}
	remainingWords--;
	$("#js--score").html(remainingWords);
  
	return count++;
  }
  //La palabra se guarda al final de la lista para luego volver a aparecer
function pasapalabra(pos) {
	var w = words.splice(pos, 1)[0];
	words.push(w);

}
  // Continuar jugando después de comprobar la respuesta
  function continuePlaying() {
	if (count != 25) {
	  $("#js--user-answer").val("");
	  showDefinition(count);
	} else {
	  endGame();
	}
  }
  
var seconds;
var temp;

//Contador
function countdown() {
	seconds = $("#js--timer").html();
	seconds = parseInt(seconds, 10);
	if (seconds == 1) {
		temp = $("#js--timer");
		temp.innerHTML = 0;
		endGame();
		return;
	}
	seconds--;
	temp = $("#js--timer");
	temp.html(seconds);
	timeoutMyOswego = setTimeout(countdown, 1000);
	
}

// Verificar la respuesta y continuar el juego 
$("#js--send").click(function() {
	checkAnswer(count);
	continuePlaying();
});
//Función para el fin del juego 
function endGame() {
	$("#js--question-controls").addClass("hidden");
	$("#js--pa-controls").removeClass("hidden");
	$("#js--end-title").html("Fin de partida!");
	$("#js--end-subtitle").html(showUserScore());
	$("#js--close").addClass("hidden")
}

//Mostrar la puntuación
function showUserScore() {
	var counter = 0;
	for (i = 0; i < words.length; i++) {
		if (words[i].correct == true) {
			counter++;
		}
	}
	return "Has conseguido un total de " + counter + " aciertos.";
}

function Word(idNumber, letter, hint, definition, word, correct) {
	this.idNumber = idNumber;
	this.letter = letter;
	this.hint = hint;
	this.definition = definition;
	this.word = word;
	this.correct = null;
}
// Juego reiniciado 
var count = 0;
$("#js--new-game").click(function() {
	$("#js--ng-controls").addClass("hidden");
	$("#js--question-controls").removeClass("hidden");
	$("#js--close").removeClass("hidden");
	showDefinition(count);
	countdown();
});



// Uso de la letra enter
$("#js--question-controls").keypress(function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == "13") {
		checkAnswer(count);
		continuePlaying();
	}
});

// Función pasapalabra
$("#js--pasapalabra").click(function() {
	pasapalabra(count);
	continuePlaying();
});

// Recargar la página 
$("#js--pa").click(function() {
	location.reload()
});

// End the game
$("#js--close").click(function() {
	endGame();
});
