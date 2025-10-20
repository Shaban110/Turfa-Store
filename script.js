* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

:root {
    --primary: #002617;
    --primary-light: #003a24;
    --background: #fffeff;
    --text: #212529;
    --secondary: #d43b1a;
    --light-gray: #f0f0f0;
    --border: #e0e0e0;
    --footer-bg: #212529; 
    --footer-text: #ccc;
    --footer-link: #ffffff;
    --footer-icon-hover: #00b5ad; 
    --card-bg: #ffffff; /* <-- أضف هذا المتغير */
}

body {
    background-color: var(--background);
    color: var(--text);
    line-height: 1.6;
}

header {
    background-color: var(--primary);
    color: white;
    padding: 1rem 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
}

.header-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
}

.logo img {
    height: 50px; 
    max-width: 180px;
    object-fit: contain;
}

/* Search Container */
.search-container {
    display: flex;
    align-items: center;
    flex: 1;
    max-width: 600px;
    margin: 0 2rem;
    position: relative;
}

.search-input {
    width: 100%;
    padding: 0.75rem 3.5rem 0.75rem 1rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 0.95rem;
    transition: all 0.3s ease;
}

.search-input::placeholder {
    color: rgba(255, 255, 255, 0.7);
}

.search-input:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.5);
}

.search-btn {
    position: absolute;
    right: 5px;
    background: var(--secondary);
    border: none;
    padding: 0.6rem 1rem;
    border-radius: 6px;
    color: white;
    cursor: pointer;
    transition: background 0.3s ease;
}

.search-btn:hover {
    background: #b83216;
}

.search-btn i {
    font-size: 1rem;
}

/* WhatsApp Contact */
.whatsapp-contact {
    display: flex;
    align-items: center;
    gap: 8px;
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: background 0.3s ease;
    font-weight: 500;
}

.whatsapp-contact:hover {
    background: rgba(255, 255, 255, 0.1);
}

.whatsapp-contact i {
    font-size: 1.5rem;
    color: #25D366;
}

.whatsapp-contact span {
    font-size: 0.95rem;
}

/* RTL Support for Search */
[dir="rtl"] .search-input {
    padding: 0.75rem 1rem 0.75rem 3.5rem;
}

[dir="rtl"] .search-btn {
    right: auto;
    left: 5px;
}

.nav-icons {
    display: flex;
    align-items: center;
    gap: 15px;
}

.cart-icon {
    position: relative;
    cursor: pointer;
    font-size: 1.8rem;
}

.cart-count {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: var(--secondary);
    color: white;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    font-weight: bold;
}

main {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1.5rem;
}

/* Banner Animation and CSS */
@keyframes subtlePulse {
    0% { 
        transform: scale(1); 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
    50% { 
        transform: scale(1.005); 
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); 
    }
    100% { 
        transform: scale(1); 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
}

.banner {
    background-color: var(--secondary);
    color: white;
    padding: 1.5rem 0;
    margin-bottom: 2rem;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    animation: subtlePulse 3s infinite ease-in-out; 
}

.banner h2 {
    margin: 0;
    font-size: 2rem;
    letter-spacing: 2px;
}

.section-title {
    text-align: center;
    margin-bottom: 2rem;
    color: var(--primary);
    font-size: 2.2rem;
    position: relative;
}

.section-title::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: var(--primary);
    margin: 0.5rem auto;
    border-radius: 2px;
}

/* ---------------------------------- */
/* --- شريط المنتجات الأفقي (Carousel) --- */
/* ---------------------------------- */

.carousel-wrapper {
    position: relative;
    padding: 0 70px;
}

.carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    border: none;
    border-radius: 30%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    font-size: 1.2rem;
    z-index: 50; 
    transition: background-color 0.3s;
}

.carousel-control:hover {
    background-color: var(--secondary);
}

.carousel-control.prev {
    left: 10px;
}

.carousel-control.next {
    right: 10px;
}

.products-grid {
    display: flex;
    overflow-x: auto; 
    gap: 20px;
    padding-bottom: 20px;
    scroll-snap-type: x mandatory; 
    
    padding-left: 0; 
    padding-right: 0; 
    
    margin-left: 0; 
    margin-right: 0;
    width: 100%;

    -ms-overflow-style: none;
    scrollbar-width: none; 
}

.products-grid::-webkit-scrollbar {
    display: none;
}

