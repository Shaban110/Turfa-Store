// =================================================================
// --- 1. LANGUAGE & TRANSLATION DATA ---
// =================================================================
const arabicTexts = {
    title: "لوحات",
    cupsTitle: "كاسات",
    giftsTitle: "هدايا منوعة",
    searchPlaceholder: "ابحث عن منتجك من هنا",
    addToCart: "أضف إلى العربة",
    added: "تمت الإضافة!",
    yourCart: "عربتك",
    total: "الإجمالي:",
    checkout: "متابعة الشراء عبر واتساب",
    emptyCart: "عربتك فارغة",
    emptyCartSub: "أضف بعض المنتجات إلى عربتك",
    selectSize: "اختر الحجم:",
    sizeOptions: [
        { name: "صغير 40×40سم", priceDiff: 0 },
        { name: "متوسط 50×70سم", priceDiff: 15.00 },
        { name: "كبير 80×120سم", priceDiff: 30.00 },     
    ],
    footerCopyright: "&copy; 2025 متجر طُرفة. جميع الحقوق محفوظة.",
    footerContact: "تواصل معنا",
    footerSocial: "تابعنا",
    footerAbout: "عن الموقع",
    footerCategories: "الفئات",
    footerCollections: "مجموعات",
    whatsappGreeting: "مرحباً متجر طُرفة! أود طلب الآتي:\n\n",
    whatsappTotal: "\nالإجمالي:",
    whatsappThanks: "\n\نشكراً لك!",
    yourFavorites: "منتجاتك المفضلة",
    emptyFavorites: "قائمة المفضلة فارغة",
    emptyFavoritesSub: "أضف منتجات تعجبك لحفظها هنا",
    favoritesFooter: "انقر على المنتج لعرض التفاصيل أو الزر لإضافته للعربة.",
    detailTitle: "تفاصيل المنتج", 
    detailFullDescription: "الوصف الكامل:", 
    floatingItem: "منتج",
    floatingItems: "منتجات"
};

const englishTexts = {
    title: " Paintings",
    cupsTitle: " Cups",
    giftsTitle: "Miscellaneous Gifts",
    searchPlaceholder: "Search for your product here",
    addToCart: "Add to Cart",
    added: "Added!",
    yourCart: "Your Cart",
    total: "Total:",
    checkout: "Checkout via WhatsApp",
    emptyCart: "Your cart is empty",
    emptyCartSub: "Add some products to your cart",
    selectSize: "Select Size:",
    sizeOptions: [
        { name: "Small 40x40cm", priceDiff: 0 },
        { name: "Medium 50x70cm", priceDiff: 15.00 },
        { name: "Large 80x120cm", priceDiff: 30.00 },     
    ],
    footerCopyright: "&copy; 2025 Turfa Store. All rights reserved.",
    footerContact: "Contact Us",
    footerSocial: "Follow Us",
    footerAbout: "About",
    footerCategories: "Categories",
    footerCollections: "Collections",
    whatsappGreeting: "Hello Turfa Store! I would like to order the following:\n\n",
    whatsappTotal: "\nTotal:",
    whatsappThanks: "\n\nThank you!",
    yourFavorites: "Your Favorites",
    emptyFavorites: "Your favorites list is empty",
    emptyFavoritesSub: "Add products you like to save them here",
    favoritesFooter: "Click a product for details or the button to add it to your cart.",
    detailTitle: "Product Details", 
    detailFullDescription: "Full Description:",
    floatingItem: "item",
    floatingItems: "items"
};

const footerLinksEnglish = {
    contact: [
        { text: "+962 7 9700 5992", icon: "fas fa-phone", link: "tel:+962797005992" },
        { text: "info@turfastore.com", icon: "fas fa-envelope", link: "mailto:info@turfastore.com" }
    ],
    about: [ { text: "About Us", link: "#" }, { text: "Contact", link: "#" }, { text: "Privacy Policy", link: "#" } ],
    categories: [ { text: "Gifts", link: "#" }, { text: "Home Decor", link: "#" }, { text: "Apparel", link: "#" } ],
    collections: [ { text: "Handmade Gifts", link: "#" }, { text: "Valentine's Day", link: "#" }, { text: "Ramadan", link: "#" } ]
};

