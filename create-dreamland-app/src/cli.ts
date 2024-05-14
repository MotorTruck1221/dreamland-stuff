import { Command } from "commander";
import { scaffold } from './scaffold.js';
import * as prompt from "@clack/prompts";
import chalk from "chalk";
import { count } from "node:console";
import { execa } from "execa";

async function project() {
    const inital = await prompt.group({
        path: () => prompt.text({
            message: chalk.green('Where would you like to create your project?'),
            placeholder: 'project-name'
        }),
        type: () => prompt.select({
            message: chalk.magenta(`How Would you like to use dreamland?`),
            initialValue: 'tsx/jsx',
            maxItems: 2,
            options: [
                { value: 'tsx/jsx', label: 'TSX/JSX' },
                { value: 'basic', label: 'Basic JavaScript and HTML (no bundler)' }
            ],
        })
    },
    {
        onCancel: () => {
            prompt.cancel(chalk.bold.red('Operation Canceled'));
            process.exit(0);
        }
    });

    let extraStuff = null;
    if (inital.type === 'tsx/jsx') {
        extraStuff = await prompt.group({
            langType: () => prompt.confirm({
                message: chalk.bold.white(`Do you want to use ${chalk.blue("TypeScript")}?`),
                initialValue: true,
            }),
            tools: () => prompt.multiselect({
                message: chalk.bold.magenta('Select some extra tools.'),
                initialValues: ['dreamland-router'],
                required: false,
                options: [
                    { value: 'dreamland-router', label: 'Dreamland Router', hint: 'recommended' },
                    { value: 'prettier', label: 'Prettier' },
                    { value: 'eslint', label: 'ESlint' }
                ],
            }),
        },
        {
            onCancel: () => {
                prompt.cancel(chalk.bold.red('Operation Canceled'));
                process.exit(0);
            },
        })

        const installDeps = await prompt.group({
            install: () => prompt.confirm({
                message: chalk.red('Do you want to install dependencies?'),
                initialValue: false,
            })
        },
        {
            onCancel: () => {
                prompt.cancel(chalk.bold.red('Operation Canceled'));
                process.exit(0);
            }
        })
    
        let packageManager = "npm";
        if (installDeps.install === true) {
            const pm = await prompt.group({
                manager: () => prompt.select({
                    message: chalk.green('Select your package manager'),
                    initialValue: 'npm',
                    maxItems: 3,
                    options: [
                        { value: 'npm', label: 'NPM' },
                        { value: 'pnpm', label: 'PNPM' },
                        { value: 'yarn', label: 'yarn' },
                        { value: 'bun', label: 'bun' }
                    ]
                }),
            },
            { 
                onCancel: () => {
                    prompt.cancel(chalk.bold.red("Operation canceled"));
                    process.exit(0);
                }
            })
            packageManager = pm.manager
        }

        const scaffoldSpinner = prompt.spinner();
        scaffoldSpinner.start();
        scaffoldSpinner.message(chalk.yellow('Scaffolding...'));
        await scaffold({ projectName: inital.path, scaffoldType: inital.type, tsScaffold: extraStuff?.langType, extraTools: extraStuff?.tools })
        scaffoldSpinner.stop(chalk.bold.green('Scaffold Complete!'));
        if (installDeps.install === true) {
            const pmSpinner = prompt.spinner();
            pmSpinner.start();
            pmSpinner.message(chalk.yellow("Installing dependencies...")) 
            await execa(packageManager, ['install'], { cwd: inital.path })
            pmSpinner.stop(chalk.bold.green("Dependencies Installed!"));
        }
        switch(installDeps.install) {
            case true:
                prompt.note(`cd ${inital.path} \n${packageManager} run dev`, chalk.bold.magenta("Done Creating. Now Run:"));
                break;
            case false:
                prompt.note(`cd ${inital.path} \n${packageManager} install \n${packageManager} run dev`, chalk.bold.magenta("Done Creating. Now Run:"));
                break;
        }
    }
    if (inital.type === "basic") {
        const spinner = prompt.spinner();
        spinner.start();
        spinner.message(chalk.yellow("Scaffolding Project..."))
        await scaffold({ projectName: inital.path, scaffoldType: inital.type, tsScaffold: extraStuff?.langType, extraTools: extraStuff?.tools });
        spinner.stop(chalk.bold.green("Scaffold complete!"));
        prompt.note(`cd ${inital.path} \nAnd get to work!`, chalk.bold.magenta("Done. Now Do:"));
    }
}

async function cli() {
    prompt.intro(chalk.magenta("Welcome to the create dreamland CLI! Let's get started"))
    await project();
}

export { cli }
