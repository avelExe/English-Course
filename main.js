// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navContainer = document.querySelector('.nav-container');
    const menuOverlay = document.querySelector('.menu-overlay');
    const header = document.querySelector('.header');
    
    if (!burgerMenu || !navContainer) return;

    function toggleMenu() {
        burgerMenu.classList.toggle('active');
        navContainer.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        if (menuOverlay) {
            menuOverlay.classList.toggle('active');
        }
    }

    // Обработчик клика по бургер-меню
    burgerMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
        const isClickInside = navContainer.contains(e.target) || burgerMenu.contains(e.target);
        if (!isClickInside && navContainer.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Закрытие меню при клике по ссылке
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navContainer.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Предотвращение закрытия меню при клике внутри него
    navContainer.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Закрытие меню при ресайзе
    let lastWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        if (window.innerWidth !== lastWidth) {
            if (navContainer.classList.contains('active')) {
                toggleMenu();
            }
            lastWidth = window.innerWidth;
        }
    });

    // Обработка скролла
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
});

// A/B Testing
document.addEventListener('DOMContentLoaded', () => {
    // Randomly show one of two titles
    const titleA = document.getElementById('title-a');
    const titleB = document.getElementById('title-b');
    const showTitleB = Math.random() > 0.5;
    
    if (showTitleB) {
        titleA.classList.add('hidden');
        titleB.classList.remove('hidden');
    }

    // Track which title is shown
    const titleShown = showTitleB ? 'B' : 'A';
    console.log(`Showing title version: ${titleShown}`);
});

// Timer Configuration
const TIMER_END_DATE_KEY = 'course_timer_end';

function getTimerEndDate() {
    let endDate = localStorage.getItem(TIMER_END_DATE_KEY);
    
    if (!endDate) {
        // Set end date to next Monday at 00:00
        const now = new Date();
        const daysUntilMonday = 8 - now.getDay(); // 8 instead of 1 to ensure it's next Monday
        endDate = new Date(now);
        endDate.setDate(now.getDate() + daysUntilMonday);
        endDate.setHours(0, 0, 0, 0);
        
        // Store in localStorage
        localStorage.setItem(TIMER_END_DATE_KEY, endDate.toISOString());
    } else {
        endDate = new Date(endDate);
    }
    
    return endDate;
}

