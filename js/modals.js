// =================================================================
// 🪟 modals.js - الموديلات (Modals)
// -----------------------------------------------------------------
// يحتوي على:
//   • موديل العروض الترويجية (Promo)
//   • موديل تخصيص هدية الزواج (Wedding Form)
//   • السلة (Cart) والمفضلة (Favorites)
//   • نموذج الطلب قبل واتساب (Checkout Form)
//   • موديلات: من نحن، الخصوصية، قريباً، تواصل معنا
// =================================================================

// =================================================================
// --- 8. (تم حذف منطق نافذة العرض الترويجي بعد انتهاء عرض الخصم) ---
// =================================================================

async function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

const dynamicGallery = [];
    // لو الصور موجودة صراحةً بقاعدة البيانات، استخدمها مباشرة
    if (product.images && product.images.length) {
        product.images.slice(1).forEach(img => dynamicGallery.push(img));
    } else {
        // طريقة قديمة احتياطية: تخمين أسماء الصور
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
    }

    // 🟢 إذا في ألوان، نتأكد إنه عدد الـ thumbnails يكفي لأكبر لون عنده صور
    if (product.colors && product.colors.length > 0) {
        const maxColorImages = Math.max(
            ...product.colors.map(c => (c.images && c.images.length) || (c.image ? 1 : 1))
        );
        // أكبر عدد صور بين كل الألوان (ناقص واحدة لأن الصورة الرئيسية بتنحط أول)
        const neededExtraThumbs = Math.max(0, maxColorImages - 1);
        // لو عدد الصور المكتشفة أقل من اللي محتاجينه، نزود placeholders فاضية
        while (dynamicGallery.length < neededExtraThumbs) {
            dynamicGallery.push(product.image);
        }
    }

    // 🟢 نفس الشي للـ variants (ولد/بنت/عائلة...): نتأكد إنه عدد الـ
    //    thumbnails يكفي لأكبر variant عنده صور — وإلا صور الخيار ما تظهر
    if (product.variants && product.variants.length > 0) {
        const maxVariantImages = Math.max(
            ...product.variants.map(v => (v.images && v.images.length) || (v.image ? 1 : 1))
        );
        const neededExtraThumbs = Math.max(0, maxVariantImages - 1);
        while (dynamicGallery.length < neededExtraThumbs) {
            dynamicGallery.push(product.image);
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

    // --- Variants Selector HTML (الخيارات النصية مثل ماريو/لويجي) ---
    let variantOptionsHTML = '';
    if (product.variants && product.variants.length > 0) {
        variantOptionsHTML = `
            <div class="product-variant-select" id="variantSelectSection">
                <label>${texts.selectVariant}</label>
                <div class="variant-options-container">
                    ${product.variants.map((variant, index) => {
                        const firstImg = (variant.images && variant.images[0]) || variant.image || product.image;
                        const priceDiff = variant.priceDiff || 0;
                        const priceLabel = priceDiff > 0
                            ? `+ ${formatPrice(priceDiff)}`
                            : '';
                        return `
                        <button type="button"
                                class="variant-option-box"
                                data-index="${index}"
                                data-image="${firstImg}"
                                data-name="${variant.name}"
                                data-pricediff="${priceDiff}"
                                data-custom="${variant.requiresCustomText ? 'true' : 'false'}">
                            <span class="variant-name">${variant.name}</span>
                            ${priceLabel ? `<span class="variant-price-diff">${priceLabel}</span>` : ''}
                        </button>`;
                    }).join('')}
                </div>
                <!-- 🟢 textarea للـ variant المخصص (يظهر فقط عند اختيار variant مع requiresCustomText) -->
                <div class="variant-custom-text-wrap" id="variantCustomTextWrap">
                    <label for="variantCustomTextInput" class="variant-custom-text-label">
                        <span>${texts.variantCustomNameLabel || 'اسم النادي/اللاعب'}</span>
                        <span class="required-star">*</span>
                    </label>
                    <input type="text" id="variantCustomTextInput" class="variant-custom-text-input" maxlength="80" placeholder="${texts.variantCustomNamePlaceholder || ''}">
                    <p class="variant-custom-text-hint"><i class="fab fa-whatsapp"></i> ${texts.variantCustomNameHint || ''}</p>
                </div>
            </div>`;
    }

    // --- Color Selector HTML ---
    let colorOptionsHTML = '';
    if (product.colors && product.colors.length > 0) {
        colorOptionsHTML = `
            <div class="product-color-select" id="colorSelectSection">
                <label>${texts.selectColor}</label>
                <div class="color-options-container">
                    ${product.colors.map((color, index) => {
                        const firstImg = (color.images && color.images[0]) || color.image || product.image;
                        return `
                        <div class="color-option-circle" 
                             data-index="${index}" 
                             data-image="${firstImg}" 
                             data-name="${color.name}"
                             style="background-color: ${color.hex};"
                             title="${color.name}">
                        </div>`;
                    }).join('')}
                </div>
                <span class="selected-color-name" id="selectedColorName">${product.colors[0].name}</span>
            </div>`;
    }
    let sizeOptionsHTML = '';
    if (product.hasSizes) {
        sizeOptionsHTML = `
            <div class="product-size-select">
                <label>${texts.selectSize}</label>
                <div class="size-options-container">
                    ${sizingData.map((size, index) => {
                        const priceDisplay = index === 0 ? (currentLang === 'ar' ? 'السعر الأساسي' : 'Base Price') : `+ ${formatPrice(size.priceDiff)}`;
                        const sizeNameOnly = size.name.split(/[\(]/)[0].trim();
                        return `<div class="size-option-box" data-index="${index}" data-pricediff="${size.priceDiff}"><span>${sizeNameOnly}</span><span class="size-price-diff">${priceDisplay}</span></div>`;
                    }).join('')}
                </div>
            </div>`;
    }
    
    const initialOriginalPrice = product.price;
    const initialDiscountedPrice = getDiscountedPrice(initialOriginalPrice);
    
    detailPriceRow.innerHTML = `
        ${variantOptionsHTML}
        ${colorOptionsHTML}
        ${sizeOptionsHTML}
        <span id="detailPrice" style="font-weight: 700; color: var(--secondary); font-size: 2rem; display: block; margin-bottom: 15px;">
             ${product.hasSizes ? '' :
             `
             ${hasActiveDiscount() ? `<span style="font-size: 1.1rem; color: #888; text-decoration: line-through;">${formatPrice(initialOriginalPrice)}</span>` : ''}
             <span style="font-size: 2rem; font-weight: 700; color: var(--secondary);">${formatPrice(initialDiscountedPrice)}</span>
             `
             }
        </span>
        <button id="detailAddToCartBtnClone" class="add-to-cart" data-id="${product.id}" data-base-price="${initialOriginalPrice}" data-has-sizes="${product.hasSizes}" data-selected-price="${initialDiscountedPrice.toFixed(2)}" style="width: 100%; padding: 1rem;">
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
                const originalNewPrice = product.price + priceDiff;
                
                // 🟢 تطبيق الخصم هنا
                const discountedNewPrice = getDiscountedPrice(originalNewPrice);
                
                sizeBoxes.forEach(b => b.classList.remove('active'));
                box.classList.add('active');
                
                updatedDetailPrice.innerHTML = `
                    ${hasActiveDiscount() ? `<span style="font-size: 1.1rem; color: #888; text-decoration: line-through;">${formatPrice(originalNewPrice)}</span>` : ''}
                    <span style="font-size: 2rem; font-weight: 700; color: var(--secondary);">${formatPrice(discountedNewPrice)}</span>
                `;
                
                finalAddToCartBtn.dataset.selectedSizeIndex = selectedIndex; 
                finalAddToCartBtn.dataset.selectedPrice = discountedNewPrice.toFixed(2); // حفظ السعر المخفض للإضافة للسلة
            });
        });

        if (sizeBoxes.length > 0) {
            sizeBoxes[0].click();
        }
    }

    // --- Color Circles Logic ---
    if (product.colors && product.colors.length > 0) {
        const colorCircles = detailPriceRow.querySelectorAll('.color-option-circle');
        const selectedColorNameEl = document.getElementById('selectedColorName');

        const applyColor = (circle) => {
            colorCircles.forEach(c => c.classList.remove('active'));
            circle.classList.add('active');

            const colorIndex = parseInt(circle.dataset.index);
            const colorData = product.colors[colorIndex];
            // الصور الخاصة بهذا اللون (images[]) أو صورة واحدة للتوافق القديم
            const colorImages = colorData.images || (colorData.image ? [colorData.image] : [product.image]);

            // تغيير الصورة الرئيسية
            detailImage.src = colorImages[0];

            // إعادة بناء الـ thumbnails بالكامل بصور اللون الجديد
            const allThumbs = thumbnailGallery.querySelectorAll('.thumbnail');
            colorImages.forEach((src, i) => {
                if (allThumbs[i]) allThumbs[i].src = src;
            });
            // إذا كان عدد الصور الجديدة أقل، أخفِ الباقي
            allThumbs.forEach((t, i) => {
                t.style.display = i < colorImages.length ? '' : 'none';
            });

            // تفعيل أول thumbnail
            allThumbs.forEach(t => t.classList.remove('active'));
            if (allThumbs[0]) allThumbs[0].classList.add('active');

            // تحديث اسم اللون
            if (selectedColorNameEl) selectedColorNameEl.textContent = circle.dataset.name;
        };

        colorCircles.forEach(circle => {
            circle.addEventListener('click', () => applyColor(circle));
        });

        // تفعيل أول لون تلقائياً
        if (colorCircles.length > 0) applyColor(colorCircles[0]);
    }

    // --- Variants Logic (الخيارات النصية: ماريو/لويجي/...) ---
    if (product.variants && product.variants.length > 0) {
        const variantBoxes = detailPriceRow.querySelectorAll('.variant-option-box');
        const detailPriceEl = document.getElementById('detailPrice');
        const addToCartBtn = document.getElementById('detailAddToCartBtnClone');

        const applyVariant = (box) => {
            variantBoxes.forEach(b => b.classList.remove('active'));
            box.classList.add('active');

            const variantIndex = parseInt(box.dataset.index);
            const variantData = product.variants[variantIndex];
            const variantImages = variantData.images
                || (variantData.image ? [variantData.image] : [product.image]);
            const priceDiff = parseFloat(box.dataset.pricediff) || 0;

            // 🟢 إظهار/إخفاء حقل النص المخصص حسب نوع الـ variant
            const customTextWrap = document.getElementById('variantCustomTextWrap');
            const customTextInput = document.getElementById('variantCustomTextInput');
            const customTextLabelSpan = customTextWrap ? customTextWrap.querySelector('.variant-custom-text-label span:first-child') : null;
            const customTextHint = customTextWrap ? customTextWrap.querySelector('.variant-custom-text-hint') : null;
            if (customTextWrap) {
                if (variantData.requiresCustomText) {
                    // 🟢 دعم الشكل القديم (boolean) والشكل الجديد (object فيه labelKey/placeholderKey/hintKey/lang)
                    const cfg = typeof variantData.requiresCustomText === 'object' ? variantData.requiresCustomText : {};
                    const labelText = (cfg.labelKey && texts[cfg.labelKey]) || texts.variantCustomNameLabel || '';
                    const placeholderText = (cfg.placeholderKey && texts[cfg.placeholderKey]) || texts.variantCustomNamePlaceholder || '';
                    const hintText = (cfg.hintKey && texts[cfg.hintKey]) || texts.variantCustomNameHint || '';
                    const lang = cfg.lang || 'any'; // 'en' أو 'any'

                    if (customTextLabelSpan) customTextLabelSpan.textContent = labelText;
                    if (customTextInput) {
                        customTextInput.placeholder = placeholderText;
                        customTextInput.value = '';
                        customTextInput.classList.remove('field-error');
                        // 🟢 خزّن اللغة المطلوبة على الحقل + اضبط الاتجاه
                        customTextInput.dataset.lang = lang;
                        customTextInput.setAttribute('dir', lang === 'en' ? 'ltr' : 'auto');
                    }
                    if (customTextHint) {
                        // أيقونة الواتساب فقط لو الـ hint عن واتساب (للنادي/اللاعب)، أما باقي الـ hints فبأيقونة عادية
                        const isWhatsAppHint = (cfg.hintKey === undefined || cfg.hintKey === null);
                        customTextHint.innerHTML = isWhatsAppHint
                            ? `<i class="fab fa-whatsapp"></i> ${hintText}`
                            : `<i class="fas fa-info-circle"></i> ${hintText}`;
                    }
                    customTextWrap.classList.add('active');
                    // 🟢 ما عاد نعمل focus تلقائي عند تبديل الخيار — كان يسبب
                    //    تمرير الصفحة لتحت بشكل مزعج. الزبون يضغط الحقل لما يجهز.
                } else {
                    customTextWrap.classList.remove('active');
                    if (customTextInput) {
                        customTextInput.value = '';
                        customTextInput.classList.remove('field-error');
                    }
                }
            }

            // 1) تغيير الصورة الرئيسية
            detailImage.src = variantImages[0];

            // 2) إعادة بناء الـ thumbnails بصور الـ variant الجديد
            const allThumbs = thumbnailGallery.querySelectorAll('.thumbnail');
            variantImages.forEach((src, i) => {
                if (allThumbs[i]) allThumbs[i].src = src;
            });
            allThumbs.forEach((t, i) => {
                t.style.display = i < variantImages.length ? '' : 'none';
            });
            allThumbs.forEach(t => t.classList.remove('active'));
            if (allThumbs[0]) allThumbs[0].classList.add('active');

            // 3) تحديث السعر (السعر الأساسي + priceDiff) مع تطبيق الخصم
            const basePrice = product.price + priceDiff;
            const discountedPrice = getDiscountedPrice(basePrice);

            if (detailPriceEl && !product.hasSizes) {
                detailPriceEl.innerHTML = `
                    ${hasActiveDiscount() ? `<span style="font-size: 1.1rem; color: #888; text-decoration: line-through;">${formatPrice(basePrice)}</span>` : ''}
                    <span style="font-size: 2rem; font-weight: 700; color: var(--secondary);">${formatPrice(discountedPrice)}</span>
                `;
            }

            // 4) تخزين السعر الجديد على الزر للاستخدام في addToCart
            if (addToCartBtn) {
                addToCartBtn.dataset.selectedPrice = discountedPrice.toFixed(2);
                addToCartBtn.dataset.basePrice = basePrice;
            }

            // 5) 🟢 تحديث الوصف القصير والكامل (إن توفّر للـ variant، وإلا نرجع للأصلي)
            const newShortDesc = variantData.shortDesc || product.shortDesc || '';
            const newFullDesc  = variantData.fullDesc  || product.fullDesc  || product.description || '';

            if (detailDescriptionShort) {
                // تأثير fade لطيف عند التبديل
                detailDescriptionShort.style.opacity = '0';
                detailDescriptionFull.style.opacity = '0';
                setTimeout(() => {
                    detailDescriptionShort.textContent = newShortDesc;
                    detailDescriptionFull.textContent  = newFullDesc;
                    detailDescriptionShort.style.opacity = '1';
                    detailDescriptionFull.style.opacity = '1';
                }, 120);
            }
        };

        variantBoxes.forEach(box => {
            box.addEventListener('click', () => applyVariant(box));
        });

        // تفعيل أول variant تلقائياً
        if (variantBoxes.length > 0) applyVariant(variantBoxes[0]);
    }

    document.getElementById('detailAddToCartBtnClone').addEventListener('click', (e) => {
        const productId = parseInt(e.currentTarget.dataset.id);
        const hasSizes = e.currentTarget.dataset.hasSizes === 'true';
        let sizeIndex = null;
        let finalPrice = parseFloat(e.currentTarget.dataset.selectedPrice);

        // قراءة اللون المختار
        const activeCircle = detailPriceRow.querySelector('.color-option-circle.active');
        const selectedColorName = activeCircle ? activeCircle.dataset.name : null;

        // قراءة الـ variant المختار
        const activeVariant = detailPriceRow.querySelector('.variant-option-box.active');
        const selectedVariantName = activeVariant ? activeVariant.dataset.name : null;
        const variantRequiresCustomText = activeVariant ? activeVariant.dataset.custom === 'true' : false;

        // 🟢 لو الـ variant المختار يطلب نص مخصص - نتحقق من القيمة (واللغة لو محددة)
        let customVariantText = null;
        let customVariantLabelKey = null;
        if (variantRequiresCustomText) {
            const customTextInput = document.getElementById('variantCustomTextInput');
            const val = customTextInput ? (customTextInput.value || '').trim() : '';
            if (!val) {
                if (customTextInput) {
                    customTextInput.classList.add('field-error');
                    customTextInput.focus();
                    if (typeof showToast === 'function') {
                        showToast(texts.variantCustomNameError || 'الرجاء كتابة الاسم', 'error');
                    }
                }
                return;
            }
            // 🟢 لو محدد lang='en' نتأكد إنه ما في حروف عربية (أحرف لاتينية + مسافة + شرطة + فاصلة عليا فقط)
            const requiredLang = customTextInput ? customTextInput.dataset.lang : 'any';
            if (requiredLang === 'en') {
                const latinOnly = /^[A-Za-z\s\-'.]+$/.test(val);
                if (!latinOnly) {
                    customTextInput.classList.add('field-error');
                    customTextInput.focus();
                    if (typeof showToast === 'function') {
                        showToast(texts.variantCustomNameLatinError || 'Latin letters only', 'error');
                    }
                    return;
                }
            }
            customVariantText = val;

            // 🟢 احفظ مفتاح الـ label عشان نستخدمه في رسالة الواتساب
            const variantIndex = parseInt(activeVariant.dataset.index);
            const variantData = product.variants[variantIndex];
            const cfg = (variantData && typeof variantData.requiresCustomText === 'object') ? variantData.requiresCustomText : null;
            customVariantLabelKey = (cfg && cfg.labelKey) ? cfg.labelKey : null;
        }

        if (hasSizes) {
            sizeIndex = e.currentTarget.dataset.selectedSizeIndex || '0';
        } else if (!selectedVariantName) {
            // لا يوجد variant، استخدم السعر الأساسي
            finalPrice = getDiscountedPrice(product.price);
        }
        // لو في variant، فـ finalPrice محسوب فعلاً من dataset.selectedPrice

        // 🟢 لو لوحة مخصصة - نفتح موديل التصميم المخصص بدل الإضافة للسلة
        if (product.requiresCustomForm || product.isCustomDesign) {
            document.getElementById('productDetailModal').classList.remove('active');
            openCustomDesignForm(product, e.currentTarget);
            return;
        }

        // 🟢 لو المنتج بدو نموذج تخصيص (عيد الزواج) - نفتح الموديل بدل ما نضيفه
        if (product.requiresWeddingForm) {
            document.getElementById('productDetailModal').classList.remove('active');
            openWeddingForm(product, e.currentTarget, {
                sizeIndex, finalPrice, selectedColorName, selectedVariantName
            });
            return;
        }

        addToCart(productId, sizeIndex, finalPrice, selectedColorName, e.currentTarget, selectedVariantName, null, customVariantText, customVariantLabelKey);
        document.getElementById('productDetailModal').classList.remove('active');
    });
    
    const allImages = [product.image, ...dynamicGallery];
    thumbnailGallery.innerHTML = allImages.map(src => `<img src="${src}" class="thumbnail" alt="صورة المنتج" loading="lazy">`).join('');
    
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
// --- 🟢 WEDDING CUSTOMIZATION FORM (عيد الزواج) ---
// =================================================================
let _pendingWeddingProduct = null;
let _pendingWeddingSourceEl = null;
let _pendingWeddingExtras = null;

// حالة الـ date picker
let _weddingDateState = { day: null, month: null, year: null };

function resetWeddingDatePicker() {
    _weddingDateState = { day: null, month: null, year: null };
    const hidden = document.getElementById('weddingDate');
    if (hidden) hidden.value = '';
    const display = document.getElementById('weddingDateDisplay');
    if (display) {
        display.textContent = texts.weddingDatePlaceholder || '—';
        display.classList.add('placeholder');
    }
    const dropdown = document.getElementById('weddingDateDropdown');
    if (dropdown) dropdown.classList.remove('open');
    const trigger = document.getElementById('weddingDateTrigger');
    if (trigger) {
        trigger.classList.remove('open');
        trigger.classList.remove('field-error');
    }
    buildWeddingDateWheels();
}

function buildWeddingDateWheels() {
    const dayWheel = document.getElementById('weddingDayWheel');
    const monthWheel = document.getElementById('weddingMonthWheel');
    const yearWheel = document.getElementById('weddingYearWheel');
    if (!dayWheel || !monthWheel || !yearWheel) return;

    const currentYear = new Date().getFullYear();
    const minYear = 1950;

    // أيام 1-31 (راح نتأكد من صحة اليوم لاحقاً بناءً على الشهر/السنة)
    let dayHTML = '';
    for (let d = 1; d <= 31; d++) {
        dayHTML += `<button type="button" class="wedding-date-item" data-day="${d}">${d}</button>`;
    }
    dayWheel.innerHTML = dayHTML;

    // أشهر — حسب اللغة
    let monthHTML = '';
    (texts.weddingMonthsList || []).forEach((name, idx) => {
        monthHTML += `<button type="button" class="wedding-date-item" data-month="${idx + 1}">${name}</button>`;
    });
    monthWheel.innerHTML = monthHTML;

    // سنوات من اليوم لـ 1950 (ترتيب تنازلي عشان السنة الحالية تكون أول شي يشوفها)
    let yearHTML = '';
    for (let y = currentYear; y >= minYear; y--) {
        yearHTML += `<button type="button" class="wedding-date-item" data-year="${y}">${y}</button>`;
    }
    yearWheel.innerHTML = yearHTML;

    // ربط الكليكات
    dayWheel.querySelectorAll('.wedding-date-item').forEach(btn => {
        btn.addEventListener('click', () => selectWeddingDatePart('day', parseInt(btn.dataset.day), btn));
    });
    monthWheel.querySelectorAll('.wedding-date-item').forEach(btn => {
        btn.addEventListener('click', () => selectWeddingDatePart('month', parseInt(btn.dataset.month), btn));
    });
    yearWheel.querySelectorAll('.wedding-date-item').forEach(btn => {
        btn.addEventListener('click', () => selectWeddingDatePart('year', parseInt(btn.dataset.year), btn));
    });
}

function selectWeddingDatePart(part, value, btn) {
    _weddingDateState[part] = value;

    // تحديد الزر النشط
    const wheel = btn.parentElement;
    wheel.querySelectorAll('.wedding-date-item').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    // تمرير الزر لمنتصف العرض
    btn.scrollIntoView({ block: 'center', behavior: 'smooth' });

    // التحقق من صحة اليوم لو السنة/الشهر تغيروا (مثلاً 31 فبراير ما بصير)
    validateWeddingDay();

    // تحديث العرض في الزر الرئيسي
    updateWeddingDateDisplay();
}

function validateWeddingDay() {
    const { day, month, year } = _weddingDateState;
    if (!day || !month || !year) return;

    // عدد أيام الشهر
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day > daysInMonth) {
        // لو اليوم المختار أكبر من ممكن (مثلاً 31 فبراير)، نعدله لآخر يوم بالشهر
        _weddingDateState.day = daysInMonth;
        const dayWheel = document.getElementById('weddingDayWheel');
        dayWheel.querySelectorAll('.wedding-date-item').forEach(b => {
            b.classList.toggle('selected', parseInt(b.dataset.day) === daysInMonth);
        });
    }

    // التأكد من إن التاريخ مش بالمستقبل
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const selected = new Date(_weddingDateState.year, _weddingDateState.month - 1, _weddingDateState.day);
    if (selected > today) {
        // نرجعه لتاريخ اليوم
        _weddingDateState = {
            day: today.getDate(),
            month: today.getMonth() + 1,
            year: today.getFullYear()
        };
        rehighlightWeddingDateWheels();
    }
}

function rehighlightWeddingDateWheels() {
    const { day, month, year } = _weddingDateState;
    const highlight = (wheelId, attr, val) => {
        const wheel = document.getElementById(wheelId);
        if (!wheel) return;
        wheel.querySelectorAll('.wedding-date-item').forEach(b => {
            b.classList.toggle('selected', parseInt(b.dataset[attr]) === val);
        });
    };
    if (day) highlight('weddingDayWheel', 'day', day);
    if (month) highlight('weddingMonthWheel', 'month', month);
    if (year) highlight('weddingYearWheel', 'year', year);
}

function updateWeddingDateDisplay() {
    const { day, month, year } = _weddingDateState;
    const display = document.getElementById('weddingDateDisplay');
    const hidden = document.getElementById('weddingDate');
    if (!display) return;

    if (day && month && year) {
        const monthName = (texts.weddingMonthsList || [])[month - 1] || month;
        display.textContent = `${day} ${monthName} ${year}`;
        display.classList.remove('placeholder');
        // حفظ بصيغة YYYY-MM-DD بالـ hidden input
        const mm = String(month).padStart(2, '0');
        const dd = String(day).padStart(2, '0');
        if (hidden) hidden.value = `${year}-${mm}-${dd}`;

        // إزالة حالة الخطأ
        const trigger = document.getElementById('weddingDateTrigger');
        if (trigger) trigger.classList.remove('field-error');
        const errorEl = document.getElementById('weddingFormErrorMsg');
        if (errorEl) errorEl.classList.remove('show');
    } else {
        display.textContent = texts.weddingDatePlaceholder || '—';
        display.classList.add('placeholder');
        if (hidden) hidden.value = '';
    }
}

function toggleWeddingDateDropdown(forceClose = false) {
    const dropdown = document.getElementById('weddingDateDropdown');
    const trigger = document.getElementById('weddingDateTrigger');
    if (!dropdown || !trigger) return;

    if (forceClose || dropdown.classList.contains('open')) {
        dropdown.classList.remove('open');
        trigger.classList.remove('open');
    } else {
        dropdown.classList.add('open');
        trigger.classList.add('open');
        // تمرير العناصر المختارة لمنتصف العرض لو موجودة، أو لأعلى لو ما في
        setTimeout(() => {
            ['weddingDayWheel', 'weddingMonthWheel', 'weddingYearWheel'].forEach(id => {
                const wheel = document.getElementById(id);
                if (!wheel) return;
                const selected = wheel.querySelector('.wedding-date-item.selected');
                if (selected) {
                    selected.scrollIntoView({ block: 'center', behavior: 'auto' });
                } else {
                    wheel.scrollTop = 0;
                }
            });
        }, 50);
    }
}

function openWeddingForm(product, sourceEl = null, extras = null) {
    _pendingWeddingProduct = product;
    _pendingWeddingSourceEl = sourceEl;
    _pendingWeddingExtras = extras; // {sizeIndex, finalPrice, selectedColorName, selectedVariantName}

    const modal = document.getElementById('weddingFormModal');
    if (!modal) return;

    // تطبيق نصوص اللغة الحالية
    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const setPlaceholder = (id, val) => { const el = document.getElementById(id); if (el) el.placeholder = val; };

    setText('weddingFormTitle', texts.weddingFormTitle);
    setText('weddingFormSubtitle', texts.weddingFormSubtitle);
    setText('weddingInitial1Label', texts.weddingFormInitial1);
    setText('weddingInitial2Label', texts.weddingFormInitial2);
    setText('weddingDateLabel', texts.weddingFormDate);
    setText('weddingCustomTextLabel', texts.weddingFormCustomText);
    setText('weddingFormHint', texts.weddingFormRequiredHint);
    setText('weddingFormSubmitText', texts.weddingFormSubmit);
    document.getElementById('weddingFormCancelBtn').textContent = texts.weddingFormCancel;

    // تسميات الـ date picker
    setText('weddingDayLabel', texts.weddingDateDay);
    setText('weddingMonthLabel', texts.weddingDateMonth);
    setText('weddingYearLabel', texts.weddingDateYear);
    document.getElementById('weddingDateClear').textContent = texts.weddingDateClear;
    document.getElementById('weddingDateConfirm').textContent = texts.weddingDateConfirm;

    setPlaceholder('weddingInitial1', texts.weddingFormInitial1Placeholder);
    setPlaceholder('weddingInitial2', texts.weddingFormInitial2Placeholder);
    setPlaceholder('weddingCustomText', texts.weddingFormCustomTextPlaceholder);

    // معاينة المنتج
    const previewImg = document.getElementById('weddingFormProductImg');
    const previewName = document.getElementById('weddingFormProductName');
    const previewPrice = document.getElementById('weddingFormProductPrice');
    if (previewImg) { previewImg.src = product.image; previewImg.alt = product.name; }
    if (previewName) previewName.textContent = product.name;
    if (previewPrice) {
        const finalPrice = (extras && extras.finalPrice) ? extras.finalPrice : getDiscountedPrice(product.price);
        previewPrice.textContent = formatPrice(finalPrice);
    }

    // مسح القيم القديمة
    document.getElementById('weddingInitial1').value = '';
    document.getElementById('weddingInitial2').value = '';
    document.getElementById('weddingCustomText').value = '';
    document.getElementById('weddingFormErrorMsg').textContent = '';
    document.getElementById('weddingFormErrorMsg').classList.remove('show');

    // إعادة بناء date picker
    resetWeddingDatePicker();

    modal.classList.add('active');

    // فوكس على أول حقل بعد فتح الموديل
    setTimeout(() => {
        const firstInput = document.getElementById('weddingInitial1');
        if (firstInput) firstInput.focus();
    }, 300);
}

function closeWeddingForm() {
    const modal = document.getElementById('weddingFormModal');
    if (modal) modal.classList.remove('active');
    _pendingWeddingProduct = null;
    _pendingWeddingSourceEl = null;
    _pendingWeddingExtras = null;
}

function submitWeddingForm() {
    if (!_pendingWeddingProduct) return;

    const initial1Input = document.getElementById('weddingInitial1');
    const initial2Input = document.getElementById('weddingInitial2');
    const dateInput = document.getElementById('weddingDate'); // hidden
    const dateTrigger = document.getElementById('weddingDateTrigger');
    const customTextInput = document.getElementById('weddingCustomText');
    const errorEl = document.getElementById('weddingFormErrorMsg');

    const initial1 = (initial1Input.value || '').trim();
    const initial2 = (initial2Input.value || '').trim();
    const date = (dateInput.value || '').trim();
    const customText = (customTextInput.value || '').trim();

    // مسح حالة الخطأ السابقة
    [initial1Input, initial2Input].forEach(el => el.classList.remove('field-error'));
    if (dateTrigger) dateTrigger.classList.remove('field-error');
    errorEl.classList.remove('show');
    errorEl.textContent = '';

    // التحقق من الحقول الإجبارية
    let hasError = false;
    if (!initial1) { initial1Input.classList.add('field-error'); hasError = true; }
    if (!initial2) { initial2Input.classList.add('field-error'); hasError = true; }
    if (!date && dateTrigger) { dateTrigger.classList.add('field-error'); hasError = true; }

    if (hasError) {
        errorEl.textContent = texts.weddingFormError;
        errorEl.classList.add('show');
        return;
    }

    const weddingData = {
        initial1: initial1,
        initial2: initial2,
        date: date,
        customText: customText || null
    };

    const product = _pendingWeddingProduct;
    const sourceEl = _pendingWeddingSourceEl;
    const extras = _pendingWeddingExtras;

    if (extras) {
        addToCart(
            product.id,
            extras.sizeIndex,
            extras.finalPrice,
            extras.selectedColorName,
            sourceEl,
            extras.selectedVariantName,
            weddingData
        );
    } else {
        addToCart(product.id, null, null, null, sourceEl, null, weddingData);
    }

    closeWeddingForm();
}

// تنسيق التاريخ بالعرض (مثلاً 15/03/2024)
function formatWeddingDate(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-'); // YYYY-MM-DD
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

// =================================================================
// 🟢 LOGIC الـ Custom Design Form (طلب لوحة مخصصة)
// =================================================================
let _pendingCustomDesignProduct = null;
let _pendingCustomDesignSourceEl = null;
let _selectedDesignType = null;
let _selectedDesignSize = null;

function openCustomDesignForm(product, sourceEl = null) {
    _pendingCustomDesignProduct = product;
    _pendingCustomDesignSourceEl = sourceEl;
    _selectedDesignType = null;
    _selectedDesignSize = null;

    const modal = document.getElementById('customDesignModal');
    if (!modal) return;

    // تطبيق نصوص اللغة الحالية
    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

    setText('customDesignFormTitle', texts.customDesignFormTitle);
    setText('customDesignFormSubtitle', texts.customDesignFormSubtitle);
    setText('customDesignTypeLabel', texts.customDesignTypeLabel);
    setText('customDesignTextLabel', texts.customDesignTextLabel);
    setText('customDesignSizeLabel', texts.customDesignSizeLabel);
    setText('customDesignNotesLabel', texts.customDesignNotesLabel);
    setText('customDesignHint', texts.customDesignRequiredHint);
    setText('customDesignSubmitText', texts.customDesignSubmit);
    setText('customDesignWidthLabel', texts.customDesignWidthLabel);
    setText('customDesignHeightLabel', texts.customDesignHeightLabel);
    setText('customDesignCustomSizeHint', texts.customDesignCustomSizeHint);
    document.getElementById('customDesignCancelBtn').textContent = texts.customDesignCancel;

    // placeholders الخانات
    const widthInput = document.getElementById('customDesignWidth');
    const heightInput = document.getElementById('customDesignHeight');
    if (widthInput) { widthInput.placeholder = texts.customDesignWidthPlaceholder || ''; widthInput.value = ''; }
    if (heightInput) { heightInput.placeholder = texts.customDesignHeightPlaceholder || ''; heightInput.value = ''; }

    // إخفاء حقول المقاس المخصص افتراضياً
    const customSizeBlock = document.getElementById('customDesignCustomSize');
    if (customSizeBlock) customSizeBlock.classList.remove('active');

    // معاينة المنتج
    const previewImg = document.getElementById('customDesignProductImg');
    const previewName = document.getElementById('customDesignProductName');
    const previewPrice = document.getElementById('customDesignProductPrice');
    if (previewImg) { previewImg.src = product.image; previewImg.alt = product.name; }
    if (previewName) previewName.textContent = product.name;
    if (previewPrice) previewPrice.textContent = texts.customDesignPriceLabel;

    // بناء أنواع التصميم (cards)
    const typesGrid = document.getElementById('customDesignTypesGrid');
    if (typesGrid) {
        typesGrid.innerHTML = '';
        (texts.customDesignTypes || []).forEach(t => {
            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'custom-design-type-card';
            card.dataset.value = t.value;
            card.innerHTML = `
                <i class="fas ${t.icon}"></i>
                <span class="custom-design-type-name">${t.label}</span>
            `;
            card.addEventListener('click', () => selectDesignType(t.value, card));
            typesGrid.appendChild(card);
        });
    }

    // بناء المقاسات (cards)
    const sizesGrid = document.getElementById('customDesignSizesGrid');
    if (sizesGrid) {
        sizesGrid.innerHTML = '';
        (texts.customDesignSizes || []).forEach(s => {
            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'custom-design-size-card';
            card.dataset.value = s.value;
            card.innerHTML = `
                <span class="custom-design-size-name">${s.label}</span>
                <span class="custom-design-size-desc">${s.desc}</span>
            `;
            card.addEventListener('click', () => selectDesignSize(s.value, card));
            sizesGrid.appendChild(card);
        });
    }

    // مسح القيم القديمة
    const textInput = document.getElementById('customDesignText');
    const notesInput = document.getElementById('customDesignNotes');
    if (textInput) {
        textInput.value = '';
        textInput.placeholder = texts.customDesignTextPlaceholderVerse || '';
    }
    if (notesInput) {
        notesInput.value = '';
        notesInput.placeholder = texts.customDesignNotesPlaceholder || '';
    }
    document.getElementById('customDesignErrorMsg').textContent = '';
    document.getElementById('customDesignErrorMsg').classList.remove('show');

    // إزالة حالات الـ error
    document.querySelectorAll('#customDesignModal .field-error').forEach(el => el.classList.remove('field-error'));

    modal.classList.add('active');

    // فوكس على أول حقل بعد فتح الموديل
    setTimeout(() => {
        const firstCard = typesGrid && typesGrid.querySelector('.custom-design-type-card');
        if (firstCard) firstCard.focus();
    }, 300);
}

function selectDesignType(value, cardEl) {
    _selectedDesignType = value;
    // تحديث الـ UI
    document.querySelectorAll('#customDesignTypesGrid .custom-design-type-card').forEach(c => c.classList.remove('selected'));
    if (cardEl) cardEl.classList.add('selected');
    // إزالة الـ error
    document.getElementById('customDesignTypesGrid').classList.remove('field-error');

    // تحديث placeholder حسب النوع
    const textInput = document.getElementById('customDesignText');
    if (textInput) {
        const placeholderMap = {
            verse: texts.customDesignTextPlaceholderVerse,
            hadith: texts.customDesignTextPlaceholderHadith,
            dua: texts.customDesignTextPlaceholderDua,
            poem: texts.customDesignTextPlaceholderPoem,
            name: texts.customDesignTextPlaceholderName,
            other: texts.customDesignTextPlaceholderOther
        };
        textInput.placeholder = placeholderMap[value] || '';
    }
}

function selectDesignSize(value, cardEl) {
    _selectedDesignSize = value;
    document.querySelectorAll('#customDesignSizesGrid .custom-design-size-card').forEach(c => c.classList.remove('selected'));
    if (cardEl) cardEl.classList.add('selected');
    document.getElementById('customDesignSizesGrid').classList.remove('field-error');

    // 🟢 إظهار/إخفاء خانات الطول والعرض حسب الاختيار
    const customSizeBlock = document.getElementById('customDesignCustomSize');
    if (customSizeBlock) {
        if (value === 'custom') {
            customSizeBlock.classList.add('active');
            // فوكس على خانة العرض بعد الـ animation
            setTimeout(() => {
                const widthInput = document.getElementById('customDesignWidth');
                if (widthInput) widthInput.focus();
            }, 250);
        } else {
            customSizeBlock.classList.remove('active');
            // إزالة حالات الخطأ
            const widthInput = document.getElementById('customDesignWidth');
            const heightInput = document.getElementById('customDesignHeight');
            if (widthInput) widthInput.classList.remove('field-error');
            if (heightInput) heightInput.classList.remove('field-error');
        }
    }
}

function closeCustomDesignForm() {
    const modal = document.getElementById('customDesignModal');
    if (modal) modal.classList.remove('active');
    _pendingCustomDesignProduct = null;
    _pendingCustomDesignSourceEl = null;
    _selectedDesignType = null;
    _selectedDesignSize = null;
}

function submitCustomDesignForm() {
    if (!_pendingCustomDesignProduct) return;

    const textInput = document.getElementById('customDesignText');
    const notesInput = document.getElementById('customDesignNotes');
    const errorEl = document.getElementById('customDesignErrorMsg');
    const typesGrid = document.getElementById('customDesignTypesGrid');
    const sizesGrid = document.getElementById('customDesignSizesGrid');
    const widthInput = document.getElementById('customDesignWidth');
    const heightInput = document.getElementById('customDesignHeight');

    const designText = (textInput.value || '').trim();
    const notes = (notesInput.value || '').trim();

    // مسح حالة الخطأ السابقة
    textInput.classList.remove('field-error');
    typesGrid.classList.remove('field-error');
    sizesGrid.classList.remove('field-error');
    if (widthInput) widthInput.classList.remove('field-error');
    if (heightInput) heightInput.classList.remove('field-error');
    errorEl.classList.remove('show');
    errorEl.textContent = '';

    // التحقق من الحقول الإجبارية
    let hasError = false;
    let customErrorMsg = texts.customDesignError;

    if (!_selectedDesignType) { typesGrid.classList.add('field-error'); hasError = true; }
    if (!designText) { textInput.classList.add('field-error'); hasError = true; }
    if (!_selectedDesignSize) { sizesGrid.classList.add('field-error'); hasError = true; }

    // 🟢 لو اختار "مقاس مخصص" لازم يعبي العرض والطول
    let customWidth = null, customHeight = null;
    if (_selectedDesignSize === 'custom') {
        const wVal = widthInput ? parseInt(widthInput.value, 10) : NaN;
        const hVal = heightInput ? parseInt(heightInput.value, 10) : NaN;
        const wOk = !isNaN(wVal) && wVal >= 10 && wVal <= 500;
        const hOk = !isNaN(hVal) && hVal >= 10 && hVal <= 500;
        if (!wOk) { if (widthInput) widthInput.classList.add('field-error'); hasError = true; }
        if (!hOk) { if (heightInput) heightInput.classList.add('field-error'); hasError = true; }
        if (!wOk || !hOk) customErrorMsg = texts.customDesignCustomSizeError;
        customWidth = wVal;
        customHeight = hVal;
    }

    if (hasError) {
        errorEl.textContent = customErrorMsg;
        errorEl.classList.add('show');
        return;
    }

    // ابحث عن اسم النوع والمقاس بالنص (للعرض في رسالة الواتساب)
    const typeObj = (texts.customDesignTypes || []).find(t => t.value === _selectedDesignType);
    const sizeObj = (texts.customDesignSizes || []).find(s => s.value === _selectedDesignSize);
    const typeLabel = typeObj ? typeObj.label : _selectedDesignType;
    // 🟢 لو "مقاس مخصص" نعرض القياس الفعلي اللي كتبه الزبون
    let sizeLabel;
    const cmUnit = currentLang === 'ar' ? 'سم' : 'cm';
    if (_selectedDesignSize === 'custom') {
        sizeLabel = `${customWidth}×${customHeight} ${cmUnit}`;
    } else {
        sizeLabel = sizeObj ? `${sizeObj.label} (${sizeObj.desc})` : _selectedDesignSize;
    }

    const product = _pendingCustomDesignProduct;

    // بناء رسالة واتساب
    let message = '';
    message += `${texts.customDesignWhatsAppIntro}\n`;
    message += `━━━━━━━━━━━━━━━\n`;
    message += `🎨 *${product.name}*\n`;
    message += `━━━━━━━━━━━━━━━\n`;
    message += `📌 *${texts.customDesignTypeDisplay}:* ${typeLabel}\n`;
    message += `📏 *${texts.customDesignSizeDisplay}:* ${sizeLabel}\n`;
    message += `━━━━━━━━━━━━━━━\n`;
    message += `📝 *${texts.customDesignTextDisplay}:*\n${designText}\n`;
    if (notes) {
        message += `━━━━━━━━━━━━━━━\n`;
        message += `💬 *${texts.customDesignNotesDisplay}:*\n${notes}\n`;
    }
    message += `${texts.customDesignWhatsAppOutro}`;

    // فتح واتساب
    window.open(buildWhatsAppLink(message), '_blank');

    // إغلاق الموديل
    closeCustomDesignForm();
}

function addToCart(productId, selectedSizeIndex = null, finalPrice = null, selectedColorName = null, sourceEl = null, selectedVariantName = null, weddingData = null, customVariantText = null, customVariantLabelKey = null) {
    const product = products.find(p => p.id === productId); 
    if (!product) return;
    
    let price;
    if (finalPrice !== null) {
        price = finalPrice;
    } else {
        price = getDiscountedPrice(product.price);
    }
    price = parseFloat(price.toFixed(2));

    const colorSuffix = selectedColorName ? `-${selectedColorName}` : '';
    const variantSuffix = selectedVariantName ? `-${selectedVariantName}` : '';
    // 🟢 لو في wedding data، نخلي الـ id فريد بحيث كل تخصيص يكون عنصر منفصل بالسلة
    const weddingSuffix = weddingData
        ? `-w${weddingData.initial1}${weddingData.initial2}${weddingData.date}${(weddingData.customText || '').slice(0, 6)}`
        : '';
    // 🟢 لو في customVariantText (مثلاً اسم نادي مخصص للفاصل)، نضيفه للـ id حتى كل طلب مخصص يكون عنصر منفصل
    const customVariantSuffix = customVariantText
        ? `-c${customVariantText.slice(0, 12).replace(/\s+/g, '_')}`
        : '';
    const cartItemId = selectedSizeIndex !== null 
        ? `${productId}-${selectedSizeIndex}${colorSuffix}${variantSuffix}${weddingSuffix}${customVariantSuffix}` 
        : `${productId}${colorSuffix}${variantSuffix}${weddingSuffix}${customVariantSuffix}`;
    
    let sizeName = '';
    if (selectedSizeIndex !== null && product.hasSizes) {
        sizeName = texts.sizeOptions[parseInt(selectedSizeIndex)]?.name || '';
    }

    // 🟢 دمج اسم الـ variant بنهاية اسم المنتج
    // مثال: "طباعة ثلاثية الأبعاد - لويجي" / "فاصل كتب جلدي - مخصص (ليفربول)"
    let displayName;
    if (customVariantText) {
        displayName = `${product.name} - ${selectedVariantName} (${customVariantText})`;
    } else if (selectedVariantName) {
        displayName = `${product.name} - ${selectedVariantName}`;
    } else {
        displayName = product.name;
    }

    const existingItem = cart.find(item => item.id === cartItemId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ 
            id: cartItemId, productId: product.id, name: displayName, 
            price: price, quantity: 1, sizeName, image: product.image,
            colorName: selectedColorName,
            variantName: selectedVariantName,
            customVariantText: customVariantText, // 🟢 النص المخصص (اسم النادي/اللاعب/الولد/البنت)
            customVariantLabelKey: customVariantLabelKey, // 🟢 مفتاح الـ label لرسالة الواتساب
            weddingData: weddingData // 🟢 حفظ بيانات التخصيص
        });
    }
    
    saveCartToStorage();
    updateCartUI();
    updateFloatingCart();
    
    // 🟢 أنيميشن الطيران للسلة
    if (sourceEl) {
        flyToTarget(sourceEl, 'cartIcon', { 
            type: 'image',
            imageSrc: product.image
        });
    }
    
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
        totalPrice.textContent = formatPrice(0);
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        const sizeDisplay = item.sizeName ? `<div style="font-size: 0.85rem; color: #777;">(${item.sizeName})</div>` : '';
        const colorDisplay = item.colorName ? `<div style="font-size: 0.85rem; color: #777;">🎨 ${item.colorName}</div>` : '';
        // 🟢 عرض بيانات التخصيص (عيد الزواج) لو موجودة
        let weddingDisplay = '';
        if (item.weddingData) {
            const w = item.weddingData;
            const initialsTxt = `${w.initial1} & ${w.initial2}`;
            const dateTxt = formatWeddingDate(w.date);
            const customLine = w.customText
                ? `<div class="wedding-custom-text-line">📝 ${w.customText}</div>`
                : '';
            weddingDisplay = `
                <div class="wedding-cart-details">
                    <div class="wedding-cart-line">💞 <strong>${initialsTxt}</strong></div>
                    <div class="wedding-cart-line">📅 ${dateTxt}</div>
                    ${customLine}
                </div>
            `;
        }
        // 🟢 عرض النص المخصص للـ variant (مثلاً اسم نادي/لاعب/ولد/بنت)
        let customVariantDisplay = '';
        if (item.customVariantText) {
            // استخدم أيقونة مناسبة حسب نوع الـ variant
            const icon = item.customVariantLabelKey === 'variantCustomNameForGirl'
                ? '👧'
                : item.customVariantLabelKey === 'variantCustomNameForBoy'
                ? '👦'
                : '⚽';
            customVariantDisplay = `
                <div class="wedding-cart-details">
                    <div class="wedding-cart-line">${icon} <strong>${item.customVariantText}</strong></div>
                </div>
            `;
        }
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        // 🟢 إصلاح السلة: إضافة <img> هنا
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="modal-item-img" loading="lazy">
            <div class="item-details">
                <div class="item-name">${item.name} ${sizeDisplay} ${colorDisplay}</div>
                ${weddingDisplay}
                ${customVariantDisplay}
                <div class="item-price">${formatPrice(item.price)}</div>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
            <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>`;
        cartItems.appendChild(cartItem);
    });
    
    totalPrice.textContent = formatPrice(total);
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
    cartItems.querySelectorAll('.remove-item').forEach(btn => btn.addEventListener('click', (e) => {
        // 🟢 أنيميشن الحذف قبل الحذف الفعلي
        const cartItemEl = e.currentTarget.closest('.cart-item');
        const cartItemId = e.currentTarget.dataset.id;
        animateRemoveAndExecute(cartItemEl, 'removing', () => removeFromCart(cartItemId), 'cart');
    }));
}

