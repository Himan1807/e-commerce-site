let cart = [];
let allProducts = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('/products')
        .then(res => res.json())
        .then(data => {
            allProducts = data;
            displayProducts(data); // render product cards after data arrives
        });

    document.getElementById("checkoutButton").addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        alert("Thank you for your purchase!");
        cart = [];
        viewCart();
    });

    document.getElementById("searchBar").addEventListener("input", (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allProducts.filter(p =>
            p.name.toLowerCase().includes(term)
        );
        displayProducts(filtered);
    });
});

function displayProducts(products) {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach(product => {
        console.log("Rendering product with ID:", product.id); // move inside forEach

        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(div);
    });

    // Add event listeners AFTER rendering
    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.getAttribute("data-id"));
            addToCart(id);
        });
    });
}


function addToCart(productId) {
    console.log("Trying to add product ID:", productId);
    console.log("Available products:", allProducts);

    const product = allProducts.find(p => Number(p.id) === Number(productId)); // if you don't do this, you would get 'Product not found' error upon clicking on the 'add to cart' button
    if (!product) {
        alert("Product not found!");
        return;
    }
    cart.push(product);
    alert(`${product.name} added to the cart!`);
    viewCart();
}

function viewCart() {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = "";

    cart.forEach(item => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: ₹${item.price}</p>
            <button class="remove-item" data-id="${item.id}">
            <span class="material-icons">delete</span>
            </button>
        `;
        cartList.appendChild(div);
    });

    // Attach remove handlers
    document.querySelectorAll(".remove-item").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.getAttribute("data-id"));
            removeFromCart(id);
        });
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("totalPrice").textContent = `Total: ₹${total}`;
}

function removeFromCart(productId) {
    cart = cart.filter(item => Number(item.id) !== Number(productId));
    viewCart();
}