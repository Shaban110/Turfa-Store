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

    // 🟢 ربط أزرار موديل اللوحة المخصصة (Custom Design)
    const customDesignModal = document.getElementById('customDesignModal');
    const closeCustomDesignBtn = document.getElementById('closeCustomDesign');
    const customDesignCancelBtn = document.getElementById('customDesignCancelBtn');
    const customDesignSubmitBtn = document.getElementById('customDesignSubmitBtn');

    if (closeCustomDesignBtn) closeCustomDesignBtn.addEventListener('click', closeCustomDesignForm);
    if (customDesignCancelBtn) customDesignCancelBtn.addEventListener('click', closeCustomDesignForm);
    if (customDesignSubmitBtn) customDesignSubmitBtn.addEventListener('click', submitCustomDesignForm);
    if (customDesignModal) {
        customDesignModal.addEventListener('click', (e) => {
            if (e.target === customDesignModal) closeCustomDesignForm();
        });
    }

    // إزالة حالة الخطأ عند الكتابة في textarea اللوحة المخصصة
    const customDesignTextEl = document.getElementById('customDesignText');
    if (customDesignTextEl) {
        customDesignTextEl.addEventListener('input', () => {
            customDesignTextEl.classList.remove('field-error');
            const errorEl = document.getElementById('customDesignErrorMsg');
            if (errorEl) errorEl.classList.remove('show');
        });
    }

    // 🟢 إزالة حالة الخطأ عند الكتابة في خانات المقاس المخصص
    ['customDesignWidth', 'customDesignHeight'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => {
                el.classList.remove('field-error');
                const errorEl = document.getElementById('customDesignErrorMsg');
                if (errorEl) errorEl.classList.remove('show');
            });
        }
    });

    // 🟢 حقل النص المخصص للـ variants (يولد ديناميكياً) — event delegation
    // - يزيل حالة الخطأ عند الكتابة
    // - يمنع الحروف العربية لو الحقل بدو إنجليزي بس
    document.addEventListener('input', (e) => {
        if (e.target && e.target.id === 'variantCustomTextInput') {
            const el = e.target;
            el.classList.remove('field-error');

            // لو الحقل بدو إنجليزي بس، نفلتر الحروف العربية فوراً
            if (el.dataset.lang === 'en') {
                // أبقي فقط الأحرف اللاتينية والمسافة والشرطة والفاصلة العليا والنقطة
                const cleaned = el.value.replace(/[^A-Za-z\s\-'.]/g, '');
                if (cleaned !== el.value) {
                    const cursorPos = el.selectionStart - (el.value.length - cleaned.length);
                    el.value = cleaned;
                    try { el.setSelectionRange(cursorPos, cursorPos); } catch (_) {}
                }
            }
        }
    });

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

// =================================================================
// 🟢 HEADER AUTO-HIDE ON SCROLL
// -----------------------------------------------------------------
// يخفي الـ header لما المستخدم ينزل لتحت، ويظهره لما يطلع لفوق.
// يشتغل بس على الموبايل (≤ 768px) لأن على الشاشات الكبيرة في مساحة.
// =================================================================
function initHeaderAutoHide() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;
    // عتبة بسيطة عشان ما يرفّ الـ header مع كل حركة صغيرة
    const SCROLL_THRESHOLD = 8;
    // ما نخفي إلا بعد ما المستخدم ينزل عن ارتفاع الـ header نفسه
    const HIDE_AFTER = 80;

    const updateHeader = () => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY;

        // نطبّق السلوك بس على الشاشات الصغيرة
        const isMobile = window.matchMedia('(max-width: 768px)').matches;

        if (!isMobile) {
            header.classList.remove('header-hidden');
            lastScrollY = currentY;
            ticking = false;
            return;
        }

        // فوق الصفحة دائماً ظاهر
        if (currentY < HIDE_AFTER) {
            header.classList.remove('header-hidden');
            lastScrollY = currentY;
            ticking = false;
            return;
        }

        // تجاهل الحركات الصغيرة جداً (تجنب الارتعاش)
        if (Math.abs(delta) < SCROLL_THRESHOLD) {
            ticking = false;
            return;
        }

        if (delta > 0) {
            // نازل لتحت → نخفي
            header.classList.add('header-hidden');
        } else {
            // طالع لفوق → نظهر
            header.classList.remove('header-hidden');
        }

        lastScrollY = currentY;
        ticking = false;
    };

    // نستخدم requestAnimationFrame عشان الأداء يكون سلس
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });

    // لما المستخدم يغيّر حجم الشاشة (مثلاً يدور الجهاز) نرجّع الـ header للوضع الطبيعي
    window.addEventListener('resize', () => {
        if (!window.matchMedia('(max-width: 768px)').matches) {
            header.classList.remove('header-hidden');
        }
    });
}

