// --- 1. LANGUAGE/TRANSLATION DATA ---
const arabicTexts = {
    title: "لوحاتنا", // **تم التعديل: لوحاتنا**
    addToCart: "أضف إلى العربة",
    added: "تمت الإضافة!",
    yourCart: "عربتك",
    close: "إغلاق",
    total: "الإجمالي:",
    checkout: "متابعة الشراء عبر واتساب",
    emptyCart: "عربتك فارغة",
    emptyCartSub: "أضف بعض المنتجات إلى عربتك",
    
    // --- Footer Translations ---
    footerCopyright: "&copy; 2025 متجر الترفة. جميع الحقوق محفوظة.",
    footerContact: "تواصل معنا",
    footerSocial: "تابعنا على منصات التواصل الاجتماعي",
    footerAbout: "عن الموقع",
    footerCategories: "الفئات",
    footerCollections: "مجموعات",
    
    banner: "✨ أحدث اللوحات الفنية! تسوق الآن! ✨",
    logo: "متجر الترفة", 
    whatsappGreeting: "مرحباً متجر الترفة! أود طلب الآتي:\n\n",
    whatsappTotal: "\nالإجمالي:",
    whatsappThanks: "\n\nشكراً لك!",
    langButton: "English",
    yourFavorites: "منتجاتك المفضلة",
    emptyFavorites: "قائمة المفضلة فارغة",
    emptyFavoritesSub: "أضف منتجات تعجبك لحفظها هنا",
    favoritesFooter: "انقر على زر الإضافة للعربة أو إزالة المنتج من المفضلة.",
    detailTitle: "تفاصيل اللوحة", 
    detailFullDescription: "الوصف الكامل:", 
};

// English Footer Links (تم حذف الفئات: Kitchen, Presents, Eco, Ent, Corp)
const footerLinksEnglish = {
    contact: [
        { text: "+962 7 9700 5992", icon: "fas fa-phone", link: "tel:+962797005992" },
        { text: "info@turfastore.com", icon: "fas fa-envelope", link: "mailto:info@turfastore.com" }
    ],
    about: [
        { text: "About Turfa Souq", icon: "fas fa-chevron-right", link: "#" },
        { text: "Create Your Shop", icon: "fas fa-chevron-right", link: "#" },
        { text: "Contact Us", icon: "fas fa-chevron-right", link: "#" },
        { text: "FAQs (Jordan)", icon: "fas fa-chevron-right", link: "#" },
        { text: "FAQs (Sellers)", icon: "fas fa-chevron-right", link: "#" },
        { text: "Privacy Policy", icon: "fas fa-chevron-right", link: "#" },
        { text: "Return Policy", icon: "fas fa-chevron-right", link: "#" },
        { text: "Shipping", icon: "fas fa-chevron-right", link: "#" },
        { text: "Commission", icon: "fas fa-chevron-right", link: "#" }
    ],
    categories: [
        { text: "Gifts", icon: "fas fa-chevron-right", link: "#" },
        { text: "Beauty & Personal Care", icon: "fas fa-chevron-right", link: "#" },
        { text: "Accessories & Jewelry", icon: "fas fa-chevron-right", link: "#" },
        { text: "Home Decor", icon: "fas fa-chevron-right", link: "#" },
        { text: "Stationery", icon: "fas fa-chevron-right", link: "#" },
        { text: "Apparel", icon: "fas fa-chevron-right", link: "#" }
    ],
    collections: [
        { text: "Shop Handmade Gifts", icon: "fas fa-chevron-right", link: "#" },
        { text: "Men's Handmade Gifts", icon: "fas fa-chevron-right", link: "#" },
        { text: "Women's Unique Handmade Gifts", icon: "fas fa-chevron-right", link: "#" },
        { text: "Valentine's Day Gifts", icon: "fas fa-chevron-right", link: "#" },
        { text: "Mother's Day Gifts", icon: "fas fa-chevron-right", link: "#" },
        { text: "Ramadan Products", icon: "fas fa-chevron-right", link: "#" }
    ]
};

