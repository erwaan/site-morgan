const cursor = document.getElementById('cursor');
        const ring = document.getElementById('cursorRing');
        let mx = 0, my = 0, rx = 0, ry = 0;
        document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
        (function animate() {
            cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
            rx += (mx - rx) * .12; ry += (my - ry) * .12;
            ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
            requestAnimationFrame(animate);
        })();
        document.querySelectorAll('a,button,.parcours-card').forEach(el => {
            el.addEventListener('mouseenter', () => { ring.style.width = '56px'; ring.style.height = '56px'; ring.style.opacity = '0.9'; });
            el.addEventListener('mouseleave', () => { ring.style.width = '32px'; ring.style.height = '32px'; ring.style.opacity = '0.5'; });
        });
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
        }, { threshold: .08 });
        document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
        document.querySelectorAll('.projects-grid').forEach(grid => {
            Array.from(grid.children).forEach((child, i) => {
                child.classList.add('reveal');
                child.style.transitionDelay = (i * .09) + 's';
                obs.observe(child);
            });
        });