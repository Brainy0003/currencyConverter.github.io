// import idb from 'idb';
/*
let dbPromise = idb.open('currency-converter-db', 1, upgradeDb =>{
	let currencyValStore = upgradeDb.createObjectStore('currencyStore');
	currencyValStore.put('hello', 'wolrd');
});

function openDatabase(){
	// If the browser doesn't support service worker
	// Don't bother about the database.
	if(!navigator.serviceWorker){
		return Promise.resolve();
	}
	// Return a promise for a database called "currency-converter"
	// That will contain an objectStore: 'currencyConverter'
	// that uses 'id' as its key
	// and has an index called 'by-abbr', which is sorted by the 'id' property.(maybe i dont need this since
	// I already have id as the key)
	return idb.open('currency-converter', 1, upgradeDb =>{
		var store = upgradeDb.createObjectStore('currencyConverter', {
			keyPath:'id'
		});		
		// store.createIndex('by-abbr', 'id');
	});
}
*/

let countriesCurrencies;
const dbPromise = idb.open('countries-currencies', 1, upgradeDB => {
  // Note: we don't use 'break' in this switch statement,
  // the fall-through behaviour is what we want.
  switch (upgradeDB.oldVersion) {
    case 0:
      upgradeDB.createObjectStore('currency', {keyPath: 'id'});
  }
});

fetch('https://free.currencyconverterapi.com/api/v5/currencies')
  .then(function(response) {
  return response.json();
})
  .then(function(currencies) {
  dbPromise.then(db => {
    if(!db) return;
    countriesCurrencies = [currencies.results];
    const tx = db.transaction('currency', 'readwrite');
    const store = tx.objectStore('currency');
    let i = 0;
    countriesCurrencies.forEach(function(currency) {
      for (let value in currency) {
        store.put(currency[value]);
      }
    });
    return tx.complete;
  });
});



 