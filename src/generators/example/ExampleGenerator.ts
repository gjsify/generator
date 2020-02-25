import chalk from "chalk";
import Dedent = require("dedent");
import { Generator, IComponentProvider, Question } from "extended-yo-generator";
import Path = require("path");
import YoSay = require("yosay");
import { ExampleSetting } from "./ExampleSetting";
import { IExampleSettings } from "./IExampleSettings";
import { LicenseType } from "./LicenseType";

/**
 * Provides the functionality to generate a generator written in TypeScript.
 */
export class ExampleGenerator extends Generator<IExampleSettings>
{
    /**
     * Initializes a new instance of the `ExampleGenerator` class.
     *
     * @param args
     * A set of arguments for the generator.
     *
     * @param options
     * A set of options for the generator.
     */
    public constructor(args: string | string[], options: {})
    {
        super(args, options);
    }

    protected get TemplateRoot(): string
    {
        return "example";
    }

    protected get Questions(): Array<Question<IExampleSettings>>
    {
        return [
            {
                type: "input",
                name: ExampleSetting.Destination,
                message: "Where do you want to save your project to?",
                default: "./",
                filter: async input =>
                {
                    let destination = Path.isAbsolute(input) ? input : Path.resolve(process.cwd(), input);
                    this.destinationRoot(destination);
                    return destination;
                }
            },
            {
                type: "input",
                name: ExampleSetting.Name,
                message: "What's the name of your project?",
                default: (answers: IExampleSettings) => Path.basename(answers[ExampleSetting.Destination])
            },
            {
                type: "input",
                name: ExampleSetting.Description,
                message: "Please enter a description."
            }
        ];
    }

    protected get ProvidedComponents(): IComponentProvider<IExampleSettings>
    {
        return {
            Question: "What do you want to include in your workspace?",
            Categories: [
                {
                    DisplayName: "General",
                    Components: [
                        {
                            ID: "readme",
                            DisplayName: "README.md-File",
                            Default: true,
                            FileMappings: [
                                {
                                    Source: "README.md.ejs",
                                    Context: (settings) =>
                                    {
                                        return {
                                            Name: settings[ExampleSetting.Name],
                                            Description: settings[ExampleSetting.Description]
                                        };
                                    },
                                    Destination: "README.md"
                                }
                            ]
                        },
                        {
                            ID: "license",
                            DisplayName: "License-File",
                            Questions: [
                                {
                                    name: ExampleSetting.LicenseType,
                                    type: "list",
                                    message: "What license do you want to use?",
                                    choices: [
                                        {
                                            value: LicenseType.Apache,
                                            name: "Apache-2.0 License"
                                        },
                                        {
                                            value: LicenseType.GPL,
                                            name: "GNU GPL License"
                                        }
                                    ],
                                    default: LicenseType.GPL
                                }
                            ],
                            FileMappings: [
                                {
                                    Source: (settings) =>
                                    {
                                        switch (settings[ExampleSetting.LicenseType])
                                        {
                                            case LicenseType.Apache:
                                                return "Apache.txt";
                                            case LicenseType.GPL:
                                            default:
                                                return "GPL.txt";
                                        }
                                    },
                                    Destination: "LICENSE"
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }

    public async prompting()
    {
        this.log(YoSay(`Welcome to the ${chalk.whiteBright("example")} generator!`));
        return super.prompting();
    }

    public async writing()
    {
        return super.writing();
    }

    public async end()
    {
        this.log(Dedent(`
            Your project is ready!

            It lives in "${this.Settings[ExampleSetting.Destination]}"`));
    }
}