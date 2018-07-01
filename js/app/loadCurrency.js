
// Function to load currencies into the select element tag by creating the tag element and assigning value to the option tag
function loadCurrency(){
  const select_1 = document.getElementById('currencies_1');
  const select_2 = document.getElementById('currencies_2');

  const url = 'https://free.currencyconverterapi.com/api/v5/currencies';

  fetch(url).then((resp) => resp.json()) // Transform the data into json
     .then(data => {
         let currencies = data.results;
         for (currency in currencies){ //Loop through the result
            //console.log(currency);
            // Trying to sort objects key value pairs
            /*let curr_arr = [];
            curr_arr.push(currency);
            curr_arr.sort((a, b) =>{
              return a.val.localeCompare( b.val );
            });
            console.log(curr_arr);
            /*if(currencies.hasOwnProperty(currency)){
              curr_arr.push(currencies[currency]);
              console.log(curr_arr.sort());
            }*/
            let option        = document.createElement('option');
            option.value      = `${currencies[currency].id}`; //`${currencies[curr_arr].id}`; 
            option.innerText  = `${currencies[currency].currencyName}(${currencies[currency].currencySymbol})`; 
            //`${currencies[curr_arr].currencyName} (${currencies[curr_arr].currencySymbol})`;
            // select_1.innerHTML += `<option>${currency}</option>`;
            // select_2.innerHTML += `<option>${currency}</option>`;
            select_1.appendChild(option);
            select_2.appendChild(option.cloneNode(true));
         }
     }).catch(err =>{
      console.log(JSON.stringify(err));
  });
}
