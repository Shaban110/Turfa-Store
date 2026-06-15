// =================================================================
// 📦 data.js - بيانات المتجر
// -----------------------------------------------------------------
// يحتوي على:
//   • الإعدادات العامة (GLOBAL_DISCOUNT_PERCENT)
//   • نصوص الترجمة (عربي + إنجليزي)
//   • محتوى صفحات المعلومات (من نحن، الخصوصية، التواصل، قريباً)
//   • روابط الفوتر
//   • بيانات المنتجات (لوحات، كاسات، طباعات 3D، براويز)
// =================================================================

// =================================================================
// --- 0. GLOBAL CONFIGURATION (NEW) ---
// =================================================================
const GLOBAL_DISCOUNT_PERCENT = 0; // 🔴 انتهى عرض الخصم — الأسعار طبيعية الآن. (لإعادة تفعيل خصم لاحقاً: 0.500 = 50%)

// 🟢 دالة موحّدة لحساب السعر بعد الخصم — استخدمها بدل التكرار اليدوي
// لو احتجت تغيّر طريقة الخصم (مثلاً خصومات مختلفة لكل منتج)، عدّل هون فقط.
function getDiscountedPrice(basePrice) {
    const price = Number(basePrice) || 0;
    return price * (1 - GLOBAL_DISCOUNT_PERCENT);
}

// 🟢 هل يوجد خصم فعّال؟ (نستخدمها لإظهار/إخفاء السعر المشطوب في البطاقات والموديلات)
function hasActiveDiscount() {
    return GLOBAL_DISCOUNT_PERCENT > 0;
}

// 🟢 تنسيق السعر حسب اللغة:
//   • بالعربي: الرقم ثم الرمز على اليمين  →  "19.99 د.أ"
//   • بالإنجليزي: الرقم ثم JOD            →  "19.99 JOD"
function formatPrice(amount) {
    const n = (Number(amount) || 0).toFixed(2);
    return (typeof currentLang !== 'undefined' && currentLang === 'en')
        ? `${n} JOD`
        : `${n} د.أ`;
}

// 🌟 المنتجات المميزة — تظهر في قسم "منتجات مميزة" بالسكرول التلقائي.
// عدّل هذه القائمة لتحديد أي المنتجات تظهر كمميزة (حسب الـ id).
const FEATURED_PRODUCT_IDS = [1, 3, 102, 104, 116, 201, 303, 401];

// 🟢 معلومات التواصل الموحّدة — لو تغيّر الرقم، عدّل هون فقط
const STORE_PHONE = '+962788489914';                    // الرقم الكامل بصيغة دولية
const STORE_PHONE_DISPLAY = '+962 7 8848 9914';         // الرقم بصيغة العرض (للفوتر)
const STORE_PHONE_DIGITS = STORE_PHONE.replace(/\D/g, ''); // أرقام فقط، لاستخدامها مع wa.me
const WHATSAPP_BASE = `https://wa.me/${STORE_PHONE_DIGITS}`;
const TEL_LINK = `tel:${STORE_PHONE}`;

// 🟢 إيميل المتجر وموقعه — عدّل هون فقط
const STORE_EMAIL = 'turfa.jor@gmail.com';
const STORE_EMAIL_LINK = `mailto:${STORE_EMAIL}`;
const STORE_DOMAIN = 'https://turfajo.me';

// مساعد لبناء رابط واتساب مع رسالة جاهزة
function buildWhatsAppLink(message) {
    return message
        ? `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`
        : WHATSAPP_BASE;
}

// =================================================================
// --- 1. LANGUAGE & TRANSLATION DATA ---
// =================================================================
const arabicTexts = {
    title: "لوحات",
    cupsTitle: "كاسات",
    prints3dTitle: "طباعات 3D",
    framesTitle: "براويز",
    giftsTitle: "هدايا منوعة",
    offersTitle: "منتجات مميزة",
    heroSubtitle: "كل قطعة عنا قابلة للتخصيص — اختر، عدّل، أو احكيلنا فكرتك ومنصممها من الصفر",
    heroCustomBadge: "تخصيص متاح على كل القطع",
    searchPlaceholder: "ابحث عن منتجك من هنا",
    addToCart: "أضف إلى العربة",
    added: "تمت الإضافة!",
    yourCart: "عربتك",
    total: "الإجمالي:",
    checkout: "متابعة الشراء عبر واتساب",
    inquiry: "استفسار",
    inquiryFull: "استفسار عبر واتساب",
    inquiryMessage: "مرحباً متجر طُرفة 👋\nأنا تصفّحت موقعكم وعندي كم استفسار، ممكن تساعدوني؟\n\n",
    emptyCart: "عربتك فارغة",
    emptyCartSub: "أضف بعض المنتجات إلى عربتك",
    selectSize: "اختر الحجم:",
    selectColor: "اختر اللون:",
    selectVariant: "اختر النوع:",
    sizeOptions: [
        { name: "صغير 40×40سم", priceDiff: 0 },
        { name: "متوسط 50×70سم", priceDiff: 19.99 },
        { name: "كبير 80×120سم", priceDiff: 39.99 },     
    ],
    footerCopyright: "&copy; 2025 متجر طُرفة. جميع الحقوق محفوظة.",
    footerContact: "تواصل معنا",
    footerSocial: "تابعنا",
    footerAbout: "عن الموقع",
    footerCategories: "الفئات",
    footerCollections: "مجموعات",
    whatsappGreeting: "مرحباً متجر طُرفة! أود طلب الآتي:\n\n",
    waOrderNumberLabel: "رقم الطلب",
    whatsappTotal: "\nالإجمالي:",
    whatsappThanks: "\n\نشكراً لك!",
    yourFavorites: "منتجاتك المفضلة",
    emptyFavorites: "قائمة المفضلة فارغة",
    emptyFavoritesSub: "أضف منتجات تعجبك لحفظها هنا",
    favoritesFooter: "انقر على المنتج لعرض التفاصيل أو الزر لإضافته للعربة.",
    detailTitle: "تفاصيل المنتج", 
    detailFullDescription: "الوصف الكامل:", 
    floatingItem: "منتج",
    floatingItems: "منتجات",
    promoTitle: "عرض عيد الأضحى وعيد الاستقلال",
    promoMessage: "بمناسبة عيد الأضحى المبارك وعيد الاستقلال , يسُر متجر طُرفة أن يقدم لكم خصمًا خاصًا بقيمة 50% على جميع المنتجات لفترة محدودة. كل عام وأنتم بخير!",
    promoButton: "تسوق الآن واستفد من الخصم",
    // 🟢 نصوص موديل التخصيص (عيد الزواج)
    weddingFormTitle: "خصص هديتك",
    weddingFormSubtitle: "اكتب لنا التفاصيل ونحن نحوّلها لقطعة فنية تخلّد ذكراكم",
    weddingFormInitial1: "الحرف الأول",
    weddingFormInitial2: "الحرف الثاني",
    weddingFormInitial1Placeholder: "م",
    weddingFormInitial2Placeholder: "س",
    weddingFormDate: "تاريخ الزواج",
    weddingFormCustomText: "نص خاص (اختياري)",
    weddingFormCustomTextPlaceholder: "مثال: ذكرى لا تُنسى ❤",
    weddingFormRequiredHint: "* الحقول المعلّمة إجبارية",
    weddingFormSubmit: "أضف للسلة",
    weddingFormCancel: "إلغاء",
    weddingFormError: "الرجاء تعبئة الحقول الإجبارية",
    weddingFormInitialError: "حرف واحد فقط",
    weddingDetailsLabel: "تفاصيل التخصيص",
    weddingInitialsLabel: "الحروف",
    weddingDateLabel: "تاريخ الزواج",
    weddingCustomTextLabel: "نص خاص",
    weddingDatePlaceholder: "اختر تاريخ الزواج",
    weddingDateDay: "اليوم",
    weddingDateMonth: "الشهر",
    weddingDateYear: "السنة",
    weddingDateClear: "مسح",
    weddingDateConfirm: "تم",
    weddingMonthsList: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],
    // 🟢 نصوص موديل اللوحة المخصصة
    customDesignBadge: "تصميم مخصص",
    customDesignPriceLabel: "السعر حسب الطلب",
    customDesignBtn: "اطلب الأن",
    customDesignFormTitle: "صمم لوحتك الخاصة",
    customDesignFormSubtitle: "اختار نوع التصميم واكتب التفاصيل، ونحن نحوّلها لقطعة فنية مميزة",
    customDesignTypeLabel: "نوع التصميم",
    customDesignTypes: [
        { value: "verse", label: "آية قرآنية", icon: "fa-mosque" },
        { value: "hadith", label: "حديث شريف", icon: "fa-book-quran" },
        { value: "dua", label: "دعاء", icon: "fa-hands-praying" },
        { value: "poem", label: "قصيدة", icon: "fa-feather-pointed" },
        { value: "name", label: "اسم / أسماء", icon: "fa-signature" },
        { value: "other", label: "تصميم خاص", icon: "fa-palette" }
    ],
    customDesignTextLabel: "النص المطلوب",
    customDesignTextPlaceholderVerse: "اكتب الآية اللي تحبها...",
    customDesignTextPlaceholderHadith: "اكتب الحديث الشريف...",
    customDesignTextPlaceholderDua: "اكتب الدعاء...",
    customDesignTextPlaceholderPoem: "اكتب القصيدة أو الأبيات...",
    customDesignTextPlaceholderName: "اكتب الاسم أو الأسماء...",
    customDesignTextPlaceholderOther: "اوصف لنا التصميم اللي تريده...",
    customDesignSizeLabel: "المقاس المطلوب",
    customDesignSizes: [
        { value: "small", label: "صغير", desc: "40×40 سم" },
        { value: "medium", label: "متوسط", desc: "50×70 سم" },
        { value: "large", label: "كبير", desc: "80×120 سم" },
        { value: "custom", label: "مقاس مخصص", desc: "حدد الطول والعرض" }
    ],
    customDesignWidthLabel: "العرض (سم)",
    customDesignHeightLabel: "الطول (سم)",
    customDesignWidthPlaceholder: "مثال: 60",
    customDesignHeightPlaceholder: "مثال: 90",
    customDesignCustomSizeHint: "اكتب القياس بالسنتيمتر (10 - 500)",
    customDesignCustomSizeError: "الرجاء إدخال الطول والعرض بشكل صحيح",
    // 🟢 نصوص خيار "مخصص" داخل variants (للفاصل وغيره)
    variantCustomNameLabel: "اسم النادي",
    variantCustomNamePlaceholder: "مثال: ليفربول، بايرن ميونخ...",
    variantCustomNameHint: "بعد إتمام الطلب، أرسل لنا صورة الشعار المرجعية على واتساب",
    variantCustomNameError: "الرجاء كتابة اسم النادي",
    variantCustomNameWhatsAppLabel: "النادي المطلوب",
    // 🟢 نصوص الاسم الإنجليزي للولد/البنت (طباعة 3D)
    variantCustomNameForGirl: "اسم البنت (بالإنجليزي)",
    variantCustomNameForBoy: "اسم الولد (بالإنجليزي)",
    variantCustomNameLatinPlaceholder: "e.g. Sara, Ahmad...",
    variantCustomNamePlaceholderGirl: "e.g. Sara, Layla, Mariam...",
    variantCustomNamePlaceholderBoy: "e.g. Ahmad, Omar, Yousef...",
    variantCustomNameLatinHint: "الرجاء كتابة الاسم بالأحرف الإنجليزية فقط",
    variantCustomNameLatinError: "الاسم لازم يكون بالأحرف الإنجليزية فقط",
    variantGiftCustomLabel: "اسمك + تفاصيل التخصيص",
    variantGiftCustomPlaceholder: "مثال: الاسم سارة، أريدها بألوان وردية مع اسم العائلة",
    variantGiftCustomHint: "اكتب الاسم وأي تفاصيل تحب تخصيصها (الألوان، النص، التاريخ...)",
    variantGiftCustomError: "الرجاء كتابة الاسم وتفاصيل التخصيص",
    variantGiftCustomWhatsAppLabel: "تفاصيل التخصيص",
    customDesignNotesLabel: "ملاحظات إضافية (اختياري)",
    customDesignNotesPlaceholder: "أي تفاصيل إضافية: لون الإطار، نوع الخط، طريقة التنفيذ...",
    customDesignRequiredHint: "* الحقول المعلّمة إجبارية — السعر النهائي يصلك على واتساب",
    customDesignSubmit: "إرسال الطلب عبر واتساب",
    customDesignCancel: "إلغاء",
    customDesignError: "الرجاء اختيار نوع التصميم وكتابة النص المطلوب وتحديد المقاس",
    customDesignDetailsLabel: "تفاصيل التصميم المخصص",
    customDesignTypeDisplay: "النوع",
    customDesignTextDisplay: "النص",
    customDesignSizeDisplay: "المقاس",
    customDesignNotesDisplay: "ملاحظات",
    customDesignWhatsAppIntro: "السلام عليكم 👋\nبدي أطلب *لوحة مخصصة* بالتفاصيل التالية:",
    customDesignWhatsAppOutro: "\n\nبستنى ردكم بسعر اللوحة وموعد التسليم — شكراً!",
    // ... (بقية النصوص) ...
    // 🟢 إضافة نصوص الآلة الكاتبة
    typewriterStrings: [
        "للفن اليدوي أصالته.",
        "للتصميم العربي رونقه.",
        "نصنع قطعاً تليق بجمال ذوقك."
    ],
    // 🟢 نصوص نموذج الطلب (Checkout Form)
    checkoutFormTitle: "إتمام الطلب",
    checkoutFormSubtitle: "أكمل بياناتك ليصلك الطلب بأسرع وقت",
    checkoutSummaryTitle: "ملخص الطلب",
    checkoutSubtotalLabel: "المجموع الفرعي",
    checkoutShippingLabel: "رسوم التوصيل",
    checkoutTotalLabel: "الإجمالي",
    checkoutNameLabel: "الاسم الكامل",
    checkoutPhoneLabel: "رقم الهاتف",
    checkoutPhonePlaceholder: "07XXXXXXXX",
    checkoutCityLabel: "المدينة",
    checkoutCityPlaceholder: "اختر المدينة",
    checkoutAddressLabel: "العنوان التفصيلي",
    checkoutAddressPlaceholder: "مثال: شارع الجامعة، عمارة 12، شقة 3",
    checkoutPaymentLabel: "طريقة الدفع",
    checkoutPaymentCOD: "الدفع عند الاستلام",
    checkoutPaymentCliQ: "CliQ",
    checkoutNotesLabel: "ملاحظات (اختياري)",
    checkoutFormHint: "* الحقول المعلّمة إجبارية",
    checkoutFormCancel: "رجوع",
    checkoutFormSubmit: "إرسال الطلب عبر واتساب",
    checkoutFormErrorRequired: "الرجاء تعبئة الحقول الإجبارية",
    checkoutFormErrorPhone: "الرجاء إدخال رقم هاتف صحيح",
    // 🟢 رسوم التوصيل الموحدة (د.أ 2 لكل المملكة)
    shippingFee: 2.00,
    checkoutShippingBannerTitle: "خدمة توصيل بدينارين فقط",
    checkoutShippingBannerSub: "لجميع محافظات المملكة الأردنية الهاشمية",
    checkoutPickupText: "استلام شخصي - سيتم التنسيق على المكان عبر واتساب",
    waPickupLabel: "طريقة الاستلام",
    waPickupValue: "استلام شخصي (يتم التنسيق على المكان عبر واتساب)",
    waShippingValue: "توصيل للعنوان",
    // 🟢 نصوص قسم الفنانين
    artistCtaTitle: "اعرض منتجاتك في متجرنا",
    artistCtaDesc: "هل تصنع أعمالاً يدوية مميزة؟ اعرض منتجاتك في متجر طُرفة وانضم لمنصتنا.",
    artistCtaBtn: "قدّم طلبك",
    // نصوص موديل التقديم
    artistFormTitle: "انضم لمتجر طُرفة",
    artistFormSubtitle: "اعرض منتجاتك اليدوية على منصتنا",
    artistInquiryText: "عندك أسئلة قبل التسجيل؟",
    artistInquiryBtn: "استفسر",
    artistInquiryMessage: "مرحباً متجر طُرفة 👋\nأنا مهتم بعرض منتجاتي اليدوية في متجركم، بس عندي كم استفسار قبل ما أقدم طلب الانضمام:\n\n",
    artistCommissionTitle: "شراكة مربحة",
    artistCommissionDesc: "عمولة 15% فقط على كل عملية بيع تتم عبر متجرنا",
    artistShippingTitle: "نتولى التوصيل والتسويق",
    artistShippingDesc: "إنت تركّز على الإبداع، ونحن نهتم بالباقي",
    artistShowcaseTitle: "عرض احترافي",
    artistShowcaseDesc: "منتجاتك تظهر بجودة وتصميم مميز",
    artistNameLabel: "الاسم الكامل",
    artistPhoneLabel: "رقم الهاتف",
    artistPhonePlaceholder: "07XXXXXXXX",
    artistProductTypeLabel: "نوع المنتجات",
    artistProductTypePlaceholder: "اختر نوع المنتجات",
    artistDescriptionLabel: "وصف منتجاتك",
    artistDescriptionPlaceholder: "اكتب وصفاً مختصراً عن منتجاتك، خبرتك، والأسعار التقريبية...",
    artistInstagramLabel: "رابط الإنستغرام (اختياري)",
    artistInstagramPlaceholder: "@username أو instagram.com/username",
    artistPhotosNote: "ستتمكن من إرسال صور منتجاتك مباشرة في محادثة الواتساب بعد إرسال الطلب",
    artistFormHint: "* الحقول المعلّمة إجبارية",
    artistFormCancel: "رجوع",
    artistFormSubmit: "إرسال طلب الانضمام",
    artistFormErrorRequired: "الرجاء تعبئة الحقول الإجبارية",
    artistFormErrorPhone: "الرجاء إدخال رقم هاتف صحيح",
    // أنواع المنتجات
    artistProductTypes: [
        "لوحات وفنون جدارية",
        "إكسسوارات يدوية",
        "أعمال خشبية",
        "فخار وسيراميك",
        "حياكة وتطريز",
        "أعمال جلدية",
        "زجاج ورزائن (Resin)",
        "صابون وعطور طبيعية",
        "شموع",
        "مجوهرات يدوية",
        "ديكور منزلي",
        "أخرى"
    ],
    // نصوص رسالة واتساب الفنان
    waArtistGreeting: "مرحباً متجر طُرفة 👋\nأرغب بالانضمام لمتجركم وعرض منتجاتي اليدوية:\n\n",
    waArtistInfoLabel: "معلومات الفنان",
    waArtistNameLabel: "الاسم",
    waArtistPhoneLabel: "الهاتف",
    waArtistProductTypeLabel: "نوع المنتجات",
    waArtistDescriptionLabel: "وصف المنتجات",
    waArtistInstagramLabel: "إنستغرام",
    waArtistClosing: "\n\nسأقوم بإرفاق صور لمنتجاتي في الرسائل التالية. شكراً لكم 🌟",
    // قائمة المدن - رسوم توصيل موحدة (د.أ 2 لكل المملكة)
    checkoutCities: [
        { name: "عمّان" },
        { name: "الزرقاء" },
        { name: "الرصيفة" },
        { name: "السلط" },
        { name: "مادبا" },
        { name: "إربد" },
        { name: "جرش" },
        { name: "عجلون" },
        { name: "المفرق" },
        { name: "الكرك" },
        { name: "الطفيلة" },
        { name: "معان" },
        { name: "العقبة" }
    ],
    // نصوص رسالة واتساب
    waOrderInfoLabel: "معلومات الزبون",
    waNameLabel: "الاسم",
    waPhoneLabel: "الهاتف",
    waCityLabel: "المدينة",
    waAddressLabel: "العنوان",
    waPaymentLabel: "طريقة الدفع",
    waNotesLabel: "ملاحظات",
    waOrderItemsLabel: "المنتجات المطلوبة",
    waSubtotalLabel: "المجموع الفرعي",
    waShippingLabel: "رسوم التوصيل"
};

