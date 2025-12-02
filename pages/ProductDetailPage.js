import { formatCurrency } from '../main.js';


export const ProductDetailPage = ({ Breadcrumbs, state }) => {
    const product = state.products.find(p => p.id === state.currentProductId);

    if (!product) {
        navigate('home');
        return '';
    }

    const isLowStock = product.stock < 10;
    const stockStatus = product.stock > 0 ? 'In Stock' : 'Out of Stock';
    const stockColor = product.stock > 0 ? 'var(--success)' : 'var(--danger)';

    // Get 4 random related products (excluding current)
    const relatedProducts = state.products
        .filter(p => p.id !== product.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

    return `
        <div class="product-detail-container">
            <div class="breadcrumbs">
                <a href="#" onclick="window.navigate('home'); return false;">Home</a> &gt; 
                <a href="#" onclick="window.navigate('products'); return false;">Products</a> &gt; 
                <span>${product.name}</span>
            </div>

            <div class="product-main">
                <div class="product-gallery">
                    <img src="${product.image}" alt="${product.name}">
                </div>

                <div class="product-details-info">
                    <div class="product-sku">SKU: LUM-${product.id.toString().padStart(4, '0')}</div>
                    <h1 class="detail-title">${product.name}</h1>
                    <div class="detail-price">${formatCurrency(product.price)}</div>

                    <div class="detail-section">
                        <span class="detail-label">Description</span>
                        <p style="color: var(--text-muted); line-height: 1.6;">${product.description}</p>
                    </div>

                    <div class="detail-section">
                        <span class="detail-label">Quantity</span>
                        <div class="quantity-selector">
                            <button class="qty-btn" onclick="window.adjustDetailQty(-1)">-</button>
                            <input type="number" id="detailQty" class="qty-input" value="1" min="1" max="${product.stock}" readonly>
                            <button class="qty-btn" onclick="window.adjustDetailQty(1)">+</button>
                        </div>
                    </div>

                    <button class="btn-add-large" onclick="window.addToCartFromDetail(${product.id})">
                        Add To Cart
                    </button>

                    <div class="stock-status" style="color: ${stockColor}">
                        <span class="stock-dot" style="background-color: ${stockColor}"></span>
                        ${stockStatus} (${product.stock} available)
                    </div>
                </div>
            </div>

            <div class="related-products">
                <h3 class="related-title">You may also like</h3>
                <div class="product-grid">
                    ${relatedProducts.map(ProductCard).join('')}
                </div>
            </div>
        </div>
    `;
};

export const ProductCard = (product) => {
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