import { _decorator, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioController')
export class AudioController extends Component {
    public static Instance: AudioController;

    @property({ type: Node, tooltip: "iconInMenu" })
    private iconMenu: Node = null;
    @property({ type: Node, tooltip: "iconInGame" })
    private iconGame: Node = null;

    volume = 1;

    protected onLoad(): void {
        AudioController.Instance = this;
    }

    Click() {
        this.volume == 1 ? this.volume = 0 : this.volume = 1;
        this.node.children.forEach(e => e.getComponent(AudioSource).volume = this.volume)
    }

    protected update(dt: number): void {
        this.iconMenu.children[0].active = this.volume == 0;
        this.iconGame.children[0].active = this.volume == 0;
    }

    CrashItem() {
        this.node.getChildByName("crash2").getComponent(AudioSource).play();
    }

    PlusScore() {
        this.node.getChildByName("score").getComponent(AudioSource).play();
    }

}