const englishTexts = {
    title: " Paintings",
    cupsTitle: " Cups",
    prints3dTitle: "3D Prints",
    framesTitle: "Frames",
    giftsTitle: "Mixed Gifts",
    offersTitle: "Featured Products",
    heroSubtitle: "Every piece is customizable — pick one, tweak it, or tell us your idea and we'll build it from scratch",
    heroCustomBadge: "Customization available on every piece",
    searchPlaceholder: "Search for your product here",
    addToCart: "Add to Cart",
    added: "Added!",
    yourCart: "Your Cart",
    total: "Total:",
    checkout: "Checkout via WhatsApp",
    inquiry: "Inquiry",
    inquiryFull: "Inquiry via WhatsApp",
    inquiryMessage: "Hi Turfa Store 👋\nI was browsing your website and I have a few questions, could you help me?\n\n",
    emptyCart: "Your cart is empty",
    emptyCartSub: "Add some products to your cart",
    selectSize: "Select Size:",
    selectColor: "Select Color:",
    selectVariant: "Select Type:",
    sizeOptions: [
        { name: "Small 40x40cm", priceDiff: 0.00 },
        { name: "Medium 50x70cm", priceDiff: 19.99 },
        { name: "Large 80x120cm", priceDiff: 39.99 },     
    ],
    footerCopyright: "&copy; 2025 Turfa Store. All rights reserved.",
    footerContact: "Contact Us",
    footerSocial: "Follow Us",
    footerAbout: "About",
    footerCategories: "Categories",
    footerCollections: "Collections",
    whatsappGreeting: "Hello Turfa Store! I would like to order the following:\n\n",
    waOrderNumberLabel: "Order Number",
    whatsappTotal: "\nTotal:",
    whatsappThanks: "\n\nThank you!",
    yourFavorites: "Your Favorites",
    emptyFavorites: "Your favorites list is empty",
    emptyFavoritesSub: "Add products you like to save them here",
    favoritesFooter: "Click a product for details or the button to add it to your cart.",
    detailTitle: "Product Details", 
    detailFullDescription: "Full Description:",
    floatingItem: "item",
    floatingItems: "items",
    promoTitle: "Eid Al-Adha & Independence Day Sale 🇯🇴",
    promoMessage: "To celebrate Eid Al-Adha and Jordan's Independence Day, Turfa Store is delighted to offer you a special 50% discount on ALL products for a limited time. Eid Mubarak!",
    promoButton: "Shop Now & Claim Your Discount",
    // 🟢 Wedding customization modal texts
    weddingFormTitle: "Customize Your Gift",
    weddingFormSubtitle: "Tell us the details and we'll turn them into a piece that immortalizes your memory",
    weddingFormInitial1: "First Initial",
    weddingFormInitial2: "Second Initial",
    weddingFormInitial1Placeholder: "M",
    weddingFormInitial2Placeholder: "S",
    weddingFormDate: "Wedding Date",
    weddingFormCustomText: "Custom Text (Optional)",
    weddingFormCustomTextPlaceholder: "e.g. An unforgettable memory ❤",
    weddingFormRequiredHint: "* Marked fields are required",
    weddingFormSubmit: "Add to Cart",
    weddingFormCancel: "Cancel",
    weddingFormError: "Please fill in the required fields",
    weddingFormInitialError: "One letter only",
    weddingDetailsLabel: "Customization Details",
    weddingInitialsLabel: "Initials",
    weddingDateLabel: "Wedding Date",
    weddingCustomTextLabel: "Custom Text",
    weddingDatePlaceholder: "Select your wedding date",
    weddingDateDay: "Day",
    weddingDateMonth: "Month",
    weddingDateYear: "Year",
    weddingDateClear: "Clear",
    weddingDateConfirm: "Done",
    weddingMonthsList: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    // 🟢 Custom design painting modal texts
    customDesignBadge: "Custom Design",
    customDesignPriceLabel: "Price on Request",
    customDesignBtn: "Order Your Custom Design",
    customDesignFormTitle: "Design Your Own Painting",
    customDesignFormSubtitle: "Choose the design type, write the details, and we'll turn it into a unique piece",
    customDesignTypeLabel: "Design Type",
    customDesignTypes: [
        { value: "verse", label: "Qur'anic Verse", icon: "fa-mosque" },
        { value: "hadith", label: "Hadith", icon: "fa-book-quran" },
        { value: "dua", label: "Prayer (Du'a)", icon: "fa-hands-praying" },
        { value: "poem", label: "Poem", icon: "fa-feather-pointed" },
        { value: "name", label: "Name(s)", icon: "fa-signature" },
        { value: "other", label: "Custom Design", icon: "fa-palette" }
    ],
    customDesignTextLabel: "The Text",
    customDesignTextPlaceholderVerse: "Write the verse you'd like...",
    customDesignTextPlaceholderHadith: "Write the hadith...",
    customDesignTextPlaceholderDua: "Write the prayer...",
    customDesignTextPlaceholderPoem: "Write the poem or verses...",
    customDesignTextPlaceholderName: "Write the name(s)...",
    customDesignTextPlaceholderOther: "Describe the design you want...",
    customDesignSizeLabel: "Size",
    customDesignSizes: [
        { value: "small", label: "Small", desc: "40×40 cm" },
        { value: "medium", label: "Medium", desc: "50×70 cm" },
        { value: "large", label: "Large", desc: "80×120 cm" },
        { value: "custom", label: "Custom Size", desc: "set width & height" }
    ],
    customDesignWidthLabel: "Width (cm)",
    customDesignHeightLabel: "Height (cm)",
    customDesignWidthPlaceholder: "e.g. 60",
    customDesignHeightPlaceholder: "e.g. 90",
    customDesignCustomSizeHint: "Enter measurements in centimeters (10 - 500)",
    customDesignCustomSizeError: "Please enter valid width and height",
    // 🟢 Custom variant texts (used for bookmarks and similar variant-based products)
    variantCustomNameLabel: "Club Name",
    variantCustomNamePlaceholder: "e.g. Liverpool, Bayern Munich...",
    variantCustomNameHint: "After placing the order, send us the reference logo on WhatsApp",
    variantCustomNameError: "Please enter the club name",
    variantCustomNameWhatsAppLabel: "Requested Club",
    // 🟢 Latin-only name field for 3D Girl/Boy variants
    variantCustomNameForGirl: "Girl's Name (English)",
    variantCustomNameForBoy: "Boy's Name (English)",
    variantCustomNameLatinPlaceholder: "e.g. Sara, Ahmad...",
    variantCustomNamePlaceholderGirl: "e.g. Sara, Layla, Mariam...",
    variantCustomNamePlaceholderBoy: "e.g. Ahmad, Omar, Yousef...",
    variantCustomNameLatinHint: "Please enter the name in English letters only",
    variantCustomNameLatinError: "Name must contain English letters only",
    variantGiftCustomLabel: "Your name + customization details",
    variantGiftCustomPlaceholder: "e.g. Name: Sara, I'd like pink colors with the family name",
    variantGiftCustomHint: "Write the name and any details you'd like customized (colors, text, date...)",
    variantGiftCustomError: "Please enter the name and customization details",
    variantGiftCustomWhatsAppLabel: "Customization details",
    customDesignNotesLabel: "Additional Notes (Optional)",
    customDesignNotesPlaceholder: "Any extra details: frame color, calligraphy style, finish...",
    customDesignRequiredHint: "* Marked fields are required — final price will be sent to you on WhatsApp",
    customDesignSubmit: "Send Order via WhatsApp",
    customDesignCancel: "Cancel",
    customDesignError: "Please choose a design type, write the text, and select a size",
    customDesignDetailsLabel: "Custom Design Details",
    customDesignTypeDisplay: "Type",
    customDesignTextDisplay: "Text",
    customDesignSizeDisplay: "Size",
    customDesignNotesDisplay: "Notes",
    customDesignWhatsAppIntro: "Hello 👋\nI'd like to order a *Custom Painting* with the following details:",
    customDesignWhatsAppOutro: "\n\nLooking forward to your reply with the price and delivery time — thanks!",
    // 🟢 إضافة نصوص الآلة الكاتبة
    typewriterStrings: [
        "Handmade art has its originality.",
        "Arabic design has its splendor.",
        "We make pieces worthy of your home."
    ],
    // 🟢 نصوص نموذج الطلب (Checkout Form)
    checkoutFormTitle: "Complete Your Order",
    checkoutFormSubtitle: "Fill in your details to receive your order quickly",
    checkoutSummaryTitle: "Order Summary",
    checkoutSubtotalLabel: "Subtotal",
    checkoutShippingLabel: "Shipping Fee",
    checkoutTotalLabel: "Total",
    checkoutNameLabel: "Full Name",
    checkoutPhoneLabel: "Phone Number",
    checkoutPhonePlaceholder: "07XXXXXXXX",
    checkoutCityLabel: "City",
    checkoutCityPlaceholder: "Select City",
    checkoutAddressLabel: "Detailed Address",
    checkoutAddressPlaceholder: "e.g., University St, Building 12, Apt 3",
    checkoutPaymentLabel: "Payment Method",
    checkoutPaymentCOD: "Cash on Delivery",
    checkoutPaymentCliQ: "CliQ",
    checkoutNotesLabel: "Notes (Optional)",
    checkoutFormHint: "* Marked fields are required",
    checkoutFormCancel: "Back",
    checkoutFormSubmit: "Send Order via WhatsApp",
    checkoutFormErrorRequired: "Please fill in the required fields",
    checkoutFormErrorPhone: "Please enter a valid phone number",
    // 🟢 رسوم التوصيل الموحدة (JD 2 لكل المملكة)
    shippingFee: 2.00,
    checkoutShippingBannerTitle: "Flat shipping rate of just JD 2",
    checkoutShippingBannerSub: "To all governorates across Jordan",
    checkoutPickupText: "Self-pickup - location will be arranged via WhatsApp",
    waPickupLabel: "Pickup Method",
    waPickupValue: "Self-pickup (location to be arranged via WhatsApp)",
    waShippingValue: "Delivery to address",
    // 🟢 نصوص قسم الفنانين
    artistCtaTitle: "Showcase Your Products In Our Store",
    artistCtaDesc: "Do you create unique handmade products? Showcase your work at Turfa Store and join our platform.",
    artistCtaBtn: "Apply Now",
    // نصوص موديل التقديم
    artistFormTitle: "Join Turfa Store",
    artistFormSubtitle: "Showcase your handmade products on our platform",
    artistInquiryText: "Have questions before signing up?",
    artistInquiryBtn: "Inquire",
    artistInquiryMessage: "Hi Turfa Store 👋\nI'm interested in showcasing my handmade products in your store, but I have a few questions before submitting an application:\n\n",
    artistCommissionTitle: "Profitable Partnership",
    artistCommissionDesc: "Just 15% commission on every sale made through our store",
    artistShippingTitle: "We Handle Delivery & Marketing",
    artistShippingDesc: "You focus on creating, we take care of the rest",
    artistShowcaseTitle: "Professional Showcase",
    artistShowcaseDesc: "Your products presented with quality and style",
    artistNameLabel: "Full Name",
    artistPhoneLabel: "Phone Number",
    artistPhonePlaceholder: "07XXXXXXXX",
    artistProductTypeLabel: "Product Type",
    artistProductTypePlaceholder: "Select product type",
    artistDescriptionLabel: "Describe Your Products",
    artistDescriptionPlaceholder: "Write a brief description about your products, experience, and approximate prices...",
    artistInstagramLabel: "Instagram (Optional)",
    artistInstagramPlaceholder: "@username or instagram.com/username",
    artistPhotosNote: "You'll be able to send photos of your products directly in the WhatsApp conversation after submitting",
    artistFormHint: "* Marked fields are required",
    artistFormCancel: "Back",
    artistFormSubmit: "Send Application",
    artistFormErrorRequired: "Please fill in the required fields",
    artistFormErrorPhone: "Please enter a valid phone number",
    // أنواع المنتجات
    artistProductTypes: [
        "Paintings & Wall Art",
        "Handmade Accessories",
        "Wooden Crafts",
        "Pottery & Ceramics",
        "Knitting & Embroidery",
        "Leather Crafts",
        "Glass & Resin Art",
        "Natural Soaps & Perfumes",
        "Candles",
        "Handmade Jewelry",
        "Home Decor",
        "Other"
    ],
    // نصوص رسالة واتساب الفنان
    waArtistGreeting: "Hi Turfa Store 👋\nI'd like to join your platform and showcase my handmade products:\n\n",
    waArtistInfoLabel: "Artist Information",
    waArtistNameLabel: "Name",
    waArtistPhoneLabel: "Phone",
    waArtistProductTypeLabel: "Product Type",
    waArtistDescriptionLabel: "Product Description",
    waArtistInstagramLabel: "Instagram",
    waArtistClosing: "\n\nI'll send photos of my products in the following messages. Thank you 🌟",
    // قائمة المدن (نفس الترتيب مع الترجمة)
    checkoutCities: [
        { name: "Amman" },
        { name: "Zarqa" },
        { name: "Russeifa" },
        { name: "Salt" },
        { name: "Madaba" },
        { name: "Irbid" },
        { name: "Jerash" },
        { name: "Ajloun" },
        { name: "Mafraq" },
        { name: "Karak" },
        { name: "Tafilah" },
        { name: "Ma'an" },
        { name: "Aqaba" }
    ],
    // نصوص رسالة واتساب
    waOrderInfoLabel: "Customer Info",
    waNameLabel: "Name",
    waPhoneLabel: "Phone",
    waCityLabel: "City",
    waAddressLabel: "Address",
    waPaymentLabel: "Payment Method",
    waNotesLabel: "Notes",
    waOrderItemsLabel: "Ordered Items",
    waSubtotalLabel: "Subtotal",
    waShippingLabel: "Shipping Fee"
    
};

