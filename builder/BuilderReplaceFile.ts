import * as chalk from 'chalk';
import * as fs from 'fs';
import BuilderData from './BuilderData';

export class BuilderReplaceFile {

    /** 打包前改变项目中的环境文本，并在打包结束后恢复 */
    public replace(): void {
        let filePath: string = `${process.cwd().replace(/\\/g, '/')}/assets/script/MiniFramework/MFData.ts`;
        let words: string = fs.readFileSync(filePath, 'utf8');

        let targetWords = this._getReplacedWords(words, `'${BuilderData.gameEnv}'`);

        fs.writeFileSync(filePath, targetWords, 'utf8');

        console.log(chalk.green.bold('改写文件成功\n'));
    }

    /** 复原项目中的环境文本 */
    public resumeFile(): void {
        let filePath: string = `${process.cwd().replace(/\\/g, '/')}/assets/script/MiniFramework/MFData.ts`;
        let words: string = fs.readFileSync(filePath, 'utf8');

        let targetWords = this._getReplacedWords(words, 'null');

        fs.writeFileSync(filePath, targetWords, 'utf8');

        console.log(chalk.green.bold('\n恢复文件成功\n'));
    }

    private _getReplacedWords(words: string, replaceWords: string): string {
        let startString: string = 'platform: F_Platforms = ';
        let endString: string = ' as F_Platforms';
        let res = words.match(new RegExp(`${startString}(.*?)${endString}`));

        let targetWords: string = res ? res[1] : '';
        words = words.replace(targetWords, replaceWords);

        return words;
    }
}
