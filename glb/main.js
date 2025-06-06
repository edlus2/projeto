import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

// Elementos do DOM
const previewContainer = document.getElementById('three-preview-container');
const textInput = document.getElementById('text-input');
const textColorInput = document.getElementById('text-color');
const textDepthInput = document.getElementById('text-depth');
const textDepthValueSpan = document.getElementById('text-depth-value');
const addBaseCheckbox = document.getElementById('add-base');
const addBackgroundPanelCheckbox = document.getElementById('add-background-panel');
const previewButton = document.getElementById('preview-button');
const generateGlbButton = document.getElementById('generate-glb-button');
const loadingOverlay = document.querySelector('.loading-overlay');

// NOVOS ELEMENTOS DO DOM PARA OPÇÕES DE CENA
const sceneBackgroundColorInput = document.getElementById('scene-background-color');
const addFuturisticGridCheckbox = document.getElementById('add-futuristic-grid');
const textEmissiveCheckbox = document.getElementById('text-emissive');
const emissiveIntensityGroup = document.getElementById('emissive-intensity-group');
const emissiveIntensityInput = document.getElementById('emissive-intensity');
const emissiveIntensityValueSpan = document.getElementById('emissive-intensity-value');
const fontSelect = document.getElementById('font-select'); // Elemento do DOM para o seletor de fonte

// Variáveis da cena 3D
let scene, camera, renderer, controls;
let currentTextMesh, baseMesh, backgroundPanelMesh;
let loadedFont = null; // A fonte atualmente carregada
let updateTimeout = null; // Para o debounce
let futuristicGrid; // Grade para o chão
let particles; // Sistema de partículas

// Fontes alternativas (fallback) - Removido FONT_URL fixo, agora o select controla

// Funções auxiliares
function showLoading(message = "") {
    loadingOverlay.classList.remove('hidden');
    if (message) {
        loadingOverlay.querySelector('p').textContent = message;
    }
    // Desabilitar botões enquanto carrega
    generateGlbButton.disabled = true;
    previewButton.disabled = true;
}

function hideLoading() {
    loadingOverlay.classList.add('hidden');
    // Reabilitar botões
    generateGlbButton.disabled = false;
    previewButton.disabled = false;
}

function showNotification(message, type = "success") {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
}

// MODIFICADO: loadFont agora aceita uma URL de fonte
async function loadFont(fontUrl) {
    // Apenas carrega se a URL da nova fonte for diferente da carregada atualmente
    if (loadedFont && loadedFont.jsonUrl === fontUrl) {
        return loadedFont; // Já carregado
    }

    return new Promise((resolve, reject) => {
        showLoading("Carregando fonte 3D...");
        
        const fontLoader = new FontLoader();
        fontLoader.load(
            fontUrl, // Usa a URL passada como argumento
            (font) => {
                loadedFont = font;
                loadedFont.jsonUrl = fontUrl; // Armazena a URL para futuras comparações
                hideLoading();
                resolve(font);
            },
            undefined, // Callback de progresso
            (error) => {
                hideLoading();
                console.error("Erro ao carregar fonte:", error);
                showNotification("Erro ao carregar fonte 3D. Texto pode não aparecer.", "error");
                reject(error);
                // Desabilitar inputs de texto e gerar GLB se a fonte não carregar
                textInput.disabled = true;
                generateGlbButton.disabled = true;
                previewButton.disabled = true;
                fontSelect.disabled = true; // Desabilitar o seletor de fonte também
            }
        );
    });
}

function addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(5, 10, 7);
    directionalLight1.castShadow = true;
    directionalLight1.shadow.mapSize.width = 1024;
    directionalLight1.shadow.mapSize.height = 1024;
    directionalLight1.shadow.camera.near = 0.5;
    directionalLight1.shadow.camera.far = 50;
    directionalLight1.shadow.camera.left = -5;
    directionalLight1.shadow.camera.right = 5;
    directionalLight1.shadow.camera.top = 5;
    directionalLight1.shadow.camera.bottom = -5;
    scene.add(directionalLight1);
    
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-5, 5, -5);
    scene.add(directionalLight2);
}

