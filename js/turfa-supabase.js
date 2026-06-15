// =================================================================
// 🟢 turfa-supabase.js — جلب المنتجات من قاعدة البيانات Supabase
// =================================================================

// ====================================================
// 🟢 عدّل سطر المفتاح فقط — الرابط جاهز:
// ====================================================
const TURFA_SUPABASE_URL = "https://fneboifhuwrhkmdtjswh.supabase.co";
const TURFA_SUPABASE_KEY = "sb_publishable_e_-aX1xnWnfGJXWvPbObcg_Dbt6vTNr";
// ====================================================

function turfaMapRow(row, lang) {
    const isAr = lang === 'ar';
    const p = {
        id: row.id,
        name: isAr ? row.name_ar : (row.name_en || row.name_ar),
        price: Number(row.price),
        shortDesc: isAr ? row.short_desc_ar : (row.short_desc_en || row.short_desc_ar),
        fullDesc: isAr ? row.full_desc_ar : (row.full_desc_en || row.full_desc_ar),
        image: row.main_image,
        category: row.category,
        hasSizes: !!row.has_sizes
    };

    // معرض الصور الصريح (للمنتجات البسيطة) — يُستخدم بدل تخمين الأسماء
    if (Array.isArray(row.images) && row.images.length) {
        p.images = row.images;
    }

    const colors = Array.isArray(row.colors) ? row.colors : [];
    if (colors.length) {
        p.colors = colors.map(c => ({
            name: isAr ? c.name_ar : (c.name_en || c.name_ar),
            hex: c.hex,
            images: c.images || []
        }));
    }

    const variants = Array.isArray(row.variants) ? row.variants : [];
    if (variants.length) {
        p.variants = variants.map(v => {
            const vo = {
                name: isAr ? v.name_ar : (v.name_en || v.name_ar),
                priceDiff: Number(v.price_diff || 0),
                images: v.images || [],
                shortDesc: isAr ? v.short_desc_ar : (v.short_desc_en || v.short_desc_ar),
                fullDesc: isAr ? v.full_desc_ar : (v.full_desc_en || v.full_desc_ar)
            };
            if (v.requires_custom_text !== undefined && v.requires_custom_text !== false) {
                vo.requiresCustomText = v.requires_custom_text;
            }
            return vo;
        });
    }

    if (row.is_custom) { p.requiresCustomForm = true; p.isCustomDesign = true; }
    if (row.requires_wedding_form) { p.requiresWeddingForm = true; }
    if (row.requires_custom_text) { p.requiresCustomText = true; }
    return p;
}

async function loadProductsFromSupabase() {
    try {
        if (typeof supabase === 'undefined') throw new Error('مكتبة Supabase لم تُحمّل');
        if (TURFA_SUPABASE_KEY.includes('ضع_')) throw new Error('لم يتم وضع الـ Publishable key');
        const client = supabase.createClient(TURFA_SUPABASE_URL, TURFA_SUPABASE_KEY);
        const { data, error } = await client
            .from('products').select('*').order('sort_order', { ascending: true });
        if (error) throw error;
        if (!data || !data.length) throw new Error('لا توجد منتجات');
        const ar = [], en = [];
        data.forEach(row => { ar.push(turfaMapRow(row, 'ar')); en.push(turfaMapRow(row, 'en')); });
        allProductsArabic = ar;
        allProductsEnglish = en;
        console.log(`✅ تم تحميل ${ar.length} منتج من Supabase`);
        return true;
    } catch (e) {
        console.warn('⚠️ تعذّر الجلب من Supabase — سيتم استخدام بيانات data.js الاحتياطية.', e);
        return false;
    }
}