// Timer functionality
function updateTimer() {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 2); // 2 days from now
    endDate.setHours(endDate.getHours() + 12); // plus 12 hours

    function update() {
        const now = new Date();
        const diff = endDate - now;

        if (diff <= 0) {
            clearInterval(interval);
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    const interval = setInterval(update, 1000);
    update(); // Initial update
}

// Initialize timer when page loads
document.addEventListener('DOMContentLoaded', updateTimer);

// Test Questions
const questions = [
    {
        question: 'Как часто вы сталкиваетесь с английским?',
        options: ['Ежедневно', 'Несколько раз в неделю', 'Редко', 'Никогда'],
        type: 'radio'
    },
    {
        question: 'Какая у вас основная цель изучения английского?',
        options: ['Работа/Карьера', 'Путешествия', 'Саморазвитие', 'Переезд за границу'],
        type: 'checkbox'
    },
    {
        question: 'Как бы вы оценили свой текущий уровень разговорного английского?',
        options: ['Могу свободно общаться', 'Говорю с ошибками', 'Только базовые фразы', 'Практически не говорю'],
        type: 'radio'
    },
    {
        question: 'Сколько времени вы готовы уделять обучению ежедневно?',
        options: ['Более 2 часов', '1-2 часа', '30-60 минут', '15-30 минут'],
        type: 'radio'
    },
    {
        question: 'Какой навык для вас сейчас самый важный?',
        options: ['Разговорная речь', 'Грамматика', 'Аудирование', 'Письмо'],
        type: 'radio'
    },
    {
        question: 'Как вы предпочитаете учиться?',
        options: ['С преподавателем', 'В группе', 'Самостоятельно', 'Смешанный формат'],
        type: 'radio'
    },
    {
        question: 'Какой опыт изучения английского у вас есть?',
        options: ['Школа/Университет', 'Курсы', 'Самообучение', 'Нет опыта'],
        type: 'radio'
    },
    {
        question: 'Что вам сложнее всего в английском?',
        options: ['Восприятие на слух', 'Грамматические правила', 'Произношение', 'Словарный запас'],
        type: 'radio'
    },
    {
        question: 'Как быстро вы хотите достичь результата?',
        options: ['1 месяц', '3 месяца', '6 месяцев', 'Не важно'],
        type: 'radio'
    },
    {
        question: 'Какой стиль обучения вам ближе?',
        options: ['Интенсивный', 'Размеренный', 'По настроению', 'Строго по расписанию'],
        type: 'radio'
    }
];

function initTest() {
    const testForm = document.getElementById('level-test');
    const questionsContainer = testForm.querySelector('.questions-container');
    const progressFill = testForm.querySelector('.progress-fill');
    const currentQuestionSpan = document.getElementById('current-question');
    const prevButton = document.getElementById('prev-question');
    const nextButton = document.getElementById('next-question');
    
    let currentQuestion = 0;
    const answers = new Array(questions.length).fill(null);

    function createQuestion(index) {
        const question = questions[index];
        const div = document.createElement('div');
        div.className = 'question';
        div.innerHTML = `
            <h3>${question.question}</h3>
            <div class="options">
                ${question.options.map((option, i) => `
                    <label class="${question.type === 'checkbox' ? 'checkbox' : ''}">
                        <input type="${question.type}" 
                               name="q${index}" 
                               value="${i}"
                               ${question.type === 'checkbox' && answers[index]?.includes(i) ? 'checked' : 
                                 question.type === 'radio' && answers[index] === i ? 'checked' : ''}>
                        <span>${option}</span>
                    </label>
                `).join('')}
            </div>
        `;
        return div;
    }

    function showQuestion(index) {
        const questionElements = questionsContainer.querySelectorAll('.question');
        questionElements.forEach(el => el.remove());
        
        const newQuestion = createQuestion(index);
        newQuestion.classList.add('active');
        questionsContainer.appendChild(newQuestion);
        
        // Update progress
        currentQuestionSpan.textContent = index + 1;
        progressFill.style.width = `${((index + 1) / questions.length) * 100}%`;
        
        // Update buttons
        prevButton.disabled = index === 0;
        nextButton.textContent = index === questions.length - 1 ? 'Завершить' : 'Далее';
    }

    function handleAnswer() {
        const question = questions[currentQuestion];
        if (question.type === 'checkbox') {
            const selected = questionsContainer.querySelectorAll(`input[name="q${currentQuestion}"]:checked`);
            answers[currentQuestion] = Array.from(selected).map(input => parseInt(input.value));
        } else {
            const selected = questionsContainer.querySelector(`input[name="q${currentQuestion}"]:checked`);
            if (selected) {
                answers[currentQuestion] = parseInt(selected.value);
            }
        }
    }

    prevButton.addEventListener('click', () => {
        handleAnswer();
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion(currentQuestion);
        }
    });

    nextButton.addEventListener('click', () => {
        handleAnswer();
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
        } else if (currentQuestion === questions.length - 1) {
            // Show results
            showResults(answers);
        }
    });

    function showResults(answers) {
        // Рассчитываем уровень и рекомендуемый тариф
        const levels = ['Начинающий', 'Элементарный', 'Средний', 'Продвинутый'];
        let score = 0;
        
        answers.forEach((answer, index) => {
            if (Array.isArray(answer)) {
                // Для чекбоксов считаем среднее значение выбранных опций
                score += answer.reduce((sum, val) => sum + val, 0) / answer.length;
            } else {
                score += answer || 0;
            }
        });
        
        const levelIndex = Math.floor((score / (answers.length * 3)) * levels.length);
        const level = levels[levelIndex];
        
        // Определяем рекомендуемый тариф (с 70% вероятностью рекомендуем Премиум)
        const recommendPremium = Math.random() < 0.7;
        const tariff = recommendPremium ? {
            name: 'Премиум',
            price: '14 900 ₽',
            features: [
                'Персональный наставник',
                'Разговорные практики',
                'Доступ к урокам на 30 дней',
                'Поддержка куратора'
            ]
        } : {
            name: 'Базовый',
            price: '9 900 ₽',
            features: [
                'Доступ к урокам на 30 дней',
                'Базовые материалы',
                'Поддержка куратора'
            ]
        };
        
        questionsContainer.innerHTML = `
            <div class="test-results">
                <h3>Анализ завершен</h3>
                <div class="level-badge">${level}</div>
                
                <div class="recommendation-card">
                    <h4>Рекомендуемый тариф: ${tariff.name}</h4>
                    <ul>
                        ${tariff.features.map(feature => `
                            <li>${feature}</li>
                        `).join('')}
                    </ul>
                    <div class="price-tag">
                        ${tariff.price}
                        <small>/ месяц</small>
                    </div>
                    <button class="nav-button">Выбрать тариф</button>
                </div>
                
                <a href="https://t.me/avel_en" target="_blank" class="consultant-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" fill="currentColor"/>
                    </svg>
                    Получить консультацию
                </a>
                
                <div class="email-form">
                    <input type="email" placeholder="Введите ваш email" required>
                    <button type="submit" class="nav-button">Получить подробный план обучения</button>
                </div>
            </div>
        `;
        
        testForm.querySelector('.test-navigation').style.display = 'none';
        progressFill.style.width = '100%';
    }

    // Initialize first question
    showQuestion(0);
}

