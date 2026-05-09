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
// =================================================================
// --- 1. LANGUAGE & TRANSLATION DATA ---
// =================================================================
const arabicTexts = {
    title: "لوحات",
    cupsTitle: "كاسات",
    prints3dTitle: "طباعات ثلاثية الأبعاد",
    framesTitle: "براويز",
    offersTitle: "العروض",
    heroSubtitle: "لوحات بخط عربي وهدايا مصممة بعناية",
    searchPlaceholder: "ابحث عن منتجك من هنا",
    addToCart: "أضف إلى العربة",
    added: "تمت الإضافة!",
    yourCart: "عربتك",
    total: "الإجمالي:",
    checkout: "متابعة الشراء عبر واتساب",
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
    checkoutPaymentBank: "تحويل بنكي",
    checkoutNotesLabel: "ملاحظات (اختياري)",
    checkoutFormHint: "* الحقول المعلّمة إجبارية",
    checkoutFormCancel: "رجوع",
    checkoutFormSubmit: "إرسال الطلب عبر واتساب",
    checkoutFormErrorRequired: "الرجاء تعبئة الحقول الإجبارية",
    checkoutFormErrorPhone: "الرجاء إدخال رقم هاتف صحيح",
    // قائمة المدن مع رسوم التوصيل (بالدينار الأردني)
    checkoutCities: [
        { name: "عمّان", fee: 2.00 },
        { name: "الزرقاء", fee: 2.00 },
        { name: "الرصيفة", fee: 2.00 },
        { name: "السلط", fee: 3.00 },
        { name: "مادبا", fee: 3.00 },
        { name: "إربد", fee: 3.50 },
        { name: "جرش", fee: 3.50 },
        { name: "عجلون", fee: 3.50 },
        { name: "المفرق", fee: 4.00 },
        { name: "الكرك", fee: 4.50 },
        { name: "الطفيلة", fee: 5.00 },
        { name: "معان", fee: 5.50 },
        { name: "العقبة", fee: 6.00 }
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
    offersTitle: "Special Offers",
    heroSubtitle: "Arabic calligraphy paintings and carefully designed gifts",
    searchPlaceholder: "Search for your product here",
    addToCart: "Add to Cart",
    added: "Added!",
    yourCart: "Your Cart",
    total: "Total:",
    checkout: "Checkout via WhatsApp",
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
    checkoutPaymentBank: "Bank Transfer",
    checkoutNotesLabel: "Notes (Optional)",
    checkoutFormHint: "* Marked fields are required",
    checkoutFormCancel: "Back",
    checkoutFormSubmit: "Send Order via WhatsApp",
    checkoutFormErrorRequired: "Please fill in the required fields",
    checkoutFormErrorPhone: "Please enter a valid phone number",
    // قائمة المدن (نفس الترتيب مع الترجمة)
    checkoutCities: [
        { name: "Amman", fee: 2.00 },
        { name: "Zarqa", fee: 2.00 },
        { name: "Russeifa", fee: 2.00 },
        { name: "Salt", fee: 3.00 },
        { name: "Madaba", fee: 3.00 },
        { name: "Irbid", fee: 3.50 },
        { name: "Jerash", fee: 3.50 },
        { name: "Ajloun", fee: 3.50 },
        { name: "Mafraq", fee: 4.00 },
        { name: "Karak", fee: 4.50 },
        { name: "Tafilah", fee: 5.00 },
        { name: "Ma'an", fee: 5.50 },
        { name: "Aqaba", fee: 6.00 }
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
        { text: "+962 7 8848 9914", icon: "fas fa-phone", link: "tel:+962788489914" },
        { text: "info@turfa.art", icon: "fas fa-envelope", link: "mailto:info@turfastore.com" }
    ],
    about: [ { text: "About Us", link: "#about" }, { text: "Contact", link: "#contact" }, { text: "Privacy Policy", link: "#privacy" } ],
categories: [
    { text: "Paintings", link: "#paintingsTitle" },
    { text: "Cups", link: "#cupsTitle" },
    { text: "3D Prints", link: "#prints3dTitle" },
    { text: "Frames", link: "#framesTitle" }
],
    collections: [
        { text: "Praise of the Prophet", link: "#coming-praise" },
        { text: "Ramadan Products", link: "#coming-ramadan" }
    ]
};

const footerLinksArabic = {
    contact: [
        { text: "+962 7 8848 9914", icon: "fas fa-phone", link: "tel:+962788489914" },
        { text: "info@turfa.art", icon: "fas fa-envelope", link: "mailto:info@turfastore.com" }
    ],
    about: [ { text: "من نحن", link: "#about" }, { text: "تواصل معنا", link: "#contact" }, { text: "سياسة الخصوصية", link: "#privacy" } ],
categories: [
    { text: "لوحات", link: "#paintingsTitle" },
    { text: "كاسات", link: "#cupsTitle" },
    { text: "طباعات ثلاثية الأبعاد", link: "#prints3dTitle" },
    { text: "براويز", link: "#framesTitle" }
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
            link: "https://wa.me/+962788489914"
        },
        {
            icon: "fas fa-phone",
            type: "phone",
            title: "الهاتف",
            value: "+962 78 848 9914",
            desc: "متاحون لاستقبال اتصالكم",
            link: "tel:+962788489914"
        },
        {
            icon: "fas fa-envelope",
            type: "email",
            title: "البريد الإلكتروني",
            value: "info@turfa.art",
            desc: "للاستفسارات الرسمية والتعاون",
            link: "mailto:info@turfa.art"
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
            link: "https://wa.me/+962788489914"
        },
        {
            icon: "fas fa-phone",
            type: "phone",
            title: "Phone",
            value: "+962 78 848 9914",
            desc: "Available to take your call",
            link: "tel:+962788489914"
        },
        {
            icon: "fas fa-envelope",
            type: "email",
            title: "Email",
            value: "info@turfa.art",
            desc: "For formal inquiries and collaborations",
            link: "mailto:info@turfa.art"
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
    { id: 1, name: "Ya Sham", price: 39.99,shortDesc: "Damascus in my heart, a piece of art on my wall",fullDesc: "A piece of art crafted with 3 layers of passion to be a lasting reminder of the most beautiful bonds. A serene décor piece with a pink touch, fit for your home and designed to delight your heart", image: "images/plates/1.png", category: "painting", hasSizes: true,
      colors: [
        { name: "Pink",  hex: "#e8a0b0", images: ["images/plates/1.png", "images/plates/1b.png", "images/plates/1c.png"] },
        { name: "Beige", hex: "#d4b896", images: ["images/plates/1_beige.png", "images/plates/1b_beige.png", "images/plates/1c_beige.png"] },
        { name: "Blue",  hex: "#7ba7c7", images: ["images/plates/1_blue.png",  "images/plates/1b_blue.png",  "images/plates/1c_blue.png"] },
      ]
    },
    { id: 2, name: "Alhamdulillah", price: 39.99, shortDesc: "A beautiful plaque, to remind you of gratitude at all times.",fullDesc: "A spiritual art piece crafted with 3D layered technology, designed to illuminate your walls with the remembrance of God and tranquility. A design that merges the grandeur of calligraphy with the depth of ornamentation, serving as a daily reminder of the beauty of gratitude",image: "images/plates/2.png", category: "painting", hasSizes: true },
    { id: 3, name: "Ayatul Kursi", price: 39.99, shortDesc: "The greatest verse, in an artistic design that immortalizes its beauty.",fullDesc: "A décor piece carrying the greatest verse in the Qur'an, crafted with striking layered (3D) technology to bring tranquility and reverence to your space. A unique design blending the grandeur of calligraphy with the warmth of wood, to keep your home under God's protection.", image: "images/plates/3.png", category: "painting", hasSizes: true },
    { id: 4, name: "...", price: 59.99,shortDesc: "...",fullDesc: "...", image: "images/plates/4.png", category: "painting", hasSizes: true }
];

const paintingsArabic = [
    { id: 1, name: "لوحة يا شام", price: 29.99, shortDesc: "دمشق في قلبي، قطعة فنية على جداري.",fullDesc: "لوحة فنية صُنعت بـ 3 طبقات من الشغف لتبقى تذكاراً دائماً لأجمل الروابط. قطعة ديكور هادئة بلمسة وردية، تليق ببيتك وتُسعد قلبك.", image: "images/plates/1.png", category: "painting", hasSizes: true,
      colors: [
        { name: "وردي", hex: "#e8a0b0", images: ["images/plates/1.png", "images/plates/1b.png", "images/plates/1c.png"] },
        { name: "بني",  hex: "#704214", images: ["images/plates/sham_brown/1.png", "images/plates/sham_brown/2.png"] },
        //{ name: "أزرق", hex: "#7ba7c7", images: ["images/plates/1_blue.png",  "images/plates/1b_blue.png",  "images/plates/1c_blue.png"] },
      ]
    },
    { id: 2, name: "لوحة الحمد لله", price: 39.99,shortDesc: "لوحة، تذكرك بجمال الامتنان في كل حين.",fullDesc: "قطعة فنية روحانية صُنعت بتقنية الطبقات الثلاثية الأبعاد، لتضيء جدران بيتك بذكر الله والسكينة. تصميم يجمع عظمة الخط مع عمق الزخرفة، لتكون تذكيراً يومياً بجمال الامتنان.", image: "images/plates/2.png", category: "painting", hasSizes: true ,
          colors: [
    { name: "بيج",   hex: "#d4b896", images: ["images/plates/2.png", "images/plates/2b.png"] },
    { name: "أسود",  hex: "#2c2c2c", images: ["images/plates/2_black.png", "images/plates/2b_black.png"] },
    { name: "ذهبي",  hex: "#c9a84c", images: ["images/plates/2_gold.png"] },
  ]
        
     },
    { id: 3, name: "لوحة آية الكرسي", price: 39.99, shortDesc: "أعظم آية، بتصميم فني يخلد جمالها.",fullDesc: "قطعة ديكور تحمل أعظم آية في القرآن، صُنعت بتقنية الطبقات البارزة، لتضفي على مساحتك سكينة ومهابة. تصميم فريد يمزج بين عظمة الخط ودفء الخشب، لتكون بيتك في حفظ الله.", image: "images/plates/3.png", category: "painting", hasSizes: true },
    { id: 4, name: "...", price: 0.00, shortDesc: "...",fullDesc: "...", image: "images/plates/4.png", category: "painting", hasSizes: true },
];

// ============ 🟢 التعديل هنا (مسار الأكواب) 🟢 ============
const cupsEnglish = [
    { id: 101, name: "Ceramic Coffee Mug", price: 15.99,shortDesc: "Ceramic Coffee Mug",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cup/cup1.png", category: "cup", hasSizes: false },
    { id: 102, name: "Travel Tumbler", price: 24.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cup/cup2.png", category: "cup", hasSizes: false },
    { id: 103, name: "Glass Tea Cup Set", price: 34.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cup/cup3.png", category: "cup", hasSizes: false },
    { id: 104, name: "Artistic Espresso Cup", price: 12.99,shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cup/cup4.png", category: "cup", hasSizes: false },
    { id: 105, name: "Color Changing Mug", price: 19.99,shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cup/cup5.png", category: "cup", hasSizes: false },
    { id: 106, name: "Bamboo Eco Cup", price: 18.99,shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cup/cup6.png", category: "cup", hasSizes: false }
];

const cupsArabic = [
    { id: 101, name: "كوب قهوة سيراميك", price: 15.99,shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.",image: "images/cup/cup1.png", category: "cup", hasSizes: false },
    { id: 102, name: "كوب سفر معزول", price: 24.99, description: "كوب سفر من الستانلس ستيل معزول. يحافظ على المشروبات ساخنة لمدة 6 ساعات.", image: "images/cup/cup2.png", category: "cup", hasSizes: false },
    { id: 103, name: "طقم أكواب شاي زجاجية", price: 34.99,shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cup/cup3.png", category: "cup", hasSizes: false },
    { id: 104, name: "فنجان إسبريسو فني", price: 12.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cup/cup4.png", category: "cup", hasSizes: false },
    { id: 105, name: "كوب متغير اللون", price: 19.99,shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/cup/cup5.png", category: "cup", hasSizes: false },
    { id: 106, name: "كوب منزل السنافر", price: 18.99, shortDesc: "ابدأ صباحك بابتسامة مع كوب منزل السنافر الساحر. تفاصيله الدقيقة وألوانه الدافئة تجعله الهدية المثالية لمحبي القطع الفريدة والمميزة",fullDesc: "استمتع بتجربة فريدة مع كوب ل السنافر المصنوع من الخزف عالي الجودة والمزين بتفاصيل ثلاثية الأبعاد تنبض بالحياة. يتميز هذا الكوب بتصميم ساحر يجسد كوخ الفطر الأحمر الريفي مع تفاصيل الباب والنباتات الخضراء، مما يجعله قطعة فنية جذابة تزين مكتبك وتضفي دفئاً وسحراً خاصاً على مشروباتك الساخنة في كل مرة تستخدمه", image: "images/cup/cup6.png", category: "cup", hasSizes: false }
];
// ========================================================

// ============ 🟢 طباعات ثلاثية الأبعاد 🟢 ============
const prints3dEnglish = [
    { id: 301, name: "3D Print", price: 20.00, shortDesc: "Choose your favorite character", fullDesc: "High-quality 3D printed figures of your favorite Mario characters.", image: "images/3d/1.png", category: "print3d", hasSizes: false,
      variants: [
        {
            name: "Mario",
            priceDiff: 0,
            images: ["images/3d/mario/1.png", "images/3d/mario/2.png"],
            shortDesc: "The original hero with his iconic red cap",
            fullDesc: "Classic Mario figure printed in high-precision 3D. 12cm tall, with detailed cap and mustache, vivid long-lasting colors. The perfect piece for classic gaming fans, ideal for desk and shelf decor."
        },
        {
            name: "Luigi",
            priceDiff: 0,
            images: ["images/3d/luigi/1.png", "images/3d/luigi/2.png"],
            shortDesc: "The taller brother with his signature green cap",
            fullDesc: "Luigi figure with his distinctive green look, 3D printed at the same high quality level. The best choice for fans of elegant sidekicks, or to complete your collection alongside Mario."
        },
        {
            name: "Wario",
            priceDiff: 5.00,
            images: ["images/3d/wario/1.png", "images/3d/wario/2.png"],
            shortDesc: "The charismatic villain with his yellow cap",
            fullDesc: "Wario figure with more intricate details and a slightly larger size, hence the higher price. A standout character for fans of the mischievous side of the Mario universe, adding a fun and unconventional touch to your decor."
        },
        {
            name: "Yoshi",
            priceDiff: 3.00,
            images: ["images/3d/luchi/1.png", "images/3d/luchi/2.png"],
            shortDesc: "Special edition with exclusive details",
            fullDesc: "The distinctive Luchi version with intricate details and carefully chosen colors. A limited piece for figure collectors and enthusiasts looking for a unique item not available everywhere."
        }
      ]
    },
    { id: 302, name: "3D Print 2", price: 0.99, shortDesc: "...", fullDesc: "...", image: "images/3d/2.png", category: "print3d", hasSizes: false },
    { id: 303, name: "3D Print 3", price: 0.99, shortDesc: "...", fullDesc: "...", image: "images/3d/3.png", category: "print3d", hasSizes: false },
    { id: 304, name: "3D Print 4", price: 0.99, shortDesc: "...", fullDesc: "...", image: "images/3d/4.png", category: "print3d", hasSizes: false },
    { id: 305, name: "3D Print 5", price: 0.99, shortDesc: "...", fullDesc: "...", image: "images/3d/4.png", category: "print3d", hasSizes: false },
];

const prints3dArabic = [
    { id: 301, name: "طباعة ثلاثية الأبعاد", price: 15.99, shortDesc: "اختر شخصيتك المفضلة", fullDesc: "تماثيل عالية الجودة بتقنية الطباعة ثلاثية الأبعاد لشخصيات ماريو المحببة.", image: "images/3d/1.png", category: "print3d", hasSizes: false,
      variants: [
        {
            name: "ماريو",
            priceDiff: 0,
            images: ["images/3d/mario/1.png", "images/3d/mario/2.png"],
            shortDesc: "البطل الأصلي بقبعته الحمراء الشهيرة",
            fullDesc: "تمثال ماريو الكلاسيكي مطبوع بتقنية ثلاثية الأبعاد عالية الدقة. ارتفاع 12 سم، تفاصيل دقيقة لقبعته وشاربه، ألوان زاهية تدوم طويلاً. القطعة المثالية لعشاق الألعاب الكلاسيكية وتزيين المكتب أو الرفوف."
        },
        {
            name: "لويجي",
            priceDiff: 0,
            images: ["images/3d/luigi/1.png", "images/3d/luigi/2.png"],
            shortDesc: "الأخ الأطول بقبعته الخضراء المميزة",
            fullDesc: "تمثال لويجي بطلّته المميزة بالأخضر، مطبوع ثلاثياً بنفس مستوى الجودة العالية. الخيار الأمثل لمن يفضّل الشخصيات الجانبية الأنيقة، أو لإكمال مجموعتك بجانب ماريو."
        },
        {
            name: "واريو",
            priceDiff: 0,
            images: ["images/3d/wario/1.png", "images/3d/wario/2.png"],
            shortDesc: "الشرير الكاريزماتي بقبعته الصفراء",
            fullDesc: "تمثال واريو بتفاصيل أكثر تعقيداً وحجم أكبر قليلاً، لذلك السعر أعلى. شخصية مميزة لعشّاق الجانب الشقيّ من عالم ماريو، تضيف طابعاً مرحاً وغير تقليدي على ديكورك."
        },
        {
            name: "يوشي",
            priceDiff: 0,
            images: ["images/3d/luchi/1.png", "images/3d/luchi/2.png"],
            shortDesc: "إصدار خاص بتفاصيل حصرية",
            fullDesc: "نسخة لوشي المميزة بتفاصيل دقيقة وألوان مدروسة. قطعة محدودة لجامعي التماثيل والمحبين الباحثين عن قطعة فريدة لا تتوفر في كل مكان."
        }
      ]
    },
    { id: 302, name: "طباعة ثلاثية الأبعاد 2", price: 0.99, shortDesc: "...", fullDesc: "...", image: "images/3d/2.png", category: "print3d", hasSizes: false },
    { id: 303, name: "طباعة ثلاثية الأبعاد 3", price: 0.99, shortDesc: "...", fullDesc: "...", image: "images/3d/3.png", category: "print3d", hasSizes: false },
    { id: 304, name: "طباعة ثلاثية الأبعاد 4", price: 0.99, shortDesc: "...", fullDesc: "...", image: "images/3d/4.png", category: "print3d", hasSizes: false },
    { id: 305, name: "طباعة ثلاثية الأبعاد 5", price: 0.99, shortDesc: "...", fullDesc: "...", image: "images/3d/4.png", category: "print3d", hasSizes: false },
];
// =====================================================

const framesEnglish = [
    { id: 201, name: "Wedding Anniversary", price: 7.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.", fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/Frame/gift1.png", category: "frame", hasSizes: false, requiresWeddingForm: true },
    { id: 202, name: "Leather Bookmark", price: 12.50, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/Frame/gift2.png", category: "frame", hasSizes: false },
    { id: 203, name: "Scented Candle", price: 15.00, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/Frame/gift3.png", category: "frame", hasSizes: false },
    { id: 204, name: "Personalized Photo Mug", price: 14.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/Frame/gift4.png", category: "frame", hasSizes: false },
];

const framesArabic = [
    { id: 201, name: "عيد الزواج", price: 7.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.", fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/Frame/gift1.png", category: "frame", hasSizes: false, requiresWeddingForm: true },
    { id: 202, name: "فاصل كتب جلدي", price: 12.50, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/Frame/gift2.png", category: "frame", hasSizes: false },
    { id: 203, name: "شمعة معطرة", price: 15.00, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/Frame/gift3.png", category: "frame", hasSizes: false },
    { id: 204, name: "كوب بصورة شخصية", price: 14.99, shortDesc: "كوب سيراميك يدوي بطلاء زجاجي مميز.",fullDesc: "كوب قهوة من السيراميك مصنوع يدويًا بطلاء زجاجي مميز. آمن لغسالة الصحون ومريح في الإمساك.", image: "images/Frame/gift4.png", category: "frame", hasSizes: false },
];

let allProductsEnglish = [...paintingsEnglish, ...cupsEnglish, ...prints3dEnglish, ...framesEnglish];
let allProductsArabic = [...paintingsArabic, ...cupsArabic, ...prints3dArabic, ...framesArabic];
