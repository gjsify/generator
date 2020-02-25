import { IGeneratorSettings } from "extended-yo-generator";
import { ExampleSetting } from "./ExampleSetting";
import { LicenseType } from "./LicenseType";

/**
 * Provides settings for the `ExampleGenerator`.
 */
export interface IExampleSettings extends IGeneratorSettings
{
    /**
     * Gets or sets the destination.
     */
    [ExampleSetting.Destination]: string;

    /**
     * Gets or sets the name.
     */
    [ExampleSetting.Name]: string;

    /**
     * Gets or sets the description.
     */
    [ExampleSetting.Description]: string;

    /**
     * Gets or sets the type of the license.
     */
    [ExampleSetting.LicenseType]: LicenseType;
}