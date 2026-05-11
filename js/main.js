// =================================================================
// 🚀 main.js - نقطة البداية والإعدادات العامة
// -----------------------------------------------------------------
// يحتوي على:
//   • Global state (currentLang, products, cart, favorites...)
//   • DOM elements references
//   • Helper functions (checkImageExists)
//   • LocalStorage functions (save/load cart & favorites)
//   • initInfoModals() - ربط أحداث موديلات المعلومات والفوتر
//   • initStore() - الدالة الرئيسية لتشغيل المتجر
//   • Event listener: DOMContentLoaded
// =================================================================
// ⚠️ هذا الملف يجب أن يُحمّل بعد data.js و ui.js و modals.js

// =================================================================
// --- 3. GLOBAL STATE & DOM ELEMENTS ---
// =================================================================
let currentLang = 'ar'; 
let products = allProductsArabic;
let texts = arabicTexts;
let cart = [];
let favorites = []; 
let typewriter; // 🟢 متغير لحفظ الآلة الكاتبة

const productsContainer = document.getElementById('productsContainer');
const cupsContainer = document.getElementById('cupsContainer');
const prints3dContainer = document.getElementById('prints3dContainer');
const framesContainer = document.getElementById('framesContainer');
const giftsContainer = document.getElementById('giftsContainer');
const offersContainer = document.getElementById('offersContainer');
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
const scrollToTopBtn = document.getElementById('scrollToTopBtn'); // 🟢 سهم الصعود

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

// --- LOCAL STORAGE FUNCTIONS ---
const saveToStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const loadFromStorage = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
};
const saveCartToStorage = () => saveToStorage('turfaCart', cart);
const saveFavoritesToStorage = () => saveToStorage('turfaFavorites', favorites);

