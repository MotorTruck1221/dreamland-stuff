import { Command } from "commander";
import * as prompt from "@clack/prompts";
import chalk from "chalk";

async function project() {
    await prompt.group({
        path: () => prompt.text({
            message: chalk.green('Where would you like to create your project?'),
            placeholder: './shit',
        })
    })
}

async function cli() {
    prompt.intro(chalk.magenta("Welcome to the create dreamland CLI! Let's get started"))
    await project();
}

export { cli }
