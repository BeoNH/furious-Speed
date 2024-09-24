import { _decorator, Component, Node, Sprite, SpriteFrame, tween, UITransform, v3, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RewardRffect')
export class RewardRffect extends Component {
    
    @property({ type: Node, tooltip: 'Effect nodes' })
    private rewardNodes: Node[] = [];

    /**
     * Initializes the reward effect.
     * @param rewardIndex Index of reward type.
     * @param spawnPos Position where the reward spawns.
     * @param targetPos Position to move the reward towards.
     */
    public init(spawnNode: Node, targetNode: Node) {
        // Convert the spawn position and target position to world coordinates
        let spawnPos = spawnNode.getComponent(UITransform).convertToWorldSpaceAR(v3(0, 0, 0));
        let targetWorldPos = targetNode.getComponent(UITransform).convertToWorldSpaceAR(v3(0, 0, 0));

        // Convert both positions into the local coordinate system of this.node
        let localSpawnPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(spawnPos);
        let localTargetPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(targetWorldPos);

        let points = this.getCirclePoints(150, localSpawnPos, this.rewardNodes.length, 50);

        for (let i = 0; i < this.rewardNodes.length; i++) {
            let node = this.rewardNodes[i];
            node.position = localSpawnPos; // Start at the spawn position
            node.active = true;
            node.scale = v3(1, 1, 1);

            node.setPosition(points[i]);

            // Tween the reward nodes towards the target position
            tween(node)
                .to(0.4, { scale: v3(0.9, 0.9, 0.9), position: localTargetPos })
                .call(() => {
                    node.active = false;
                    if (i === this.rewardNodes.length - 1) {
                        this.playEnd();
                    }
                })
                .start();
        }
    }


    /**
     * Generates points evenly spaced on a circle.
     * @param radius Radius of the circle.
     * @param center Center position of the circle.
     * @param count Number of points to generate.
     * @param randomScope Randomness in the positioning of points.
     * @returns Array of positions in Vec3 format.
     */
    public getCirclePoints(radius: number, center: Vec3, count: number, randomScope: number = 1): Vec3[] {
        let points = [];
        let radians = (Math.PI / 180) * Math.round(360 / count);

        for (let i = 0; i < count; i++) {
            let x = center.x + radius * Math.sin(radians * i);
            let y = center.y + radius * Math.cos(radians * i);
            points.push(v3(x + Math.random() * randomScope, 0, y + Math.random() * randomScope));
        }
        return points;
    }

    /**
     * Called when the effect is finished.
     */
    private playEnd() {
        // Put the node back into the pool or perform any cleanup necessary.
        this.node.destroy(); // Or return to a pool if using object pooling
    }
}


