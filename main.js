const moneyText = document.querySelector("#money-text");

const defaultData = {
    money: 100,
    stocks: [], // Each object is gonna have id and amount.
}

let totalStocks = 0;
let money = 0;

console.log(localStorage.getItem("data"))

if (localStorage.getItem("data"))
{   
    data = JSON.parse(localStorage.getItem("data"))
    money = data.money;
    let stocks = data.stocks;

    stocks.forEach((value) => {
        totalStocks += value.amount
    })
}
else 
{
    money = defaultData.money;
    totalStocks = 0;
    localStorage.setItem("data", JSON.stringify(defaultData))
}
moneyText.innerHTML = `Money: \$${money}`;

const stocksText = document.querySelector("#stocks-text");
stocksText.innerHTML = `Stocks: ${totalStocks}`;