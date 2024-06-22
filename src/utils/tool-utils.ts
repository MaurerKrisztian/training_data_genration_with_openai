import { ITool } from '../tools/interfaces/tool.interface';

export class ToolUtils {

  static  getToolFn(tool: ITool, ctx: any) {
    return async (o: any) => {
      try {
        const res = await tool.callback(o, ctx);
        return res;
      } catch (err: any) {
        const message = `[ERROR] error while executing ${tool.constructor.name} tool: ${err.message}`;
        console.error(message)
        return message;
      }
    };
  }
}
