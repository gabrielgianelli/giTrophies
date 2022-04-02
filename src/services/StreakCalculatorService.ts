import { ContributionByDayTotalizers } from "../entities/ContributionByDayTotalizers";

export class StreakCalculatorService {
    static currentStreak(contributionsByDayList: ContributionByDayTotalizers[]): number {
        const reverseContributionsByDayList = contributionsByDayList.slice().reverse();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastDay = reverseContributionsByDayList.shift();
        if (!lastDay) return 0;
        lastDay.date.setHours(0, 0, 0, 0);
        let streak = 0;
        if (lastDay.date.getTime() === today.getTime() && lastDay.numberOfContributions > 0) streak++;
        let previousDay = new Date(today.getTime());
        previousDay.setDate(previousDay.getDate() - 1);
        for (let contribution of reverseContributionsByDayList) {
            if (contribution.date.getTime() !== previousDay.getTime()) break;
            if (contribution.numberOfContributions <= 0) break;
            previousDay.setDate(previousDay.getDate() - 1);
            streak++;
        }
        return streak;
    }

    static maxStreak(contributionsByDayList: ContributionByDayTotalizers[]): number {
        let nextDay = contributionsByDayList[0].date;
        let streak = 0;
        let maxStreak = 0;
        for (let contribution of contributionsByDayList) {
            if (streak > maxStreak) maxStreak = streak;
            const { date, numberOfContributions } = contribution;
            if (date.getTime() === nextDay.getTime() && numberOfContributions > 0) streak++;
            else streak = 0;
            nextDay.setDate(nextDay.getDate() + 1);
        }
        return maxStreak;
    }
}