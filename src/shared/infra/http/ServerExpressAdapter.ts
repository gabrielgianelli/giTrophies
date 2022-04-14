import express from 'express';
import Server from './Server';

export default class HttpExpressAdapter implements Server {
    private app: any;
    
    constructor(){
        this.app = express();
        this.app.use(express.json());
    }

    on(url: string, method: string, fn: any): void {
        this.app[method](url, async function(request: any, response:any) {
            const result = await fn(request.params, request.body);
            response.json(result);
        });
    }

    listen(port: number): void {
        this.app.listen(port);
    }
}
