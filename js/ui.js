// =================================================================
// 🎨 ui.js - واجهة المستخدم (UI)
// -----------------------------------------------------------------
// يحتوي على:
//   • Render & Display Functions (عرض المنتجات والأقسام)
//   • flyToTarget animation (انيميشن الإضافة للسلة/المفضلة)
//   • Footer links, Language toggle, Theme toggle
//   • Search, Carousel, Floating cart, Scroll to top
//   • Typewriter (الآلة الكاتبة) + Category tabs
//   • Logo click handler + Hero animations
// =================================================================

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
        
        const originalPrice = product.price;
        const discountedPrice = getDiscountedPrice(originalPrice); // 🟢 تطبيق الخصم

        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        // 🟢 صف خاص للوحة المخصصة (يستخدم في CSS لتنسيق مختلف)
        if (product.isCustomDesign) {
            productCard.classList.add('custom-design-card');
        }
        
        // 🟢 لو لوحة مخصصة: شارة + سعر "حسب الطلب" + زر مختلف
        let priceBlock, ctaButton, badgeBlock = '';
        if (product.isCustomDesign) {
            badgeBlock = `<div class="custom-design-ribbon"><i class="fas fa-palette"></i> ${texts.customDesignBadge || 'تصميم مخصص'}</div>`;
            priceBlock = `
                <div class="product-price custom-design-price-block" style="display: flex; flex-direction: column; align-items: flex-start; margin: 0.8rem 0 1.2rem;">
                    <span class="custom-design-price-label"><i class="fas fa-tag"></i> ${texts.customDesignPriceLabel || 'السعر حسب الطلب'}</span>
                </div>`;
            ctaButton = `
                <button class="add-to-cart custom-design-cta" data-id="${product.id}" data-custom-design="true">
                    <i class="fas fa-pen-nib"></i> ${texts.customDesignBtn || 'اطلب تصميمك الخاص'}
                </button>`;
        } else {
            priceBlock = `
                <div class="product-price" style="display: flex; flex-direction: column; align-items: flex-start; margin: 0.8rem 0 1.2rem;">
                    <span style="font-size: 0.9rem; color: #888; text-decoration: line-through;">د.أ ${originalPrice.toFixed(2)}</span>
                    <span style="font-size: 1.6rem; font-weight: 700; color: var(--secondary);">د.أ ${discountedPrice.toFixed(2)}</span>
                </div>`;
            ctaButton = `
                <button class="add-to-cart" data-id="${product.id}" data-has-sizes="${product.hasSizes || false}" data-discounted-price="${discountedPrice.toFixed(2)}">
                    <i class="fas fa-plus"></i> ${texts.addToCart}
                </button>`;
        }
        
        productCard.innerHTML = `
            <div class="product-image">
                ${badgeBlock}
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
}</p>                
                ${priceBlock}
                ${ctaButton}
            </div>
        `;
        container.appendChild(productCard);
        
        productCard.querySelector('.add-to-cart').addEventListener('click', (e) => {
            e.stopPropagation(); 
            const hasSizes = e.currentTarget.dataset.hasSizes === 'true';
            // 🟢 لو في variants (خيارات مثل ماريو/لويجي) لازم يفوت على التفاصيل ليختار
            const hasVariants = product.variants && product.variants.length > 0;
            // 🟢 لو لوحة مخصصة (تصميم حسب الطلب) نفتح موديل التصميم المخصص
            if (product.requiresCustomForm || product.isCustomDesign) {
                openCustomDesignForm(product, e.currentTarget);
            } else if (product.requiresWeddingForm) {
                // 🟢 لو المنتج بدو نموذج تخصيص (عيد الزواج) نفتح الموديل بدل ما نضيفه على طول
                openWeddingForm(product, e.currentTarget);
            } else if (hasSizes || hasVariants) {
                showProductDetails(product.id);
            } else {
                addToCart(product.id, null, null, null, e.currentTarget);
            }
        });
    });
}