// Arabic Footer Links 
const footerLinksArabic = {
    contact: [
        { text: "+962 7 9700 5992", icon: "fas fa-phone", link: "tel:+962797005992" },
        { text: "info@turfastore.com", icon: "fas fa-envelope", link: "mailto:info@turfastore.com" }
    ],
    about: [
        { text: "حول سوق ترفة", icon: "fas fa-chevron-right", link: "#" },
        { text: "أنشئ متجرك الخاص", icon: "fas fa-chevron-right", link: "#" },
        { text: "تواصل معنا", icon: "fas fa-chevron-right", link: "#" },
        { text: "الأسئلة الأكثر شيوعاً (للأردن)", icon: "fas fa-chevron-right", link: "#" },
        { text: "الأسئلة الأكثر شيوعاً (للبائعين)", icon: "fas fa-chevron-right", link: "#" },
        { text: "الخصوصية", icon: "fas fa-chevron-right", link: "#" },
        { text: "سياسة الترجيح والاستبدال", icon: "fas fa-chevron-right", link: "#" },
        { text: "الشحن", icon: "fas fa-chevron-right", link: "#" },
        { text: "العمولة", icon: "fas fa-chevron-right", link: "#" }
    ],
    categories: [
        { text: "هدايا", icon: "fas fa-chevron-right", link: "#" },
        { text: "الجمال والعناية الشخصية", icon: "fas fa-chevron-right", link: "#" },
        { text: "اكسسوارات ومجوهرات", icon: "fas fa-chevron-right", link: "#" },
        { text: "زينة وديكور المنزل", icon: "fas fa-chevron-right", link: "#" },
        { text: "أدوات مكتبية", icon: "fas fa-chevron-right", link: "#" },
        { text: "الملابس", icon: "fas fa-chevron-right", link: "#" }
    ],
    collections: [
        { text: "تسوق الهدايا المصنوعة يدوياً", icon: "fas fa-chevron-right", link: "#" },
        { text: "هدايا رجالية مصنوعة يدوياً", icon: "fas fa-chevron-right", link: "#" },
        { text: "هدايا مميزة مصنوعة يدوياً للإناث", icon: "fas fa-chevron-right", link: "#" },
        { text: "هدايا عيد الحب", icon: "fas fa-chevron-right", link: "#" },
        { text: "هدايا عيد الأم", icon: "fas fa-chevron-right", link: "#" },
        { text: "منتجات رمضانية", icon: "fas fa-chevron-right", link: "#" }
    ]
};

// --- 2. PRODUCT DATA (مع المنتجات المسترجعة ومعرض الصور) ---
const productsEnglish = [
    { id: 1, name: "Abstract Landscape", price: 129.99, description: "A vibrant abstract painting of a mountain landscape. Printed on museum-quality canvas.", image: "images/1.png", gallery: ["images/1b.png", "images/1c.png"] },
    { id: 2, name: "Geometric Sunset", price: 199.99, description: "Modern art featuring sharp geometric shapes and a warm sunset color palette.", image: "images/2.png", gallery: ["images/2b.png"] },
    { id: 3, name: "Minimalist Portrait", price: 39.99, description: "A simple line-art portrait, perfect for minimalist decor. Framed in natural oak.", image: "images/3.png", gallery: [] },
    { id: 4, name: "Ocean Wave", price: 89.99, description: "Detailed oil painting capturing the movement and power of a crashing ocean wave.", image: "images/4.png", gallery: [] },
    { id: 5, name: "City Skyline", price: 24.99, description: "A striking black and white photography print of a famous city skyline at night.", image: "images/5.png", gallery: [] },
    { id: 6, name: "Nature Sketch", price: 59.99, description: "Hand-drawn pencil sketch of forest ferns and foliage. Excellent texture.", image: "images/6.png", gallery: [] }
];

const productsArabic = [
    { id: 1, name: "منظر طبيعي تجريدي", price: 129.99, description: "لوحة تجريدية نابضة بالحياة لمنظر جبلي. مطبوعة على قماش بجودة المتاحف.", image: "images/1.png", gallery: ["images/1b.png", "images/1c.png"] },
    { id: 2, name: "غروب هندسي", price: 199.99, description: "فن حديث يتميز بأشكال هندسية حادة ولوحة ألوان دافئة لغروب الشمس.", image: "images/2.png", gallery: ["images/2b.png"] },
    { id: 3, name: "بورتريه بسيط", price: 39.99, description: "صورة بسيطة مرسومة بخط واحد، مثالية للديكور البسيط. مؤطرة بخشب البلوط الطبيعي.", image: "images/3.png", gallery: [] },
    { id: 4, name: "موجة المحيط", price: 89.99, description: "لوحة زيتية مفصلة تجسد حركة وقوة موجة محيط متلاطمة.", image: "images/4.png", gallery: [] },
    { id: 5, name: "أفق المدينة", price: 24.99, description: "صورة فوتوغرافية مذهلة باللونين الأبيض والأسود لأفق مدينة شهيرة ليلاً.", image: "images/5.png", gallery: [] },
    { id: 6, name: "رسم طبيعي", price: 59.99, description: "رسم يدوي بالقلم الرصاص لسراخس وأوراق الشجر في الغابة. نسيج ممتاز.", image: "images/6.png", gallery: [] }
];