function setupEventListeners() {
    textInput.addEventListener('input', () => {
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(updatePreview, 300);
    });
    textColorInput.addEventListener('input', updatePreview);
    textDepthInput.addEventListener('input', () => {
        textDepthValueSpan.textContent = textDepthInput.value;
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(updatePreview, 300);
    });
    
    textEmissiveCheckbox.addEventListener('change', () => {
        emissiveIntensityGroup.style.display = textEmissiveCheckbox.checked ? 'flex' : 'none';
        updatePreview();
    });
    emissiveIntensityInput.addEventListener('input', () => {
        emissiveIntensityValueSpan.textContent = emissiveIntensityInput.value;
        updatePreview(); 
    });

    // NOVO: Event listener para o seletor de fonte
    fontSelect.addEventListener('change', async () => {
        // Carrega a nova fonte selecionada e espera ela carregar
        await loadFont(fontSelect.value);
        // Em seguida, atualiza a pré-visualização
        updatePreview(); 
    });

    addBaseCheckbox.addEventListener('change', updatePreview);
    addBackgroundPanelCheckbox.addEventListener('change', updatePreview);
    addFuturisticGridCheckbox.addEventListener('change', updatePreview);

    sceneBackgroundColorInput.addEventListener('input', () => {
        scene.background.set(sceneBackgroundColorInput.value);
    });
    
    previewButton.addEventListener('click', updatePreview);
    generateGlbButton.addEventListener('click', generateGLB);
    
    window.addEventListener('resize', () => {
        camera.aspect = previewContainer.clientWidth / previewContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(previewContainer.clientWidth, previewContainer.clientHeight);
    });

    // GARANTE A VISIBILIDADE INICIAL DO SLIDER DE BRILHO E O VALOR INICIAL
    emissiveIntensityGroup.style.display = textEmissiveCheckbox.checked ? 'flex' : 'none';
    emissiveIntensityValueSpan.textContent = emissiveIntensityInput.value;
}

function cleanupScene() {
    const objectsToRemove = [];
    if (currentTextMesh) {
        objectsToRemove.push(currentTextMesh);
        currentTextMesh = null;
    }
    if (baseMesh) {
        objectsToRemove.push(baseMesh);
        baseMesh = null;
    }
    if (backgroundPanelMesh) {
        objectsToRemove.push(backgroundPanelMesh);
        backgroundPanelMesh = null;
    }
    if (futuristicGrid) {
        objectsToRemove.push(futuristicGrid);
        futuristicGrid = null;
    }
    
    objectsToRemove.forEach(obj => {
        scene.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
            if (Array.isArray(obj.material)) {
                obj.material.forEach(m => m.dispose());
            } else {
                obj.material.dispose();
            }
        }
    });
    renderer.renderLists.dispose();
}

function createBase() {
    const baseWidth = 4;
    const baseDepth = 4;

    const baseGeometry = new THREE.BoxGeometry(baseWidth, 0.2, baseDepth);
    const baseMaterial = new THREE.MeshStandardMaterial({
        color: 0x223344,
        emissive: 0x0a1b2c,
        emissiveIntensity: 0.5,
        roughness: 0.4,
        metalness: 0.6
    });

    baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
    baseMesh.position.y = -0.1;
    baseMesh.receiveShadow = true;
    baseMesh.castShadow = true;
    scene.add(baseMesh);
}

function createFuturisticGrid() {
    const gridDivisions = 20;
    const baseSize = 4;
    const gridColor1 = new THREE.Color(0x00ffff);
    const gridColor2 = new THREE.Color(0x008888);

    futuristicGrid = new THREE.GridHelper(baseSize * 1.5, gridDivisions, gridColor1, gridColor2);
    futuristicGrid.material.opacity = 0.5;
    futuristicGrid.material.transparent = true;
    futuristicGrid.position.y = 0.01;
    scene.add(futuristicGrid);
}

