let data = JSON.parse(localStorage.getItem("data")) || { money: 100, stocks: [] };

const moneyHolder = document.querySelector('.money-text');
const bidHTML = document.querySelector('.bid');
const roll = document.querySelector('.roll');
const blackjackContainer = document.querySelector('.blackjack-container');

let bidAmount = 0;
let cash = data.money;
let standCount = 0;

let isPlaying = false;

let playerAmount = 0;
let dealerAmount = 0;

renderBid();

function renderBlackjack(numType)
{
    if (numType && numType === 5)
    {
        blackjackContainer.innerHTML = 
        `
        <p class="win-status">Play Now!</p>
        <button class="btn" onclick="play()" style="font-size: 26px; font-weight: bold;">Play</button>
        `;
    }
    else
    {
        blackjackContainer.innerHTML =
        `
        <p>You: ${playerAmount}</p>
        <p>Dealer: ${dealerAmount}</p>
        <button onclick="hit()" class="btn" style="width: 80px;">Hit</button>
        <button onclick="stand()" class="btn" style="width: 80px;">Stand</button>
        `;
    }
}

function getWin()
{
    if (playerAmount > 21 && dealerAmount <= 21)
    {
        // Lose
        return 0;
    }
    else if (dealerAmount > 21 && playerAmount <= 21)
    {
        // Win
        return 1;
    }
    else
    {
        if (playerAmount == dealerAmount && playerAmount == 21)
        {
            // Tie
            return 2;
        }
        else if (playerAmount == 21)
        {
            // Win
            return 1;
        }
        else if (dealerAmount == 21)
        {
            // Lose
            return 0;
        }
        else if (playerAmount > 21 && dealerAmount > 21)
        {
            // Lose
            return 0;
        }
    }

    return 10;
}

function hit()
{
    let winStatus = 0;
    playerAmount += Math.floor(Math.random() * 10) + 1;
    if (dealerAmount < 17)
    {
        dealerAmount += Math.floor(Math.random() * 10) + 1;
    }

    let result = getWin();
    if (result != 10)
    {
        playerAmount = 0;
        dealerAmount = 0;

        if (result == 0)
        {
            console.log('Lose');
        }
        else if (result == 1)
        {
            console.log('win');
            cash += bidAmount * 2;
            winStatus = 1;
        }
        else if (result == 2)
        {
            console.log('tie');
            cash += bidAmount;
            winStatus = 2;
        }

        renderBlackjack(5);
        isPlaying = false;

        if (winStatus === 1)
        {
            const status = document.querySelector('.win-status');
            status.innerHTML = "You Win!"
        }
        else if (winStatus === 2)
        {
            const status = document.querySelector('.win-status');
            status.innerHTML = "Tie!";
        }
        else if (winStatus === 0)
        {
            const status = document.querySelector('.win-status');
            status.innerHTML = "You Lose!";
        }

        bidAmount = 0;

        data.money = cash;
        Save();
        renderBid();
    }
    else
    {
        renderBlackjack();
    }

    standCount = 0;
}

function stand()
{
    let winStatus = 0;
    if (dealerAmount < 17)
    {
        dealerAmount += Math.floor(Math.random() * 10) + 1;


        
        let result = 0;
        if (dealerAmount === 21 && playerAmount !== 21)
        {
            result = 0;
        }
        else if (dealerAmount >= 21 && playerAmount <= 21)
        {
            result = 1;
        }
        else if (dealerAmount === 17 && playerAmount > dealerAmount && playerAmount <= 21)
        {
            result = 0;
        }
        else {
            result = 10;
        }



        if (result != 10)
        {
            playerAmount = 0;
            dealerAmount = 0;

            if (result == 0)
            {
                console.log('Lose');
            }
            else if (result == 1)
            {
                console.log('win');
                cash += bidAmount * 2;
                winStatus = 1;
            }
            else if (result == 2)
            {
                console.log('tie');
                cash += bidAmount;
                winStatus = 2;
            }

            renderBlackjack(5);
            isPlaying = false;

            if (winStatus === 1)
            {
                const status = document.querySelector('.win-status');
                status.innerHTML = "You Win!"
            }
            else if (winStatus === 2)
            {
                const status = document.querySelector('.win-status');
                status.innerHTML = "Tie Stand!";
            }
            else if (winStatus === 0)
            {
                const status = document.querySelector('.win-status');
                status.innerHTML = "You Lose!";
            }

            bidAmount = 0;

            data.money = cash;
            Save();
            renderBid();
        }
    }
    renderBlackjack();
    standCount++;

    if (standCount >= 2)
    {
        // If dealer greater than player, player loses. Else, player wins.
        if (dealerAmount > playerAmount && playerAmount !== 21)
        {
            // Lose
            console.log('Lose');
            winStatus = 0;
        }
        else if (playerAmount > dealerAmount && playerAmount <= 21)
        {
            // Win
            console.log('Win');
            cash += bidAmount * 2;
            winStatus = 1;
        }
        else 
        {
            if (playerAmount === dealerAmount)
            {
            // Tie
            console.log('Tie');
            cash += bidAmount;
            winStatus = 2;
            }
            else
            {
                // Lose
                console.log('Lose');
                winStatus = 0;
            }
        }

        bidAmount = 0;
        renderBlackjack(5);
        isPlaying = false;

        if (winStatus === 1)
        {
            const status = document.querySelector('.win-status');
            status.innerHTML = "You Win!"
        }
        else if (winStatus === 2)
        {
            const status = document.querySelector('.win-status');
            status.innerHTML = "Tie!";
        }
        else if (winStatus === 0)
        {
            const status = document.querySelector('.win-status');
            status.innerHTML = "You Lose!";
        }

        playerAmount = 0;
        dealerAmount = 0;

        data.money = cash;
        Save();
        renderBid();
    }
}

function play()
{
    if (bidAmount <= 0)
    {
        return;
    }
    //bidAmount = 0;
    renderBid();
    renderBlackjack();
    data.money = cash;
    isPlaying = true;
}

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
        cash += bidAmount * 5;
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
    if (isPlaying) return;
    let originalMoney = data.money; 

    if (amount == 1)
    {
        bidAmount += originalMoney;
        cash -= originalMoney;
    }
    else if (amount == -1)
    {
        cash += bidAmount;
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
