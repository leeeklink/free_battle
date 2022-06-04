let https = require('https');
import * as chalk from 'chalk';
import BuilderData from './BuilderData';
import BuilderUtils from './BuilderUtils';

export class BuilderAWS {

    public async upload(): Promise<void> {
        let s3_url: string = `s3://usa.ime/shanwangame.com/cocosDemo/${BuilderData.gameName}/`;

        console.log(`开始上传 s3，s3_url: \n${chalk.green.bold(s3_url)}\n`);

        // 先递归删除 s3 对应文件夹的所有内容  `aws s3 rm ${url} --recursive`
        await BuilderUtils.runCmd(
            'aws',
            [
                's3',
                'rm',
                s3_url,
                '--recursive'
            ]
        );
        console.log(chalk.green.bold('\n删除 s3 成功\n'));

        // 再递归上传 本地文件 到 s3 对应文件夹   `aws s3 cp ./build/web-mobile/ ${s3_url} --recursive`
        let buildPath: string = `${process.cwd().replace(/\\/g, '/')}/build/web-mobile/`;
        await BuilderUtils.runCmd(
            'aws',
            [
                's3',
                'cp',
                buildPath,
                s3_url,
                '--recursive'
            ]
        );

        let gameUrl: string = `https://shanwangame.com/cocosDemo/${BuilderData.gameName}/index.html`;
        BuilderData.gameUrl = gameUrl;
        console.log(`上传 s3 成功，游戏url:\n\n${chalk.green.bold((gameUrl))}\n`);
    }

    public async refresh(): Promise<void> {
        console.log('开始刷新 s3');

        //这是需要提交的数据
        let post_data = {
            'cdn_domain_name': 'shanwangame.com',
            'refresh_type': 'directory', // 参数：file|directory
            'content': `/cocosDemo/${BuilderData.gameName}` // 注意不需要添加域名，第一个字符为 /
        };


        let content = JSON.stringify(post_data);

        let options = {
            hostname: 'faas.cootekos.com',
            path: '/openApi/cdnRefreshTask',
            method: 'POST',
            headers: {
                'AccessKeyId': 'p1a03Wg3GuoeBgumGoodQ4I2DhPdSrZy',
                'AccessKeySecret': 'CkL7VtmC6naaSuyTQwIvUSQ9AbiW1kBu',
                'Content-Type': 'application/json'
            }
        };

        // eslint-disable-next-line
        let reqPromise: Promise<void> = new Promise((resovle, reject) => {
            let req = https.request(options, (res) => {
                console.log('statusCode:', res.statusCode);
                // console.log('headers:', res.headers);

                console.log(`开始刷新文件夹：${post_data.cdn_domain_name}${post_data.content}\n`);

                res.on('data', (res) => {
                    if (res.indexOf('100000') != -1) {
                        console.log(chalk.green.bold('s3 刷新成功！\n'));
                    } else if (res.indexOf('100001') != -1) {
                        console.log(chalk.red.bold(`s3 刷新失败，超过次数了，res: ${res}\n`));
                    } else {
                        console.log(chalk.red.bold(`s3 刷新失败，未知错误，res：${res}\n`));
                    }

                    resovle();
                });
            });

            // 将数据写入请求体
            req.write(content);

            req.on('error', (e) => {
                console.error('err:', e);
            });

            req.end('test');
        });

        await reqPromise;
    }

}