const footerLinksEnglish = {
    contact: [
        { text: STORE_PHONE_DISPLAY, icon: "fas fa-phone", link: TEL_LINK },
        { text: STORE_EMAIL, icon: "fas fa-envelope", link: STORE_EMAIL_LINK }
    ],
    about: [ { text: "About Us", link: "#about" }, { text: "Contact", link: "#contact" }, { text: "Privacy Policy", link: "#privacy" } ],
categories: [
    { text: "Paintings", link: "#paintingsTitle" },
    { text: "Cups", link: "#cupsTitle" },
    { text: "3D Prints", link: "#prints3dTitle" },
    { text: "Frames", link: "#framesTitle" },
    { text: "Mixed Gifts", link: "#giftsTitle" }
],
    collections: [
        { text: "Praise of the Prophet", link: "#coming-praise" },
        { text: "Ramadan Products", link: "#coming-ramadan" }
    ]
};

const footerLinksArabic = {
    contact: [
        { text: STORE_PHONE_DISPLAY, icon: "fas fa-phone", link: TEL_LINK },
        { text: STORE_EMAIL, icon: "fas fa-envelope", link: STORE_EMAIL_LINK }
    ],
    about: [ { text: "من نحن", link: "#about" }, { text: "تواصل معنا", link: "#contact" }, { text: "سياسة الخصوصية", link: "#privacy" } ],
categories: [
    { text: "لوحات", link: "#paintingsTitle" },
    { text: "كاسات", link: "#cupsTitle" },
    { text: "طباعات 3D", link: "#prints3dTitle" },
    { text: "براويز", link: "#framesTitle" },
    { text: "هدايا منوعة", link: "#giftsTitle" }
],
    collections: [
        { text: "مدح الرسول ﷺ", link: "#coming-praise" },
        { text: "منتجات رمضانية", link: "#coming-ramadan" }
    ]
};

// =================================================================
// --- 🟢 INFO PAGES CONTENT (About Us / Privacy Policy) ---
// =================================================================
const infoContentArabic = {
    about: {
        title: "من نحن",
        intro: "في متجر طُرفة، نؤمن أن الفن العربي ليس مجرد ديكور، بل رسالة تتنقل بين الجدران لتروي حكاية أصالة ودفء.",
        sections: [
            {
                icon: "fa-paint-brush",
                title: "قصتنا",
                text: "بدأت طُرفة من شغف صادق بالخط العربي والفنون اليدوية، حيث آمنّا أن لكل بيت روحاً تستحق أن تُزيَّن بقطع تليق بذوق أصحابها. نحن نُحوّل الكلمات إلى لوحات نابضة بالحياة، ونصنع من الخامات البسيطة قطعاً تحمل بصمة فريدة."
            },
            {
                icon: "fa-heart",
                title: "رسالتنا",
                text: "أن نقدم لك قطعة فنية لا تُشترى من أي مكان، بل تُصنع خصيصاً بأيدٍ متقنة، تجمع بين روح التراث وجمال التصميم العصري، لتكون شاهداً على ذوقك في كل زاوية من بيتك."
            },
            {
                icon: "fa-gem",
                title: "ما يميّزنا",
                text: "كل قطعة في طُرفة هي ثمرة ساعات من العمل اليدوي الدقيق. نستخدم تقنية الطبقات ثلاثية الأبعاد لإضفاء عمقٍ آسر على لوحاتنا، ونختار خاماتنا بعناية لتدوم معك سنوات طويلة. لسنا فقط متجراً، نحن شركاؤك في إضفاء لمسة فنية على حياتك."
            },
            {
                icon: "fa-map-marker-alt",
                title: "من الأردن إلى العالم",
                text: "انطلقنا من قلب الأردن لنصل إلى عشّاق الفن العربي في كل مكان. هدفنا أن تكون كل قطعة من طُرفة جسراً يربط بين الماضي العريق والحاضر الأنيق."
            }
        ],
        closing: "شكراً لثقتكم بنا. كل قطعة تختارونها تعني لنا الكثير. ✨"
    },
    privacy: {
        title: "سياسة الخصوصية",
        intro: "خصوصيتك تهمّنا في متجر طُرفة. هذه الصفحة توضح بشكل مبسّط كيف نتعامل مع معلوماتك عند تسوّقك من موقعنا.",
        sections: [
            {
                icon: "fa-database",
                title: "المعلومات التي نجمعها",
                text: "عند إتمام الطلب عبر واتساب، نحصل على معلومات أساسية فقط مثل الاسم ورقم الهاتف وعنوان التوصيل. لا نطلب أي معلومات بنكية أو حساسة على الموقع."
            },
            {
                icon: "fa-lock",
                title: "كيف نستخدم بياناتك",
                text: "نستخدم معلوماتك فقط لتنفيذ طلبك، التواصل معك بخصوص حالة الشحنة، أو إعلامك بالعروض الجديدة في حال أبديت رغبتك بذلك. لن نشاركها مع أي طرف خارجي تحت أي ظرف."
            },
            {
                icon: "fa-cookie-bite",
                title: "ملفات الكوكيز",
                text: "نستخدم تقنيات تخزين بسيطة في متصفّحك لحفظ سلة التسوق وقائمة المفضّلة لديك، حتى تجد منتجاتك في انتظارك عند عودتك. هذه البيانات تبقى على جهازك ولا تُرسل إلينا."
            },
            {
                icon: "fa-user-shield",
                title: "حقوقك",
                text: "لك الحق الكامل في طلب حذف بياناتك أو الاستفسار عمّا نحتفظ به في أي وقت. تواصل معنا عبر واتساب أو البريد الإلكتروني وسنردّ في أقرب فرصة."
            },
            {
                icon: "fa-sync-alt",
                title: "تحديثات السياسة",
                text: "قد نُحدّث سياسة الخصوصية من وقت لآخر لتواكب تطوّر خدماتنا. أي تغيير سيظهر في هذه الصفحة مع تاريخ آخر تحديث."
            }
        ],
        closing: "لأي استفسار، لا تتردّد بالتواصل معنا عبر واتساب: +962 78 848 9914"
    }
};

const infoContentEnglish = {
    about: {
        title: "About Us",
        intro: "At Turfa Store, we believe Arabic art is more than décor — it's a message that travels through walls, telling stories of authenticity and warmth.",
        sections: [
            {
                icon: "fa-paint-brush",
                title: "Our Story",
                text: "Turfa was born from a sincere passion for Arabic calligraphy and handcrafted arts. We believe every home has a soul that deserves pieces matching its owner's taste. We turn words into living paintings, and craft simple materials into unique signature pieces."
            },
            {
                icon: "fa-heart",
                title: "Our Mission",
                text: "To offer you art that cannot be bought elsewhere — pieces handcrafted with mastery, blending heritage spirit with modern design beauty, becoming a testimony of your taste in every corner of your home."
            },
            {
                icon: "fa-gem",
                title: "What Makes Us Different",
                text: "Every piece at Turfa is the fruit of hours of precise handwork. We use 3D layered technology to add captivating depth to our paintings, and carefully select materials that last for years. We're not just a store — we're your partners in adding artistic touches to your life."
            },
            {
                icon: "fa-map-marker-alt",
                title: "From Jordan to the World",
                text: "We started from the heart of Jordan to reach Arabic art lovers everywhere. Our goal is for every Turfa piece to be a bridge between rich heritage and elegant modernity."
            }
        ],
        closing: "Thank you for trusting us. Every piece you choose means a lot to us. ✨"
    },
    privacy: {
        title: "Privacy Policy",
        intro: "Your privacy matters to us at Turfa Store. This page explains in simple terms how we handle your information when shopping on our website.",
        sections: [
            {
                icon: "fa-database",
                title: "Information We Collect",
                text: "When completing your order via WhatsApp, we only collect essential information such as name, phone number, and delivery address. We never request any banking or sensitive information on the website."
            },
            {
                icon: "fa-lock",
                title: "How We Use Your Data",
                text: "We use your information solely to fulfill your order, communicate about shipment status, or notify you about new offers if you choose to subscribe. We never share it with any third party under any circumstances."
            },
            {
                icon: "fa-cookie-bite",
                title: "Cookies",
                text: "We use simple browser storage to save your shopping cart and favorites list, so your items wait for you when you return. This data stays on your device and is not sent to us."
            },
            {
                icon: "fa-user-shield",
                title: "Your Rights",
                text: "You have full right to request deletion of your data or inquire about what we hold at any time. Contact us via WhatsApp or email and we'll respond as soon as possible."
            },
            {
                icon: "fa-sync-alt",
                title: "Policy Updates",
                text: "We may update this privacy policy from time to time as our services evolve. Any changes will appear on this page with the date of last update."
            }
        ],
        closing: "For any inquiry, don't hesitate to contact us via WhatsApp: +962 78 848 9914"
    }
};

// =================================================================
// --- 🟢 COMING SOON COLLECTIONS DATA ---
// =================================================================
const comingSoonContentArabic = {
    'coming-praise': {
        title: "مدح الرسول ﷺ",
        icon: "fa-mosque",
        intro: "مجموعة فنية روحانية قيد التحضير",
        message: "نعمل حالياً على تجهيز مجموعة مميزة من اللوحات الفنية المستوحاة من مدح خير الأنام، سيدنا محمد ﷺ.",
        sub: "ترقّبوا قطعاً نابضة بالخط العربي الأصيل والمعاني العذبة، تليق بأرواحكم وبيوتكم.",
        eta: "قريباً جداً"
    },
    'coming-ramadan': {
        title: "منتجات رمضانية",
        icon: "fa-moon",
        intro: "مجموعة شهر الخير قادمة",
        message: "نُعدّ لكم تشكيلة خاصة بأجواء شهر رمضان المبارك — لوحات وهدايا تضفي على بيوتكم روحانية الشهر الفضيل.",
        sub: "هدايا مثالية تشاركونها مع أحبابكم، أو تزيّنون بها مجالسكم في الليالي المباركة.",
        eta: "قريباً مع اقتراب الشهر الكريم"
    }
};

const comingSoonContentEnglish = {
    'coming-praise': {
        title: "Praise of the Prophet ﷺ",
        icon: "fa-mosque",
        intro: "A spiritual art collection in the making",
        message: "We are currently preparing a special collection of artistic pieces inspired by the praise of Prophet Muhammad ﷺ.",
        sub: "Stay tuned for pieces vibrant with authentic Arabic calligraphy and profound meanings, worthy of your soul and your home.",
        eta: "Coming very soon"
    },
    'coming-ramadan': {
        title: "Ramadan Collection",
        icon: "fa-moon",
        intro: "The Holy Month collection is on its way",
        message: "We are preparing a special collection inspired by the spirit of the Holy Month of Ramadan — paintings and gifts that bring blessings into your home.",
        sub: "Perfect gifts to share with loved ones, or to adorn your gatherings during the blessed nights.",
        eta: "Coming soon, before Ramadan"
    }
};