function createBackgroundPanel() {
    const panelGeometry = new THREE.PlaneGeometry(8, 5);
    const panelMaterial = new THREE.MeshStandardMaterial({
        color: 0x444444,
        side: THREE.DoubleSide,
        roughness: 0.8,
        metalness: 0.1
    });
    backgroundPanelMesh = new THREE.Mesh(panelGeometry, panelMaterial);
    backgroundPanelMesh.position.set(0, 1.5, -3);
    backgroundPanelMesh.receiveShadow = true;
    scene.add(backgroundPanelMesh);
}

function createParticlesOnce() {
    if (particles) return;

    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 10;
        const y = Math.random() * 5 + 0.5;
        const z = (Math.random() - 0.5) * 10;
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        const color = new THREE.Color();
        color.setHSL(Math.random() * 0.2 + 0.5, 0.7, 0.5 + Math.random() * 0.5);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.03,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true
    });

    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
}

async function updatePreview() {
    // Esconde o slider de intensidade se o checkbox não estiver marcado
    emissiveIntensityGroup.style.display = textEmissiveCheckbox.checked ? 'flex' : 'none';

    if (!loadedFont) {
        console.warn("Fonte ainda não carregada. Aguardando...");
        showLoading("Aguardando fonte ser carregada...");
        // Tenta carregar a fonte padrão do select se ainda não carregou
        try {
            await loadFont(fontSelect.value);
        } catch (error) {
            console.error("Falha ao carregar fonte na pré-visualização.", error);
            hideLoading();
            return;
        }
    }
    
    showLoading("Atualizando visualização...");
    try {
        const objectsToDispose = [];
        if (currentTextMesh) {
            objectsToDispose.push(currentTextMesh);
            currentTextMesh = null;
        }
        if (baseMesh) {
            objectsToDispose.push(baseMesh);
            baseMesh = null;
        }
        if (backgroundPanelMesh) {
            objectsToDispose.push(backgroundPanelMesh);
            backgroundPanelMesh = null;
        }
        if (futuristicGrid) {
            objectsToDispose.push(futuristicGrid);
            futuristicGrid = null;
        }
        objectsToDispose.forEach(obj => {
            scene.remove(obj);
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
                if (Array.isArray(obj.material)) {
                    obj.material.forEach(m => m.dispose());
                } else {
                    obj.material.dispose();
                }
            }
        });
        renderer.renderLists.dispose();
        
        const inputText = textInput.value.trim() || "3D TEXT";
        const textColor = new THREE.Color(textColorInput.value);
        const textDepth = parseFloat(textDepthInput.value);
        const isEmissive = textEmissiveCheckbox.checked;
        const emissiveIntensity = parseFloat(emissiveIntensityInput.value);

        // --- 1. Criar texto 3D ---
        const textMaterial = new THREE.MeshStandardMaterial({ 
            color: textColor,
            roughness: 0.3,
            metalness: 0.8,
            emissive: isEmissive ? textColor : new THREE.Color(0x000000),
            emissiveIntensity: isEmissive ? emissiveIntensity : 0 
        });
        const textGeometry = new TextGeometry(inputText, {
            font: loadedFont, // Usa a fonte atualmente carregada
            size: 1,
            depth: textDepth,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.05,
            bevelSize: 0.02,
            bevelSegments: 4
        });
        
        textGeometry.computeBoundingBox();
        const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
        const textHeight = textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y;
        
        currentTextMesh = new THREE.Mesh(textGeometry, textMaterial);
        currentTextMesh.castShadow = true;
        
        const baseHeightOffset = addBaseCheckbox.checked ? 0.1 : 0;
        currentTextMesh.position.set(
            -textWidth / 2,
            baseHeightOffset,
            0
        );
        scene.add(currentTextMesh);

        // --- 2. Adicionar Base (se selecionado) ---
        if (addBaseCheckbox.checked) {
            createBase();
        }
        
        // --- 3. Adicionar Painel de Fundo (se selecionado) ---
        if (addBackgroundPanelCheckbox.checked) {
            createBackgroundPanel();
        }

        // --- 4. Adicionar Grade Futurista (se selecionado) ---
        if (addFuturisticGridCheckbox.checked) {
            createFuturisticGrid();
        }
        
        // --- 5. Partículas: Já criadas uma vez no init, não precisam ser recriadas aqui ---
        if (particles) {
            particles.visible = true; // Mantém as partículas visíveis
        }

        // --- 6. Atualizar Cor de Fundo da Cena ---
        scene.background.set(sceneBackgroundColorInput.value);
        
        // --- 7. Atualizar alvo da câmera ---
        if (currentTextMesh) {
            currentTextMesh.geometry.computeBoundingBox();
            const textCenterY = currentTextMesh.geometry.boundingBox.max.y / 2 + currentTextMesh.position.y;
            controls.target.set(0, textCenterY, 0);
        } else {
            controls.target.set(0, 0.5, 0);
        }
        controls.update();
        
    } catch (error) {
        console.error("Erro ao atualizar visualização:", error);
        showNotification("Erro ao gerar visualização", "error");
    } finally {
        hideLoading();
    }
}

