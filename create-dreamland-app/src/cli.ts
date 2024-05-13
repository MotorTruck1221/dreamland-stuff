import { Command } from "commander";
import { scaffold } from './scaffold.js';
import * as prompt from "@clack/prompts";
import chalk from "chalk";

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
                options: [
                    { value: 'dreamland-router', label: 'Dreamland Router', hint: 'recommended' },
                    { value: 'prettier', label: 'Prettier' },
                    { value: 'eslint', labe: 'eslint' }
                ],
            }),
        },
        {
            onCancel: () => {
                prompt.cancel('Operation Canceled');
                process.exit(0);
            }
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

    scaffold({ projectName: inital.path, scaffoldType: inital.type, tsScaffold: extraStuff?.langType, extraTools: extraStuff?.tools, installDeps: installDeps.install })
}

async function cli() {
    prompt.intro(chalk.magenta("Welcome to the create dreamland CLI! Let's get started"))
    await project();
}

export { cli }
