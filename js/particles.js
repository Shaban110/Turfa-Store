// particles.js - Professional Swarm Effect (Antigravity Style)
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'interactive-bg';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    
    // 1. إعادتهم للخلفية الأساسية (وراء جميع العناصر)
    canvas.style.zIndex = '-1'; 
    canvas.style.pointerEvents = 'none'; 
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let dots = [];
    const numDots = 60; 
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    
    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    
    // متغيرات الحركة التلقائية (الخمول)
    let lastMouseMoveTime = Date.now();
    let isIdle = false;
    let wanderAngle = 0; // زاوية التجول التلقائي في الشاشة
    
    function resetIdleTimer() {
        lastMouseMoveTime = Date.now();
        isIdle = false;
    }
    
    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        resetIdleTimer();
    });
    
    window.addEventListener('touchmove', e => {
        if(e.touches.length > 0){
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
            resetIdleTimer();
        }
    });

    const colors = ['#f96f3a', '#f1b721', '#365bf0', '#7c37cc', '#34A853'];

    function init() {
        dots = [];
        resetIdleTimer();
        for (let i = 0; i < numDots; i++) {
            dots.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: 0,
                vy: 0,
                angle: 0,
                color: colors[Math.floor((i / numDots) * colors.length)], 
                offsetAngle: Math.random() * Math.PI * 2, 
                orbitRadius: Math.random() * 80 + 20, 
                speedRatio: Math.random() * 0.03 + 0.01 
            });
        }
    }
    
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 2. التحقق مما إذا مرت 5 ثواني (5000 ملي ثانية) بدون حركة الماوس
        if (Date.now() - lastMouseMoveTime > 5000) {
            isIdle = true;
        }
        
        let currentTargetX = mouse.x;
        let currentTargetY = mouse.y;
        
        if (isIdle) {
            // 3. إذا كان في وضع الخمول، يتم تحريك الهدف ببطء في أرجاء الشاشة بحركة متناغمة
            wanderAngle += 0.005;
            currentTargetX = canvas.width / 2 + Math.cos(wanderAngle) * (canvas.width * 0.35);
            currentTargetY = canvas.height / 2 + Math.sin(wanderAngle * 0.7) * (canvas.height * 0.35);
        }
        
        for (let i = 0; i < dots.length; i++) {
            let dot = dots[i];
            
            // 4. تقليل سرعة الدوران حول الماوس بشكل ملحوظ ليكون أبطأ وأهدأ
            dot.offsetAngle += 0.005; 
            
            let targetX = currentTargetX + Math.cos(dot.offsetAngle) * dot.orbitRadius;
            let targetY = currentTargetY + Math.sin(dot.offsetAngle) * dot.orbitRadius;
            
            let dx = targetX - dot.x;
            let dy = targetY - dot.y;
            
            dot.vx += dx * dot.speedRatio;
            dot.vy += dy * dot.speedRatio;
            
            dot.vx *= 0.85;
            dot.vy *= 0.85;
            
            dot.x += dot.vx;
            dot.y += dot.vy;
            
            let targetAngle = Math.atan2(dot.vy, dot.vx);
            
            let angleDiff = targetAngle - dot.angle;
            while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
            while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
            dot.angle += angleDiff * 0.15;
            
            ctx.save();
            ctx.translate(dot.x, dot.y);
            ctx.rotate(dot.angle);
            
            ctx.beginPath();
            ctx.roundRect(-6, -1.5, 12, 3, 2);
            ctx.fillStyle = dot.color;
            ctx.fill();
            
            ctx.restore();
        }
    }
    
    init();
    animate();
});