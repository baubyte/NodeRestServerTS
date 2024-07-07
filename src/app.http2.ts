import http2 from "http2";
import fs from 'fs';

const server = http2.createSecureServer({
    key: fs.readFileSync("./keys/server.key"),
    cert: fs.readFileSync("./keys/server.crt")
},(request, response) => {
    // response.writeHead(200, { "Content-Type": "text/html" });
    // response.end(`<h1>Hello World ${request.url}</h1>`);
    // response.end();
    // const data = {
    //     id: 1,
    //     name: "John",
    //     age: 30
    // };
    // response.writeHead(200, { "Content-Type": "application/json" });
    // response.end(JSON.stringify(data));
    if (request.url === "/") {
        const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(htmlFile);
        return;
    }
    if (request.url?.endsWith(".js")) {
        response.writeHead(200, { "Content-Type": "text/javascript" });
    }
    if (request.url?.endsWith(".css")) {
        response.writeHead(200, { "Content-Type": "text/css" });
    }
    try {
        const responseContent = fs.readFileSync(`./public${request.url}`, "utf-8");
        response.end(responseContent);
    } catch (error) {
        response.writeHead(404);
        response.end("File not found");
    }
});
server.listen(8080, () => console.log("Listening on port 8080"));