// =================================================================
// --- 🟢 CONTACT US MODAL DATA ---
// =================================================================
const contactContentArabic = {
    title: "تواصل معنا",
    intro: "يسعدنا تواصلكم معنا في أي وقت — اختاروا الطريقة الأنسب لكم وسنرد عليكم بأقرب فرصة.",
    channels: [
        {
            icon: "fab fa-whatsapp",
            type: "whatsapp",
            title: "واتساب",
            value: "+962 78 848 9914",
            desc: "للطلبات والاستفسارات السريعة",
            link: WHATSAPP_BASE
        },
        {
            icon: "fas fa-phone",
            type: "phone",
            title: "الهاتف",
            value: "+962 78 848 9914",
            desc: "متاحون لاستقبال اتصالكم",
            link: TEL_LINK
        },
        {
            icon: "fas fa-envelope",
            type: "email",
            title: "البريد الإلكتروني",
            value: STORE_EMAIL,
            desc: "للاستفسارات الرسمية والتعاون",
            link: STORE_EMAIL_LINK
        },
        {
            icon: "fab fa-instagram",
            type: "instagram",
            title: "إنستغرام",
            value: "@turfa.jo",
            desc: "تابعوا أحدث أعمالنا وقصصنا",
            link: "https://www.instagram.com/turfa.jo/"
        },
        {
            icon: "fab fa-facebook-f",
            type: "facebook",
            title: "فيسبوك",
            value: "متجر طُرفة",
            desc: "تواصلوا معنا وانضموا لمجتمعنا",
            link: "https://www.facebook.com/profile.php?id=61580280779889"
        }
    ],
    closing: "نعمل من قلب الأردن، وأبوابنا الرقمية مفتوحة لكم على مدار الساعة. ✨"
};

const contactContentEnglish = {
    title: "Contact Us",
    intro: "We're happy to hear from you anytime — choose the channel that suits you best, and we'll reply as soon as possible.",
    channels: [
        {
            icon: "fab fa-whatsapp",
            type: "whatsapp",
            title: "WhatsApp",
            value: "+962 78 848 9914",
            desc: "For quick orders and inquiries",
            link: WHATSAPP_BASE
        },
        {
            icon: "fas fa-phone",
            type: "phone",
            title: "Phone",
            value: "+962 78 848 9914",
            desc: "Available to take your call",
            link: TEL_LINK
        },
        {
            icon: "fas fa-envelope",
            type: "email",
            title: "Email",
            value: STORE_EMAIL,
            desc: "For formal inquiries and collaborations",
            link: STORE_EMAIL_LINK
        },
        {
            icon: "fab fa-instagram",
            type: "instagram",
            title: "Instagram",
            value: "@turfa.jo",
            desc: "Follow our latest work and stories",
            link: "https://www.instagram.com/turfa.jo/"
        },
        {
            icon: "fab fa-facebook-f",
            type: "facebook",
            title: "Facebook",
            value: "Turfa Store",
            desc: "Connect with us and join our community",
            link: "https://www.facebook.com/profile.php?id=61580280779889"
        }
    ],
    closing: "We work from the heart of Jordan, and our digital doors are open to you around the clock. ✨"
};

// =================================================================
// --- 2. PRODUCT DATA ---
// 🟢 هذا القسم مُولّد تلقائياً من products.csv — لا تعدّله يدوياً!
//    عدّل products.csv ثم شغّل: node build-data.js
// =================================================================

const paintingsEnglish = [
    {
        id: 1,
        name: "Ya Sham",
        price: 19.99,
        shortDesc: "Damascus in my heart, a piece of art on my wall",
        fullDesc: "A piece of art crafted with 3 layers of passion to be a lasting reminder of the most beautiful bonds. A serene décor piece with a pink touch, fit for your home and designed to delight your heart",
        image: "images/plates/1/1.webp",
        category: "painting",
        hasSizes: true,
        colors: [
          {
            "name": "Pink",
            "hex": "#e8a0b0",
            "images": [
              "images/plates/1/1.webp",
              "images/plates/1/1b.webp",
              "images/plates/1/1c.webp"
            ]
          },
          {
            "name": "Beige",
            "hex": "#d4b896",
            "images": [
              "images/plates/1/1_beige.webp",
              "images/plates/1/1b_beige.webp",
              "images/plates/1/1c_beige.webp"
            ]
          }
        ],
    },
    { id: 2, name: "Alhamdulillah", price: 19.99, shortDesc: "A beautiful plaque, to remind you of gratitude at all times.", fullDesc: "A spiritual art piece crafted with 3D layered technology, designed to illuminate your walls with the remembrance of God and tranquility. A design that merges the grandeur of calligraphy with the depth of ornamentation, serving as a daily reminder of the beauty of gratitude", image: "images/plates/2/2.webp", category: "painting", hasSizes: true },
    { id: 3, name: "Ayatul Kursi", price: 19.99, shortDesc: "The greatest verse, in an artistic design that immortalizes its beauty.", fullDesc: "A décor piece carrying the greatest verse in the Qur'an, crafted with striking layered (3D) technology to bring tranquility and reverence to your space. A unique design blending the grandeur of calligraphy with the warmth of wood, to keep your home under God's protection.", image: "images/plates/3/3.webp", category: "painting", hasSizes: true },
    { id: 4, name: "Custom Design Painting", price: 0, shortDesc: "Design your own painting — verse, hadith, prayer, poem, name or anything you'd like, in your chosen size.", fullDesc: "A painting tailored entirely to your taste. Choose the type of text — a Qur'anic verse, a noble hadith, a prayer, a poem, a name or any custom design — write what you want, pick the size, and we'll craft it as a unique handmade piece for you. Final price is sent to you on WhatsApp after we review your request.", image: "images/plates/4/custom-design.webp", category: "painting", hasSizes: false, requiresCustomForm: true, isCustomDesign: true }
];

const paintingsArabic = [
    {
        id: 1,
        name: "لوحة يا شام",
        price: 19.99,
        shortDesc: "دمشق في قلبي، قطعة فنية على جداري.",
        fullDesc: "لوحة فنية صُنعت بـ 3 طبقات من الشغف لتبقى تذكاراً دائماً لأجمل الروابط. قطعة ديكور هادئة بلمسة وردية، تليق ببيتك وتُسعد قلبك.",
        image: "images/plates/1/1.webp",
        category: "painting",
        hasSizes: true,
        colors: [
          {
            "name": "وردي",
            "hex": "#e8a0b0",
            "images": [
              "images/plates/1/1.webp",
              "images/plates/1/1b.webp",
              "images/plates/1/1c.webp"
            ]
          },
          {
            "name": "بني",
            "hex": "#704214",
            "images": [
              "images/plates/1/brown/1.webp",
              "images/plates/1/brown/2.webp"
            ]
          }
        ],
    },
    {
        id: 2,
        name: "لوحة الحمد لله",
        price: 19.99,
        shortDesc: "لوحة، تذكرك بجمال الامتنان في كل حين.",
        fullDesc: "قطعة فنية روحانية صُنعت بتقنية الطبقات الثلاثية الأبعاد، لتضيء جدران بيتك بذكر الله والسكينة. تصميم يجمع عظمة الخط مع عمق الزخرفة، لتكون تذكيراً يومياً بجمال الامتنان.",
        image: "images/plates/2/2.webp",
        category: "painting",
        hasSizes: true,
        colors: [
          {
            "name": "بيج",
            "hex": "#d4b896",
            "images": [
              "images/plates/2/2.webp",
              "images/plates/2/2b.webp"
            ]
          },
          {
            "name": "أسود",
            "hex": "#2c2c2c",
            "images": [
              "images/plates/2/2_black.webp",
              "images/plates/2/2b_black.webp"
            ]
          },
          {
            "name": "ذهبي",
            "hex": "#c9a84c",
            "images": [
              "images/plates/2/2_gold.webp"
            ]
          }
        ],
    },
    { id: 3, name: " لوحة آية الكرسي ", price: 19.99, shortDesc: "أعظم آية، بتصميم فني يخلد جمالها.", fullDesc: "قطعة ديكور تحمل أعظم آية في القرآن، صُنعت بتقنية الطبقات البارزة، لتضفي على مساحتك سكينة ومهابة. تصميم فريد يمزج بين عظمة الخط ودفء الخشب، لتكون بيتك في حفظ الله.", image: "images/plates/3/3.webp", category: "painting", hasSizes: true },
    { id: 4, name: "لوحة مخصصة حسب طلبك", price: 0, shortDesc: "صمم لوحتك الخاصة — آية، حديث، دعاء، قصيدة، اسم أو أي تصميم تختاره، بالمقاس اللي يناسبك.", fullDesc: "لوحة مفصلة على ذوقك بالكامل. اختر نوع النص اللي بدك إياه — آية قرآنية، حديث شريف، دعاء، قصيدة، اسم أو تصميم خاص — اكتب لنا ما تريد، حدد المقاس، ونحن نصنعها لك قطعة يدوية فريدة. السعر النهائي يصلك على واتساب بعد مراجعة طلبك.", image: "images/plates/4/custom-design.webp", category: "painting", hasSizes: false, requiresCustomForm: true, isCustomDesign: true }
];

