// Global cart array to store cart items
let cart = [];

// Fetch and display products from JSON Server
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
            setupSearch(data); // attach search listener with the fetched data
        });
});

// Function to display products on the page
function displayProducts(products) {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Attach search input listener
function setupSearch(products) {
    const searchBar = document.getElementById("searchBar");

    searchBar.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });
}

// Add item to the shopping cart
function addToCart(productId) {
    fetch(`http://localhost:3000/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            cart.push(product);
            alert(`${product.name} added to the cart!`);
            viewCart(); // Refresh cart view
        });
}

// Display the cart items and total price
function viewCart() {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = "";

    cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartList.appendChild(cartItem);
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("totalPrice").textContent = `Total: $${total}`;
}

// Remove item from cart by ID
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    viewCart();
}

// Checkout functionality
document.getElementById("checkoutButton").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Thank you for your purchase!");
    cart = [];
    viewCart();
});
