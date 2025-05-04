document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const btnAnterior = document.getElementById('anterior');
    const btnProximo = document.getElementById('proximo');
    const indicadores = document.getElementById('indicadores');
    const pontosIndicadores = document.querySelectorAll('.indicador');
    
    let slideAtual = 0;
    let intervaloSlider;
    const tempoTransicao = 5000; 
    
    function iniciarSliderAutomatico() {
        intervaloSlider = setInterval(proximoSlide, tempoTransicao);
    }
    
    function irParaSlide(indice) {
        slides.forEach(slide => slide.classList.remove('ativo'));
        pontosIndicadores.forEach(ponto => ponto.classList.remove('ativo'));
        
        slideAtual = indice;
        slides[slideAtual].classList.add('ativo');
        pontosIndicadores[slideAtual].classList.add('ativo');
        
        slider.style.transform = `translateX(-${slideAtual * 100}%)`;
        
        reiniciarIntervalo();
    }
    
    function proximoSlide() {
        slideAtual = (slideAtual + 1) % slides.length;
        irParaSlide(slideAtual);
    }
    
    function anteriorSlide() {
        slideAtual = (slideAtual - 1 + slides.length) % slides.length;
        irParaSlide(slideAtual);
    }
    
    function reiniciarIntervalo() {
        clearInterval(intervaloSlider);
        iniciarSliderAutomatico();
    }
    
    btnProximo.addEventListener('click', function() {
        proximoSlide();
    });
    
    btnAnterior.addEventListener('click', function() {
        anteriorSlide();
    });
    
    pontosIndicadores.forEach(ponto => {
        ponto.addEventListener('click', function() {
            const indice = parseInt(this.getAttribute('data-indice'));
            irParaSlide(indice);
        });
    });
    
    iniciarSliderAutomatico();
    
    slider.parentElement.addEventListener('mouseenter', function() {
        clearInterval(intervaloSlider);
    });
    
    slider.parentElement.addEventListener('mouseleave', function() {
        reiniciarIntervalo();
    });
});