// 🟢 دالة مشتركة: تشغل أنيميشن الحذف ثم تنفذ الحذف الفعلي
function animateRemoveAndExecute(element, removeClass, removeFn, type = 'cart') {
    if (!element) {
        removeFn();
        return;
    }
    
    // احترم تفضيل تقليل الحركة - نفذ الحذف فوراً
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        removeFn();
        return;
    }
    
    // ثبّت ارتفاع العنصر الحالي قبل البدء (عشان الـ max-height في الـ keyframes يشتغل صح)
    element.style.maxHeight = `${element.offsetHeight}px`;
    
    // أضف كلاس الأنيميشن
    element.classList.add(removeClass);
    
    // نبض العداد لأسفل
    const targetIconId = type === 'fav' ? 'favoritesIcon' : 'cartIcon';
    const countEl = document.querySelector(`#${targetIconId} .cart-count`);
    if (countEl) {
        countEl.classList.add('bumping-down');
        setTimeout(() => countEl.classList.remove('bumping-down'), 500);
    }
    
    // بعد انتهاء الأنيميشن، نفّذ الحذف الفعلي (والذي سيعيد رسم القائمة)
    setTimeout(removeFn, 550);
}

function updateQuantity(cartItemId, change) {
    const item = cart.find(item => item.id === cartItemId);
    if (!item) return;
    
    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(cartItemId);
        return;
    }

    saveCartToStorage();

    // 🟢 تحديث جزئي بدون rerender كامل (لتجنب الأنيميشن المزعج)
    // نحدّث الرقم في العنصر نفسه + الإجمالي + السلة العائمة + الـ badge
    const itemEl = cartItems && cartItems.querySelector(`.quantity-btn[data-id="${cartItemId}"]`);
    if (itemEl) {
        const qtySpan = itemEl.parentElement.querySelector('span');
        if (qtySpan) qtySpan.textContent = item.quantity;
    }

    // تحديث الإجمالي
    const total = cart.reduce((sum, it) => sum + it.price * it.quantity, 0);
    if (totalPrice) totalPrice.textContent = formatPrice(total);

    // تحديث الـ badge على أيقونة السلة
    const totalCount = cart.reduce((sum, it) => sum + it.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalCount;
        cartCount.style.display = totalCount > 0 ? 'flex' : 'none';
    }

    // السلة العائمة
    updateFloatingCart();
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

