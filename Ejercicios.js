let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;

    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }

    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

setInterval(nextSlide, 4000);

function handleScrollAnimation() {
    const sections = document.querySelectorAll('section');
    const triggerBottom = window.innerHeight * 0.8;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < triggerBottom) {
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
        }
    });
}

window.addEventListener('scroll', handleScrollAnimation);
document.addEventListener('DOMContentLoaded', handleScrollAnimation);

function handleHeaderFade() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;

    const opacity = Math.max(1 - scrollPosition / 200, 0);
    header.style.opacity = opacity.toString();
}

window.addEventListener('scroll', handleHeaderFade);

function highlightSection(event) {
    const href = event.target.getAttribute('href');

    // Si el enlace no contiene un hash (#), deja que funcione normalmente
    if (!href.startsWith('#')) {
        return;
    }

    // Si es un enlace interno, bloquea el comportamiento predeterminado
    event.preventDefault();

    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('highlighted');
    });

    const targetId = href.substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
        targetSection.classList.add('highlighted');
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', highlightSection);
});

document.addEventListener('DOMContentLoaded', () => {
    const dropdownTitle = document.querySelector('.dropdown-title');
    const dropdown = document.querySelector('.dropdown');

    dropdownTitle.addEventListener('click', () => {
        dropdown.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove('active');
        }
    });
});




document.addEventListener('DOMContentLoaded', () => {
    const btnInvertir = document.getElementById('invertirColoresBtn');
    const notificacion = document.getElementById('notificacionModo');

    // Función para mostrar mensaje
    function mostrarNotificacion(texto) {
        notificacion.textContent = texto;
        notificacion.classList.remove('oculto');
        notificacion.classList.add('visible');

        // Ocultar después de 2.5 segundos
        setTimeout(() => {
            notificacion.classList.remove('visible');
            notificacion.classList.add('oculto');
        }, 1000);
    }

    // Comprobar modo guardado
    const modoGuardado = localStorage.getItem('modoInvertido');
    if (modoGuardado === 'true') {
        document.body.classList.add('invertido');
        btnInvertir.textContent = '🌙';
    } else {
        btnInvertir.textContent = '🌞';
    }

    // Evento botón
    if (btnInvertir) {
        btnInvertir.addEventListener('click', () => {
            document.body.classList.toggle('invertido');
            const estaInvertido = document.body.classList.contains('invertido');
            localStorage.setItem('modoInvertido', estaInvertido);

            if (estaInvertido) {
                btnInvertir.textContent = '🌙';
                mostrarNotificacion('🌞 Modo claro activado');
            } else {
                btnInvertir.textContent = '🌞';
                mostrarNotificacion('🌙 Modo oscuro activado');
            }
        });
    }
});

//pizarra
document.addEventListener('DOMContentLoaded', () => {
    const botonesPizarra = document.querySelectorAll('.btn-pizarra');

    botonesPizarra.forEach(boton => {
        boton.addEventListener('click', () => {
            const pizarra = boton.nextElementSibling;
            pizarra.classList.toggle('oculto');

            if (!pizarra.classList.contains('oculto')) {
                boton.textContent = 'Cerrar pizarra';
            } else {
                boton.textContent = 'Abrir pizarra';
            }
        });
    });
});

//calculadora
function append(character) {
    const display = document.getElementById('display');
    display.value += character;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch {
        display.value = 'Error';
    }
}

document.getElementById('toggleCalcBtn').addEventListener('click', () => {
    const calc = document.getElementById('calculatorContainer');
    calc.classList.toggle('oculto');
});

// Hacer la calculadora arrastrable
const calculator = document.getElementById('calculatorContainer');
const header = calculator.querySelector('.calculator-header');

let offsetX, offsetY, isDragging = false;

header.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - calculator.offsetLeft;
    offsetY = e.clientY - calculator.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        calculator.style.left = `${e.clientX - offsetX}px`;
        calculator.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function closeCalculator() {
    const calc = document.getElementById('calculatorContainer');
    calc.classList.add('oculto');
}
