// =================================================================
// --- 1. LANGUAGE & TRANSLATION DATA ---
// =================================================================
const arabicTexts = {
    title: "لوحاتنا",
    cupsTitle: "كاساتنا",
    addToCart: "أضف إلى العربة",
    added: "تمت الإضافة!",
    yourCart: "عربتك",
    close: "إغلاق",
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
    footerCopyright: "&copy; 2025 متجر الترفة. جميع الحقوق محفوظة.",
    footerContact: "تواصل معنا",
    footerSocial: "تابعنا على منصات التواصل الاجتماعي",
    footerAbout: "عن الموقع",
    footerCategories: "الفئات",
    footerCollections: "مجموعات",
    banner: "✨ أحدث اللوحات الفنية! تسوق الآن! ✨",
    whatsappGreeting: "مرحباً متجر الترفة! أود طلب الآتي:\n\n",
    whatsappTotal: "\nالإجمالي:",
    whatsappThanks: "\n\نشكراً لك!",
    langButton: "English",
    yourFavorites: "منتجاتك المفضلة",
    emptyFavorites: "قائمة المفضلة فارغة",
    emptyFavoritesSub: "أضف منتجات تعجبك لحفظها هنا",
    favoritesFooter: "انقر على زر الإضافة للعربة أو إزالة المنتج من المفضلة.",
    detailTitle: "تفاصيل المنتج", 
    detailFullDescription: "الوصف الكامل:", 
};

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

