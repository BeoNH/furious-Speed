import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('APIManager')
export class APIManager extends Component {

    public static urlAPI: string = "https://api-tele.gamebatta.com";// batta

    // public static token;
    public static CSV;

    public static CallPostAsync(data: any, url: string) {
        return new Promise<any>((resove) => {
            this.CallPost(data, url, (res) => {
                resove(res);
            }, () => { });
        });
    }

    // public static token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODQsImlhdCI6MTY4NzgzNTkxOSwiZXhwIjoxNzE5MzcxOTE5fQ.YB9USYIo3UZ6U5_CN8zQ8onIrliw1IAZv1LSqmGTUYg";
    public static CallPost(data, url, callback, callbackHeader) {
        let param = this;
        var xhr = new XMLHttpRequest();

        xhr.onerror = () => {
        };

        xhr.ontimeout = () => {
        }

        xhr.onabort = () => {
        }

        xhr.onloadend = () => {
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;
            if (xhr.status == 200 && xhr.responseText) {
                var response = JSON.parse(xhr.responseText);
                console.log("CallPost=>", url, "\n", response);

                callback(response);
            }
        };
        xhr.open('POST', url, true);
        callbackHeader(xhr);
        let body
        if (data != null)
            body = JSON.stringify(data);
        else
            body = data
        xhr.send(body);
    }


    public static urlParam(name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.search);
        return (results !== null) ? results[1] || 0 : false;
    }
}

