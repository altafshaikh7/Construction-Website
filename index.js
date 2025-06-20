
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;

    // Initialize slider
    function startSlider() {
        slideInterval = setInterval(nextSlide, 2000); // Change slide every 5 seconds
    }

    // Go to specific slide
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Event listeners
    nextBtn.addEventListener('click', function() {
        nextSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', function() {
        prevSlide();
        resetInterval();
    });

    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            goToSlide(slideIndex);
            resetInterval();
        });
    });

    // Reset timer when manually changing slides
    function resetInterval() {
        clearInterval(slideInterval);
        startSlider();
    }

    // Start the slider
    startSlider();
});


// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('open');
});

// Cost Calculator
const sizeSlider = document.getElementById('project-size');
const sizeValue = document.getElementById('size-value');
const projectType = document.getElementById('project-type');
const estimate = document.getElementById('estimate');

function updateEstimate() {
    const size = sizeSlider.value;
    const type = projectType.value;
    const rate = type === 'residential' ? 120 : 200;
    const total = size * rate;
    
    sizeValue.textContent = `${size} sq ft`;
    estimate.textContent = `$${total.toLocaleString()}`;
}

sizeSlider.addEventListener('input', updateEstimate);
projectType.addEventListener('change', updateEstimate);

// Live Time Updater
function updateLiveTime() {
    const now = new Date();
    document.getElementById('live-time').textContent = now.toLocaleTimeString();
}
setInterval(updateLiveTime, 1000);

