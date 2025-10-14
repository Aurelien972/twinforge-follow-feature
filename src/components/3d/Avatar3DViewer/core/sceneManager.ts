import * as THREE from 'three';
import { OrbitTouchControls } from '../../../../lib/3d/camera/OrbitTouchControls';
import { setupLighting } from '../../../../lib/3d/setup/lightingSetup';
import { setupStudioEnvironment, calculateEnvMapIntensity } from '../../../../lib/3d/setup/environmentSetup';
import logger from '../../../../lib/utils/logger';

export interface SceneInstance {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitTouchControls;
  containerId: string;
}


interface SceneCreationOptions {
  container: HTMLDivElement;
  finalGender: 'male' | 'female';
  faceOnly?: boolean; // ADDED
  serverScanId?: string;
}

/**
 * Create complete Three.js scene with renderer, camera, and controls
 */
export function createScene(options: SceneCreationOptions): SceneInstance {
  const { container, finalGender, faceOnly, serverScanId } = options; // MODIFIED
  
  logger.info('SCENE_MANAGER', 'Creating Three.js scene', {
    gender: finalGender,
    faceOnly, // ADDED
    serverScanId,
    containerSize: { width: container.clientWidth, height: container.clientHeight },
    philosophy: 'core_scene_creation'
  });

  // Create renderer with strict settings
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true, // Garder alpha à true pour la transparence
    powerPreference: 'high-performance',
    preserveDrawingBuffer: false,
    failIfMajorPerformanceCaveat: false
  });

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.physicallyCorrectLights = true;
  
  container.appendChild(renderer.domElement);

  // Create scene
  const scene = new THREE.Scene();
  scene.background = null; // MODIFIÉ : Définir le fond de la scène à null pour qu'il soit transparent

  // Add grid helper for reference (only for full body)
  if (!faceOnly) {
    const gridHelper = new THREE.GridHelper(10, 10, 0x444444, 0x222222);
    gridHelper.position.y = -0.1; // Slightly below ground level
    scene.add(gridHelper);
  }

  // Create camera with optimized FOV
  const fov = faceOnly ? 35 : 40; // Plus serré pour le visage pour réduire distorsion
  const camera = new THREE.PerspectiveCamera(
    fov,
    container.clientWidth / container.clientHeight,
    0.01, // Closer near plane
    100   // Adjusted far plane
  );
  
  // Enhanced responsive camera positioning
  const containerAspect = container.clientWidth / container.clientHeight;
  const isWideScreen = containerAspect > 1.5;
  const isTallScreen = containerAspect < 0.8;
  
  // Adjust initial camera position based on mode and aspect ratio
  let initialDistance: number;
  let initialHeight: number;

  if (faceOnly) {
    // Position optimisée pour le visage uniquement (tête et cou)
    initialDistance = 0.65;  // 65 cm de distance - plus proche pour cadrage tête/cou
    initialHeight = 1.65;    // Légèrement plus haut pour centrer sur le visage
  } else {
    // Position pour le corps entier
    initialDistance = isWideScreen ? 3.8 : isTallScreen ? 3.2 : 3.5;
    initialHeight = isWideScreen ? 0.8 : isTallScreen ? 0.6 : 0.7;
  }

  camera.position.set(0, initialHeight, initialDistance);

  // Create controls
  const controls = new OrbitTouchControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.enablePan = false; // Pan is generally not needed for avatar viewing
  
  if (faceOnly) {
    // Distances optimisées pour cadrage tête/cou uniquement
    controls.minDistance = 0.4;  // 40 cm - évite distorsion extrême
    controls.maxDistance = 1.2;  // 1.2 m - limite pour garder focus sur visage
  } else {
    // Enhanced responsive control limits for full body
    controls.minDistance = isWideScreen ? 2.2 : isTallScreen ? 1.8 : 2.0;
    controls.maxDistance = isWideScreen ? 12 : isTallScreen ? 10 : 11;
  }
  if (faceOnly) {
    // Mode visage: limiter la rotation pour garder le focus sur tête et cou
    controls.minPolarAngle = Math.PI * 0.35;  // Empêche vue du dessous
    controls.maxPolarAngle = Math.PI * 0.65;  // Empêche vue du dessus extrême
    controls.setTarget(new THREE.Vector3(0, 1.65, 0)); // Cibler le centre du visage
  } else {
    controls.minPolarAngle = Math.PI * 0.05; // Allow more upward viewing
    controls.maxPolarAngle = Math.PI * 0.95; // Allow more downward viewing
    controls.setTarget(new THREE.Vector3(0, 1.0, 0)); // Higher target for full body view
  }

  // Setup lighting
  setupLighting(scene);

  // Setup IBL (Image-Based Lighting) for photo-realistic reflections
  setupStudioEnvironment(scene, renderer);

  logger.info('SCENE_MANAGER', 'IBL environment configured', {
    hasEnvironment: !!scene.environment,
    philosophy: 'photo_realistic_ibl_active'
  });

  // Store renderer and camera globally for material compilation
  (window as any).__THREE_RENDERER__ = renderer;
  (window as any).__THREE_CAMERA__ = camera;
  (window as any).__THREE_SCENE__ = scene;

  const sceneInstance: SceneInstance = {
    renderer,
    scene,
    camera,
    controls,
    containerId: `viewer_${Date.now()}`
  };

  logger.info('SCENE_MANAGER', 'Scene creation completed', {
    containerId: sceneInstance.containerId,
    serverScanId,
    philosophy: 'core_scene_created'
  });

  return sceneInstance;
}

