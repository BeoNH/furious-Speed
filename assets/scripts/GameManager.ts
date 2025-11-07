import { _decorator, Component, Node, sys, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    // Tốc độ di chuyển của bản đồ
    public static readonly speedMap: number = 900;

    // Tốc độ di chuyển player lên xuống
    public static readonly speedPlayer: number = 50;

    // Tốc độ di chuyển vật cản trong khoảng [number]
    public static readonly speedObstacle: number[] = [600,400];

    // Khoảng thời gian giữa các lần tạo vật cản
    public static readonly spawnInterval: number = 0.6;

    // Các vị trí cố định theo trục x (tọa độ vật cản)
    public static readonly fixedXPositions: readonly Vec3[] = [
        new Vec3(-220, 600, 0), // Vị trí 1
        new Vec3(-110, 600, 0), // Vị trí 2
        new Vec3(0, 600, 0),    // Vị trí 3
        new Vec3(110, 600, 0),  // Vị trí 4
        new Vec3(220, 600, 0)   // Vị trí 5
    ];

    // Các vị trí cố định của người chơi (tọa độ theo đường đi)
    public static readonly fixedPositions: readonly Vec3[] = [
        new Vec3(-220, -120, 0), // Vị trí 1
        new Vec3(-110, -120, 0), // Vị trí 2
        new Vec3(0, -120, 0),    // Vị trí 3
        new Vec3(110, -120, 0),  // Vị trí 4
        new Vec3(220, -120, 0)   // Vị trí 5
    ];

    // Điểm cộng thêm mỗi 1 xe vượt qua được
    public static readonly scorePlus: number = 50;

    // Điểm cộng thêm mỗi 1s xe chạy được
    public static readonly scoreTime: number = 10;

    // Điểm cao nhất ghi nhận được
    public static hightScore: number = sys.localStorage.getItem("highScore");
}


