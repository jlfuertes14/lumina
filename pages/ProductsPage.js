
import { formatCurrency } from './src/utils.js';

export const ProductsPage = ({ Breadcrumbs, state }) => {
    // Apply filtering
    let displayedProducts = [...state.products];

    // Apply search query filter
    if (state.searchQuery) {
        displayedProducts = displayedProducts.filter(product =>
            product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
    }

    // Apply category filter
    if (state.filterCategory) {
        displayedProducts = displayedProducts.filter(p => p.category === state.filterCategory);
    }

    // Apply sorting
    switch (state.sortBy) {
        case 'price-asc':
            displayedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            displayedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            displayedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            displayedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'featured':
        default:
            // Default ID sort or custom logic
            displayedProducts.sort((a, b) => a.id - b.id);
            break;
    }

    return `
        <div style="padding: 2rem 0; max-width: 1200px; margin: 0 auto;">
            <!-- ... Breadcrumbs ... -->
            
            <!-- NEW FILTER BAR -->
            <div class="filter-bar">
                <div style="flex: 1; display: flex; gap: 1rem; align-items: center;">
                    <span style="font-weight: 600;">Filter By:</span>
                    <select class="filter-select" onchange="window.handleCategoryFilter(this.value)">
                        <option value="">All Categories</option>
                        <option value="Components" ${state.filterCategory === 'Components' ? 'selected' : ''}>Components</option>
                        <option value="Sensors" ${state.filterCategory === 'Sensors' ? 'selected' : ''}>Sensors</option>
                        <option value="Boards" ${state.filterCategory === 'Boards' ? 'selected' : ''}>Boards</option>
                    </select>
                </div>
                <div class="sort-container">
                    <span class="sort-label">Sort by:</span>
                    <select class="sort-select" onchange="window.handleSort(this.value)">
                        <option value="featured" ${state.sortBy === 'featured' ? 'selected' : ''}>Featured</option>
                        <option value="price-asc" ${state.sortBy === 'price-asc' ? 'selected' : ''}>Price: Low to High</option>
                        <option value="price-desc" ${state.sortBy === 'price-desc' ? 'selected' : ''}>Price: High to Low</option>
                    </select>
                </div>
            </div>
            <!-- ... Product Grid ... -->
             <div class="product-grid">
                ${displayedProducts.map(ProductCard).join('')}
            </div>
        </div>
    `;
};
const ProductCard = (product) => {
    const isLowStock = product.stock < 10;
    const badgeClass = isLowStock ? 'low-stock' : '';
    const badgeText = isLowStock ? 'Low Stock' : 'In Stock';

    return `
        <div class="product-card" onclick="window.viewProduct(${product.id})" style="cursor: pointer;">
            <div class="product-badge ${badgeClass}">${badgeText}</div>
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" />
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${formatCurrency(product.price)}</div>
                <button class="add-btn" onclick="event.stopPropagation(); window.addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
};