.product-card {
    min-width: calc((100% - 60px) / 4);
    max-width: calc((100% - 60px) / 4);
    height: auto;
    scroll-snap-align: start; 

    background: var(--card-bg);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--border);
    cursor: pointer; 
}

.product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
}

.product-image {
    height: 200px;
    width: 100%;
    background: var(--light-gray);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 10px; 
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: contain; 
}

.product-info {
    padding: 1.5rem;
    position: relative; 
    min-height: 190px; 
}

.product-title {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    color: var(--text);
    max-height: 2.6rem; 
    overflow: hidden;
}

/* تنسيق زر المفضلة التكيفي حسب اللغة */
.favorite-btn {
    position: absolute;
    top: 15px;
    background: none;
    border: none;
    color: #ccc; 
    font-size: 1.4rem;
    cursor: pointer;
    transition: color 0.3s;
    padding: 5px;
    z-index: 10;
}

:not([dir="rtl"]) .favorite-btn {
    right: 15px;
    left: auto;
}

[dir="rtl"] .favorite-btn {
    left: 15px;
    right: auto;
}

.favorite-btn:hover {
    color: var(--secondary); 
}

.product-price {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--primary);
    margin: 0.8rem 0;
}

.product-description {
    color: #555;
    font-size: 0.95rem;
    margin-bottom: 1.2rem;
    min-height: 40px; 
    max-height: 40px;
    overflow: hidden; 
}

.add-to-cart {
    width: 100%;
    padding: 0.8rem;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
}

.add-to-cart:hover {
    background: var(--primary-light);
}

/* Cart & Favorites & Detail Modals */
.cart-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.cart-modal.active {
    opacity: 1;
    visibility: visible;
}

.cart-content {
    background: var(--card-bg);
    width: 90%;
    max-width: 500px;
    border-radius: 16px;
    overflow: hidden;
    transform: translateY(20px);
    transition: transform 0.4s ease;
    border: 1px solid var(--border);
    max-height: 90vh; 
    display: flex;
    flex-direction: column;
}

.cart-modal.active .cart-content {
    transform: translateY(0);
}

.cart-header {
    background: var(--primary);
    color: white;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.close-cart {
    background: none;
    border: none;
    color: white;
    font-size: 1.8rem;
    cursor: pointer;
}

.cart-items {
    max-height: 400px;
    overflow-y: auto;
    padding: 1.5rem;
}

/* تفاصيل المنتج: تمكين التمرير والتصميم */
.detail-scroll-content {
    flex-grow: 1; 
    overflow-y: auto; 
    padding: 0; 
}

/* تنسيق النافذة لتكون عمودية ومنظمة */
.detail-container {
    display: flex;
    flex-direction: column; 
    padding: 2rem;
}

#detailImageContainer {
    height: 350px; 
    width: 100%;
    background: var(--light-gray);
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 20px;
}

#detailImage {
    width: 100%;
    height: 100%;
    object-fit: contain; 
}

/* تنسيق شريط الصور المصغرة */
#thumbnailGallery {
    display: flex;
    gap: 10px; 
    margin-top: 15px;
    overflow-x: auto; 
    padding-bottom: 10px; 
    flex-shrink: 0;
}

.thumbnail {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.3s, border 0.3s;
    border: 2px solid transparent;
    flex-shrink: 0; 
}

.thumbnail.active {
    opacity: 1;
    border-color: var(--secondary); 
}

.detail-info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

/* --- هنا يتم التحكم في عناصر العربة --- */
.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border);
}

.cart-item:last-child {
    border-bottom: none;
}

.item-details {
    flex: 1;
}

.item-name {
    font-weight: 600;
    margin-bottom: 0.3rem;
}

.item-price {
    color: var(--primary);
    font-weight: 600;
}

.item-quantity {
    display: flex;
    align-items: center;
    gap: 10px;
}

.quantity-btn {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--light-gray);
    border: 1px solid var(--border);
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.remove-item {
    color: var(--secondary);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    margin-left: 10px;
}

.cart-footer {
    padding: 1.5rem;
    background: var(--background);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--border);
}

.total-price {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--primary);
}

.checkout-btn {
    background: var(--secondary);
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.checkout-btn:hover {
    background: #b83216;
}

.empty-cart {
    text-align: center;
    padding: 2rem;
    color: #777;
}

.empty-cart i {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: var(--light-gray);
}
/* ---------------------------------- */
/* --- FLOATING CART WIDGET --- */
/* ---------------------------------- */

.floating-cart-widget {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: var(--secondary);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 50px;
    box-shadow: 0 8px 25px rgba(212, 59, 26, 0.4);
    cursor: pointer;
    z-index: 999;
    transition: all 0.3s ease;
    display: none;
}

.floating-cart-widget.active {
    display: block;
    animation: slideInUp 0.4s ease;
}

.floating-cart-widget:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(212, 59, 26, 0.5);
}