function renderAllSections() {
    renderOffersSection();
    renderProductSection(productsContainer, 'painting', texts.title, 'paintingsTitle');
    renderProductSection(cupsContainer, 'cup', texts.cupsTitle, 'cupsTitle');
    renderProductSection(prints3dContainer, 'print3d', texts.prints3dTitle, 'prints3dTitle');
    renderProductSection(framesContainer, 'frame', texts.framesTitle, 'framesTitle');
    renderProductSection(giftsContainer, 'gift', texts.giftsTitle, 'giftsTitle');
}

// 🟢 دالة ترندر قسم العروض (حالياً تعرض كل المنتجات لأن كلها عليها خصم،
// لاحقاً ممكن إضافة flag مثل product.onSale = true في الـ data وفلترة بناءً عليها)
function renderOffersSection() {
    if (!offersContainer) return;

    // تحديث عنوان القسم باللغة الحالية
    const offersTitleTextEl = document.querySelector('#offersTitle .offers-title-text');
    if (offersTitleTextEl) offersTitleTextEl.textContent = texts.offersTitle;

    // فلترة المنتجات اللي عليها عروض.
    // مؤقتاً: كل المنتجات (لأن GLOBAL_DISCOUNT_PERCENT مفعّل على الكل).
    // لاحقاً: غيّرها لـ products.filter(p => p.onSale === true) أو أي شرط بدك إياه.
    const offersProducts = products;

    renderProductCards(offersContainer, offersProducts);

    // لما يخلص الترندر، نضاعف البطاقات عشان السكرول التلقائي يكون Loop سلس
    setupOffersLoop();
}

// 🟢 مضاعفة البطاقات عشان لما السكرول يوصل للنهاية يرجع ينعاد بسلاسة بدون "قفزة"
function setupOffersLoop() {
    if (!offersContainer) return;

    // نشيل أي clones قديمة من ترندر سابق (احتياط لما تتغير اللغة)
    offersContainer.querySelectorAll('.offer-clone').forEach(el => el.remove());

    const originalCards = Array.from(offersContainer.children);
    if (originalCards.length === 0) return;

    // نضاعف البطاقات (نسخة ثانية) عشان نقدر نلف بسلاسة
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add('offer-clone');
        // ربط زر إضافة للسلة على النسخة المستنسخة
        const cloneBtn = clone.querySelector('.add-to-cart');
        const productId = parseInt(cloneBtn?.dataset.id);
        if (cloneBtn && !isNaN(productId)) {
            cloneBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const product = products.find(p => p.id === productId);
                if (!product) return;
                const hasSizes = e.currentTarget.dataset.hasSizes === 'true';
                if (product.requiresWeddingForm) {
                    openWeddingForm(product, e.currentTarget);
                } else if (hasSizes) {
                    showProductDetails(productId);
                } else {
                    addToCart(productId, null, null, null, e.currentTarget);
                }
            });
        }
        offersContainer.appendChild(clone);
    });
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
            <img src="${displayProduct.image}" alt="${displayProduct.name}" class="modal-item-img" loading="lazy">
            <div class="item-details" style="flex: 2;">
                <div class="item-name">${displayProduct.name}</div>
                <div class="item-price">د.أ ${(getDiscountedPrice(displayProduct.price)).toFixed(2)}</div>
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
            // 🟢 لو في variants (خيارات مثل ماريو/لويجي) لازم يفوت على التفاصيل ليختار
            const hasVariants = product.variants && product.variants.length > 0;
            if (product.requiresWeddingForm) {
                 openWeddingForm(product, e.currentTarget);
            } else if (hasSizes || hasVariants) {
                 showProductDetails(product.id);
            } else {
                 addToCart(product.id, null, null, null, e.currentTarget);
            }
            favoritesModal.classList.remove('active'); 
        });

        favItem.querySelector('.remove-fav-btn').addEventListener('click', (e) => {
            // 🟢 أنيميشن الحذف قبل التنفيذ الفعلي
            const favItemEl = e.currentTarget.closest('.cart-item');
            animateRemoveAndExecute(favItemEl, 'removing-fav', () => {
                toggleFavorite(product.id);
                renderFavoritesModal();
            }, 'fav');
        });
    });
    
    // ============ 🟢 التعديل هنا (زر حذف الكل للمفضلة) 🟢 ============
    if (favoritesProducts.length > 0) {
        const clearAllBtn = document.createElement('button');
        clearAllBtn.textContent = '🗑️ حذف الكل';
        clearAllBtn.className = 'clear-all-btn';
        // (استخدام نفس التنسيق من سلة المشتريات)
        clearAllBtn.style.cssText = ` 
            background-color: #b22222; color: #fff; border: none;
            padding: 0.6rem 1.2rem; border-radius: 8px; cursor: pointer;
            font-weight: bold; display: block; margin: 1rem auto;
            transition: background 0.3s;
        `;
        clearAllBtn.addEventListener('mouseover', () => clearAllBtn.style.backgroundColor = '#d33');
        clearAllBtn.addEventListener('mouseout', () => clearAllBtn.style.backgroundColor = '#b22222');
        
        // ربط الزر بالدالة التي أنشأناها
        clearAllBtn.addEventListener('click', clearFavorites);

        // إضافة الزر إلى قائمة المفضلة
        favoritesItems.appendChild(clearAllBtn);
    }
    // ========================================================
}

