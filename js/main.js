// La funzione qui definita viene eseguita solo una volta che l'intera pagina è stata caricata nel browser
$(function() {
  // La funzione qui definita viene eseguita ciclicamente con un intervallo di un secondo (1000 ms) tra un'esecuzione e l'altra.
  setInterval(function() {
    // Definizione di alcune variabili
    var maxNumData = 100, // Numero massimo di elementi nell'array
        numData = Math.round(Math.random()*maxNumData), // Numero di elementi nel prossimo array (un numero intero casuale tra 0 e maxNumData)
        data = d3.range(numData).map(function(d) { return { "a": Math.random(), "b": Math.random() }; }); // I dati veri e propri con a e b numeri casuali tra 0 e 1
    // L'array contenente i dati viene trasformato in una stringa indentata e inserito nell'elemento con id = "grid" (sostituendo il contenuto precedente)
    $("#grid").html('<pre>'+JSON.stringify(data,null,'\t')+'</pre>');
  }, 1000); // Attesa di 1 secondo (1000 ms) tra un'esecuzione e l'altra
});