const footerLinksArabic = {
    contact: [
        { text: "+962 7 8848 9914", icon: "fas fa-phone", link: "tel:+962788489914" },
        { text: "info@turfa.com", icon: "fas fa-envelope", link: "mailto:info@turfastore.com" }
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

// =================================================================
// --- 2. PRODUCT DATA ---
// =================================================================
const paintingsEnglish = [
    { id: 1, name: "Abstract Landscape", price: 39.99, description: "A vibrant abstract painting of a mountain landscape. Printed on museum-quality canvas.", image: "images/1.png", category: "painting", hasSizes: true },
    { id: 2, name: "Geometric Sunset", price: 39.99, description: "Modern art featuring sharp geometric shapes and a warm sunset color palette.", image: "images/2.png", category: "painting", hasSizes: true },
    { id: 3, name: "Minimalist Portrait", price: 39.99, description: "A simple line-art portrait, perfect for minimalist decor. Framed in natural oak.", image: "images/3.png", category: "painting", hasSizes: true },
    { id: 4, name: "Ocean Wave", price: 59.99, description: "Detailed oil painting capturing the movement and power of a crashing ocean wave.", image: "images/4.png", category: "painting", hasSizes: true },
    { id: 5, name: "City Skyline", price: 24.99, description: "A striking black and white photography print of a famous city skyline at night.", image: "images/5.png", category: "painting", hasSizes: true },
    { id: 6, name: "Nature Sketch", price: 59.99, description: "Hand-drawn pencil sketch of forest ferns and foliage. Excellent texture.", image: "images/6.png", category: "painting", hasSizes: true }
];

const paintingsArabic = [
    { id: 1, name: "لوحة يا شام", price: 39.99, description: "تُجسد هذه اللوحة الفنية توليفة متوازنة بين الحداثة والتراث.", image: "images/1.png", category: "painting", hasSizes: true },
    { id: 2, name: "لوحة الحمدلله", price: 39.99, description: "فن حديث يتميز بأشكال هندسية حادة ولوحة ألوان دافئة.", image: "images/2.png", category: "painting", hasSizes: true },
    { id: 3, name: "بورتريه بسيط", price: 39.99, description: "صورة بسيطة مرسومة بخط واحد، مثالية للديكور البسيط.", image: "images/3.png", category: "painting", hasSizes: true },
    { id: 4, name: "موجة المحيط", price: 59.99, description: "لوحة زيتية مفصلة تجسد حركة وقوة موجة محيط متلاطمة.", image: "images/4.png", category: "painting", hasSizes: true },
    { id: 5, name: "أفق المدينة", price: 24.99, description: "صورة فوتوغرافية مذهلة باللونين الأبيض والأسود لأفق مدينة.", image: "images/5.png", category: "painting", hasSizes: true },
    { id: 6, name: "رسم طبيعي", price: 59.99, description: "رسم يدوي بالقلم الرصاص لسراخس وأوراق الشجر في الغابة.", image: "images/6.png", category: "painting", hasSizes: true }
];

const cupsEnglish = [
    { id: 101, name: "Ceramic Coffee Mug", price: 15.99, description: "Handmade ceramic coffee mug with unique glaze finish.", image: "images/cup1.png", category: "cup", hasSizes: false },
    { id: 102, name: "Travel Tumbler", price: 24.99, description: "Stainless steel insulated travel tumbler.", image: "images/cup2.png", category: "cup", hasSizes: false },
    { id: 103, name: "Glass Tea Cup Set", price: 34.99, description: "Elegant glass tea cup set of 4.", image: "images/cup3.png", category: "cup", hasSizes: false },
    { id: 104, name: "Artistic Espresso Cup", price: 12.99, description: "Small artistic espresso cup with hand-painted design.", image: "images/cup4.png", category: "cup", hasSizes: false },
    { id: 105, name: "Color Changing Mug", price: 19.99, description: "Magic color-changing mug that reveals design when hot.", image: "images/cup5.png", category: "cup", hasSizes: false },
    { id: 106, name: "Bamboo Eco Cup", price: 18.99, description: "Eco-friendly bamboo fiber cup with silicone lid.", image: "images/cup6.png", category: "cup", hasSizes: false }
];

const cupsArabic = [
    { id: 101, name: "كوب قهوة سيراميك", price: 15.99, description: "كوب قهوة من السيراميك مصنوع يدوياً بطلاء زجاجي فريد.", image: "images/cup1.png", category: "cup", hasSizes: false },
    { id: 102, name: "كوب سفر معزول", price: 24.99, description: "كوب سفر من الستانلس ستيل معزول.", image: "images/cup2.png", category: "cup", hasSizes: false },
    { id: 103, name: "طقم أكواب شاي زجاجية", price: 34.99, description: "طقم أنيق من 4 أكواب شاي زجاجية.", image: "images/cup3.png", category: "cup", hasSizes: false },
    { id: 104, name: "فنجان إسبريسو فني", price: 12.99, description: "فنجان إسبريسو صغير فني بتصميم مرسوم يدوياً.", image: "images/cup4.png", category: "cup", hasSizes: false },
    { id: 105, name: "كوب متغير اللون", price: 19.99, description: "كوب سحري يتغير لونه عند إضافة سائل ساخن.", image: "images/cup5.png", category: "cup", hasSizes: false },
    { id: 106, name: "كوب بامبو صديق للبيئة", price: 18.99, description: "كوب صديق للبيئة من ألياف الخيزران مع غطاء سيليكون.", image: "images/cup6.png", category: "cup", hasSizes: false }
];

const giftsEnglish = [
    { id: 201, name: "Wooden Keychain", price: 7.99, description: "Custom engraved keychain made from olive wood.", image: "images/gift1.png", category: "gift", hasSizes: false },
    { id: 202, name: "Leather Bookmark", price: 12.50, description: "Elegant bookmark made from genuine leather.", image: "images/gift2.png", category: "gift", hasSizes: false },
    { id: 203, name: "Scented Candle", price: 15.00, description: "Relaxing lavender-scented candle.", image: "images/gift3.png", category: "gift", hasSizes: false },
];

const giftsArabic = [
    { id: 201, name: "ميدالية مفاتيح خشبية", price: 7.99, description: "ميدالية مفاتيح مصنوعة من خشب الزيتون مع حفر حسب الطلب.", image: "images/gift1.png", category: "gift", hasSizes: false },
    { id: 202, name: "فاصل كتب جلدي", price: 12.50, description: "فاصل كتب أنيق مصنوع من الجلد الطبيعي.", image: "images/gift2.png", category: "gift", hasSizes: false },
    { id: 203, name: "شمعة معطرة", price: 15.00, description: "شمعة معطرة برائحة اللافندر تساعد على الاسترخاء.", image: "images/gift3.png", category: "gift", hasSizes: false },
];

let allProductsEnglish = [...paintingsEnglish, ...cupsEnglish, ...giftsEnglish];
let allProductsArabic = [...paintingsArabic, ...cupsArabic, ...giftsArabic];


// =================================================================
// --- 3. GLOBAL STATE & DOM ELEMENTS ---
// =================================================================
let currentLang = 'ar'; 
let products = allProductsArabic;
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

window.carouselUpdateFunctions = [];


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
// --- 5. RENDER, SEARCH, and DISPLAY FUNCTIONS ---
// =================================================================

function renderProductCards(container, productList) {
    if (!container) return;
    container.innerHTML = ''; 

    if (productList.length === 0) {
        container.innerHTML = `<div style="text-align: center; min-width: 100%; padding: 2rem 0;"><p style="color: #555;">${currentLang === 'ar' ? 'لا توجد نتائج تطابق بحثك.' : 'No products match your search.'}</p></div>`;
        return;
    }

    productList.forEach(product => {
        const isFav = favorites.includes(product.id);
        const buttonText = currentLang === 'ar' ? arabicTexts.addToCart : 'Add to Cart';
        const favIconClass = isFav ? 'fas fa-heart' : 'far fa-heart';
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        const hasSizesAttr = product.hasSizes ? 'true' : 'false';
        productCard.innerHTML = `<div class="product-image"><img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: contain;"></div><div class="product-info"><h3 class="product-title">${product.name}</h3><button class="favorite-btn ${isFav ? 'active' : ''}" data-id="${product.id}" title="${currentLang === 'ar' ? 'أضف للمفضلة' : 'Add to Favorites'}"><i class="${favIconClass}"></i></button><p class="product-description">${product.description.split('. ')[0] + '.'}</p><div class="product-price">د.أ ${product.price.toFixed(2)}</div><button class="add-to-cart" data-id="${product.id}" data-has-sizes="${hasSizesAttr}"><i class="fas fa-plus"></i> ${buttonText}</button></div>`;
        container.appendChild(productCard);
        productCard.querySelector('.add-to-cart').addEventListener('click', (e) => {
            e.stopPropagation(); 
            if (!product.hasSizes) {
                addToCart(product.id);
            }
            if (product.hasSizes) {
                showProductDetails(product.id);
            }
        });
    });
}

function renderProductSection(container, category, title, titleId) {
    const titleElement = document.getElementById(titleId);
    if (titleElement) {
        titleElement.textContent = title;
    }
    const categoryProducts = products.filter(p => p.category === category);
    renderProductCards(container, categoryProducts);
}

function renderPaintings() {
    renderProductSection(productsContainer, 'painting', currentLang === 'ar' ? 'لوحاتنا' : 'Our Paintings', 'paintingsTitle');
}

function renderCups() {
    renderProductSection(cupsContainer, 'cup', currentLang === 'ar' ? arabicTexts.cupsTitle : 'Our Cups', 'cupsTitle');
}

function renderGifts() {
    renderProductSection(giftsContainer, 'gift', currentLang === 'ar' ? 'هدايا منوعة' : 'Miscellaneous Gifts', 'giftsTitle');
}

function renderFavoritesModal() {
    const favoritesProducts = favorites.map(id => products.find(p => p.id === id)).filter(p => p);
    const favoritesTitle = document.getElementById('favoritesTitle');
    const favoritesItems = document.getElementById('favoritesItems');
    const footerTextElement = document.getElementById('favoritesFooterText');
    favoritesTitle.textContent = currentLang === 'ar' ? arabicTexts.yourFavorites : 'Your Favorites';
    if (favoritesProducts.length === 0) {
        favoritesItems.innerHTML = `<div class="empty-cart"><i class="far fa-heart"></i><h3>${currentLang === 'ar' ? arabicTexts.emptyFavorites : 'Your favorites list is empty'}</h3><p>${currentLang === 'ar' ? arabicTexts.emptyFavoritesSub : 'Add products you like to save them here'}</p></div>`;
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
        favItem.innerHTML = `<img src="${product.image}" alt="${product.name}" class="modal-item-img"><div class="item-details" style="flex: 2;"><div class="item-name">${product.name}</div><div class="item-price">د.أ ${product.price.toFixed(2)}</div></div><button class="add-to-cart" data-id="${product.id}" data-has-sizes="${product.hasSizes}" style="width: auto; padding: 0.5rem 1rem;"><i class="fas fa-shopping-cart"></i> ${buttonText}</button><button class="remove-item remove-fav-btn" data-id="${product.id}" style="font-size: 1.5rem;"><i class="fas fa-trash-alt"></i></button>`;
        favoritesItems.appendChild(favItem);
        const openDetails = () => {
            showProductDetails(product.id);
            favoritesModal.classList.remove('active');
        };
        favItem.querySelector('.item-name').addEventListener('click', openDetails);
        favItem.querySelector('.modal-item-img').addEventListener('click', openDetails);
        favItem.querySelector('.add-to-cart').addEventListener('click', (e) => {
            if (e.currentTarget.dataset.hasSizes === 'true') {
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
        const exists = await checkImageExists(imageUrl);
        if (exists) {
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
    const titleText = currentLang === 'ar' ? arabicTexts.detailTitle : 'Product Details';
    const buttonText = currentLang === 'ar' ? arabicTexts.addToCart : 'Add to Cart';
    const descriptionHeader = currentLang === 'ar' ? arabicTexts.detailFullDescription : 'Full Description:';
    const sizingData = currentLang === 'ar' ? arabicTexts.sizeOptions : [];
    let sizeOptionsHTML = '';
    if (product.hasSizes) {
        sizeOptionsHTML = `<div class="product-size-select"><label>${currentLang === 'ar' ? arabicTexts.selectSize : 'Select Size:'}</label><div class="size-options-container">${sizingData.map((size, index) => { const priceDisplay = index === 0 ? (currentLang === 'ar' ? 'السعر الأساسي' : 'Base Price') : `+ د.أ ${size.priceDiff.toFixed(2)}`; const sizeNameOnly = size.name.split('(')[0].trim(); return `<div class="size-option-box" data-index="${index}" data-pricediff="${size.priceDiff}"><span>${sizeNameOnly}</span><span class="size-price-diff">${priceDisplay}</span></div>`; }).join('')}</div></div>`;
    }
    detailPriceRow.innerHTML = `${sizeOptionsHTML}<span id="detailPrice" style="font-weight: 700; color: var(--secondary); font-size: 2rem; display: block; margin-bottom: 15px;">د.أ ${product.price.toFixed(2)}</span><button id="detailAddToCartBtnClone" class="add-to-cart" data-id="${product.id}" data-base-price="${product.price}" data-has-sizes="${product.hasSizes}" style="width: 100%; padding: 1rem;"><i class="fas fa-plus"></i> ${buttonText}</button>`;
    const updatedDetailPrice = document.getElementById('detailPrice');
    const finalAddToCartBtn = document.getElementById('detailAddToCartBtnClone');
    const sizeBoxes = detailPriceRow.querySelectorAll('.size-option-box');
    detailTitle.textContent = titleText;
    detailImage.src = product.image;
    detailImage.alt = product.name;
    detailName.textContent = product.name;
    updatedDetailPrice.textContent = `د.أ ${product.price.toFixed(2)}`;
    detailDescriptionShort.textContent = product.description.split('. ')[0] + '.'; 
    detailDescriptionFull.textContent = product.description; 
    detailDescriptionHeader.textContent = descriptionHeader;
    if (product.hasSizes) {
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
            sizeBoxes[0].classList.add('active');
            finalAddToCartBtn.dataset.selectedSizeIndex = '0';
            finalAddToCartBtn.dataset.selectedPrice = product.price;
        }
    }
    finalAddToCartBtn.addEventListener('click', (e) => {
        try {
            const productId = parseInt(e.currentTarget.dataset.id);
            const hasSizes = e.currentTarget.dataset.hasSizes === 'true';
            const basePrice = parseFloat(e.currentTarget.dataset.basePrice);
            let sizeIndex = null;
            let finalPrice = basePrice;
            if (hasSizes) {
                sizeIndex = e.currentTarget.dataset.selectedSizeIndex || '0';
                const selectedPrice = parseFloat(e.currentTarget.dataset.selectedPrice);
                if (!isNaN(selectedPrice)) {
                    finalPrice = selectedPrice;
                }
            }
            if (isNaN(finalPrice)) {
                console.error('Price is not a valid number. Aborting.');
                return; 
            }
            addToCart(productId, sizeIndex, finalPrice);
        } finally {
            document.getElementById('productDetailModal').classList.remove('active');
        }
    });
    const allImages = [product.image, ...dynamicGallery];
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
    document.getElementById('productDetailModal').classList.add('active');
}


// =================================================================
// --- 6. CORE LOGIC (Cart, Favorites, Language) ---
// =================================================================

function addToCart(productId, selectedSizeIndex = null, finalPrice = null) {
    const product = products.find(p => p.id === productId); 
    if (!product) return;
    const price = finalPrice !== null ? finalPrice : product.price;
    const cartItemId = selectedSizeIndex !== null ? `${productId}-${selectedSizeIndex}` : productId.toString();
    let sizeName = '';
    if (selectedSizeIndex !== null && product.hasSizes) {
        const sizingData = currentLang === 'ar' ? arabicTexts.sizeOptions : [];
        sizeName = sizingData[parseInt(selectedSizeIndex)] ? sizingData[parseInt(selectedSizeIndex)].name : '';
    }
    const existingItem = cart.find(item => item.id === cartItemId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: cartItemId, productId: product.id, name: product.name, price: price, quantity: 1, sizeName: sizeName });
    }
    saveCartToStorage();
    updateCartUI();
    updateFloatingCart();
    const btn = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
    if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = `<i class="fas fa-check"></i> ${currentLang === 'ar' ? arabicTexts.added : 'Added!'}`;
        btn.style.backgroundColor = '#28a745';
        setTimeout(() => {
            btn.innerHTML = originalText;
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
    if(cartModal.querySelector('.cart-header h2')) {
        cartModal.querySelector('.cart-header h2').textContent = yourCartText;
    }
    if (cart.length === 0) {
        cartItems.innerHTML = `<div class="empty-cart"><i class="fas fa-shopping-cart"></i><h3>${currentLang === 'ar' ? arabicTexts.emptyCart : 'Your cart is empty'}</h3><p>${currentLang === 'ar' ? arabicTexts.emptyCartSub : 'Add some products to your cart'}</p></div>`;
        totalPrice.textContent = 'د.أ 0.00';
        return;
    }
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const productForDisplay = products.find(p => p.id === item.productId) || item;
        const itemName = productForDisplay.name;
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const sizeDisplay = item.sizeName ? `<div style="font-size: 0.85rem; color: #777;">(${item.sizeName})</div>` : '';
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `<div class="item-details"><div class="item-name">${itemName} ${sizeDisplay}</div><div class="item-price">د.أ ${item.price.toFixed(2)}</div></div><div class="item-quantity"><button class="quantity-btn minus" data-id="${item.id}">-</button><span>${item.quantity}</span><button class="quantity-btn plus" data-id="${item.id}">+</button></div><button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>`;
        cartItems.appendChild(cartItem);
        cartItem.querySelector('.minus').addEventListener('click', () => updateQuantity(item.id, -1));
        cartItem.querySelector('.plus').addEventListener('click', () => updateQuantity(item.id, 1));
        cartItem.querySelector('.remove-item').addEventListener('click', () => removeFromCart(item.id));
    });
    totalPrice.textContent = `د.أ ${total.toFixed(2)}`;
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

function saveCartToStorage() {
    localStorage.setItem('turfaCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('turfaCart');
    if (savedCart) {
        try {
            const parsedCart = JSON.parse(savedCart);
            if (Array.isArray(parsedCart)) cart = parsedCart;
        } catch (error) {
            console.error("Could not load cart from storage:", error);
            cart = [];
        }
    }
}

function loadFavoritesFromStorage() {
    const savedFavorites = localStorage.getItem('turfaFavorites');
    if (savedFavorites) {
        try {
            const parsedFavorites = JSON.parse(savedFavorites);
            if (Array.isArray(parsedFavorites)) favorites = parsedFavorites;
        } catch (error) {
            console.error("Could not load favorites from storage:", error);
            favorites = [];
        }
    }
}

function proceedToCheckout() {
    if (cart.length === 0) return;
    let message = `${currentLang === 'ar' ? arabicTexts.whatsappGreeting : 'Hello Turfa Store! I would like to order:'}\n\n`;
    cart.forEach(item => {
        const productForOrder = allProductsEnglish.find(p => p.id === item.productId) || item; 
        const sizeDetail = item.sizeName ? ` (${item.sizeName})` : '';
        message += `- ${productForOrder.name}${sizeDetail} (x${item.quantity}) - JD ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `${currentLang === 'ar' ? arabicTexts.whatsappTotal : '\nTotal:'} JD ${total.toFixed(2)}${currentLang === 'ar' ? arabicTexts.whatsappThanks : '\n\nThank you!'}`;
    window.open(`https://wa.me/+962788489914?text=${encodeURIComponent(message)}`, '_blank');
}

function saveFavoritesToStorage() {
    localStorage.setItem('turfaFavorites', JSON.stringify(favorites));
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
    renderPaintings();
    renderCups();
    renderGifts();
}

function updateFavoritesUI() {
    favoritesCount.textContent = favorites.length;
    if (favorites.length > 0) {
        favoritesIcon.querySelector('i').className = 'fas fa-heart';
        favoritesCount.style.display = 'flex';
    } else {
        favoritesIcon.querySelector('i').className = 'far fa-heart';
        favoritesCount.style.display = 'none';
    }
}

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
    document.querySelector('.footer-col:nth-child(1) h3').textContent = currentLang === 'ar' ? arabicTexts.footerContact : 'Contact Us';
    document.querySelector('.footer-col:nth-child(2) h3').textContent = currentLang === 'ar' ? arabicTexts.footerAbout : 'About Website';
    document.querySelector('.footer-col:nth-child(3) h3').textContent = currentLang === 'ar' ? arabicTexts.footerCategories : 'Categories';
    document.querySelector('.footer-col:nth-child(4) h3').textContent = currentLang === 'ar' ? arabicTexts.footerCollections : 'Collections';
    document.querySelector('#footerCopyright').innerHTML = currentLang === 'ar' ? arabicTexts.footerCopyright : '&copy; 2025 Turfa Store. All rights reserved.';
    renderList(2, linksData.about);
    renderList(3, linksData.categories);
    renderList(4, linksData.collections);
}

function toggleLanguage() {
    const logoImage = document.getElementById('logoImage');
    const langToggleCheckbox = document.getElementById('lang-toggle');
    if (langToggleCheckbox.checked) {
        currentLang = 'en';
        document.documentElement.setAttribute('dir', 'ltr');
        if (logoImage) logoImage.src = 'icons/turfa_logo_en.png';
        products = allProductsEnglish;
    } else {
        currentLang = 'ar';
        document.documentElement.setAttribute('dir', 'rtl');
        if (logoImage) logoImage.src = 'icons/turfa_logo_ar.png';
        products = allProductsArabic;
    }
    renderFooterLinks();
    renderPaintings(); 
    renderCups();
    renderGifts();
    resetCarouselScrolls(); 
    updateCartUI();
    updateFloatingCart(); 
    if (window.updateSearchPlaceholder) window.updateSearchPlaceholder();
    window.carouselUpdateFunctions.forEach(func => func());
}


// =================================================================
// --- 7. INITIALIZATION & UI SETUP ---
// =================================================================

function initThemeToggle() {
    const themeToggle = document.getElementById('darkmode-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        themeToggle.checked = true;
    }
    themeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
}

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    const paintingsTitle = document.getElementById('paintingsTitle');
    const cupsTitle = document.getElementById('cupsTitle');
    const giftsTitle = document.getElementById('giftsTitle');
    const allGrids = document.querySelectorAll('.products-grid');
    const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const titles = [paintingsTitle, cupsTitle, giftsTitle];
        if (searchTerm === '') {
            titles.forEach(title => { if(title) title.style.display = 'block'; });
            allGrids.forEach(grid => {
                grid.style.flexWrap = 'nowrap';
                grid.style.overflowX = 'auto';
            });
            document.querySelectorAll('.carousel-control').forEach(btn => btn.style.display = '');
            renderPaintings();
            renderCups();
            renderGifts();
            initCarouselControls();
            resetCarouselScrolls();
            return;
        }
        const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm));
        const filteredPaintings = filteredProducts.filter(p => p.category === 'painting');
        const filteredCups = filteredProducts.filter(p => p.category === 'cup');
        const filteredGifts = filteredProducts.filter(p => p.category === 'gift');
        titles.forEach(title => { if(title) title.style.display = 'none'; });
        document.querySelectorAll('.carousel-control').forEach(btn => btn.style.display = 'none');
        allGrids.forEach(grid => {
            grid.style.flexWrap = 'wrap';
            grid.style.overflowX = 'visible';
        });
        renderProductCards(productsContainer, filteredPaintings);
        renderProductCards(cupsContainer, filteredCups);
        renderProductCards(giftsContainer, filteredGifts);
    };
    searchInput.addEventListener('input', performSearch);
    searchBtn.addEventListener('click', performSearch);
    window.updateSearchPlaceholder = () => {
        searchInput.placeholder = currentLang === 'ar' ? 'ابحث عن منتجك من هنا' : 'Search for your product here';
    };
    window.updateSearchPlaceholder();
}

function initCarouselControls() {
    window.carouselUpdateFunctions = []; 
    initSectionCarousel('productsContainer', 'scrollPrev', 'scrollNext');
    initSectionCarousel('cupsContainer', 'scrollPrevCups', 'scrollNextCups');
    initSectionCarousel('giftsContainer', 'scrollPrevGifts', 'scrollNextGifts');
}

function initSectionCarousel(containerId, prevBtnId, nextBtnId) {
    const scrollPrev = document.getElementById(prevBtnId);
    const scrollNext = document.getElementById(nextBtnId);
    const container = document.getElementById(containerId);
    if (!scrollPrev || !scrollNext || !container) return;
    const scroll = (direction) => {
        const scrollAmount = container.offsetWidth * 0.8;
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        const finalScroll = (direction === 'prev') ? (isRTL ? scrollAmount : -scrollAmount) : (isRTL ? -scrollAmount : scrollAmount);
        container.scrollBy({ left: finalScroll, behavior: 'smooth' });
    };
    scrollPrev.addEventListener('click', () => scroll('prev'));
    scrollNext.addEventListener('click', () => scroll('next'));
}

function initFloatingCart() {
    const floatingCart = document.getElementById('floatingCart');
    if (!floatingCart) return;
    floatingCart.addEventListener('click', () => cartModal.classList.add('active'));
    window.updateFloatingCart = () => {
        const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
        const totalPriceValue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (totalCount > 0) {
            document.getElementById('floatingItemCount').textContent = totalCount;
            document.getElementById('floatingItemText').textContent = totalCount === 1 ? (currentLang === 'ar' ? 'منتج' : 'item') : (currentLang === 'ar' ? 'منتجات' : 'items');
            document.getElementById('floatingTotalPrice').textContent = `د.أ ${totalPriceValue.toFixed(2)}`;
            floatingCart.classList.add('active');
        } else {
            floatingCart.classList.remove('active');
        }
    };
    updateFloatingCart();
}

function resetCarouselScrolls() {
    const containers = [productsContainer, cupsContainer, giftsContainer];
    containers.forEach(container => {
        if (container) {
            const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
            if (isRTL) {
                container.scrollLeft = container.scrollWidth; 
            } else {
                container.scrollLeft = 0;
            }
        }
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
        showProductDetails(parseInt(productCard.querySelector('.add-to-cart').dataset.id));
    }
}

function initStore() {
    const langToggleCheckbox = document.getElementById('lang-toggle');
    if (currentLang === 'en') {
        langToggleCheckbox.checked = true;
    }
    initThemeToggle();
    const logoImage = document.getElementById('logoImage');
    if (currentLang === 'ar') {
        if (logoImage) logoImage.src = 'icons/turfa_logo_ar.png';
    } else {
        if (logoImage) logoImage.src = 'icons/turfa_logo_en.png';
    }
    renderPaintings();
    renderCups();
    renderGifts();
    loadCartFromStorage();
    loadFavoritesFromStorage();
    updateCartUI();
    updateFavoritesUI();
    if (favorites.length === 0) favoritesCount.style.display = 'none';
    if (cart.length === 0) cartCount.style.display = 'none';
    cartIcon.addEventListener('click', () => cartModal.classList.add('active'));
    closeCart.addEventListener('click', () => cartModal.classList.remove('active'));
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });
    favoritesIcon.addEventListener('click', () => {
        favoritesModal.classList.add('active');
        renderFavoritesModal(); 
    });
    closeFavorites.addEventListener('click', () => favoritesModal.classList.remove('active'));
    favoritesModal.addEventListener('click', (e) => {
        if (e.target === favoritesModal) {
            favoritesModal.classList.remove('active');
        }
    });
    const productDetailModal = document.getElementById('productDetailModal');
    const closeDetail = document.getElementById('closeDetail');
    closeDetail.addEventListener('click', () => productDetailModal.classList.remove('active'));
    productDetailModal.addEventListener('click', (e) => {
        if (e.target === productDetailModal) {
            productDetailModal.classList.remove('active');
        }
    });
    const langToggle = document.getElementById('lang-toggle');
    langToggle.addEventListener('change', toggleLanguage);
    productsContainer.addEventListener('click', handleProductClick);
    cupsContainer.addEventListener('click', handleProductClick);
    giftsContainer.addEventListener('click', handleProductClick);
    checkoutBtn.addEventListener('click', proceedToCheckout);
    renderFooterLinks();
    initCarouselControls();
    initSearch(); 
    initFloatingCart();
    resetCarouselScrolls();
}

document.addEventListener('DOMContentLoaded', initStore);
