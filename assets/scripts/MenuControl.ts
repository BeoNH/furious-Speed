import { _decorator, Component, Label, Node, sys } from 'cc';
import { PopupRank } from './PopupRank';
import { PopupHistory } from './PopupHistory';
const { ccclass, property } = _decorator;

@ccclass('MenuControl')
export class MenuControl extends Component {

    @property({ type: Node, tooltip: "Bảng xếp hạng" })
    private popupRank: Node = null;
    @property({ type: Node, tooltip: "Lịch sử" })
    private popupHistory: Node = null;

    @property({ type: Label, tooltip: "điểm cao nhất" })
    private hightScore: Label = null;

    protected onLoad(): void {
        this.onClose();
    }

    protected onEnable(): void {
        this.hightScore.string = sys.localStorage.getItem("highScore") ? sys.localStorage.getItem("highScore") : 0;
    }

    onOpen(e: any, str: string) {

        switch (str) {
            case `rank`:
                this.popupRank.active = true;
                this.popupRank.getComponent(PopupRank).initRankingList();
                break;
            case `history`:
                this.popupHistory.active = true;
                this.popupHistory.getComponent(PopupHistory).initHistoryList();
                break;
        }
    }

    onClose() {
        this.popupRank.active = false;
        this.popupHistory.active = false;

    }
}