const footerLinksArabic = {
    contact: [
        { text: "+962 7 8848 9914", icon: "fas fa-phone", link: "tel:+962788489914" },
        { text: "info@turfa.com", icon: "fas fa-envelope", link: "mailto:info@turfastore.com" }
    ],
    about: [ { text: "من نحن", link: "#" }, { text: "تواصل معنا", link: "#" }, { text: "سياسة الخصوصية", link: "#" } ],
    categories: [ { text: "هدايا", link: "#" }, { text: "ديكور منزلي", link: "#" }, { text: "ملابس", link: "#" } ],
    collections: [ { text: "هدايا يدوية", link: "#" }, { text: "هدايا عيد الحب", link: "#" }, { text: "منتجات رمضانية", link: "#" } ]
};

// =================================================================
// --- 2. PRODUCT DATA ---
// =================================================================
const paintingsEnglish = [
    { id: 1, name: "Abstract Landscape", price: 39.99,shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/plates/1.png", category: "painting", hasSizes: true },
    { id: 2, name: "Geometric Sunset", price: 39.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.",image: "images/plates/2.png", category: "painting", hasSizes: true },
    { id: 3, name: "Minimalist Portrait", price: 39.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/plates/3.png", category: "painting", hasSizes: true },
    { id: 4, name: "Ocean Wave", price: 59.99,shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/plates/4.png", category: "painting", hasSizes: true },
    { id: 5, name: "City Skyline", price: 24.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/plates/5.png", category: "painting", hasSizes: true },
    { id: 6, name: "Nature Sketch", price: 59.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/plates/6.png", category: "painting", hasSizes: true }
];

const paintingsArabic = [
    { id: 1, name: "لوحة يا شام", price: 39.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/plates/1.png", category: "painting", hasSizes: true },
    { id: 2, name: "لوحة الحمدلله", price: 39.99,shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/plates/2.png", category: "painting", hasSizes: true },
    { id: 3, name: "بورتريه بسيط", price: 39.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/plates/3.png", category: "painting", hasSizes: true },
    { id: 4, name: "موجة المحيط", price: 59.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/plates/4.png", category: "painting", hasSizes: true },
    { id: 5, name: "أفق المدينة", price: 24.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/plates/5.png", category: "painting", hasSizes: true },
    { id: 6, name: "رسم طبيعي", price: 59.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/plates/6.png", category: "painting", hasSizes: true }
];

const cupsEnglish = [
    { id: 101, name: "Ceramic Coffee Mug", price: 15.99,shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cups/cup1.png", category: "cup", hasSizes: false },
    { id: 102, name: "Travel Tumbler", price: 24.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cups/cup2.png", category: "cup", hasSizes: false },
    { id: 103, name: "Glass Tea Cup Set", price: 34.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cups/cup3.png", category: "cup", hasSizes: false },
    { id: 104, name: "Artistic Espresso Cup", price: 12.99,shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cups/cup4.png", category: "cup", hasSizes: false },
    { id: 105, name: "Color Changing Mug", price: 19.99,shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cups/cup5.png", category: "cup", hasSizes: false },
    { id: 106, name: "Bamboo Eco Cup", price: 18.99,shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cups/cup6.png", category: "cup", hasSizes: false }
];

const cupsArabic = [
    { id: 101, name: "كوب قهوة سيراميك", price: 15.99,shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.",image: "images/cups/cup1.png", category: "cup", hasSizes: false },    { id: 102, name: "كوب سفر معزول", price: 24.99, description: "كوب سفر من الستانلس ستيل معزول. يحافظ على المشروبات ساخنة لمدة 6 ساعات.", image: "images/cups/cup2.png", category: "cup", hasSizes: false },
    { id: 103, name: "طقم أكواب شاي زجاجية", price: 34.99,shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cups/cup3.png", category: "cup", hasSizes: false },
    { id: 104, name: "فنجان إسبريسو فني", price: 12.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cups/cup4.png", category: "cup", hasSizes: false },
    { id: 105, name: "كوب متغير اللون", price: 19.99,shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cups/cup5.png", category: "cup", hasSizes: false },
    { id: 106, name: "كوب بامبو صديق للبيئة", price: 18.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cups/cup6.png", category: "cup", hasSizes: false }
];

const giftsEnglish = [
    { id: 201, name: "Wooden Keychain", price: 7.99,shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/gift1.png", category: "gift", hasSizes: false },
    { id: 202, name: "Leather Bookmark", price: 12.50, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/gift2.png", category: "gift", hasSizes: false },
    { id: 203, name: "Scented Candle", price: 15.00, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/gift3.png", category: "gift", hasSizes: false },
    { id: 204, name: "Personalized Photo Mug", price: 14.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/gift4.png", category: "gift", hasSizes: false },
];

const giftsArabic = [
    { id: 201, name: "ميدالية مفاتيح خشبية", price: 7.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/gift1.png", category: "gift", hasSizes: false },
    { id: 202, name: "فاصل كتب جلدي", price: 12.50, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/gift2.png", category: "gift", hasSizes: false },
    { id: 203, name: "شمعة معطرة", price: 15.00, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/gift3.png", category: "gift", hasSizes: false },
    { id: 204, name: "كوب بصورة شخصية", price: 14.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/gift4.png", category: "gift", hasSizes: false },
];

let allProductsEnglish = [...paintingsEnglish, ...cupsEnglish, ...giftsEnglish];
let allProductsArabic = [...paintingsArabic, ...cupsArabic, ...giftsArabic];

// =================================================================
// --- 3. GLOBAL STATE & DOM ELEMENTS ---
// =================================================================
let currentLang = 'ar'; 
let products = allProductsArabic;
let texts = arabicTexts;
let cart = [];
let favorites = []; 

const productsContainer = document.getElementById('productsContainer');
const cupsContainer = document.getElementById('cupsContainer');
const giftsContainer = document.getElementById('giftsContainer');
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const totalPrice = document.getElementById('totalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');
const favoritesIcon = document.getElementById('favoritesIcon');
const favoritesModal = document.getElementById('favoritesModal');
const favoritesCount = document.getElementById('favoritesCount');
const closeFavorites = document.getElementById('closeFavorites');
const favoritesItems = document.getElementById('favoritesItems');

// =================================================================
// --- 4. HELPER FUNCTIONS ---
// =================================================================
function checkImageExists(url) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

// =================================================================
// --- 5. RENDER & DISPLAY FUNCTIONS ---
// =================================================================
function renderProductCards(container, productList) {
    if (!container) return;
    container.innerHTML = ''; 

    if (productList.length === 0) {
        container.innerHTML = `<p style="text-align: center; width: 100%; color: #777;">${texts.emptySearch || 'No products match your search.'}</p>`;
        return;
    }

    productList.forEach(product => {
        const isFav = favorites.includes(product.id);
        const favIconClass = isFav ? 'fas fa-heart' : 'far fa-heart';
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <button class="favorite-btn ${isFav ? 'active' : ''}" data-id="${product.id}" title="${texts.addToFavorites || 'Add to Favorites'}">
                    <i class="${favIconClass}"></i> 
                </button>
<p class="product-description">${
  product.shortDesc ||
  (product.description ? (product.description.split(/(?<=\.)\s+/)[0]) : '')
}</p>                <div class="product-price">د.أ ${product.price.toFixed(2)}</div>
                <button class="add-to-cart" data-id="${product.id}" data-has-sizes="${product.hasSizes || false}">
                    <i class="fas fa-plus"></i> ${texts.addToCart}
                </button>
            </div>
        `;
        container.appendChild(productCard);
        
        productCard.querySelector('.add-to-cart').addEventListener('click', (e) => {
            e.stopPropagation(); 
            const hasSizes = e.currentTarget.dataset.hasSizes === 'true';
            if (hasSizes) {
                showProductDetails(product.id);
            } else {
                addToCart(product.id);
            }
        });
    });
}

function renderAllSections() {
    renderProductSection(productsContainer, 'painting', texts.title, 'paintingsTitle');
    renderProductSection(cupsContainer, 'cup', texts.cupsTitle, 'cupsTitle');
    renderProductSection(giftsContainer, 'gift', texts.giftsTitle, 'giftsTitle');
}

function renderProductSection(container, category, title, titleId) {
    const titleElement = document.getElementById(titleId);
    if (titleElement) titleElement.textContent = title;
    
    const categoryProducts = products.filter(p => p.category === category);
    renderProductCards(container, categoryProducts);
}

function renderFavoritesModal() {
    const favoritesProducts = favorites.map(id => allProductsArabic.find(p => p.id === id) || allProductsEnglish.find(p => p.id === id)).filter(p => p);
    
    document.getElementById('favoritesTitle').textContent = texts.yourFavorites;
    
    if (favoritesProducts.length === 0) {
        favoritesItems.innerHTML = `<div class="empty-cart"><i class="far fa-heart"></i><h3>${texts.emptyFavorites}</h3><p>${texts.emptyFavoritesSub}</p></div>`;
        document.getElementById('favoritesFooterText').style.display = 'none';
        return;
    }
    
    favoritesItems.innerHTML = '';
    document.getElementById('favoritesFooterText').style.display = 'block';
    document.getElementById('favoritesFooterText').textContent = texts.favoritesFooter;

    favoritesProducts.forEach(product => {
        // Find the product in the currently selected language for display
        const displayProduct = products.find(p => p.id === product.id) || product;
        
        const favItem = document.createElement('div');
        favItem.className = 'cart-item';
        favItem.innerHTML = `
            <img src="${displayProduct.image}" alt="${displayProduct.name}" class="modal-item-img">
            <div class="item-details" style="flex: 2;">
                <div class="item-name">${displayProduct.name}</div>
                <div class="item-price">د.أ ${displayProduct.price.toFixed(2)}</div>
            </div>
            <button class="add-to-cart" data-id="${displayProduct.id}" data-has-sizes="${displayProduct.hasSizes}" style="width: auto; padding: 0.5rem 1rem;">
                <i class="fas fa-shopping-cart"></i>
            </button>
            <button class="remove-item remove-fav-btn" data-id="${displayProduct.id}" style="font-size: 1.5rem;">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        favoritesItems.appendChild(favItem);
        
        const openDetails = () => {
            showProductDetails(product.id);
            favoritesModal.classList.remove('active');
        };

        favItem.querySelector('.item-name').addEventListener('click', openDetails);
        favItem.querySelector('.modal-item-img').addEventListener('click', openDetails);
        
        favItem.querySelector('.add-to-cart').addEventListener('click', (e) => {
            const hasSizes = e.currentTarget.dataset.hasSizes === 'true';
            if (hasSizes) {
                 showProductDetails(product.id);
            } else {
                 addToCart(product.id);
            }
            favoritesModal.classList.remove('active'); 
        });

        favItem.querySelector('.remove-fav-btn').addEventListener('click', () => {
            toggleFavorite(product.id);
            renderFavoritesModal(); 
        });
    });
}

async function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const dynamicGallery = [];
    const lastDotIndex = product.image.lastIndexOf('.');
    const baseImagePath = product.image.substring(0, lastDotIndex);
    const extension = product.image.substring(lastDotIndex);

    for (let i = 98; i <= 122; i++) {
        const char = String.fromCharCode(i);
        const imageUrl = `${baseImagePath}${char}${extension}`;
        if (await checkImageExists(imageUrl)) {
            dynamicGallery.push(imageUrl);
        } else {
            break; 
        }
    }

    const detailTitle = document.getElementById('detailTitle');
    const detailImage = document.getElementById('detailImage');
    const detailName = document.getElementById('detailName');
    const detailDescriptionShort = document.getElementById('detailDescriptionShort');
    const detailDescriptionFull = document.getElementById('detailDescriptionFull');
    const detailDescriptionHeader = document.getElementById('detailDescriptionHeader');
    const thumbnailGallery = document.getElementById('thumbnailGallery');
    const detailPriceRow = document.querySelector('.detail-price-row');
    
    const sizingData = texts.sizeOptions;

    let sizeOptionsHTML = '';
    if (product.hasSizes) {
        sizeOptionsHTML = `
            <div class="product-size-select">
                <label>${texts.selectSize}</label>
                <div class="size-options-container">
                    ${sizingData.map((size, index) => {
                        const priceDisplay = index === 0 ? (currentLang === 'ar' ? 'السعر الأساسي' : 'Base Price') : `+ د.أ ${size.priceDiff.toFixed(2)}`;
                        const sizeNameOnly = size.name.split(/[\(]/)[0].trim();
                        return `<div class="size-option-box" data-index="${index}" data-pricediff="${size.priceDiff}"><span>${sizeNameOnly}</span><span class="size-price-diff">${priceDisplay}</span></div>`;
                    }).join('')}
                </div>
            </div>`;
    }
    
    detailPriceRow.innerHTML = `
        ${sizeOptionsHTML}
        <span id="detailPrice" style="font-weight: 700; color: var(--secondary); font-size: 2rem; display: block; margin-bottom: 15px;">د.أ ${product.price.toFixed(2)}</span>
        <button id="detailAddToCartBtnClone" class="add-to-cart" data-id="${product.id}" data-base-price="${product.price}" data-has-sizes="${product.hasSizes}" style="width: 100%; padding: 1rem;">
            <i class="fas fa-plus"></i> ${texts.addToCart}
        </button>`;
    
    detailTitle.textContent = texts.detailTitle;
    detailImage.src = product.image;
    detailName.textContent = product.name;

const firstSentence = (txt) => txt ? (txt.split(/(?<=\.)\s+/)[0]) : '';

detailDescriptionShort.textContent =
  product.shortDesc || firstSentence(product.description) || '';

detailDescriptionFull.textContent =
  product.fullDesc || product.description || '';

    detailDescriptionHeader.textContent = texts.detailFullDescription;
    
    if (product.hasSizes) {
        const updatedDetailPrice = document.getElementById('detailPrice');
        const finalAddToCartBtn = document.getElementById('detailAddToCartBtnClone');
        const sizeBoxes = detailPriceRow.querySelectorAll('.size-option-box');
        
        sizeBoxes.forEach(box => {
            box.addEventListener('click', () => {
                const selectedIndex = box.dataset.index;
                const priceDiff = parseFloat(box.dataset.pricediff);
                const newPrice = product.price + priceDiff;
                
                sizeBoxes.forEach(b => b.classList.remove('active'));
                box.classList.add('active');
                
                updatedDetailPrice.textContent = `د.أ ${newPrice.toFixed(2)}`;
                finalAddToCartBtn.dataset.selectedSizeIndex = selectedIndex; 
                finalAddToCartBtn.dataset.selectedPrice = newPrice.toFixed(2); 
            });
        });

        if (sizeBoxes.length > 0) {
            sizeBoxes[0].click();
        }
    }

    document.getElementById('detailAddToCartBtnClone').addEventListener('click', (e) => {
        const productId = parseInt(e.currentTarget.dataset.id);
        const hasSizes = e.currentTarget.dataset.hasSizes === 'true';
        let sizeIndex = null;
        let finalPrice = parseFloat(e.currentTarget.dataset.basePrice);

        if (hasSizes) {
            sizeIndex = e.currentTarget.dataset.selectedSizeIndex || '0';
            finalPrice = parseFloat(e.currentTarget.dataset.selectedPrice) || finalPrice;
        }
        addToCart(productId, sizeIndex, finalPrice);
        document.getElementById('productDetailModal').classList.remove('active');
    });
    
    const allImages = [product.image, ...dynamicGallery];
    thumbnailGallery.innerHTML = allImages.map(src => `<img src="${src}" class="thumbnail">`).join('');
    
    thumbnailGallery.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.addEventListener('click', () => {
            detailImage.src = thumb.src;
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });
    
    if (thumbnailGallery.firstChild) thumbnailGallery.firstChild.classList.add('active');

    document.getElementById('productDetailModal').classList.add('active');
}

// =================================================================
// --- 6. CORE LOGIC (Cart, Favorites, Language, Theme) ---
// =================================================================
function addToCart(productId, selectedSizeIndex = null, finalPrice = null) {
    const product = products.find(p => p.id === productId); 
    if (!product) return;
    
    const price = finalPrice !== null ? finalPrice : product.price;
    const cartItemId = selectedSizeIndex !== null ? `${productId}-${selectedSizeIndex}` : productId.toString();
    
    let sizeName = '';
    if (selectedSizeIndex !== null && product.hasSizes) {
        sizeName = texts.sizeOptions[parseInt(selectedSizeIndex)]?.name || '';
    }

    const existingItem = cart.find(item => item.id === cartItemId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
cart.push({ id: cartItemId, productId: product.id, name: product.name, price: price, quantity: 1, sizeName, image: product.image });
    }
    
    saveCartToStorage();
    updateCartUI();
    updateFloatingCart();
    
    const allBtns = document.querySelectorAll(`.add-to-cart[data-id="${productId}"]`);
    allBtns.forEach(btn => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `<i class="fas fa-check"></i> ${texts.added}`;
        btn.style.backgroundColor = '#28a745';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.backgroundColor = '';
        }, 1500);
    });
}

function updateCartUI() {
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalCount;
    cartCount.style.display = totalCount > 0 ? 'flex' : 'none';
    
    cartModal.querySelector('.cart-header h2').textContent = texts.yourCart;

    if (cart.length === 0) {
        cartItems.innerHTML = `<div class="empty-cart"><i class="fas fa-shopping-cart"></i><h3>${texts.emptyCart}</h3><p>${texts.emptyCartSub}</p></div>`;
        totalPrice.textContent = 'د.أ 0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        const sizeDisplay = item.sizeName ? `<div style="font-size: 0.85rem; color: #777;">(${item.sizeName})</div>` : '';
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="modal-item-img">
            <div class="item-details">
                <div class="item-name">${item.name} ${sizeDisplay}</div>
                <div class="item-price">د.أ ${item.price.toFixed(2)}</div>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
            <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>`;
        cartItems.appendChild(cartItem);
    });
    
    totalPrice.textContent = `د.أ ${total.toFixed(2)}`;
if (cart.length > 0) {
    const clearAllBtn = document.createElement('button');
    clearAllBtn.textContent = '🗑️ حذف الكل';
    clearAllBtn.className = 'clear-all-btn';
    clearAllBtn.style.cssText = `
        background-color: #b22222;
        color: #fff;
        border: none;
        padding: 0.6rem 1.2rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        display: block;
        margin: 1rem auto;
        transition: background 0.3s;
    `;
    clearAllBtn.addEventListener('mouseover', () => clearAllBtn.style.backgroundColor = '#d33');
    clearAllBtn.addEventListener('mouseout', () => clearAllBtn.style.backgroundColor = '#b22222');
    clearAllBtn.addEventListener('click', clearCart);

    // أضفه بعد قائمة العناصر
    cartItems.appendChild(clearAllBtn);
}

    cartItems.querySelectorAll('.minus').forEach(btn => btn.addEventListener('click', (e) => updateQuantity(e.currentTarget.dataset.id, -1)));
    cartItems.querySelectorAll('.plus').forEach(btn => btn.addEventListener('click', (e) => updateQuantity(e.currentTarget.dataset.id, 1)));
    cartItems.querySelectorAll('.remove-item').forEach(btn => btn.addEventListener('click', (e) => removeFromCart(e.currentTarget.dataset.id)));
}

function updateQuantity(cartItemId, change) {
    const item = cart.find(item => item.id === cartItemId);
    if (!item) return;
    
    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(cartItemId);
    } else {
        saveCartToStorage();
        updateCartUI();
        updateFloatingCart();
    }
}

function removeFromCart(cartItemId) {
    cart = cart.filter(item => item.id !== cartItemId);
    saveCartToStorage();
    updateCartUI();
    updateFloatingCart();
}
function clearCart() {
    cart = [];
    saveCartToStorage();
    updateCartUI();
    updateFloatingCart();
}

function proceedToCheckout() {
    if (cart.length === 0) return;
    let message = `${texts.whatsappGreeting}\n`;
    cart.forEach(item => {
        const sizeDetail = item.sizeName ? ` (${item.sizeName})` : '';
        message += `- ${item.name}${sizeDetail} (x${item.quantity}) - JD ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `${texts.whatsappTotal} JD ${total.toFixed(2)}${texts.whatsappThanks}`;
    window.open(`https://wa.me/+962788489914?text=${encodeURIComponent(message)}`, '_blank');
}

function toggleFavorite(productId) {
    const index = favorites.indexOf(productId);
    if (index === -1) {
        favorites.push(productId); 
    } else {
        favorites.splice(index, 1); 
    }
    saveFavoritesToStorage();
    updateFavoritesUI();
    renderAllSections();
}

function updateFavoritesUI() {
    favoritesCount.textContent = favorites.length;
    favoritesIcon.querySelector('i').className = favorites.length > 0 ? 'fas fa-heart' : 'far fa-heart';
    favoritesCount.style.display = favorites.length > 0 ? 'flex' : 'none';
}

function renderFooterLinks() {
    const linksData = currentLang === 'ar' ? footerLinksArabic : footerLinksEnglish;
    const renderList = (col, data) => {
        const ul = col.querySelector('ul');
        if (!ul) return;
        ul.innerHTML = data.map(item => `<li><i class="${item.icon || 'fas fa-chevron-left'}"></i><a href="${item.link}">${item.text}</a></li>`).join('');
    };
    
    const firstColHeaders = document.querySelectorAll('.footer-col:nth-child(1) h3');
    if (firstColHeaders.length > 1) {
        firstColHeaders[0].textContent = texts.footerContact;
        firstColHeaders[1].textContent = texts.footerSocial;
    }
    document.querySelector('.footer-col:nth-child(2) h3').textContent = texts.footerAbout;
    document.querySelector('.footer-col:nth-child(3) h3').textContent = texts.footerCategories;
    document.querySelector('.footer-col:nth-child(4) h3').textContent = texts.footerCollections;
    document.querySelector('#footerCopyright').innerHTML = texts.footerCopyright;

    renderList(document.querySelector('.footer-col:nth-child(1)'), linksData.contact);
    renderList(document.querySelector('.footer-col:nth-child(2)'), linksData.about);
    renderList(document.querySelector('.footer-col:nth-child(3)'), linksData.categories);
    renderList(document.querySelector('.footer-col:nth-child(4)'), linksData.collections);
}

function toggleLanguage() {
    const isEnglish = document.getElementById('lang-toggle').checked;
    currentLang = isEnglish ? 'en' : 'ar';
    texts = isEnglish ? englishTexts : arabicTexts;
    products = isEnglish ? allProductsEnglish : allProductsArabic;
    
    document.documentElement.setAttribute('dir', isEnglish ? 'ltr' : 'rtl');
    document.getElementById('logoImage').src = isEnglish ? 'icons/turfa_logo_en.png' : 'icons/turfa_logo_ar.png';
    
    document.getElementById('searchInput').placeholder = texts.searchPlaceholder;
    checkoutBtn.innerHTML = `<i class="fab fa-whatsapp"></i> ${texts.checkout}`;

    renderAllSections();
    renderFooterLinks();
    updateCartUI();
    updateFloatingCart();
    resetCarouselScrolls(); 
}

function initThemeToggle() {
    const themeToggle = document.getElementById('darkmode-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';

    themeToggle.addEventListener('change', (e) => {
        const newTheme = e.target.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// --- LOCAL STORAGE FUNCTIONS ---
const saveToStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const loadFromStorage = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
};
const saveCartToStorage = () => saveToStorage('turfaCart', cart);
const saveFavoritesToStorage = () => saveToStorage('turfaFavorites', favorites);

// =================================================================
// --- 7. INITIALIZATION & UI SETUP ---
// =================================================================
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');

    const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        document.querySelectorAll('.carousel-control').forEach(btn => btn.style.display = searchTerm ? 'none' : '');
        document.querySelectorAll('.products-grid').forEach(grid => {
            grid.style.flexWrap = searchTerm ? 'wrap' : 'nowrap';
            grid.style.overflowX = searchTerm ? 'visible' : 'auto';
        });

        if (!searchTerm) {
            renderAllSections();
            return;
        }

const filtered = products.filter(p => {
  const n = (p.name || '').toLowerCase();
  const sd = (p.shortDesc || p.description || '').toLowerCase();
  const fd = (p.fullDesc  || p.description || '').toLowerCase();
  return n.includes(searchTerm) || sd.includes(searchTerm) || fd.includes(searchTerm);
});
        renderProductCards(productsContainer, filtered.filter(p => p.category === 'painting'));
        renderProductCards(cupsContainer, filtered.filter(p => p.category === 'cup'));
        renderProductCards(giftsContainer, filtered.filter(p => p.category === 'gift'));
    };

    searchInput.addEventListener('input', performSearch);
    searchBtn.addEventListener('click', performSearch);
}

function initCarouselControls() {
    const initSectionCarousel = (containerId, prevBtnId, nextBtnId) => {
        const container = document.getElementById(containerId);
        const scroll = (direction) => {
            const scrollAmount = container.offsetWidth * 0.8;
            const isRTL = document.documentElement.dir === 'rtl';
            const finalScroll = (direction === 'prev' ? -1 : 1) * (isRTL ? -1 : 1) * scrollAmount;
            container.scrollBy({ left: finalScroll, behavior: 'smooth' });
        };
        document.getElementById(prevBtnId).addEventListener('click', () => scroll('prev'));
        document.getElementById(nextBtnId).addEventListener('click', () => scroll('next'));
    };
    initSectionCarousel('productsContainer', 'scrollPrev', 'scrollNext');
    initSectionCarousel('cupsContainer', 'scrollPrevCups', 'scrollNextCups');
    initSectionCarousel('giftsContainer', 'scrollPrevGifts', 'scrollNextGifts');
}

function initFloatingCart() {
    const floatingCart = document.getElementById('floatingCart');
    floatingCart.addEventListener('click', () => cartModal.classList.add('active'));

    window.updateFloatingCart = () => {
        const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
        if (totalCount > 0) {
            document.getElementById('floatingItemCount').textContent = totalCount;
            document.getElementById('floatingItemText').textContent = totalCount === 1 ? texts.floatingItem : texts.floatingItems;
            document.getElementById('floatingTotalPrice').textContent = `د.أ ${cart.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2)}`;
            floatingCart.classList.add('active');
        } else {
            floatingCart.classList.remove('active');
        }
    };
}

function resetCarouselScrolls() {
    document.querySelectorAll('.products-grid').forEach(container => {
        container.scrollLeft = document.documentElement.dir === 'rtl' ? container.scrollWidth : 0;
    });
}

function handleProductClick(e) {
    const favoriteBtn = e.target.closest('.favorite-btn');
    if (favoriteBtn) {
        toggleFavorite(parseInt(favoriteBtn.dataset.id));
        return;
    }
    const productCard = e.target.closest('.product-card');
    if (productCard && !e.target.closest('.add-to-cart')) {
        const id = productCard.querySelector('.add-to-cart')?.dataset.id;
        if (id) showProductDetails(parseInt(id));
    }
}

function initStore() {
    initThemeToggle();
    
    cart = loadFromStorage('turfaCart', []);
    favorites = loadFromStorage('turfaFavorites', []);

    renderAllSections();
    updateCartUI();
    updateFavoritesUI();
    
    // Modals
    const setupModal = (modalId, openBtnId, closeBtnId) => {
        const modal = document.getElementById(modalId);
        const openBtn = document.getElementById(openBtnId);
        const closeBtn = document.getElementById(closeBtnId);
        if (openBtn) openBtn.addEventListener('click', () => {
            if(modalId === 'favoritesModal') renderFavoritesModal();
            modal.classList.add('active');
        });
        if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
        if (modal) modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    };
    setupModal('cartModal', 'cartIcon', 'closeCart');
    setupModal('favoritesModal', 'favoritesIcon', 'closeFavorites');
    setupModal('productDetailModal', null, 'closeDetail');

    // Event Listeners
    document.getElementById('lang-toggle').addEventListener('change', toggleLanguage);
    checkoutBtn.addEventListener('click', proceedToCheckout);
    [productsContainer, cupsContainer, giftsContainer].forEach(container => {
        container.addEventListener('click', handleProductClick);
    });

    // Final Setup
    renderFooterLinks();
    initCarouselControls();
    initSearch(); 
    initFloatingCart();
    resetCarouselScrolls();
}

document.addEventListener('DOMContentLoaded', initStore);

document.addEventListener('DOMContentLoaded', () => {
  // 1) تشغيل تأثير الدخول
  const heroInner = document.querySelector('.hero-inner');
  if (heroInner) heroInner.classList.add('enter');

  // 2) Tilt خفيف حسب حركة الماوس داخل البوكس
  const MAX_TILT = 4; // درجات الميل القصوى
  if (heroInner) {
    heroInner.classList.add('hover-tilt');
    heroInner.addEventListener('mousemove', (e) => {
      const r = heroInner.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      const rotX = (-dy * MAX_TILT).toFixed(2);
      const rotY = ( dx * MAX_TILT).toFixed(2);
      heroInner.style.transform = `translateY(-8px) scale(1.01) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    heroInner.addEventListener('mouseleave', () => {
      heroInner.classList.add('leave');
      heroInner.style.transform = `translateY(-2px) scale(1.005) rotateX(0deg) rotateY(0deg)`;
      setTimeout(() => heroInner.classList.remove('leave'), 300);
    });
  }
});
