import fs from 'fs';
import profile from '../../test/mocks/GithubProfileBody.json';
import DailyContributionWebScrapper from '../streak/DailyContributionWebScrapper';

export default class CreateGithubProfileDailyContributionList {
    constructor(private webScrapper: DailyContributionWebScrapper) {
        const result = webScrapper.execute(profile.body);
        fs.writeFile("GithubProfileDailyContributionList.json", JSON.stringify(result), 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
        });
    }
}