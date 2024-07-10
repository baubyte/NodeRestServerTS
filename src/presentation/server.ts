import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number;
    routes: Router;
    node_env?: string;
    public_path?: string;
}
export class Server{
    private app = express();
    private port: number;
    private env: string;
    private publicPath: string;
    private routes: Router;

    /**
     * Constructor for initializing options.
     *
     * @param {Options} options - options object with port, node_env, and public_path
     */
    constructor(options: Options) {
      const { port, node_env = 'development', public_path = 'public', routes } = options;
      this.port = port;
      this.env = node_env;
      this.publicPath = public_path;
      this.routes = routes;
    }

    /**
     * Starts the server and configures middlewares.
     *
     * This function sets up the middlewares for the server. It uses the `express.static` middleware
     * to serve static files from the `publicPath` directory. It also sets up a catch-all route
     * to serve the `index.html` file for any unmatched routes. Finally, it starts the server and
     * listens on the specified `port`.
     *
     * @return {Promise<void>} A promise that resolves when the server is started.
     */
    public async start() {
        /** Middlewares */
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        /**routes */
        this.app.use(this.routes);
        /**Public path */
        this.app.use(express.static(this.publicPath));
        /**For SPA */
        this.app.get('*', (request, response) => {
            const indexPath = path.join(`${__dirname}/../../${this.publicPath}/index.html`);
            response.sendFile(indexPath);
        });
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}!`)
        });
    }
}