.floating-cart-content {
    display: flex;
    align-items: center;
    gap: 15px;
}

.floating-cart-icon {
    font-size: 1.8rem;
    display: flex;
    align-items: center;
}

.floating-cart-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.floating-cart-items {
    font-size: 0.85rem;
    font-weight: 600;
    opacity: 0.95;
}

.floating-cart-price {
    font-size: 1.1rem;
    font-weight: 700;
}

/* Animation */
@keyframes slideInUp {
    from {
        transform: translateY(100px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* RTL Support */
[dir="rtl"] .floating-cart-widget {
    right: auto;
    left: 30px;
}

/* ---------------------------------- */
/* --- FOOTER: التذييل الجديد --- */
/* ---------------------------------- */

.footer-main {
    background-color: var(--footer-bg);
    color: var(--footer-text);
    padding: 3rem 2rem 1rem;
    margin-top: 3rem;
}

.footer-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    gap: 30px;
    padding-bottom: 2rem;
}

.footer-col h3 {
    color: var(--footer-link);
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
}

.footer-col ul {
    list-style: none;
}

.footer-col ul li {
    margin-bottom: 0.8rem;
    display: flex;
    align-items: center;
}

.footer-col ul li a {
    color: var(--footer-text);
    text-decoration: none;
    transition: color 0.3s;
    font-size: 0.9rem;
}

.footer-col ul li a:hover {
    color: var(--secondary);
}

.footer-col i {
    margin-inline-end: 10px; 
    color: var(--footer-text);
    min-width: 18px;
}

.social-icons a {
    display: inline-block;
    color: var(--footer-text);
    margin: 0 10px 10px 0;
    font-size: 1.2rem;
    transition: color 0.3s;
}

.social-icons a:hover {
    color: var(--footer-icon-hover);
}

.footer-bottom {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 1rem;
    border-top: 1px solid #333;
    text-align: center;
    font-size: 0.85rem;
    color: #888;
}

.app-links img {
    width: 120px;
    height: auto;
    margin-top: 10px;
    margin-inline-end: 10px;
    border-radius: 6px;
}

/* ---------------------------------- */
/* --- MEDIA QUERIES (الجوال) --- */
/* ---------------------------------- */

@media (max-width: 1024px) {
    .product-card {
        min-width: calc((100% - 40px) / 3);
        max-width: calc((100% - 40px) / 3);
    }
}

@media (max-width: 768px) {
    .header-container {
        flex-wrap: wrap;
    }
    
    .search-container {
        order: 3;
        width: 100%;
        max-width: 100%;
        margin: 1rem 0 0 0;
    }
    
    .whatsapp-contact span {
        display: none;
    }
    
    .whatsapp-contact i {
        font-size: 1.8rem;
    }

    .carousel-wrapper {
        padding: 0 50px;
    }
    
    .product-card {
        min-width: calc((100% - 20px) / 2);
        max-width: calc((100% - 20px) / 2);
    }

    .footer-container {
        grid-template-columns: repeat(2, 1fr); 
    }
    
    .category-nav {
        top: 48px; 
    }

    .detail-layout {
        flex-direction: column; 
    }
    .detail-image-column, .detail-info-column {
        min-width: 100%;
    }
    .detail-image-column {
        height: 350px; 
    }
    #detailImageContainer {
        height: 350px !important;
    }

    .detail-price-row {
        flex-direction: column;
        align-items: flex-start;
    }
    .detail-price-row button {
        width: 100% !important;
        margin-top: 15px;
    }

    .floating-cart-widget {
        bottom: 20px;
        right: 20px;
        padding: 0.8rem 1.2rem;
    }
    
    [dir="rtl"] .floating-cart-widget {
        right: auto;
        left: 20px;
    }
    
    .floating-cart-icon {
        font-size: 1.5rem;
    }
    
    .floating-cart-items {
        font-size: 0.75rem;
    }
    
    .floating-cart-price {
        font-size: 1rem;
    }
}

@media (max-width: 500px) {
    .nav-icons {
        gap: 8px;
    }
    
    .whatsapp-contact {
        padding: 0.3rem 0.5rem;
    }

    .carousel-wrapper {
        padding: 0 50px;
    }
    
    .product-card {
        min-width: 90%;
        max-width: 90%;
    }
    
    .footer-container {
        grid-template-columns: 1fr; 
    }

    .floating-cart-widget {
        bottom: 15px;
        right: 15px;
        padding: 0.7rem 1rem;
    }
    
    [dir="rtl"] .floating-cart-widget {
        right: auto;
        left: 15px;
    }
    
    .floating-cart-content {
        gap: 10px;
    }
}

/* --- Sizing Box Select Styles (التنسيق الجديد لخيارات الحجم) --- */

.product-size-select {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.product-size-select label {
    font-weight: 600;
    color: var(--text);
    font-size: 1rem;
}

/* حاوية الخيارات لتمكين 3 أعمدة متساوية */
.size-options-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 أعمدة متساوية */
    gap: 10px;
}

/* تنسيق البوكس الواحد (الزر) */
.size-option-box {
    text-align: center;
    padding: 0.8rem 0.5rem; /* لجعلها مثل الأزرار */
    border: 2px solid var(--border);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--text);
    background-color: var(--background); /* خلفية بيضاء */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 55px; 
}