const cupsEnglish = [
    { id: 116, name: "Jordan Map & Shemagh 80th Independence Mug", price: 9.99, shortDesc: "A patriotic light blue mug featuring a sculpted map of Jordan in flag colors, the traditional red Shemagh, and the number 80, beautifully handcrafted from ceramic paste.", fullDesc: "Celebrate your national pride with this special patriotic mug from Turfa, uniquely designed in honor of Jordan's 80th Independence Day. This charming light blue mug features a striking 3D sculpted map of Jordan painted in the vibrant colors of the national flag, beautifully paired with the traditional red and white Shemagh and the number 80. Every raised detail is meticulously handcrafted using premium ceramic paste, ensuring a highly textured and authentic finish. It is a perfect, meaningful keepsake for national holidays or a wonderful gift to proudly showcase your love for Jordan.", image: "images/cup/17/1.webp", category: "cup", hasSizes: false },
    { id: 101, name: "Floral Blossom Mug", price: 9.99, shortDesc: "An elegant pastel pink mug adorned with beautiful 3D blossoms, perfect for adding a touch of nature to your daily routine.", fullDesc: "Sip your favorite beverage in style with this beautifully crafted mug. Featuring a soft pastel pink finish and stunning, raised 3D floral embellishments, this piece brings a touch of botanical elegance to your table. Whether for your morning coffee or as a thoughtful gift for a loved one, its delicate nature-inspired design makes every sip special.", image: "images/cup/1/1.webp", category: "cup", hasSizes: false },
    { id: 102, name: "Keffiyeh & Olive Branch 3D Mug", price: 15.99, shortDesc: "An elegant white mug featuring a beautifully sculpted 3D olive branch and traditional Keffiyeh pattern.", fullDesc: "Celebrate heritage and craftsmanship with this unique handcrafted mug. It features stunning 3D elements, beautifully combining the iconic Keffiyeh pattern with a lifelike sculpted olive branch. Perfect for your daily coffee or tea, or as a meaningful, culturally inspired gift that showcases a true appreciation for handmade artistry.", image: "images/cup/2/2.webp", category: "cup", hasSizes: false },
    { id: 103, name: "Personalized Cute Mouse & Heart 3D Mug", price: 7.99, shortDesc: "An adorable mug featuring a 3D sculpted mouse holding a heart that can be customized with the name of your choice.", fullDesc: "Surprise your loved ones with a truly heartwarming gift! This beautifully handcrafted mug features a cute 3D mouse delicately holding a red heart, surrounded by tiny floating hearts. Make it extra special by personalizing the main heart with a name, creating a memorable and unique keepsake. Perfect for special occasions, romantic gestures, or simply showing someone you care with a beautiful, custom-made touch.", image: "images/cup/3/3.webp", category: "cup", hasSizes: false },
    { id: 104, name: "Red Heart & White Roses Mug", price: 9.99, shortDesc: "A romantically designed mug featuring a bold red 3D heart elegantly accented with delicate sculpted white roses.", fullDesc: "Express your feelings in the most beautiful way with this exceptional mug. It features a meticulously handcrafted design that pairs a striking, raised red heart with delicate, 3D white roses cascading gracefully along its edge. Crafted with high attention to detail, this signature piece from Turfa is more than just a mug—it's a small work of art. It makes for an absolutely perfect gift for anniversaries, Valentine's Day, or any special occasion to show someone how much you truly care.", image: "images/cup/4/4.webp", category: "cup", hasSizes: false },
    { id: 105, name: "Keffiyeh & Olive Branch Coffee Cup Set", price: 14.99, shortDesc: "An elegant set of coffee cups beautifully detailed with a 3D Keffiyeh pattern and sculpted olive branches, perfect for traditional hospitality.", fullDesc: "Elevate your hosting experience with this exquisite cup set from Turfa. Perfectly sized for Arabic coffee or espresso, each piece in this collection features a meticulously handcrafted 3D design that merges the iconic Keffiyeh pattern with a lifelike olive branch. More than just drinkware, this set is a celebration of heritage and artisanal craftsmanship, making it a sophisticated addition to your home or a highly meaningful cultural gift for your loved ones.", image: "images/cup/5/5.webp", category: "cup", hasSizes: false },
    { id: 106, name: "Bamboo Eco Cup", price: 9.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.", fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cup/6/6.webp", category: "cup", hasSizes: false },
    { id: 107, name: "Vibrant Floral Bouquet & Bow Mug", price: 9.99, shortDesc: "A cheerful mug beautifully adorned with a brightly colored, 3D sculpted floral bouquet and a delicate bow.", fullDesc: "Start your morning with a splash of color and positivity with this charming mug from Turfa. It features a meticulously handcrafted 3D design showcasing a blooming bouquet of vibrant orange, red, and yellow flowers, nestled among lively green leaves and finished with a sweet, sculpted bow. The intricate raised details make this piece a true work of art that pops with natural beauty. It's the perfect uplifting gift for those who love warm colors, or a wonderful, joy-filled addition to your own collection.", image: "images/cup/7/7.webp", category: "cup", hasSizes: false },
    { id: 108, name: "Ceramic Paste Red Heart & Yellow Roses Mug", price: 9.99, shortDesc: "A striking black mug featuring a uniquely textured red heart and vibrant yellow roses, meticulously handcrafted from ceramic paste.", fullDesc: "Add a touch of bold elegance to your day with this striking black ceramic mug from Turfa. The dramatic contrast between the sleek dark background, the beautifully textured 3D red heart, and the vibrant crown of yellow roses creates a truly eye-catching piece of art. All the raised 3D elements are carefully sculpted by hand using high-quality ceramic paste, ensuring a unique and durable finish. It makes for an unforgettable, unconventional gift that beautifully expresses both love and distinct style.", image: "images/cup/8/8.webp", category: "cup", hasSizes: false },
    { id: 109, name: "Spring Daffodil Bouquet Mug", price: 9.99, shortDesc: "A calming pale green mug featuring a beautiful 3D bouquet of spring daffodils and flowers, meticulously handcrafted from ceramic paste.", fullDesc: "Embrace the beauty of spring with every sip using this elegant mug from Turfa. It features a soothing pastel green finish, beautifully adorned with a sculpted bouquet of yellow and pale pink daffodils, vibrant green leaves, and tied together with a delicate white bow. Each raised 3D element is carefully handcrafted using premium ceramic paste, giving it a unique, artisanal, and durable texture. This charming piece makes a wonderful addition to your morning routine or a thoughtful, nature-inspired gift.", image: "images/cup/9/9.webp", category: "cup", hasSizes: false },
    { id: 110, name: "Scalloped Frame & Red Roses Mug", price: 9.99, shortDesc: "An elegant white mug featuring a textured, scalloped peach backdrop adorned with striking 3D red roses, all handcrafted from ceramic paste.", fullDesc: "Elevate your coffee moments with this beautifully artistic mug from Turfa. It features a unique, handcrafted design showcasing a scalloped, marbled peach background perfectly complemented by a vibrant cluster of raised red roses and delicate blue and white accent flowers. Every 3D element is meticulously sculpted by hand using premium ceramic paste, ensuring a stunning, high-quality, and durable finish. A sophisticated piece that makes a gorgeous addition to your own collection or an eye-catching, elegant gift for someone special.", image: "images/cup/10/10.webp", category: "cup", hasSizes: false },
    { id: 111, name: "Floral Crescent & Ramadan Kareem Mug", price: 9.99, shortDesc: "A soothing peach-colored mug decorated with a sculpted crescent, vibrant flowers, and a Ramadan Kareem plaque, beautifully handcrafted from ceramic paste.", fullDesc: "Celebrate the holy month in style with this special Ramadan mug from Turfa. The festive design features a beautiful yellow crescent moon adorned with a colorful cluster of flowers, paired with an elegant, rustic plaque displaying Ramadan Kareem. Every raised 3D detail is lovingly sculpted by hand using premium ceramic paste, ensuring a unique, high-quality, and durable finish. It is a wonderful addition to your Suhoor and Iftar gatherings, or a thoughtful, joyous Ramadan gift for family and friends.", image: "images/cup/11/11.webp", category: "cup", hasSizes: false },
    { id: 112, name: "Blooming Branch & Floral Mug", price: 9.99, shortDesc: "A captivating black mug featuring a sculpted branch with vibrant red and peach blossoms, beautifully handcrafted from ceramic paste.", fullDesc: "Bring a touch of nature's magic to your daily routine with this elegant black mug from Turfa. The design showcases a beautifully sculpted 3D winding branch, blooming with warm, eye-catching flowers in bold red and soft peach, gently accented by tiny buds and green leaves. Every raised detail is meticulously handcrafted and shaped using premium ceramic paste, creating a stunning and vibrant contrast against the dark, sleek background. It is the perfect choice for lovers of nature-inspired, artisanal craftsmanship, and a truly exceptional gift.", image: "images/cup/12/12.webp", category: "cup", hasSizes: false },
    { id: 113, name: "My Mother, My Paradise Floral Mug", price: 9.99, shortDesc: "An elegant white mug carrying a warm message for mothers, decorated with a sculpted yellow plaque and vibrant 3D flowers meticulously handcrafted from ceramic paste.", fullDesc: "Express your deep love and gratitude to the most special woman in your life with this heartwarming mug from Turfa. The charming design features a delicately scalloped yellow plaque inscribed with the touching Arabic phrase Mother.. My paradise in this life.. (أمي.. جَنتي في هذه الحياة..), beautifully framed by a handcrafted arrangement of vibrant 3D flowers and leaves. Every raised element is meticulously sculpted by hand using premium ceramic paste, creating a unique and durable piece of art. It is the perfect Mother's Day gift or a meaningful surprise to bring joy to your mother's heart any day of the year.", image: "images/cup/13/13.webp", category: "cup", hasSizes: false },
    { id: 114, name: "Teddy Bear & Personalized Hearts Mug", price: 9.99, shortDesc: "An adorable white mug featuring a sculpted grey teddy bear in a blue beanie holding customizable hearts, meticulously handcrafted from ceramic paste.", fullDesc: "Bring a smile to your loved one's face with this incredibly cute mug from Turfa. The design features a beautifully detailed 3D grey teddy bear wearing a textured blue knitted hat, affectionately holding a bundle of hearts that can be personalized with your chosen initials. Every raised element, from the realistic fuzzy texture of the bear to the tiny scattered hearts, is lovingly handcrafted using premium ceramic paste ensuring high quality and durability. A perfectly sweet, customized gift for friends, couples, or that special someone in your life.", image: "images/cup/15/15.webp", category: "cup", hasSizes: false },
    { id: 117, name: "Eid Al-Adha Sheep Mug", price: 9.99, shortDesc: "A warm copper-toned mug featuring a delightfully cute sculpted sheep and a Happy Eid Al-Adha greeting plaque, beautifully handcrafted from ceramic paste.", fullDesc: "Share the joy of the holidays with this delightful festive mug from Turfa. Featuring a beautiful copper finish, the design showcases a 3D rustic plaque with a dotted border, bearing the Arabic greeting Eid Adha Saeed (Happy Eid Al-Adha). Accompanying the greeting is an incredibly adorable, fluffy-textured sculpted sheep. Every raised detail is carefully molded and handcrafted using high-quality ceramic paste, ensuring a charming and durable finish. This mug makes a perfect and unique Eid gift for family and friends, bringing an extra touch of cheer and warmth to your holiday celebrations.", image: "images/cup/18/1.webp", category: "cup", hasSizes: false },
    { id: 115, name: "Floral Wooden Plaque Personalized Mug", price: 9.99, shortDesc: "Create your own masterpiece or give a truly memorable gift with this unique customizable mug from Turfa. The design highlights a meticulously sculpted, wood-textured plaque surrounded by vibrant 3D red and white roses, complete with a soft pink bow. Every raised detail is handcrafted with care using premium ceramic paste, leaving the center space perfectly blank for you to customize with a name, a special date, or a short message. It is the perfect choice for anyone seeking an artisanal, highly personalized gift with a romantic, vintage charm.", image: "images/cup/16/16.webp", category: "cup", hasSizes: false }
];

const cupsArabic = [
    { id: 116, name: "كوب خارطة الأردن والشماغ (الذكرى 80)", price: 9.99, shortDesc: "كوب أنيق بلون نحاسي دافئ، مزين بمجسم لطيف لخروف العيد ولوحة تهنئة بعيد الأضحى، مُشكل يدوياً باحترافية من معجون السيراميك.", fullDesc: "شارك فرحة العيد مع من تحب من خلال هذا الكوب المبهج من طُرفة. يتميز الكوب بلون نحاسي جذاب، ويحمل تصميماً ثلاثي الأبعاد للوحة دائرية مزخرفة تتوسطها عبارة عيد أضحى سعيد بخط رقيق، وبجانبها مجسم غاية في اللطافة لخروف العيد بتفاصيل صوفية بارزة ودقيقة. جميع هذه العناصر تم نحتها وتشكيلها يدوياً بعناية فائقة باستخدام معجون السيراميك عالي الجودة. يعتبر هذا الكوب هدية عيدية استثنائية وفريدة من نوعها للأصدقاء والعائلة لإضافة لمسة من المرح والبهجة لأجواء العيد.", image: "images/cup/17/1.webp", category: "cup", hasSizes: false },
    { id: 101, name: "كوب الزهور الوردية البارزة", price: 9.99, shortDesc: "كوب أنيق بلون وردي هادئ، مزين بزهور مجسمة تضفي لمسة من الطبيعة والجمال على مشروبك المفضل.", fullDesc: "استمتع بقهوتك أو شايك مع هذا الكوب الفريد المصمم بحرفية عالية. يتميز الكوب بلون وردي جذاب وتفاصيل بارزة لزهور وأغصان دقيقة تمنحه طابعاً فنياً راقياً. تصميمه المستوحى من الطبيعة يجعله قطعة مميزة في مجموعتك، أو هدية مثالية ورائعة لمن تحب.", image: "images/cup/1/1.webp", category: "cup", hasSizes: false },
    { id: 102, name: "كوب الكوفية وغصن الزيتون", price: 11.99, shortDesc: "كوب أبيض أنيق يجمع بين أصالة الكوفية ورمزية غصن الزيتون بتصميم مجسم وبارز.", fullDesc: "أضف لمسة من الأصالة والتراث إلى أوقاتك مع هذا الكوب الفريد. يتميز بتصميم ثلاثي الأبعاد مصنوع بحرفية ودقة، يدمج بين نقوش الكوفية التقليدية وأغصان الزيتون البارزة. خيار مثالي للاستخدام اليومي أو كهدية ذات طابع ثقافي ومعنوي عميق تعكس ذوقك الرفيع في اختيار القطع الفنية اليدوية.", image: "images/cup/2/2.webp", category: "cup", hasSizes: false },
    { id: 103, name: "كوب الفأر اللطيف والقلب المخصص", price: 7.99, shortDesc: "كوب بتصميم رقيق مزين بمجسم فأر صغير يحمل قلباً أحمر، مع إمكانية كتابة اسم من تحب عليه.", fullDesc: "فاجئ أحباءك بهدية فريدة ومليئة بالمشاعر! يتميز هذا الكوب بتصميم ثلاثي الأبعاد مصنوع يدوياً لفأر لطيف يحمل قلباً أحمر مزيناً بقلوب صغيرة متناثرة. ما يجعل هذه القطعة مميزة حقاً هو إمكانية تخصيص الاسم المحفور على القلب ليكون تذكاراً شخصياً لا يُنسى. خيار مثالي للإهداء في المناسبات الخاصة، أو للتعبير عن الاهتمام بطريقة مبتكرة ولمسة فنية دافئة.", image: "images/cup/3/3.webp", category: "cup", hasSizes: false },
    { id: 104, name: "كوب القلب الأحمر والورود البيضاء", price: 9.99, shortDesc: "كوب بتصميم رومانسي دافئ، يبرز فيه قلب أحمر كبير مزين بورود بيضاء مجسمة، مثالي للتعبير عن الحب.", fullDesc: "عبّر عن مشاعرك بأصدق طريقة مع هذا الكوب الاستثنائي. يتميز الكوب بتصميم يدوي متقن يجمع بين دفء القلب الأحمر البارز ورقة الورود البيضاء ثلاثية الأبعاد التي تزين أطرافه بانسجام تام. صُنع هذا الكوب بحرفية عالية ليكون تحفة فنية صغيرة بين يديك؛ فهو قطعة مميزة من طُرفة تعكس ذوقك الرفيع في اختيار الهدايا المصنوعة يدوياً، ويعتبر خياراً مثالياً للإهداء في الأعياد والمناسبات الرومانسية لمن تحب.", image: "images/cup/4/4.webp", category: "cup", hasSizes: false },
    { id: 105, name: "طقم فناجين الكوفية وغصن الزيتون", price: 14.99, shortDesc: "طقم فناجين قهوة أنيق يجمع بين نقش الكوفية العريق وأغصان الزيتون المجسمة، لتقديم ضيافة استثنائية بلمسة تراثية.", fullDesc: "ارتقِ بتجربة الضيافة الخاصة بك مع هذا الطقم الفاخر من طُرفة. يتكون الطقم من فناجين بحجم مثالي للقهوة العربية أو الإسبريسو، وتتميز كل قطعة بتصميم ثلاثي الأبعاد متقن يدمج بين تفاصيل الكوفية الأصيلة وغصن الزيتون البارز. هذا الطقم ليس مجرد أوانٍ للضيافة، بل هو تجسيد للتراث والفن اليدوي العالي، مما يجعله إضافة راقية لمجلسك أو هدية قيمة تعبر عن الفخر والأصالة في كل رشفة.", image: "images/cup/5/5.webp", category: "cup", hasSizes: false },
    { id: 106, name: "كوب منزل السنافر", price: 9.99, shortDesc: "ابدأ صباحك بابتسامة مع كوب منزل السنافر الساحر. تفاصيله الدقيقة وألوانه الدافئة تجعله الهدية المثالية لمحبي القطع الفريدة والمميزة", fullDesc: "استمتع بتجربة فريدة مع كوب ل السنافر المصنوع من الخزف عالي الجودة والمزين بتفاصيل ثلاثية الأبعاد تنبض بالحياة. يتميز هذا الكوب بتصميم ساحر يجسد كوخ الفطر الأحمر الريفي مع تفاصيل الباب والنباتات الخضراء، مما يجعله قطعة فنية جذابة تزين مكتبك وتضفي دفئاً وسحراً خاصاً على مشروباتك الساخنة في كل مرة تستخدمه", image: "images/cup/6/6.webp", category: "cup", hasSizes: false },
    { id: 107, name: "كوب باقة الزهور المشرقة والفيونكة", price: 9.99, shortDesc: "كوب أنيق ومبهج مزين بباقة بارزة من الزهور المتفتحة بألوان دافئة، مع فيونكة ناعمة تضفي لمسة من الحيوية على يومك.", fullDesc: "ابدأ صباحك بطاقة إيجابية مع هذا الكوب الساحر من طُرفة. يتميز بتصميم يدوي دقيق يبرز باقة من الزهور ثلاثية الأبعاد بألوان متدرجة بين البرتقالي والأحمر والأصفر، تتوسطها أوراق خضراء نابضة بالحياة وتزينها فيونكة رقيقة من الجانب. التفاصيل البارزة والحرفية العالية تجعل من هذا الكوب تحفة فنية تنبض بالجمال الطبيعي، وهو الهدية المثالية لمحبي الألوان الدافئة والقطع اليدوية المليئة بالحياة.", image: "images/cup/7/7.webp", category: "cup", hasSizes: false },
    { id: 108, name: "كوب القلب الأحمر البارز بتاج الورود الصفراء", price: 9.99, shortDesc: "كوب أسود أنيق يتميز بتصميم فريد لقلب أحمر وورود صفراء زاهية، تم تشكيلها يدوياً باحترافية من معجون السيراميك.", fullDesc: "أضف لمسة من الجرأة والفخامة إلى أوقاتك مع هذا الكوب الأسود اللامع من طُرفة. يخلق التباين اللوني بين الخلفية الداكنة والقلب الأحمر ذي الملمس البارز، مع تاج الورود الصفراء النابضة بالحياة، لوحة فنية مميزة. جميع التفاصيل المجسمة على الكوب مصنوعة ومُشكلة يدوياً بدقة وعناية فائقة باستخدام معجون السيراميك عالي الجودة. خيار مثالي كهدية غير تقليدية تعبر عن الحب والتميز في آن واحد.", image: "images/cup/8/8.webp", category: "cup", hasSizes: false },
    { id: 109, name: "كوب باقة أزهار النرجس الربيعية", price: 9.99, shortDesc: "كوب بلون أخضر هادئ مزين بباقة مجسمة من أزهار النرجس والورود المبهجة، مُشكلة يدوياً باحترافية من معجون السيراميك.", fullDesc: "استمتع بنسيم الربيع مع كل رشفة من هذا الكوب الهادئ والأنيق من طُرفة. يتميز هذا الكوب بتصميم مجسم يضم باقة من أزهار النرجس والورود ذات الألوان المبهجة كالأصفر والوردي الفاتح، ومربوطة بعناية بفيونكة بيضاء رقيقة. جميع التفاصيل البارزة تمت صياغتها ونحتها يدوياً بكل حب ودقة باستخدام معجون السيراميك عالي الجودة لضمان متانة وجمال لا مثيل لهما. يعتبر إضافة رائعة لمجموعتك الصباحية أو هدية تفيض بالرقة لمن تحب.", image: "images/cup/9/9.webp", category: "cup", hasSizes: false },
    { id: 110, name: "كوب الإطار المزخرف والورود الحمراء", price: 9.99, shortDesc: "كوب أبيض أنيق يزينه إطار دائري مجسم بلون خوخي متموج، وتعلوه باقة من الورود الحمراء البارزة المصنوعة يدوياً من معجون السيراميك.", fullDesc: "اجعل لحظات تناول قهوتك أكثر جمالاً مع هذا الكوب الفريد من طُرفة. يتميز بتصميم فني مبتكر يدمج بين خلفية دائرية ذات حواف مزخرفة كالدانتيل بلون خوخي متموج، وتنسيقة ساحرة من الورود الحمراء الجورية البارزة مع لمسات رقيقة من الأزهار الصغيرة الزرقاء والبيضاء. جميع هذه التفاصيل المجسمة تم تشكيلها ونحتها يدوياً بدقة واحترافية عالية من معجون السيراميك، مما يمنحها مظهراً طبيعياً متألقاً. قطعة فنية راقية تناسب الاستخدام اليومي أو كهدية أنيقة تخطف الأنظار.", image: "images/cup/10/10.webp", category: "cup", hasSizes: false },
    { id: 111, name: "كوب هلال الزهور رمضان كريم", price: 9.99, shortDesc: "كوب بلون خوخي هادئ، مزين بهلال وعبارة رمضان كريم مع تفاصيل زاهية من الزهور، مُشكلة يدوياً باحترافية من معجون السيراميك.", fullDesc: "احتفل بأجواء الشهر الفضيل مع هذا الكوب الرمضاني الساحر من طُرفة. يتميز التصميم بهلال أصفر جميل مزين بباقة رقيقة من الزهور الملونة، إلى جانب لافتة كلاسيكية تحمل عبارة رمضان كريم مع تدلي زخرفة بسيطة تزيد من جمال القطعة. جميع هذه التفاصيل المجسمة تم نحتها وتشكيلها يدوياً بحب واحترافية من معجون السيراميك عالي الجودة لضمان متانتها ورونقها. إضافة رائعة لجلسات السحور والإفطار، أو كهدية رمضانية مميزة تنبض بالبهجة لمن تحب.", image: "images/cup/11/11.webp", category: "cup", hasSizes: false },
    { id: 112, name: "كوب الغصن البارز والزهور الملونة", price: 9.99, shortDesc: "كوب أسود جذاب مزين بغصن شجرة بارز وزهور حمراء وخوخية متفتحة، مُشكلة يدوياً باحترافية من معجون السيراميك.", fullDesc: "أضف لمسة من سحر الطبيعة إلى يومك مع هذا الكوب الأسود الأنيق من طُرفة. يتألق التصميم بغصن خشبي مجسم تتفتح عليه زهور بألوان دافئة وجذابة تجمع بين الأحمر الجريء والخوخي الناعم، مع براعم صغيرة وأوراق خضراء تزيد من حيويته. تم تشكيل ونحت جميع هذه التفاصيل البارزة يدوياً بكل دقة وعناية باستخدام معجون السيراميك عالي الجودة، مما يخلق تبايناً فنياً رائعاً مع الخلفية الداكنة للكوب. خيار مثالي لعشاق الفن اليدوي المستوحى من الطبيعة، وهدية استثنائية لمن يقدرون الجمال والتفاصيل.", image: "images/cup/12/12.webp", category: "cup", hasSizes: false },
    { id: 113, name: "كوب أمي جنتي المزين بالزهور", price: 9.99, shortDesc: "كوب أبيض أنيق يحمل رسالة حب دافئة للأم، مزين بلوحة صفراء وزهور مجسمة، مُشكلة يدوياً باحترافية من معجون السيراميك.", fullDesc: "عبّر عن حبك وامتنانك لست الحبايب مع هذا الكوب المعبر من طُرفة يتميز التصميم بلوحة صفراء رقيقة ذات حواف مزخرفة تحمل عبارة أمي.. جَنتي في هذه الحياة.. بخط عربي أنيق، وتُحيط بها أزهار زاهية وتفاصيل بارزة تنبض بالحياة. تم تشكيل ونحت جميع هذه العناصر المجسمة يدوياً بكل حب وعناية باستخدام معجون السيراميك عالي الجودة لضمان بقائها كذكرى جميلة تدوم طويلاً. إنها الهدية المثالية لعيد الأم أو لأي مناسبة تريد فيها أن تُدخل الفرحة على قلب والدتك بقطعة فنية فريدة ومميزة.", image: "images/cup/13/13.webp", category: "cup", hasSizes: false },
    { id: 114, name: "كوب الدبدوب والقلوب المخصصة", price: 9.99, shortDesc: "كوب أبيض لطيف مزين بمجسم دبدوب رمادي يرتدي قبعة زرقاء ويحمل قلوباً، مُشكل يدوياً باحترافية من معجون السيراميك مع إمكانية كتابة الحروف عليها.", fullDesc: "أدخل البهجة إلى قلب من تحب مع هذا الكوب الساحر من طُرفة يتميز بتصميم مجسم غاية في اللطافة لدبدوب رمادي ذي ملمس واقعي يرتدي قبعة شتوية زرقاء، ويحتضن مجموعة من القلوب الرقيقة. ما يميز هذه القطعة هو إمكانية تخصيص القلوب بحروفك وحروف من تحب لتكون تذكاراً خاصاً. جميع التفاصيل البارزة تم نحتها وتشكيلها يدوياً بعناية فائقة باستخدام معجون السيراميك عالي الجودة. هدية رومانسية وشخصية بامتياز، مثالية للأصدقاء والمحبين لتخليد أجمل اللحظات.", image: "images/cup/15/15.webp", category: "cup", hasSizes: false },
    { id: 117, name: "كوب خروف العيد عيد أضحى سعيد", price: 9.99, shortDesc: "كوب أنيق بلون وردي هادئ، مزين بزهور مجسمة تضفي لمسة من الطبيعة والجمال على مشروبك المفضل.", fullDesc: "استمتع بقهوتك أو شايك مع هذا الكوب الفريد المصمم بحرفية عالية. يتميز الكوب بلون وردي جذاب وتفاصيل بارزة لزهور وأغصان دقيقة تمنحه طابعاً فنياً راقياً. تصميمه المستوحى من الطبيعة يجعله قطعة مميزة في مجموعتك، أو هدية مثالية ورائعة لمن تحب.", image: "images/cup/18/1.webp", category: "cup", hasSizes: false },
    { id: 115, name: "كوب اللوحة الخشبية والورود المخصصة", price: 9.99, shortDesc: "كوب بتصميم كلاسيكي رقيق يحمل إطاراً خشبياً بارزاً محاطاً بالورود، مُشكل يدوياً من معجون السيراميك ومصمم لإضافة اسم أو عبارة خاصة بك.", fullDesc: "صمم كوبك الخاص أو قدم هدية لا تُنسى مع هذا الكوب الفريد من طُرفة. يتميز التصميم بلوحة مجسمة ذات ملمس خشبي عتيق، تتزين أطرافها بتنسيقة رائعة من الورود البيضاء والحمراء البارزة وفيونكة وردية ناعمة. جميع التفاصيل تم نحتها وتشكيلها يدوياً باحترافية من معجون السيراميك عالي الجودة، لتُترك المساحة الوسطى فارغة وجاهزة لتخصيصها بكتابة اسم، تاريخ مميز، أو رسالة قصيرة. خيار رائع للباحثين عن هدايا شخصية تحمل طابعاً فنياً مليئاً بالرقة والأصالة.", image: "images/cup/16/16.webp", category: "cup", hasSizes: false }
];

