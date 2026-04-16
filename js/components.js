/**
 * Shared Nav & Footer Components
 * Edit this file to update the nav or footer across every page of the site.
 */

(function () {
    var path = window.location.pathname;

    // Are we inside the /projects/ subdirectory?
    var isProject = path.indexOf('/projects/') !== -1;

    // Base path for links — project pages need to go up one level
    var base = isProject ? '../' : '';

    // Which nav link should be active?
    var isHome = !isProject && (path === '/' || path.indexOf('index.html') !== -1 || path.endsWith('/'));
    var isAbout = path.indexOf('about.html') !== -1;

    // ─── PAGE LOADER ────────────────────────────────────────────────────────────
    // Handles the loading screen on every page. Works whether or not the page
    // has a #site-content reveal wrapper or a #navbar fade-in.

    function revealSite() {
        console.log('Revealing site...');
        var loader  = document.getElementById('loader');
        var content = document.getElementById('site-content');
        var navbar  = document.getElementById('navbar');

        if (loader) {
            loader.style.opacity = '0';
            setTimeout(function () { loader.style.display = 'none'; }, 200);
        }

        if (content) {
            setTimeout(function () {
                content.classList.remove('opacity-0', 'translate-y-8', 'blur-md');
                content.classList.add('opacity-100', 'translate-y-0', 'blur-0');
                if (navbar) navbar.classList.remove('opacity-0');
            }, 100);
        }
    }

    // ─── NAV ────────────────────────────────────────────────────────────────

    try {
        var navEl = document.getElementById('nav-placeholder');
        if (navEl) {
            var homeHref = isHome ? '#'               : base + 'index.html';
            var workHref = isHome ? '#selected-work'  : base + 'index.html#selected-work';

            function navLink(href, label, active) {
                var cls = active
                    ? 'text-sm font-bold text-gray-900 bg-gray-100 px-3 py-1.5 rounded-full transition-all duration-200'
                    : 'text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white/50 px-3 py-1.5 rounded-full transition-all duration-200';
                return '<a href="' + href + '" class="' + cls + '">' + label + '</a>';
            }

            // On the home page the nav fades in via JS, so start it invisible
            var navExtraClass = isHome ? ' opacity-0 transition-opacity duration-700 delay-300' : '';

            var navHTML =
                '<nav id="navbar" class="fixed top-6 left-1/2 -translate-x-1/2 z-[90] w-full max-w-xs sm:max-w-md' + navExtraClass + '">' +
                '  <div class="flex items-center justify-center px-6 py-3 mx-4 rounded-full bg-white/70 backdrop-blur-md border border-gray-200 shadow-xl">' +
                    navLink(homeHref, 'Home', isHome) +
                    navLink(workHref, 'Work', false) +
                    navLink(base + 'about.html', 'About', isAbout) +
                '  </div>' +
                '</nav>';

            var navWrapper = document.createElement('div');
            navWrapper.innerHTML = navHTML;
            document.body.appendChild(navWrapper.firstElementChild);
        }
    } catch (e) {
        console.error('Navigation Error:', e);
    }

    // ─── FOOTER ─────────────────────────────────────────────────────────────
    // To update links, edit the values below — changes apply to every page.

    try {
        var FOOTER_LINKS = {
            email:     'mailto:markchamberlain5@gmail.com',
            linkedin:  'https://www.linkedin.com/in/mark-chamberlain-design',
            behance:   'https://www.behance.net/justmakingamark5',
            instagram: 'https://www.instagram.com/justmakingamark/',
            cv:        base + 'Images/Mark Chamberlain CV.pdf'
        };

        var footerEl = document.getElementById('footer-placeholder');
        if (footerEl) {
            function footerLink(href, label, extra) {
                var target = href.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
                var download = extra || '';
                return '<a href="' + href + '"' + target + download +
                       ' class="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium">' +
                       label + '</a>';
            }

            footerEl.innerHTML =
                '<footer class="bg-gray-900 text-white py-16 border-t border-gray-800">' +
                '  <div class="max-w-4xl mx-auto px-6 text-center">' +
                '    <p class="text-2xl font-bold mb-2">Mark Chamberlain.</p>' +
                '    <p class="text-gray-500 text-sm mb-8">Lead Product Designer</p>' +
                '    <div class="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">' +
                         footerLink(FOOTER_LINKS.email,     'Email') +
                         footerLink(FOOTER_LINKS.linkedin,  'LinkedIn') +
                         footerLink(FOOTER_LINKS.behance,   'Behance') +
                         footerLink(FOOTER_LINKS.instagram, 'Instagram') +
                         footerLink(FOOTER_LINKS.cv,        'Download CV', ' download="MarkChamberlain_CV"') +
                '    </div>' +
                '    <p class="text-gray-600 text-xs">&copy; 2025 Mark Chamberlain. All rights reserved.</p>' +
                '  </div>' +
                '</footer>';
        }
    } catch (e) {
        console.error('Footer Error:', e);
    }

    // ─── INIT ───────────────────────────────────────────────────────────────

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        revealSite();
    } else {
        // Try to reveal as soon as DOM is ready, don't wait for all images if they are slow
        window.addEventListener('DOMContentLoaded', revealSite);
        window.addEventListener('load', revealSite);
        // Safety fallback: Force reveal after 2s
        setTimeout(revealSite, 300);
    }

})();
