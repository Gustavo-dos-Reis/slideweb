document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const btnAnterior = document.getElementById('anterior');
    const btnProximo = document.getElementById('proximo');
    const indicadores = document.getElementById('indicadores');
    const pontosIndicadores = document.querySelectorAll('.indicador');
    
    let slideAtual = 0;
    let intervaloSlider;
    const tempoTransicao = 5000; // 5 segundos
    
    // Inicia o slider automático
    function iniciarSliderAutomatico() {
        intervaloSlider = setInterval(proximoSlide, tempoTransicao);
    }
    
    // Vai para um slide específico
    function irParaSlide(indice) {
        slides.forEach(slide => slide.classList.remove('ativo'));
        pontosIndicadores.forEach(ponto => ponto.classList.remove('ativo'));
        
        slideAtual = indice;
        slides[slideAtual].classList.add('ativo');
        pontosIndicadores[slideAtual].classList.add('ativo');
        
        slider.style.transform = `translateX(-${slideAtual * 100}%)`;
        
        // Reinicia o temporizador ao mudar de slide manualmente
        reiniciarIntervalo();
    }
    
    // Próximo slide
    function proximoSlide() {
        slideAtual = (slideAtual + 1) % slides.length;
        irParaSlide(slideAtual);
    }
    
    // Slide anterior
    function anteriorSlide() {
        slideAtual = (slideAtual - 1 + slides.length) % slides.length;
        irParaSlide(slideAtual);
    }
    
    // Reinicia o intervalo do slider automático
    function reiniciarIntervalo() {
        clearInterval(intervaloSlider);
        iniciarSliderAutomatico();
    }
    
    // Event listeners
    btnProximo.addEventListener('click', function() {
        proximoSlide();
    });
    
    btnAnterior.addEventListener('click', function() {
        anteriorSlide();
    });
    
    // Navegação pelos indicadores
    pontosIndicadores.forEach(ponto => {
        ponto.addEventListener('click', function() {
            const indice = parseInt(this.getAttribute('data-indice'));
            irParaSlide(indice);
        });
    });
    
    // Inicia o slider
    iniciarSliderAutomatico();
    
    // Pausa o slider quando o mouse está sobre ele
    slider.parentElement.addEventListener('mouseenter', function() {
        clearInterval(intervaloSlider);
    });
    
    // Retoma o slider quando o mouse sai
    slider.parentElement.addEventListener('mouseleave', function() {
        reiniciarIntervalo();
    });
});