const prints3dEnglish = [
    {
        id: 301,
        name: "3D Print",
        price: 11.99,
        shortDesc: "Choose your favorite character",
        fullDesc: "High-quality 3D printed figures of your favorite Mario characters.",
        image: "images/3d/1/1.webp",
        category: "print3d",
        hasSizes: false,
        variants: [
          {
            "name": "Mario",
            "priceDiff": 0,
            "images": [
              "images/3d/1/mario/1.webp",
              "images/3d/1/mario/1b.webp",
              "images/3d/1/mario/1c.webp",
              "images/3d/1/mario/1d.webp"
            ],
            "shortDesc": "The original hero with his iconic red cap",
            "fullDesc": "Classic Mario figure printed in high-precision 3D. 12cm tall, with detailed cap and mustache, vivid long-lasting colors. The perfect piece for classic gaming fans, ideal for desk and shelf decor."
          },
          {
            "name": "Wario",
            "priceDiff": 5,
            "images": [
              "images/3d/1/wario/1.webp"
            ],
            "shortDesc": "The charismatic villain with his yellow cap",
            "fullDesc": "Wario figure with more intricate details and a slightly larger size, hence the higher price. A standout character for fans of the mischievous side of the Mario universe, adding a fun and unconventional touch to your decor."
          },
          {
            "name": "Yoshi",
            "priceDiff": 3,
            "images": [
              "images/3d/1/luchi/1.webp",
              "images/3d/1/luchi/1b.webp"
            ],
            "shortDesc": "Special edition with exclusive details",
            "fullDesc": "The distinctive Luchi version with intricate details and carefully chosen colors. A limited piece for figure collectors and enthusiasts looking for a unique item not available everywhere."
          }
        ],
    },
    {
        id: 302,
        name: "Personalized 3D Letter & Name Stand",
        price: 7.99,
        shortDesc: "A 3D printed decorative initial paired with a custom name in a stylish script — personalized in your chosen colors.",
        fullDesc: "A charming personalized desk and shelf piece from Turfa: a bold initial letter with a custom name shaped in an elegant flowing script across it, 3D printed from durable plastic. Made to order in the colors you choose, with a clean lasting finish — a lovely keepsake for newborns, kids' rooms, birthdays and thoughtful personalized gifts. Just tell us the letter, the name and your preferred colors.",
        image: "images/3d/2/girl/2.webp",
        category: "print3d",
        hasSizes: false,
        variants: [
          {
            "name": "Girl",
            "priceDiff": 0,
            "images": [
              "images/3d/2/girl/2.webp",
              "images/3d/2/girl/2b.webp"
            ],
            "shortDesc": "Girl design — soft, elegant color styling",
            "fullDesc": "A personalized initial-and-name stand 3D printed from durable plastic, with a soft, elegant color palette. Customized with her name in a flowing script — a lovely keepsake for a girl's room or a thoughtful gift.",
            "requiresCustomText": {
              "labelKey": "variantCustomNameForGirl",
              "placeholderKey": "variantCustomNamePlaceholderGirl",
              "hintKey": "variantCustomNameLatinHint",
              "lang": "en"
            }
          },
          {
            "name": "Boy",
            "priceDiff": 0,
            "images": [
              "images/3d/2/boy/2.webp"
            ],
            "shortDesc": "Boy design — bold, vibrant color styling",
            "fullDesc": "A personalized initial-and-name stand 3D printed from durable plastic, with a bold, vibrant color palette. Customized with his name in a flowing script — a lovely keepsake for a boy's room or a thoughtful gift.",
            "requiresCustomText": {
              "labelKey": "variantCustomNameForBoy",
              "placeholderKey": "variantCustomNamePlaceholderBoy",
              "hintKey": "variantCustomNameLatinHint",
              "lang": "en"
            }
          }
        ],
    },
    { id: 303, name: "Beste Mama Typography Stand", price: 3.99, shortDesc: "An elegant 3D printed freestanding ornament featuring the phrase (Best Mom) in a beautiful blend of crisp white and pastel blue, complete with a sweet heart.", fullDesc: "Show your appreciation with a modern and heartfelt gift from Turfa. This decorative typographic piece beautifully spells out  Best Mom, combining bold, crisp white letters with a flowing pastel blue cursive script and a matching little heart. Precision-crafted using state-of-the-art 3D printing technology and high-quality durable materials, it makes for a perfect keepsake. A wonderful addition to her desk, shelf, or nightstand that will constantly remind her of your love.", image: "images/3d/3/3.webp", category: "print3d", hasSizes: false },
    {
        id: 304,
        name: "Kids Toys",
        price: 9.99,
        shortDesc: "A 3D-printed kids toy.",
        fullDesc: "Toy 1 — a 3D-printed kids toy made with safe, durable materials and vivid colors. A perfect fun gift for children.",
        image: "images/3d/4/toy1/4.webp",
        category: "print3d",
        hasSizes: false,
        variants: [
          {
            "name": "Toy 1",
            "priceDiff": 0,
            "images": [
              "images/3d/4/toy1/4.webp",
              "images/3d/4/toy1/4b.webp",
              "images/3d/4/toy1/4c.webp"
            ],
            "shortDesc": "A 3D-printed kids toy.",
            "fullDesc": "Toy 1 — a 3D-printed kids toy made with safe, durable materials and vivid colors. A perfect fun gift for children."
          },
          {
            "name": "Toy 2",
            "priceDiff": 5,
            "images": [
              "images/3d/4/toy2/4.webp",
              "images/3d/4/toy2/4b.webp",
              "images/3d/4/toy2/4c.webp"
            ],
            "shortDesc": "A 3D-printed kids toy.",
            "fullDesc": "Toy 2 — a 3D-printed kids toy made with safe, durable materials and vivid colors. A perfect fun gift for children."
          },
          {
            "name": "Toy 3",
            "priceDiff": -7,
            "images": [
              "images/3d/4/toy3/4.webp",
              "images/3d/4/toy3/4b.webp",
              "images/3d/4/toy3/4c.webp"
            ],
            "shortDesc": "A 3D-printed kids toy.",
            "fullDesc": "Toy 3 — a 3D-printed kids toy made with safe, durable materials and vivid colors. A perfect fun gift for children."
          },
          {
            "name": "Toy 4",
            "priceDiff": -2,
            "images": [
              "images/3d/4/toy4/4.webp",
              "images/3d/4/toy4/4b.webp"
            ],
            "shortDesc": "A 3D-printed kids toy.",
            "fullDesc": "Toy 4 — a 3D-printed kids toy made with safe, durable materials and vivid colors. A perfect fun gift for children."
          },
          {
            "name": "Toy 5",
            "priceDiff": -5,
            "images": [
              "images/3d/4/toy5/4.webp",
              "images/3d/4/toy5/4b.webp"
            ],
            "shortDesc": "A 3D-printed kids toy.",
            "fullDesc": "Toy 5 — a 3D-printed kids toy made with safe, durable materials and vivid colors. A perfect fun gift for children."
          }
        ],
    }];

