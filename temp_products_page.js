const ProductsPage = () => {
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

    // Apply price filter
    if (state.filterPriceRange) {
        displayedProducts = displayedProducts.filter(p =>
            p.price >= state.filterPriceRange.min && p.price <= state.filterPriceRange.max
        );
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
            displayedProducts.sort((a, b) => a.id - b.id);
            break;
    }

    // Get unique categories
    const categories = [...new Set(state.products.map(p => p.category))];

    return `
        <div style="padding: 2rem 0; max-width: 1200px; margin: 0 auto; position: relative;">
            
            <!-- Filter Sidebar -->
            <div class="filter-sidebar ${state.showFilters ? 'open' : ''}">
                <div class="filter-header">
                    <h3>Filters</h3>
                    <button class="close-filter" onclick="state.showFilters = false; render();">×</button>
                </div>
                
                <div class="filter-group">
                    <h4>Categories</h4>
                    <div class="category-list">
                        <label class="category-item">
                            <input type="radio" name="category" value="" ${state.filterCategory === null ? 'checked' : ''} onchange="state.filterCategory = null; render();">
                            All Categories
                        </label>
                        ${categories.map(cat => `
                            <label class="category-item">
                                <input type="radio" name="category" value="${cat}" ${state.filterCategory === cat ? 'checked' : ''} onchange="state.filterCategory = '${cat}'; render();">
                                ${cat}
                            </label>
                        `).join('')}
                    </div>
                </div>

                <div class="filter-group">
                    <h4>Price Range</h4>
                    <div class="price-inputs">
                        <input type="number" placeholder="Min" value="${state.filterPriceRange.min}" onchange="state.filterPriceRange.min = Number(this.value); render();">
                        <span>-</span>
                        <input type="number" placeholder="Max" value="${state.filterPriceRange.max}" onchange="state.filterPriceRange.max = Number(this.value); render();">
                    </div>
                </div>
                
                <div class="filter-actions">
                    <button class="btn btn-primary" style="width: 100%" onclick="state.showFilters = false; render();">Apply Filters</button>
                </div>
            </div>

            ${state.showFilters ? '<div class="filter-overlay" onclick="state.showFilters = false; render();"></div>' : ''}

            <div class="products-header">
                <div class="breadcrumbs">
                    <a href="#" onclick="window.navigate('home'); return false;">Home</a>
                    <span>&gt;</span>
                    <span>Products</span>
                </div>
                
                <div class="products-toolbar">
                    <div class="toolbar-left">
                        <button class="filter-btn ${state.showFilters ? 'active' : ''}" onclick="state.showFilters = !state.showFilters; render();">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                            Filter
                        </button>
                        <span style="color: var(--text-muted); font-size: 0.9rem;">${displayedProducts.length} products</span>
                    </div>
                    
                    <div class="sort-container">
                        <span class="sort-label">Sort by:</span>
                        <select class="sort-select" onchange="window.handleSort(this.value)">
                            <option value="featured" ${state.sortBy === 'featured' ? 'selected' : ''}>Featured</option>
                            <option value="price-asc" ${state.sortBy === 'price-asc' ? 'selected' : ''}>Price: Low to High</option>
                            <option value="price-desc" ${state.sortBy === 'price-desc' ? 'selected' : ''}>Price: High to Low</option>
                            <option value="name-asc" ${state.sortBy === 'name-asc' ? 'selected' : ''}>Alphabetical: A-Z</option>
                            <option value="name-desc" ${state.sortBy === 'name-desc' ? 'selected' : ''}>Alphabetical: Z-A</option>
                        </select>
                    </div>
                </div>
            </div>

            ${state.searchQuery ? `
                <div style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: var(--surface); border-radius: 8px; margin-bottom: 1.5rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <span>Showing results for <strong>"${state.searchQuery}"</strong></span>
                </div>
            ` : ''}
            
            ${displayedProducts.length === 0 ? `
                <div class="empty-state" style="text-align: center; padding: 4rem 2rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">🔍</div>
                    <h3>No products found</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2rem;">Try adjusting your filters or search query.</p>
                    <button class="btn btn-outline" onclick="state.searchQuery = ''; state.filterCategory = null; state.filterPriceRange = {min: 0, max: 10000}; render();">Clear All Filters</button>
                    
                    <div style="margin-top: 3rem; text-align: left;">
                        <h4 style="margin-bottom: 1rem;">Popular Suggestions</h4>
                        <div class="product-grid">
                            ${state.products.slice(0, 3).map(ProductCard).join('')}
                        </div>
                    </div>
                </div>
            ` : `
                <div class="product-grid">
                    ${displayedProducts.map(ProductCard).join('')}
                </div>
            `}
        </div>
    `;
};
