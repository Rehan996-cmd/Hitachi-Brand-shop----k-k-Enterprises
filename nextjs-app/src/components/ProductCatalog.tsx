'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, Zap, Snowflake, BarChart3, ShoppingCart } from 'lucide-react';
import { PRODUCTS_DATA } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { useModal } from '@/context/ModalContext';
import type { CategoryFilter, TonnageFilter, StarFilter } from '@/lib/types';

export default function ProductCatalog() {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [tonnage, setTonnage] = useState<TonnageFilter>('all');
  const [star, setStar] = useState<StarFilter>('all');
  const [search, setSearch] = useState('');
  const { addItem } = useCart();
  const { openModal, showToast } = useModal();
  const [compareList, setCompareList] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return PRODUCTS_DATA.filter(p => {
      const matchesCat = category === 'all' || p.category === category;
      let matchesTon = true;
      if (tonnage !== 'all') {
        if (tonnage === 'commercial') matchesTon = p.tonnageVal >= 2.5 || p.category === 'commercial_ac';
        else matchesTon = p.tonnageVal === parseFloat(tonnage);
      }
      let matchesStar = true;
      if (star !== 'all') matchesStar = p.starRating === parseInt(star);
      let matchesSearch = true;
      if (search.trim()) {
        const q = search.toLowerCase();
        matchesSearch = p.name.toLowerCase().includes(q) || p.highlight.toLowerCase().includes(q) || p.subCategory.toLowerCase().includes(q);
      }
      return matchesCat && matchesTon && matchesStar && matchesSearch;
    });
  }, [category, tonnage, star, search]);

  const toggleCompare = (id: string) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) { showToast('You can compare max 3 models at a time.'); return prev; }
      return [...prev, id];
    });
  };

  const handleAddToCart = (id: string) => {
    addItem(id, 1);
    showToast('Added to cart!');
  };

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: 'All Products' },
    { key: 'split_ac', label: 'Split Air Conditioners' },
    { key: 'window_ac', label: 'Window ACs (Kaze Plus)' },
    { key: 'commercial_ac', label: 'Commercial, VRF & Cassette' },
    { key: 'washing_machines', label: 'Washing Machines' },
    { key: 'appliances', label: 'Refrigerators & Inverters' },
  ];

  const resetFilters = () => {
    setCategory('all');
    setTonnage('all');
    setStar('all');
    setSearch('');
  };

  return (
    <section className="section" id="catalog">
      <div className="container">
        <div className="section-header" id="catalogSection">
          <span className="section-eyebrow">Full 2026 Inventory</span>
          <h2 className="section-title">Hitachi Air Conditioners & Home Appliances</h2>
          <p className="section-desc">Browse our complete range of authorized Hitachi Split ACs, Window ACs, Heavy Commercial VRF units, Washing Machines, and Home Inverters available at K.K. Enterprises.</p>
        </div>

        <div className="catalog-control-panel">
          <div className="category-tabs-row">
            {categories.map(c => (
              <button key={c.key} className={`cat-tab${category === c.key ? ' active' : ''}`} onClick={() => setCategory(c.key)}>{c.label}</button>
            ))}
          </div>

          <div className="secondary-filters-row">
            <div className="search-box-wrap">
              <Search size={18} className="search-icon-svg" />
              <input type="text" className="search-input" placeholder="Search by model name, series, or capacity..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="filter-dropdowns-group">
              <select className="catalog-select" value={tonnage} onChange={(e) => setTonnage(e.target.value as TonnageFilter)}>
                <option value="all">Capacity: All</option>
                <option value="1.0">1.0 Ton</option>
                <option value="1.5">1.5 Ton (Most Popular)</option>
                <option value="2.0">2.0 Ton</option>
                <option value="commercial">Commercial (3.0T+)</option>
              </select>
              <select className="catalog-select" value={star} onChange={(e) => setStar(e.target.value as StarFilter)}>
                <option value="all">Energy Rating: All</option>
                <option value="5">5-Star Highest Efficiency</option>
                <option value="3">3-Star Value Choice</option>
              </select>
              <button className="btn btn-outline" onClick={resetFilters} style={{ padding: '8px 14px', fontSize: '0.85rem' }}>Reset Filters</button>
              <span className="count-indicator">{filtered.length} Models Available</span>
            </div>
          </div>
        </div>

        <div className="product-grid">
          {filtered.length === 0 ? (
            <div className="no-products-box">
              <Search size={40} color="var(--text-muted)" />
              <h3>No matching models found</h3>
              <p>Try resetting the search keyword or selecting &quot;All Models&quot; to explore our full inventory.</p>
              <button className="btn btn-primary" onClick={resetFilters}>Reset All Filters</button>
            </div>
          ) : filtered.map(p => {
            const isCompared = compareList.includes(p.id);
            const starStr = p.starRating ? '★'.repeat(p.starRating) + '☆'.repeat(Math.max(0, 5 - p.starRating)) : '';
            const isCopper = p.condenser?.toLowerCase().includes('copper');

            return (
              <div className="product-card" key={p.id}>
                <div className="product-card-head">
                  <span className="product-badge">{p.badge}</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {isCopper && <span className="copper-badge">100% Copper</span>}
                    <button className={`btn-compare${isCompared ? ' active' : ''}`} onClick={() => toggleCompare(p.id)}>
                      {isCompared ? 'Comparing' : '+ Compare'}
                    </button>
                  </div>
                </div>

                <div className="product-image-wrap" onClick={() => openModal('product', { productId: p.id })}>
                  <Image src={p.image} alt={p.name} width={200} height={180} style={{ height: 180, objectFit: 'contain' }} />
                  <span className="category-pill">{p.subCategory}</span>
                </div>

                <div className="product-info">
                  <div className="product-rating-row">
                    <span className="stars">{starStr}</span>
                    <span className="rating-label">{p.starRating ? `${p.starRating}-Star Rated` : 'Heavy Commercial'}</span>
                  </div>

                  <h3 className="product-title" onClick={() => openModal('product', { productId: p.id })}>{p.name}</h3>
                  <p className="product-highlight">{p.highlight}</p>

                  <div className="product-specs-chips">
                    <span className="spec-chip"><Zap size={12} /> {p.technology}</span>
                    <span className="spec-chip"><Snowflake size={12} /> {p.tonnage}</span>
                    {typeof p.iseer === 'number' && p.iseer < 10 && <span className="spec-chip"><BarChart3 size={12} /> ISEER {p.iseer}</span>}
                  </div>

                  <div className="product-price-box">
                    <div className="price-row">
                      <span className="current-price">Rs.{p.price.toLocaleString('en-IN')}</span>
                      <span className="mrp-price">Rs.{p.mrp.toLocaleString('en-IN')}</span>
                      <span className="discount-pill">{p.discount}</span>
                    </div>
                    <div className="emi-text">EMI from {p.emi}</div>
                  </div>

                  <div className="product-card-actions">
                    <button className="btn btn-add-cart" onClick={() => handleAddToCart(p.id)}>
                      <ShoppingCart size={14} /> Add to Cart
                    </button>
                    <button className="btn btn-buy-now" onClick={() => { addItem(p.id, 1); openModal('checkout'); }}>
                      <Zap size={14} /> Buy Now
                    </button>
                  </div>

                  <div className="product-card-actions-row2">
                    <button className="btn btn-outline" onClick={() => openModal('product', { productId: p.id })}>View Specs</button>
                    <a href={`https://wa.me/919587111100?text=${encodeURIComponent(`Hello K.K. Enterprises! I am interested in: ${p.name} (Rs.${p.price.toLocaleString('en-IN')}). Please share the best discount.`)}`} target="_blank" rel="noopener" className="btn btn-whatsapp">WhatsApp Quote</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
