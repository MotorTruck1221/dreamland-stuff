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

async function scaffold(opts: options) {
    if (opts.scaffoldType === "tsx/jsx") {
        if (opts.tsScaffold === true) {
            try {
                await downloadTemplate('github:motortruck1221/dreamland-stuff/create-dreamland-app/templates/tsx', {
                    force: true,
                    provider: 'github',
                    cwd: opts.projectName,
                    dir: '.'
                })
            } catch(err: any) {
                //remove the dir if it's likely to be created by the CLI 
                if (opts.projectName !== '.' && opts.projectName !== './' && opts.projectName.startsWith('../')) {
                    try {
                        fs.rmdirSync(opts.projectName);
                    } catch (_) {}
                }
                if (err.message.includes('404')) {
                    throw new Error('It looks like we were not able to get the template. \n Please try again later');
                }
                else {
                    throw new Error(err.message);
                }
            }
        } 
        else {
            try {
                await downloadTemplate('github:motortruck1221/dreamland-stuff/create-dreamland-app/templates/jsx', {
                    force: true,
                    provider: 'github',
                    cwd: opts.projectName,
                    dir: '.'
                })
            } catch(err: any) {
                //remove the dir if it's likely to be created by the CLI 
                if (opts.projectName !== '.' && opts.projectName !== './' && opts.projectName.startsWith('../')) {
                    try {
                        fs.rmdirSync(opts.projectName);
                    } catch (_) {}
                }
                if (err.message.includes('404')) {
                    throw new Error('It looks like we were not able to get the template. \n Please try again later');
                }
                else {
                    throw new Error(err.message);
                }
            }
        }

        //doublecheck the folder to make sure it's not empty
        if (fs.readdirSync(opts.projectName).length === 0) {
            throw new Error('It looks like the folder is empty. \n Please try again later');
        }
    }
}

export { scaffold }
