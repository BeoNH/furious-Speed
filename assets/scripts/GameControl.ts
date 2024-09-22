import { _decorator, Component, EventKeyboard, Input, input, instantiate, KeyCode, Node, Prefab, ResolutionPolicy, sys, tween, Vec3, view } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('GameControl')
export class GameControl extends Component {

        @property({ type: Node, tooltip: "người chơi" })
        private player: Node = null;

        @property({ type: [Vec3], tooltip: "vị trí di chuyển" })
        fixedPositions: Vec3[] = [
            new Vec3(-220, -120, 0),  // Vị trí 1
            new Vec3(-110, -120, 0),  // Vị trí 2
            new Vec3(0, -120, 0),     // Vị trí 3
            new Vec3(110, -120, 0),   // Vị trí 4
            new Vec3(220, -120, 0)    // Vị trí 5
        ];

        private currentIndex: number = 2; // Bắt đầu ở vị trí 3 (index 2)
        private isMoving: boolean = false;


    onLoad() {
        const screenSize = view.getVisibleSize();
        if (screenSize.width > screenSize.height) {
          view.setDesignResolutionSize(950, 640, ResolutionPolicy.EXACT_FIT);
          console.log("Màn hình nằm ngang (Landscape)");
        } else {
          view.setDesignResolutionSize(640, 950, ResolutionPolicy.EXACT_FIT);
          console.log("Màn hình nằm dọc (Portrait)");
        }
    
        //for pc
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    
        // for mobile
        // if (sys.isMobile) {
        //   this.mobileBtn.active = true;
        //   this.leftTouch.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        //   this.leftTouch.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        //   this.rightTouch.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        //   this.rightTouch.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        // }
      }
    
      onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    
        // if (sys.isMobile) {
        //   this.mobileBtn.active = false;
        //   this.leftTouch.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        //   this.leftTouch.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        //   this.rightTouch.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        //   this.rightTouch.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        // }
      }

      protected start(): void {
        this.player.setPosition(this.fixedPositions[this.currentIndex]);
      }

      onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.ARROW_LEFT:
                this.moveLeft();
                break;
            case KeyCode.ARROW_RIGHT:
                this.moveRight();
                break;
        }
      }
    
      onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
          case KeyCode.ARROW_LEFT:
          case KeyCode.ARROW_RIGHT:

            break;
        }
      }
      moveLeft() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.smoothMoveTo(this.fixedPositions[this.currentIndex]);
        }
    }

    moveRight() {
        if (this.currentIndex < this.fixedPositions.length - 1) {
            this.currentIndex++;
            this.smoothMoveTo(this.fixedPositions[this.currentIndex]);
        }
    }

    smoothMoveTo(targetPosition: Vec3) {
        this.isMoving = true; 

        tween(this.player)
            .to(0.5, { position: targetPosition }, { easing: 'sineInOut' }) // Thời gian 0.5 giây và hiệu ứng mượt mà
            .call(() => {
                this.isMoving = false;
            })
            .start();
    }
}


