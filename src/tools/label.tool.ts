import {ITool, ToolSchema} from './interfaces/tool.interface';
import {ToolUtils} from "../utils/tool-utils";
import * as path from 'path';
import {createObjectCsvWriter as createCsvWriter} from 'csv-writer';

export class LabelTool implements ITool<string[], { inputText: string }> {
    private csvWriter;

    constructor(private readonly labels: string[] = ['positive', 'negative', 'neutral'], private readonly csvFilePath: string = path.join('labeled_text.csv')) {
        this.csvWriter = createCsvWriter({
            path: this.csvFilePath,
            header: [
                {id: 'label', title: 'Label'},
                {id: 'text', title: 'Text'},
            ],
            append: true
        });
    }

    // The openAI model will call this fn with the proper "options" parameter, the ctx just our optional additional context.
    async callback(
        options: { label: string },
        ctx: { inputText: string },
    ): Promise<any> {

        // write the new labeled data row to a csv
        await this.csvWriter.writeRecords([{
            label: options.label,
            text: ctx.inputText
        }]);

        console.log(`Add CSV row: ${options.label} | ${ctx.inputText}`);

        return `Added label successfully: ${options.label}`;
    }

    // learn more about json schemas here https://json-schema.org/learn/getting-started-step-by-step
    async getSchema(ctx: { inputText: string }): Promise<ToolSchema> {

        // this is the provided schema for the LLM
        return {
            type: 'function',
            function: {
                name: 'set_label',
                description: 'Set label to text',
                function: ToolUtils.getToolFn(this, ctx),
                parse: JSON.parse,
                parameters: {
                    type: 'object',
                    properties: { // thies properties will be in the callback "options" param
                        label: {
                            type: 'string',
                            description: 'label of the input text',
                            enum: this.labels // restrict the possible strings
                        },
                    },
                },
            },
        };
    }
}
