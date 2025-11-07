import { _decorator, Component, Label, Node, Sprite, SpriteFrame, tween, UITransform, v3, Vec3 } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('RewardRffect')
export class RewardRffect extends Component {

    @property({ type: Label, tooltip: 'Số điểm được cộng' })
    private numBonus: Label = null;

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
        this.numBonus.string = `+${GameManager.scorePlus}`;

        // Convert both positions into the local coordinate system of this.node
        let localSpawnPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(spawnPos).clone();
        let localTargetPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(targetWorldPos).clone();

        this.numBonus.node.position = localTargetPos.clone().add(v3(0, -100, 0));
        tween(this.numBonus.node)
            .to(0.8, { scale: v3(0.5, 0.5, 1), position: localTargetPos })
            .start();

        for (let i = 0; i < this.rewardNodes.length; i++) {
            let node = this.rewardNodes[i];
            node.position = localSpawnPos; // Start at the spawn position
            node.active = true;
            node.scale = v3(1.2, 1.2, 1.2);

            this.scheduleOnce(() => {
                // Tween the reward nodes towards the target position
                tween(node)
                    .to(0.8, { scale: v3(0.9, 0.9, 0.9), position: localTargetPos })
                    .call(() => {
                        node.active = false;
                        if (i === this.rewardNodes.length - 1) {
                            this.node.destroy();
                        }
                    })
                    .start();
            }, i * 0.05)
        }
    }
}


