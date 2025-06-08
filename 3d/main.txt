// main.js

// Importa os módulos necessários do Three.js usando os caminhos definidos no import map do index.html.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// --- Variáveis Globais ---
const container = document.getElementById('three-scene-container'); // Contêiner HTML para a cena 3D
const fileInput = document.getElementById('file-input'); // Input de arquivo para upload de modelos
const fileNameSpan = document.getElementById('file-name'); // Span para exibir o nome do arquivo carregado
const toggleAxesButton = document.getElementById('toggle-axes'); // Botão para alternar os eixos
const toggleBaseButton = document.getElementById('toggle-base'); // Botão para alternar a base/chão
const colorButtons = document.querySelectorAll('.color-button'); // Botões para mudar a cor de fundo

let scene, camera, renderer, controls, currentModel; // Objetos essenciais do Three.js para a cena
let axesHelper; // Helper para exibir os eixos X, Y, Z
let basePlane; // Objeto 3D que representará a mesa/base
let gridHelper; // NOVO: Helper para a grade (linear)
let polarGridHelper; // NOVO: Helper para a grade polar (circular)
let particles; // NOVO: Sistema de partículas

// --- Funções de Inicialização da Cena 3D ---
function init() {
    // 1. Criação da Cena: O "palco" onde os objetos 3D viverão
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2c3e50); // Cor de fundo inicial (azul escuro)

    // 2. Criação da Câmera: Define o ponto de vista do usuário
    camera = new THREE.PerspectiveCamera(
        75, // Campo de visão (FOV - Field of View) em graus
        container.clientWidth / container.clientHeight, // Proporção da tela
        0.1, // Distância mínima para renderizar objetos
        1000 // Distância máxima para renderizar objetos
    );
    // Ajuste da posição inicial da câmera para favorecer a visualização da base
    camera.position.set(0, 5, 8); 
    camera.lookAt(0, 0, 0); // Faz a câmera olhar para o centro da cena

    // 3. Criação do Renderizador: Desenha a cena no canvas HTML
    renderer = new THREE.WebGLRenderer({ antialias: true }); // antialias suaviza as bordas
    renderer.setSize(container.clientWidth, container.clientHeight); // Define o tamanho do renderizador
    renderer.setPixelRatio(window.devicePixelRatio); // Melhora a qualidade em telas de alta resolução
    container.appendChild(renderer.domElement); // Adiciona o elemento <canvas> ao nosso div no HTML

    // 4. Criação dos Controles de Órbita: Permitem interagir com a cena
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Ativa suavidade no movimento
    controls.dampingFactor = 0.25; // Fator de amortecimento
    controls.screenSpacePanning = false; // Impede o "arrastar" lateral da cena
    controls.maxPolarAngle = Math.PI / 2; // Limita o ângulo de visão vertical para não ir para debaixo do "chão"
    controls.target.set(0, 0, 0); // NOVO: Define o alvo inicial dos controles para o centro da base/chão
    controls.update(); // Atualiza os controles após mudar o alvo

    // 5. Adiciona as luzes à cena
    addLights();

    // 6. Adiciona o helper de eixos (inicialmente escondido)
    axesHelper = new THREE.AxesHelper(5); // Eixos com tamanho 5
    axesHelper.visible = false; // Inicialmente invisível
    scene.add(axesHelper);

    // 7. Criação e Adição da Base/Chão estilizada
    createBasePlane(); 
    scene.add(basePlane); 

    // 8. NOVO: Adiciona GridHelper e PolarGridHelper
    createGrids();
    scene.add(gridHelper);
    scene.add(polarGridHelper);

    // 9. NOVO: Cria e adiciona o sistema de partículas
    createParticles();
    scene.add(particles);

    // 10. Inicia o loop de animação
    animate();

    // 11. Carrega um modelo padrão ao iniciar a página (ex: Cubo Simples)
    loadModel('modelos/Box.glb', false);
}

// Adiciona diferentes tipos de luzes à cena para uma boa iluminação
function addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight1.position.set(5, 10, 7);
    directionalLight1.castShadow = true;
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight2.position.set(-5, 5, -5);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0xffffff, 0.5, 100);
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);
}

