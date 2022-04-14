import DailyContribution from "./domain/entity/DailyContribution";

export default interface WebScrapper {
    dailyContributions(htmlBody: string): DailyContribution[];
}
