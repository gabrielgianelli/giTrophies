import Client from "../http/Client";
import WebScrapper from "../../WebScrapper";
import GetStreak from "../../application/usecase/GetStreak";
import GetStreakOutputDTO from "../../application/dto/GetStreakOutputDTO";

export default class StreakController {
    
    constructor(
        private client: Client,
        private webScrapper: WebScrapper
    ) {}

    async getStreak(params: any): Promise<GetStreakOutputDTO> {
        const getStreak = new GetStreak(this.client, this.webScrapper);
        const { username } = params;
        return await getStreak.execute({ username });
    };
}