// 3D Model Controls
// Three.js Implementation
  
    // Initialize scene, camera, renderer
    const container = document.getElementById('container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Sky blue
    
    // Enhanced camera setup
    const camera = new THREE.PerspectiveCamera(
      45, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.set(8, 5, 10);
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    
    // Add orbit controls for user interaction
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 30;
    
    // Textures (would normally be loaded from files in a production environment)
    const createTexture = (color, roughness = 0.5) => {
      return new THREE.MeshStandardMaterial({ 
        color: color,
        roughness: roughness,
        metalness: 0.1
      });
    };
    
    // Enhanced house construction
    function createHouse() {
      const houseGroup = new THREE.Group();
      
      // House base with more detailed geometry
      const baseGeometry = new THREE.BoxGeometry(4, 2.5, 4);
      const baseMaterial = createTexture(0xE6B17E, 0.7); // Sandstone color
      const house = new THREE.Mesh(baseGeometry, baseMaterial);
      house.castShadow = true;
      house.receiveShadow = true;
      house.position.y = 1.25;
      houseGroup.add(house);
      
      // Window 1
      const windowGeo = new THREE.PlaneGeometry(1, 1);
      const windowMat = new THREE.MeshStandardMaterial({ 
        color: 0x7EC0EE,
        transparent: true,
        opacity: 0.7,
        metalness: 0.9,
        roughness: 0.1
      });
      const window1 = new THREE.Mesh(windowGeo, windowMat);
      window1.position.set(1.5, 1.5, 2.01);
      houseGroup.add(window1);
      
      // Window 2
      const window2 = window1.clone();
      window2.position.set(-1.5, 1.5, 2.01);
      houseGroup.add(window2);
      
      // Roof with better geometry
      const roofGeometry = new THREE.ConeGeometry(3.2, 2, 4);
      const roofMaterial = createTexture(0x8B4513, 0.8); // Wooden roof
      const roof = new THREE.Mesh(roofGeometry, roofMaterial);
      roof.position.y = 3.25;
      roof.rotation.y = Math.PI / 4;
      roof.castShadow = true;
      houseGroup.add(roof);
      
      // Door with frame
      const doorFrameGeo = new THREE.BoxGeometry(1.2, 1.8, 0.2);
      const doorFrameMat = createTexture(0x4E342E, 0.6);
      const doorFrame = new THREE.Mesh(doorFrameGeo, doorFrameMat);
      doorFrame.position.set(0, 0.9, 2.01);
      
      const doorGeo = new THREE.BoxGeometry(0.9, 1.6, 0.1);
      const doorMat = createTexture(0x3E2723, 0.4);
      const door = new THREE.Mesh(doorGeo, doorMat);
      door.position.set(0, 0.8, 2.06);
      
      houseGroup.add(doorFrame);
      houseGroup.add(door);
      
      // Chimney
      const chimneyGeo = new THREE.BoxGeometry(0.5, 1.2, 0.5);
      const chimneyMat = createTexture(0x9E9E9E, 0.9);
      const chimney = new THREE.Mesh(chimneyGeo, chimneyMat);
      chimney.position.set(1, 3.5, -1);
      chimney.castShadow = true;
      houseGroup.add(chimney);
      
      return houseGroup;
    }
    
    const house = createHouse();
    scene.add(house);
    
    // Enhanced ground with texture variation
    const groundGeometry = new THREE.PlaneGeometry(30, 30, 10, 10);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x7CB342,
      roughness: 0.9
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Add a path
    const pathGeometry = new THREE.PlaneGeometry(3, 10);
    const pathMaterial = createTexture(0x795548, 0.9);
    const path = new THREE.Mesh(pathGeometry, pathMaterial);
    path.rotation.x = -Math.PI / 2;
    path.position.set(0, 0.01, -3);
    scene.add(path);
    
    // Improved lighting system
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    
    const sunLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    sunLight.position.set(10, 20, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 50;
    sunLight.shadow.camera.left = -20;
    sunLight.shadow.camera.right = 20;
    sunLight.shadow.camera.top = 20;
    sunLight.shadow.camera.bottom = -20;
    scene.add(sunLight);
    
    // Add a hemisphere light for more natural illumination
    const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0x8D8D8D, 0.6);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);
    
    // Add some environment details
    function addEnvironment() {
      // Trees
      function createTree(x, z) {
        const treeGroup = new THREE.Group();
        
        // Trunk
        const trunkGeo = new THREE.CylinderGeometry(0.2, 0.3, 1.5);
        const trunkMat = createTexture(0x8B4513, 0.9);
        const trunk = new THREE.Mesh(trunkGeo, trunkMat);
        trunk.position.y = 0.75;
        trunk.castShadow = true;
        treeGroup.add(trunk);
        
        // Leaves
        const leavesGeo = new THREE.SphereGeometry(1.2, 8, 8);
        const leavesMat = createTexture(0x2E7D32, 0.7);
        const leaves = new THREE.Mesh(leavesGeo, leavesMat);
        leaves.position.y = 2;
        leaves.castShadow = true;
        treeGroup.add(leaves);
        
        treeGroup.position.set(x, 0, z);
        return treeGroup;
      }
      
      scene.add(createTree(-5, -5));
      scene.add(createTree(6, -4));
      scene.add(createTree(3, 6));
      
      // Fence
      function createFenceSegment(x, z, rotation) {
        const fenceGeo = new THREE.BoxGeometry(1.5, 1, 0.1);
        const fenceMat = createTexture(0x5D4037, 0.8);
        const fence = new THREE.Mesh(fenceGeo, fenceMat);
        fence.position.set(x, 0.5, z);
        fence.rotation.y = rotation;
        fence.castShadow = true;
        return fence;
      }
      
      for (let i = -7; i <= 7; i += 1.6) {
        scene.add(createFenceSegment(i, 7, 0));
        scene.add(createFenceSegment(i, -7, 0));
        scene.add(createFenceSegment(7, i, Math.PI/2));
        scene.add(createFenceSegment(-7, i, Math.PI/2));
      }
    }
    
    addEnvironment();
    
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      controls.update(); // Required for damping
      
      // Gentle rotation of the house for showcase
      house.rotation.y += 0.002;
      
      renderer.render(scene, camera);
    }
    animate();
    
    // UI Controls
    document.getElementById('dayBtn').addEventListener('click', () => {
      sunLight.intensity = 1;
      ambientLight.intensity = 0.5;
      scene.background = new THREE.Color(0x87CEEB);
    });
    
    document.getElementById('nightBtn').addEventListener('click', () => {
      sunLight.intensity = 0.1;
      ambientLight.intensity = 0.2;
      scene.background = new THREE.Color(0x111122);
      
      // Add some interior light
      if (!scene.getObjectByName('interiorLight')) {
        const interiorLight = new THREE.PointLight(0xFFE082, 1, 5);
        interiorLight.position.set(0, 1.5, 1);
        interiorLight.name = 'interiorLight';
        interiorLight.castShadow = true;
        scene.add(interiorLight);
        
        // Make windows glow
        scene.traverse(obj => {
          if (obj.material && obj.material.color.getHex() === 0x7EC0EE) {
            obj.material.emissive = new THREE.Color(0xFFFF00);
            obj.material.emissiveIntensity = 0.5;
          }
        });
      }
    });
    
    document.getElementById('resetBtn').addEventListener('click', () => {
      controls.reset();
      camera.position.set(8, 5, 10);
      controls.update();
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });


