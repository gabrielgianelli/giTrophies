import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon';

import twoDayStreak from './../mocks/TwoDaysStreak.json';
import sevenDaysMaxStreak from './../mocks/SevenDaysMaxStreak.json';
import DailyContributionList from '../../src/entities/DailyContributionList';
import DailyContribution from '../../src/entities/DailyContribution';

describe('Streak Suite Tests', () => {
    let sandbox: SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should get contribution streak, given an ordered list of objects containing date and number of contributions', () => {
        const dailyContributions = twoDayStreak.list.map(contribution => (
            new DailyContribution(
                new Date(contribution.date), 
                parseInt(contribution.totalContributions)
        )));
        const dailyContributionList = new DailyContributionList(dailyContributions);
        const now = new Date(2022, 3, 1);
        sandbox.useFakeTimers(now.getTime());
        const expected = 2;
        const result = dailyContributionList.currentStreak;
        expect(result).to.be.deep.equal(expected);
    });

    it('should get the max contribution streak, given an ordered list of objects containing date and number of contributions', () => {
        const dailyContributions = sevenDaysMaxStreak.list.map(contribution => (
            new DailyContribution(
                new Date(contribution.date),
                parseInt(contribution.totalContributions)
            )
        ));
        const dailyContributionList = new DailyContributionList(dailyContributions);
        const expected = 7;
        const result = dailyContributionList.maxStreak;
        expect(result).to.be.deep.equal(expected);
    });
});
