import chalk from 'chalk';
import fs from 'fs-extra';
import { downloadTemplate } from 'giget';
import sortPackageJson from 'sort-package-json';
const patchFile = fs.readFileSync(
    path.join(path.dirname(fileURLToPath(import.meta.url)) + '/patches.schema.json'),
    'utf-8'
);
const patchSchema = JSON.parse(patchFile);
import path from 'path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';
interface options {
    projectName: string;
    scaffoldType: string;
    tsScaffold?: boolean;
    extraTools?: string[];
}
interface PatchSchema {
    devDeps?: { [key: string]: { name: string; version: string } };
    optDeps?: { [key: string]: { name: string; version: string } };
    deps?: { [key: string]: { name: string; version: string } };
    folders?: string[];
    files?: string[];
}

async function template(template: string, projectName: string, extraTools?: string[]) {
    try {
        await downloadTemplate(
            `github:motortruck1221/dreamland-stuff/create-dreamland-app/templates/${template}/default`,
            {
                force: false,
                provider: 'github',
                cwd: projectName,
                dir: '.'
            }
        );
        if (extraTools) {
            for (let i in extraTools) {
                await downloadTemplate(
                    `github:motortruck1221/dreamland-stuff/create-dreamland-app/templates/${template}/${extraTools[i]}`,
                    {
                        force: true,
                        provider: 'github',
                        cwd: projectName + '/' + extraTools[i],
                        dir: '.'
                    }
                );
                const obj: PatchSchema = JSON.parse(
                    fs.readFileSync(`${projectName}/${extraTools[i]}/patch.json`, 'utf-8')
                );
                //validate the object to the schema
                const ajv = new Ajv({ strict: false });
                const isDataValid = ajv.validate(patchSchema, obj);
                if (!isDataValid) {
                    console.log(
                        chalk.red(
                            `\nThe tool: ${extraTools[i]} is not setup correctly. Not installing...`
                        )
                    );
                    fs.rm(`${projectName}/${extraTools[i]}`, { recursive: true, force: true });
                    continue;
                }
                if (obj.devDeps) {
                    for (const key in obj.devDeps) {
                        const name = obj.devDeps[key].name;
                        const version = obj.devDeps[key].version;
                        const pkgJson = fs.readJSONSync(`${projectName}/package.json`);
                        pkgJson.devDependencies[name] = version;
                        const sortedPkgJson = sortPackageJson(pkgJson);
                        fs.writeJSONSync(`${projectName}/package.json`, sortedPkgJson, {
                            spaces: 2
                        });
                    }
                }
                if (obj.optDeps) {
                    for (const key in obj.optDeps) {
                        const name = obj.optDeps[key].name;
                        const version = obj.optDeps[key].version;
                        const pkgJson = fs.readJSONSync(`${projectName}/package.json`);
                        pkgJson.optionalDependencies[name] = version;
                        const sortedPkgJson = sortPackageJson(pkgJson);
                        fs.writeJSONSync(`${projectName}/package.json`, sortedPkgJson, {
                            spaces: 2
                        });
                    }
                }
                if (obj.deps) {
                    for (const key in obj.deps) {
                        const name = obj.deps[key].name;
                        const version = obj.deps[key].version;
                        const pkgJson = fs.readJSONSync(`${projectName}/package.json`);
                        pkgJson.dependencies[name] = version;
                        const sortedPkgJson = sortPackageJson(pkgJson);
                        fs.writeJSONSync(`${projectName}/package.json`, sortedPkgJson, {
                            spaces: 2
                        });
                    }
                }
                if (obj.folders) {
                    for (let z in obj.folders) {
                        try {
                            fs.mkdirSync(`${projectName}/${obj.folders[z]}`);
                        } catch (_) {}
                    }
                }
                if (obj.files) {
                    for (let z in obj.files) {
                        fs.copyFileSync(
                            `${projectName}/${extraTools[i]}/${obj.files[z]}`,
                            `${projectName}/${obj.files[z]}`
                        );
                    }
                }
                await fs.rm(`${projectName}/${extraTools[i]}`, { recursive: true, force: true });
            }
        }
    } catch (err: any) {
        //remove the dir if it's likely to be created by the CLI
        if (projectName !== '.' && projectName !== './' && projectName.startsWith('../')) {
            try {
                fs.rmdirSync(projectName);
            } catch (_) {}
        }
        if (err.message.includes('404')) {
            throw new Error(
                'It looks like we were not able to get the template. \n Please try again later'
            );
        } else {
            throw new Error(err.message);
        }
    }
    //doublecheck the folder to make sure it's not empty
    if (fs.readdirSync(projectName).length === 0) {
        throw new Error('It looks like the folder is empty. \n Please try again later');
    }
}

async function scaffold(opts: options) {
    if (opts.scaffoldType === 'tsx/jsx') {
        switch (opts.tsScaffold) {
            case true:
                await template('tsx', opts.projectName, opts.extraTools);
                break;
            case false:
                await template('jsx', opts.projectName, opts.extraTools);
                break;
            default:
                await template('tsx', opts.projectName, opts.extraTools);
        }
    } else if (opts.scaffoldType === 'basic') {
        await template('basic', opts.projectName, opts.extraTools);
    }
}

export { scaffold };
