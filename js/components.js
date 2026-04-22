/* ---------------------------------------------------------------------------
 * Shared components for the portfolio site.
 *
 * Responsibilities:
 *   - Inject the top nav into #nav-placeholder
 *   - Inject the footer into #footer-placeholder
 *   - Render the 9 project cards into #projects-grid (homepage only)
 *   - Bind hover-to-zoom behaviour on any .image-zoom-wrapper
 *   - Run the page reveal: fade out #loader, fade in #site-content
 *
 * Pages consume this by including three placeholders and the script:
 *   <div id="nav-placeholder"></div>
 *   <div id="projects-grid"></div>   (homepage only)
 *   <div id="footer-placeholder"></div>
 *   <script src="js/components.js"></script>
 * ------------------------------------------------------------------------- */

(function () {
    var path = window.location.pathname;
    var isProject = path.indexOf('/projects/') !== -1;
    var base      = isProject ? '../' : '';
    var isHome    = !isProject && (path === '/' || path.indexOf('index.html') !== -1 || path.endsWith('/'));
    var isAbout   = path.indexOf('about.html') !== -1;

    // ─── NAV ────────────────────────────────────────────────────────────────

    function navLink(href, label, active) {
        var cls = active
            ? 'text-sm font-bold text-gray-900 bg-gray-100 px-3 py-1.5 rounded-full transition-all duration-200'
            : 'text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white/50 px-3 py-1.5 rounded-full transition-all duration-200';
        return '<a href="' + href + '" class="' + cls + '">' + label + '</a>';
    }

    function renderNav() {
        var mount = document.getElementById('nav-placeholder');
        if (!mount) return;

        var homeHref = isHome ? '#'              : base + 'index.html';
        var workHref = isHome ? '#selected-work' : base + 'index.html#selected-work';

        // On the home page the nav fades in after the hero — start it invisible.
        var extraClass = isHome ? ' opacity-0 transition-opacity duration-700 delay-300' : '';

        mount.outerHTML =
            '<nav id="navbar" class="fixed top-6 left-1/2 -translate-x-1/2 z-[90] w-full max-w-xs sm:max-w-md' + extraClass + '">' +
            '  <div class="flex items-center justify-center px-6 py-3 mx-4 rounded-full bg-white/70 backdrop-blur-md border border-gray-200 shadow-xl">' +
                 navLink(homeHref, 'Home', isHome) +
                 navLink(workHref, 'Work', false) +
                 navLink(base + 'about.html', 'About', isAbout) +
            '  </div>' +
            '</nav>';
    }

    // ─── FOOTER ─────────────────────────────────────────────────────────────
    // To change links site-wide, edit FOOTER_LINKS below.

    var FOOTER_LINKS = {
        email:     'mailto:markchamberlain5@gmail.com',
        linkedin:  'https://www.linkedin.com/in/mark-chamberlain-design',
        behance:   'https://www.behance.net/justmakingamark5',
        instagram: 'https://www.instagram.com/justmakingamark/',
        cv:        base + 'Images/Mark Chamberlain CV.pdf'
    };

    function footerLink(href, label, downloadName) {
        var target   = href.indexOf('http') === 0 ? ' target="_blank" rel="noopener"' : '';
        var download = downloadName ? ' download="' + downloadName + '"' : '';
        return '<a href="' + href + '"' + target + download +
               ' class="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium">' +
               label + '</a>';
    }

    function renderFooter() {
        var mount = document.getElementById('footer-placeholder');
        if (!mount) return;

        var year = new Date().getFullYear();

        mount.outerHTML =
            '<footer class="bg-gray-900 text-white py-16 border-t border-gray-800">' +
            '  <div class="max-w-4xl mx-auto px-6 text-center">' +
            '    <p class="text-2xl font-bold mb-2">Mark Chamberlain.</p>' +
            '    <p class="text-gray-500 text-sm mb-8">Lead Product Designer</p>' +
            '    <div class="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">' +
                   footerLink(FOOTER_LINKS.email,     'Email') +
                   footerLink(FOOTER_LINKS.linkedin,  'LinkedIn') +
                   footerLink(FOOTER_LINKS.behance,   'Behance') +
                   footerLink(FOOTER_LINKS.instagram, 'Instagram') +
                   footerLink(FOOTER_LINKS.cv,        'Download CV', 'MarkChamberlain_CV') +
            '    </div>' +
            '    <p class="text-gray-600 text-xs">&copy; ' + year + ' Mark Chamberlain. All rights reserved.</p>' +
            '  </div>' +
            '</footer>';
    }

    // ─── PROJECT CARDS (homepage) ───────────────────────────────────────────
    // Single source of truth for the "Selected Work" grid on index.html.
    // To add / remove / reorder case studies, edit this array.

    var PROJECTS = [
        {
            href:   'projects/FactFind.html',
            thumb:  'Images/Factfind/FFthumbnail.jpg',
            alt:    'Revolution Fact Find UX Recovery',
            title:  'Revolution Fact Find: UX Recovery',
            blurb:  'Rescuing advisor productivity by transforming a bloated platform rollout into a high-density Intelligence Workspace.',
            tags:   ['Fintech', 'UX Recovery', 'Enterprise CRM'],
            impact: '60% Reduction in Click-Depth'
        },
        {
            href:   'projects/MiReporting.html',
            thumb:  'Images/Reporting/reportingthumbnail.jpg',
            alt:    'MI Reporting System',
            title:  'MI Reporting System',
            blurb:  'Decoupling a legacy database to build a self-serve analytics platform for directors, eliminating developer bottlenecks.',
            tags:   ['Data Visualization', 'Enterprise SaaS', 'Systems Architecture'],
            impact: '100% Self-Serve Reporting'
        },
        {
            href:   'projects/FileReviews.html',
            thumb:  'Images/FileReview/AI-thumbnail.jpg',
            alt:    'File Reviews',
            title:  'AI & Compliance Architecture',
            blurb:  'Designing an AI-assisted review tool to cut compliance bottlenecks in adviser file checking.',
            tags:   ['AI Integration', 'Compliance'],
            impact: '40% Reduction in File Review Time'
        },
        {
            href:   'projects/Protection.html',
            thumb:  'Images/protection/ProtectionThumnail.jpg',
            alt:    'Protection Workflows',
            title:  'Modernising Protection Workflows',
            blurb:  'Untangling a legacy insurance sourcing flow to get advisers from application to offer faster.',
            tags:   ['FinTech', 'Underwriting Logic'],
            impact: '35% Faster App-to-Offer Time'
        },
        {
            href:   'projects/Financialpromotion.html',
            thumb:  'Images/FP/FP-thumbnail.jpg',
            alt:    'Financial Promotion Audit Engine',
            title:  'Financial Promotion System',
            blurb:  'Optimising compliance workflows to handle a 196% surge in monthly promotion uploads.',
            tags:   ['Regulatory Triage', 'Workflow Scaling'],
            impact: '36% Reduction in Duplicates'
        },
        {
            href:   'projects/IntroductorPortal.html',
            thumb:  'Images/IP/IntorductorThumnail.jpg',
            alt:    'Estate Agent Referral Dashboard',
            title:  'Estate Agent Referral Portal',
            blurb:  'Replacing insecure email chains with a real-time referral portal for estate agents and financial advisors.',
            tags:   ['B2B SaaS', 'PropTech', 'Automation'],
            impact: 'Lead Conversion Increased by 45%'
        },
        {
            href:        'projects/FinzlaBudgetApp.html',
            thumb:       'Images/Finzla/BudgetThumnail.jpg',
            alt:         'Finzla personal finance app',
            title:       'Finzla — Personal Finance Aggregator',
            blurb:       'Designing a multi-bank aggregator app for people juggling multiple accounts across UK and Nigerian banks.',
            tags:        ['Mobile App', 'FinTech', 'Freelance'],
            impact:      'Live Prototype',
            impactLabel: 'Status'
        },
        {
            href:   'projects/RedLionPub.html',
            thumb:  'Images/RedLion/Pub.jpg',
            alt:    'Red Lion',
            title:  'The Red Lion: Brand & Digital',
            blurb:  'Revitalising a heritage pub brand to attract a digital-first audience without alienating the locals.',
            tags:   ['Brand Strategy', 'Web Design'],
            impact: '60% Increase in Online Bookings'
        },
        {
            href:   'projects/FuelCoffee.html',
            thumb:  'Images/Fuel/Coffee.jpg',
            alt:    'Fuel Coffee',
            title:  'Fuel Retail Transformation',
            blurb:  'A conceptual DTC coffee brand — turning industrial aesthetics into a high-energy e-commerce experience.',
            tags:   ['E-commerce', 'UX Strategy'],
            impact: '45% Increase in Online Orders'
        }
    ];

    function escapeHtml(s) {
        return String(s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    function projectCard(p) {
        var tags = (p.tags || []).map(function (t) {
            return '<span class="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full">' + escapeHtml(t) + '</span>';
        }).join('');

        var blurb = p.blurb
            ? '<p class="text-sm text-gray-600 mb-4 line-clamp-2">' + escapeHtml(p.blurb) + '</p>'
            : '';

        var impactLabel = escapeHtml(p.impactLabel || 'Impact');

        return '' +
            '<a href="' + base + p.href + '" class="group cursor-pointer">' +
            '  <div class="bg-gray-50 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-gray-200">' +
            '    <div class="aspect-[4/3] bg-gray-200 overflow-hidden relative">' +
            '      <img src="' + base + p.thumb + '" alt="' + escapeHtml(p.alt) + '" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500">' +
            '      <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300"></div>' +
            '    </div>' +
            '    <div class="p-6 flex-1 flex flex-col">' +
            '      <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">' + escapeHtml(p.title) + '</h3>' +
                   blurb +
            '      <div class="flex flex-wrap gap-2 mb-4">' + tags + '</div>' +
            '      <div class="mt-auto pt-4 border-t border-gray-100">' +
            '        <p class="text-sm font-semibold text-gray-500">' + impactLabel + '</p>' +
            '        <p class="text-lg text-orange-600 font-bold">' + escapeHtml(p.impact) + '</p>' +
            '      </div>' +
            '    </div>' +
            '  </div>' +
            '</a>';
    }

    function renderProjects() {
        var mount = document.getElementById('projects-grid');
        if (!mount) return;
        mount.innerHTML = PROJECTS.map(projectCard).join('');
    }

    // ─── IMAGE ZOOM ─────────────────────────────────────────────────────────
    // Any element with class .image-zoom-wrapper gets a cursor-follow zoom.

    function bindZoom(wrapper) {
        var img = wrapper.querySelector('img');
        if (!img) return;

        wrapper.addEventListener('mousemove', function (e) {
            var rect = wrapper.getBoundingClientRect();
            var xPercent = ((e.clientX - rect.left) / rect.width)  * 100;
            var yPercent = ((e.clientY - rect.top)  / rect.height) * 100;
            img.style.transformOrigin = xPercent + '% ' + yPercent + '%';
            img.style.transform = 'scale(2.5)';
        });

        wrapper.addEventListener('mouseleave', function () {
            img.style.transform = 'scale(1)';
            img.style.transformOrigin = 'center center';
        });
    }

    function bindAllZoom() {
        var wrappers = document.querySelectorAll('.image-zoom-wrapper');
        for (var i = 0; i < wrappers.length; i++) bindZoom(wrappers[i]);
    }

    // ─── PAGE REVEAL ────────────────────────────────────────────────────────
    // Fades out #loader and reveals #site-content. Safe to call more than once.

    var revealed = false;

    function revealSite() {
        if (revealed) return;
        revealed = true;

        var loader  = document.getElementById('loader');
        var content = document.getElementById('site-content');
        var navbar  = document.getElementById('navbar');

        if (loader) {
            loader.style.opacity = '0';
            setTimeout(function () { loader.style.display = 'none'; }, 300);
        }

        if (content) {
            setTimeout(function () {
                content.classList.remove('opacity-0', 'translate-y-8', 'blur-md');
                content.classList.add('opacity-100', 'translate-y-0', 'blur-0');
                if (navbar) navbar.classList.remove('opacity-0');
            }, 100);
        } else if (navbar) {
            // Pages with no #site-content wrapper (e.g. about.html) still need
            // the nav fade-in on the home page variant.
            navbar.classList.remove('opacity-0');
        }
    }

    // ─── INIT ───────────────────────────────────────────────────────────────

    function init() {
        try { renderNav(); }       catch (e) { console.error('Nav error:', e); }
        try { renderFooter(); }    catch (e) { console.error('Footer error:', e); }
        try { renderProjects(); }  catch (e) { console.error('Projects error:', e); }
        try { bindAllZoom(); }     catch (e) { console.error('Zoom error:', e); }
        revealSite();
    }

    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Safety fallback in case something above throws before init completes.
    window.addEventListener('load', revealSite);
    setTimeout(revealSite, 2000);

})();

// Add Clarity tracking to all pages
(function() {
    var clarity = function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    };
    clarity(window, document, "clarity", "script", "wfpnqs8495");
})();