import stocksData from "./data/stock_data.js";

const list = document.querySelector('.stocks-list');
let data = JSON.parse(localStorage.getItem("data")) || { money: 1000, stocks: [] };

function getStocksFromid(id) {
    const stock = data.stocks.find(stock => stock.id === id);
    return stock ? stock.amount : 0;
}

function buy(id) {
    id = parseInt(id, 10);
    const stockObject = stocksData.find(stock => stock.id === id);
    
    if (!stockObject) return;

    const price = stockObject.price;
    if (data.money >= price) {
        let stock = data.stocks.find(stock => stock.id === id);
        
        if (stock) {
            stock.amount += 1;
        } else {
            data.stocks.push({ id, amount: 1 });
        }

        data.money -= price;

        localStorage.setItem("data", JSON.stringify(data));

        renderStocks();
    }
}

function sell(id) {
    id = parseInt(id, 10);
    let stock = data.stocks.find(stock => stock.id === id);

    if (stock && stock.amount > 0) {
        stock.amount -= 1;
        data.money += stocksData.find(stock => stock.id === id).price;

        if (stock.amount === 0) {
            data.stocks = data.stocks.filter(stock => stock.id !== id);
        }

        localStorage.setItem("data", JSON.stringify(data));

        renderStocks();
    }
}

function renderStocks() {
    let html = '';
    stocksData.forEach((value) => {
        html += `
        <li class="stock-object">
            <img class="stock-img" src="${value.imgLink}">
            <div class="stock-details">
                <p class="stock-title">${value.name}</p>
                <p>Price: \$${value.price}</p>
                <p>Status: ${value.trend}</p>
                <p>Stocks Owned: ${getStocksFromid(value.id)}</p>
            </div>
            <div class="m">
            <button class="buy-btn" data-id="${value.id}">Buy</button>
            <button class="sell-btn" data-id="${value.id}">Sell</button>
            </div>
        </li>
        `;
    });

    list.innerHTML = html;

    // Attach event listeners to the buttons again
    document.querySelectorAll(".buy-btn").forEach(button => {
        button.addEventListener("click", () => {
            const stockId = button.getAttribute("data-id");
            buy(stockId);
        });
    });

    document.querySelectorAll(".sell-btn").forEach(button => {
        button.addEventListener("click", () => {
            const stockId = button.getAttribute("data-id");
            sell(stockId);
        });
    });
}

// Initial rendering of stocks
renderStocks();
