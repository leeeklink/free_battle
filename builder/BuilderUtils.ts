// eslint-disable-next-line
import { exec, spawn } from 'child_process';

class BuilderUtils {

    /** 执行cmd的命令 */
    async runCmd(cmd: string, args: string[] = null): Promise<void> {
        console.log(`开始执行 cmd 命令，cmdString:\n${cmd} ${args != null ? args.join(' ') : ''}\n`);
        // eslint-disable-next-line
        let cmdPromise: Promise<void> = new Promise((resolve, reject) => {
            let spawnObj = spawn(cmd, args);

            spawnObj.stdout.on('data', function (chunk) {
                console.log(chunk.toString());
            });

            spawnObj.on('exit', (code) => {
                console.log('exit code : ' + code);
            });

            spawnObj.on('close', function (code) {
                console.log('close code : ' + code);
                resolve();
            });
        });

        await cmdPromise;
    }
}

export default new BuilderUtils();