// Progress Chart
function initChart() {
    const ctx = document.getElementById('vocabulary-chart');
    if (!ctx) return;
    
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(96, 165, 250, 0.2)');
    gradient.addColorStop(1, 'rgba(96, 165, 250, 0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Неделя 1', 'Неделя 2', 'Неделя 3', 'Неделя 4'],
            datasets: [{
                label: 'Новых слов',
                data: [80, 180, 320, 450],
                borderColor: '#60A5FA',
                backgroundColor: gradient,
                tension: 0.35,
                fill: true,
                pointBackgroundColor: '#60A5FA',
                pointBorderColor: '#fff',
                pointHoverRadius: 8,
                pointRadius: 6,
                borderWidth: 3,
                pointHoverBackgroundColor: '#60A5FA',
                pointHoverBorderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1F2937',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} новых слов`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#E5E7EB',
                        font: {
                            size: 12
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#E5E7EB',
                        font: {
                            size: 12
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Enhanced Navigation with Active State
function updateActiveMenuState() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// Enhanced Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 90,
            behavior: 'smooth'
        });
        
        // Update active state
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Update active state on scroll
window.addEventListener('scroll', updateActiveMenuState);
window.addEventListener('load', updateActiveMenuState);

// Interactive Elements Animation
document.querySelectorAll('.interactive-element').forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        element.style.setProperty('--mouse-x', `${x}px`);
        element.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Feature Cards Interaction
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('pulse-animation');
    });
    
    card.addEventListener('mouseleave', () => {
        card.classList.remove('pulse-animation');
    });
});

// Notification System
function showNotification(title, message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.997-4L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"/>
            </svg>
        </div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;

    // Add to document
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    });

    // Auto-hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// Handle email form submission
document.addEventListener('DOMContentLoaded', () => {
    initTest();
    initChart();
    updateTimer();
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .result-card, .price-card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('animate__animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Add email form submission handler
    const emailForm = document.querySelector('.email-form');
    if (emailForm) {
        emailForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = emailForm.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (email) {
                // Here you would typically send the email to your server
                // For now, we'll just show the notification
                showNotification(
                    'Спасибо за интерес!',
                    'Мы свяжемся с вами в ближайшее время на указанный email.'
                );
                emailInput.value = ''; // Clear the input
            }
        });
    }
});
