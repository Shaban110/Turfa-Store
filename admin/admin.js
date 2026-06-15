// ====================================================
// 🟢 عدّل سطر المفتاح فقط:
// ====================================================
const SUPABASE_URL = "https://fneboifhuwrhkmdtjswh.supabase.co";
const SUPABASE_KEY = "sb_publishable_e_-aX1xnWnfGJXWvPbObcg_Dbt6vTNr";
// ====================================================

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const $ = id => document.getElementById(id);
const catNames = { painting:'لوحات', cup:'كاسات', print3d:'طباعات 3D', frame:'براويز', gift:'هدايا منوعة' };
const esc = s => String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
// إصلاح ظهور الصور: نبني المسار من جذر الموقع (اللوحة جوّا مجلد /admin)
const imgURL = p => { p=String(p||'').trim(); if(!p) return ''; if(/^https?:\/\//.test(p)||p.startsWith('/')) return p; return '/'+p; };
let allProducts = [];
let currentId = null;
let reorderMode = false;

// ---------- الدخول ----------
async function doLogin(){
  const email=$('email').value.trim(), password=$('password').value;
  if(!email||!password){ msg('loginMsg','عبّي البريد وكلمة المرور.','err'); return; }
  $('loginBtn').disabled=true; $('loginBtn').textContent='جاري الدخول...';
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  $('loginBtn').disabled=false; $('loginBtn').textContent='تسجيل الدخول';
  if(error){ msg('loginMsg','البريد أو كلمة المرور غير صحيحة.','err'); return; }
  enterDashboard(data.user);
}
async function doLogout(){
  await client.auth.signOut();
  $('dashView').style.display='none';
  $('loginWrap').style.display='flex';
  $('password').value='';
}
function enterDashboard(user){
  $('loginWrap').style.display='none';
  $('dashView').style.display='block';
  $('who').textContent=user.email;
  loadProducts();
}

// ---------- تحميل المنتجات ----------
async function loadProducts(){
  $('listLoading').style.display='block';
  const { data, error } = await client.from('products').select('*').order('sort_order');
  $('listLoading').style.display='none';
  if(error){ alert('خطأ في تحميل المنتجات: '+error.message); return; }
  allProducts = data;
  renderGrid(allProducts);
}
// الصورة المعروضة: أول صورة بأول لون، أو أول variant، وإلا main_image
function listThumb(p){
  if(Array.isArray(p.colors)&&p.colors[0]&&p.colors[0].images&&p.colors[0].images[0]) return p.colors[0].images[0];
  if(Array.isArray(p.variants)&&p.variants[0]&&p.variants[0].images&&p.variants[0].images[0]) return p.variants[0].images[0];
  return p.main_image||'';
}
function optCount(p){
  const c=Array.isArray(p.colors)?p.colors.length:0;
  const v=Array.isArray(p.variants)?p.variants.length:0;
  if(v) return v+' خيارات';
  if(c) return c+' ألوان';
  return '';
}
function renderGrid(list){
  $('count').textContent = list.length + ' منتج';
  $('prodGrid').innerHTML = list.map((p,i) =>
    '<div class="card" data-id="'+p.id+'" data-i="'+i+'">'
    + (p.is_active ? '' : '<span class="badge-hidden">مخفي</span>')
    + (optCount(p) ? '<span class="badge-opts">'+optCount(p)+'</span>' : '')
    + '<div class="move-col">'
    +   '<button class="btn btn-ghost btn-mini mv-up" type="button" title="فوق">▲</button>'
    +   '<button class="btn btn-ghost btn-mini mv-down" type="button" title="تحت">▼</button>'
    + '</div>'
    + '<div class="thumb"><img src="'+esc(imgURL(listThumb(p)))+'" alt="" onerror="this.style.visibility=\'hidden\'"></div>'
    + '<div class="body"><div class="nm">'+esc(p.name_ar||'(بدون اسم)')+'</div>'
    + '<div class="meta"><span class="pill cat">'+(catNames[p.category]||esc(p.category))+'</span>'
    + '<span class="pill price">'+p.price+' د.أ</span></div></div>'
    + '</div>'
  ).join('');
  document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('click', e=>{
      if(reorderMode || e.target.closest('.move-col')) return;
      openEdit(parseInt(card.dataset.id));
    });
  });
  document.querySelectorAll('.mv-up').forEach(btn=>btn.addEventListener('click',()=>moveCard(btn,-1)));
  document.querySelectorAll('.mv-down').forEach(btn=>btn.addEventListener('click',()=>moveCard(btn,1)));
}
$('searchBox').addEventListener('input', e=>{
  const q=e.target.value.toLowerCase().trim();
  renderGrid(!q ? allProducts : allProducts.filter(p=>
    (p.name_ar||'').toLowerCase().includes(q) || (p.name_en||'').toLowerCase().includes(q)));
});

