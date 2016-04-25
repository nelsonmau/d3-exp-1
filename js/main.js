// La funzione qui definita viene eseguita solo una volta che l'intera pagina è stata caricata nel browser
$(function() {
  // La funzione qui definita viene eseguita ciclicamente con un intervallo di un secondo (1000 ms) tra un'esecuzione e l'altra.
  setInterval(function() {
    // Definizione di alcune variabili
    var maxNumData = 10, // Numero massimo di elementi nell'array
        numData = Math.round(Math.random()*maxNumData), // Numero di elementi nel prossimo array (un numero intero casuale tra 0 e maxNumData)
        data = d3.range(numData).map(function(d) { return { "a": Math.random(), "b": Math.random() }; }); // I dati veri e propri con a e b numeri casuali tra 0 e 1
    // L'array contenente i dati viene trasformato in una stringa indentata e inserito nell'elemento con id = "grid" (sostituendo il contenuto precedente)
    // $("#grid").html('<pre>'+JSON.stringify(data,null,'\t')+'</pre>');
        
    // I dati originali (a e b) sono numeri tra 0 e 1, non adatti alle dimensioni tipiche di raggi e colori.
    // Per questo bisogna usare le funzioni di scala messe a disposizione da d3: lineare per i raggi (si passa dal dominio 0-1 al range 0-mezza larghezza del contenitore),
    // ordinale per i colori (si passa dal dominio continuo 0-1 al dominio discreto "palette di colori").
    var radius = d3.scale.linear().domain([0,1]), // In questa fase il range non è noto, bisogna aspettare di aver creato i contenitori dei cerchi e calcolarne la larghezza.
        color = d3.scale.category20().domain([0,1]);
    
    // D3 permette di associare la sequenza di dati a una sequenza di elementi della pagina (per posizione), in questo caso tag div con classe item
    var items = d3.select("#grid").selectAll("div.item").data(data);
 
    /*** Fase di creazione ***/
    // Il metodo enter() permette di definire la creazione di nuovi elementi (associati ai nuovi dati in ingresso)
    items.enter()
      // Creazione di un div
      .append("div")
      // Le classi associate al nuovo div: quelle col-* sono tipiche di bootstrap
      .attr("class", "item col-xs-12 col-sm-3 col-md-2 col-lg-1")
      // Il contenuto di ogni nuovo div è un grafico in svg
      .append("svg")
      // Non conoscendo a priori le dimensioni del contenitore dell'svg, ne calcoliamo la larghezza con jQuery,
      // in modo che il cerchio possa al massimo riempirlo interamente.
      .attr("width", function() {
          return $(this).parent().width();
      })
      .attr("height", function() {
          return $(this).parent().width();
      })
      // Un ulteriore elemento g (gruppo)
      .append("g")
      // Che viene traslato in modo che il suo spigolo in alto a sinistra sia al centro del contenitore
      .attr("transform", function() {
          var w = $(this).parent().width();
          return "translate("+w/2+","+w/2+")";
      })
      // Creazione del cerchio che avrà il centro sullo spigolo in alto a sinistra del suo contenitore (g) e quindi al centro dell'svg.
      .append("circle")
      // Raggio del cerchio proporzionale ai dati
      .attr("r", function(d) {
          // Definiamo il range della scala come metà larghezza dell'svg
          var r = radius.range([0,$(this).parents('svg').width()/2]);
          // Applichiamo la scala ai dati
          return r(d.a);
      })
      .attr("fill", function(d) {
          // Applichiamo la scala cromatica ai dati, da un numero tra 0 e 1 ritorna un colore
          return color(d.b);
      });
 
    /*** Fase di aggiornamento ***/
    // Tutti i metodi che si riferiscono direttamente a items agiscono sugli elementi già esistenti che hanno ancora dati associati
    items.select("circle")
      // Aggiorniamo il raggio del cerchio, ma non il colore, fissato una volta per tutte all'inizio
      .attr("r", function(d) {
          var r = radius.range([0,$(this).parents('svg').width()/2]);
          return r(d.a);
      });
    
    /*** Fase di distruzione ***/
    // Il metodo exit() permette di definire la distruzione di vecchi elementi non più associati ad alcun dato
    items.exit().remove();
 
  },1000);
});