// --- 3. GLOBAL STATE & DOM ELEMENTS ---
let currentLang = 'en';
let products = productsEnglish;
let cart = [];
let favorites = []; 

// تعريف العناصر الرئيسية (للوصول إليها داخل الدوال)
const productsContainer = document.getElementById('productsContainer');
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const productsGrid = document.getElementById('productsContainer'); 
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const totalPrice = document.getElementById('totalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');
const favoritesIcon = document.getElementById('favoritesIcon');
const favoritesModal = document.getElementById('favoritesModal');
const favoritesCount = document.getElementById('favoritesCount');
const closeFavorites = document.getElementById('closeFavorites');
const favoritesItems = document.getElementById('favoritesItems');


// --- 5. INITIALIZATION ---
function initStore() {
    renderProducts();
    loadCartFromStorage();
    loadFavoritesFromStorage();
    updateCartUI();
    updateFavoritesUI();
    
    // إخفاء العدادات عند التحميل إذا كانت فارغة
    if (favorites.length === 0) favoritesCount.style.display = 'none';
    if (cart.length === 0) cartCount.style.display = 'none';

    cartIcon.addEventListener('click', () => cartModal.classList.add('active'));
    closeCart.addEventListener('click', () => cartModal.classList.remove('active'));
    checkoutBtn.addEventListener('click', proceedToCheckout);

    // مستمعات المفضلة
    favoritesIcon.addEventListener('click', () => {
        favoritesModal.classList.add('active');
        renderFavoritesModal(); 
    });
    closeFavorites.addEventListener('click', () => favoritesModal.classList.remove('active'));
    favoritesModal.addEventListener('click', (e) => {
        if (e.target === favoritesModal) favoritesModal.classList.remove('active');
    });

    // مستمعات تفاصيل المنتج
    const productDetailModal = document.getElementById('productDetailModal');
    const closeDetail = document.getElementById('closeDetail');
    const detailAddToCartBtn = document.getElementById('detailAddToCartBtn');
    
    closeDetail.addEventListener('click', () => productDetailModal.classList.remove('active'));
    productDetailModal.addEventListener('click', (e) => {
        if (e.target === productDetailModal) productDetailModal.classList.remove('active');
    });

    // مستمع لزر الإضافة للعربة داخل نافذة التفاصيل
    detailAddToCartBtn.addEventListener('click', (e) => {
        const productId = parseInt(e.currentTarget.dataset.id);
        addToCart(productId);
        productDetailModal.classList.remove('active');
    });

    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) cartModal.classList.remove('active');
    });

    const langToggle = document.getElementById('langToggle');
    langToggle.addEventListener('click', toggleLanguage);
    
    // مستمع عام للضغط على أزرار المفضلة في الشبكة الرئيسية
    productsContainer.addEventListener('click', (e) => {
        // المفضلة
        if (e.target.closest('.favorite-btn')) {
            const productId = parseInt(e.target.closest('.favorite-btn').dataset.id);
            toggleFavorite(productId);
        }
        // تفاصيل المنتج (النقر على البطاقة عدا الأزرار)
        const productCard = e.target.closest('.product-card');
        if (productCard && !e.target.closest('.add-to-cart') && !e.target.closest('.favorite-btn')) {
            const productId = parseInt(productCard.querySelector('.add-to-cart').dataset.id);
            showProductDetails(productId);
        }
    });
    
    // تهيئة روابط التذييل عند التحميل
    renderFooterLinks();
    
    // **تشغيل أزرار التمرير** ✨
    initCarouselControls();
    initSearch();
    initFloatingCart();

}