// ---------- الترتيب ----------
function toggleReorder(){
  reorderMode = !reorderMode;
  document.body.classList.toggle('reordering', reorderMode);
  $('reorderHint').classList.toggle('show', reorderMode);
  $('searchBox').value=''; renderGrid(allProducts);
  $('reorderBtn').textContent = reorderMode ? '💾 حفظ الترتيب' : '↕ تغيير الترتيب';
  if(!reorderMode) saveOrder();
}
function moveCard(btn, dir){
  const card=btn.closest('.card');
  const i=parseInt(card.dataset.i); const j=i+dir;
  if(j<0||j>=allProducts.length) return;
  const tmp=allProducts[i]; allProducts[i]=allProducts[j]; allProducts[j]=tmp;
  renderGrid(allProducts);
}
async function saveOrder(){
  let ok=true;
  for(let idx=0; idx<allProducts.length; idx++){
    const { error } = await client.from('products').update({ sort_order:idx }).eq('id', allProducts[idx].id);
    if(error){ ok=false; break; }
  }
  allProducts.forEach((p,idx)=>p.sort_order=idx);
  alert(ok ? '✅ تم حفظ الترتيب الجديد. سيظهر على الموقع الآن.' : '⚠️ صار خطأ أثناء حفظ الترتيب.');
}

// ---------- صفوف الصور ----------
function imageRow(path, container){
  const div=document.createElement('div');
  div.className='img-row';
  div.innerHTML =
    '<img src="'+esc(imgURL(path))+'" onerror="this.style.visibility=\'hidden\'">'
    + '<span class="idx"></span>'
    + '<input class="img-path" value="'+esc(path)+'" placeholder="images/...">'
    + '<div class="moves">'
    +   '<button class="btn btn-ghost btn-mini" type="button" onclick="moveImg(this,-1)">▲</button>'
    +   '<button class="btn btn-ghost btn-mini" type="button" onclick="moveImg(this,1)">▼</button>'
    + '</div>'
    + '<button class="btn btn-out btn-mini" type="button" onclick="this.closest(\'.img-row\').remove();renumber()">حذف</button>';
  container.appendChild(div);
  const inp=div.querySelector('.img-path');
  inp.addEventListener('input',()=>{ const im=div.querySelector('img'); im.src=imgURL(inp.value); im.style.visibility='visible'; });
  return div;
}
function renumber(){
  document.querySelectorAll('.img-rows').forEach(rows=>{
    [...rows.querySelectorAll('.img-row')].forEach((r,i)=>{
      r.querySelector('.idx').innerHTML = i===0 ? '<span class="main-tag">أساسية</span>' : (i+1);
    });
  });
}
window.moveImg=function(btn,dir){
  const row=btn.closest('.img-row'); const rows=row.parentNode;
  const items=[...rows.querySelectorAll('.img-row')]; const i=items.indexOf(row); const j=i+dir;
  if(j<0||j>=items.length) return;
  if(dir<0) rows.insertBefore(row, items[j]); else rows.insertBefore(items[j], row);
  renumber();
};
function buildImageRows(container, paths){
  container.innerHTML='';
  (paths||[]).forEach(p=>imageRow(p, container));
  const add=document.createElement('button');
  add.type='button'; add.className='btn btn-ghost btn-sm add-img'; add.textContent='+ إضافة صورة';
  add.onclick=()=>{ imageRow('', container); container.appendChild(add); renumber(); };
  container.appendChild(add);
  renumber();
}
function collectImageRows(container){
  return [...container.querySelectorAll('.img-row .img-path')].map(i=>i.value.trim()).filter(Boolean);
}

