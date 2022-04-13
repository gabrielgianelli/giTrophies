import DailyContribution from './entity/DailyContribution';

export default interface DailyContributionWebScrapper {
    execute(htmlBody: string): DailyContribution[];
}
