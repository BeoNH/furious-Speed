import { _decorator, Component, Label, Node, ResolutionPolicy, sys, view } from 'cc';
import { APIManager } from './API_batta/APIManager';
import { MenuControl } from './MenuControl';
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
    const data = {
      "token": APIManager.urlParam(`token`),
    };
    APIManager.requestData(`/login`, data, res => {
      APIManager.userDATA = res;
      if (!res) return;

      this.popupLogin.active = false;
      APIManager.userDATA = res;
      this.getHighScore();
    })
  }

  // Lấy thông tin điểm cao đầu game
  private getHighScore() {
    const url = `/getHighestScore`;
    const data = {
      "username": APIManager.userDATA?.username,
    };
    APIManager.requestData(url, data, res => {
      if (!res) {
        return;
      }
      sys.localStorage.setItem("highScore", res?.yourInfo?.numScore);
    });
  }
}


