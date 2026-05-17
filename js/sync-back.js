// =================================================================
// 🔄 sync-back.js — المزامنة العكسية
// -----------------------------------------------------------------
// بعد ما تعدّل data.js يدوياً، هذا السكربت يرجّع كل تعديلاتك إلى:
//   • products.csv      (النصوص، الأسعار، الصور الرئيسية، الفئات)
//   • _advanced.json    (الألوان، الـ variants، النص المخصّص)
//
// يتعامل مع: تعديل نصوص/أسعار، إضافة منتجات جديدة، حذف منتجات،
//            تعديل ألوان/خيارات، أي خليط من هذا.
//
// الاستخدام:
//   node sync-back.js
//
// يقرأ data.js الموجود (المعدّل يدوياً) ويعيد توليد CSV + advanced
// منه مباشرة. النتيجة: products.SYNCED.csv و _advanced.SYNCED.json
// (أسماء جديدة عشان تقارن قبل ما تعتمد — أمان كامل)
// =================================================================

const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const DATA_JS = path.join(DIR, 'data.js');

if (!fs.existsSync(DATA_JS)) {
  console.error('❌ ما لقيت data.js في نفس المجلد. حطّه هون وشغّل مرة ثانية.');
  process.exit(1);
}

// --- نحمّل data.js بأمان داخل sandbox ---
let src = fs.readFileSync(DATA_JS, 'utf8').replace(/\r/g, '');
global.document = { addEventListener() {}, getElementById() { return null; } };
global.window = {};
const mod = { exports: {} };
const exportLine =
  ';module.exports={' +
  'paintingsArabic,paintingsEnglish,cupsArabic,cupsEnglish,' +
  'prints3dArabic,prints3dEnglish,framesArabic,framesEnglish,' +
  'giftsArabic,giftsEnglish};';

try {
  new Function('module', 'exports', 'global', src + '\n' + exportLine)(mod, mod.exports, global);
} catch (e) {
  console.error('❌ data.js فيه خطأ برمجي — صلّحه أولاً ثم أعد المحاولة:');
  console.error('   ' + e.message);
  process.exit(1);
}
const X = mod.exports;

const GROUPS = [
  { key: 'paintings', ar: X.paintingsArabic, en: X.paintingsEnglish },
  { key: 'cups',      ar: X.cupsArabic,      en: X.cupsEnglish },
  { key: 'prints3d',  ar: X.prints3dArabic,  en: X.prints3dEnglish },
  { key: 'frames',    ar: X.framesArabic,    en: X.framesEnglish },
  { key: 'gifts',     ar: X.giftsArabic,     en: X.giftsEnglish },
];

// الحقول البسيطة التي تذهب للـ CSV
const SIMPLE = new Set([
  'id', 'name', 'price', 'shortDesc', 'fullDesc', 'description',
  'image', 'category', 'hasSizes',
]);

