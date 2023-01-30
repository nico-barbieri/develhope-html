// Esercizio 7, fra i mille modi per scrivere quella funzione in base alle esigenze, un modo "universale" potrebbe essere il delegate:

// Dichiaro tutte le costanti che si riferiscono ad elementi HTML all'inizio.
// È buona norma far cominciare il nome della costante che si riferisce ad 
// un elemento HTML con il simbolo del dollaro ($).
const $plan = document.getElementById("plan");
const $checkout = document.getElementById("checkout");
const $pro = document.getElementById("pro");

// Dichiaro una funzione che mi permette di gestire la logica
// dell'enable/disable in base all'id passato come parametro
const disableCheck = (id = null) => {
  // Se l'id corrisponde al target, procedo
  // Questa sintassi vale solo per il delegate
  if (id === null || (typeof id === "string" && id == "plan")) {
    // Controllo il valore di `free`
    const is_free = $pro.value == 0;
    // Mi creo un'utility interna per gestire il toggle dello stato
    const _toggleEnableStatus = (enable = true) => {
      $pro.disabled = enable;
      $checkout.disabled = enable;
    }
    
    // Alla fine chiamo la mia utility per applicare le 
    // modifiche in base al valore di `is_free`
    _toggleEnableStatus(is_free);
  }
};

/**
 * Di seguito 3 alternative da seguire in base alle tue esigenze.
 * Si solito il Delegate (1*) si usa quando devi manipolare il DOM
 * quindi se per esempio generi o modifichi l'HTML dinamicamente con js.
 * Le strategie non delegate (2* e 3*) si usano se il contenuto del
 * DOM è statico e non hai necessità di manipolarlo in seguito con js.
 */

/******************************** STRATEGIA 1 ********************************/
// Tecnica del delegate, mi permette di gestire i listener
// a prescindere dal caricamento della pagina e dalle future
// manipolazioni degli elementi del DOM. Siccome la sintassi si 
// riferisce al delegate, dobbiamo passare l'id come parametro
document.body.addEventListener("change", ({ target: { id } }) => disableCheck(id));

/******************************** STRATEGIA 2 ********************************/
// V1 -> Listener senza delegate, sono vincolato al mantenimento
// dell'elemento nel DOM caricato dal browser e devo necessariamente
// eseguirlo in `defer` quindi a pagina caricata correttamente.
// Siccome la sintassi non è riferita al delegate possiamo non passare
// alcun parametro alla funzione che avrà l'id già settato a `null`.
$plan.addEventListener("change", disableCheck);

/******************************** STRATEGIA 3 ********************************/
// V2 -> A proposito di caricamento della pagina, in alternativa al `defer`
// puoi utilizzare `windows.onload` per essere sicuro che venga eseguita quando
// il DOM è stato caricato del tutto.
// Siccome la sintassi non è riferita al delegate possiamo non passare
// alcun parametro alla funzione che avrà l'id già settato a `null`.
window.onload = (event) => {
  $plan.addEventListener("change", disableCheck);
};

// Se qualcosa nei commenti non è chiara, dimmelo! 