// ============ 🟢 التعديل هنا (دالة حذف المفضلة) 🟢 ============
function clearFavorites() {
    favorites = [];
    saveFavoritesToStorage();
    updateFavoritesUI();
    renderFavoritesModal();
    renderAllSections(); // لتحديث القلوب على بطاقات المنتجات
}
// ========================================================

function proceedToCheckout() {
    if (cart.length === 0) return;
    // بدل ما نفتح واتساب مباشرة، نفتح نموذج الطلب
    openCheckoutForm();
}

// =================================================================
// --- 🟢 INQUIRY (الاستفسار عبر واتساب) ---
// =================================================================
function proceedToInquiry() {
    let message = texts.inquiryMessage || "مرحباً متجر طُرفة! عندي استفسار.\n\n";

    // لو السلة فيها منتجات، نضيفها كمرجع
    if (cart.length > 0) {
        const itemsLabel = currentLang === 'ar' ? 'المنتجات اللي بفكر فيها' : 'Items I\'m considering';
        const fromCart = currentLang === 'ar' ? '(من سلتي)' : '(from my cart)';

        message += `🛒 *${itemsLabel}* ${fromCart}:\n`;
        cart.forEach((item, idx) => {
            const sizeDetail = item.sizeName ? ` (${item.sizeName})` : '';
            const colorDetail = item.colorName ? ` - ${item.colorName}` : '';
            message += `${idx + 1}. ${item.name}${sizeDetail}${colorDetail} (×${item.quantity}) — ${formatPrice(item.price * item.quantity)}\n`;
        });
        message += `\n`;
    }

    // فتح واتساب
    window.open(buildWhatsAppLink(message), '_blank');
}

