// ===========================
// TREEB COFFEE QR MENU
// Tab Navigation System
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const categoryContents = document.querySelectorAll('.category-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetCategory = button.getAttribute('data-category');

            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            categoryContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            button.classList.add('active');
            const targetContent = document.querySelector(`.category-content[data-category="${targetCategory}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Haptic feedback for mobile (if supported)
            if ('vibrate' in navigator) {
                navigator.vibrate(10);
            }
        });
    });

    // Size tag selection
    const menuCards = document.querySelectorAll('.menu-card');

    menuCards.forEach(card => {
        const sizeTags = card.querySelectorAll('.size-tag');

        sizeTags.forEach(tag => {
            tag.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click event

                // Remove selected class from siblings
                sizeTags.forEach(sibling => sibling.classList.remove('selected'));

                // Add selected class to clicked tag
                tag.classList.add('selected');

                // Haptic feedback
                if ('vibrate' in navigator) {
                    navigator.vibrate(5);
                }
            });
        });
    });

    // Card interaction feedback
    menuCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle pulse effect on click
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });

        // Touch feedback for mobile
        card.addEventListener('touchstart', function() {
            this.style.opacity = '0.9';
        });

        card.addEventListener('touchend', function() {
            this.style.opacity = '';
        });
    });

    // Smooth scroll adjustments for sticky elements
    const headerHeight = document.querySelector('.header').offsetHeight;
    const navHeight = document.querySelector('.category-nav').offsetHeight;
    const totalStickyHeight = headerHeight + navHeight;

    // Adjust scroll position when navigating (if internal links are added later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.offsetTop - totalStickyHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add subtle parallax to brand mark
    const brandMark = document.querySelector('.brand-mark');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateParallax() {
        const scrollY = window.scrollY;
        const scrollDelta = scrollY - lastScrollY;

        if (brandMark && scrollY < 200) {
            const rotation = scrollY * 0.5;
            brandMark.style.transform = `rotate(${rotation}deg)`;
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Performance optimization: Reduce animations on low-end devices
    const isLowEndDevice = () => {
        return navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    };

    if (isLowEndDevice()) {
        document.body.style.setProperty('--animation-duration', '0.01s');
    }

    // Add loading state management
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Keyboard navigation for accessibility
    tabButtons.forEach((button, index) => {
        button.addEventListener('keydown', (e) => {
            let newIndex;

            switch(e.key) {
                case 'ArrowRight':
                    newIndex = (index + 1) % tabButtons.length;
                    tabButtons[newIndex].focus();
                    tabButtons[newIndex].click();
                    e.preventDefault();
                    break;
                case 'ArrowLeft':
                    newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
                    tabButtons[newIndex].focus();
                    tabButtons[newIndex].click();
                    e.preventDefault();
                    break;
            }
        });
    });

    // Add visual feedback for featured items
    const featuredCards = document.querySelectorAll('.menu-card.featured');

    featuredCards.forEach(card => {
        // Add subtle glow animation
        setInterval(() => {
            card.style.transition = 'box-shadow 2s ease-in-out';
        }, 3000);
    });

    // Track active category for analytics (placeholder)
    function trackCategoryView(category) {
        // This is where you could add analytics tracking
        console.log(`Category viewed: ${category}`);
    }

    // Track initial category
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) {
        trackCategoryView(activeTab.getAttribute('data-category'));
    }

    // Track category switches
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            trackCategoryView(button.getAttribute('data-category'));
        });
    });
});
