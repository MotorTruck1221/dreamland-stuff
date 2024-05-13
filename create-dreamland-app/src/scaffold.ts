import chalk from "chalk";
import { downloadTemplate } from "giget";
import fs from 'node:fs';
interface options {
    projectName: string,
    scaffoldType: string,
    tsScaffold?: boolean,
    extraTools?: string[],
    installDeps: boolean,
}

async function template(template: string, projectName: string, extraTools?: string) {
    try {
        if (!extraTools) {
            await downloadTemplate(`github:motortruck1221/dreamland-stuff/create-dreamland-app/templates/${template}/default`, {
                force: true,
                provider: 'github',
                cwd: projectName,
                dir: '.'
            })
        }
        else {
            await downloadTemplate(`github:motortruck1221/dreamland-stuff/create-dreamland-app/templates/${template}/${extraTools}`, {
                force: true,
                provider: 'github',
                cwd: projectName,
                dir: '.'
            })
        }
    } catch(err: any) {
        //remove the dir if it's likely to be created by the CLI 
        if (projectName !== '.' && projectName !== './' && projectName.startsWith('../')) {
            try {
                fs.rmdirSync(projectName);
            } catch (_) {}
        }
        if (err.message.includes('404')) {
            throw new Error('It looks like we were not able to get the template. \n Please try again later');
        }
        else {
            throw new Error(err.message);
        }
    }
    //doublecheck the folder to make sure it's not empty
    if (fs.readdirSync(projectName).length === 0) {
        throw new Error('It looks like the folder is empty. \n Please try again later');
    }
}

async function scaffold(opts: options) {
    if (opts.scaffoldType === "tsx/jsx") {
        switch (opts.tsScaffold) {
            case true:
                await template("tsx", opts.projectName);
                break;
            case false:
                await template("jsx", opts.projectName);
                break;
            default:
                await template("tsx", opts.projectName);
        }
    }
}

export { scaffold }
