/**
 * Shared Nav & Footer Components
 * Edit this file to update the nav or footer across every page of the site.
 */

(function () {
    var path = window.location.pathname;

    var isProject = path.indexOf('/projects/') !== -1 || path.indexOf('\\projects\\') !== -1;

    var base = isProject ? '../' : '';

    var isHome = !isProject && (path === '/' || path.indexOf('index.html') !== -1 || path.endsWith('/') || path.endsWith('\\'));
    var isAbout = path.indexOf('about.html') !== -1;

    function revealSite() {
        var loader = document.getElementById('loader');
        var content = document.getElementById('site-content');
        var navbar = document.getElementById('navbar');

        if (loader) {
            loader.setAttribute('aria-busy', 'false');
            loader.setAttribute('aria-hidden', 'true');
            loader.style.opacity = '0';
            setTimeout(function () {
                loader.style.display = 'none';
            }, 200);
        }

        if (content) {
            setTimeout(function () {
                content.classList.remove('opacity-0', 'translate-y-8', 'blur-md');
                content.classList.add('opacity-100', 'translate-y-0', 'blur-0');
                if (navbar) {
                    navbar.classList.remove('opacity-0');
                }
            }, 100);
        }
    }

    try {
        var navEl = document.getElementById('nav-placeholder');
        if (navEl) {
            var homeHref = isHome ? '#' : base + 'index.html';
            var workHref = isHome ? '#selected-work' : base + 'index.html#selected-work';

            function navLink(href, label, active) {
                var cls = active
                    ? 'text-sm font-bold text-gray-900 bg-gray-100 px-3 py-1.5 rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2'
                    : 'text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white/50 px-3 py-1.5 rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2';
                var cur = active ? ' aria-current="page"' : '';
                return '<a href="' + href + '" class="' + cls + '"' + cur + '>' + label + '</a>';
            }

            var navExtraClass = isHome ? ' opacity-0 transition-opacity duration-700 delay-300' : '';

            var navHTML =
                '<nav id="navbar" aria-label="Primary" class="fixed top-6 left-1/2 -translate-x-1/2 z-[90] w-full max-w-xs sm:max-w-md' + navExtraClass + '">' +
                '  <div class="flex items-center justify-center px-6 py-3 mx-4 rounded-full bg-white/70 backdrop-blur-md border border-gray-200 shadow-xl">' +
                navLink(homeHref, 'Home', isHome) +
                navLink(workHref, 'Work', isProject) +
                navLink(base + 'about.html', 'About', isAbout) +
                '  </div>' +
                '</nav>';

            var temp = document.createElement('div');
            temp.innerHTML = navHTML;
            var navNode = temp.firstElementChild;
            navEl.parentNode.replaceChild(navNode, navEl);
        }
    }
    catch (e) {
        console.error('Navigation Error:', e);
    }

    if (isProject) {
        var bar = document.createElement('div');
        bar.id = 'reading-progress';
        bar.setAttribute('aria-hidden', 'true');

        var fill = document.createElement('div');
        fill.className = 'reading-progress__fill';
        fill.id = 'reading-progress-fill';
        bar.appendChild(fill);
        document.body.appendChild(bar);

        var ticking = false;
        function updateProgress() {
            var scrollRoot = document.scrollingElement || document.documentElement;
            var scrollTop = scrollRoot.scrollTop || 0;
            var scrollH = scrollRoot.scrollHeight - scrollRoot.clientHeight;
            var pct = scrollH <= 0 ? 0 : (scrollTop / scrollH);
            fill.style.transform = 'scaleX(' + pct + ')';
            ticking = false;
        }

        function onScroll() {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(updateProgress);
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        updateProgress();
    }

    try {
        var FOOTER_LINKS = {
            email: 'mailto:markchamberlain5@gmail.com',
            linkedin: 'https://www.linkedin.com/in/mark-chamberlain-design',
            behance: 'https://www.behance.net/justmakingamark5',
            instagram: 'https://www.instagram.com/justmakingamark/',
            cv: base + 'Images/Mark Chamberlain CV.pdf'
        };

        var footerEl = document.getElementById('footer-placeholder');
        if (footerEl) {
            function footerLink(href, label, ariaLabel, extra) {
                var target = href.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
                var download = extra || '';
                var al = ariaLabel ? ' aria-label="' + ariaLabel.replace(/"/g, '&quot;') + '"' : '';
                return '<a href="' + href + '"' + target + download + al +
                    ' class="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded">' +
                    label + '</a>';
            }

            footerEl.innerHTML =
                '<footer class="bg-gray-900 text-white py-16 border-t border-gray-800">' +
                '  <div class="max-w-4xl mx-auto px-6 text-center">' +
                '    <p class="text-2xl font-bold mb-2">Mark Chamberlain.</p>' +
                '    <p class="text-gray-500 text-sm mb-8">Design Engineer</p>' +
                '    <div class="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">' +
                    footerLink(FOOTER_LINKS.email, 'Email', null) +
                    footerLink(FOOTER_LINKS.linkedin, 'LinkedIn', 'LinkedIn (opens in new tab)') +
                    footerLink(FOOTER_LINKS.behance, 'Behance', 'Behance (opens in new tab)') +
                    footerLink(FOOTER_LINKS.instagram, 'Instagram', 'Instagram (opens in new tab)') +
                    footerLink(FOOTER_LINKS.cv, 'Download CV', 'Download CV (PDF)', ' download="MarkChamberlain_CV"') +
                '    </div>' +
                '    <p class="text-gray-600 text-xs">&copy; 2026 Mark Chamberlain. All rights reserved.</p>' +
                '  </div>' +
                '</footer>';
        }
    }
    catch (e) {
        console.error('Footer Error:', e);
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        revealSite();
    }
    else {
        window.addEventListener('DOMContentLoaded', revealSite);
        window.addEventListener('load', revealSite);
        setTimeout(revealSite, 300);
    }
})();