// Função para criar a base/chão estilizada
function createBasePlane() {
    // Geometria da mesa: Um plano largo e fino (como um "chão")
    const geometry = new THREE.BoxGeometry(10, 0.1, 10); // Uma caixa de 10x0.1x10 unidades

    // Material da mesa: Usaremos um material que permita emissão ou brilho para o toque futurista
    // MeshStandardMaterial é bom para PBR (Physically Based Rendering)
    const material = new THREE.MeshStandardMaterial({
        color: 0x223344, // Cor base escura, quase azul-acinzentada
        emissive: 0x0a1b2c, // NOVO: Luz própria sutil para um brilho interno
        emissiveIntensity: 0.5, // Intensidade do brilho
        roughness: 0.4,  // Superfície um pouco lisa, mas não espelhada
        metalness: 0.6   // Aspecto metálico
    });

    basePlane = new THREE.Mesh(geometry, material);
    basePlane.position.y = -0.05; // Posiciona a mesa para que a parte superior fique em Y=0
    basePlane.receiveShadow = true; // Permite que a mesa receba sombras de outros objetos
    basePlane.castShadow = true; // Permite que a mesa projete sombras (se tiver altura)

    // NOVO: Adiciona uma propriedade para animação de brilho
    basePlane.emissivePulse = 0.005; // Velocidade da pulsação emissiva
}

// NOVO: Função para criar as grades
function createGrids() {
    // GridHelper: Grade linear para o chão
    gridHelper = new THREE.GridHelper(10, 10, 0x00ff00, 0x004400); // Tamanho, divisões, cor primária (verde brilhante), cor secundária
    gridHelper.position.y = 0.0; // Posiciona ligeiramente acima da base para evitar z-fighting
    gridHelper.material.opacity = 0.4;
    gridHelper.material.transparent = true;
    gridHelper.visible = true; // Visível por padrão ou pode ser controlado por botão

    // PolarGridHelper: Grade circular para um efeito mais futurista
    polarGridHelper = new THREE.PolarGridHelper(5, 10, 20, 64, 0x00ffff, 0x008888); // Raio, raios, círculos, segmentos, cor primária (ciano), cor secundária
    polarGridHelper.position.y = 0.01; // Ligeiramente acima do gridHelper para evitar z-fighting
    polarGridHelper.material.opacity = 0.3;
    polarGridHelper.material.transparent = true;
    polarGridHelper.visible = true; // Visível por padrão
}

// NOVO: Função para criar o sistema de partículas
function createParticles() {
    const particleCount = 1000; // Número de partículas
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];

    // Gerar posições e cores aleatórias para as partículas
    for (let i = 0; i < particleCount; i++) {
        // Posições aleatórias dentro de um cubo, centralizadas em Y
        positions.push(
            (Math.random() - 0.5) * 20, // X entre -10 e 10
            Math.random() * 5,          // Y entre 0 e 5 (altura acima do chão)
            (Math.random() - 0.5) * 20  // Z entre -10 e 10
        );

        // Cores aleatórias (tons de azul/ciano/branco para futurista)
        const color = new THREE.Color();
        color.setHSL(Math.random() * 0.2 + 0.5, 0.7, 0.5 + Math.random() * 0.5); // Tons de ciano/azul
        colors.push(color.r, color.g, color.b);
    }

    particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    // Material das partículas: PointsMaterial para pontos, ou ShaderMaterial para mais controle
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05, // Tamanho da partícula
        vertexColors: true, // Usa as cores definidas para cada vértice
        blending: THREE.AdditiveBlending, // Mistura as cores para um efeito de brilho
        transparent: true,
        opacity: 0.8
    });

    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particles.position.y = 2; // Posiciona as partículas ligeiramente acima do chão
}


