import StreakController from "../../../streak/infra/controller/StreakController";
import Client from "../../../streak/infra/http/Client";
import WebScrapper from "../../../streak/infra/webscrapper/WebScrapper";
import Server from "./Server";

export default class Router {
    constructor(
        private server: Server,
        private client: Client,
        private webScrapper: WebScrapper
    ) {
        this.configure();
    }

    private configure(): void {
        this.server.on('/streak/:username', 'get', async (params: any, body: any) => {
            const streakController = new StreakController(this.client, this.webScrapper);
            return await streakController.getStreak(params);
        });
    }
}
