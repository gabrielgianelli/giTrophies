import fs from 'fs';
import profile from '../../test/mocks/GithubProfileBody.json';
import WebScrapper from '../streak/WebScrapper';

export default class CreateGithubProfileDailyContributionList {
    constructor(private webScrapper: WebScrapper) {
        const result = webScrapper.dailyContributions(profile.body);
        fs.writeFile("GithubProfileDailyContributionList.json", JSON.stringify(result), 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
        });
    }
}
