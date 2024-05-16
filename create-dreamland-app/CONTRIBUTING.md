# Adding a tool
Want to add a tool to CDA? Follow these steps:

1. Fork this repository and create a new branch
2. Create a folder inside [templates/jsx](./templates/jsx/) and [templates/tsx](./templates/tsx/) with the name of the tool. 
3. Create a `patch.json` file in said folders. (Documentation on that below)
4. Add the files, folders and anything else you need in the folders.
5. Add the tool to the [tools](https://github.com/MotorTruck1221/dreamland-stuff/blob/main/create-dreamland-app/src/cli.ts#L38) section in the [cli.ts](./src/cli.ts) file 
6. Open a PR and wait further instructions


## What is the `patch.json` file?
In order to add extra tooling, packages, files and folders to the base template, you "patch" the stuff in.
The file should follow the [JSON schema](./src/patches.schema.json). If it doesn't, it will error and the tool will not be installed
> [!NOTE]
> For deps, devDeps, and optDeps you ***MUST*** increase the "dep" field by a number or another name. Or your dependencies will fail to be added.
>
> The "dep" field must be used once. And every other dependecy ***must*** follow that same specification.

- What is the "deps" field for?
    - The "deps" field is for any extra dependencies you want to add to the base template.
    - This goes for "devDeps" (adds to the "devDependencies" section of the `package.json` file)
    - And the "optDeps" is for optionalDependencies

- What is the "folders" field for?
    - When adding a tool, you may need folders that don't exist in the base template. This allows you to create those folders and allows you to then move files into those folders. A great example of this is the [dreamland-router](./templates/tsx/dreamland-router/) template.

- What is the "files" field for?
    - This allows you to move the files into their respective places. So, if you have a something.conf at the root of your template, and then added the file to that field, the file would then be available in the final scaffolded project. In this case, the root of the project. If you want to add files under a folder, create the folder in your template and add the file there. This will allow you to copy the file over provided the folder exists (see: folders field above)

Here is a basic example of a "patch file":

```json
{
    "deps": {
        "dep": {
            "name": "packagename",
            "version": "3.2.5"
        },
        "dep1": {
            "name": "otherPackagename",
            "version": "2.2.0"
        }
    },
    "devDeps": {
        "dep": {
            "name": "package",
            "version": "4.5.6"
        }
    },
    "optDeps": {
        "dep": {
            "name": "optionalDependency1",
            "version": "1.2.3"
        }
    },
    "folders": [
        "src/yourfolderthatneedstobecreatedhere"
    ],
    "files": [
        "filethatneedstobecopied"
    ]
}
```

> [!NOTE]
> If you don't need a field you do not have to add it. 
>
> If you are just adding files/folders for example all you would really need is this:
> ```json 
> { 
>   "files": [
>       "YourFile.tsx"
>   ],
>   "folders": [
>       "a folder you need to add"
>   ]
> }
> ```

