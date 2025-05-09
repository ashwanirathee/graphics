import * as VoxelMiner from "../../lib/index.js";
import { gl, obj } from "./game.js";

const debugkey = "scene_manager";

VoxelMiner.debugLog(debugkey, "Loading scene_manager...");

/**
 * Represents a scene manager that manages the scene graph, objects, skybox, and lights.
 */
export class SceneManager {
  constructor() {
    this.scene = new VoxelMiner.SceneGraph(gl, obj.ambientLightFactor, obj.diffuseLightFactor, obj.specularLightFactor, obj.specularExponent);
    this.scene.init();
    this.ball = null;
    this.addObjects();
    this.addSkyBox();
    this.addLights();
    // this.addCrosshair();
  }

  /**
   * Adds objects to the scene graph.
   */
  addObjects() {
    VoxelMiner.debugLog(debugkey, "Adding objects to scene graph");

    let floor = new VoxelMiner.Cube(2, 3, gl);
    floor.color = [0.49, 0.788, 0.29, 1.0];
    floor.matrix.translate(0, -4.2, 0);
    floor.matrix.scale(-32, 0.01, -32);

    let scan = new VoxelMiner.Scan(3, 1, gl, "./george-washington-greenough-statue-(1840)-150k.obj");
    scan.matrix.translate(0, 5, 0);

    this.scene.push(floor);
    this.scene.push(scan);
  }

  /**
   * Adds a skybox to the scene graph.
   */
  addSkyBox() {
    VoxelMiner.debugLog(debugkey, "Adding skybox to scene graph");
    this.scene.skybox = new VoxelMiner.Skybox(gl, VoxelMiner.SkyBox_BlueCloud);
  }

  /**
   * Adds lights to the scene graph.
   */
  addLights() {
    VoxelMiner.debugLog(debugkey, "Adding lights to scene graph");
    const light1 = new VoxelMiner.PointLight(gl, [15, 3, -15], obj.light1_color, 1);
    const light2 = new VoxelMiner.PointLight(gl, [15, 3, 15], obj.light2_color, 1);
    const light3 = new VoxelMiner.PointLight(gl, [-15, 3, 15], obj.light3_color, 1);
    const light4 = new VoxelMiner.PointLight(gl, [-15, 3, -15], obj.light4_color, 1);
    this.scene.addLight(light1);
    this.scene.addLight(light2);
    this.scene.addLight(light3);
    this.scene.addLight(light4);
  }

  addCrosshair(){
    this.scene.crosshair = new VoxelMiner.Crosshair(gl);
  }
}
