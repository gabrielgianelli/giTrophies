import DailyContribution from "./DailyContribution";

export default class DailyContributionList {
    constructor(
        private _dailyContributions: DailyContribution[] 
    ) {}

    get currentStreak(): number {
        const reverseDailyContributions = this._dailyContributions.slice().reverse();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastDay = reverseDailyContributions.shift();
        if (!lastDay) return 0;
        lastDay.date.setHours(0, 0, 0, 0);
        let streak = 0;
        if (lastDay.date.getTime() === today.getTime() && lastDay.totalContributions > 0) streak++;
        let previousDay = new Date(today.getTime());
        previousDay.setDate(previousDay.getDate() - 1);
        for (let contribution of reverseDailyContributions) {
            if (contribution.date.getTime() !== previousDay.getTime()) break;
            if (contribution.totalContributions <= 0) break;
            previousDay.setDate(previousDay.getDate() - 1);
            streak++;
        }
        return streak;
    }

    get maxStreak(): number {
        let nextDay = this._dailyContributions[0].date;
        let streak = 0;
        let maxStreak = 0;
        for (let contribution of this._dailyContributions) {
            if (streak > maxStreak) maxStreak = streak;
            const { date, totalContributions } = contribution;
            if (date.getTime() === nextDay.getTime() && totalContributions > 0) streak++;
            else streak = 0;
            nextDay.setDate(nextDay.getDate() + 1);
        }
        return maxStreak;
    }
}