// =================================================================
// --- 🟢 CHECKOUT FORM (نموذج الطلب قبل واتساب) ---
// =================================================================
function openCheckoutForm() {
    // إخفاء موديل السلة وفتح نموذج الطلب
    document.getElementById('cartModal').classList.remove('active');
    populateCheckoutForm();
    document.getElementById('checkoutFormModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCheckoutForm() {
    document.getElementById('checkoutFormModal').classList.remove('active');
    document.body.style.overflow = '';
    // مسح الأخطاء
    document.getElementById('checkoutFormErrorMsg').textContent = '';
    document.querySelectorAll('.checkout-form-field.error').forEach(el => el.classList.remove('error'));
}

function populateCheckoutForm() {
    // تحديث النصوص حسب اللغة
    document.getElementById('checkoutFormTitle').textContent = texts.checkoutFormTitle;
    document.getElementById('checkoutFormSubtitle').textContent = texts.checkoutFormSubtitle;
    document.getElementById('checkoutSummaryTitle').textContent = texts.checkoutSummaryTitle;
    document.getElementById('checkoutSubtotalLabel').textContent = texts.checkoutSubtotalLabel;
    document.getElementById('checkoutShippingLabel').textContent = texts.checkoutShippingLabel;
    document.getElementById('checkoutTotalLabel').textContent = texts.checkoutTotalLabel;
    document.getElementById('checkoutNameLabel').textContent = texts.checkoutNameLabel;
    document.getElementById('checkoutPhoneLabel').textContent = texts.checkoutPhoneLabel;
    document.getElementById('checkoutPhone').placeholder = texts.checkoutPhonePlaceholder;
    document.getElementById('checkoutCityLabel').textContent = texts.checkoutCityLabel;
    document.getElementById('checkoutAddressLabel').textContent = texts.checkoutAddressLabel;
    document.getElementById('checkoutAddress').placeholder = texts.checkoutAddressPlaceholder;
    document.getElementById('checkoutPaymentLabel').textContent = texts.checkoutPaymentLabel;
    document.getElementById('checkoutPaymentCOD').textContent = texts.checkoutPaymentCOD;
    document.getElementById('checkoutPaymentCliQ').textContent = texts.checkoutPaymentCliQ;
    document.getElementById('checkoutNotesLabel').textContent = texts.checkoutNotesLabel;
    document.getElementById('checkoutFormHint').textContent = texts.checkoutFormHint;
    document.getElementById('checkoutFormCancelBtn').textContent = texts.checkoutFormCancel;
    document.getElementById('checkoutFormSubmitText').textContent = texts.checkoutFormSubmit;

    // 🟢 تحديث نصوص شريط التوصيل
    const shippingTitle = document.getElementById('checkoutShippingBannerTitle');
    const shippingSub = document.getElementById('checkoutShippingBannerSub');
    const pickupText = document.getElementById('checkoutPickupText');
    if (shippingTitle) shippingTitle.textContent = texts.checkoutShippingBannerTitle;
    if (shippingSub) shippingSub.textContent = texts.checkoutShippingBannerSub;
    if (pickupText) pickupText.textContent = texts.checkoutPickupText;

    // 🟢 ربط toggle التوصيل
    const shippingToggle = document.getElementById('checkoutShippingToggle');
    if (shippingToggle) {
        // افتراضياً التوصيل مفعّل
        if (typeof shippingToggle.dataset.initialized === 'undefined') {
            shippingToggle.checked = true;
            shippingToggle.dataset.initialized = 'true';
            shippingToggle.addEventListener('change', toggleShippingMode);
        }
        // نطبّق الحالة الحالية
        toggleShippingMode();
    }

    // ملء قائمة المدن (بدون أسعار - الرسوم موحدة)
    const citySelect = document.getElementById('checkoutCity');
    const currentCity = citySelect.value;
    citySelect.innerHTML = `<option value="">${texts.checkoutCityPlaceholder}</option>`;
    texts.checkoutCities.forEach((city, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = city.name;
        citySelect.appendChild(opt);
    });
    if (currentCity) citySelect.value = currentCity;

    // ملء ملخص الطلب
    renderCheckoutSummary();

    // تحديث الإجمالي عند تغيير المدينة (مش ضروري لأن الرسوم ثابتة، بس نخليه للأمان)
    citySelect.onchange = renderCheckoutSummary;
}

function renderCheckoutSummary() {
    const itemsContainer = document.getElementById('checkoutSummaryItems');
    itemsContainer.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        const lineTotal = item.price * item.quantity;
        subtotal += lineTotal;
        const sizeDetail = item.sizeName ? ` (${item.sizeName})` : '';
        const colorDetail = item.colorName ? ` - ${item.colorName}` : '';
        const div = document.createElement('div');
        div.className = 'checkout-summary-item';
        div.innerHTML = `
            <span class="checkout-summary-item-name">${item.name}${sizeDetail}${colorDetail}</span>
            <span class="checkout-summary-item-qty">×${item.quantity}</span>
            <span class="checkout-summary-item-price">${formatPrice(lineTotal)}</span>
        `;
        itemsContainer.appendChild(div);
    });

    // 🟢 رسوم التوصيل (بس لو التوصيل مفعّل)
    const shippingToggle = document.getElementById('checkoutShippingToggle');
    const shippingEnabled = shippingToggle ? shippingToggle.checked : true;
    const shippingFee = shippingEnabled ? (texts.shippingFee || 2.00) : 0;

    const total = subtotal + shippingFee;

    document.getElementById('checkoutSubtotalValue').textContent = formatPrice(subtotal);
    document.getElementById('checkoutShippingValue').textContent = shippingEnabled
        ? formatPrice(shippingFee)
        : (currentLang === 'ar' ? '— استلام شخصي' : '— Self-pickup');
    document.getElementById('checkoutTotalValue').textContent = formatPrice(total);
}

