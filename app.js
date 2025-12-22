const BASE_URL = 
    "https://api.frankfurter.app/latest?amount=1&from=USD&to=INR";

    const dropdown = document.querySelectorAll(".dropdown select");
    const btn = document.querySelector("form button");
    const fromCurr = document.querySelector(".from select");
    const toCurr = document.querySelector(".to select");
    const msg = document.querySelector(".msg");

// console.log(code,countryList[code]); //print country code and currency code

for (let select of dropdown) {
    for (currcode in countryList) {
       let newoption = document.createElement("option");
       newoption.innerText = currcode;
       newoption.value = currcode;
       if(select.name === "from" && currcode === "USD"){
        newoption.selected = "selected";
       } else  if(select.name === "to" && currcode === "INR"){
        newoption.selected = "selected";
       }
       select.append(newoption); 
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input ");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1 ) {
        amtVal = 1;
        amount.value = "1";
    }

    //  console.log(fromCurr.value, toCurr.value);
    // const URL = `https://api.frankfurter.app/latest?amount=1& ${fromCurr.value.toLowerCase()}=USD&${toCurr.value.toLowerCase}=INR`;
    const URL = `https://api.frankfurter.app/latest?amount=${amtVal}&from=${fromCurr.value.toLowerCase()}&to=${toCurr.value.toLowerCase()}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates;
    let f_rate = rate[toCurr.value];
    console.log(f_rate);


    msg.innerText = `${amtVal} ${fromCurr.value} = ${f_rate} ${toCurr.value}`;

});
