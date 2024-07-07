import express from 'express';
import path from 'path';

interface Options {
    port: number;
    node_env?: string;
    public_path?: string;
}
export class Server{
    private app = express();
    private port: number;
    private env: string;
    private publicPath: string;
    constructor(options: Options) {
      const { port, node_env = 'development', public_path = 'public' } = options;
      this.port = port;
      this.env = node_env;
      this.publicPath = public_path;
    }
    public async start() {
        /** Middlewares */
        this.app.use(express.static(this.publicPath));
        this.app.get('*', (request, response) => {
            const indexPath = path.join(`${__dirname}/../../${this.publicPath}/index.html`);
            response.sendFile(indexPath);
        });
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}!`)
        });
    }
}