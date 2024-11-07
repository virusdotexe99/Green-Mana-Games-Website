// Initialize the cart from localStorage or start with an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add an item to the cart
function addToCart(item) {
    // Check if the item is already in the cart
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
        // Increase quantity if the item already exists
        existingItem.quantity += 1;
    } else {
        // Add new item to the cart with a quantity of 1
        cart.push({ ...item, quantity: 1 });
    }

    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
}

// Function to display cart items in cart.html
function displayCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    cartItemsContainer.innerHTML = ""; // Clear current items

    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        // Create cart item HTML
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price}</p>
                    <div class="quantity-control">
                        <button onclick="changeQuantity(${index}, -1)" class="normal">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${index}, 1)" class="normal">+</button>
                    </div>
                    <button id="remove-button" onclick="removeItem(${index})" class="normal">Remove</button>
                </div>
                <p class="item-total">$${itemTotal.toFixed(2)}</p>
            </div>
        `;
    });

    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to change the quantity of an item
function changeQuantity(index, change) {
    cart[index].quantity += change;

    // Remove item if quantity is 0 or less
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
}

// Function to remove an item from the cart
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
}

// Checkout function (placeholder)
function checkout() {
    alert("Proceeding to checkout!");
    // Implement checkout logic here
}

// Initialize cart display on cart.html page
if (window.location.pathname.endsWith("cart.html")) {
    displayCartItems();
}

// Function to clear the cart
function clearCart() {
    cart = []; // Reset the cart array
    localStorage.removeItem("cart"); // Remove cart data from localStorage
    displayCartItems(); // Update the cart display
    alert("Cart has been cleared!");
}

// Display the cart items on cart.html page load
if (window.location.pathname.endsWith("cart.html")) {
    displayCartItems();
}