// 🟢 تبديل وضع التوصيل (مع توصيل / استلام شخصي)
function toggleShippingMode() {
    const toggle = document.getElementById('checkoutShippingToggle');
    const pickupNotice = document.getElementById('checkoutPickupNotice');
    const shippingFields = document.querySelectorAll('.checkout-shipping-field');
    const enabled = toggle ? toggle.checked : true;

    if (enabled) {
        // التوصيل مفعّل
        if (pickupNotice) pickupNotice.classList.remove('active');
        shippingFields.forEach(f => f.classList.remove('hidden'));
    } else {
        // استلام شخصي
        if (pickupNotice) pickupNotice.classList.add('active');
        shippingFields.forEach(f => f.classList.add('hidden'));
        // مسح أي خطأ سابق على حقول التوصيل
        shippingFields.forEach(f => f.classList.remove('error'));
        const errorMsg = document.getElementById('checkoutFormErrorMsg');
        if (errorMsg) errorMsg.textContent = '';
    }

    // إعادة حساب الإجمالي
    renderCheckoutSummary();
}

function validateCheckoutForm() {
    // 🟢 شيك إذا التوصيل مفعّل
    const shippingToggle = document.getElementById('checkoutShippingToggle');
    const shippingEnabled = shippingToggle ? shippingToggle.checked : true;

    // الحقول الأساسية دائماً إجبارية
    const fields = [
        { id: 'checkoutName', required: true },
        { id: 'checkoutPhone', required: true, type: 'phone' }
    ];

    // المدينة والعنوان إجباريين بس لو التوصيل مفعّل
    if (shippingEnabled) {
        fields.push({ id: 'checkoutCity', required: true });
        fields.push({ id: 'checkoutAddress', required: true });
    }

    let firstError = null;

    fields.forEach(f => {
        const el = document.getElementById(f.id);
        const wrapper = el.closest('.checkout-form-field');
        const value = el.value.trim();
        wrapper.classList.remove('error');

        if (f.required && !value) {
            wrapper.classList.add('error');
            if (!firstError) firstError = 'required';
        } else if (f.type === 'phone' && value) {
            // تحقق من رقم الهاتف: أرقام فقط، 9-15 رقم
            const cleaned = value.replace(/[\s\-+]/g, '');
            if (!/^\d{9,15}$/.test(cleaned)) {
                wrapper.classList.add('error');
                if (!firstError) firstError = 'phone';
            }
        }
    });

    const errorMsg = document.getElementById('checkoutFormErrorMsg');
    if (firstError === 'phone') {
        errorMsg.textContent = texts.checkoutFormErrorPhone;
    } else if (firstError === 'required') {
        errorMsg.textContent = texts.checkoutFormErrorRequired;
    } else {
        errorMsg.textContent = '';
    }

    return !firstError;
}

