import { cli } from './cli.js'
import chalk from 'chalk'
cli().catch((err) => {console.error(chalk.red('Error!\n' + err))});
