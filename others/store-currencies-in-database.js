```const apiURL = `https://free.currencyconverterapi.com/api/v5/countries`;   
let countriesCurrencies;
const dbPromise = idb.open('countries-currencies', 0, upgradeDB => {
  // Note: we don't use 'break' in this switch statement,
  // the fall-through behaviour is what we want.
  switch (upgradeDB.oldVersion) {
    case 0:
      upgradeDB.createObjectStore('objs', {keyPath: 'id'});
  }
});
fetch(apiURL)
  .then(function(response) {
  return response.json();
})
  .then(function(currencies) {
  dbPromise.then(db => {
    if(!db) return;
    countriesCurrencies = [currencies.results];
    const tx = db.transaction('objs', 'readwrite');
    const store = tx.objectStore('objs');
    let i = 0;
    countriesCurrencies.forEach(function(currency) {
      for (let value in currency) {
        store.put(currency[value]);
      }
    });
    return tx.complete;
  });
});```

Then you can retrieve the stored data using `getAll()` and add it to the DOM.

Message Input

Message #mobile-web-specialist