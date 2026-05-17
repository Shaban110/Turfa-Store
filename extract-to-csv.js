// =================================================================
// 📤 extract-to-csv.js
// -----------------------------------------------------------------
// يقرأ data.js الحالي ويستخرج منه:
//   1) products.csv    — كل النصوص والأسعار (الشي اللي بتعدّله كثير)
//   2) _advanced.json  — الحقول المعقدة (ألوان/variants) — ما بتلمسها
//
// شغّله مرة وحدة فقط في البداية لتوليد الـ CSV من بياناتك الحالية:
//   node extract-to-csv.js
// =================================================================

const fs = require('fs');
const path = require('path');

const DATA_JS = path.join(__dirname, 'data.js');

// --- نحمّل data.js بأمان داخل sandbox ---
let src = fs.readFileSync(DATA_JS, 'utf8').replace(/\r/g, '');
global.document = { addEventListener() {}, getElementById() { return null; } };
global.window = {};
const mod = { exports: {} };
const exportLine =
  ';module.exports={paintingsArabic,paintingsEnglish,cupsArabic,cupsEnglish,' +
  'prints3dArabic,prints3dEnglish,framesArabic,framesEnglish,giftsArabic,giftsEnglish};';
new Function('module', 'exports', 'global', src + '\n' + exportLine)(mod, mod.exports, global);
const X = mod.exports;

// الفئات بالترتيب اللي بينضمّوا فيه (لازم نحافظ عليه)
const GROUPS = [
  { key: 'paintings', ar: X.paintingsArabic, en: X.paintingsEnglish },
  { key: 'cups',      ar: X.cupsArabic,      en: X.cupsEnglish },
  { key: 'prints3d',  ar: X.prints3dArabic,  en: X.prints3dEnglish },
  { key: 'frames',    ar: X.framesArabic,    en: X.framesEnglish },
  { key: 'gifts',     ar: X.giftsArabic,     en: X.giftsEnglish },
];

// الأعمدة اللي بتروح للـ CSV (النصوص + الأساسيات)
// أي حقل تاني (colors, variants, requiresWeddingForm...) بنحطه بـ _advanced.json
const KNOWN_SIMPLE = new Set([
  'id', 'name', 'price', 'shortDesc', 'fullDesc', 'description',
  'image', 'category', 'hasSizes',
]);

// --- مساعد: ترميز خلية CSV (RFC 4180) ---
function csvCell(v) {
  if (v === undefined || v === null) v = '';
  v = String(v);
  if (/[",\n\r]/.test(v)) {
    return '"' + v.replace(/"/g, '""') + '"';
  }
  return v;
}

const header = [
  'group', 'id', 'category', 'price_ar', 'price_en', 'hasSizes', 'image',
  'name_ar', 'name_en',
  'shortDesc_ar', 'shortDesc_en',
  'fullDesc_ar', 'fullDesc_en',
];

const rows = [header.join(',')];
const advanced = {}; // key: `${group}:${id}` -> { ...الحقول المعقدة }

let totalProducts = 0;

for (const g of GROUPS) {
  // نفهرس الإنجليزي بالـ id عشان نطابقه مع العربي
  const enById = new Map(g.en.map((p) => [p.id, p]));

  for (const ar of g.ar) {
    const en = enById.get(ar.id) || {};
    totalProducts++;

    // العربي عنده "description" بدل shortDesc/fullDesc بمنتج واحد (id 102 cups)
    const arShort = ar.shortDesc !== undefined ? ar.shortDesc
                  : (ar.description !== undefined ? ar.description : '');
    const arFull  = ar.fullDesc !== undefined ? ar.fullDesc
                  : (ar.description !== undefined ? ar.description : '');
    const enShort = en.shortDesc !== undefined ? en.shortDesc
                  : (en.description !== undefined ? en.description : '');
    const enFull  = en.fullDesc !== undefined ? en.fullDesc
                  : (en.description !== undefined ? en.description : '');

    rows.push([
      g.key,
      ar.id,
      ar.category || en.category || '',
      ar.price !== undefined ? ar.price : (en.price !== undefined ? en.price : 0),
      en.price !== undefined ? en.price : (ar.price !== undefined ? ar.price : 0),
      (ar.hasSizes || en.hasSizes) ? 'true' : 'false',
      ar.image || en.image || '',
      csvCell(ar.name),
      csvCell(en.name),
      csvCell(arShort),
      csvCell(enShort),
      csvCell(arFull),
      csvCell(enFull),
    ].join(','));

    // --- نلتقط الحقول المعقدة/غير المعروفة لكل لغة ---
    const adv = {};
    for (const [k, v] of Object.entries(ar)) {
      if (!KNOWN_SIMPLE.has(k)) {
        adv.ar = adv.ar || {};
        adv.ar[k] = v;
      }
    }
    for (const [k, v] of Object.entries(en)) {
      if (!KNOWN_SIMPLE.has(k)) {
        adv.en = adv.en || {};
        adv.en[k] = v;
      }
    }
    if (Object.keys(adv).length > 0) {
      advanced[`${g.key}:${ar.id}`] = adv;
    }
  }
}

fs.writeFileSync(path.join(__dirname, 'products.csv'), '\uFEFF' + rows.join('\n'), 'utf8');
fs.writeFileSync(
  path.join(__dirname, '_advanced.json'),
  JSON.stringify(advanced, null, 2),
  'utf8'
);

console.log('✅ تم استخراج ' + totalProducts + ' منتج');
console.log('   📄 products.csv     (النصوص والأسعار — عدّل هون)');
console.log('   📦 _advanced.json   (ألوان/variants — ' +
  Object.keys(advanced).length + ' منتج — لا تلمسه إلا للضرورة)');