// دالة جديدة لرسم روابط التذييل حسب اللغة
function renderFooterLinks() {
    const linksData = currentLang === 'ar' ? footerLinksArabic : footerLinksEnglish;
    
    const renderList = (colId, data) => {
        const ul = document.querySelector(`.footer-col:nth-child(${colId}) ul`);
        if (!ul) return;
        ul.innerHTML = '';
        data.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="${item.icon}"></i><a href="${item.link}">${item.text}</a>`;
            ul.appendChild(li);
        });
    };

    // تحديث عناوين الأعمدة
    document.querySelector('.footer-col:nth-child(1) h3').textContent = currentLang === 'ar' ? arabicTexts.footerContact : 'Contact Us';
    document.querySelector('.footer-col:nth-child(2) h3').textContent = currentLang === 'ar' ? arabicTexts.footerAbout : 'About Website';
    document.querySelector('.footer-col:nth-child(3) h3').textContent = currentLang === 'ar' ? arabicTexts.footerCategories : 'Categories';
    document.querySelector('.footer-col:nth-child(4) h3').textContent = currentLang === 'ar' ? arabicTexts.footerCollections : 'Collections';
    document.querySelector('#footerCopyright').innerHTML = currentLang === 'ar' ? arabicTexts.footerCopyright : '&copy; 2025 Turfa Store. All rights reserved.';
    
    // تحديث الروابط
    // العمود 2: عن الموقع
    renderList(2, linksData.about);
    
    // العمود 3: الفئات
    renderList(3, linksData.categories);
    
    // العمود 4: المجموعات
    renderList(4, linksData.collections);
}

// --- 6. RENDER FUNCTIONS ---
function renderProducts() {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = '';
    
    // *** التعديل: تطبيق العنوان الجديد ***
    const mainTitleElement = document.querySelector('.section-title');
    if (mainTitleElement) {
        mainTitleElement.textContent = (currentLang === 'ar') ? 'لوحاتنا' : 'Our Paintings';
    }
    
    if (products.length === 0) {
        // رسالة في حالة عدم وجود منتجات
        productsContainer.innerHTML = `
            <div style="text-align: center; min-width: 100%; padding: 4rem 0;">
                <h2 style="color: var(--primary);">
                    ${currentLang === 'ar' ? 'لا توجد لوحات للعرض حالياً.' : 'No paintings available to display.'}
                </h2>
                <p style="color: #777; margin-top: 10px;">
                    ${currentLang === 'ar' ? 'يرجى إضافة المنتجات إلى قائمة المنتجات (JavaScript).' : 'Please add products to the product list (JavaScript).'}</p>
            </div>
        `;
        return;
    }
    
    products.forEach(product => {
        const isFav = favorites.includes(product.id);
        const buttonText = currentLang === 'ar' ? arabicTexts.addToCart : 'Add to Cart';
        const favIconClass = isFav ? 'fas fa-heart' : 'far fa-heart';
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: contain;">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <button class="favorite-btn ${isFav ? 'active' : ''}" data-id="${product.id}" title="${currentLang === 'ar' ? 'أضف للمفضلة' : 'Add to Favorites'}">
                    <i class="${favIconClass}"></i> 
                </button>
                <p class="product-description">${product.description.split('. ')[0] + '.'}</p>
                <div class="product-price">د.أ ${product.price.toFixed(2)}</div>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-plus"></i> ${buttonText}
                </button>
            </div>
        `;
        productsContainer.appendChild(productCard);
        
        productCard.querySelector('.add-to-cart').addEventListener('click', (e) => {
            e.stopPropagation(); 
            addToCart(product.id);
        });
    });
}

