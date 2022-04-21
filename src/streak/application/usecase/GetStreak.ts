import GetStreakInputDTO from "../dto/GetStreakInputDTO";
import GetStreakOutputDTO from "../dto/GetStreakOutputDTO";
import Client from "../../infra/http/Client";
import WebScrapper from "../../infra/webscrapper/WebScrapper";
import DailyContributionList from "../../domain/entity/DailyContributionList";

export default class GetStreak {
    
    constructor(
        private client: Client,
        private webScrapper: WebScrapper
    ) {}

    async execute({ username }: GetStreakInputDTO): Promise<GetStreakOutputDTO> {
        const html = await this.client.request(username);
        const dailyContributions = this.webScrapper.dailyContributions(html);
        const dailyContributionList = new DailyContributionList(dailyContributions);
        const currentStreak = dailyContributionList.currentStreak;
        const maxStreak = dailyContributionList.maxStreak;
        return {
            currentStreak,
            maxStreak
        };
    };
}
