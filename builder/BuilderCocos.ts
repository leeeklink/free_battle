import * as chalk from 'chalk';
import BuilderData from './BuilderData';
import BuilderUtils from './BuilderUtils';

export class BuilderCocos {
    public async build(): Promise<void> {
        // cocos 引擎地址
        let cocosPath: string = 'C:/MyPrograms/CocosDashboard/resources/.editors/Creator/version/CocosCreator.exe';
        cocosPath = cocosPath.replace('version', BuilderData.cocosVersion);

        // 当前项目路径
        let projectPath: string = process.cwd();

        await BuilderUtils.runCmd(
            cocosPath,
            [
                projectPath,
                '--build',
                `platform=${BuilderData.buildEnv}`
            ]
        );

        console.log(chalk.green.bold('\ncocos build 成功！\n'));
    }
}
