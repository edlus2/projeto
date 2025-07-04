document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica para os Modais ---
    const openIESModalBtn = document.getElementById('openIESModal');
    const openCursoModalBtn = document.getElementById('openCursoModal');
    const openRegistroModalBtn = document.getElementById('openRegistroModal');

    const modalIES = document.getElementById('modalIES');
    const modalCurso = document.getElementById('modalCurso');
    const modalRegistro = document.getElementById('modalRegistro');

    // Seleciona todos os botões de fechar (X no canto e "Fechar" no rodapé)
    const closeButtons = document.querySelectorAll('.close-button, .close-button-footer');

    // Função para abrir um modal
    function openModal(modalElement) {
        modalElement.style.display = 'flex'; // Usar flex para centralizar
    }

    // Função para fechar um modal
    function closeModal(modalElement) {
        modalElement.style.display = 'none';
    }

    // Event Listeners para abrir os modais
    openIESModalBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Evita que a página recarregue
        openModal(modalIES);
    });
    openCursoModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(modalCurso);
    });
    openRegistroModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(modalRegistro);
    });
    // Event Listeners para fechar os modais
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const modalToCloseId = e.target.dataset.modal; // Pega o ID do modal do atributo data-modal
            const modalToClose = document.getElementById(modalToCloseId);
            if (modalToClose) {
                closeModal(modalToClose);
            }
        });
    });
    // Fechar modal clicando fora dele
    window.addEventListener('click', (e) => {
        if (e.target === modalIES) {
            closeModal(modalIES);
        }
        if (e.target === modalCurso) {
            closeModal(modalCurso);
        }
        if (e.target === modalRegistro) {
            closeModal(modalRegistro);
        }
    });

    // --- Lógica para o Toggle da Informação do Aluno no Topo ---
    const toggleAlunoInfoBtn = document.getElementById('toggleAlunoInfo');
    const alunoInfoContent = document.getElementById('alunoInfoContent');

    // Initially, hides the information and adjusts the button
    alunoInfoContent.classList.add('hidden');
    toggleAlunoInfoBtn.classList.add('collapsed');
    toggleAlunoInfoBtn.addEventListener('click', () => {
        alunoInfoContent.classList.toggle('hidden');
        toggleAlunoInfoBtn.classList.toggle('collapsed'); // Alternates the class to change the arrow
    });

    // --- Nova Lógica para o Toggle da Sidebar ---
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarContent = document.querySelector('.sidebar-content');

    // Function to check if it's a mobile/small screen
    const isMobile = () => window.innerWidth <= 768; // Matches your @media query breakpoint

    // Initial state setup for sidebar based on screen size
    if (isMobile()) {
        sidebar.classList.add('collapsed');
        // No 'expanded' class initially, content is hidden by default CSS
    } else {
        sidebar.classList.remove('collapsed');
        sidebar.classList.add('expanded'); // Ensure content is shown by default on large screens
    }

    // Toggle functionality
    sidebarToggle.addEventListener('click', () => {
        if (isMobile()) { // Only toggle on mobile screens
            sidebar.classList.toggle('collapsed');
            sidebar.classList.toggle('expanded');
        }
    });

    // Adjust sidebar state on window resize
    window.addEventListener('resize', () => {
        if (isMobile()) {
            // If it becomes mobile, ensure it's collapsed unless explicitly expanded
            if (!sidebar.classList.contains('expanded')) {
                 sidebar.classList.add('collapsed');
            }
        } else {
            // If it becomes large, ensure it's always expanded
            sidebar.classList.remove('collapsed');
            sidebar.classList.add('expanded');
        }
    });
});