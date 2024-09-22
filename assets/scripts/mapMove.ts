import { _decorator, Component, Node, v3 } from "cc";
import { GameManager } from "./GameManager";
const { ccclass, property } = _decorator;

@ccclass("mapMove")
export class mapMove extends Component {

  update(dt: number) {
    const oldPos = this.node.position.clone();
    let moveDistance = GameManager.speedMap * dt;
    let posY = oldPos.y - moveDistance;
    if (posY < -1100) {
      posY = 1140;
    }
    this.node.position = v3(oldPos.x, posY, oldPos.z);
  }

}
