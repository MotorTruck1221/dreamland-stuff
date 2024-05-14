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
            message: `How Would you like to use dreamland?`,
            initialValue: 'tsx/jsx',
            maxItems: 2,
            options: [
                { value: 'tsx/jsx', label: 'TSX/JSX' },
                { value: 'js', label: 'Basic JavaScript and HTML (no bundler)' }
            ],
        })
    },
    {
        onCancel: () => {
            prompt.cancel('Operation Canceled');
            process.exit(0);
        }
    });

    let extraStuff = null;
    if (inital.type === 'tsx/jsx') {
        extraStuff = await prompt.group({
            langType: () => prompt.confirm({
                message: 'Do you want to use TypeScript?',
                initialValue: true,
            }),
            tools: () => prompt.multiselect({
                message: 'Select some extra tools.',
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
                prompt.cancel('Operation Canceled');
                process.exit(0);
            },
        })
    }

    const installDeps = await prompt.group({
        install: () => prompt.confirm({
            message: 'Do you want to install dependencies?',
            initialValue: false,
        })
    },
    {
        onCancel: () => {
            prompt.cancel('Operation Canceled');
            process.exit(0);
        }
    })
    
    let packageManager = null;
    if (installDeps.install === true) {
        const pm = await prompt.group({
            manager: () => prompt.select({
                message: 'Select your package manager',
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
                prompt.cancel("Operation canceled");
                process.exit(0);
            }
        })
        packageManager = pm.manager
    }


    const scaffoldSpinner = prompt.spinner();
    scaffoldSpinner.start();
    scaffoldSpinner.message('Scaffolding...');
    await scaffold({ projectName: inital.path, scaffoldType: inital.type, tsScaffold: extraStuff?.langType, extraTools: extraStuff?.tools })
    scaffoldSpinner.stop('Scaffold Complete!');
    if (installDeps.install === true) {
        const pmSpinner = prompt.spinner();
        pmSpinner.start();
        pmSpinner.message("Installing dependencies...")
        if (packageManager === null) {
            packageManager = "npm"
        }
        await execa(packageManager, ['install'], { cwd: inital.path })
        pmSpinner.stop("Dependencies Installed!");
    }
}

async function cli() {
    prompt.intro(chalk.magenta("Welcome to the create dreamland CLI! Let's get started"))
    await project();
}

export { cli }