// دالة جديدة لعرض قائمة المفضلة
function renderFavoritesModal() {
    const favoritesProducts = favorites.map(id => products.find(p => p.id === id)).filter(p => p);
    const favoritesTitle = document.getElementById('favoritesTitle');
    const favoritesItems = document.getElementById('favoritesItems');
    const footerTextElement = document.getElementById('favoritesFooterText');
    
    favoritesTitle.textContent = currentLang === 'ar' ? arabicTexts.yourFavorites : 'Your Favorites';
    
    if (favoritesProducts.length === 0) {
        const emptyText = currentLang === 'ar' ? arabicTexts.emptyFavorites : 'Your favorites list is empty';
        const emptySubText = currentLang === 'ar' ? arabicTexts.emptyFavoritesSub : 'Add products you like to save them here';
        
        favoritesItems.innerHTML = `
            <div class="empty-cart">
                <i class="far fa-heart"></i>
                <h3>${emptyText}</h3>
                <p>${emptySubText}</p>
            </div>
        `;
        footerTextElement.style.display = 'none';
        return;
    }
    
    favoritesItems.innerHTML = '';
    footerTextElement.style.display = 'block';
    footerTextElement.textContent = currentLang === 'ar' ? arabicTexts.favoritesFooter : 'Click on the Add to Cart button or remove the product from favorites.';

    favoritesProducts.forEach(product => {
        const buttonText = currentLang === 'ar' ? arabicTexts.addToCart : 'Add to Cart';
        
        const favItem = document.createElement('div');
        favItem.className = 'cart-item';
        favItem.innerHTML = `
            <div class="item-details" style="flex: 2;">
                <div class="item-name">${product.name}</div>
                <div class="item-price">د.أ ${product.price.toFixed(2)}</div>
            </div>
            <button class="add-to-cart" data-id="${product.id}" style="width: auto; padding: 0.5rem 1rem;">
                <i class="fas fa-shopping-cart"></i> ${buttonText}
            </button>
            <button class="remove-item remove-fav-btn" data-id="${product.id}" style="font-size: 1.5rem;">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        favoritesItems.appendChild(favItem);
        
        favItem.querySelector('.add-to-cart').addEventListener('click', () => {
            addToCart(product.id);
            favoritesModal.classList.remove('active'); 
        });
        favItem.querySelector('.remove-fav-btn').addEventListener('click', () => {
            toggleFavorite(product.id);
            renderFavoritesModal(); 
        });
    });
}

// دالة عرض تفاصيل المنتج (تم تصحيح الوصول للعناصر)
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // تعريف العناصر داخل الدالة لضمان الوصول
    const detailTitle = document.getElementById('detailTitle');
    const detailImage = document.getElementById('detailImage');
    const detailName = document.getElementById('detailName');
    const detailPrice = document.getElementById('detailPrice');
    
    // العناصر النصية الجديدة
    const detailDescriptionFull = document.getElementById('detailDescriptionFull');
    const detailDescriptionShort = document.getElementById('detailDescriptionShort');
    const detailDescriptionHeader = document.getElementById('detailDescriptionHeader');
    
    const detailAddToCartBtn = document.getElementById('detailAddToCartBtn');
    const thumbnailGallery = document.getElementById('thumbnailGallery');


    // تحديد نصوص الأزرار والعملة
    const titleText = currentLang === 'ar' ? arabicTexts.detailTitle : 'Product Details';
    const buttonText = currentLang === 'ar' ? arabicTexts.addToCart : 'Add to Cart';
    const descriptionHeader = currentLang === 'ar' ? 'الوصف الكامل:' : 'Full Description:';

    // ملء النافذة بالبيانات
    detailTitle.textContent = titleText;
    detailImage.src = product.image;
    detailImage.alt = product.name;
    detailName.textContent = product.name;
    detailPrice.textContent = `د.أ ${product.price.toFixed(2)}`;
    
    // تعبئة الوصف القصير والطويل
    const fullDescriptionSource = currentLang === 'ar' ? productsArabic.find(p => p.id === productId) : productsEnglish.find(p => p.id === productId);
    
    detailDescriptionShort.textContent = fullDescriptionSource.description.split('. ')[0] + '.'; 
    detailDescriptionFull.textContent = fullDescriptionSource.description; 
    detailDescriptionHeader.textContent = descriptionHeader;
    
    detailAddToCartBtn.innerHTML = `<i class="fas fa-plus"></i> ${buttonText}`;
    detailAddToCartBtn.dataset.id = product.id; 
    
    // --- 🌟 وظيفة إنشاء معرض الصور المصغر 🌟 ---
    const currentProductData = currentLang === 'ar' ? productsArabic.find(p => p.id === productId) : productsEnglish.find(p => p.id === productId);
    const allImages = [currentProductData.image, ...(currentProductData.gallery || [])];
    thumbnailGallery.innerHTML = ''; 

    allImages.forEach(src => {
        const thumb = document.createElement('img');
        thumb.src = src;
        thumb.className = 'thumbnail';
        
        thumb.addEventListener('click', () => {
            detailImage.src = src;
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
        
        thumbnailGallery.appendChild(thumb);
    });
    
    if (thumbnailGallery.firstChild) {
        thumbnailGallery.firstChild.classList.add('active');
    }

    // إظهار النافذة
    const productDetailModal = document.getElementById('productDetailModal');
    productDetailModal.classList.add('active');
}


// --- 7. CART FUNCTIONS (تم تعديل العملة) ---
function addToCart(productId) {
    const product = productsEnglish.find(p => p.id === productId); 
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
    }
    
    saveCartToStorage();
    updateCartUI();
    
    const btn = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
    const addedText = currentLang === 'ar' ? arabicTexts.added : 'Added!';
    const buttonText = currentLang === 'ar' ? arabicTexts.addToCart : 'Add to Cart';
    
    if (btn) {
        btn.innerHTML = `<i class="fas fa-check"></i> ${addedText}`;
        btn.style.backgroundColor = '#28a745';
        setTimeout(() => {
            btn.innerHTML = `<i class="fas fa-plus"></i> ${buttonText}`;
            btn.style.backgroundColor = '';
        }, 1500);
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const totalPrice = document.getElementById('totalPrice');
    const cartItems = document.getElementById('cartItems');

    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalCount;
    
    if (totalCount > 0) {
        cartCount.style.display = 'flex'; 
    } else {
        cartCount.style.display = 'none';
    }
    
    const yourCartText = currentLang === 'ar' ? arabicTexts.yourCart : 'Your Cart';
    document.querySelector('.cart-header h2').textContent = yourCartText;

    if (cart.length === 0) {
        const emptyText = currentLang === 'ar' ? arabicTexts.emptyCart : 'Your cart is empty';
        const emptySubText = currentLang === 'ar' ? arabicTexts.emptyCartSub : 'Add some products to your cart';
        
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>${emptyText}</h3>
                <p>${emptySubText}</p>
            </div>
        `;
        totalPrice.textContent = 'د.أ 0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
const productForDisplay = products.find(p => p.id === item.id);
        const itemName = productForDisplay ? productForDisplay.name : item.name;

        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-details">
                <div class="item-name">${itemName}</div>
                <div class="item-price">د.أ ${item.price.toFixed(2)}</div>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
            <button class="remove-item" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
        
        cartItem.querySelector('.minus').addEventListener('click', () => updateQuantity(item.id, -1));
        cartItem.querySelector('.plus').addEventListener('click', () => updateQuantity(item.id, 1));
        cartItem.querySelector('.remove-item').addEventListener('click', () => removeFromCart(item.id));
    });
    
    totalPrice.textContent = `د.أ ${total.toFixed(2)}`;
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    saveCartToStorage();
    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartUI();
}