.size-option-box:hover {
    border-color: var(--secondary);
    box-shadow: 0 0 5px rgba(212, 59, 26, 0.3);
}

/* تنسيق البوكس المختار (النشط) */
.size-option-box.active {
    border-color: var(--primary); /* إطار أخضر داكن */
    background-color: var(--primary);
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.size-option-box .size-price-diff {
    display: block;
    font-size: 0.8rem;
    margin-top: 4px;
    font-weight: 400;
    opacity: 0.9;
}

/* إخفاء القائمة المنسدلة (dropdown) التي نستخدمها لتخزين القيمة برمجياً في JS */
.size-select-dropdown {
    display: none !important; 
}


/* Media Query لتنسيق الجوال (بوكسين في الصف بدلاً من 3) */
@media (max-width: 500px) {
    .size-options-container {
        grid-template-columns: repeat(2, 1fr); /* بوكسين في الجوال */
    }
}
/* --- أنيميشن فرشاة الدهان للبانر --- */
.banner-animated {
    position: relative;
    background-color: transparent; /* نجعل الخلفية الأساسية شفافة */
    overflow: hidden;
    z-index: 1;
}

/* هذا العنصر هو الذي ينشئ الطبقة البرتقالية المتحركة */
.banner-animated::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--secondary); /* اللون البرتقالي المحدد في بداية ملفك */
    z-index: -1;
    
    /* إعدادات الأنيميشن */
    transform-origin: left;
    transform: scaleX(0);
    animation: paint-reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards;
}

/* تعريف الحركة: تكبير الطبقة البرتقالية من عرض 0% إلى 100% */
@keyframes paint-reveal {
    from {
        transform-origin: left;
        transform: scaleX(0);
    }
    to {
        transform-origin: left;
        transform: scaleX(1);
    }
}

/* تعديل الحركة لتعمل بشكل صحيح في اللغة العربية (من اليمين لليسار) */
[dir="rtl"] .banner-animated::before {
    transform-origin: right;
}

[dir="rtl"] @keyframes paint-reveal {
    from {
        transform-origin: right;
        transform: scaleX(0);
    }
    to {
        transform-origin: right;
        transform: scaleX(1);
    }
}

/* تأكد من أن النص يظهر فوق كل شيء */
.banner-animated h2 {
    position: relative;
    z-index: 2;
}
/* --- تعديلات نافذة المفضلة --- */

/* تنسيق الصورة المصغرة للمنتج داخل النافذة */
.modal-item-img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
    margin-inline-end: 15px; /* مسافة بين الصورة والنص */
    flex-shrink: 0;
    cursor: pointer; /* <-- أضف هذا السطر */
}

/* جعل اسم المنتج قابلاً للنقر مع تغيير لونه عند التمرير */
#favoritesModal .item-name {
    cursor: pointer;
    transition: color 0.2s ease-in-out;
}

#favoritesModal .item-name:hover {
    color: var(--secondary); /* اللون البرتقالي المميز للمتجر */
}
/* --- تلوين أيقونة القلب عند إضافتها للمفضلة --- */
.favorite-btn.active .fa-heart {
    color: #e23d28; /* لون أحمر جذاب */
}
/* =================================== */
/* --- الوضع الداكن (Dark Mode) --- */
/* =================================== */

