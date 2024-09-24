import { _decorator, Component, Label, Node, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MenuControl')
export class MenuControl extends Component {

    @property({ type: Label, tooltip: "điểm cao nhất" })
    private hightScore: Label = null;

    protected onEnable(): void {
        this.hightScore.string = sys.localStorage.getItem("highScore") ? sys.localStorage.getItem("highScore") : 0;
    }
}