// Loop de animação: Esta função é chamada repetidamente para atualizar e renderizar a cena
function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // Animação de entrada do modelo (se existir e tiver a propriedade 'rotationSpeed')
    if (currentModel && currentModel.rotationSpeed) {
        currentModel.rotation.y += currentModel.rotationSpeed;
    }

    // NOVO: Animação de brilho pulsante da base
    if (basePlane && basePlane.material.emissive) {
        // Varia a intensidade emissiva usando seno para um efeito de pulsação suave
        basePlane.material.emissiveIntensity = 0.5 + Math.sin(Date.now() * basePlane.emissivePulse) * 0.2;
    }

    // NOVO: Animação sutil das partículas
    if (particles) {
        particles.rotation.y += 0.0005; // Rotação lenta das partículas
        particles.position.y = 2 + Math.sin(Date.now() * 0.0007) * 0.2; // Movimento vertical sutil
    }

    renderer.render(scene, camera);
}

// Lidar com o redimensionamento da janela do navegador
function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    controls.update();
}

// --- Função Principal para Carregar Modelos 3D ---
function loadModel(source, isLocalFile = false) {
    // Remove o modelo anterior da cena, se houver
    if (currentModel) {
        scene.remove(currentModel);
        currentModel.traverse(object => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
            }
            if (object.texture) object.texture.dispose();
        });
        renderer.renderLists.dispose();
    }

    const loader = new GLTFLoader();

    if (isLocalFile) {
        const reader = new FileReader();
        reader.onload = (event) => {
            loader.parse(event.target.result, '', (gltf) => {
                handleLoadedModel(gltf);
            }, (error) => {
                console.error('Erro ao parsear arquivo GLB/GLTF local:', error);
                alert('Erro ao carregar o arquivo 3D. Verifique se é um GLB/GLTF válido.');
            });
        };
        reader.readAsArrayBuffer(source);
    } else {
        loader.load(
            source,
            handleLoadedModel,
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% carregado');
            },
            (error) => {
                console.error('Erro ao carregar modelo 3D:', error);
                alert('Erro ao carregar o modelo 3D de exemplo. Tente novamente.');
            }
        );
    }
}

// Função auxiliar que é chamada após um modelo ser carregado com sucesso
function handleLoadedModel(gltf) {
    currentModel = gltf.scene;
    scene.add(currentModel);

    // Ajusta o modelo para ficar visível e centralizado na cena
    const bbox = new THREE.Box3().setFromObject(currentModel);
    const center = bbox.getCenter(new THREE.Vector3());
    const size = bbox.getSize(new THREE.Vector3());

    // Centraliza o modelo, ajustando sua posição para que sua base esteja em Y=0
    currentModel.position.x = -center.x;
    currentModel.position.y = -bbox.min.y; 
    currentModel.position.z = -center.z;

    // Define uma velocidade de rotação inicial para a animação de entrada
    currentModel.rotationSpeed = 0.005;

    // Ajusta a câmera para focar no modelo e ter uma distância razoável
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs((maxDim / 2) / Math.tan(fov / 2)) * 1.5;

    camera.position.z = cameraZ;
    camera.position.y = size.y * 0.5; 

    // Configura o alvo dos controles para o centro do modelo (relativo à mesa)
    controls.target.set(0, size.y * 0.25, 0); 
    controls.update();

    // Remove a rotação de entrada após um tempo
    setTimeout(() => {
        currentModel.rotationSpeed = 0;
    }, 3000); 
}

// --- Event Listeners ---

// Event listener para o input de arquivo
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        fileNameSpan.textContent = `Arquivo: ${file.name}`;
        loadModel(file, true);
    } else {
        fileNameSpan.textContent = 'Nenhum arquivo selecionado';
    }
});

// Event listener para o botão de alternar eixos
toggleAxesButton.addEventListener('click', () => {
    if (axesHelper) {
        axesHelper.visible = !axesHelper.visible; 
    }
});

// Event listener para o botão de alternar base/chão
toggleBaseButton.addEventListener('click', () => {
    if (basePlane) {
        basePlane.visible = !basePlane.visible; 
        gridHelper.visible = basePlane.visible; // Grids seguem a visibilidade da base
        polarGridHelper.visible = basePlane.visible;
    }
});

// Event listeners para os botões de cor de fundo
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const color = button.dataset.color;
        scene.background.set(color);
    });
});

// Event listener para o redimensionamento da janela
window.addEventListener('resize', onWindowResize, false);

// Inicia a cena 3D quando a página é completamente carregada
window.onload = init;