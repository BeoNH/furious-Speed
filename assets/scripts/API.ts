import { _decorator, Component, Node } from 'cc';
import { APIManager } from './APIManager';
const { ccclass, property } = _decorator;

@ccclass('API')
export class API{

    public static gameID = '48';
    public static key = '9a56ae7c-52bb-4a56-97a8-1a901cd2be77';

    public static requestData(key: string, data: any, callBack: (response: any) => void) {
        const url = APIManager.urlAPI + key;
        APIManager.CallPost(data, url, (response) => {
            callBack(response);
        }, (xhr) => {
            xhr.setRequestHeader('Authorization', 'Bearer ' + APIManager.urlParam(`token`));
            xhr.setRequestHeader('game_key', API.key);
            xhr.setRequestHeader("Content-type", "application/json");
        });
    }
}