// ---------- بلوك لون ----------
function colorBlock(c){
  c = c||{name_ar:'',name_en:'',hex:'#cccccc',images:[]};
  const div=document.createElement('div');
  div.className='block color-block';
  div.innerHTML =
    '<button class="btn btn-out btn-sm rm" type="button" onclick="this.parentNode.remove()">حذف اللون</button>'
    + '<div class="grid2"><div><label>اسم اللون (عربي)</label><input class="c_name_ar" value="'+esc(c.name_ar)+'"></div>'
    + '<div><label>اسم اللون (إنجليزي)</label><input class="c_name_en" value="'+esc(c.name_en)+'"></div></div>'
    + '<label>كود اللون</label><div class="hex-row"><input type="color" class="c_hex_picker" value="'+(c.hex||'#cccccc')+'" oninput="this.closest(\'.color-block\').querySelector(\'.c_hex\').value=this.value">'
    + '<input class="c_hex" value="'+esc(c.hex)+'" placeholder="#e8a0b0"></div>'
    + '<label>صور اللون</label><div class="img-rows c_images"></div>';
  $('colorsWrap').appendChild(div);
  buildImageRows(div.querySelector('.c_images'), c.images);
}
// ---------- بلوك variant ----------
function variantBlock(v){
  v = v||{name_ar:'',name_en:'',price_diff:0,images:[],short_desc_ar:'',short_desc_en:'',full_desc_ar:'',full_desc_en:''};
  const div=document.createElement('div');
  div.className='block variant-block';
  if(v.requires_custom_text!==undefined) div.dataset.rct = JSON.stringify(v.requires_custom_text);
  div.innerHTML =
    '<button class="btn btn-out btn-sm rm" type="button" onclick="this.parentNode.remove()">حذف الخيار</button>'
    + '<div class="grid2"><div><label>الاسم (عربي)</label><input class="v_name_ar" value="'+esc(v.name_ar)+'"></div>'
    + '<div><label>الاسم (إنجليزي)</label><input class="v_name_en" value="'+esc(v.name_en)+'"></div></div>'
    + '<label>فرق السعر عن الأساسي (د.أ)</label><input type="number" step="0.01" class="v_price_diff" value="'+(Number(v.price_diff)||0)+'">'
    + '<label>صور الخيار</label><div class="img-rows v_images"></div>'
    + '<div class="grid2"><div><label>وصف قصير (عربي)</label><textarea class="v_short_ar">'+esc(v.short_desc_ar)+'</textarea></div>'
    + '<div><label>وصف قصير (إنجليزي)</label><textarea class="v_short_en">'+esc(v.short_desc_en)+'</textarea></div></div>'
    + '<div class="grid2"><div><label>وصف كامل (عربي)</label><textarea class="v_full_ar">'+esc(v.full_desc_ar)+'</textarea></div>'
    + '<div><label>وصف كامل (إنجليزي)</label><textarea class="v_full_en">'+esc(v.full_desc_en)+'</textarea></div></div>';
  $('variantsWrap').appendChild(div);
  buildImageRows(div.querySelector('.v_images'), v.images);
}

