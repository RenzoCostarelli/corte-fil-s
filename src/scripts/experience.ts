import * as THREE from "three";

const GRID_SIZE = 75;
const MOUSE_RADIUS = 0.05;
const STRENGTH = 0.1;
const RELAXATION = 0.925;
const DISPLACEMENT = 0.015;
const ABERRATION = 0.55;

let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.OrthographicCamera | null = null;
let mesh: THREE.Mesh | null = null;
let material: THREE.ShaderMaterial | null = null;
let dataTexture: THREE.DataTexture | null = null;
let videoTexture: THREE.VideoTexture | null = null;

let currentHero: HTMLElement | null = null;
let currentVideo: HTMLVideoElement | null = null;
let currentVideoContainer: HTMLElement | null = null;
let width = 0;
let height = 0;
let gridX = 0;
let gridY = 0;

const mouse = { x: 0, y: 0, prevX: 0, prevY: 0, vX: 0, vY: 0 };

function createDataTexture() {
  const aspect = width / height;
  gridX = aspect >= 1 ? Math.round(GRID_SIZE * aspect) : GRID_SIZE;
  gridY = aspect >= 1 ? GRID_SIZE : Math.round(GRID_SIZE / aspect);

  const data = new Float32Array(gridX * gridY * 4);
  const texture = new THREE.DataTexture(
    data,
    gridX,
    gridY,
    THREE.RGBAFormat,
    THREE.FloatType,
  );
  texture.magFilter = texture.minFilter = THREE.NearestFilter;
  texture.needsUpdate = true;
  return texture;
}

function getCoverScale(): [number, number] {
  if (!currentVideo) return [2, 2];
  const videoAspect =
    (currentVideo.videoWidth || 16) / (currentVideo.videoHeight || 9);
  const containerAspect = width / height;
  const scaleX = Math.max(1, videoAspect / containerAspect);
  const scaleY = Math.max(1, containerAspect / videoAspect);
  return [2 * scaleX, 2 * scaleY];
}

function updateDataTexture() {
  if (!dataTexture) return;
  const data = dataTexture.image.data;
  if (!data) return;
  for (let i = 0; i < data.length; i += 4) {
    data[i] *= RELAXATION;
    data[i + 1] *= RELAXATION;
  }

  const gridMouseX = gridX * mouse.x;
  const gridMouseY = gridY * (1 - mouse.y);
  const maxDist = GRID_SIZE * MOUSE_RADIUS;

  for (let i = 0; i < gridX; i++) {
    for (let j = 0; j < gridY; j++) {
      const distanceSq = (gridMouseX - i) ** 2 + (gridMouseY - j) ** 2;
      if (distanceSq < maxDist * maxDist) continue;

      const index = 4 * (i + gridX * j);
      const power = Math.min(10, maxDist / Math.sqrt(distanceSq));
      data[index] += STRENGTH * 100 * mouse.vX * power;
      data[index + 1] += STRENGTH * 100 * mouse.vY * power;
    }
  }

  mouse.vX *= 0.9;
  mouse.vY *= 0.9;
  dataTexture.needsUpdate = true;
}

function onMouseMove(event: MouseEvent) {
  if (!currentVideoContainer) return;
  const rect = currentVideoContainer.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  mouse.vX = x - mouse.prevX;
  mouse.vY = y - mouse.prevY;
  mouse.prevX = x;
  mouse.prevY = y;
  mouse.x = x;
  mouse.y = y;
}

function onResize() {
  if (!currentVideoContainer || !renderer || !mesh) return;
  width = currentVideoContainer.offsetWidth;
  height = currentVideoContainer.offsetHeight;

  mesh.geometry.dispose();
  mesh.geometry = new THREE.PlaneGeometry(...getCoverScale());

  if (dataTexture) dataTexture.dispose();
  dataTexture = createDataTexture();
  if (material) material.uniforms.uDataTexture.value = dataTexture;

  renderer.setSize(width, height);
}

export function init(hero: HTMLElement) {
  currentHero = hero;
  currentVideo = hero.querySelector("[data-hero-video]") as HTMLVideoElement;
  currentVideoContainer = hero.querySelector("[data-video]") as HTMLElement;

  if (!currentVideo || !currentVideoContainer) return;

  width = currentVideoContainer.offsetWidth;
  height = currentVideoContainer.offsetHeight;

  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 1;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.classList.add("hero-canvas");
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.inset = "0";

  currentVideoContainer.style.position = "relative";
  currentVideoContainer.appendChild(renderer.domElement);

  videoTexture = new THREE.VideoTexture(currentVideo);
  videoTexture.minFilter = videoTexture.magFilter = THREE.LinearFilter;
  videoTexture.generateMipmaps = false;

  const canvas = renderer.domElement;
  canvas.style.opacity = "0";
  canvas.style.transition = "opacity 0.8s ease";
  canvas.style.borderRadius = "0.375rem";
  window.addEventListener(
    "hero:animated",
    () => {
      canvas.style.opacity = "1";
      currentVideo!.style.transition = "opacity 0.8s ease";
      currentVideo!.style.opacity = "0";
    },
    { once: true },
  );

  dataTexture = createDataTexture();

  material = new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: videoTexture },
      uDataTexture: { value: dataTexture },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      uniform sampler2D uDataTexture;
      varying vec2 vUv;
      void main() {
      vec4 offset = texture2D(uDataTexture, vUv);
      vec2 shift = ${DISPLACEMENT} * offset.rg;
      vec2 split = shift * ${ABERRATION};

      float r = texture2D(uTexture, vUv + shift + split).r;
      float g = texture2D(uTexture, vUv + shift).g;
      float b = texture2D(uTexture, vUv + shift - split).b;

      gl_FragColor = vec4(r, g, b, 1.0);
  }`,
  });

  mesh = new THREE.Mesh(new THREE.PlaneGeometry(...getCoverScale()), material);
  scene.add(mesh);

  currentVideo.addEventListener("loadeddata", () => {
    if (!mesh) return;
    mesh.geometry.dispose();
    mesh.geometry = new THREE.PlaneGeometry(...getCoverScale());
  });

  hero.addEventListener("mousemove", onMouseMove);
  window.addEventListener("resize", onResize);

  // Force needsUpdate each frame: requestVideoFrameCallback may not fire until
  // the video delivers its first frame, so we bypass that race condition.
  renderer.setAnimationLoop(() => {
    if (!scene || !camera) return;
    if (videoTexture) videoTexture.needsUpdate = true;
    updateDataTexture();
    renderer!.render(scene, camera);
  });
}

export function destroy() {
  if (!renderer) return;

  renderer.setAnimationLoop(null);
  renderer.domElement.remove();
  renderer.dispose();

  if (mesh) {
    mesh.geometry.dispose();
    mesh = null;
  }
  if (material) {
    material.dispose();
    material = null;
  }
  if (dataTexture) {
    dataTexture.dispose();
    dataTexture = null;
  }
  if (videoTexture) {
    videoTexture.dispose();
    videoTexture = null;
  }

  if (currentHero) {
    currentHero.removeEventListener("mousemove", onMouseMove);
  }
  window.removeEventListener("resize", onResize);

  renderer = null;
  scene = null;
  camera = null;
  currentHero = null;
  currentVideo = null;
  currentVideoContainer = null;

  mouse.x = 0;
  mouse.y = 0;
  mouse.prevX = 0;
  mouse.prevY = 0;
  mouse.vX = 0;
  mouse.vY = 0;
}
