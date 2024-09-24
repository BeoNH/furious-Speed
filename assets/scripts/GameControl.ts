import { _decorator, Collider2D, Component, Contact2DType, EventKeyboard, Input, input, instantiate, IPhysics2DContact, KeyCode, Node, Prefab, ResolutionPolicy, sys, tween, v3, Vec3, view } from 'cc';
import { GameManager } from './GameManager';
import { MapControl } from './MapControl';
import { NumberScrolling } from './NumberScrolling';
import { RewardRffect } from './RewardRffect';
const { ccclass, property } = _decorator;

@ccclass('GameControl')
export class GameControl extends Component {

  @property({ type: Node, tooltip: "người chơi" })
  private player: Node = null;

  @property({ type: Node, tooltip: "vật cản" })
  private barrier: Node = null;

  @property({ type: NumberScrolling, tooltip: "điểm người chơi" })
  private numScore: NumberScrolling = null;

  @property({ type: Prefab, tooltip: "điểm người chơi" })
  private pointEffect: Prefab = null;

  @property({ type: Node, tooltip: "" })
  private tagetPonit: Node = null;

  @property({ type: Node, tooltip: "" })
  private endPonit: Node = null;

  @property({ type: Node, tooltip: "màn thua cuộc" })
  private gameOverScene: Node = null;

  private currentIndex: number = 2; // Bắt đầu ở vị trí 3 (index 2)

  private direction: number = 1; // Hướng di chuyển (1 là lên, -1 là xuống)
  private elapsedTime: number = 0; // Thời gian đã trôi qua

  private score: number = 0; // điểm chơi 1 lượt


  onLoad() {
    //for pc
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

    // for mobile
    // if (sys.isMobile) {
    //   this.mobileBtn.active = true;
    //   this.leftTouch.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    //   this.rightTouch.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    // }
  }

  onDestroy() {
    input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);

    // if (sys.isMobile) {
    //   this.mobileBtn.active = false;
    //   this.leftTouch.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    //   this.rightTouch.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    // }
  }

  protected onEnable(): void {
    this.player.setPosition(GameManager.fixedPositions[this.currentIndex]);

    //sinh vat can
    this.schedule(() => MapControl.instantiate.spawnObstacle(), GameManager.spawnInterval);
  }

  protected onDisable(): void {
    this.currentIndex = 2;
    this.direction = 1;
    this.score = 0;
    this.numScore.to(this.score);
    this.player.getChildByPath(`car`).active = true;

    this.gameOverScene.active = false;
    this.barrier.removeAllChildren();
    this.unscheduleAllCallbacks();
  }

  protected start(): void {
    let body = this.player.getChildByPath(`car/body`).getComponent(Collider2D);
    if (body) {
      body.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    let pointUp = this.player.getChildByPath(`car/point`).getComponent(Collider2D);
    if (pointUp) {
      pointUp.on(Contact2DType.END_CONTACT, this.onEndContact, this);
    }
  }

  update(dt: number) {
    if (this.player && this.player.getChildByPath(`car`).active) {
      // Cập nhật thời gian
      this.elapsedTime += dt;

      let oldPos = this.player.position.clone();
      // Di chuyển node theo hướng và tốc độ
      this.player.setPosition(oldPos.x, oldPos.y + this.direction * GameManager.speedPlayer * dt, oldPos.z);

      // Kiểm tra nếu đã hết thời gian di chuyển lên/xuống
      if (this.elapsedTime >= 1) {
        this.direction *= -1; // Đổi hướng di chuyển
        this.elapsedTime = 0; // Reset thời gian

        this.score++;// cộng thêm 1 điểm;
        this.numScore.to(this.score);
      }
    }
  }

  onKeyDown(event: EventKeyboard) {
    // if (this.isMoving) return;

    switch (event.keyCode) {
      case KeyCode.ARROW_LEFT:
        this.moveLeft();
        break;
      case KeyCode.ARROW_RIGHT:
        this.moveRight();
        break;
    }
  }

  moveLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.moveTo(GameManager.fixedPositions[this.currentIndex]);
    }
  }

  moveRight() {
    if (this.currentIndex < GameManager.fixedPositions.length - 1) {
      this.currentIndex++;
      this.moveTo(GameManager.fixedPositions[this.currentIndex]);
    }
  }

  moveTo(targetPosition: Vec3) {
    tween(this.player)
      .to(0.3, { position: targetPosition })
      .start();
  }


  // va chạm với chướng ngại vật thua game
  onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    console.log('onBeginContact');

    if (otherCollider.node.name === 'body') {
      // Trì hoãn việc xóa node để tránh xung đột với hệ thống vật lý
      this.scheduleOnce(() => {
        if (selfCollider.node && selfCollider.node.isValid) {
          selfCollider.node.parent.active = false; // Xóa node của selfCollider
        }
        if (otherCollider.node && otherCollider.node.isValid) {
          otherCollider.node.parent.destroy(); // Xóa node của otherCollider
        }

        this.gameOver();
      }, 0.03); // Trì hoãn để hàm vật lý xử lý
    }
  }


  // tính điểm vượt xe
  onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    console.log('onEndContact');
    this.scheduleOnce(() => {
      if (selfCollider.node.parent && selfCollider.node.parent.active) {
        this.score += GameManager.scorePlus;
        this.numScore.to(this.score);
      }
    }, 0.04);
    let effectPoint = instantiate(this.pointEffect);
    effectPoint.parent = this.endPonit;//sua tên sau
    effectPoint.getComponent(RewardRffect).init(otherCollider.node.parent,this.tagetPonit);

  }

  gameOver() {
    this.gameOverScene.active = true;
    let hightScore = Number(sys.localStorage.getItem("highScore"));
    if (this.score > hightScore) {
      sys.localStorage.setItem("highScore", this.score);
    }
  }

}


