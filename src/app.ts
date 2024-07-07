import { Server } from "@presentation/server";
import { envs } from "@plugins/envs.plugins";

(async () =>{
    main();
})();
function  main() {
    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
        node_env: envs.NODE_ENV
    });
    server.start();
}