const prints3dArabic = [
    {
        id: 301,
        name: "طباعة ثلاثية الأبعاد",
        price: 11.99,
        shortDesc: "اختر شخصيتك المفضلة",
        fullDesc: "تماثيل عالية الجودة بتقنية الطباعة ثلاثية الأبعاد لشخصيات ماريو المحببة.",
        image: "images/3d/1/1.webp",
        category: "print3d",
        hasSizes: false,
        variants: [
          {
            "name": "ماريو",
            "priceDiff": 0,
            "images": [
              "images/3d/1/mario/1.webp",
              "images/3d/1/mario/1b.webp",
              "images/3d/1/mario/1c.webp",
              "images/3d/1/mario/1d.webp"
            ],
            "shortDesc": "البطل الأصلي بقبعته الحمراء الشهيرة",
            "fullDesc": "تمثال ماريو الكلاسيكي مطبوع بتقنية ثلاثية الأبعاد عالية الدقة. ارتفاع 12 سم، تفاصيل دقيقة لقبعته وشاربه، ألوان زاهية تدوم طويلاً. القطعة المثالية لعشاق الألعاب الكلاسيكية وتزيين المكتب أو الرفوف."
          },
          {
            "name": "واريو",
            "priceDiff": 0,
            "images": [
              "images/3d/1/wario/1.webp"
            ],
            "shortDesc": "الشرير الكاريزماتي بقبعته الصفراء",
            "fullDesc": "تمثال واريو بتفاصيل أكثر تعقيداً وحجم أكبر قليلاً، لذلك السعر أعلى. شخصية مميزة لعشّاق الجانب الشقيّ من عالم ماريو، تضيف طابعاً مرحاً وغير تقليدي على ديكورك."
          },
          {
            "name": "لوشي",
            "priceDiff": 0,
            "images": [
              "images/3d/1/luchi/1.webp",
              "images/3d/1/luchi/1b.webp"
            ],
            "shortDesc": "إصدار خاص بتفاصيل حصرية",
            "fullDesc": "نسخة لوشي المميزة بتفاصيل دقيقة وألوان مدروسة. قطعة محدودة لجامعي التماثيل والمحبين الباحثين عن قطعة فريدة لا تتوفر في كل مكان."
          }
        ],
    },
    {
        id: 302,
        name: "حرف ثلاثي الأبعاد مع اسم مخصّص",
        price: 7.99,
        shortDesc: "حرف ديكوري مطبوع ثلاثي الأبعاد مع اسم مخصّص بخط أنيق متشابك — بالألوان التي تختارها.",
        fullDesc: "قطعة شخصية ساحرة لمكتبك أو رفّك من طُرفة: حرف بارز مع اسم مخصّص مشكّل بخط انسيابي أنيق فوقه، مطبوع ثلاثي الأبعاد من البلاستيك المتين. يُصنع حسب الطلب بالألوان التي تختارها، بلمسة نهائية نظيفة وثابتة — تذكار جميل للمواليد وغرف الأطفال وأعياد الميلاد والهدايا الشخصية المدروسة. فقط أخبرنا بالحرف والاسم والألوان المفضّلة لديك.",
        image: "images/3d/2/girl/2.webp",
        category: "print3d",
        hasSizes: false,
        variants: [
          {
            "name": "بنت",
            "priceDiff": 0,
            "images": [
              "images/3d/2/girl/2.webp",
              "images/3d/2/girl/2b.webp"
            ],
            "shortDesc": "تصميم بنت — تنسيق ألوان ناعم وأنيق",
            "fullDesc": "حرف واسم مخصّص مطبوع ثلاثي الأبعاد من البلاستيك المتين، بتنسيق ألوان ناعم وأنيق. مخصّص باسمها بخط انسيابي — تذكار جميل لغرفة البنت أو هدية مدروسة.",
            "requiresCustomText": {
              "labelKey": "variantCustomNameForGirl",
              "placeholderKey": "variantCustomNamePlaceholderGirl",
              "hintKey": "variantCustomNameLatinHint",
              "lang": "en"
            }
          },
          {
            "name": "ولد",
            "priceDiff": 0,
            "images": [
              "images/3d/2/boy/2.webp"
            ],
            "shortDesc": "تصميم ولد — تنسيق ألوان جريء وحيوي",
            "fullDesc": "حرف واسم مخصّص مطبوع ثلاثي الأبعاد من البلاستيك المتين، بتنسيق ألوان جريء وحيوي. مخصّص باسمه بخط انسيابي — تذكار جميل لغرفة الولد أو هدية مدروسة.",
            "requiresCustomText": {
              "labelKey": "variantCustomNameForBoy",
              "placeholderKey": "variantCustomNamePlaceholderBoy",
              "hintKey": "variantCustomNameLatinHint",
              "lang": "en"
            }
          }
        ],
    },
    { id: 303, name: "مجسم أفضل أم", price: 3.99, shortDesc: "مجسم ديكور أنيق مطبوع بتقنية ثلاثية الأبعاد بعبارة Beste Mama (أفضل أم)، يجمع بين اللونين الأبيض والأزرق الفاتح مع قلب رقيق.", fullDesc: "عبّر عن تقديرك لوالدتك بهدية مميزة وعصرية من طُرفة. يعرض هذا المجسم القائم عبارة Beste Mama (أفضل أم) بتصميم طبوغرافي جذاب يدمج بين الحروف البيضاء البارزة والخط الأزرق الانسيابي، وتكتمل اللوحة بلمسة قلب صغير ولطيف. صُنع هذا العمل الفني بدقة فائقة باستخدام أحدث تقنيات الطباعة ثلاثية الأبعاد ومواد متينة وعالية الجودة، ليكون تذكاراً جميلاً يزين مكتبها أو الرف المفضل لديها، ويذكرها دائماً بمكانتها الخاصة.", image: "images/3d/3/3.webp", category: "print3d", hasSizes: false },
    {
        id: 304,
        name: "ألعاب أطفال",
        price: 9.99,
        shortDesc: "لعبة أطفال مطبوعة ثلاثية الأبعاد.",
        fullDesc: "لعبة 1 — لعبة أطفال مطبوعة ثلاثية الأبعاد بخامات آمنة ومتينة وألوان زاهية. مثالية كهدية ممتعة للأطفال.",
        image: "images/3d/4/toy1/4.webp",
        category: "print3d",
        hasSizes: false,
        variants: [
          {
            "name": "لعبة 1",
            "priceDiff": 0,
            "images": [
              "images/3d/4/toy1/4.webp",
              "images/3d/4/toy1/4b.webp",
              "images/3d/4/toy1/4c.webp"
            ],
            "shortDesc": "لعبة أطفال مطبوعة ثلاثية الأبعاد.",
            "fullDesc": "لعبة 1 — لعبة أطفال مطبوعة ثلاثية الأبعاد بخامات آمنة ومتينة وألوان زاهية. مثالية كهدية ممتعة للأطفال."
          },
          {
            "name": "لعبة 2",
            "priceDiff": 5,
            "images": [
              "images/3d/4/toy2/4.webp",
              "images/3d/4/toy2/4b.webp",
              "images/3d/4/toy2/4c.webp"
            ],
            "shortDesc": "لعبة أطفال مطبوعة ثلاثية الأبعاد.",
            "fullDesc": "لعبة 2 — لعبة أطفال مطبوعة ثلاثية الأبعاد بخامات آمنة ومتينة وألوان زاهية. مثالية كهدية ممتعة للأطفال."
          },
          {
            "name": "لعبة 3",
            "priceDiff": -7,
            "images": [
              "images/3d/4/toy3/4.webp",
              "images/3d/4/toy3/4b.webp",
              "images/3d/4/toy3/4c.webp"
            ],
            "shortDesc": "لعبة أطفال مطبوعة ثلاثية الأبعاد.",
            "fullDesc": "لعبة 3 — لعبة أطفال مطبوعة ثلاثية الأبعاد بخامات آمنة ومتينة وألوان زاهية. مثالية كهدية ممتعة للأطفال."
          },
          {
            "name": "لعبة 4",
            "priceDiff": -2,
            "images": [
              "images/3d/4/toy4/4.webp",
              "images/3d/4/toy4/4b.webp"
            ],
            "shortDesc": "لعبة أطفال مطبوعة ثلاثية الأبعاد.",
            "fullDesc": "لعبة 4 — لعبة أطفال مطبوعة ثلاثية الأبعاد بخامات آمنة ومتينة وألوان زاهية. مثالية كهدية ممتعة للأطفال."
          },
          {
            "name": "لعبة 5",
            "priceDiff": -5,
            "images": [
              "images/3d/4/toy5/4.webp",
              "images/3d/4/toy5/4b.webp"
            ],
            "shortDesc": "لعبة أطفال مطبوعة ثلاثية الأبعاد.",
            "fullDesc": "لعبة 5 — لعبة أطفال مطبوعة ثلاثية الأبعاد بخامات آمنة ومتينة وألوان زاهية. مثالية كهدية ممتعة للأطفال."
          }
        ],
    }];

const framesEnglish = [
    { id: 201, name: "Personalized Wedding Anniversary Frame", price: 9.99, shortDesc: "A custom framed keepsake with your intertwined initials shaped from real preserved roses, your wedding date and a heartfelt message — the perfect anniversary gift for the one you love.", fullDesc: "Celebrate your love story with this personalized wedding anniversary frame, handcrafted by Turfa. The couple's initials are intertwined and shaped entirely by hand from real preserved natural roses in romantic blue and rose tones, set against an elegant ornamental border with a loving message and your special wedding date. A deeply meaningful, ready-to-display keepsake that turns your most precious moment into timeless wall art — the ideal gift for anniversaries, engagements and weddings. Fully customized and handmade in Jordan, truly one-of-a-kind.", image: "images/Frame/1/1.webp", category: "frame", hasSizes: false, requiresWeddingForm: true },
    {
        id: 202,
        name: "Sports Clubs Frames",
        price: 7.99,
        shortDesc: "Premium leather bookmark with your favorite football club crest.",
        fullDesc: "A handcrafted leather bookmark featuring the crest of your favorite football club. Choose from top European clubs, or request a custom design with any club of your choice.",
        image: "images/Frame/2/2.webp",
        category: "frame",
        hasSizes: false,
        variants: [
          {
            "name": "Barcelona",
            "priceDiff": 0,
            "images": [
              "images/Frame/2/barcelona/1.webp"
            ],
            "shortDesc": "Premium leather bookmark with FC Barcelona crest.",
            "fullDesc": "Handcrafted premium leather bookmark with the iconic FC Barcelona crest. A perfect gift for every Blaugrana fan."
          },
          {
            "name": "Real Madrid",
            "priceDiff": 0,
            "images": [
              "images/Frame/2/real-madrid/1.webp"
            ],
            "shortDesc": "Premium leather bookmark with Real Madrid crest.",
            "fullDesc": "Handcrafted premium leather bookmark with the legendary Real Madrid crest. A treasure for every Los Blancos fan."
          },
          {
            "name": "Manchester City",
            "priceDiff": 0,
            "images": [
              "images/Frame/2/man-city/1.webp"
            ],
            "shortDesc": "Premium leather bookmark with Manchester City crest.",
            "fullDesc": "Handcrafted premium leather bookmark with the Manchester City crest. A distinctive choice for Citizens supporters."
          },
          {
            "name": "Custom",
            "priceDiff": 0,
            "images": [
              "images/Frame/2/custom/1.webp"
            ],
            "shortDesc": "Leather bookmark with any club of your choice.",
            "fullDesc": "Premium leather bookmark — choose any club name and we'll handcraft it for you with the highest detail. Note: after placing the order, please send us the reference logo on WhatsApp.",
            "requiresCustomText": true
          }
        ],
    },];

const framesArabic = [
    { id: 201, name: "برواز عيد الزواج المخصّص", price: 9.99, shortDesc: "تذكار مؤطّر مخصّص بحرفَي اسميكما متشابكين منقوشين بالورد الطبيعي المجفّف، مع تاريخ زواجكما وعبارة من القلب — الهدية المثالية لذكرى الزواج لمن تحب.", fullDesc: "احتفِ بقصة حبكما مع برواز عيد الزواج المخصّص، المصنوع يدوياً من طُرفة. حرفا اسم العروسين متشابكان ومشكّلان بالكامل يدوياً من الورد الطبيعي المجفّف بدرجتي الأزرق والوردي الرومانسيتين، على خلفية إطار زخرفي أنيق مع عبارة محبّة وتاريخ زواجكما المميّز. تذكار عميق المعنى وجاهز للعرض، يحوّل أغلى لحظاتكما إلى لوحة جدارية خالدة — الهدية المثالية لذكرى الزواج والخطوبة والأعراس. مخصّص بالكامل ومصنوع يدوياً في الأردن، فريد لا يتكرّر.", image: "images/Frame/1/1.webp", category: "frame", hasSizes: false, requiresWeddingForm: true },
    {
        id: 202,
        name: "لوحات الأندية الرياضية",
        price: 7.99,
        shortDesc: "فاصل كتب جلدي فاخر بشعار ناديك المفضل، صناعة يدوية.",
        fullDesc: "فاصل كتب من الجلد الفاخر، مصنوع يدوياً بدقة عالية، يحمل شعار ناديك الرياضي المفضل. اختار من بين أبرز الأندية العالمية، أو اطلب شعاراً مخصصاً بنادي من اختيارك.",
        image: "images/Frame/2/2.webp",
        category: "frame",
        hasSizes: false,
        variants: [
          {
            "name": "برشلونة",
            "priceDiff": 0,
            "images": [
              "images/Frame/2/barcelona/1.webp"
            ],
            "shortDesc": "فاصل كتب جلدي فاخر بشعار نادي برشلونة.",
            "fullDesc": "فاصل كتب من الجلد الفاخر، مصنوع يدوياً، يحمل شعار نادي برشلونة العريق. هدية مثالية لكل عاشق للبلاوغرانا."
          },
          {
            "name": "ريال مدريد",
            "priceDiff": 0,
            "images": [
              "images/Frame/2/real-madrid/1.webp"
            ],
            "shortDesc": "فاصل كتب جلدي فاخر بشعار نادي ريال مدريد.",
            "fullDesc": "فاصل كتب من الجلد الفاخر، مصنوع يدوياً، يحمل شعار نادي ريال مدريد الملكي. تحفة لكل مشجع للنادي الأبيض."
          },
          {
            "name": "مانشستر سيتي",
            "priceDiff": 0,
            "images": [
              "images/Frame/2/man-city/1.webp"
            ],
            "shortDesc": "فاصل كتب جلدي فاخر بشعار نادي مانشستر سيتي.",
            "fullDesc": "فاصل كتب من الجلد الفاخر، مصنوع يدوياً، يحمل شعار نادي مانشستر سيتي. اختيار مميز لمحبي السماويين."
          },
          {
            "name": "مخصص",
            "priceDiff": 0,
            "images": [
              "images/Frame/2/custom/1.webp"
            ],
            "shortDesc": "فاصل كتب جلدي بشعار نادي من اختيارك.",
            "fullDesc": "فاصل كتب من الجلد الفاخر، اختار اسم النادي اللي بدك إياه، ونحن نصنعه لك يدوياً بأعلى دقة. ملاحظة: بعد إتمام الطلب، أرسل لنا صورة الشعار المرجعية على واتساب.",
            "requiresCustomText": true
          }
        ],
    }];

