import { _decorator, Component, Node, ResolutionPolicy, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SceneControl')
export class SceneControl extends Component {
    @property({ type: Node, tooltip: "scene gamePlay" })
    private scenePlay: Node = null;
    @property({ type: Node, tooltip: "scene menu" })
    private sceneMenu: Node = null;
  
    protected onLoad(): void {
        const screenSize = view.getVisibleSize();
        if (screenSize.width > screenSize.height) {
          view.setDesignResolutionSize(950, 640, ResolutionPolicy.EXACT_FIT);
          console.log("Màn hình nằm ngang (Landscape)");
        } else {
          view.setDesignResolutionSize(640, 950, ResolutionPolicy.EXACT_FIT);
          console.log("Màn hình nằm dọc (Portrait)");
        }
  
    //   this.sceneMenu.active = true;
    //   this.scenePlay.active = false;
    }
  
    openMenu() {
      this.sceneMenu.active = true;
      this.scenePlay.active = false;
    }
  
    openGame() {
      this.sceneMenu.active = false;
      this.scenePlay.active = true;
    }
}


