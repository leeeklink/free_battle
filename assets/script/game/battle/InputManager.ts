import * as ic from 'cc';
const { ccclass } = ic._decorator;

@ccclass('InputManager')
export class InputManager extends ic.Component {

    public onLoad(): void {
        this.node.on(ic.Input.EventType.TOUCH_START, this._onTouchStart, this);
    }

    public start(): void { }

    private _onTouchStart(e: ic.EventTouch): void {
        console.log('touch_start, e: ', e);
    }

    public update(): void { }

}

