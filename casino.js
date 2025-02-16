let data = JSON.parse(localStorage.getItem("data")) || { money: 100, stocks: [] };

const moneyHolder = document.querySelector('.money-text');
const bidHTML = document.querySelector('.bid');
const roll = document.querySelector('.roll');

let bidAmount = 0;
let cash = data.money;

renderBid();

function spin()
{
    if (bidAmount <= 0)
    {
        return;
    }
    const num = Math.floor(Math.random() * 10) + 1;

    const fakeNum1 = Math.floor(Math.random() * 10);
    const fakeNum2 = Math.floor(Math.random() * 10);
    const fakeNum3 = Math.floor(Math.random() * 10);

    if (num === 10 || fakeNum1 === fakeNum2 && fakeNum2 === fakeNum3)
    {
        roll.innerHTML = "6 6 6";
        cash += bidAmount * 2;
        bidAmount = 0;
    }
    else
    {
        roll.innerHTML = `${fakeNum1} ${fakeNum2} ${fakeNum3}`;
        bidAmount = 0;
    }

    data.money = cash;

    Save();
    renderBid();
}

function renderBid() {
    bidHTML.innerHTML = `<p>Bid: \$${bidAmount}</p>`;
    moneyHolder.innerHTML = `Money: \$${cash}`;
}

function bid(amount) {
    let originalMoney = data.money; 

    if (amount == 1)
    {
        bidAmount += originalMoney;
        cash -= originalMoney;
    }
    else if (amount == -1)
    {
        cash = bidAmount;
        bidAmount = 0;
    }
    if (amount > 0) { 
        if (amount > cash) amount = cash;
        bidAmount += amount;
        cash -= amount;
    } 
    else if (amount < 0) { 
        // Bidding out (taking money back)
        if (-amount > bidAmount) amount = -bidAmount;
        bidAmount += amount;
        cash -= amount;
    }

    data.money = cash; 
    Save();
    renderBid();
}

function Save() {
    localStorage.setItem('data', JSON.stringify({ money: data.money, stocks: data.stocks }));
}