/**
 * Create resize handler for scene
 */
export function createResizeHandler(
  container: HTMLDivElement,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
): () => void {
  return () => {
    if (!container || !camera || !renderer) return;
    
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };
}

/**
 * Start animation loop
 */
export function startAnimationLoop(
  sceneInstance: SceneInstance,
  autoRotate: boolean = false,
  onFirstFrame?: () => void
): () => void {
  const { scene, renderer, camera, controls } = sceneInstance;
  let firstFrameRendered = false;

  controls.setAutoRotate(autoRotate);

  const animate = () => {
    const animationId = requestAnimationFrame(animate);
    
    controls.update();
    renderer.render(scene, camera);

    // Track first frame rendered
    if (!firstFrameRendered) {
      firstFrameRendered = true;
      onFirstFrame?.();
    }

    return animationId;
  };

  const animationId = animate();

  logger.info('SCENE_MANAGER', 'Animation loop started', {
    autoRotate,
    containerId: sceneInstance.containerId,
    philosophy: 'core_animation_loop_active'
  });

  // Return cleanup function
  return () => {
    cancelAnimationFrame(animationId);
  };
}

/**
 * Dispose of all scene resources
 */
export function disposeSceneResources(sceneInstance: SceneInstance): void {
  const { renderer, scene, controls } = sceneInstance;

  logger.info('SCENE_MANAGER', 'Starting scene resource disposal', {
    containerId: sceneInstance.containerId,
    philosophy: 'core_resource_cleanup'
  });

  // Dispose controls
  if (controls) {
    controls.dispose();
  }

  // Dispose scene resources
  if (scene) {
    scene.traverse((obj: THREE.Object3D) => {
      // Dispose geometries
      const geometry = (obj as any).geometry;
      if (geometry) {
        geometry.dispose();
      }

      // Dispose materials
      const material = (obj as any).material;
      if (material) {
        const materials = Array.isArray(material) ? material : [material];
        materials.forEach((mat: THREE.Material) => {
          // Dispose textures
          Object.values(mat).forEach((value: any) => {
            if (value && typeof value.dispose === 'function') {
              value.dispose();
            }
          });
          mat.dispose();
        });
      }
    });
    scene.clear();
  }

  // Force WebGL context loss and dispose renderer
  if (renderer) {
    const gl = renderer.getContext() as WebGLRenderingContext;
    const loseContextExt = gl.getExtension('WEBGL_lose_context');
    
    renderer.dispose();
    
    if (loseContextExt) {
      loseContextExt.loseContext();
    }

    // Remove DOM element
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }

    // Cleanup global references
    const cleanup = (renderer as any)._cleanup;
    if (cleanup) {
      cleanup();
    }
  }

  // Clear global references
  delete (window as any).__THREE_RENDERER__;
  delete (window as any).__THREE_CAMERA__;
  delete (window as any).__THREE_SCENE__;

  logger.info('SCENE_MANAGER', 'Scene resource disposal completed', {
    containerId: sceneInstance.containerId,
    philosophy: 'core_webgl_context_freed'
  });
}
