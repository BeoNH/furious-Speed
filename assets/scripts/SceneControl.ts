import { _decorator, Component, Label, Node, ResolutionPolicy, view } from 'cc';
import { APIManager } from './API_batta/APIManager';
const { ccclass, property } = _decorator;

@ccclass('SceneControl')
export class SceneControl extends Component {
  @property({ type: Node, tooltip: "scene gamePlay" })
  private scenePlay: Node = null;
  @property({ type: Node, tooltip: "scene menu" })
  private sceneMenu: Node = null;

  @property({ type: Node, tooltip: "Popup Login" })
  popupLogin: Node = null;

  protected onLoad(): void {
    // const screenSize = view.getVisibleSize();
    // if (screenSize.width > screenSize.height) {
    //   view.setDesignResolutionSize(950, 640, ResolutionPolicy.EXACT_FIT);
    //   console.log("Màn hình nằm ngang (Landscape)");
    // } else {
    // }
    view.setDesignResolutionSize(640, 950, ResolutionPolicy.EXACT_FIT);
    console.log("Màn hình nằm dọc (Portrait)");

    this.sceneMenu.active = true;
    this.scenePlay.active = false;

    this.loginBatta();
  }

  openMenu() {
    this.sceneMenu.active = true;
    this.scenePlay.active = false;
  }

  openGame() {
    this.sceneMenu.active = false;
    this.scenePlay.active = true;

    // if (APIManager.userDATA.remain_turn > 0) {
    //   this.sceneMenu.active = false;
    //   this.scenePlay.active = true;
    // } else {
    //   this.popupLogin.active = true;
    //   this.popupLogin.getChildByPath(`txt`).getComponent(Label).string = `Game's turn is over`;
    //   this.scheduleOnce(() => {
    //     this.popupLogin.active = false;
    //   }, 3)
    //   return;
    // }
  }

  // Đăng nhập Batta lấy thông tin
  private loginBatta() {
    // this.popupLogin.active = true;
    // this.popupLogin.getChildByPath(`txt`).getComponent(Label).string = `Login . . .`;

    const data = {
      "token": APIManager.urlParam(`token`),
    };
    APIManager.requestData(`/login`, data, res => {
      APIManager.userDATA = res;
      if (!res) return;

      this.popupLogin.active = false;
      APIManager.userDATA = res;
    })
  }
}