html[data-theme='dark'] {
    --background: #121212;
    --text: #e0e0e0;
    --card-bg: #1e1e1e;
    --light-gray: #2a2a2a;
    --border: #333;
    --primary-light: #004d32;
}

/* تعديلات إضافية لتحسين الشكل في الوضع الداكن */
html[data-theme='dark'] .product-card {
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

html[data-theme='dark'] .product-title {
    color: #f5f5f5;
}

html[data-theme='dark'] .product-description {
    color: #a0a0a0;
}

html[data-theme='dark'] #detailImageContainer {
    background: #2a2a2a;
}
/* --- تنسيق زر الوضع الداكن (مع أيقونات) --- */
.theme-switch-wrapper {
    display: flex;
    align-items: center;
    margin-inline-end: 15px;
}

.theme-switch {
    display: inline-block;
    height: 34px;
    position: relative;
    width: 60px;
}

.theme-switch input {
    display: none;
}

.slider {
    background-color: #ccc;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: .4s;
    border-radius: 34px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2px;
}

.slider::before {
    content: "";
    position: absolute;
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
    z-index: 2;
}

/* الأيقونات نفسها */
.slider i {
    font-size: 14px;
    z-index: 1;
    transition: opacity 0.4s, color 0.4s;
    padding: 0 5px;
}

/* --- التعديل هنا --- */
.slider .fa-sun {
    opacity: 1;
    color: var(--secondary); /* اجعل لون الشمس برتقالياً */
}

.slider .fa-moon {
    opacity: 0;
    color: #fff; /* أبقِ لون القمر أبيضاً */
}
/* --- نهاية التعديل --- */


input:checked + .slider {
    background-color: var(--primary);
}

input:checked + .slider::before {
    transform: translateX(26px);
}

input:checked + .slider .fa-sun {
    opacity: 0;
}

input:checked + .slider .fa-moon {
    opacity: 1;
}
.slider.round {
    border-radius: 34px;
}
.slider.round:before {
    border-radius: 50%;
}
/* =================================== */
/* --- تحسينات الوضع الداكن للنصوص --- */
/* =================================== */

/* تغيير لون عنوان القسم "لوحاتنا" ليصبح فاتحاً */
html[data-theme='dark'] .section-title {
    color: #f0f0f0;
}

/* تغيير لون الخط السفلي لعنوان القسم ليطابقه */
html[data-theme='dark'] .section-title::after {
    background-color: #f0f0f0;
}

/* تغيير لون سعر المنتج ليصبح فاتحاً */
html[data-theme='dark'] .product-price {
    color: #f0f0f0;
}

/* تحسين لون وصف المنتج في الوضع الداكن */
html[data-theme='dark'] .product-description {
    color: #a0a0a0;
}

/* تحسين لون الإجمالي في نافذة العربة */
html[data-theme='dark'] .total-price {
    color: #f0f0f0;
}
/* =================================== */
/* --- تنسيق زر تبديل اللغة الجديد --- */
/* =================================== */
.language-switch-wrapper {
    display: flex;
    align-items: center;
    margin-inline-end: 15px;
}

.language-switch {
    position: relative;
    display: inline-block;
    width: 70px;
    height: 34px;
    cursor: pointer;
}

.language-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.lang-slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 34px;
    transition: .4s;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.lang-slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 32px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 26px;
    box-shadow: 0 0 4px rgba(0,0,0,0.2);
}

.lang-text {
    font-size: 12px;
    font-weight: bold;
    z-index: 1;
    transition: color 0.4s;
}
/* --- التعديل الصحيح لألوان النص --- */
.lang-text {
    font-size: 12px;
    font-weight: bold;
    z-index: 1;
    transition: color 0.4s;
}

/* الحالة الافتراضية (العربية مفعلة - الزر غير محدد) */
input:not(:checked) + .lang-slider .lang-ar {
    color: #ffffff; /* داكن */
}
input:not(:checked) + .lang-slider .lang-en {
    color: #ffffff; /* فاتح */
}

/* عند تفعيل الإنجليزية (الزر محدد) */
input:checked + .lang-slider .lang-ar {
    color: #fff; /* فاتح */
}
input:checked + .lang-slider .lang-en {
    color: #333; /* داكن */
}
/* --- نهاية التعديل الصحيح --- */
input:checked + .lang-slider:before {
    transform: translateX(33px);
}