// =================================================================
// 🟢 IMAGE LIGHTBOX - تكبير صور المنتجات
// -----------------------------------------------------------------
// مكونات:
//   • فتح بالضغط على صورة المنتج في صفحة التفاصيل
//   • إغلاق بـ Esc / زر X / الضغط على الخلفية
//   • Double-tap على الموبايل أو click على الديسكتوب → زوم
//   • Pinch-to-zoom طبيعي من المتصفح يعمل تلقائياً
//   • سحب الصورة لما تكون مكبّرة
// =================================================================
function initImageLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('imageLightboxImg');
    const closeBtn = document.getElementById('imageLightboxClose');
    const detailContainer = document.getElementById('detailImageContainer');
    const detailImg = document.getElementById('detailImage');

    if (!lightbox || !lightboxImg || !detailContainer || !detailImg) return;

    let scrollY = 0;
    let lastTapTime = 0;
    let isPanning = false;
    let panStartX = 0;
    let panStartY = 0;
    let translateX = 0;
    let translateY = 0;

    const openLightbox = () => {
        if (!detailImg.src) return;
        // نحفظ مكان السكرول قبل قفل الـ body
        scrollY = window.scrollY;
        lightboxImg.src = detailImg.src;
        lightboxImg.alt = detailImg.alt || '';
        lightbox.classList.add('active');
        document.body.classList.add('lightbox-open');
        document.body.style.top = `-${scrollY}px`;
        // focus لزر الإغلاق لدعم الـ keyboard
        setTimeout(() => closeBtn.focus(), 100);
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        lightbox.classList.remove('user-interacted');
        document.body.classList.remove('lightbox-open');
        document.body.style.top = '';
        // نرجّع المستخدم لنفس مكانه
        window.scrollTo(0, scrollY);
        // نرجّع الصورة لحالتها الأصلية
        resetZoom();
    };

    const resetZoom = () => {
        lightboxImg.classList.remove('zoomed');
        translateX = 0;
        translateY = 0;
        lightboxImg.style.transform = '';
    };

    const toggleZoom = (e) => {
        // علامة إن المستخدم تفاعل (لإخفاء التلميح)
        lightbox.classList.add('user-interacted');

        if (lightboxImg.classList.contains('zoomed')) {
            resetZoom();
        } else {
            lightboxImg.classList.add('zoomed');
        }
    };

    // --- فتح الـ lightbox ---
    detailContainer.addEventListener('click', (e) => {
        // ما نفتح لو الضغط كان على شي ثاني (مثلاً ولد العنصر)
        // الـ container كله قابل للضغط، فأي ضغط فيه يفتح
        openLightbox();
    });

    // دعم الـ keyboard (Enter / Space)
    detailContainer.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox();
        }
    });

    // --- إغلاق ---
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });

    // الضغط على الخلفية (خارج الصورة) يغلق
    lightbox.addEventListener('click', (e) => {
        // لو الضغط كان على الصورة نفسها، ما نغلق
        if (e.target === lightboxImg) return;
        // لو الضغط على زر الإغلاق، تركوا الـ handler الخاص فيه يشتغل
        if (e.target.closest('.image-lightbox-close')) return;
        closeLightbox();
    });

    // Esc يغلق
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // --- Double-tap / Click للزوم ---
    lightboxImg.addEventListener('click', (e) => {
        e.stopPropagation();
        // على الديسكتوب: ضغطة واحدة تكفي
        // على الموبايل: نستخدم double-tap (تحت)
        // نميز بحسب نوع المؤشر
        if (window.matchMedia('(hover: hover)').matches) {
            toggleZoom(e);
        }
    });

    // Double-tap للموبايل
    lightboxImg.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTapTime < 300 && now - lastTapTime > 0) {
            // double tap
            e.preventDefault();
            toggleZoom(e);
        }
        lastTapTime = now;
    });

    // --- سحب الصورة لما تكون مكبّرة (الديسكتوب فقط) ---
    lightboxImg.addEventListener('mousedown', (e) => {
        if (!lightboxImg.classList.contains('zoomed')) return;
        e.preventDefault();
        isPanning = true;
        panStartX = e.clientX - translateX;
        panStartY = e.clientY - translateY;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isPanning) return;
        translateX = e.clientX - panStartX;
        translateY = e.clientY - panStartY;
        lightboxImg.style.transform = `scale(2.2) translate(${translateX / 2.2}px, ${translateY / 2.2}px)`;
    });

    document.addEventListener('mouseup', () => {
        isPanning = false;
    });

    // إخفاء التلميح بعد 4 ثواني تلقائياً
    let hintTimer;
    const lightboxObserver = new MutationObserver(() => {
        if (lightbox.classList.contains('active')) {
            clearTimeout(hintTimer);
            hintTimer = setTimeout(() => {
                lightbox.classList.add('user-interacted');
            }, 4000);
        }
    });
    lightboxObserver.observe(lightbox, { attributes: true, attributeFilter: ['class'] });
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

    // 🟢 إخفاء/إظهار الـ header التلقائي على الموبايل
    initHeaderAutoHide();

    // 🟢 Image Lightbox - تكبير صور المنتجات
    initImageLightbox();

    // 🟢 تشغيل السكرول التلقائي لقسم العروض
    initOffersAutoScroll();

    // 🟢 تهيئة موديلات من نحن وسياسة الخصوصية
    initInfoModals();
    
    // 🟢 تهيئة شرائح فئات المنتجات
    initCategoryTabs();
    
    // تشغيل الآلة الكاتبة عند بدء المتجر
    initTypewriter();
}

document.addEventListener('DOMContentLoaded', initStore);