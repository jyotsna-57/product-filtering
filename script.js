async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        return products;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const products = await fetchProducts();
    const form = document.getElementById("product-form");
    const resultsDiv = document.getElementById("results");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const category = form.category.value;
        const keyword = form.keyword.value.toLowerCase();
        const budget = parseFloat(form.budget.value);
        const filteredProducts = products.filter(product => {
            const matchesCategory = category === "all" || product.category === category;
            const matchesKeyword = product.title.toLowerCase().includes(keyword);
            const matchesBudget = !budget || product.price <= budget;
            return matchesCategory && matchesKeyword && matchesBudget;
        });
        displayProducts(filteredProducts);
    });

    function displayProducts(products) {
        resultsDiv.innerHTML = "";
        if (products.length === 0) {
            resultsDiv.innerHTML = "<p>No products found.</p>";
            return;
        }
        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.title}" />
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p>Price: ₹${product.price}</p>
            `;
            resultsDiv.appendChild(productDiv);
        });
    }
});
