import { _decorator, Collider2D, Component, Contact2DType, EPhysics2DDrawFlags, IPhysics2DContact, Node, PhysicsSystem2D, v3 } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Obstacle')
export class Obstacle extends Component {

    @property({ type: Collider2D, tooltip: "" })
    private flowMove: Collider2D = null;

    speedMove: number;
    onLoad() {
        // this.debugPhysics();
        let range = GameManager.speedObstacle;
        this.speedMove = Math.floor(Math.random() * (range[0] - range[1] + 1)) + range[1];
        this.flowMove.on(Contact2DType.BEGIN_CONTACT, this.onCollision, this);
    }

    debugPhysics() {
        PhysicsSystem2D.instance.enable = true;
        PhysicsSystem2D.instance.debugDrawFlags =
            EPhysics2DDrawFlags.Aabb |
            EPhysics2DDrawFlags.Pair |
            EPhysics2DDrawFlags.CenterOfMass |
            EPhysics2DDrawFlags.Joint |
            EPhysics2DDrawFlags.Shape;
    }

    protected onDestroy(): void {
        this.flowMove.off(Contact2DType.BEGIN_CONTACT, this.onCollision, this);
    }

    update(dt: number) {
        const moveDistance = this.speedMove * dt;
        const posY = this.node.position.y - moveDistance;
        
        if (posY < -660) {
            this.node.destroy();  // Hủy node nếu nó ra khỏi màn hình
        } else {
            this.node.setPosition(this.node.position.x, posY, this.node.position.z);  // Di chuyển node
        }
    }

    onCollision(self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null) {
        if (self.node.parent !== other.node.parent && other.node.parent.getComponent(Obstacle)) {
            // Đồng bộ hóa tốc độ của node va chạm
            const otherObstacle = other.node.parent.getComponent(Obstacle);
            if (otherObstacle) {
                self.node.parent.getComponent(Obstacle).speedMove = otherObstacle.speedMove;
            }
        }
    }
}