// 🟢 توليد رقم طلب فريد بصيغة TRF-YYMMDD-XXXX
// العدّاد بينحفظ بالـ localStorage عشان كل طلب ياخد رقم مختلف
function generateOrderNumber() {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const datePart = `${yy}${mm}${dd}`;

    let seq = 0;
    try {
        seq = parseInt(localStorage.getItem('turfaOrderSeq') || '0', 10);
        if (isNaN(seq)) seq = 0;
    } catch (e) {
        seq = 0;
    }
    seq += 1;
    try {
        localStorage.setItem('turfaOrderSeq', String(seq));
    } catch (e) { /* لو localStorage مش متاح، نكمل عادي */ }

    // رقم تسلسلي 4 خانات + جزء عشوائي عشان ما يتوقع بسهولة
    const seqPart = String(seq).padStart(4, '0');
    return `TRF-${datePart}-${seqPart}`;
}

function submitCheckoutForm() {
    if (!validateCheckoutForm()) {
        // التركيز على أول حقل فيه خطأ
        const firstErrorField = document.querySelector('.checkout-form-field.error input, .checkout-form-field.error select, .checkout-form-field.error textarea');
        if (firstErrorField) firstErrorField.focus();
        return;
    }

    // 🟢 شيك إذا التوصيل مفعّل
    const shippingToggle = document.getElementById('checkoutShippingToggle');
    const shippingEnabled = shippingToggle ? shippingToggle.checked : true;

    const name = document.getElementById('checkoutName').value.trim();
    const phone = document.getElementById('checkoutPhone').value.trim();
    const notes = document.getElementById('checkoutNotes').value.trim();
    const paymentRadio = document.querySelector('input[name="checkoutPayment"]:checked');
    const paymentValue = paymentRadio ? paymentRadio.value : 'cod';

    // 🟢 معلومات التوصيل (بس لو مفعّل)
    let cityName = '', address = '';
    let shippingFee = 0;
    if (shippingEnabled) {
        const cityIdx = document.getElementById('checkoutCity').value;
        cityName = texts.checkoutCities[cityIdx].name;
        address = document.getElementById('checkoutAddress').value.trim();
        shippingFee = texts.shippingFee || 2.00;
    }

    const paymentLabels = {
        cod: texts.checkoutPaymentCOD,
        cliq: texts.checkoutPaymentCliQ
    };

    // بناء رسالة واتساب
    const orderNumber = generateOrderNumber();
    let message = `${texts.whatsappGreeting}`;

    // 🟢 رقم الطلب — مرجع مشترك بينك وبين الزبون للمتابعة
    message += `🔖 *${texts.waOrderNumberLabel}: ${orderNumber}*\n`;

    // معلومات الزبون
    message += `━━━━━━━━━━━━━━━\n`;
    message += `👤 *${texts.waOrderInfoLabel}*\n`;
    message += `${texts.waNameLabel}: ${name}\n`;
    message += `${texts.waPhoneLabel}: ${phone}\n`;

    // 🟢 طريقة الاستلام: توصيل أو استلام شخصي
    if (shippingEnabled) {
        message += `${texts.waPickupLabel}: 🚚 ${texts.waShippingValue}\n`;
        message += `${texts.waCityLabel}: ${cityName}\n`;
        message += `${texts.waAddressLabel}: ${address}\n`;
    } else {
        message += `${texts.waPickupLabel}: 🏪 ${texts.waPickupValue}\n`;
    }

    message += `${texts.waPaymentLabel}: ${paymentLabels[paymentValue]}\n`;
    if (notes) {
        message += `${texts.waNotesLabel}: ${notes}\n`;
    }
    message += `━━━━━━━━━━━━━━━\n`;

    // المنتجات
    message += `🛍️ *${texts.waOrderItemsLabel}*\n`;
    let subtotal = 0;
    cart.forEach((item, idx) => {
        const sizeDetail = item.sizeName ? ` (${item.sizeName})` : '';
        const colorDetail = item.colorName ? ` - ${currentLang === 'ar' ? 'اللون' : 'Color'}: ${item.colorName}` : '';
        const lineTotal = item.price * item.quantity;
        subtotal += lineTotal;
        message += `${idx + 1}. ${item.name}${sizeDetail}${colorDetail} (×${item.quantity}) — ${formatPrice(lineTotal)}\n`;

        // تفاصيل التخصيص (عيد الزواج) لو موجودة
        if (item.weddingData) {
            const w = item.weddingData;
            const initialsLabel = currentLang === 'ar' ? 'الحروف' : 'Initials';
            const dateLabel = currentLang === 'ar' ? 'تاريخ الزواج' : 'Wedding Date';
            const customLabel = currentLang === 'ar' ? 'نص خاص' : 'Custom Text';
            message += `   • ${initialsLabel}: ${w.initial1} & ${w.initial2}\n`;
            message += `   • ${dateLabel}: ${formatWeddingDate(w.date)}\n`;
            if (w.customText) {
                message += `   • ${customLabel}: ${w.customText}\n`;
            }
        }

        // 🟢 تفاصيل النص المخصص للـ variant (اسم نادي/لاعب/ولد/بنت...)
        if (item.customVariantText) {
            // استخدم الـ labelKey لو موجود (مثلاً variantCustomNameForGirl)، وإلا الـ default للنادي
            const labelKey = item.customVariantLabelKey;
            const customLabel = (labelKey && texts[labelKey])
                || texts.variantCustomNameWhatsAppLabel
                || (currentLang === 'ar' ? 'الاسم المطلوب' : 'Requested Name');
            message += `   • ${customLabel}: ${item.customVariantText}\n`;
        }
    });

    // الإجماليات
    const total = subtotal + shippingFee;
    message += `━━━━━━━━━━━━━━━\n`;
    message += `${texts.waSubtotalLabel}: ${formatPrice(subtotal)}\n`;
    if (shippingEnabled) {
        message += `${texts.waShippingLabel}: ${formatPrice(shippingFee)}\n`;
    }
    message += `*${texts.total} ${formatPrice(total)}*`;
    message += `${texts.whatsappThanks}`;

    // فتح واتساب
    window.open(buildWhatsAppLink(message), '_blank');

    // إغلاق الموديل
    closeCheckoutForm();
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
    
    // 🟢 بدل إعادة رسم كل الأقسام، نحدّث فقط أزرار القلب لهذا المنتج
    // (هذا يحافظ على موضع السكرول والأنيميشنات والـ DOM الحالي)
    const isFavorite = favorites.includes(productId);
    document.querySelectorAll(`.favorite-btn[data-id="${productId}"]`).forEach(btn => {
        btn.classList.toggle('active', isFavorite);
        const heartIcon = btn.querySelector('i');
        if (heartIcon) {
            heartIcon.className = isFavorite ? 'fas fa-heart' : 'far fa-heart';
        }
    });
}

