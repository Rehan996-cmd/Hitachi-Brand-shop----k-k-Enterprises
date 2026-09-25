/**
 * Coffee & Toast Café - Sikar, Rajasthan
 * Interactive Web Application Scripts
 */

// Gallery Data
const galleryPhotos = [
  { src: '/1.jpeg', alt: 'Cozy interior' },
  { src: '/2.jpeg', alt: 'Artisan coffee' },
  { src: '/3.jpeg', alt: 'Fresh toasts' },
  { src: '/4.jpeg', alt: 'Morning vibes' },
  { src: '/5.jpeg', alt: 'Coffee corner' },
  { src: '/6.jpeg', alt: 'Warm atmosphere' },
  { src: '/7.jpeg', alt: 'Signature drinks' },
  { src: '/8.jpeg', alt: 'Our space' }
];

let currentLightboxIndex = 0;

function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightbox();
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
}

function updateLightbox() {
  const img = document.getElementById('lightboxImg');
  const counter = document.getElementById('lightboxCounter');
  if (img && galleryPhotos[currentLightboxIndex]) {
    img.src = galleryPhotos[currentLightboxIndex].src;
    img.alt = galleryPhotos[currentLightboxIndex].alt;
  }
  if (counter) {
    counter.textContent = `${currentLightboxIndex + 1} / ${galleryPhotos.length}`;
  }
}

function prevLightbox() {
  currentLightboxIndex = (currentLightboxIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
  updateLightbox();
}

function nextLightbox() {
  currentLightboxIndex = (currentLightboxIndex + 1) % galleryPhotos.length;
  updateLightbox();
}

// Keyboard shortcuts for Lightbox
document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('lightboxModal');
  if (modal && !modal.classList.contains('hidden')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
  }

  const buyModal = document.getElementById('howToBuyModal');
  if (buyModal && !buyModal.classList.contains('hidden')) {
    if (e.key === 'Escape') closeHowToBuyModal();
  }
});