// =================================================================
// --- 6. CORE LOGIC (Cart, Favorites, Language, Theme) ---
// =================================================================
// ============ 🟢 أنيميشن الإضافة للسلة/المفضلة 🟢 ============
function flyToTarget(sourceEl, targetIconId, options = {}) {
    if (!sourceEl) return;
    
    // احترم تفضيل المستخدم لتقليل الحركة
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    const targetIcon = document.getElementById(targetIconId);
    if (!targetIcon) return;
    
    const sourceRect = sourceEl.getBoundingClientRect();
    const targetRect = targetIcon.getBoundingClientRect();
    
    // إنشاء العنصر الطائر
    let clone;
    if (options.type === 'heart') {
        clone = document.createElement('div');
        clone.className = 'fly-heart';
        clone.innerHTML = '<i class="fas fa-heart"></i>';
    } else {
        // صورة المنتج
        clone = document.createElement('img');
        clone.className = 'fly-clone';
        clone.src = options.imageSrc || '';
        clone.alt = '';
    }
    
    // تحديد الموقع الأولي (موقع الزر/البطاقة)
    const startX = sourceRect.left + sourceRect.width / 2 - 35;
    const startY = sourceRect.top + sourceRect.height / 2 - 35;
    clone.style.left = `${startX}px`;
    clone.style.top = `${startY}px`;
    
    document.body.appendChild(clone);
    
    // إجبار المتصفح على رسم الموقع الأولي قبل البدء بالتحريك
    requestAnimationFrame(() => {
        // تحديد الموقع النهائي (موقع الأيقونة)
        const endX = targetRect.left + targetRect.width / 2;
        const endY = targetRect.top + targetRect.height / 2;
        const deltaX = endX - startX - 35;
        const deltaY = endY - startY - 35;
        
        clone.classList.add('flying');
        clone.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(360deg) scale(0.4)`;
        clone.style.opacity = '0.5';
    });
    
    // عند انتهاء الأنيميشن: حذف العنصر + تشغيل نبض الأيقونة
    setTimeout(() => {
        clone.remove();
        
        // نبض الأيقونة
        const receivingClass = options.type === 'heart' ? 'receiving-fav' : 'receiving';
        targetIcon.classList.add(receivingClass);
        setTimeout(() => targetIcon.classList.remove(receivingClass), 850);
        
        // نبض العداد
        const countEl = targetIcon.querySelector('.cart-count');
        if (countEl) {
            countEl.classList.add('bumping');
            setTimeout(() => countEl.classList.remove('bumping'), 500);
        }
    }, 850);
}
// ============================================================

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

    // 🟢 إضافة smooth scroll لكل الروابط الداخلية في الفوتر (اللي تبدأ بـ #)
    document.querySelectorAll('footer a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            // نتجاهل # الفاضي
            if (!href || href === '#') return;
            const targetEl = document.getElementById(href.substring(1));
            if (!targetEl) return;

            e.preventDefault();
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetY = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

            window.scrollTo({
                top: targetY,
                behavior: 'smooth'
            });
        });
    });

    // 🟢 تحديث نصوص قسم الفنانين
    const artistTitle = document.getElementById('artistCtaTitle');
    const artistDesc = document.getElementById('artistCtaDesc');
    const artistBtn = document.getElementById('artistCtaBtnText');
    if (artistTitle) artistTitle.textContent = texts.artistCtaTitle;
    if (artistDesc) artistDesc.textContent = texts.artistCtaDesc;
    if (artistBtn) artistBtn.textContent = texts.artistCtaBtn;
}

function toggleLanguage() {
    const isEnglish = document.getElementById('lang-toggle').checked;
    currentLang = isEnglish ? 'en' : 'ar';
    texts = isEnglish ? englishTexts : arabicTexts;
    products = isEnglish ? allProductsEnglish : allProductsArabic;
    
    document.documentElement.setAttribute('dir', isEnglish ? 'ltr' : 'rtl');
    document.getElementById('logoImage').src = isEnglish ? 'icons/turfa_logo_en.png' : 'icons/turfa_logo_ar.png';
    
    document.getElementById('searchInput').placeholder = texts.searchPlaceholder;
    checkoutBtn.innerHTML = `<i class="fab fa-whatsapp"></i> <span id="checkoutBtnText">${texts.checkout}</span>`;

    // 🟢 تحديث نص زر الاستفسار
    const inquiryBtn = document.getElementById('inquiryBtn');
    if (inquiryBtn) {
        inquiryBtn.innerHTML = `<i class="fas fa-comment-dots"></i> <span id="inquiryBtnText">${texts.inquiry}</span>`;
    }
    
    // 🟢 تحديث نص الهيرو
    const heroSubtitle = document.getElementById('heroSubtitle');
    if (heroSubtitle) heroSubtitle.textContent = texts.heroSubtitle;

    // 🟢 تحديث نص شارة التخصيص
    const heroCustomBadgeText = document.getElementById('heroCustomBadgeText');
    if (heroCustomBadgeText && texts.heroCustomBadge) heroCustomBadgeText.textContent = texts.heroCustomBadge;

    renderAllSections();
    renderFooterLinks();
    updateCartUI();
    updateFloatingCart();
    resetCarouselScrolls(); 
    
    // 🟢 تحديث نصوص شرائح الفئات
    updateCategoryTabsLanguage();
    
    // 🟢 إعادة تشغيل الآلة الكاتبة باللغة الجديدة
    if (typewriter) typewriter.stop();
    initTypewriter();
    
    // 🟢 تحديث نافذة العروض باللغة الجديدة (فقط إذا كانت مفتوحة)
    showPromoModal(true);
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
        renderProductCards(prints3dContainer, filtered.filter(p => p.category === 'print3d'));
        renderProductCards(framesContainer, filtered.filter(p => p.category === 'frame'));
        renderProductCards(giftsContainer, filtered.filter(p => p.category === 'gift'));
    };

    // 🟢 Debounce: نأجل البحث 200ms بعد آخر حرف
    // فايدتها: بدل ما نعمل re-render كامل لكل المنتجات مع كل ضغطة كيبورد،
    // نستنى المستخدم يخلص يكتب. على الموبايل بصير الكتابة أنعم بكتير.
    let searchTimer = null;
    const debouncedSearch = () => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(performSearch, 200);
    };

    searchInput.addEventListener('input', debouncedSearch);
    // الضغط على زر البحث = بحث فوري (المستخدم خلص كتابة فعلاً)
    searchBtn.addEventListener('click', () => {
        clearTimeout(searchTimer);
        performSearch();
    });
    // كمان لو ضغط Enter
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            clearTimeout(searchTimer);
            performSearch();
        }
    });
}

// 🟢 السكرول التلقائي السلس لقسم العروض (Loop مستمر)
function initOffersAutoScroll() {
    const container = document.getElementById('offersContainer');
    if (!container) return;

    // احترام تفضيل المستخدم لتقليل الحركة
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const NORMAL_SPEED = 0.5;   // السرعة الطبيعية (بكسل/إطار)
    const SLOW_SPEED = 0.08;    // السرعة البطيئة عند الـ hover على القسم
    const isRTL = document.documentElement.dir === 'rtl';
    let currentSpeed = NORMAL_SPEED;
    let isFullyPaused = false;  // وقف كامل (بس عند hover على بطاقة معينة أو لمس الموبايل)
    let rafId = null;

    const tick = () => {
        if (!isFullyPaused) {
            const halfWidth = container.scrollWidth / 2; // لأنه ضاعفنا المحتوى

            if (isRTL) {
                container.scrollLeft -= currentSpeed;
                // لما نوصل لنهاية النسخة الأولى، نرجع للبداية بدون قفزة
                if (Math.abs(container.scrollLeft) >= halfWidth) {
                    container.scrollLeft += halfWidth;
                }
            } else {
                container.scrollLeft += currentSpeed;
                if (container.scrollLeft >= halfWidth) {
                    container.scrollLeft -= halfWidth;
                }
            }
        }
        rafId = requestAnimationFrame(tick);
    };

    // hover على القسم بشكل عام → يبطئ السكرول (ما يوقف كلياً)
    container.addEventListener('mouseenter', () => {
        currentSpeed = SLOW_SPEED;
    });
    container.addEventListener('mouseleave', () => {
        currentSpeed = NORMAL_SPEED;
        isFullyPaused = false;
    });

    // hover على بطاقة معينة → وقف كامل (لأنه بدو يقرأها أو يضغط زر)
    container.addEventListener('mouseover', (e) => {
        if (e.target.closest('.product-card')) {
            isFullyPaused = true;
        }
    });
    container.addEventListener('mouseout', (e) => {
        // نرجع نشتغل (بسرعة بطيئة لأنه لسه الفارة على القسم)
        // الـ relatedTarget هو العنصر اللي راحت عليه الفارة
        if (!e.relatedTarget || !e.relatedTarget.closest('.product-card')) {
            isFullyPaused = false;
        }
    });

    // لمس على الموبايل → وقف كامل مؤقت
    container.addEventListener('touchstart', () => {
        isFullyPaused = true;
    }, { passive: true });
    container.addEventListener('touchend', () => {
        // إعطاء فرصة للمستخدم يكمل سكرول يدوي
        setTimeout(() => { isFullyPaused = false; }, 1500);
    }, { passive: true });

    // إيقاف لما الصفحة تكون مخفية (تبويب آخر) — توفير أداء
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        } else if (!rafId) {
            tick();
        }
    });

    tick();
}

function initCarouselControls() {
    const initSectionCarousel = (containerId, prevBtnId, nextBtnId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // 🟢 إصلاح: السهم بصرياً
        // - السهم اليسار (prev/<) دائماً بدنا نسكرول للجهة اليسرى من المحتوى (left سالب بصرياً)
        // - السهم اليمين (next/>) دائماً بدنا نسكرول للجهة اليمنى من المحتوى (left موجب بصرياً)
        // في وضع RTL، scrollLeft يعمل بشكل عكسي في المتصفحات الحديثة (قيم سالبة)،
        // لكن scrollBy({left}) ينقل بنفس الاتجاه البصري دائماً (يسار سالب، يمين موجب)
        const scroll = (visualDirection) => {
            const scrollAmount = container.offsetWidth * 0.8;
            // visualDirection: 'left' أو 'right' (الاتجاه البصري على الشاشة)
            const finalScroll = visualDirection === 'left' ? -scrollAmount : scrollAmount;
            container.scrollBy({ left: finalScroll, behavior: 'smooth' });
        };
        
        // السهم prev (<) ← دائماً يحرك للجهة اليسرى بصرياً
        document.getElementById(prevBtnId).addEventListener('click', () => scroll('left'));
        // السهم next (>) ← دائماً يحرك للجهة اليمنى بصرياً
        document.getElementById(nextBtnId).addEventListener('click', () => scroll('right'));
    };
    initSectionCarousel('productsContainer', 'scrollPrev', 'scrollNext');
    initSectionCarousel('cupsContainer', 'scrollPrevCups', 'scrollNextCups');
    initSectionCarousel('prints3dContainer', 'scrollPrevPrints3d', 'scrollNextPrints3d');
    initSectionCarousel('framesContainer', 'scrollPrevFrames', 'scrollNextFrames');
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

            // 🟢 لو السلة كانت مخفية، نضيف entering animation مرة وحدة
            const wasHidden = !floatingCart.classList.contains('active');
            floatingCart.classList.add('active');

            if (wasHidden) {
                floatingCart.classList.add('entering');
                // نشيل الكلاس بعد ما الأنيميشن يخلص (500ms + buffer)
                setTimeout(() => {
                    floatingCart.classList.remove('entering');
                }, 600);
            }
        } else {
            floatingCart.classList.remove('active');
            floatingCart.classList.remove('entering');
        }
    };
}

// 🟢 دالة سهم الصعود للأعلى
function initScrollToTop() {
    if (!scrollToTopBtn) return;

    // إظهار وإخفاء الزر بناءً على النزول
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    });

    // الصعود للأعلى عند الضغط
    scrollToTopBtn.addEventListener('click', (e) => {
        e.preventDefault(); // منع التحديث الفوري للرابط
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // صعود ناعم
        });
    });
}

function resetCarouselScrolls() {
    document.querySelectorAll('.products-grid').forEach(container => {
        container.scrollLeft = document.documentElement.dir === 'rtl' ? container.scrollWidth : 0;
    });
}

function handleProductClick(e) {
    const favoriteBtn = e.target.closest('.favorite-btn');
    if (favoriteBtn) {
        const productId = parseInt(favoriteBtn.dataset.id);
        const wasInFavorites = favorites.includes(productId);
        toggleFavorite(productId);
        
        if (!wasInFavorites) {
            // 🟢 إضافة للمفضلة → قلب طائر
            flyToTarget(favoriteBtn, 'favoritesIcon', { type: 'heart' });
        } else {
            // 🟢 إزالة من المفضلة → أنيميشن "كسر القلب" على كل أزرار القلب لهذا المنتج
            document.querySelectorAll(`.favorite-btn[data-id="${productId}"]`).forEach(btn => {
                btn.classList.add('unfaving');
                setTimeout(() => btn.classList.remove('unfaving'), 700);
            });
            
            // نبض العداد لأسفل
            const countEl = document.querySelector('#favoritesIcon .cart-count');
            if (countEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                countEl.classList.add('bumping-down');
                setTimeout(() => countEl.classList.remove('bumping-down'), 500);
            }
        }
        return;
    }
    const productCard = e.target.closest('.product-card');
    if (productCard && !e.target.closest('.add-to-cart')) {
        const id = productCard.querySelector('.add-to-cart')?.dataset.id;
        if (id) {
            // 🟢 لو لوحة مخصصة (تصميم حسب الطلب) نفتح موديل التصميم المخصص بدل التفاصيل
            const productId = parseInt(id);
            const product = products.find(p => p.id === productId);
            if (product && (product.requiresCustomForm || product.isCustomDesign)) {
                openCustomDesignForm(product, productCard.querySelector('.add-to-cart'));
            } else {
                showProductDetails(productId);
            }
        }
    }
}

// 🟢 دالة تشغيل الآلة الكاتبة

function initTypewriter() {
    const targetElement = document.getElementById('typewriter-text');
    if (targetElement) {
        // نستخدم النصوص من كائن texts الحالي (الذي يتم تبديله مع اللغة)
        typewriter = new Typewriter(targetElement, texts.typewriterStrings);
        typewriter.start();
    }
}

// ============ 🟢 بطاقات فئات المنتجات 🟢 ============
function initCategoryTabs() {
    const cards = document.querySelectorAll('.category-card');
    if (!cards.length) return;
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const targetId = card.dataset.target;
            const targetEl = document.getElementById(targetId);
            if (!targetEl) return;
            
            // تحديد ارتفاع الهيدر للتعويض عند السكرول
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetY = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            
            window.scrollTo({
                top: targetY,
                behavior: 'smooth'
            });
        });
    });
    
    // مراقبة الأقسام لتحديد البطاقة النشطة تلقائياً عند السكرول
    const sectionIds = ['paintingsTitle', 'cupsTitle', 'prints3dTitle', 'framesTitle', 'giftsTitle'];
    const sections = sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean);
    
    if (!sections.length || !('IntersectionObserver' in window)) return;
    
    const observer = new IntersectionObserver((entries) => {
        const visible = entries
            .filter(e => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        
        if (!visible.length) return;
        
        const activeId = visible[0].target.id;
        cards.forEach(c => {
            c.classList.toggle('active', c.dataset.target === activeId);
        });
    }, {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    });
    
    sections.forEach(section => observer.observe(section));
}

function updateCategoryTabsLanguage() {
    // تحديث العناوين
    document.querySelectorAll('.category-card-title').forEach(el => {
        const text = currentLang === 'ar' ? el.dataset.ar : el.dataset.en;
        if (text) el.textContent = text;
    });
    // تحديث نص "تصفح..."
    document.querySelectorAll('.category-card-count').forEach(el => {
        const text = currentLang === 'ar' ? el.dataset.ar : el.dataset.en;
        if (text) el.textContent = text;
    });
}
// ============================================================

// =================================================================
// 🟢 جعل اللوغو قابلاً للضغط (يرجّع للصفحة الرئيسية بسلاسة)
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
    const logoEl = document.querySelector('.logo');
    if (!logoEl) return;

    // إعدادات إمكانية الوصول (a11y)
    logoEl.setAttribute('role', 'button');
    logoEl.setAttribute('tabindex', '0');
    logoEl.setAttribute('aria-label',
        currentLang === 'ar' ? 'العودة إلى الصفحة الرئيسية' : 'Back to home page'
    );

    const goHome = () => {
        // إغلاق أي مودالات مفتوحة (سلة، مفضلة، تفاصيل، إلخ)
        document.querySelectorAll('.cart-modal').forEach(m => {
            if (m.style.display === 'flex' || m.classList.contains('show')) {
                m.style.display = 'none';
                m.classList.remove('show');
            }
        });

        // إعادة تعيين البحث (إن وُجد)
        const searchInput = document.getElementById('searchInput');
        if (searchInput && searchInput.value) {
            searchInput.value = '';
            // إعادة عرض كل المنتجات إن كانت دالة العرض موجودة
            if (typeof renderAllProducts === 'function') {
                renderAllProducts();
            } else {
                // fallback: trigger input event للحفاظ على نفس منطق البحث
                searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }

        // scroll سلس لأعلى الصفحة
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ضغط بالماوس
    logoEl.addEventListener('click', goHome);

    // دعم لوحة المفاتيح (Enter / Space)
    logoEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            goHome();
        }
    });
});

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

// ============ 🟢 الكود الجديد المضاف (Typewriter) 🟢 ============
// كلاس الآلة الكاتبة الذي يدير كل شيء
class Typewriter {
    constructor(element, words) {
        this.element = element;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.loopNum = 0;
        this.typingSpeed = 120; // سرعة الكتابة
        this.deletingSpeed = 60; // سرعة الحذف
    // تم تخفيض زمن التوقف لتفادي مشكلة العداد
    this.pauseDelay = 1000; // مدة التوقف بعد اكتمال الكلمة 
        this.timeoutId = null;
    }

    tick() {
        const i = this.loopNum % this.words.length;
        const fullTxt = this.words[i];

        if (this.isDeleting) {
            // --- وضع الحذف ---
            this.txt = fullTxt.substring(0, this.txt.length - 1);
            this.typingSpeed = this.deletingSpeed;
        } else {
            // --- وضع الكتابة ---
            this.txt = fullTxt.substring(0, this.txt.length + 1);
            this.typingSpeed = 120;
        }

        // عرض النص (مع الحفاظ على المؤشر من CSS)
        this.element.innerHTML = `<span class="wrap">${this.txt}</span>`;

        if (!this.isDeleting && this.txt === fullTxt) {
            // اكتملت الكلمة، انتظر قبل الحذف
            this.isDeleting = true;
            this.typingSpeed = this.pauseDelay;
        } else if (this.isDeleting && this.txt === '') {
            // اكتمل الحذف، انتقل للكلمة التالية
            this.isDeleting = false;
            this.loopNum++;
            this.typingSpeed = 500; // توقف قصير قبل بدء الكلمة الجديدة
        }

        this.timeoutId = setTimeout(() => this.tick(), this.typingSpeed);
    }

    start() {
        if (!this.timeoutId) {
            this.tick();
        }
    }

    stop() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }
}
// ========================================================