function csvCell(v) {
  if (v === undefined || v === null) v = '';
  v = String(v);
  return /[",\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
}

const header = [
  'group', 'id', 'category', 'price_ar', 'price_en', 'hasSizes', 'image',
  'name_ar', 'name_en',
  'shortDesc_ar', 'shortDesc_en',
  'fullDesc_ar', 'fullDesc_en',
];
const rows = [header.join(',')];
const advanced = {};

let totalProducts = 0;
const report = { added: [], complex: [], priceDiffLangs: [] };

for (const g of GROUPS) {
  const enById = new Map((g.en || []).map((p) => [p.id, p]));
  const seenIds = new Set();

  for (const ar of (g.ar || [])) {
    const en = enById.get(ar.id) || {};
    totalProducts++;
    seenIds.add(ar.id);

    const arShort = ar.shortDesc !== undefined ? ar.shortDesc
                  : (ar.description !== undefined ? ar.description : '');
    const arFull  = ar.fullDesc !== undefined ? ar.fullDesc
                  : (ar.description !== undefined ? ar.description : '');
    const enShort = en.shortDesc !== undefined ? en.shortDesc
                  : (en.description !== undefined ? en.description : '');
    const enFull  = en.fullDesc !== undefined ? en.fullDesc
                  : (en.description !== undefined ? en.description : '');

    const priceAr = ar.price !== undefined ? ar.price : (en.price !== undefined ? en.price : 0);
    const priceEn = en.price !== undefined ? en.price : (ar.price !== undefined ? ar.price : 0);
    if (priceAr !== priceEn) report.priceDiffLangs.push(`${g.key}:${ar.id}`);

    rows.push([
      g.key,
      ar.id,
      ar.category || en.category || '',
      priceAr,
      priceEn,
      (ar.hasSizes || en.hasSizes) ? 'true' : 'false',
      ar.image || en.image || '',
      csvCell(ar.name),
      csvCell(en.name),
      csvCell(arShort),
      csvCell(enShort),
      csvCell(arFull),
      csvCell(enFull),
    ].join(','));

    // الحقول المعقّدة (colors / variants / requiresXxx ...)
    const adv = {};
    for (const [k, v] of Object.entries(ar)) {
      if (!SIMPLE.has(k)) { adv.ar = adv.ar || {}; adv.ar[k] = v; }
    }
    for (const [k, v] of Object.entries(en)) {
      if (!SIMPLE.has(k)) { adv.en = adv.en || {}; adv.en[k] = v; }
    }
    if (Object.keys(adv).length > 0) {
      advanced[`${g.key}:${ar.id}`] = adv;
      report.complex.push(`${g.key}:${ar.id}`);
    }
  }

  // منتجات موجودة بالإنجليزي وغير موجودة بالعربي (نادر، لكن نلتقطه)
  for (const en of (g.en || [])) {
    if (!seenIds.has(en.id)) {
      report.added.push(`${g.key}:${en.id} (إنجليزي فقط — تحقّق منه)`);
    }
  }
}

// --- نقارن مع products.csv القديم لكشف الإضافات/الحذف ---
function parseCSV(text) {
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  const out = []; let row = [], f = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true;
    else if (c === ',') { row.push(f); f = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; if (f !== '' || row.length) { row.push(f); out.push(row); } row = []; f = ''; }
    else f += c;
  }
  if (f !== '' || row.length) { row.push(f); out.push(row); }
  return out;
}

const oldCsvPath = path.join(DIR, 'products.csv');
let oldIds = new Set();
if (fs.existsSync(oldCsvPath)) {
  const M = parseCSV(fs.readFileSync(oldCsvPath, 'utf8'));
  const h = M[0].map((s) => s.trim());
  const gi = h.indexOf('group'), ii = h.indexOf('id');
  for (let r = 1; r < M.length; r++) {
    if (M[r][ii]) oldIds.add(M[r][gi] + ':' + M[r][ii].trim());
  }
}
const newIds = new Set();
for (const g of GROUPS) for (const p of (g.ar || [])) newIds.add(g.key + ':' + p.id);
for (const k of newIds) if (!oldIds.has(k)) report.added.push(k + ' (منتج جديد)');
const removed = [...oldIds].filter((k) => !newIds.has(k));

// --- نكتب الملفات المتزامنة (بأسماء جديدة للأمان) ---
fs.writeFileSync(path.join(DIR, 'products.SYNCED.csv'),
  '\uFEFF' + rows.join('\n'), 'utf8');
fs.writeFileSync(path.join(DIR, '_advanced.SYNCED.json'),
  JSON.stringify(advanced, null, 2), 'utf8');

// --- التقرير ---
console.log('═══════════════════════════════════════════');
console.log('✅ تمت المزامنة العكسية بنجاح');
console.log('═══════════════════════════════════════════');
console.log(`المنتجات الكلية: ${totalProducts}`);
console.log(`منتجات بألوان/variants: ${report.complex.length}`);
if (report.added.length)
  console.log(`🆕 منتجات جديدة (${report.added.length}): ${report.added.join(', ')}`);
if (removed.length)
  console.log(`🗑️  منتجات محذوفة (${removed.length}): ${removed.join(', ')}`);
if (report.priceDiffLangs.length)
  console.log(`💲 أسعار مختلفة بين العربي/الإنجليزي: ${report.priceDiffLangs.join(', ')}`);
console.log('───────────────────────────────────────────');
console.log('📄 products.SYNCED.csv     ← قارنه بـ products.csv ثم استبدله');
console.log('📦 _advanced.SYNCED.json   ← قارنه بـ _advanced.json ثم استبدله');
console.log('───────────────────────────────────────────');
console.log('بعد ما تتأكد إنهم صح: احذف كلمة .SYNCED من الاسمين،');
console.log('وبهيك يرجع النظام متزامن وتكمّل بالطريقة الأوتوماتيكية.');
console.log('═══════════════════════════════════════════');