function saveCartToStorage() {
    localStorage.setItem('turfaCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('turfaCart');
    if (savedCart) cart = JSON.parse(savedCart);
}

function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('turfaCart')) || []; // Ensure cart is loaded correctly
    
    if (cart.length === 0) {
        alert(currentLang === 'ar' ? 'عربتك فارغة!' : 'Your cart is empty!');
        return;
    }
    
    const greeting = currentLang === 'ar' ? arabicTexts.whatsappGreeting : 'Hello Turfa Store! I would like to order:\n\n';
    const totalText = currentLang === 'ar' ? arabicTexts.whatsappTotal : '\nTotal: ';
    const thanks = currentLang === 'ar' ? arabicTexts.whatsappThanks : '\n\nThank you!';
    const currency = 'JD'; 
    
    let message = greeting;

    cart.forEach(item => {
        const productForOrder = productsEnglish.find(p => p.id === item.id) || item; 
        message += `- ${productForOrder.name} (x${item.quantity}) - ${currency} ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `${totalText} ${currency} ${total.toFixed(2)}${thanks}`;
    
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '+962788489914';
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}


// --- 8. FAVORITES FUNCTIONS ---
function saveFavoritesToStorage() {
    localStorage.setItem('turfaFavorites', JSON.stringify(favorites));
}

function loadFavoritesFromStorage() {
    const savedFavorites = localStorage.getItem('turfaFavorites');
    if (savedFavorites) favorites = JSON.parse(savedFavorites);
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
    renderProducts(); 
}

function updateFavoritesUI() {
    const favoritesCount = document.getElementById('favoritesCount');
    const favoritesIcon = document.getElementById('favoritesIcon');

    favoritesCount.textContent = favorites.length;

    if (favorites.length > 0) {
        favoritesIcon.querySelector('i').className = 'fas fa-heart'; 
        favoritesCount.style.display = 'flex'; 
    } else {
        favoritesIcon.querySelector('i').className = 'far fa-heart';
        favoritesCount.style.display = 'none'; 
    }
}


// --- 9. LANGUAGE TOGGLE ---
function toggleLanguage() {
    const langToggle = document.getElementById('langToggle');
    const logoImage = document.getElementById('logoImage');
    
    if (currentLang === 'en') {
        currentLang = 'ar';
        document.documentElement.setAttribute('dir', 'rtl');
        document.querySelector('.section-title').textContent = arabicTexts.title;
        document.getElementById('checkoutBtn').innerHTML = `<i class="fab fa-whatsapp" style="font-size: 1.2rem;"></i> ${arabicTexts.checkout}`;
        langToggle.textContent = arabicTexts.langButton;
        document.querySelector('footer p:first-child').innerHTML = arabicTexts.footerCopyright;
        
        // تحديث البانر
        const banner = document.querySelector('.banner h2');
        if (banner) banner.textContent = arabicTexts.banner;
        
        // تحديث روابط التذييل
        renderFooterLinks();

        if (logoImage) logoImage.src = 'icons/turfa_logo_ar.png'; 

        products = productsArabic; 
        
    } else {
        currentLang = 'en';
        document.documentElement.setAttribute('dir', 'ltr');
        document.querySelector('.section-title').textContent = 'Our Paintings';
        document.getElementById('checkoutBtn').innerHTML = `<i class="fab fa-whatsapp"></i> Proceed to Checkout`;
        langToggle.textContent = 'العربية';
        document.querySelector('footer p:first-child').innerHTML = '&copy; 2025 Turfa Store. All rights reserved.';
        
        // تحديث البانر
        const banner = document.querySelector('.banner h2');
        if (banner) banner.textContent = '✨ NEW ARRIVALS! SHOP NOW! ✨';

        // تحديث روابط التذييل
        renderFooterLinks();
        
        if (logoImage) logoImage.src = 'icons/turfa_logo_en.png';
        
        products = productsEnglish;
        
    }
    
    renderProducts();
    updateCartUI();

}

// --- 10. CAROUSEL SCROLL CONTROLS ---
function initCarouselControls() {
    const scrollPrev = document.getElementById('scrollPrev');
    const scrollNext = document.getElementById('scrollNext');
    const productsGrid = document.getElementById('productsContainer');
    
    if (!scrollPrev || !scrollNext || !productsGrid) return;
    
    // الضغط على السهم اليسار (السابق)
    scrollPrev.addEventListener('click', () => {
        const scrollAmount = productsGrid.offsetWidth * 0.8; // تمرير 80% من عرض الشاشة
        productsGrid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // الضغط على السهم اليمين (التالي)
    scrollNext.addEventListener('click', () => {
        const scrollAmount = productsGrid.offsetWidth * 0.8;
        productsGrid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // إخفاء/إظهار الأسهم حسب موقع التمرير
    function updateArrowsVisibility() {
        const maxScroll = productsGrid.scrollWidth - productsGrid.clientWidth;
        
        // إخفاء السهم الأيسر إذا كنا في البداية
        if (productsGrid.scrollLeft <= 10) {
            scrollPrev.style.opacity = '0.3';
            scrollPrev.style.pointerEvents = 'none';
        } else {
            scrollPrev.style.opacity = '1';
            scrollPrev.style.pointerEvents = 'auto';
        }
        
        // إخفاء السهم الأيمن إذا كنا في النهاية
        if (productsGrid.scrollLeft >= maxScroll - 10) {
            scrollNext.style.opacity = '0.3';
            scrollNext.style.pointerEvents = 'none';
        } else {
            scrollNext.style.opacity = '1';
            scrollNext.style.pointerEvents = 'auto';
        }
    }
    
    // تحديث الأسهم عند التمرير
    productsGrid.addEventListener('scroll', updateArrowsVisibility);
    
    // تحديث الأسهم عند تحميل الصفحة
    updateArrowsVisibility();
}
// --- 11. SEARCH FUNCTIONALITY ---
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    if (!searchInput || !searchBtn) return;
    
    // تحديث placeholder حسب اللغة
    function updateSearchPlaceholder() {
        searchInput.placeholder = currentLang === 'ar' 
            ? 'ابحث عن منتجك من هنا' 
            : 'Search your product from here';
    }
    
    // وظيفة البحث
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            renderProducts(); // عرض كل المنتجات
            return;
        }
        
        // تصفية المنتجات
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        
        // عرض النتائج
        const productsContainer = document.getElementById('productsContainer');
        productsContainer.innerHTML = '';
        
        if (filteredProducts.length === 0) {
            const noResultsText = currentLang === 'ar' 
                ? 'لم يتم العثور على نتائج' 
                : 'No results found';
            const tryAgainText = currentLang === 'ar'
                ? 'حاول البحث بكلمات مختلفة'
                : 'Try searching with different keywords';
                
            productsContainer.innerHTML = `
                <div style="text-align: center; min-width: 100%; padding: 4rem 0;">
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--light-gray); margin-bottom: 1rem;"></i>
                    <h2 style="color: var(--primary);">${noResultsText}</h2>
                    <p style="color: #777; margin-top: 10px;">${tryAgainText}</p>
                </div>
            `;
            return;
        }
        
        // عرض المنتجات المفلترة
        filteredProducts.forEach(product => {
            const isFav = favorites.includes(product.id);
            const buttonText = currentLang === 'ar' ? arabicTexts.addToCart : 'Add to Cart';
            const favIconClass = isFav ? 'fas fa-heart' : 'far fa-heart';
            
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: contain;">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <button class="favorite-btn ${isFav ? 'active' : ''}" data-id="${product.id}" title="${currentLang === 'ar' ? 'أضف للمفضلة' : 'Add to Favorites'}">
                        <i class="${favIconClass}"></i> 
                    </button>
                    <p class="product-description">${product.description.split('. ')[0] + '.'}</p>
                    <div class="product-price">د.أ ${product.price.toFixed(2)}</div>
                    <button class="add-to-cart" data-id="${product.id}">
                        <i class="fas fa-plus"></i> ${buttonText}
                    </button>
                </div>
            `;
            productsContainer.appendChild(productCard);
            
            productCard.querySelector('.add-to-cart').addEventListener('click', (e) => {
                e.stopPropagation(); 
                addToCart(product.id);
            });
        });
    }
    
    // الضغط على زر البحث
    searchBtn.addEventListener('click', performSearch);
    
    // الضغط على Enter
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // البحث التلقائي أثناء الكتابة (اختياري)
    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim() === '') {
            renderProducts(); // إعادة عرض كل المنتجات
        }
    });
    
    updateSearchPlaceholder();
    
    // تحديث الـ placeholder عند تغيير اللغة
    window.updateSearchPlaceholder = updateSearchPlaceholder;
}

