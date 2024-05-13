import chalk from "chalk";
import { downloadTemplate } from "giget";
import fs from 'fs-extra';
import sortPackageJson from 'sort-package-json';
interface options {
    projectName: string,
    scaffoldType: string,
    tsScaffold?: boolean,
    extraTools?: string[],
    installDeps: boolean,
}

async function template(template: string, projectName: string, extraTools?: string[]) {
    try {
        await downloadTemplate(`github:motortruck1221/dreamland-stuff/create-dreamland-app/templates/${template}/default`, {
            force: true,
            provider: 'github',
            cwd: projectName,
            dir: '.'
        })
        if (extraTools) {
            for (let i in extraTools) {
                await downloadTemplate(`github:motortruck1221/dreamland-stuff/create-dreamland-app/templates/${template}/${extraTools[i]}`, {
                    force: true,
                    provider: 'github',
                    cwd: projectName + '/' + extraTools[i],
                    dir: '.'
                })
                const obj = JSON.parse(fs.readFileSync(`${projectName}/${extraTools[i]}/patch.json`, 'utf-8'));
                if (obj.devDeps) {
                    for (const key in obj.devDeps) {
                        const name = obj.devDeps[key].name;
                        const version = obj.devDeps[key].version;
                        const pkgJson = fs.readJSONSync(`${projectName}/package.json`)
                        pkgJson.devDependencies[name] = version;
                        const sortedPkgJson = sortPackageJson(pkgJson);
                        fs.writeJSONSync(`${projectName}/package.json`, sortedPkgJson, {
                            spaces: 2
                        })
                    }
                }
                if (obj.optDeps) {
                    for (const key in obj.optDeps) {
                        const name = obj.optDeps[key].name;
                        const version = obj.optDeps[key].version;
                        const pkgJson = fs.readJSONSync(`${projectName}/package.json`)
                        pkgJson.optionalDependencies[name] = version;
                        const sortedPkgJson = sortPackageJson(pkgJson);
                        fs.writeJSONSync(`${projectName}/package.json`, sortedPkgJson, {
                            spaces: 2
                        })
                    }
                }
                if (obj.deps) {
                    for (const key in obj.deps) {
                        const name = obj.deps[key].name;
                        const version = obj.deps[key].version;
                        const pkgJson = fs.readJSONSync(`${projectName}/package.json`);
                        pkgJson.dependencies[name] = version;
                        const sortedPkgJson  = sortPackageJson(pkgJson);
                        fs.writeJSONSync(`${projectName}/package.json`, sortedPkgJson, {
                            spaces: 2
                        })
                    }
                }
                if (obj.folders) {
                    for (let z in obj.folders) {
                        fs.mkdirSync(`${projectName}/${obj.folders[z]}`);
                    }
                }
                if (obj.files) {
                    for (let z in obj.files) {
                        fs.copyFileSync(`${projectName}/${extraTools[i]}/${obj.files[z]}`, `${projectName}/${obj.files[z]}`);
                    }
                }
                await fs.rm(`${projectName}/${extraTools[i]}`, { recursive: true, force: true })
            }
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
                await template("tsx", opts.projectName, opts.extraTools);
                break;
            case false:
                await template("jsx", opts.projectName, opts.extraTools);
                break;
            default:
                await template("tsx", opts.projectName, opts.extraTools);
        }
    }
}

export { scaffold }