function updateFavoritesUI() {
    favoritesCount.textContent = favorites.length;
    favoritesIcon.querySelector('i').className = favorites.length > 0 ? 'fas fa-heart' : 'far fa-heart';
    favoritesCount.style.display = favorites.length > 0 ? 'flex' : 'none';
}

// =================================================================
function renderInfoModal(type) {
    // type: 'about' أو 'privacy'
    const content = currentLang === 'ar' ? infoContentArabic[type] : infoContentEnglish[type];
    if (!content) return;

    const titleEl = document.getElementById(type + 'Title');
    const bodyEl = document.getElementById(type + 'Body');
    if (!titleEl || !bodyEl) return;

    titleEl.textContent = content.title;

    const sectionsHTML = content.sections.map((sec, idx) => `
        <div class="info-section" style="--info-delay: ${idx * 80}ms">
            <div class="info-section-icon">
                <i class="fas ${sec.icon}"></i>
            </div>
            <div class="info-section-text">
                <h3>${sec.title}</h3>
                <p>${sec.text}</p>
            </div>
        </div>
    `).join('');

    bodyEl.innerHTML = `
        <div class="info-decor-top" aria-hidden="true">
            <span class="info-ornament">❖</span>
        </div>
        <p class="info-intro">${content.intro}</p>
        <div class="info-divider" aria-hidden="true"></div>
        <div class="info-sections">${sectionsHTML}</div>
        <div class="info-divider" aria-hidden="true"></div>
        <p class="info-closing">${content.closing}</p>
    `;
}