// ---------- إضافة منتج جديد ----------
function openNew(){
  currentId = null; // null = منتج جديد
  $('editTitle').textContent = 'إضافة منتج جديد';
  $('f_name_ar').value='';
  $('f_name_en').value='';
  $('f_price').value=0;
  $('f_category').value='painting';
  $('f_short_ar').value='';
  $('f_short_en').value='';
  $('f_full_ar').value='';
  $('f_full_en').value='';
  $('f_active').checked=true;
  buildImageRows($('mainImageRows'), []);
  $('colorsWrap').innerHTML='';
  $('variantsWrap').innerHTML='';
  $('deleteBtn').style.display='none'; // ما في إشي نحذفه بمنتج جديد
  $('editMsg').className='msg';
  $('listView').style.display='none';
  $('editView').style.display='block';
  document.body.classList.add('editing');
  window.scrollTo(0,0);
}

// ---------- فتح التعديل ----------
function openEdit(id){
  const p = allProducts.find(x=>x.id===id);
  if(!p) return;
  currentId = id;
  $('editTitle').textContent = 'تعديل: ' + (p.name_ar||'');
  $('f_name_ar').value = p.name_ar||'';
  $('f_name_en').value = p.name_en||'';
  $('f_price').value = p.price != null ? p.price : 0;
  $('f_category').value = p.category||'painting';
  $('f_short_ar').value = p.short_desc_ar||'';
  $('f_short_en').value = p.short_desc_en||'';
  $('f_full_ar').value = p.full_desc_ar||'';
  $('f_full_en').value = p.full_desc_en||'';
  $('f_active').checked = !!p.is_active;
  $('deleteBtn').style.display='block';
  buildImageRows($('mainImageRows'), (Array.isArray(p.images)&&p.images.length) ? p.images : (p.main_image ? [p.main_image] : []));
  $('colorsWrap').innerHTML='';
  (Array.isArray(p.colors)?p.colors:[]).forEach(c=>colorBlock(c));
  $('variantsWrap').innerHTML='';
  (Array.isArray(p.variants)?p.variants:[]).forEach(v=>variantBlock(v));
  $('editMsg').className='msg';
  $('listView').style.display='none';
  $('editView').style.display='block';
  document.body.classList.add('editing');
  window.scrollTo(0,0);
}
function backToList(){
  $('editView').style.display='none';
  $('listView').style.display='block';
  document.body.classList.remove('editing');
  currentId=null;
  window.scrollTo(0,0);
}

// ---------- جمع البيانات ----------
function collectColors(){
  return [...document.querySelectorAll('.color-block')].map(b=>({
    name_ar: b.querySelector('.c_name_ar').value.trim(),
    name_en: b.querySelector('.c_name_en').value.trim(),
    hex: b.querySelector('.c_hex').value.trim(),
    images: collectImageRows(b.querySelector('.c_images'))
  }));
}
function collectVariants(){
  return [...document.querySelectorAll('.variant-block')].map(b=>{
    const o={
      name_ar: b.querySelector('.v_name_ar').value.trim(),
      name_en: b.querySelector('.v_name_en').value.trim(),
      price_diff: parseFloat(b.querySelector('.v_price_diff').value)||0,
      images: collectImageRows(b.querySelector('.v_images')),
      short_desc_ar: b.querySelector('.v_short_ar').value.trim(),
      short_desc_en: b.querySelector('.v_short_en').value.trim(),
      full_desc_ar: b.querySelector('.v_full_ar').value.trim(),
      full_desc_en: b.querySelector('.v_full_en').value.trim()
    };
    if(b.dataset.rct!==undefined){ try{ o.requires_custom_text=JSON.parse(b.dataset.rct); }catch(e){} }
    return o;
  });
}

