import {
  RunnableToolFunctionWithoutParse,
  RunnableToolFunctionWithParse,
} from 'openai/lib/RunnableFunction';

export type ToolSchema =
  | RunnableToolFunctionWithParse<any>
  | RunnableToolFunctionWithoutParse;
export interface ITool<T = any, C = unknown> {
  callback(options: any, ctx: C): any | Promise<any>;
  getSchema(ctx: C): ToolSchema | Promise<ToolSchema>;
}
