const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);
  const { pathname } = reqUrl;

  if (req.method === "GET" && pathname === "/signup") {
    fs.readFile(path.join(__dirname, "index.html"), (err, htmlData) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }

      const cssPath = path.join(__dirname, "style.css");
      const jsPath = path.join(__dirname, "signup.js");

      fs.readFile(cssPath, (err, cssData) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
          return;
        }

        fs.readFile(jsPath, (err, jsData) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
            return;
          }

          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(htmlData);
          res.write(`<style>${cssData}</style>`);
          res.write(`<script>${jsData}</script>`);
          res.end();
        });
      });
    });
  } else {
    // Serve index.html for all other routes
    fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  }
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server active on port ${PORT}`);
});
