interface extratooling {
    router: boolean,
    prettier: boolean,
    eslint: boolean
}

interface options {
    projectName: string,
    scaffoldType: string,
    tsScaffold?: boolean,
    extraTools?: extratooling, 
    installDeps: boolean,
}

async function scaffold(opts: options) {}