function updateFloatingCart() {
    const floatingCart = document.getElementById('floatingCart');
    const floatingItemCount = document.getElementById('floatingItemCount');
    const floatingItemText = document.getElementById('floatingItemText');
    const floatingTotalPrice = document.getElementById('floatingTotalPrice');
    
    if (!floatingCart) return;
    
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // تحديث النصوص
    floatingItemCount.textContent = totalCount;
    
    // تحديث النص حسب اللغة والعدد
    if (currentLang === 'ar') {
        floatingItemText.textContent = totalCount === 1 ? 'منتج' : 'منتجات';
        floatingTotalPrice.textContent = `${totalPrice.toFixed(2)} د.أ`;
    } else {
        floatingItemText.textContent = totalCount === 1 ? 'Item' : 'Items';
        floatingTotalPrice.textContent = `JD${totalPrice.toFixed(2)}`;
    }
    
    // إظهار أو إخفاء الصندوق
    if (totalCount > 0) {
        floatingCart.classList.add('active');
    } else {
        floatingCart.classList.remove('active');
    }
}

// إضافة حدث النقر على الصندوق العائم
function initFloatingCart() {
    const floatingCart = document.getElementById('floatingCart');
    
    if (!floatingCart) return;
    
    floatingCart.addEventListener('click', () => {
        cartModal.classList.add('active');
    });
}
document.addEventListener('DOMContentLoaded', initStore);