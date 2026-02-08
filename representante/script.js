// Exemplo simples: Mudar a cor do header ao rolar a página
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.backgroundColor = '#f8f9fa';
    } else {
        header.style.padding = '20px 0';
        header.style.backgroundColor = '#fff';
    }
});

console.log("Site de Representação carregado com sucesso!");