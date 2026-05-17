// =================================================================
// 🔄 build-data.js
// -----------------------------------------------------------------
// يقرأ products.csv (+ _advanced.json) ويبني data.js كامل وشغّال.
//
// كل ما تعدّل النصوص بالـ CSV، شغّل:
//   node build-data.js
//
// السكربت:
//   • يحافظ على قسم الإعدادات/الترجمة في data.js حرفياً (ما يلمسه)
//   • يستبدل فقط قسم المنتجات (paintingsEnglish ... allProductsArabic)
//   • يدمج الألوان/الـ variants من _advanced.json تلقائياً
//   • يعمل نسخة احتياطية data.js.bak قبل أي كتابة
// =================================================================

const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const DATA_JS = path.join(DIR, 'data.js');
const CSV = path.join(DIR, 'products.csv');
const ADV = path.join(DIR, '_advanced.json');

// مرسى البداية/النهاية لقسم المنتجات داخل data.js
const START_MARKER = 'const paintingsEnglish = [';
const END_MARKER_RE = /let allProductsArabic = \[[^\]]*\];/;

// --- 1. parser بسيط وصحيح لـ CSV (RFC 4180) ---
function parseCSV(text) {
  // نشيل BOM لو موجود
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else { inQuotes = false; }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      // نتجاهل الأسطر الفاضية تماماً
      if (field !== '' || row.length > 0) { row.push(field); rows.push(row); }
      row = []; field = '';
    } else {
      field += c;
    }
  }
  if (field !== '' || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

// --- 2. نقرأ الـ CSV ونحوّله لكائنات ---
const csvText = fs.readFileSync(CSV, 'utf8');
const matrix = parseCSV(csvText);
if (matrix.length < 2) {
  console.error('❌ الـ CSV فاضي أو ما فيه بيانات.');
  process.exit(1);
}
const header = matrix[0].map((h) => h.trim());
const need = ['group', 'id', 'category', 'price_ar', 'price_en', 'hasSizes', 'image',
  'name_ar', 'name_en', 'shortDesc_ar', 'shortDesc_en',
  'fullDesc_ar', 'fullDesc_en'];
for (const col of need) {
  if (!header.includes(col)) {
    console.error('❌ عمود ناقص في الـ CSV: ' + col);
    process.exit(1);
  }
}
const idx = {};
header.forEach((h, i) => { idx[h] = i; });

const records = [];
for (let r = 1; r < matrix.length; r++) {
  const cells = matrix[r];
  if (cells.every((c) => c.trim() === '')) continue; // سطر فاضي
  records.push({
    group: (cells[idx.group] || '').trim(),
    id: Number((cells[idx.id] || '').trim()),
    category: (cells[idx.category] || '').trim(),
    price_ar: Number((cells[idx.price_ar] || '0').trim()),
    price_en: Number((cells[idx.price_en] || '0').trim()),
    hasSizes: (cells[idx.hasSizes] || 'false').trim().toLowerCase() === 'true',
    image: (cells[idx.image] || '').trim(),
    name_ar: cells[idx.name_ar] || '',
    name_en: cells[idx.name_en] || '',
    shortDesc_ar: cells[idx.shortDesc_ar] || '',
    shortDesc_en: cells[idx.shortDesc_en] || '',
    fullDesc_ar: cells[idx.fullDesc_ar] || '',
    fullDesc_en: cells[idx.fullDesc_en] || '',
  });
}

// --- 3. نقرأ الحقول المعقدة ---
let advanced = {};
if (fs.existsSync(ADV)) {
  advanced = JSON.parse(fs.readFileSync(ADV, 'utf8'));
}

// --- 4. نبني مصفوفات JS منسّقة ---
const GROUP_ORDER = ['paintings', 'cups', 'prints3d', 'frames', 'gifts'];
const GROUP_VARNAME = {
  paintings: 'paintings', cups: 'cups', prints3d: 'prints3d',
  frames: 'frames', gifts: 'gifts',
};

// نجمّع السجلات حسب الفئة مع الحفاظ على ترتيب ظهورها بالـ CSV
const byGroup = {};
for (const g of GROUP_ORDER) byGroup[g] = [];
for (const rec of records) {
  if (!byGroup[rec.group]) {
    console.error('⚠️  فئة غير معروفة في الـ CSV: "' + rec.group +
      '" (المسموح: ' + GROUP_ORDER.join(', ') + ') — تم تخطّي السطر.');
    continue;
  }
  byGroup[rec.group].push(rec);
}

// JSON.stringify بيتكفّل بكل الـ escaping (علامات اقتباس، أسطر جديدة، يونيكود)
function jstr(v) { return JSON.stringify(v); }

// يبني كائن منتج واحد للغة معيّنة، ويدمج الحقول المعقدة لو وُجدت
function buildProduct(rec, lang) {
  const name = lang === 'ar' ? rec.name_ar : rec.name_en;
  const shortDesc = lang === 'ar' ? rec.shortDesc_ar : rec.shortDesc_en;
  const fullDesc = lang === 'ar' ? rec.fullDesc_ar : rec.fullDesc_en;
  const price = lang === 'ar' ? rec.price_ar : rec.price_en;

  const obj = {
    id: rec.id,
    name: name,
    price: price,
    shortDesc: shortDesc,
    fullDesc: fullDesc,
    image: rec.image,
    category: rec.category,
  };

  // hasSizes ييجي من عمود الـ CSV
  obj.hasSizes = rec.hasSizes;

  // الحقول المعقدة (colors / variants / requiresWeddingForm ...)
  const advKey = `${rec.group}:${rec.id}`;
  const adv = advanced[advKey];
  const extra = adv && adv[lang] ? adv[lang] : null;

  // نضيف باقي الحقول المتقدمة كما هي (ما عدا hasSizes — مصدرها الـ CSV)
  if (extra) {
    for (const [k, v] of Object.entries(extra)) {
      if (k === 'hasSizes') continue;
      obj[k] = v;
    }
  }

  // نطبع الكائن بصيغة JS مقروءة (سطر واحد للمنتجات البسيطة)
  const hasComplex = obj.colors || obj.variants;
  if (!hasComplex) {
    const parts = [
      `id: ${obj.id}`,
      `name: ${jstr(obj.name)}`,
      `price: ${obj.price}`,
      `shortDesc: ${jstr(obj.shortDesc)}`,
      `fullDesc: ${jstr(obj.fullDesc)}`,
      `image: ${jstr(obj.image)}`,
      `category: ${jstr(obj.category)}`,
      `hasSizes: ${obj.hasSizes}`,
    ];
    for (const [k, v] of Object.entries(obj)) {
      if (['id', 'name', 'price', 'shortDesc', 'fullDesc',
        'image', 'category', 'hasSizes'].includes(k)) continue;
      parts.push(`${k}: ${jstr(v)}`);
    }
    return `    { ${parts.join(', ')} }`;
  }

  // منتج معقّد: نطبعه متعدّد الأسطر مع المحافظة على الحقول المتداخلة
  const lines = [];
  lines.push('    {');
  lines.push(`        id: ${obj.id},`);
  lines.push(`        name: ${jstr(obj.name)},`);
  lines.push(`        price: ${obj.price},`);
  lines.push(`        shortDesc: ${jstr(obj.shortDesc)},`);
  lines.push(`        fullDesc: ${jstr(obj.fullDesc)},`);
  lines.push(`        image: ${jstr(obj.image)},`);
  lines.push(`        category: ${jstr(obj.category)},`);
  lines.push(`        hasSizes: ${obj.hasSizes},`);
  for (const [k, v] of Object.entries(obj)) {
    if (['id', 'name', 'price', 'shortDesc', 'fullDesc',
      'image', 'category', 'hasSizes'].includes(k)) continue;
    // نطبع الحقول المعقدة بـ JSON منسّق ومُزاح
    const json = JSON.stringify(v, null, 2)
      .split('\n')
      .map((ln, i) => (i === 0 ? ln : '        ' + ln))
      .join('\n');
    lines.push(`        ${k}: ${json},`);
  }
  lines.push('    }');
  return lines.join('\n');
}

function buildArray(varName, group, lang) {
  const list = byGroup[group];
  const items = list.map((rec) => buildProduct(rec, lang));
  return `const ${varName}${lang === 'ar' ? 'Arabic' : 'English'} = [\n` +
    items.join(',\n') + '\n];';
}

const blocks = [];
blocks.push('// =================================================================');
blocks.push('// --- 2. PRODUCT DATA ---');
blocks.push('// 🟢 هذا القسم مُولّد تلقائياً من products.csv — لا تعدّله يدوياً!');
blocks.push('//    عدّل products.csv ثم شغّل: node build-data.js');
blocks.push('// =================================================================');
blocks.push('');

for (const g of GROUP_ORDER) {
  blocks.push(buildArray(GROUP_VARNAME[g], g, 'en'));
  blocks.push('');
  blocks.push(buildArray(GROUP_VARNAME[g], g, 'ar'));
  blocks.push('');
}

blocks.push('let allProductsEnglish = [...paintingsEnglish, ...cupsEnglish, ' +
  '...prints3dEnglish, ...framesEnglish, ...giftsEnglish];');
blocks.push('let allProductsArabic = [...paintingsArabic, ...cupsArabic, ' +
  '...prints3dArabic, ...framesArabic, ...giftsArabic];');

const newProductSection = blocks.join('\n');

// --- 5. ندمج مع data.js الحالي مع الحفاظ على قسم الترجمة ---
let original = fs.readFileSync(DATA_JS, 'utf8');
const usesCRLF = original.includes('\r\n');
const normalized = original.replace(/\r\n/g, '\n');

const startIdx = normalized.indexOf(START_MARKER);
if (startIdx === -1) {
  console.error('❌ ما لقيت بداية قسم المنتجات في data.js');
  process.exit(1);
}
// نرجع لورا لأقرب سطر تعليق "--- 2. PRODUCT DATA ---" لو موجود
let realStart = startIdx;
const pdMarker = normalized.lastIndexOf('// =====', startIdx);
const pd2 = normalized.lastIndexOf('--- 2. PRODUCT DATA ---', startIdx);
if (pd2 !== -1) {
  // نرجع لبداية بلوك التعليق
  const lineStart = normalized.lastIndexOf('// ===', pd2);
  if (lineStart !== -1) realStart = lineStart;
}

const endMatch = normalized.match(END_MARKER_RE);
if (!endMatch) {
  console.error('❌ ما لقيت نهاية قسم المنتجات (allProductsArabic) في data.js');
  process.exit(1);
}
const endIdx = endMatch.index + endMatch[0].length;

const head = normalized.slice(0, realStart);
const tail = normalized.slice(endIdx);

let rebuilt = head + newProductSection + tail;
if (usesCRLF) rebuilt = rebuilt.replace(/\n/g, '\r\n');

// --- 6. نتحقق إنه data.js الجديد صالح قبل ما نكتبه ---
try {
  global.document = { addEventListener() {}, getElementById() { return null; } };
  global.window = {};
  const m = { exports: {} };
  new Function('module', 'exports', 'global',
    rebuilt.replace(/\r/g, '') +
    '\n;module.exports={allProductsArabic,allProductsEnglish};'
  )(m, m.exports, global);
  const a = m.exports.allProductsArabic.length;
  const e = m.exports.allProductsEnglish.length;
  if (a !== e) {
    console.error(`❌ عدد المنتجات مش متطابق: عربي ${a} / إنجليزي ${e}`);
    process.exit(1);
  }
  // نسخة احتياطية ثم الكتابة
  fs.copyFileSync(DATA_JS, DATA_JS + '.bak');
  fs.writeFileSync(DATA_JS, rebuilt, 'utf8');
  console.log(`✅ تم بناء data.js بنجاح — ${a} منتج بكل لغة`);
  console.log('   💾 نسخة احتياطية: data.js.bak');
} catch (err) {
  console.error('❌ data.js الناتج فيه خطأ برمجي — ما تم حفظ أي شي:');
  console.error('   ' + err.message);
  process.exit(1);
}
