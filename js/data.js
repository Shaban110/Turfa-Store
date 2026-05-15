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
const GLOBAL_DISCOUNT_PERCENT = 0.500; // 50% خصم (50/100)

// 🟢 دالة موحّدة لحساب السعر بعد الخصم — استخدمها بدل التكرار اليدوي
// لو احتجت تغيّر طريقة الخصم (مثلاً خصومات مختلفة لكل منتج)، عدّل هون فقط.
function getDiscountedPrice(basePrice) {
    const price = Number(basePrice) || 0;
    return price * (1 - GLOBAL_DISCOUNT_PERCENT);
}

// 🟢 معلومات التواصل الموحّدة — لو تغيّر الرقم، عدّل هون فقط
const STORE_PHONE = '+962788489914';                    // الرقم الكامل بصيغة دولية
const STORE_PHONE_DISPLAY = '+962 7 8848 9914';         // الرقم بصيغة العرض (للفوتر)
const STORE_PHONE_DIGITS = STORE_PHONE.replace(/\D/g, ''); // أرقام فقط، لاستخدامها مع wa.me
const WHATSAPP_BASE = `https://wa.me/${STORE_PHONE_DIGITS}`;
const TEL_LINK = `tel:${STORE_PHONE}`;

// 🟢 إيميل المتجر وموقعه — عدّل هون فقط
const STORE_EMAIL = 'info@turfa.art';
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
    offersTitle: "العروض",
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
    offersTitle: "Special Offers",
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
// =================================================================
const paintingsEnglish = [
    { id: 1, name: "Ya Sham", price: 39.99,shortDesc: "Damascus in my heart, a piece of art on my wall",fullDesc: "A piece of art crafted with 3 layers of passion to be a lasting reminder of the most beautiful bonds. A serene décor piece with a pink touch, fit for your home and designed to delight your heart", image: "images/plates/1/1.webp", category: "painting", hasSizes: true,
      colors: [
        { name: "Pink",  hex: "#e8a0b0", images: ["images/plates/1/1.webp", "images/plates/1/1b.webp", "images/plates/1/1c.webp"] },
        { name: "Beige", hex: "#d4b896", images: ["images/plates/1/1_beige.webp", "images/plates/1/1b_beige.webp", "images/plates/1/1c_beige.webp"] },
      ]
    },
    { id: 2, name: "Alhamdulillah", price: 39.99, shortDesc: "A beautiful plaque, to remind you of gratitude at all times.",fullDesc: "A spiritual art piece crafted with 3D layered technology, designed to illuminate your walls with the remembrance of God and tranquility. A design that merges the grandeur of calligraphy with the depth of ornamentation, serving as a daily reminder of the beauty of gratitude",image: "images/plates/2/2.webp", category: "painting", hasSizes: true },
    { id: 3, name: "Ayatul Kursi", price: 39.99, shortDesc: "The greatest verse, in an artistic design that immortalizes its beauty.",fullDesc: "A décor piece carrying the greatest verse in the Qur'an, crafted with striking layered (3D) technology to bring tranquility and reverence to your space. A unique design blending the grandeur of calligraphy with the warmth of wood, to keep your home under God's protection.", image: "images/plates/3/3.webp", category: "painting", hasSizes: true },
    { id: 4, name: "Custom Design Painting", price: 0, shortDesc: "Design your own painting — verse, hadith, prayer, poem, name or anything you'd like, in your chosen size.", fullDesc: "A painting tailored entirely to your taste. Choose the type of text — a Qur'anic verse, a noble hadith, a prayer, a poem, a name or any custom design — write what you want, pick the size, and we'll craft it as a unique handmade piece for you. Final price is sent to you on WhatsApp after we review your request.", image: "images/plates/4/custom-design.webp", category: "painting", hasSizes: false, requiresCustomForm: true, isCustomDesign: true }
];

