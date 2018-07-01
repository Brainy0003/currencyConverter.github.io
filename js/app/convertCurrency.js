
// Function to do the currencies conversion from one currency 


function convertCurrency(){
  let from            =   document.getElementById("currencies_1").value;
  let to              =   document.getElementById("currencies_2").value;
  console.log(from, to);
  // let fromAmount   =   document.getElementById("fromAmount").value;
  let toAmount        =   document.getElementById("toAmount");
  from = encodeURIComponent(from);
  to   = encodeURIComponent(to);
  const query = from + '_' + to ;
  let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;
  fetch(url).then(function(response){
    return response.json().then(function(results){
      let initialConversion = results[query];
      let userInput = document.getElementById("fromAmount").value;
      let total = initialConversion * userInput ;
      let finalConversion = Math.round(total * 100) / 100;
      console.log(finalConversion);
      toAmount.innerHTML = userInput + ' ' + from + ' ' + '   = ' + '<b>' + finalConversion.toFixed(2) + '</b>' + '  ' + to;
    })
  })
}

