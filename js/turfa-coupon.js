// =================================================================
// 🎟️ turfa-coupon.js — كوبونات الخصم (نسبة مئوية على السلة)
// يعتمد على: TURFA_SUPABASE_URL / TURFA_SUPABASE_KEY (من turfa-supabase.js)
//            cart, currentLang, formatPrice, renderCheckoutSummary (من باقي الموقع)
// =================================================================

(function () {
  if (typeof supabase === 'undefined') { console.warn('Supabase غير محمّل — الكوبونات معطّلة'); return; }
  const couponClient = supabase.createClient(TURFA_SUPABASE_URL, TURFA_SUPABASE_KEY);

  // الحالة العامة (متاحة للموقع كله)
  window.appliedCoupon = null;

  // مجموع المنتجات الحالي (بدون شحن)
  function cartSubtotal() {
    return (typeof cart !== 'undefined' ? cart : []).reduce((s, i) => s + i.price * i.quantity, 0);
  }

  // حساب قيمة الخصم حسب الكوبون المطبّق
  window.getCouponDiscount = function (subtotal) {
    const c = window.appliedCoupon;
    if (!c) return 0;
    if (subtotal < (c.min_order || 0)) return 0;       // أقل من الحد الأدنى => لا خصم
    let d = subtotal * (c.percent / 100);
    if (c.max_discount && d > c.max_discount) d = c.max_discount; // حد أقصى للخصم
    return Math.round(d * 100) / 100;
  };

  function setMsg(text, type) {
    const el = document.getElementById('checkoutCouponMsg');
    if (!el) return;
    el.textContent = text;
    el.className = 'checkout-coupon-msg ' + (type || '');
  }

  function refreshSummary() {
    if (typeof renderCheckoutSummary === 'function') renderCheckoutSummary();
  }

  // تطبيق الكوبون
  async function applyCoupon() {
    const input = document.getElementById('checkoutCouponCode');
    const btn = document.getElementById('checkoutCouponApplyBtn');
    if (!input) return;
    const code = input.value.trim();
    const ar = (typeof currentLang === 'undefined' || currentLang === 'ar');

    // لو في كوبون مطبّق مسبقاً => هذا الزر يلغيه
    if (window.appliedCoupon) {
      window.appliedCoupon = null;
      input.value = '';
      input.disabled = false;
      btn.textContent = ar ? 'تطبيق' : 'Apply';
      setMsg('', '');
      refreshSummary();
      return;
    }

    if (!code) { setMsg(ar ? 'اكتب كود الخصم.' : 'Enter a code.', 'err'); return; }

    btn.disabled = true;
    const oldTxt = btn.textContent;
    btn.textContent = ar ? '...' : '...';

    try {
      const { data, error } = await couponClient
        .from('coupons').select('*').ilike('code', code).limit(1);
      btn.disabled = false; btn.textContent = oldTxt;

      if (error) { setMsg(ar ? 'صار خطأ، جرّب مرة ثانية.' : 'Error, try again.', 'err'); return; }
      const c = data && data[0];

      if (!c || !c.is_active) { setMsg(ar ? '❌ كود غير صالح.' : '❌ Invalid code.', 'err'); return; }
      if (c.expires_at && new Date(c.expires_at) < new Date()) {
        setMsg(ar ? '❌ انتهت صلاحية هذا الكوبون.' : '❌ This coupon has expired.', 'err'); return;
      }
      if (c.usage_limit != null && c.used_count >= c.usage_limit) {
        setMsg(ar ? '❌ انتهى عدد استخدامات هذا الكوبون.' : '❌ Coupon usage limit reached.', 'err'); return;
      }
      const sub = cartSubtotal();
      if (sub < (c.min_order || 0)) {
        setMsg((ar ? `هذا الكوبون يتطلب طلب بقيمة ${formatPrice(c.min_order)} على الأقل.`
                   : `Requires a minimum order of ${formatPrice(c.min_order)}.`), 'err');
        return;
      }

      // صالح ✅
      window.appliedCoupon = {
        code: c.code, percent: Number(c.percent),
        max_discount: c.max_discount != null ? Number(c.max_discount) : null,
        min_order: Number(c.min_order || 0)
      };
      input.disabled = true;
      btn.textContent = ar ? 'إلغاء' : 'Remove';
      const disc = window.getCouponDiscount(sub);
      setMsg((ar ? `✅ تم تطبيق خصم ${c.percent}% (- ${formatPrice(disc)})`
                 : `✅ ${c.percent}% off applied (- ${formatPrice(disc)})`), 'ok');
      refreshSummary();
    } catch (e) {
      btn.disabled = false; btn.textContent = oldTxt;
      setMsg(ar ? 'صار خطأ، جرّب مرة ثانية.' : 'Error, try again.', 'err');
    }
  }

  // ربط الزر بعد تحميل الصفحة
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('checkoutCouponApplyBtn');
    const input = document.getElementById('checkoutCouponCode');
    if (btn) btn.addEventListener('click', applyCoupon);
    if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); applyCoupon(); } });
  });

  // لو تفرّغت السلة أو رجع المستخدم، نقدر نصفّر الكوبون يدوياً عند الحاجة
  window.resetCoupon = function () {
    window.appliedCoupon = null;
    const input = document.getElementById('checkoutCouponCode');
    const btn = document.getElementById('checkoutCouponApplyBtn');
    if (input) { input.value = ''; input.disabled = false; }
    if (btn) btn.textContent = (typeof currentLang === 'undefined' || currentLang === 'ar') ? 'تطبيق' : 'Apply';
    setMsg('', '');
  };
})();