const paintingsArabic = [
    { id: 1, name: "لوحة يا شام", price: 39.99, shortDesc: "دمشق في قلبي، قطعة فنية على جداري.",fullDesc: "لوحة فنية صُنعت بـ 3 طبقات من الشغف لتبقى تذكاراً دائماً لأجمل الروابط. قطعة ديكور هادئة بلمسة وردية، تليق ببيتك وتُسعد قلبك.", image: "images/plates/1/1.webp", category: "painting", hasSizes: true,
      colors: [
        { name: "وردي", hex: "#e8a0b0", images: ["images/plates/1/1.webp", "images/plates/1/1b.webp", "images/plates/1/1c.webp"] },
        { name: "بني",  hex: "#704214", images: ["images/plates/1/brown/1.webp", "images/plates/1/brown/2.webp"] },
        //{ name: "أزرق", hex: "#7ba7c7", images: ["images/plates/1/1_blue.webp",  "images/plates/1/1b_blue.webp",  "images/plates/1/1c_blue.webp"] },
      ]
    },
    { id: 2, name: "لوحة الحمد لله", price: 39.99,shortDesc: "لوحة، تذكرك بجمال الامتنان في كل حين.",fullDesc: "قطعة فنية روحانية صُنعت بتقنية الطبقات الثلاثية الأبعاد، لتضيء جدران بيتك بذكر الله والسكينة. تصميم يجمع عظمة الخط مع عمق الزخرفة، لتكون تذكيراً يومياً بجمال الامتنان.", image: "images/plates/2/2.webp", category: "painting", hasSizes: true ,
          colors: [
    { name: "بيج",   hex: "#d4b896", images: ["images/plates/2/2.webp", "images/plates/2/2b.webp"] },
    { name: "أسود",  hex: "#2c2c2c", images: ["images/plates/2/2_black.webp", "images/plates/2/2b_black.webp"] },
    { name: "ذهبي",  hex: "#c9a84c", images: ["images/plates/2/2_gold.webp"] },
  ]
        
     },
    { id: 3, name: " لوحة آية الكرسي ", price: 39.99, shortDesc: "أعظم آية، بتصميم فني يخلد جمالها.",fullDesc: "قطعة ديكور تحمل أعظم آية في القرآن، صُنعت بتقنية الطبقات البارزة، لتضفي على مساحتك سكينة ومهابة. تصميم فريد يمزج بين عظمة الخط ودفء الخشب، لتكون بيتك في حفظ الله.", image: "images/plates/3/3.webp", category: "painting", hasSizes: true },
    { id: 4, name: "لوحة مخصصة حسب طلبك", price: 0, shortDesc: "صمم لوحتك الخاصة — آية، حديث، دعاء، قصيدة، اسم أو أي تصميم تختاره، بالمقاس اللي يناسبك.", fullDesc: "لوحة مفصلة على ذوقك بالكامل. اختر نوع النص اللي بدك إياه — آية قرآنية، حديث شريف، دعاء، قصيدة، اسم أو تصميم خاص — اكتب لنا ما تريد، حدد المقاس، ونحن نصنعها لك قطعة يدوية فريدة. السعر النهائي يصلك على واتساب بعد مراجعة طلبك.", image: "images/plates/4/custom-design.webp", category: "painting", hasSizes: false, requiresCustomForm: true, isCustomDesign: true },
];