// ---------- حفظ ----------
async function saveProduct(){
  const colors = collectColors();
  const variants = collectVariants();
  const mainImgs = collectImageRows($('mainImageRows'));
  let main = '';
  if(colors[0] && colors[0].images[0]) main = colors[0].images[0];
  else if(variants[0] && variants[0].images[0]) main = variants[0].images[0];
  else main = mainImgs[0] || '';
  // معرض الصور: للمنتجات البسيطة = كل الصور؛ للي إلها ألوان/خيارات = الرئيسية فقط (المعرض يجي منهم)
  const images = (colors.length || variants.length) ? (main ? [main] : []) : mainImgs;

  const data = {
    name_ar: $('f_name_ar').value.trim(),
    name_en: $('f_name_en').value.trim(),
    price: parseFloat($('f_price').value)||0,
    category: $('f_category').value,
    short_desc_ar: $('f_short_ar').value.trim(),
    short_desc_en: $('f_short_en').value.trim(),
    full_desc_ar: $('f_full_ar').value.trim(),
    full_desc_en: $('f_full_en').value.trim(),
    main_image: main,
    images: images,
    colors: colors,
    variants: variants,
    is_active: $('f_active').checked,
    updated_at: new Date().toISOString()
  };

  if(!data.name_ar){ msg('editMsg','لازم تحط على الأقل الاسم بالعربي.','err'); return; }

  $('saveBtn').disabled=true; $('saveBtn').textContent='جاري الحفظ...';

  if(currentId==null){
    // منتج جديد: نحسب ID جديد + ترتيب جديد
    const newId = (allProducts.reduce((m,p)=>Math.max(m, Number(p.id)||0), 0)) + 1;
    data.id = newId;
    data.sort_order = allProducts.length;
    const { error } = await client.from('products').insert(data);
    $('saveBtn').disabled=false; $('saveBtn').textContent='حفظ التغييرات';
    if(error){ msg('editMsg','خطأ في الإضافة: '+error.message,'err'); return; }
    allProducts.push(data);
    currentId = newId;
    $('deleteBtn').style.display='block';
    $('editTitle').textContent='تعديل: '+data.name_ar;
    msg('editMsg','تمت إضافة المنتج بنجاح! (رقم '+newId+') وهو ظاهر على الموقع الآن.','ok');
  } else {
    // تعديل موجود
    const { error } = await client.from('products').update(data).eq('id', currentId);
    $('saveBtn').disabled=false; $('saveBtn').textContent='حفظ التغييرات';
    if(error){ msg('editMsg','خطأ في الحفظ: '+error.message,'err'); return; }
    Object.assign(allProducts.find(p=>p.id===currentId), data);
    msg('editMsg','تم الحفظ بنجاح! التغيير ظاهر على الموقع الآن.','ok');
  }
}

// ---------- حذف ----------
async function deleteProduct(){
  if(currentId==null) return;
  const p = allProducts.find(x=>x.id===currentId);
  if(!confirm('متأكد إنك بدك تحذف "'+(p?p.name_ar:'')+'"؟ ما في تراجع عن الحذف.')) return;
  $('deleteBtn').disabled=true; $('deleteBtn').textContent='جاري الحذف...';
  const { error } = await client.from('products').delete().eq('id', currentId);
  $('deleteBtn').disabled=false; $('deleteBtn').textContent='🗑 حذف المنتج';
  if(error){ msg('editMsg','خطأ في الحذف: '+error.message,'err'); return; }
  allProducts = allProducts.filter(x=>x.id!==currentId);
  backToList();
  renderGrid(allProducts);
}

function msg(elId,text,type){ const el=$(elId); el.textContent=text; el.className='msg show '+type; }

// ---------- ربط الأزرار ----------
$('loginBtn').addEventListener('click', doLogin);
$('password').addEventListener('keydown', e=>{ if(e.key==='Enter') doLogin(); });
$('logoutBtn').addEventListener('click', doLogout);
$('backBtn').addEventListener('click', backToList);
$('fabBack').addEventListener('click', backToList);
$('cancelBtn').addEventListener('click', backToList);
$('saveBtn').addEventListener('click', saveProduct);
$('deleteBtn').addEventListener('click', deleteProduct);
$('addProductBtn').addEventListener('click', openNew);
$('addColorBtn').addEventListener('click', ()=>colorBlock());
$('addVariantBtn').addEventListener('click', ()=>variantBlock());
$('reorderBtn').addEventListener('click', toggleReorder);

(async()=>{ const {data}=await client.auth.getSession(); if(data.session) enterDashboard(data.session.user); })();