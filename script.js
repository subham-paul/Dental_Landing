/**
 * SmileCraft Dental Clinic - Custom Script
 */

document.addEventListener('DOMContentLoaded', function () {
    // ----------------------------------------------------
    // 1. AOS (Animate On Scroll) Initialization
    // ----------------------------------------------------
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 50
        });
    }

    // ----------------------------------------------------
    // 2. Navbar Scrolled Toggle
    // ----------------------------------------------------
    const navbar = document.querySelector('.navbar-custom');
    
    function checkScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check

    // ----------------------------------------------------
    // 3. Smooth Scrolling for Navbar Links
    // ----------------------------------------------------
    document.querySelectorAll('.navbar-custom a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for navbar height
                const navHeight = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight + 10;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Collapse mobile navbar if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });

    // ----------------------------------------------------
    // 4. Statistics Count-up Animation
    // ----------------------------------------------------
    const counterElements = document.querySelectorAll('.counter-value');
    
    const countOptions = {
        threshold: 0.5,
        rootMargin: "0px"
    };

    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetNum = parseInt(target.getAttribute('data-target'), 10);
                let currentNum = 0;
                const duration = 2000; // 2 seconds
                const frameRate = 1000 / 60; // 60fps
                const totalFrames = Math.round(duration / frameRate);
                const step = targetNum / totalFrames;
                let frame = 0;

                function updateCount() {
                    frame++;
                    currentNum = Math.round(step * frame);
                    if (frame < totalFrames) {
                        target.innerText = currentNum;
                        requestAnimationFrame(updateCount);
                    } else {
                        target.innerText = targetNum;
                    }
                }
                
                updateCount();
                observer.unobserve(target);
            }
        });
    }, countOptions);

    counterElements.forEach(counter => {
        countObserver.observe(counter);
    });

    // ----------------------------------------------------
    // 5. Interactive Before/After Image Sliders
    // ----------------------------------------------------
    const sliders = document.querySelectorAll('.before-after-slider');

    sliders.forEach(slider => {
        const beforeImg = slider.querySelector('.img-before');
        const handle = slider.querySelector('.slider-handle');
        let active = false;

        // Set initial positions
        let initialPct = 50;
        setSliderWidth(initialPct);

        function setSliderWidth(pct) {
            // Keep pct between 0 and 100
            pct = Math.max(0, Math.min(100, pct));
            beforeImg.style.clipPath = `polygon(0 0, ${pct}% 0, ${pct}% 100%, 0 100%)`;
            handle.style.left = `${pct}%`;
        }

        function adjustSlider(e) {
            const bounds = slider.getBoundingClientRect();
            // Support both desktop and touch events
            const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
            const position = x - bounds.left;
            const pct = (position / bounds.width) * 100;
            setSliderWidth(pct);
        }

        // Desktop Events
        slider.addEventListener('mousedown', (e) => {
            active = true;
            adjustSlider(e);
        });
        window.addEventListener('mouseup', () => {
            active = false;
        });
        window.addEventListener('mousemove', (e) => {
            if (!active) return;
            adjustSlider(e);
        });

        // Touch Events (Mobile)
        slider.addEventListener('touchstart', (e) => {
            active = true;
            adjustSlider(e);
        }, { passive: true });
        window.addEventListener('touchend', () => {
            active = false;
        });
        window.addEventListener('touchmove', (e) => {
            if (!active) return;
            adjustSlider(e);
        }, { passive: true });
    });

    // ----------------------------------------------------
    // 6. Products Detail Modal Integration
    // ----------------------------------------------------
    const productsData = {
        'prod-1': {
            name: "Eco-Friendly Bamboo Toothbrush",
            category: "Oral Hygiene",
            price: "₹499",
            image: "https://images.pexels.com/photos/7814571/pexels-photo-7814571.jpeg?auto=format&fit=crop&q=80&w=600",
            description: "Go green with our premium dental-grade biodegradable bamboo toothbrush. Features soft, charcoal-infused BPA-free bristles that gently lift dental stains and plaque without causing gum irritation.",
            ingredients: "Biodegradable organic Moso bamboo handle, charcoal-infused nylon-6 BPA-free bristles.",
            usage: "Use to brush teeth at least twice daily. Clean and dry the handle thoroughly after each brush session. Replace every 2-3 months."
        },
        'prod-2': {
            name: "Advanced Sensitive Toothpaste",
            category: "Toothpaste",
            price: "₹849",
            image: "https://images.pexels.com/photos/15499663/pexels-photo-15499663.jpeg?auto=format&fit=crop&q=80&w=600",
            description: "Formulated by dental specialists, this daily-use toothpaste blocks microscopic nerve pathways to provide instant and long-lasting relief from teeth sensitivity while restoring tooth enamel strength.",
            ingredients: "Potassium Nitrate (5%), Sodium Fluoride, Hydroxyapatite, Natural Mint Extract, Organic Aloe Vera, Hydrated Silica.",
            usage: "Apply a pea-sized amount onto soft toothbrush. Brush thoroughly for 2 minutes twice daily, focusing on sensitive zones."
        },
        'prod-3': {
            name: "Activated Charcoal Dental Floss",
            category: "Interdental",
            price: "₹699",
            image: "https://images.pexels.com/photos/30551804/pexels-photo-30551804.jpeg?auto=format&fit=crop&q=80&w=600",
            description: "Vegan bamboo fiber dental floss infused with activated charcoal particles and candelilla plant wax. Expertly cleans tight dental spaces while neutralizing bad odors and drawing out impurities.",
            ingredients: "Bamboo fiber floss, activated charcoal powder, candelilla wax, natural peppermint essential oil.",
            usage: "Pull out 18 inches of floss, wrap around middle fingers. Slide gently between teeth, curving around the base of each tooth."
        },
        'prod-4': {
            name: "Anti-Plaque Herbal Mouthwash",
            category: "Mouthwash",
            price: "₹1099",
            image: "https://images.pexels.com/photos/8704810/pexels-photo-8704810.jpeg?auto=format&fit=crop&q=80&w=600",
            description: "An alcohol-free, refreshingly crisp mouthwash that targets anaerobic bacteria responsible for plaque and gum concerns. Soothes inflammation and protects tooth surfaces for 12 hours.",
            ingredients: "Teatree extract, Green Tea extract, Eucalyptus globulus Oil, Menthol, Xylitol, Purified Water.",
            usage: "Rinse mouth with 15-20ml of solution for 30 seconds after brushing. Do not swallow. Refrain from eating for 30 minutes post-rinse."
        },
        'prod-5': {
            name: "Sonic Smart Electric Toothbrush",
            category: "Dental Tech",
            price: "₹8999",
            image: "https://images.pexels.com/photos/34241800/pexels-photo-34241800.jpeg?auto=format&fit=crop&q=80&w=600",
            description: "Experience 40,000 micro-vibrations per minute with our smart sonic toothbrush. Features 5 personalized modes (Clean, White, Sensitive, Gum Care, Polish) and an automated 2-minute pacer.",
            ingredients: "Sonic vibration engine, rechargeable Lithium-ion battery, premium waterproof IPX7 body, 3 replacement brush heads.",
            usage: "Choose your preferred mode. Guide brush head slowly along teeth at a 45-degree angle. Let vibrations do the work. Charged via USB."
        },
        'prod-6': {
            name: "Cordless Smart Water Flosser",
            category: "Dental Tech",
            price: "₹5999",
            image: "https://images.pexels.com/photos/7789675/pexels-photo-7789675.jpeg?auto=format&fit=crop&q=80&w=600",
            description: "Provides customized water pressure (30-120 PSI) to wash away food debris and plaque hidden deep inside gums. Ideal for braces, implants, bridges, and crown care.",
            ingredients: "300ml leakproof water reservoir, rechargeable battery, 4 specialized 360-degree rotating jet nozzles.",
            usage: "Fill reservoir with lukewarm water. Select pressure mode, place tip in mouth, lean over sink and turn device on. Run along gumline."
        },
        'prod-7': {
            name: "Pro-Series Teeth Whitening Pen",
            category: "Cosmetic",
            price: "₹1999",
            image: "https://images.pexels.com/photos/6812494/pexels-photo-6812494.jpeg?auto=format&fit=crop&q=80&w=600",
            description: "A pocket-sized smile whitening solution. Features 35% Carbamide Peroxide gel to brush onto teeth for active stain lifting. Safe for tooth enamel, showing results within 1 week of daily application.",
            ingredients: "Carbamide Peroxide, Glycerin, Carbomer, Menthol, Purified Water.",
            usage: "Twist bottom of pen to release gel. Brush a thin layer onto dry teeth. Smile wide for 30 seconds. Rinse gel off after 20 minutes."
        },
        'prod-8': {
            name: "Stainless Steel Tongue Scraper",
            category: "Oral Hygiene",
            price: "₹749",
            image: "https://images.pexels.com/photos/6187566/pexels-photo-6187566.jpeg?auto=format&fit=crop&q=80&w=600",
            description: "Medical-grade stainless steel tongue cleaner designed to clean away white coating, restore taste sensitivity, and permanently cure halitosis. Durable, rustproof, and ergonomic.",
            ingredients: "100% Medical-grade stainless steel with carrying travel pouch.",
            usage: "Hold ends of the scraper. Extend tongue and slide the scraper from the back of the tongue to the front. Rinse scraper after each swipe."
        }
    };

    const productModal = document.getElementById('productDetailModal');
    if (productModal) {
        productModal.addEventListener('show.bs.modal', function (event) {
            // Button/Card that triggered the modal
            const triggerElement = event.relatedTarget;
            const productId = triggerElement.getAttribute('data-product-id');
            
            const product = productsData[productId];
            
            if (product) {
                // Populate modal content
                productModal.querySelector('#modalProductImage').src = product.image;
                productModal.querySelector('#modalProductImage').alt = product.name;
                productModal.querySelector('#modalProductTitle').innerText = product.name;
                productModal.querySelector('#modalProductCategory').innerText = product.category;
                productModal.querySelector('#modalProductPrice').innerText = product.price;
                productModal.querySelector('#modalProductDescription').innerText = product.description;
                productModal.querySelector('#modalProductIngredients').innerText = product.ingredients;
                productModal.querySelector('#modalProductUsage').innerText = product.usage;
            }
        });
    }

    // ----------------------------------------------------
    // 7. Appointment Form Handling (Simulation)
    // ----------------------------------------------------
    const bookingForm = document.getElementById('appointmentBookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Check HTML5 validation first
            if (!bookingForm.checkValidity()) {
                e.stopPropagation();
                bookingForm.classList.add('was-validated');
                return;
            }

            // Show simulated loading on submission button
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalBtnContent = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Securing Slot...`;

            // Simulating API request delay
            setTimeout(() => {
                // Reset submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                
                // Show booking success Bootstrap modal
                const successModal = new bootstrap.Modal(document.getElementById('bookingSuccessModal'));
                successModal.show();
                
                // Reset form state
                bookingForm.reset();
                bookingForm.classList.remove('was-validated');
            }, 1800);
        });
    }

    // ----------------------------------------------------
    // 8. Gallery Lightbox View Trigger (Simple mockup)
    // ----------------------------------------------------
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('.gallery-img');
            const title = this.querySelector('.gallery-title');
            
            const lightboxModal = document.getElementById('galleryLightboxModal');
            if (lightboxModal) {
                lightboxModal.querySelector('#lightboxImage').src = img.src;
                lightboxModal.querySelector('#lightboxTitle').innerText = title ? title.innerText : "SmileCraft Gallery Showcase";
                
                const bsLightbox = new bootstrap.Modal(lightboxModal);
                bsLightbox.show();
            }
        });
    });
});
