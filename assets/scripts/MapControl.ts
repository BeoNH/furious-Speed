import { _decorator, Component, instantiate, Prefab, Vec3 } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('MapControl')
export class MapControl extends Component {
    public static instantiate: MapControl;

    @property({ type: Prefab, tooltip: "vật cản" })
    private obstaclePrefab: Prefab = null;

    private previousIndex: number = -1; // Biến lưu lại kết quả trước đó

    onLoad() {
        MapControl.instantiate = this;
    }

    spawnObstacle() {  
        // Lặp lại nếu trùng với kết quả trước đó
        const getRandomIndex = () => {
            let randomIndex: number;
        
            do {
                randomIndex = Math.floor(Math.random() * GameManager.fixedXPositions.length);
            } while (randomIndex === this.previousIndex);
        
            this.previousIndex = randomIndex; // Cập nhật giá trị của kết quả trước đó
            return randomIndex;
        }

        const spawnPosition = GameManager.fixedXPositions[getRandomIndex()];

        // Tạo vật cản
        const obstacle = instantiate(this.obstaclePrefab);
        obstacle.setPosition(spawnPosition);
        this.node.getChildByPath(`Barrier`).addChild(obstacle); // Thêm vật cản vào node cha
    }
}


