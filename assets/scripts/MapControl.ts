import { _decorator, Collider2D, Component, Contact2DType, instantiate, IPhysics2DContact, Node, Prefab, Vec3 } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('MapControl')
export class MapControl extends Component {

    @property({ type: Prefab, tooltip: "vật cản" })
    private obstaclePrefab: Prefab = null;

    @property({ type: Node, tooltip: "điểm xoá vật" })
    private destroyPos: Node = null;

    fixedXPositions: Vec3[] = [
        new Vec3(-220, 600, 0), // Vị trí 1
        new Vec3(-110, 600, 0), // Vị trí 2
        new Vec3(0, 600, 0),    // Vị trí 3
        new Vec3(110, 600, 0),  // Vị trí 4
        new Vec3(220, 600, 0)   // Vị trí 5
    ];

    onLoad() {
        this.schedule(this.spawnObstacle, GameManager.spawnInterval);
    }

    spawnObstacle() {
        const randomIndex = Math.floor(Math.random() * this.fixedXPositions.length);
        const spawnPosition = this.fixedXPositions[randomIndex];

        // Tạo vật cản
        const obstacle = instantiate(this.obstaclePrefab);
        obstacle.setPosition(spawnPosition);
        this.node.getChildByPath(`Barrier`).addChild(obstacle); // Thêm vật cản vào node cha

        this.scheduleOnce(() => obstacle.destroy(), 5);
    }
}