function initInfoModals() {
    // أزرار الإغلاق
    const closeAbout = document.getElementById('closeAbout');
    const closePrivacy = document.getElementById('closePrivacy');
    const closeComingSoon = document.getElementById('closeComingSoon');
    const closeContact = document.getElementById('closeContact');
    const aboutModal = document.getElementById('aboutModal');
    const privacyModal = document.getElementById('privacyModal');
    const comingSoonModal = document.getElementById('comingSoonModal');
    const contactModal = document.getElementById('contactModal');

    if (closeAbout && aboutModal) {
        closeAbout.addEventListener('click', () => aboutModal.classList.remove('active'));
        aboutModal.addEventListener('click', (e) => {
            if (e.target === aboutModal) aboutModal.classList.remove('active');
        });
    }
    if (closePrivacy && privacyModal) {
        closePrivacy.addEventListener('click', () => privacyModal.classList.remove('active'));
        privacyModal.addEventListener('click', (e) => {
            if (e.target === privacyModal) privacyModal.classList.remove('active');
        });
    }
    if (closeComingSoon && comingSoonModal) {
        closeComingSoon.addEventListener('click', () => comingSoonModal.classList.remove('active'));
        comingSoonModal.addEventListener('click', (e) => {
            if (e.target === comingSoonModal) comingSoonModal.classList.remove('active');
        });
    }
    if (closeContact && contactModal) {
        closeContact.addEventListener('click', () => contactModal.classList.remove('active'));
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) contactModal.classList.remove('active');
        });
    }

    // 🟢 ربط أزرار موديل عيد الزواج
    const weddingFormModal = document.getElementById('weddingFormModal');
    const closeWeddingFormBtn = document.getElementById('closeWeddingForm');
    const weddingCancelBtn = document.getElementById('weddingFormCancelBtn');
    const weddingSubmitBtn = document.getElementById('weddingFormSubmitBtn');

    if (closeWeddingFormBtn) closeWeddingFormBtn.addEventListener('click', closeWeddingForm);
    if (weddingCancelBtn) weddingCancelBtn.addEventListener('click', closeWeddingForm);
    if (weddingSubmitBtn) weddingSubmitBtn.addEventListener('click', submitWeddingForm);
    if (weddingFormModal) {
        weddingFormModal.addEventListener('click', (e) => {
            if (e.target === weddingFormModal) closeWeddingForm();
        });
    }

    // إزالة حالة الخطأ عند تعديل الحقل
    ['weddingInitial1', 'weddingInitial2'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => {
                el.classList.remove('field-error');
                const errorEl = document.getElementById('weddingFormErrorMsg');
                if (errorEl) errorEl.classList.remove('show');
            });
        }
    });

    // 🟢 ربط أحداث date picker
    const dateTrigger = document.getElementById('weddingDateTrigger');
    const dateConfirm = document.getElementById('weddingDateConfirm');
    const dateClear = document.getElementById('weddingDateClear');
    const datePicker = document.getElementById('weddingDatePicker');

    if (dateTrigger) {
        dateTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleWeddingDateDropdown();
        });
    }
    if (dateConfirm) {
        dateConfirm.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleWeddingDateDropdown(true);
        });
    }
    if (dateClear) {
        dateClear.addEventListener('click', (e) => {
            e.stopPropagation();
            _weddingDateState = { day: null, month: null, year: null };
            const wheels = ['weddingDayWheel', 'weddingMonthWheel', 'weddingYearWheel'];
            wheels.forEach(id => {
                const wheel = document.getElementById(id);
                if (wheel) wheel.querySelectorAll('.wedding-date-item.selected').forEach(b => b.classList.remove('selected'));
            });
            updateWeddingDateDisplay();
        });
    }
    // إغلاق dropdown عند الضغط خارجه
    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('weddingDateDropdown');
        if (!dropdown || !dropdown.classList.contains('open')) return;
        if (datePicker && !datePicker.contains(e.target)) {
            toggleWeddingDateDropdown(true);
        }
    });

    // ربط روابط الفوتر بفتح الموديلات
    // نستخدم event delegation على الفوتر لأن الروابط تنرندر ديناميكياً
    const footer = document.querySelector('.footer-main');
    if (footer) {
        footer.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;
            const href = link.getAttribute('href');
            if (href === '#about') {
                e.preventDefault();
                openInfoModal('about');
            } else if (href === '#privacy') {
                e.preventDefault();
                openInfoModal('privacy');
            } else if (href === '#contact') {
                e.preventDefault();
                openContactModal();
            } else if (href && href.startsWith('#coming-')) {
                e.preventDefault();
                const key = href.substring(1); // remove leading #
                openComingSoonModal(key);
            }
        });
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
        // هذا السطر يغلق النافذة عند النقر على الخلفية الشفافة (أي خارج محتوى النافذة)
        if (modal) modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    };
    setupModal('cartModal', 'cartIcon', 'closeCart');
    setupModal('favoritesModal', 'favoritesIcon', 'closeFavorites');
    setupModal('productDetailModal', null, 'closeDetail');
    
    // 🟢🟢🟢 إضافة سلوك إغلاق النافذة المنبثقة للعروض عند النقر خارجها 🟢🟢🟢
    const promoModal = document.getElementById('promoModal');
    if (promoModal) {
        promoModal.addEventListener('click', (e) => {
            // إغلاق النافذة فقط إذا كان النقر على عنصر الخلفية (أي خارج الـ .cart-content)
            if (e.target === promoModal) {
                promoModal.classList.remove('active');
            }
        });
    }
    // 🟢🟢🟢 نهاية إضافة السلوك 🟢🟢🟢

    // Event Listeners
    document.getElementById('lang-toggle').addEventListener('change', toggleLanguage);
    checkoutBtn.addEventListener('click', proceedToCheckout);

    // 🟢 ربط زر الاستفسار
    const inquiryBtn = document.getElementById('inquiryBtn');
    if (inquiryBtn) inquiryBtn.addEventListener('click', proceedToInquiry);

    // 🟢 ربط أزرار موديل تقديم الفنان
    const openArtistFormBtn = document.getElementById('openArtistFormBtn');
    const closeArtistFormBtn = document.getElementById('closeArtistForm');
    const artistFormCancelBtn = document.getElementById('artistFormCancelBtn');
    const artistFormSubmitBtn = document.getElementById('artistFormSubmitBtn');
    const artistInquiryBtn = document.getElementById('artistInquiryBtn');
    const artistFormModal = document.getElementById('artistFormModal');

    if (openArtistFormBtn) openArtistFormBtn.addEventListener('click', openArtistForm);
    if (closeArtistFormBtn) closeArtistFormBtn.addEventListener('click', closeArtistForm);
    if (artistFormCancelBtn) artistFormCancelBtn.addEventListener('click', closeArtistForm);
    if (artistFormSubmitBtn) artistFormSubmitBtn.addEventListener('click', submitArtistForm);
    if (artistInquiryBtn) artistInquiryBtn.addEventListener('click', artistInquiry);
    if (artistFormModal) {
        artistFormModal.addEventListener('click', (e) => {
            if (e.target === artistFormModal) closeArtistForm();
        });
    }
    // مسح الخطأ عند الكتابة
    ['artistName', 'artistPhone', 'artistProductType', 'artistDescription'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const clearError = () => {
                el.closest('.checkout-form-field').classList.remove('error');
                const errorMsg = document.getElementById('artistFormErrorMsg');
                if (errorMsg) errorMsg.textContent = '';
            };
            el.addEventListener('input', clearError);
            el.addEventListener('change', clearError);
        }
    });

    // 🟢 Event listeners لنموذج الطلب (Checkout Form)
    const closeCheckoutFormBtn = document.getElementById('closeCheckoutForm');
    const checkoutFormCancelBtn = document.getElementById('checkoutFormCancelBtn');
    const checkoutFormSubmitBtn = document.getElementById('checkoutFormSubmitBtn');
    const checkoutFormModal = document.getElementById('checkoutFormModal');

    if (closeCheckoutFormBtn) closeCheckoutFormBtn.addEventListener('click', closeCheckoutForm);
    if (checkoutFormCancelBtn) checkoutFormCancelBtn.addEventListener('click', closeCheckoutForm);
    if (checkoutFormSubmitBtn) checkoutFormSubmitBtn.addEventListener('click', submitCheckoutForm);
    if (checkoutFormModal) {
        checkoutFormModal.addEventListener('click', (e) => {
            if (e.target === checkoutFormModal) closeCheckoutForm();
        });
    }
    // مسح الخطأ عن الحقل لما المستخدم يبدأ يكتب
    ['checkoutName', 'checkoutPhone', 'checkoutCity', 'checkoutAddress'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => {
                el.closest('.checkout-form-field').classList.remove('error');
                document.getElementById('checkoutFormErrorMsg').textContent = '';
            });
            el.addEventListener('change', () => {
                el.closest('.checkout-form-field').classList.remove('error');
                document.getElementById('checkoutFormErrorMsg').textContent = '';
            });
        }
    });
    
    [productsContainer, cupsContainer, prints3dContainer, framesContainer, giftsContainer, offersContainer].forEach(container => {
        if (container) container.addEventListener('click', handleProductClick);
    });

    // Final Setup
    renderFooterLinks();
    initCarouselControls();
    initSearch(); 
    initFloatingCart();
    initScrollToTop(); 
    resetCarouselScrolls();

    // 🟢 تشغيل السكرول التلقائي لقسم العروض
    initOffersAutoScroll();

    // 🟢 تهيئة موديلات من نحن وسياسة الخصوصية
    initInfoModals();
    
    // 🟢 تهيئة شرائح فئات المنتجات
    initCategoryTabs();
    
    // تشغيل الآلة الكاتبة عند بدء المتجر
    initTypewriter();
    showPromoModal();
}

document.addEventListener('DOMContentLoaded', initStore);