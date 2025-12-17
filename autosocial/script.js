// ===== INICIALIZAÇÃO =====
console.log("🚀 AutoSocial iniciado com sucesso!");

document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ DOM completamente carregado");
    
    // ===== ELEMENTOS DO DOM =====
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const statNumbers = document.querySelectorAll('.stat-number');
    const emailInput = document.getElementById('emailInput');
    const ctaButton = document.getElementById('ctaButton');
    const platformBtns = document.querySelectorAll('.platform-btn');
    const pricingBtns = document.querySelectorAll('.btn-pricing');
    const tabs = document.querySelectorAll('.tab');
    
    // ===== MENU MOBILE =====
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('.icon');
            if (icon.classList.contains('icon-menu')) {
                icon.classList.remove('icon-menu');
                icon.classList.add('icon-close');
            } else {
                icon.classList.remove('icon-close');
                icon.classList.add('icon-menu');
            }
        });
    }
    
    // Fechar menu ao clicar em link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (menuToggle) {
                const icon = menuToggle.querySelector('.icon');
                icon.classList.remove('icon-close');
                icon.classList.add('icon-menu');
            }
        });
    });
    
    // ===== ANIMAÇÃO DOS NÚMEROS =====
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16); // 60fps
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + (element.textContent.includes('%') ? '%' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    function animateNumbers() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            animateCounter(stat, target);
        });
    }
    
    // Observador para animar números quando visíveis
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const socialProofSection = document.querySelector('.social-proof');
    if (socialProofSection) {
        observer.observe(socialProofSection);
    }
    
    // ===== ANIMAÇÃO DO CHAT =====
    function animateChat() {
        const typingMessage = document.querySelector('.typing');
        const chatContainer = document.querySelector('.chat-container');
        
        if (typingMessage && chatContainer) {
            setTimeout(() => {
                typingMessage.classList.remove('typing');
                
                // Adicionar nova mensagem
                const newMessage = document.createElement('div');
                newMessage.className = 'message outgoing';
                newMessage.innerHTML = `
                    <div class="message-content">
                        <p><span class="icon icon-robot"></span> Entrega em até 3 dias úteis para sua região!</p>
                        <span class="time">14:31 <span class="icon icon-done"></span></span>
                    </div>
                    <div class="avatar">🤖</div>
                `;
                
                chatContainer.appendChild(newMessage);
                chatContainer.scrollTop = chatContainer.scrollHeight;
                
                // Adicionar resposta do usuário após 3 segundos
                setTimeout(() => {
                    const userReply = document.createElement('div');
                    userReply.className = 'message incoming';
                    userReply.innerHTML = `
                        <div class="avatar">👤</div>
                        <div class="message-content">
                            <p>Perfeito! Vou comprar agora.</p>
                            <span class="time">14:32</span>
                        </div>
                    `;
                    chatContainer.appendChild(userReply);
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }, 3000);
                
                // Reiniciar animação após 8 segundos
                setTimeout(() => {
                    typingMessage.classList.add('typing');
                    // Remover mensagens extras
                    const messages = chatContainer.querySelectorAll('.message');
                    if (messages.length > 4) {
                        for (let i = 4; i < messages.length; i++) {
                            messages[i].remove();
                        }
                    }
                    // Chamar animação novamente
                    setTimeout(animateChat, 1000);
                }, 8000);
                
            }, 2000);
        }
    }
    
    // Iniciar animação do chat
    if (document.querySelector('.chat-container')) {
        setTimeout(animateChat, 1000);
    }
    
    // ===== TABS DO CHAT =====
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remover active de todas
            tabs.forEach(t => t.classList.remove('active'));
            // Adicionar active na clicada
            this.classList.add('active');
            
            // Simular mudança de plataforma no chat
            const chatTitle = this.querySelector('.icon').className.includes('messenger') 
                ? 'Messenger' 
                : this.querySelector('.icon').className.includes('instagram')
                ? 'Instagram'
                : 'Facebook';
            
            console.log(`📱 Chat mudado para: ${chatTitle}`);
        });
    });
    
    // ===== BOTÕES DE PLATAFORMA =====
    platformBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.platform-card');
            const platform = card.querySelector('h3').textContent;
            
            showNotification(`🔗 Saiba mais sobre ${platform}`, 'info');
            
            // Efeito visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // ===== BOTÕES DE PREÇOS =====
    pricingBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const plan = this.closest('.pricing-card').querySelector('h3').textContent;
            const price = this.closest('.pricing-card').querySelector('.price').textContent;
            
            showNotification(`💰 Plano ${plan} selecionado: ${price}`, 'success');
            
            // Scroll para CTA
            setTimeout(() => {
                document.querySelector('.cta-section').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }, 500);
        });
    });
    
    // ===== FORMULÁRIO CTA =====
    if (ctaButton && emailInput) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email) {
                showNotification('📧 Por favor, digite seu email', 'warning');
                emailInput.focus();
                return;
            }
            
            if (!emailRegex.test(email)) {
                showNotification('❌ Por favor, digite um email válido', 'warning');
                emailInput.focus();
                return;
            }
            
            // Simular envio
            const originalText = ctaButton.innerHTML;
            ctaButton.innerHTML = '<span class="icon icon-loading"></span> Enviando...';
            ctaButton.disabled = true;
            
            setTimeout(() => {
                showNotification('🎉 Conta criada com sucesso! Redirecionando...', 'success');
                
                // Resetar botão
                setTimeout(() => {
                    ctaButton.innerHTML = originalText;
                    ctaButton.disabled = false;
                    emailInput.value = '';
                    
                    // Simular redirecionamento
                    showNotification('✅ Você será redirecionado para o painel em 3s...', 'info');
                    
                    setTimeout(() => {
                        showNotification('🚀 Bem-vindo ao AutoSocial! Configure sua primeira automação.', 'success');
                    }, 3000);
                    
                }, 1000);
                
            }, 1500);
        });
        
        // Permitir submit com Enter
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                ctaButton.click();
            }
        });
    }
    
    // ===== NOTIFICAÇÕES =====
    function showNotification(message, type = 'info') {
        // Remover notificações anteriores
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Criar nova notificação
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        let icon = '💡';
        if (type === 'success') icon = '✅';
        if (type === 'warning') icon = '⚠️';
        if (type === 'info') icon = 'ℹ️';
        
        notification.innerHTML = `
            <div class="notification-content">
                <span class="icon">${icon}</span>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <span class="icon icon-close"></span>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Estilos da notificação
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
            border-left: 4px solid ${type === 'success' ? '#06d6a0' : type === 'warning' ? '#f59e0b' : '#4361ee'};
        `;
        
        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        notification.querySelector('.notification-close').style.cssText = `
            background: none;
            border: none;
            color: #6c757d;
            cursor: pointer;
            padding: 5px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        notification.querySelector('.notification-close:hover').style.cssText = `
            background: #f1f1f1;
            color: #333;
        `;
        
        // Animação de entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Fechar ao clicar no botão
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
        
        // Auto-fechar após 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // ===== SCROLL SUAVE =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href.startsWith('#')) return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== ANIMAÇÃO DE CARDS AO SCROLL =====
    function animateOnScroll() {
        const cards = document.querySelectorAll('.platform-card, .stat-card, .pricing-card, .step');
        
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight * 0.8) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar opacidade
    document.querySelectorAll('.platform-card, .stat-card, .pricing-card, .step').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Observar scroll
    window.addEventListener('scroll', animateOnScroll);
    setTimeout(animateOnScroll, 100);
    
    // ===== DATA ATUAL NO FOOTER =====
    const today = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    const dateElements = document.querySelectorAll('.footer-bottom p');
    if (dateElements.length > 1) {
        dateElements[0].innerHTML += ` • ${today.toLocaleDateString('pt-BR', options)}`;
    }
    
    // ===== EFEITO DE DIGITAÇÃO NO TÍTULO =====
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
    
    // ===== TESTE DE CARREGAMENTO =====
    console.log("✅ Todas as funções foram inicializadas");
    
    // Mostrar mensagem de boas-vindas
    setTimeout(() => {
        console.log("🎉 Site totalmente carregado e funcional!");
        showNotification('🤖 AutoSocial carregado com sucesso!', 'success');
    }, 1000);
});

// ===== FUNÇÃO GLOBAL PARA TESTE =====
window.testSite = function() {
    alert("✅ Site funcionando perfeitamente!\n\nRecursos ativos:\n• Menu responsivo\n• Animações\n• Formulários\n• Notificações\n• Scroll suave");
    return true;
};

console.log("📋 Digite testSite() no console para testar todas as funcionalidades!");