// ============ 🟢 التعديل هنا (مسار الأكواب) 🟢 ============
const cupsEnglish = [
    { id: 101, name: "Ceramic Coffee Mug", price: 15.99,shortDesc: "Ceramic Coffee Mug",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cup/1/1.webp", category: "cup", hasSizes: false },
    { id: 102, name: "Travel Tumbler", price: 24.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cup/2/2.webp", category: "cup", hasSizes: false },
    { id: 103, name: "Glass Tea Cup Set", price: 34.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cup/3/3.webp", category: "cup", hasSizes: false },
    { id: 104, name: "Artistic Espresso Cup", price: 12.99,shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cup/4/4.webp", category: "cup", hasSizes: false },
    { id: 105, name: "Color Changing Mug", price: 19.99,shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cup/5/5.webp", category: "cup", hasSizes: false },
    { id: 106, name: "Bamboo Eco Cup", price: 18.99,shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cup/6/6.webp", category: "cup", hasSizes: false },
    { id: 107, name: "Cup 7", price: 15.00, shortDesc: "Handmade ceramic cup with unique design.", fullDesc: "A beautifully crafted handmade ceramic cup with a unique artistic design. Perfect for hot and cold drinks.", image: "images/cup/7/7.webp", category: "cup", hasSizes: false },
    { id: 108, name: "Cup 8", price: 15.00, shortDesc: "Handmade ceramic cup with unique design.", fullDesc: "A beautifully crafted handmade ceramic cup with a unique artistic design. Perfect for hot and cold drinks.", image: "images/cup/8/8.webp", category: "cup", hasSizes: false },
    { id: 109, name: "Cup 9", price: 15.00, shortDesc: "Handmade ceramic cup with unique design.", fullDesc: "A beautifully crafted handmade ceramic cup with a unique artistic design. Perfect for hot and cold drinks.", image: "images/cup/9/9.webp", category: "cup", hasSizes: false },
    { id: 110, name: "Cup 10", price: 15.00, shortDesc: "Handmade ceramic cup with unique design.", fullDesc: "A beautifully crafted handmade ceramic cup with a unique artistic design. Perfect for hot and cold drinks.", image: "images/cup/10/10.webp", category: "cup", hasSizes: false },
    { id: 111, name: "Cup 11", price: 15.00, shortDesc: "Handmade ceramic cup with unique design.", fullDesc: "A beautifully crafted handmade ceramic cup with a unique artistic design. Perfect for hot and cold drinks.", image: "images/cup/11/11.webp", category: "cup", hasSizes: false },
    { id: 112, name: "Cup 12", price: 15.00, shortDesc: "Handmade ceramic cup with unique design.", fullDesc: "A beautifully crafted handmade ceramic cup with a unique artistic design. Perfect for hot and cold drinks.", image: "images/cup/12/12.webp", category: "cup", hasSizes: false },
    { id: 113, name: "Cup 13", price: 15.00, shortDesc: "Handmade ceramic cup with unique design.", fullDesc: "A beautifully crafted handmade ceramic cup with a unique artistic design. Perfect for hot and cold drinks.", image: "images/cup/13/13.webp", category: "cup", hasSizes: false },
    { id: 114, name: "Cup 14", price: 15.00, shortDesc: "Handmade ceramic cup with unique design.", fullDesc: "A beautifully crafted handmade ceramic cup with a unique artistic design. Perfect for hot and cold drinks.", image: "images/cup/14/14.webp", category: "cup", hasSizes: false },
    { id: 115, name: "Cup 15", price: 15.00, shortDesc: "Handmade ceramic cup with unique design.", fullDesc: "A beautifully crafted handmade ceramic cup with a unique artistic design. Perfect for hot and cold drinks.", image: "images/cup/15/15.webp", category: "cup", hasSizes: false },
    { id: 116, name: "Cup 16", price: 15.00, shortDesc: "Handmade ceramic cup with unique design.", fullDesc: "A beautifully crafted handmade ceramic cup with a unique artistic design. Perfect for hot and cold drinks.", image: "images/cup/16/16.webp", category: "cup", hasSizes: false },
    { id: 117, name: "Cup 17", price: 15.00, shortDesc: "Handmade ceramic cup with unique design.", fullDesc: "A beautifully crafted handmade ceramic cup with a unique artistic design. Perfect for hot and cold drinks.", image: "images/cup/17/17.webp", category: "cup", hasSizes: false }
];

const cupsArabic = [
    { id: 101, name: "كوب قهوة سيراميك", price: 15.99,shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.",image: "images/cup/1/1.webp", category: "cup", hasSizes: false },
    { id: 102, name: "كوب سفر معزول", price: 24.99, description: "كوب سفر من الستانلس ستيل معزول. يحافظ على المشروبات ساخنة لمدة 6 ساعات.", image: "images/cup/2/2.webp", category: "cup", hasSizes: false },
    { id: 103, name: "طقم أكواب شاي زجاجية", price: 34.99,shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cup/3/3.webp", category: "cup", hasSizes: false },
    { id: 104, name: "فنجان إسبريسو فني", price: 12.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cup/4/4.webp", category: "cup", hasSizes: false },
    { id: 105, name: "كوب متغير اللون", price: 19.99,shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cup/5/5.webp", category: "cup", hasSizes: false },
    { id: 106, name: "كوب منزل السنافر", price: 18.99, shortDesc: "ابدأ صباحك بابتسامة مع كوب منزل السنافر الساحر. تفاصيله الدقيقة وألوانه الدافئة تجعله الهدية المثالية لمحبي القطع الفريدة والمميزة",fullDesc: "استمتع بتجربة فريدة مع كوب ل السنافر المصنوع من الخزف عالي الجودة والمزين بتفاصيل ثلاثية الأبعاد تنبض بالحياة. يتميز هذا الكوب بتصميم ساحر يجسد كوخ الفطر الأحمر الريفي مع تفاصيل الباب والنباتات الخضراء، مما يجعله قطعة فنية جذابة تزين مكتبك وتضفي دفئاً وسحراً خاصاً على مشروباتك الساخنة في كل مرة تستخدمه", image: "images/cup/6/6.webp", category: "cup", hasSizes: false },
    { id: 107, name: "كوب 7", price: 15.00, shortDesc: "كوب سيراميك يدوي بتصميم مميز.", fullDesc: "كوب سيراميك مصنوع يدوياً بتصميم فني فريد. مثالي للمشروبات الساخنة والباردة.", image: "images/cup/7/7.webp", category: "cup", hasSizes: false },
    { id: 108, name: "كوب 8", price: 15.00, shortDesc: "كوب سيراميك يدوي بتصميم مميز.", fullDesc: "كوب سيراميك مصنوع يدوياً بتصميم فني فريد. مثالي للمشروبات الساخنة والباردة.", image: "images/cup/8/8.webp", category: "cup", hasSizes: false },
    { id: 109, name: "كوب 9", price: 15.00, shortDesc: "كوب سيراميك يدوي بتصميم مميز.", fullDesc: "كوب سيراميك مصنوع يدوياً بتصميم فني فريد. مثالي للمشروبات الساخنة والباردة.", image: "images/cup/9/9.webp", category: "cup", hasSizes: false },
    { id: 110, name: "كوب 10", price: 15.00, shortDesc: "كوب سيراميك يدوي بتصميم مميز.", fullDesc: "كوب سيراميك مصنوع يدوياً بتصميم فني فريد. مثالي للمشروبات الساخنة والباردة.", image: "images/cup/10/10.webp", category: "cup", hasSizes: false },
    { id: 111, name: "كوب 11", price: 15.00, shortDesc: "كوب سيراميك يدوي بتصميم مميز.", fullDesc: "كوب سيراميك مصنوع يدوياً بتصميم فني فريد. مثالي للمشروبات الساخنة والباردة.", image: "images/cup/11/11.webp", category: "cup", hasSizes: false },
    { id: 112, name: "كوب 12", price: 15.00, shortDesc: "كوب سيراميك يدوي بتصميم مميز.", fullDesc: "كوب سيراميك مصنوع يدوياً بتصميم فني فريد. مثالي للمشروبات الساخنة والباردة.", image: "images/cup/12/12.webp", category: "cup", hasSizes: false },
    { id: 113, name: "كوب 13", price: 15.00, shortDesc: "كوب سيراميك يدوي بتصميم مميز.", fullDesc: "كوب سيراميك مصنوع يدوياً بتصميم فني فريد. مثالي للمشروبات الساخنة والباردة.", image: "images/cup/13/13.webp", category: "cup", hasSizes: false },
    { id: 114, name: "كوب 14", price: 15.00, shortDesc: "كوب سيراميك يدوي بتصميم مميز.", fullDesc: "كوب سيراميك مصنوع يدوياً بتصميم فني فريد. مثالي للمشروبات الساخنة والباردة.", image: "images/cup/14/14.webp", category: "cup", hasSizes: false },
    { id: 115, name: "كوب 15", price: 15.00, shortDesc: "كوب سيراميك يدوي بتصميم مميز.", fullDesc: "كوب سيراميك مصنوع يدوياً بتصميم فني فريد. مثالي للمشروبات الساخنة والباردة.", image: "images/cup/15/15.webp", category: "cup", hasSizes: false },
    { id: 116, name: "كوب 16", price: 15.00, shortDesc: "كوب سيراميك يدوي بتصميم مميز.", fullDesc: "كوب سيراميك مصنوع يدوياً بتصميم فني فريد. مثالي للمشروبات الساخنة والباردة.", image: "images/cup/16/16.webp", category: "cup", hasSizes: false },
    { id: 117, name: "كوب 17", price: 15.00, shortDesc: "كوب سيراميك يدوي بتصميم مميز.", fullDesc: "كوب سيراميك مصنوع يدوياً بتصميم فني فريد. مثالي للمشروبات الساخنة والباردة.", image: "images/cup/17/17.webp", category: "cup", hasSizes: false }
];
// ========================================================

// ============ 🟢 طباعات ثلاثية الأبعاد 🟢 ============
const prints3dEnglish = [
    { id: 301, name: "3D Print", price: 20.00, shortDesc: "Choose your favorite character", fullDesc: "High-quality 3D printed figures of your favorite Mario characters.", image: "images/3d/1/1.webp", category: "print3d", hasSizes: false,
      variants: [
        {
            name: "Mario",
            priceDiff: 0,
            images: ["images/3d/1/mario/1.webp", "images/3d/1/mario/1b.webp", "images/3d/1/mario/1c.webp", "images/3d/1/mario/1d.webp"],
            shortDesc: "The original hero with his iconic red cap",
            fullDesc: "Classic Mario figure printed in high-precision 3D. 12cm tall, with detailed cap and mustache, vivid long-lasting colors. The perfect piece for classic gaming fans, ideal for desk and shelf decor."
        },
        {
            name: "Wario",
            priceDiff: 5.00,
            images: ["images/3d/1/wario/1.webp"],
            shortDesc: "The charismatic villain with his yellow cap",
            fullDesc: "Wario figure with more intricate details and a slightly larger size, hence the higher price. A standout character for fans of the mischievous side of the Mario universe, adding a fun and unconventional touch to your decor."
        },
        {
            name: "Yoshi",
            priceDiff: 3.00,
            images: ["images/3d/1/luchi/1.webp", "images/3d/1/luchi/1b.webp"],
            shortDesc: "Special edition with exclusive details",
            fullDesc: "The distinctive Luchi version with intricate details and carefully chosen colors. A limited piece for figure collectors and enthusiasts looking for a unique item not available everywhere."
        }
      ]
    },
    { id: 302, name: "3D Print 2", price: 0.99, shortDesc: "Choose between boy or girl", fullDesc: "High-quality 3D printed figures, available in boy or girl design.", image: "images/3d/2/girl/2.webp", category: "print3d", hasSizes: false,
      variants: [
                {
            name: "Girl",
            priceDiff: 0,
            images: ["images/3d/2/girl/2.webp", "images/3d/2/girl/2b.webp"],
            shortDesc: "Girl design",
            fullDesc: "High-quality 3D printed girl figure with fine details and durable materials.",
            requiresCustomText: { labelKey: "variantCustomNameForGirl", placeholderKey: "variantCustomNamePlaceholderGirl", hintKey: "variantCustomNameLatinHint", lang: "en" }
        },
        {
            name: "Boy",
            priceDiff: 0,
            images: ["images/3d/2/boy/2.webp"],
            shortDesc: "Boy design",
            fullDesc: "High-quality 3D printed boy figure with fine details and durable materials.",
            requiresCustomText: { labelKey: "variantCustomNameForBoy", placeholderKey: "variantCustomNamePlaceholderBoy", hintKey: "variantCustomNameLatinHint", lang: "en" }
        }

      ]
    },
    { id: 303, name: "3D Print 3", price: 0.99, shortDesc: "...", fullDesc: "...", image: "images/3d/3/3.webp", category: "print3d", hasSizes: false },
    { id: 304, name: "3D Print 4", price: 0.99, shortDesc: "...", fullDesc: "...", image: "images/3d/4/4.webp", category: "print3d", hasSizes: false },
    { id: 305, name: "3D Print 5", price: 0.99, shortDesc: "...", fullDesc: "...", image: "images/3d/4/4.webp", category: "print3d", hasSizes: false },
];

const prints3dArabic = [
    { id: 301, name: "طباعة ثلاثية الأبعاد", price: 15.99, shortDesc: "اختر شخصيتك المفضلة", fullDesc: "تماثيل عالية الجودة بتقنية الطباعة ثلاثية الأبعاد لشخصيات ماريو المحببة.", image: "images/3d/1/1.webp", category: "print3d", hasSizes: false,
      variants: [
        {
            name: "ماريو",
            priceDiff: 0,
            images: ["images/3d/1/mario/1.webp", "images/3d/1/mario/1b.webp", "images/3d/1/mario/1c.webp", "images/3d/1/mario/1d.webp"],
            shortDesc: "البطل الأصلي بقبعته الحمراء الشهيرة",
            fullDesc: "تمثال ماريو الكلاسيكي مطبوع بتقنية ثلاثية الأبعاد عالية الدقة. ارتفاع 12 سم، تفاصيل دقيقة لقبعته وشاربه، ألوان زاهية تدوم طويلاً. القطعة المثالية لعشاق الألعاب الكلاسيكية وتزيين المكتب أو الرفوف."
        },
        {
            name: "واريو",
            priceDiff: 0,
            images: ["images/3d/1/wario/1.webp"],
            shortDesc: "الشرير الكاريزماتي بقبعته الصفراء",
            fullDesc: "تمثال واريو بتفاصيل أكثر تعقيداً وحجم أكبر قليلاً، لذلك السعر أعلى. شخصية مميزة لعشّاق الجانب الشقيّ من عالم ماريو، تضيف طابعاً مرحاً وغير تقليدي على ديكورك."
        },
        {
            name: "يوشي",
            priceDiff: 0,
            images: ["images/3d/1/luchi/1.webp", "images/3d/1/luchi/1b.webp"],
            shortDesc: "إصدار خاص بتفاصيل حصرية",
            fullDesc: "نسخة لوشي المميزة بتفاصيل دقيقة وألوان مدروسة. قطعة محدودة لجامعي التماثيل والمحبين الباحثين عن قطعة فريدة لا تتوفر في كل مكان."
        }
      ]
    },
    { id: 302, name: "طباعة ثلاثية الأبعاد 2", price: 0.99, shortDesc: "اختر بين تصميم ولد أو بنت", fullDesc: "تماثيل ثلاثية الأبعاد عالية الجودة، متوفرة بتصميم ولد أو بنت.", image: "images/3d/2/girl/2.webp", category: "print3d", hasSizes: false,
      variants: [
                {
            name: "بنت",
            priceDiff: 0,
            images: ["images/3d/2/girl/2.webp", "images/3d/2/girl/2b.webp"],
            shortDesc: "تصميم بنت",
            fullDesc: "تمثال بنت مطبوع ثلاثي الأبعاد بجودة عالية وتفاصيل دقيقة وخامات متينة.",
            requiresCustomText: { labelKey: "variantCustomNameForGirl", placeholderKey: "variantCustomNamePlaceholderGirl", hintKey: "variantCustomNameLatinHint", lang: "en" }
        },
        {
            name: "ولد",
            priceDiff: 0,
            images: ["images/3d/2/boy/2.webp"],
            shortDesc: "تصميم ولد",
            fullDesc: "تمثال ولد مطبوع ثلاثي الأبعاد بجودة عالية وتفاصيل دقيقة وخامات متينة.",
            requiresCustomText: { labelKey: "variantCustomNameForBoy", placeholderKey: "variantCustomNamePlaceholderBoy", hintKey: "variantCustomNameLatinHint", lang: "en" }
        }

      ]
    },
    { id: 303, name: "طباعة ثلاثية الأبعاد 3", price: 0.99, shortDesc: "...", fullDesc: "...", image: "images/3d/3/3.webp", category: "print3d", hasSizes: false },
    { id: 304, name: "طباعة ثلاثية الأبعاد 4", price: 0.99, shortDesc: "...", fullDesc: "...", image: "images/3d/4/4.webp", category: "print3d", hasSizes: false },
    { id: 305, name: "طباعة ثلاثية الأبعاد 5", price: 0.99, shortDesc: "...", fullDesc: "...", image: "images/3d/4/4.webp", category: "print3d", hasSizes: false },
];
// =====================================================

const framesEnglish = [
    { id: 201, name: "Wedding Anniversary", price: 7.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.", fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/Frame/1/1.webp", category: "frame", hasSizes: false, requiresWeddingForm: true },
    { id: 202, name: "Leather Bookmark", price: 12.50, shortDesc: "Premium leather bookmark with your favorite football club crest.",fullDesc: "A handcrafted leather bookmark featuring the crest of your favorite football club. Choose from top European clubs, or request a custom design with any club of your choice.", image: "images/Frame/2/2.webp", category: "frame", hasSizes: false,
      variants: [
        {
            name: "Barcelona",
            priceDiff: 0,
            images: ["images/Frame/2/barcelona/1.webp"],
            shortDesc: "Premium leather bookmark with FC Barcelona crest.",
            fullDesc: "Handcrafted premium leather bookmark with the iconic FC Barcelona crest. A perfect gift for every Blaugrana fan."
        },
        {
            name: "Real Madrid",
            priceDiff: 0,
            images: ["images/Frame/2/real-madrid/1.webp"],
            shortDesc: "Premium leather bookmark with Real Madrid crest.",
            fullDesc: "Handcrafted premium leather bookmark with the legendary Real Madrid crest. A treasure for every Los Blancos fan."
        },
        {
            name: "Manchester City",
            priceDiff: 0,
            images: ["images/Frame/2/man-city/1.webp"],
            shortDesc: "Premium leather bookmark with Manchester City crest.",
            fullDesc: "Handcrafted premium leather bookmark with the Manchester City crest. A distinctive choice for Citizens supporters."
        },
        {
            name: "Manchester United",
            priceDiff: 0,
            images: ["images/Frame/2/man-united/1.webp"],
            shortDesc: "Premium leather bookmark with Manchester United crest.",
            fullDesc: "Handcrafted premium leather bookmark with the Manchester United crest. The perfect gift for every Red Devils fan."
        },
        {
            name: "Custom",
            priceDiff: 0,
            images: ["images/Frame/2/custom/1.webp"],
            shortDesc: "Leather bookmark with any club of your choice.",
            fullDesc: "Premium leather bookmark — choose any club name and we'll handcraft it for you with the highest detail. Note: after placing the order, please send us the reference logo on WhatsApp.",
            requiresCustomText: true
        }
      ]
    },
    { id: 203, name: "Scented Candle", price: 15.00, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/Frame/3/3.webp", category: "frame", hasSizes: false },
    { id: 204, name: "Personalized Photo Mug", price: 14.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/Frame/4/4.webp", category: "frame", hasSizes: false },
];

const framesArabic = [
    { id: 201, name: "عيد الزواج", price: 7.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.", fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/Frame/1/1.webp", category: "frame", hasSizes: false, requiresWeddingForm: true },
    { id: 202, name: "فاصل كتب جلدي", price: 12.50, shortDesc: "فاصل كتب جلدي فاخر بشعار ناديك المفضل، صناعة يدوية.",fullDesc: "فاصل كتب من الجلد الفاخر، مصنوع يدوياً بدقة عالية، يحمل شعار ناديك الرياضي المفضل. اختار من بين أبرز الأندية العالمية، أو اطلب شعاراً مخصصاً بنادي من اختيارك.", image: "images/Frame/2/2.webp", category: "frame", hasSizes: false,
      variants: [
        {
            name: "برشلونة",
            priceDiff: 0,
            images: ["images/Frame/2/barcelona/1.webp"],
            shortDesc: "فاصل كتب جلدي فاخر بشعار نادي برشلونة.",
            fullDesc: "فاصل كتب من الجلد الفاخر، مصنوع يدوياً، يحمل شعار نادي برشلونة العريق. هدية مثالية لكل عاشق للبلاوغرانا."
        },
        {
            name: "ريال مدريد",
            priceDiff: 0,
            images: ["images/Frame/2/real-madrid/1.webp"],
            shortDesc: "فاصل كتب جلدي فاخر بشعار نادي ريال مدريد.",
            fullDesc: "فاصل كتب من الجلد الفاخر، مصنوع يدوياً، يحمل شعار نادي ريال مدريد الملكي. تحفة لكل مشجع للنادي الأبيض."
        },
        {
            name: "مانشستر سيتي",
            priceDiff: 0,
            images: ["images/Frame/2/man-city/1.webp"],
            shortDesc: "فاصل كتب جلدي فاخر بشعار نادي مانشستر سيتي.",
            fullDesc: "فاصل كتب من الجلد الفاخر، مصنوع يدوياً، يحمل شعار نادي مانشستر سيتي. اختيار مميز لمحبي السماويين."
        },
        {
            name: "مانشستر يونايتد",
            priceDiff: 0,
            images: ["images/Frame/2/man-united/1.webp"],
            shortDesc: "فاصل كتب جلدي فاخر بشعار نادي مانشستر يونايتد.",
            fullDesc: "فاصل كتب من الجلد الفاخر، مصنوع يدوياً، يحمل شعار نادي مانشستر يونايتد. هدية مثالية لكل مشجع للشياطين الحمر."
        },
        {
            name: "مخصص",
            priceDiff: 0,
            images: ["images/Frame/2/custom/1.webp"],
            shortDesc: "فاصل كتب جلدي بشعار نادي من اختيارك.",
            fullDesc: "فاصل كتب من الجلد الفاخر، اختار اسم النادي اللي بدك إياه، ونحن نصنعه لك يدوياً بأعلى دقة. ملاحظة: بعد إتمام الطلب، أرسل لنا صورة الشعار المرجعية على واتساب.",
            requiresCustomText: true
        }
      ]
    },
    { id: 203, name: "شمعة معطرة", price: 15.00, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/Frame/3/3.webp", category: "frame", hasSizes: false },
    { id: 204, name: "كوب بصورة شخصية", price: 14.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/Frame/4/4.webp", category: "frame", hasSizes: false },
];

// 🟢 فئة الهدايا المنوعة - بالإنجليزي
const giftsEnglish = [
    { id: 401, name: "Mixed Gift 1", price: 9.99, shortDesc: "Special handmade gift.", fullDesc: "A unique handmade gift item, carefully crafted with attention to detail.", image: "images/gifts/1/1.webp", category: "gift", hasSizes: false },
    { id: 402, name: "Mixed Gift 2", price: 12.50, shortDesc: "Special handmade gift.", fullDesc: "A unique handmade gift item, carefully crafted with attention to detail.", image: "images/gifts/2/2.webp", category: "gift", hasSizes: false },
    { id: 403, name: "Mixed Gift 3", price: 15.00, shortDesc: "Special handmade gift.", fullDesc: "A unique handmade gift item, carefully crafted with attention to detail.", image: "images/gifts/3/3.webp", category: "gift", hasSizes: false },
    { id: 404, name: "Mixed Gift 4", price: 18.99, shortDesc: "Special handmade gift.", fullDesc: "A unique handmade gift item, carefully crafted with attention to detail.", image: "images/gifts/4/4.webp", category: "gift", hasSizes: false },
];

// 🟢 فئة الهدايا المنوعة - بالعربي
const giftsArabic = [
    { id: 401, name: "هدية منوعة 1", price: 9.99, shortDesc: "هدية يدوية مميزة.", fullDesc: "قطعة هدية فريدة مصنوعة يدويًا بعناية فائقة وتفاصيل دقيقة.", image: "images/gifts/1/1.webp", category: "gift", hasSizes: false },
    { id: 402, name: "هدية منوعة 2", price: 12.50, shortDesc: "هدية يدوية مميزة.", fullDesc: "قطعة هدية فريدة مصنوعة يدويًا بعناية فائقة وتفاصيل دقيقة.", image: "images/gifts/2/2.webp", category: "gift", hasSizes: false },
    { id: 403, name: "هدية منوعة 3", price: 15.00, shortDesc: "هدية يدوية مميزة.", fullDesc: "قطعة هدية فريدة مصنوعة يدويًا بعناية فائقة وتفاصيل دقيقة.", image: "images/gifts/3/3.webp", category: "gift", hasSizes: false },
    { id: 404, name: "هدية منوعة 4", price: 18.99, shortDesc: "هدية يدوية مميزة.", fullDesc: "قطعة هدية فريدة مصنوعة يدويًا بعناية فائقة وتفاصيل دقيقة.", image: "images/gifts/4/4.webp", category: "gift", hasSizes: false },
];

let allProductsEnglish = [...paintingsEnglish, ...cupsEnglish, ...prints3dEnglish, ...framesEnglish, ...giftsEnglish];
let allProductsArabic = [...paintingsArabic, ...cupsArabic, ...prints3dArabic, ...framesArabic, ...giftsArabic];