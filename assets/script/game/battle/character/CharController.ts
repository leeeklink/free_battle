import * as ic from 'cc';
import { Character } from './Character';

const { ccclass } = ic._decorator;

@ccclass('CharController')
export class CharController extends ic.Component {

    private character: Character = null;

    public onLoad(): void {
        this.character = this.node.getComponent(Character);
    }

    public update(): void {

    }

}