const giftsEnglish = [
    { id: 401, name: "Handcrafted Foam Clay Mushroom Cottage", price: 4.99, shortDesc: "A show-stopping mushroom cottage sculpted entirely by hand from foam clay — a lavender domed roof, a rustic door, and a real tree-bark base. The perfect statement gift.", fullDesc: "Turn heads with this one-of-a-kind decorative mushroom cottage, meticulously hand-sculpted from premium foam clay by Turfa's artisans. Every detail is shaped by hand: a striking lavender-and-white domed roof crowned with a tiny door and round window, climbing vines, and clusters of dried flowers, opening onto a weathered red door framed with fine stonework and a white daisy — all set on a genuine wood-bark base. Lightweight yet beautifully durable, it makes an unforgettable centerpiece for any shelf or desk, and an exceptional gift that no one else will have. A true conversation piece, handmade in Jordan.", image: "images/gifts/1/1.webp", category: "gift", hasSizes: false },
    {
        id: 402,
        name: "Personalized Wooden Keepsake Medallion",
        price: 4.99,
        shortDesc: "A hand-decorated wooden slice medallion, personalized with any name, date or occasion and adorned with foam-clay roses — the perfect keepsake gift for graduations, achievements and milestones.",
        fullDesc: "Make any moment unforgettable with this personalized wooden keepsake medallion, handcrafted by Turfa on a natural tree-bark slice and finished with a braided rope hanger. Every detail — the name, the date, the occasion symbol and the delicately sculpted foam-clay roses — is shaped entirely by hand and customized just for you. A meaningful, ready-to-hang gift for graduations, engineers, doctors, birthdays and life's proudest milestones, made to be treasured for years. Handmade in Jordan, completely one-of-a-kind.",
        image: "images/gifts/2/girl/2.webp",
        category: "gift",
        hasSizes: false,
        variants: [
          {
            "name": "Girl",
            "priceDiff": 0,
            "images": [
              "images/gifts/2/girl/2.webp",
              "images/gifts/2/girl/2b.webp",
              "images/gifts/2/girl/2c.webp"
            ],
            "shortDesc": "A graceful design with a feminine touch — personalized with her name and special date.",
            "fullDesc": "An elegant personalized medallion with a soft, feminine design, hand-decorated with foam-clay roses on a natural wood slice. Customized with her name and the date that matters most — a heartfelt keepsake for graduations, birthdays and proud milestones.",
            "requiresCustomText": {
              "labelKey": "variantGiftCustomLabel",
              "placeholderKey": "variantGiftCustomPlaceholder",
              "hintKey": "variantGiftCustomHint",
              "lang": "any"
            }
          },
          {
            "name": "Boy",
            "priceDiff": 0,
            "images": [
              "images/gifts/2/boy/2.webp",
              "images/gifts/2/boy/2b.webp",
              "images/gifts/2/boy/2c.webp"
            ],
            "shortDesc": "A bold, character-rich design — personalized with his name, title and special date.",
            "fullDesc": "A striking personalized medallion with a strong, distinctive design, hand-decorated with foam-clay details on a natural wood slice. Customized with his name, profession or title and the date that matters most — a standout keepsake for engineers, doctors, graduates and life's proudest moments.",
            "requiresCustomText": {
              "labelKey": "variantGiftCustomLabel",
              "placeholderKey": "variantGiftCustomPlaceholder",
              "hintKey": "variantGiftCustomHint",
              "lang": "any"
            }
          },
          {
            "name": "Family",
            "priceDiff": 7,
            "images": [
              "images/gifts/2/family/2.webp"
            ],
            "shortDesc": "A warm family design that brings loved ones together in one keepsake piece.",
            "fullDesc": "A heartfelt personalized medallion celebrating the whole family in a single handcrafted piece, hand-decorated with foam-clay roses on a natural wood slice. Customized with your family name and a date to remember — a warm keepsake that immortalizes the people who matter most.",
            "requiresCustomText": {
              "labelKey": "variantGiftCustomLabel",
              "placeholderKey": "variantGiftCustomPlaceholder",
              "hintKey": "variantGiftCustomHint",
              "lang": "any"
            }
          }
        ],
    },
    { id: 403, name: "Handcrafted Foam Clay Mushroom Cottage — Deluxe", price: 6.99, shortDesc: "A premium decorative mushroom cottage hand-sculpted from foam clay, with a lavender domed roof, a rustic wooden door, and a natural tree-bark base — a true statement centerpiece.", fullDesc: "An exquisite collector-grade decorative mushroom cottage, meticulously hand-sculpted from premium foam clay by Turfa's artisans. Every element is shaped by hand: the striking lavender-and-white domed roof crowned with a tiny door and round window, climbing vines, dried flowers and berries, all opening onto a weathered red door framed with fine stonework and a white daisy, set on a genuine wood-bark base. Lightweight yet beautifully durable, it brings a touch of refined craftsmanship to any shelf, desk or display, and makes an exceptional gift no one else will have. A true conversation piece, handmade in Jordan.", image: "images/gifts/3/3.webp", category: "gift", hasSizes: false },
    { id: 404, name: "Decorated Glass Storage Jar with Wooden Lid", price: 4.99, shortDesc: "An elegant glass jar with an airtight wooden lid, hand-wrapped in burlap and lace and adorned with foam-clay roses and dried flowers — beautiful and practical for any kitchen or shelf.", fullDesc: "Blend beauty with everyday function with this hand-decorated glass storage jar from Turfa. The clear glass body is finished with a natural wooden lid and lovingly wrapped in rustic burlap and delicate lace, then accented with a hand-sculpted foam-clay floral bouquet and dried botanical touches. Perfect for storing coffee, tea, spices or sweets — or simply as a charming standalone décor piece. A thoughtful housewarming, wedding or hostess gift that feels personal and refined. Handmade in Jordan, no two are exactly alike.", image: "images/gifts/4/4.webp", category: "gift", hasSizes: false }
];

const giftsArabic = [
    { id: 401, name: "بيت الفطر المصنوع يدوياً من معجون الفوم", price: 4.99, shortDesc: "بيت فطر يخطف الأنظار، منحوت بالكامل يدوياً من معجون الفوم — سقف مقبب بنفسجي، باب ريفي، وقاعدة من لحاء الشجر الطبيعي. هدية مميزة لا تُنسى.", fullDesc: "اجذب كل الأنظار مع بيت الفطر الديكوري الفريد الذي لا يتكرر، المنحوت يدوياً بإتقان من معجون الفوم الفاخر على أيدي حرفيي طُرفة. كل تفصيل مشكّل باليد: سقف مقبب لافت بلونين بنفسجي وأبيض يعلوه باب صغير ونافذة دائرية، أغصان متسلقة، وعناقيد من الزهور المجففة، يفتح على باب أحمر عتيق محاط بتفاصيل حجرية دقيقة وزهرة أقحوان بيضاء — وكل ذلك على قاعدة من لحاء الشجر الطبيعي. خفيف الوزن ومتين في آنٍ واحد، ليكون قطعة محورية لا تُنسى على أي رف أو مكتب، وهدية استثنائية لن يمتلك أحد غيرها مثلها. تحفة تُلفت الأنظار وتفتح باب الحديث، مصنوعة يدوياً في الأردن.", image: "images/gifts/1/1.webp", category: "gift", hasSizes: false },
    {
        id: 402,
        name: "ميدالية خشبية تذكارية مخصّصة بالاسم",
        price: 4.99,
        shortDesc: "ميدالية معلّقة من شريحة خشب طبيعية، مزخرفة يدوياً ومخصّصة بأي اسم أو تاريخ أو مناسبة، ومزيّنة بورود من معجون الفوم — الهدية التذكارية المثالية للتخرّج والإنجازات والمناسبات.",
        fullDesc: "اجعل أي لحظة لا تُنسى مع الميدالية الخشبية التذكارية المخصّصة من طُرفة، المصنوعة يدوياً على شريحة من لحاء الشجر الطبيعي ومنتهية بحبل معلّق مجدول. كل تفصيل — الاسم، التاريخ، رمز المناسبة، والورود المنحوتة بدقة من معجون الفوم — مشكّل بالكامل يدوياً ومخصّص لك أنت وحدك. هدية ذات معنى وجاهزة للتعليق، مثالية للتخرّج والمهندسين والأطباء وأعياد الميلاد وأفخر لحظات الحياة، صُنعت لتبقى ذكرى غالية لسنوات. مصنوعة يدوياً في الأردن، فريدة لا تتكرّر.",
        image: "images/gifts/2/girl/2.webp",
        category: "gift",
        hasSizes: false,
        variants: [
          {
            "name": "بنت",
            "priceDiff": 0,
            "images": [
              "images/gifts/2/girl/2.webp",
              "images/gifts/2/girl/2b.webp",
              "images/gifts/2/girl/2c.webp"
            ],
            "shortDesc": "تصميم أنيق بلمسة أنثوية — مخصّص باسمها وتاريخها المميّز.",
            "fullDesc": "ميدالية مخصّصة أنيقة بتصميم ناعم وأنثوي، مزخرفة يدوياً بورود من معجون الفوم على شريحة خشب طبيعية. مخصّصة باسمها والتاريخ الأغلى — تذكار من القلب للتخرّج وأعياد الميلاد ولحظات الفخر.",
            "requiresCustomText": {
              "labelKey": "variantGiftCustomLabel",
              "placeholderKey": "variantGiftCustomPlaceholder",
              "hintKey": "variantGiftCustomHint",
              "lang": "any"
            }
          },
          {
            "name": "ولد",
            "priceDiff": 0,
            "images": [
              "images/gifts/2/boy/2.webp",
              "images/gifts/2/boy/2b.webp",
              "images/gifts/2/boy/2c.webp"
            ],
            "shortDesc": "تصميم جريء بطابع مميّز — مخصّص باسمه ولقبه وتاريخه المميّز.",
            "fullDesc": "ميدالية مخصّصة لافتة بتصميم قوي ومميّز، مزخرفة يدوياً بتفاصيل من معجون الفوم على شريحة خشب طبيعية. مخصّصة باسمه ومهنته أو لقبه والتاريخ الأغلى — تذكار بارز للمهندسين والأطباء والخرّيجين وأفخر لحظات الحياة.",
            "requiresCustomText": {
              "labelKey": "variantGiftCustomLabel",
              "placeholderKey": "variantGiftCustomPlaceholder",
              "hintKey": "variantGiftCustomHint",
              "lang": "any"
            }
          },
          {
            "name": "عائلة",
            "priceDiff": 7,
            "images": [
              "images/gifts/2/family/2.webp"
            ],
            "shortDesc": "تصميم عائلي دافئ يجمع الأحبّة في قطعة تذكارية واحدة.",
            "fullDesc": "ميدالية مخصّصة من القلب تحتفي بالعائلة كلها في قطعة واحدة مصنوعة يدوياً، مزخرفة بورود من معجون الفوم على شريحة خشب طبيعية. مخصّصة باسم عائلتك وتاريخ لا يُنسى — تذكار دافئ يخلّد أغلى الناس.",
            "requiresCustomText": {
              "labelKey": "variantGiftCustomLabel",
              "placeholderKey": "variantGiftCustomPlaceholder",
              "hintKey": "variantGiftCustomHint",
              "lang": "any"
            }
          }
        ],
    },
    { id: 403, name: "بيت الفطر المصنوع يدوياً من معجون الفوم — فاخر", price: 6.99, shortDesc: "بيت فطر ديكوري فاخر منحوت يدوياً من معجون الفوم، بسقف مقبب بنفسجي، باب خشبي ريفي، وقاعدة من لحاء الشجر الطبيعي — قطعة محورية تخطف الأنظار.", fullDesc: "تحفة ديكورية بمستوى المقتنيات، منحوتة يدوياً بإتقان من معجون الفوم الفاخر على أيدي حرفيي طُرفة. كل عنصر مشكّل باليد: السقف المقبب اللافت بلونين بنفسجي وأبيض يعلوه باب صغير ونافذة دائرية، أغصان متسلقة، وزهور وتوت مجفف، يفتح على باب أحمر عتيق محاط بتفاصيل حجرية دقيقة وزهرة أقحوان بيضاء، على قاعدة من لحاء الشجر الطبيعي. خفيف الوزن ومتين في آنٍ واحد، يضفي لمسة من الحِرفية الراقية على أي رف أو مكتب أو ركن عرض، وهدية استثنائية لن يمتلك أحد غيرها مثلها. تحفة تُلفت الأنظار وتفتح باب الحديث، مصنوعة يدوياً في الأردن.", image: "images/gifts/3/3.webp", category: "gift", hasSizes: false },
    { id: 404, name: "برطمان زجاجي مزخرف بغطاء خشبي", price: 4.99, shortDesc: "برطمان زجاجي أنيق بغطاء خشبي محكم، ملفوف يدوياً بالخيش والدانتيل ومزيّن بورود من معجون الفوم وزهور مجففة — جميل وعملي لأي مطبخ أو رف.", fullDesc: "امزج الجمال بالوظيفة اليومية مع البرطمان الزجاجي المزخرف يدوياً من طُرفة. جسم زجاجي شفاف بغطاء خشبي طبيعي، ملفوف بحب بالخيش الريفي والدانتيل الرقيق، ومزيّن بباقة ورود منحوتة يدوياً من معجون الفوم ولمسات نباتية مجففة. مثالي لحفظ القهوة أو الشاي أو البهارات أو الحلويات — أو كقطعة ديكور ساحرة بحد ذاتها. هدية مدروسة ومميزة لمناسبات تأثيث البيت الجديد والأعراس والضيافة، تحمل طابعاً شخصياً وراقياً. مصنوع يدوياً في الأردن، ولا قطعة تشبه الأخرى تماماً.", image: "images/gifts/4/4.webp", category: "gift", hasSizes: false }
];

let allProductsEnglish = [...paintingsEnglish, ...cupsEnglish, ...prints3dEnglish, ...framesEnglish, ...giftsEnglish];
let allProductsArabic = [...paintingsArabic, ...cupsArabic, ...prints3dArabic, ...framesArabic, ...giftsArabic];