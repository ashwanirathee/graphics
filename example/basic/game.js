import * as VoxelMiner from "../../lib/index.js";
import { CameraManager } from "./camera-manager.js";
import { SceneManager } from "./scene-manager.js";
import { RenderManager } from "./render-manager.js";
import { InputManager } from "./input-manager.js";
import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.20/+esm';


export const { canvas, gl } = VoxelMiner.setupWebGL();
export const gui = new GUI();

export var obj = {
  help: function () { alert('Hi! You might need to click on the screen to get a pointer lock which will allow you to move around in the world. Both keyboard and mouse provide controls!. Hope you like it!') },
  show_normals: false,

  animate_light: true,
  light1_color: [1.0, 1.0, 1.0],
  ambientLightFactor: 0.8,
  diffuseLightFactor: 0.5,
  specularLightFactor: 0.2,
  specularExponent: 16,

  camera_type: "FPS Camera",
  camera_fov: 45,
  camera_near: 0.1,
  camera_far: 100,
  camera_speed: 2,
  camera_sensitivity: 0.05,
  camera_aspect: 1,
  camera_eye: [13.0, 3.0, -3.0],
  camera_at: [-0.01, 3, -0.01],
  camera_up: [0, 1, 0],

  frame_rate: 0,
  frame_time: 0,
  draw_calls: 0,

  fallOffStart: 1.0,
  fallOffEnd: 0.0,
  fallOffStepExponent: 2.0,
}

/**
 * Represents a game.
 */
export class Game {
  constructor() {
    this.sceneManager = new SceneManager();
    this.cameraManager = new CameraManager(this.sceneManager.scene);
    this.renderManager = new RenderManager(this.sceneManager, this.cameraManager);
    this.inputManager = new InputManager(this.sceneManager, this.cameraManager);
    VoxelMiner.resizeCanvas(this.cameraManager.camera, this.sceneManager.scene, canvas, gl);
  }

  /**
   * Initializes the game.
   */
  init() {
    requestAnimationFrame(this.renderManager.render.bind(this.renderManager));
  }
}
