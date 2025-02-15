import stocksData from "./data/stock_data.js";

const list = document.querySelector('.stocks-list');

function buy(id) {
    const stockObject = stocksData[id - 1];
}

function sell(id) {
    console.log(`Sold stock with ID: ${id}`);
}

let html = '';
stocksData.forEach((value) => {
    html += `
    <li class="stock-object">
        <img class="stock-img" src="${value.imgLink}">
        <div class="stock-details">
            <p class="stock-title">${value.name}</p>
            <p>Price: \$${value.price}</p>
            <p>Status: ${value.trend}</p>
        </div>
        <div class="m">
        <button class="buy-btn" data-id="${value.id}">Buy</button>
        <button class="sell-btn" data-id="${value.id}">Sell</button>
        </div>
    </li>
    `;
});

list.innerHTML = html;

// Attach event listeners to the buttons
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
