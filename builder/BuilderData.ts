import { BuildEnv, GameEnv } from './BuilderDef';

class BuilderData {

    /** 游戏名称。目前是从路径中取项目文件夹的名字 */
    public gameName: string;

    /** 打包的cocos版本号 */
    public cocosVersion: string;

    /** 游戏运行环境 */
    public gameEnv: GameEnv;

    /** cocos 打包选择的构建环境 */
    public buildEnv: BuildEnv;

    /** 是否上传至 s3 */
    public isUpload: boolean = false;

    /** 是否刷新 s3 */
    public isRefresh: boolean = false;

    /** web 版的 url */
    public gameUrl: string;
}

export default new BuilderData();