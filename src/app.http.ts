import http from "http";
import fs from 'fs';

const server = http.createServer((request, response) => {
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
    const responseContent = fs.readFileSync(`./public${request.url}`, "utf-8");
    response.end(responseContent);
});
server.listen(8080, () => console.log("Listening on port 8080"));