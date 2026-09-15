let cart = [];

// Add item to cart
function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
    showCartModal();
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Update Cart Count & Total
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartCount.innerText = cart.length;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-msg">Twój koszyk jest pusty.</p>';
        cartTotal.innerText = '0.00 zł';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.price.toFixed(2)} zł</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">Usuń</button>
        `;
        cartItems.appendChild(itemEl);
    });
    
    cartTotal.innerText = `${total.toFixed(2)} zł`;
}

// Modal handling
const cartModal = document.getElementById('cartModal');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');

function showCartModal() {
    cartModal.classList.add('active');
}

cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
});

// Checkout Action
function checkout() {
    if (cart.length === 0) {
        alert('Twój koszyk jest pusty!');
        return;
    }
    alert('Dziękujemy za złożenie zamówienia! (Demonstracja sklepu STICKERLAB)');
    cart = [];
    updateCartUI();
    cartModal.classList.remove('active');
}

// Custom Order Form Submit
function handleCustomSubmit(e) {
    e.preventDefault();
    const text = document.getElementById('customText').value;
    const size = document.getElementById('customSize').value;
    const color = document.getElementById('customColor').value;
    
    alert(`Dziękujemy! Przyjęto zapytanie o naklejkę:

Tekst: ${text}
Szerokość: ${size}cm
Kolor: ${color}

Skontaktujemy się z wyceną w ciągu 2 godzin!`);
    document.getElementById('customStickerForm').reset();
}

// Product Filtering
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        document.querySelectorAll('.product-card').forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
