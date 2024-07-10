import { Server } from "@presentation/server";
import { envs } from "@plugins/envs.plugins";
import { AppRoutes } from "@presentation/routes";

(async () =>{
    main();
})();
function  main() {
    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
        node_env: envs.NODE_ENV,
        routes: AppRoutes.routes
    });
    server.start();
}