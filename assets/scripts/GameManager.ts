import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    public static speedMap: number = 1000; // tốc độ di chuyển map

    public static spawnInterval: number = 1; // Thời gian giữa các lần tạo vật cản

    public static moveSpeedBarrier: number = 100; // Tốc độ di chuyển của vật cản(dùng righBody)
}


