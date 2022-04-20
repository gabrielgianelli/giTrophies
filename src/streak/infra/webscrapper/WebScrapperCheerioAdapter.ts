import cheerio from 'cheerio';
import WebScrapper from './WebScrapper';
import DailyContribution from '../../domain/entity/DailyContribution';

const GITHUB_CONTRIBUTION_CLASS = '.ContributionCalendar-day';
const GITHUB_CONTRIBUTION_DATE = 'date';
const GITHUB_CONTRIBUTION_DATE_SEPARATOR = '-';
const GITHUB_CONTRIBUTION_TOTAL = 'count';

export default class WebScrapperCheerioAdapter implements WebScrapper {
    dailyContributions(htmlBody: string): DailyContribution[] {
        const $ = cheerio.load(htmlBody);
        const data = $(GITHUB_CONTRIBUTION_CLASS);
        const contributions = data.get()
        .map(item => {
            const stringDate = String($(item).data(GITHUB_CONTRIBUTION_DATE));
            const [year, month, day] = stringDate.split(GITHUB_CONTRIBUTION_DATE_SEPARATOR);  
            const date = new Date(parseInt(year), parseInt(month)-1, parseInt(day));
            const totalContributions = parseInt($(item).data(GITHUB_CONTRIBUTION_TOTAL));
            return { date, totalContributions }
        })
        .filter(contribution => !!contribution.date.getDate());
        return contributions;
    }
}
