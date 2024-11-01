import { _decorator, Animation, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('vaChamEffect')
export class vaChamEffect extends Component {
    onPlay() {
        let chil = this.node.children
        chil.forEach(e => {
            let anim = e.getComponent(Animation);
            if(anim){
                anim.play();
            }
        })
    };
}


