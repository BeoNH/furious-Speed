import { _decorator, Component, Size, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CanvasResizer')
export class CanvasResizer extends Component {

    @property(Size)
    designResolution: Size = new Size(1280, 720);

    private lastWidth: number = 0;
    private lastHeight: number = 0;

    onLoad() {
        this.updateCanvas();
    }

    update(dt: number) {
        this.updateCanvas();
    }

    updateCanvas() {
        const frameWidth = window.innerWidth;  // Thay thế cho view.getFrameSize().width
        const frameHeight = window.innerHeight; // Thay thế cho view.getFrameSize().height

        // Kiểm tra nếu kích thước frame thay đổi
        if (this.lastWidth !== frameWidth || this.lastHeight !== frameHeight) {
            this.lastWidth = frameWidth;
            this.lastHeight = frameHeight;

            // Kiểm tra tỉ lệ giữa thiết kế và kích thước khung hình
            if (this.designResolution.width / this.designResolution.height > frameWidth / frameHeight) {
                const newDesignSize = new Size(this.designResolution.width, this.designResolution.width * (frameHeight / frameWidth));
                view.setDesignResolutionSize(newDesignSize.width, newDesignSize.height, view.getResolutionPolicy());
                console.log("Updated canvas size: " + newDesignSize);
            } else {
                const newDesignSize = new Size(this.designResolution.height * (frameWidth / frameHeight), this.designResolution.height);
                view.setDesignResolutionSize(newDesignSize.width, newDesignSize.height, view.getResolutionPolicy());
                console.log("Updated canvas size: " + newDesignSize);
            }
        }
    }
}
