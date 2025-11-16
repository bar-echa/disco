function saveInput() {
    const productName = document.getElementById('productName').value.trim();
    const productPrice = document.getElementById('productPrice').value.trim();
    const stock = document.getElementById('stock').value.trim();
    const promotion = document.getElementById('promotion').value.trim();
    const action = document.getElementById('action').value;

    let products = JSON.parse(localStorage.getItem('products')) || [];

    if (!productName) {
        alert('Product name is required.');
        return;
    }

    if (action === "add") {
        if (!productPrice || !stock) {
            alert('Please fill in all required fields for adding.');
            return;
        }

        const newProduct = {
            productName,
            productPrice,
            stock,
            promotion,
            action
        };

        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        alert('Product added!');
    }

    else if (action === "delete") {
        const filteredProducts = products.filter(product => product.productName.toLowerCase() !== productName.toLowerCase());

        if (filteredProducts.length === products.length) {
            alert('Product not found. Nothing was deleted.');
            return;
        }

        localStorage.setItem('products', JSON.stringify(filteredProducts));
        alert(`Product "${productName}" deleted!`);
    }

    // You can add update functionality here later if needed

    displayProducts();

    // Clear input fields
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('stock').value = '';
    document.getElementById('promotion').value = '';
}

// Display all products from localStorage
function displayProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const container = document.getElementById('productList');
    container.innerHTML = '';

    if (products.length === 0) {
        container.innerHTML = '<p>No products found.</p>';
        return;
    }

    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-card';
        productDiv.innerHTML = `
            <h3>${product.productName}</h3>
            <p>Price: $${product.productPrice}</p>
            <p>Stock: ${product.stock}</p>
            <p>Promotion: ${product.promotion || 'None'}</p>
            <button onclick="buyProduct(${index})">Buy</button>
        `;
        container.appendChild(productDiv);
    });
  
}
function displayincart() {
    const cart = document.getElementById('cart');
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Clear existing cart display
    cart.innerHTML = '';

    if (products.length === 0) {
        cart.innerHTML = '<p>No products in cart.</p>';
        return;
    }

    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-card';
        productDiv.innerHTML = `
            <h3>${product.productName}</h3>
            <p>Price: $${product.productPrice}</p>
            <p>Stock: ${product.stock}</p>
            <p>Promotion: ${product.promotion || 'None'}</p>
        `;
        cart.appendChild(productDiv);
    });
}







// Handle buying a product by index
function buyProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];

    if (products[index] && parseInt(products[index].stock) > 0) {
        products[index].stock = parseInt(products[index].stock) - 1;
        localStorage.setItem('products', JSON.stringify(products));
        alert('Purchase successful! Stock left: ' + products[index].stock);
        displayProducts();
    } else {
        alert('Product is out of stock or not found.');
    }
}







// Customer info save
function customerview(){
    const name = document.getElementById('customerName').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();

    if (!name || !email || !phone || !address) {
        alert('Please fill all customer details.');
        return;
    }

    localStorage.setItem('customerview', JSON.stringify({name, email, phone, address}));
    alert('Customer information saved!');
}

// Display customer info for admin view
function adminviewcustomer(){
    const customerview = JSON.parse(localStorage.getItem('customerview'));
    document.getElementById('Customername').innerText = customerview ? customerview.name : "No customer information found.";
    document.getElementById('Customeremail').innerText = customerview ? customerview.email : "No customer information found.";
    document.getElementById('Customerphone').innerText = customerview ? customerview.phone : "No customer information found.";
    document.getElementById('Customeraddress').innerText = customerview ? customerview.address : "No customer information found.";
}

// On page load, display products
window.onload = function() {
    displayProducts();
};
function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];

    if (confirm(`Are you sure you want to delete "${products[index].Name}"?`)) {
        products.splice(index, 1); // Remove product at the index
        localStorage.setItem('products', JSON.stringify(products)); // Save updated list
        alert('Product deleted.');
        displayProducts(); // Refresh the product list
    }
}
function displayProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const container = document.getElementById('productList');
    container.innerHTML = '';

    if (products.length === 0) {
        container.innerHTML = '<p>No products found.</p>';
        return;
    }

    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-card';
        productDiv.innerHTML = `
            <h3>${product.productName}</h3>
            <p>Price: $${product.productPrice}</p>
            <p>Stock: ${product.stock}</p>
            <p>Promotion: ${product.promotion || 'None'}</p>
            <button onclick="deleteProduct(${index})" style="background-color:red;color:white;">Delete</button>
        `;
        container.appendChild(productDiv);
    });
}