// 'How to Buy?' Modal Controls
function openHowToBuyModal() {
  const modal = document.getElementById('howToBuyModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
}

function closeHowToBuyModal() {
  const modal = document.getElementById('howToBuyModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
}

// Menu State & Data
let allProducts = [];
let activeCategory = 'All';
let searchQuery = '';

async function loadProducts() {
  try {
    const res = await fetch('/api/products');
    if (res.ok) {
      const data = await res.json();
      allProducts = Array.isArray(data) ? data : (data.products || []);
    } else {
      throw new Error('API error');
    }
  } catch (err) {
    // Fallback embedded products
    allProducts = [
      {
        id: "6610d53c-a667-4f60-a8d5-bccd979638ad",
        title: "Cakebowl",
        category: "Specials",
        description: "Chocolate, chocolate, chocolate — rich layered Belgian chocolate truffle bowl topped with chocolate shavings and warm fudge.",
        price: 180,
        photo_url: "/cakebowl.avif"
      },
      {
        id: "7fef7df3-ebce-49a4-af41-59a0583167db",
        title: "South Indian Filter Coffee",
        category: "Beverages",
        description: "South Indian Filter Coffee (often called Kaapi) is a strong, frothy, and aromatic milk-based drink brewed in traditional brass filters.",
        price: 60,
        photo_url: "/filter-coffee.jpg"
      },
      {
        id: "24c9dc2d-71ed-447c-ab7c-781a0e4850a1",
        title: "Americano (Black Coffee) Hot Coffee",
        category: "Beverages",
        description: "A Hot Americano is the perfect choice for those who appreciate the true essence of coffee. Crafted by combining intense shots of rich espresso with hot water, creating a drink that maintains the depth of a double espresso with a smoother finish.",
        price: 60,
        photo_url: "/americano.jpg"
      },
      {
        id: "d93b71e6-ccfc-44d6-b601-3eeae7e64b5f",
        title: "Cake boowle",
        category: "Desserts",
        description: "Velvety microfoam, perfectly balanced chocolate sponge, and silky ganache.",
        price: 150,
        photo_url: "/cake-boowle.jpg"
      },
      {
        id: "ct-toast-bhurji",
        title: "Sikar Signature Paneer Bhurji Toast",
        category: "Specials",
        description: "Our legacy recipe and Sikar's absolute favorite! Freshly spiced, soft, flavorful paneer bhurji loaded over artisan golden toasted sourdough bread.",
        price: 140,
        photo_url: "/3.jpeg"
      },
      {
        id: "ct-bev-hazelnut-frappe",
        title: "Hazelnut Cold Coffee Frappe",
        category: "Beverages",
        description: "Rich blended Arabica espresso with roasted hazelnut syrup, chilled creamy milk, and decadent whipped vanilla topping.",
        price: 140,
        photo_url: "/category-beverage.webp"
      },
      {
        id: "ct-bev-belgian-shake",
        title: "Belgian Dark Chocolate Shake",
        category: "Beverages",
        description: "Indulgent thick shake crafted with 70% pure Belgian cocoa, dark chocolate pearls, and artisan gelato.",
        price: 150,
        photo_url: "/2.jpeg"
      },
      {
        id: "ct-fast-farmhouse-pizza",
        title: "Artisan Farmhouse Pizza (10\")",
        category: "Fast Food",
        description: "Hand-stretched sourdough crust fired with San Marzano tomato sauce, bell peppers, golden sweet corn, black olives, jalapenos, and 100% mozzarella.",
        price: 220,
        photo_url: "/category-fastfood.webp"
      },
      {
        id: "ct-fast-paneer-burger",
        title: "Crispy Paneer Brioche Burger",
        category: "Fast Food",
        description: "Golden crisp cottage cheese patty seasoned with peri-peri herbs, crisp iceberg lettuce, Roma tomato, chipotle dip in butter toasted brioche.",
        price: 140,
        photo_url: "/5.jpeg"
      },
      {
        id: "ct-des-biscoff-cheesecake",
        title: "Lotus Biscoff Baked Cheesecake",
        category: "Desserts",
        description: "New York style velvety baked cheesecake layered on spiced speculoos cookie crust, topped with generous warm Belgian Biscoff spread.",
        price: 180,
        photo_url: "/category-dessert.webp"
      }
    ];
  }
  renderProducts();
}

function filterCategory(cat) {
  activeCategory = cat;

  // Update pills
  const pills = document.querySelectorAll('.cat-pill');
  pills.forEach(p => {
    if (p.textContent.trim().toLowerCase() === cat.toLowerCase()) {
      p.className = 'cat-pill active px-8 py-3 rounded-full text-[10px] tracking-[0.3em] uppercase font-bold transition-all duration-500 bg-accent text-background shadow-lg shadow-accent/20 cursor-pointer';
    } else {
      p.className = 'cat-pill px-8 py-3 rounded-full text-[10px] tracking-[0.3em] uppercase font-bold transition-all duration-500 text-muted hover:text-accent glass border-white/5 cursor-pointer';
    }
  });

  renderProducts();
}

function handleSearch(val) {
  searchQuery = val.trim().toLowerCase();
  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const filtered = allProducts.filter(item => {
    const matchesCat = activeCategory === 'All' || item.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery) || 
      (item.description && item.description.toLowerCase().includes(searchQuery));
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-32">
        <p class="text-muted font-light text-xl italic">No treasures found in this category.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const img = item.photo_url || item.image || '/1.jpeg';
    return `
      <div class="product-card group">
        <div class="h-full flex flex-col p-4 bg-[#11140e]/50 border border-white/5 rounded-3xl transition-all duration-500 overflow-hidden glass glass-hover">
          <div class="h-72 w-full overflow-hidden rounded-2xl relative">
            <img src="${img}" alt="${escapeHtml(item.title)}" class="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-2 saturate-[0.8] group-hover:saturate-100" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
            <div class="absolute top-4 left-4 glass px-4 py-1.5 rounded-full border-white/10">
              <span class="text-[8px] uppercase tracking-[0.2em] font-bold text-accent">${escapeHtml(item.category)}</span>
            </div>
          </div>

          <div class="p-6 pb-2 flex flex-col flex-grow">
            <div class="flex justify-between items-start gap-4 mb-4">
              <h3 class="text-2xl font-display text-text tracking-tight group-hover:text-accent transition-colors duration-500">${escapeHtml(item.title)}</h3>
              ${item.price > 0 ? `
                <div class="relative shrink-0">
                  <span class="text-xl font-display text-accent relative z-10">₹${item.price}</span>
                  <div class="absolute -inset-2 bg-accent/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full"></div>
                </div>
              ` : ''}
            </div>

            <p class="text-muted leading-relaxed font-light text-sm line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
              ${escapeHtml(item.description || '')}
            </p>

            <div class="mt-8 pt-6 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <span class="text-[9px] uppercase tracking-widest text-muted">Handcrafted with care</span>
              <div class="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});
