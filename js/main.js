// DOM Elementlerini Seçme
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.menu a');

// Sayfa Yükleme Animasyonu
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Hamburger Menü Toggle
hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');

    // Hamburger ikonunu X'e dönüştürme
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Menü linklerine tıklandığında menüyü kapat (mobil için)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
            hamburger.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Proje Filtreleme
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Proje öğelerini her tıklamada yeniden seç
        const projectItems = document.querySelectorAll('.project-item');
        
        // Aktif sınıfını kaldır
        filterBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Tıklanan butona aktif sınıfını ekle
        btn.classList.add('active');
        
        // Seçilen kategoriyi al
        const filterValue = btn.getAttribute('data-filter');
        
        // Projeleri filtrele
        projectItems.forEach(item => {
            const categories = item.getAttribute('data-category').split(' ');
            
            // Animasyon için küçük bir gecikme
            if (filterValue === 'all' || categories.includes(filterValue)) {
                item.style.transitionDelay = Math.random() * 0.2 + 's'; // Rastgele gecikme
                item.style.display = 'block';
                // Display block sonrası kısa bir bekleme, opacity ve transform için
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1) translateY(0px)';
                    }, 20); // CSS geçişinin başlaması için çok kısa bir bekleme
                });
            } else {
                item.style.transitionDelay = '0s';
                item.style.opacity = '0';
                item.style.transform = 'scale(0.95) translateY(10px)'; // Biraz daha yumuşak küçülme
                setTimeout(() => {
                    item.style.display = 'none';
                }, 400); // CSS transition süresiyle uyumlu (0.4s)
            }
        });
    });
});

// Sayfa kaydırma efekti
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    
    // Bölümlerin görünürlüğünü kontrol et
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150; // Biraz daha erken tetiklenmesi için değeri artırdım
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const sectionTitle = section.querySelector('.section-title');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // İlgili menü linkini aktif et
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });

            // Bölüm görünür olduğunda animasyon ekle
            section.classList.add('in-view');
            if (sectionTitle) {
                sectionTitle.classList.add('in-view');
            }
        } else {
            // Bölüm görünür olmadığında animasyon sınıfını kaldır (opsiyonel, tekrar animasyon için)
            // section.classList.remove('in-view');
            // if (sectionTitle) {
            //     sectionTitle.classList.remove('in-view');
            // }
        }
    });
    
    // Navbar'ı scroll durumuna göre güncelle
    const navbar = document.querySelector('.navbar');
    if (scrollPos > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// İletişim Formu Gönderimi (Demo)
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Form verilerini al
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Normalde buraya API çağrısı yapılır
        console.log('Form gönderildi:', formValues);
        
        // Başarı mesajı göster
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.textContent = 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.';
        
        contactForm.innerHTML = '';
        contactForm.appendChild(successMessage);
        
        // Formu sıfırla
        setTimeout(() => {
            contactForm.reset();
            contactForm.innerHTML = `
                <div class="form-group">
                    <input type="text" id="name" name="name" placeholder="Adınız" required>
                </div>
                <div class="form-group">
                    <input type="email" id="email" name="email" placeholder="E-posta Adresiniz" required>
                </div>
                <div class="form-group">
                    <input type="text" id="subject" name="subject" placeholder="Konu" required>
                </div>
                <div class="form-group">
                    <textarea id="message" name="message" placeholder="Mesajınız" required></textarea>
                </div>
                <button type="submit" class="btn">Gönder</button>
            `;
        }, 5000);
    });
}

// Sayfa içi animasyonlar
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 50) {
            element.classList.add('animated');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);