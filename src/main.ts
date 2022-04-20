import ServerExpressAdapter from "./shared/infra/http/ServerExpressAdapter";
import ClientAxiosAdapter from "./streak/infra/http/ClientAxiosAdapter";
import WebScrapperCheerioAdapter from "./streak/infra/webscrapper/WebScrapperCheerioAdapter";
import Router from "./shared/infra/http/Router";

(async () => {
    const server = new ServerExpressAdapter();
    const client = new ClientAxiosAdapter();
    const webScrapper = new WebScrapperCheerioAdapter();
    const router = new Router(server, client, webScrapper);
    server.listen(3000);
})();