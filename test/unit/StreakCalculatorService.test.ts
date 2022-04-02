import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon';
import { StreakCalculatorService } from '../../src/services/StreakCalculatorService';
import { ContributionByDayTotalizers } from '../../src/entities/ContributionByDayTotalizers';
import twoDayStreak from './../mocks/TwoDayStreak.json';
import sevenDaysMaxStreak from './../mocks/SevenDaysMaxStreak.json';

describe('Streak Suite Tests', () => {
    let sandbox: SinonSandbox;
    let contributionsByDayList: ContributionByDayTotalizers[];

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should get contribution streak, given an ordered list of objects containing date and number of contributions', () => {
        contributionsByDayList = twoDayStreak.list.map(contribution => ({
            date: new Date(contribution.date),
            numberOfContributions: parseInt(contribution.numberOfContributions)
        }));
        const now = new Date(2022, 3, 1);
        sandbox.useFakeTimers(now.getTime());
        const expected = 2;
        const result = StreakCalculatorService.currentStreak(contributionsByDayList);
        expect(result).to.be.deep.equal(expected);
    });

    it('should get the max contribution streak, given an ordered list of objects containing date and number of contributions', () => {
        contributionsByDayList = sevenDaysMaxStreak.list.map(contribution => ({
            date: new Date(contribution.date),
            numberOfContributions: parseInt(contribution.numberOfContributions)
        }));
        // const now = new Date(2022, 3, 1);
        // sandbox.useFakeTimers(now.getTime());
        const expected = 7;
        const result = StreakCalculatorService.maxStreak(contributionsByDayList);
        expect(result).to.be.deep.equal(expected);
    });
});