async function generateGLB() {
    if (!currentTextMesh) {
        showNotification("Nenhum texto para exportar!", "error");
        return;
    }
    
    showLoading("Gerando arquivo GLB...");
    generateGlbButton.disabled = true;
    try {
        const exporter = new GLTFExporter();
        const exportGroup = new THREE.Group();

        exportGroup.add(currentTextMesh.clone());
        if (addBaseCheckbox.checked && baseMesh) {
            exportGroup.add(baseMesh.clone());
        }
        
        if (addBackgroundPanelCheckbox.checked && backgroundPanelMesh) {
            exportGroup.add(backgroundPanelMesh.clone());
        }
        
        const glb = await new Promise((resolve, reject) => {
            exporter.parse(
                exportGroup,
                resolve,
                reject,
                {
                    binary: true,
                    onlyVisible: true,
                    trs: false
                }
            );
        });
        const blob = new Blob([glb], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        let fileName = textInput.value.trim() || 'texto_3d';
        fileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        a.download = `${fileName}.glb`;
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        setTimeout(() => URL.revokeObjectURL(url), 100);
        showNotification("Arquivo GLB gerado com sucesso!", "success");
        
    } catch (error) {
        console.error("Erro ao gerar GLB:", error);
        showNotification("Falha ao gerar arquivo GLB", "error");
    } finally {
        generateGlbButton.disabled = false;
        hideLoading();
    }
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);

    // Animação das partículas (mantida para efeito de fundo)
    if (particles) {
        particles.rotation.y += 0.0005; 
        particles.position.y = Math.sin(Date.now() * 0.0007) * 0.2 + 0.5; 
    }
}

async function init() {
    showLoading("Inicializando visualizador 3D...");
    try {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(sceneBackgroundColorInput.value);
        
        camera = new THREE.PerspectiveCamera(
            75,
            previewContainer.clientWidth / previewContainer.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 1.5, 5);
        camera.lookAt(0, 0.5, 0);
        
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(previewContainer.clientWidth, previewContainer.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        previewContainer.appendChild(renderer.domElement);
        
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.maxPolarAngle = Math.PI / 2;
        controls.target.set(0, 0.5, 0);
        
        addLights();

        // Carrega a fonte inicial selecionada no dropdown
        await loadFont(fontSelect.value); 

        // Partículas são criadas UMA ÚNICA VEZ na inicialização
        createParticlesOnce(); 

        setupEventListeners();
        
        animate();
        
        // Garante a visibilidade inicial do slider de brilho e o valor inicial
        emissiveIntensityGroup.style.display = textEmissiveCheckbox.checked ? 'flex' : 'none';
        emissiveIntensityValueSpan.textContent = emissiveIntensityInput.value;

        updatePreview(); // Primeira atualização para exibir o texto e elementos

    } catch (error) {
        console.error("Erro na inicialização:", error);
        showNotification("Falha ao inicializar o visualizador 3D", "error");
    } finally {
        hideLoading();
    }
}

window.onload = init;