function openInfoModal(type) {
    renderInfoModal(type);
    const modal = document.getElementById(type + 'Modal');
    if (modal) modal.classList.add('active');
}

// =================================================================
// --- 🟢 COMING SOON MODAL (Footer Collections) ---
// =================================================================
function renderComingSoonModal(key) {
    const dataset = currentLang === 'ar' ? comingSoonContentArabic : comingSoonContentEnglish;
    const content = dataset[key];
    if (!content) return;

    const titleEl = document.getElementById('comingSoonTitle');
    const bodyEl = document.getElementById('comingSoonBody');
    if (!titleEl || !bodyEl) return;

    titleEl.textContent = content.title;

    const stayTunedLabel = currentLang === 'ar' ? 'ابقوا على اطلاع' : 'Stay Tuned';
    const whatsappLabel = currentLang === 'ar'
        ? 'تواصل معنا للاستفسار'
        : 'Contact us for inquiries';

    bodyEl.innerHTML = `
        <div class="info-decor-top" aria-hidden="true">
            <span class="info-ornament">❖</span>
        </div>

        <div class="coming-soon-icon-wrap">
            <span class="coming-soon-icon-ring" aria-hidden="true"></span>
            <i class="fas ${content.icon} coming-soon-icon"></i>
        </div>

        <p class="info-intro">${content.intro}</p>
        <div class="info-divider" aria-hidden="true"></div>

        <div class="coming-soon-body">
            <p class="coming-soon-message">${content.message}</p>
            <p class="coming-soon-sub">${content.sub}</p>

            <div class="coming-soon-eta">
                <i class="fas fa-hourglass-half"></i>
                <span>${content.eta}</span>
            </div>
        </div>

        <div class="info-divider" aria-hidden="true"></div>

        <p class="info-closing">
            ${stayTunedLabel}
            <br>
            <a href="${WHATSAPP_BASE}" target="_blank" class="coming-soon-whatsapp">
                <i class="fab fa-whatsapp"></i> ${whatsappLabel}
            </a>
        </p>
    `;
}

function openComingSoonModal(key) {
    renderComingSoonModal(key);
    const modal = document.getElementById('comingSoonModal');
    if (modal) modal.classList.add('active');
}


// =================================================================
function renderContactModal() {
    const content = currentLang === 'ar' ? contactContentArabic : contactContentEnglish;

    const titleEl = document.getElementById('contactTitle');
    const bodyEl = document.getElementById('contactBody');
    if (!titleEl || !bodyEl) return;

    titleEl.textContent = content.title;

    const channelsHTML = content.channels.map((ch, idx) => `
        <a href="${ch.link}"
           class="contact-card contact-${ch.type}"
           target="${ch.type === 'phone' || ch.type === 'email' ? '_self' : '_blank'}"
           rel="noopener noreferrer"
           style="--contact-delay: ${idx * 90}ms">
            <span class="contact-card-icon">
                <i class="${ch.icon}"></i>
            </span>
            <span class="contact-card-text">
                <span class="contact-card-title">${ch.title}</span>
                <span class="contact-card-value">${ch.value}</span>
                <span class="contact-card-desc">${ch.desc}</span>
            </span>
            <span class="contact-card-arrow" aria-hidden="true">
                <i class="fas fa-chevron-${currentLang === 'ar' ? 'left' : 'right'}"></i>
            </span>
        </a>
    `).join('');

    bodyEl.innerHTML = `
        <div class="info-decor-top" aria-hidden="true">
            <span class="info-ornament">❖</span>
        </div>
        <p class="info-intro">${content.intro}</p>
        <div class="info-divider" aria-hidden="true"></div>
        <div class="contact-channels">${channelsHTML}</div>
        <div class="info-divider" aria-hidden="true"></div>
        <p class="info-closing">${content.closing}</p>
    `;
}

function openContactModal() {
    renderContactModal();
    const modal = document.getElementById('contactModal');
    if (modal) modal.classList.add('active');
}



// =================================================================
// 🟢 ARTIST APPLICATION FORM (نموذج تقديم الفنانين)
// =================================================================
function openArtistForm() {
    populateArtistForm();
    document.getElementById('artistFormModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeArtistForm() {
    document.getElementById('artistFormModal').classList.remove('active');
    document.body.style.overflow = '';
    // مسح الأخطاء
    const errorMsg = document.getElementById('artistFormErrorMsg');
    if (errorMsg) errorMsg.textContent = '';
    document.querySelectorAll('#artistFormModal .checkout-form-field.error').forEach(el => el.classList.remove('error'));
}

function populateArtistForm() {
    // تحديث النصوص حسب اللغة
    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };
    const setPlaceholder = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.placeholder = value;
    };

    setText('artistFormTitle', texts.artistFormTitle);
    setText('artistFormSubtitle', texts.artistFormSubtitle);
    setText('artistInquiryText', texts.artistInquiryText);
    setText('artistInquiryBtnText', texts.artistInquiryBtn);
    setText('artistNameLabel', texts.artistNameLabel);
    setText('artistPhoneLabel', texts.artistPhoneLabel);
    setText('artistProductTypeLabel', texts.artistProductTypeLabel);
    setText('artistDescriptionLabel', texts.artistDescriptionLabel);
    setText('artistInstagramLabel', texts.artistInstagramLabel);
    setText('artistPhotosNote', texts.artistPhotosNote);
    setText('artistFormHint', texts.artistFormHint);
    setText('artistFormCancelBtn', texts.artistFormCancel);
    setText('artistFormSubmitText', texts.artistFormSubmit);

    setPlaceholder('artistPhone', texts.artistPhonePlaceholder);
    setPlaceholder('artistDescription', texts.artistDescriptionPlaceholder);
    setPlaceholder('artistInstagram', texts.artistInstagramPlaceholder);

    // ملء قائمة أنواع المنتجات
    const typeSelect = document.getElementById('artistProductType');
    const currentValue = typeSelect.value;
    typeSelect.innerHTML = `<option value="">${texts.artistProductTypePlaceholder}</option>`;
    (texts.artistProductTypes || []).forEach((type, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = type;
        typeSelect.appendChild(opt);
    });
    if (currentValue) typeSelect.value = currentValue;
}

function validateArtistForm() {
    const fields = [
        { id: 'artistName', required: true },
        { id: 'artistPhone', required: true, type: 'phone' },
        { id: 'artistProductType', required: true },
        { id: 'artistDescription', required: true }
    ];

    let firstError = null;

    fields.forEach(f => {
        const el = document.getElementById(f.id);
        const wrapper = el.closest('.checkout-form-field');
        const value = el.value.trim();
        wrapper.classList.remove('error');

        if (f.required && !value) {
            wrapper.classList.add('error');
            if (!firstError) firstError = 'required';
        } else if (f.type === 'phone' && value) {
            const cleaned = value.replace(/[\s\-+]/g, '');
            if (!/^\d{9,15}$/.test(cleaned)) {
                wrapper.classList.add('error');
                if (!firstError) firstError = 'phone';
            }
        }
    });

    const errorMsg = document.getElementById('artistFormErrorMsg');
    if (firstError === 'phone') {
        errorMsg.textContent = texts.artistFormErrorPhone;
    } else if (firstError === 'required') {
        errorMsg.textContent = texts.artistFormErrorRequired;
    } else {
        errorMsg.textContent = '';
    }

    return !firstError;
}

function submitArtistForm() {
    if (!validateArtistForm()) {
        const firstErrorField = document.querySelector('#artistFormModal .checkout-form-field.error input, #artistFormModal .checkout-form-field.error select, #artistFormModal .checkout-form-field.error textarea');
        if (firstErrorField) firstErrorField.focus();
        return;
    }

    const name = document.getElementById('artistName').value.trim();
    const phone = document.getElementById('artistPhone').value.trim();
    const typeIdx = document.getElementById('artistProductType').value;
    const productType = texts.artistProductTypes[typeIdx];
    const description = document.getElementById('artistDescription').value.trim();
    const instagram = document.getElementById('artistInstagram').value.trim();

    // بناء رسالة واتساب
    let message = texts.waArtistGreeting;
    message += `━━━━━━━━━━━━━━━\n`;
    message += `🎨 *${texts.waArtistInfoLabel}*\n`;
    message += `${texts.waArtistNameLabel}: ${name}\n`;
    message += `${texts.waArtistPhoneLabel}: ${phone}\n`;
    message += `${texts.waArtistProductTypeLabel}: ${productType}\n`;
    if (instagram) {
        message += `${texts.waArtistInstagramLabel}: ${instagram}\n`;
    }
    message += `━━━━━━━━━━━━━━━\n`;
    message += `📝 *${texts.waArtistDescriptionLabel}*\n`;
    message += `${description}`;
    message += texts.waArtistClosing;

    // فتح واتساب
    window.open(buildWhatsAppLink(message), '_blank');

    // إغلاق الموديل
    closeArtistForm();
}

// 🟢 استفسار قبل التسجيل (من موديل الفنان)
function artistInquiry() {
    const message = texts.artistInquiryMessage || "مرحباً متجر طُرفة! عندي استفسار عن الانضمام لمتجركم.\n\n";
    window.open(buildWhatsAppLink(message), '_blank');
    closeArtistForm();
}