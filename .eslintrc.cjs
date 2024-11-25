module.export = {
    root: true,
    env:{browser:true, es2020:true},
    extends : [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylisct-type-recommended",


        "plugin:react-hooks/recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:tailwind/recommended"        


    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser:"@typescript-eslint/parser",
    parseOption:{
        ecmaVersion:"latest",
        sourceType:"module",
        project:["tsconfig.json", "tsconfig.node.json"],
        tsconfidRootDir: __dirname
    },
    plugins: ["react-refresh", "@typescript-eslint", "react"],
    rules:{
        "react-refresh/only-exports-components":[
            "warn",
            {allowConstantExport:true}
        ],
        "@typescript-eslint/no-unsafe-call":"off",
        "@typescript-eslint/no-unsafe-assigment":"off"
    },
    setting:{
        react:{
            version:"detect",
        }
    }
} 