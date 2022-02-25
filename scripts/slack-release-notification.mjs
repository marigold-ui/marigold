#!/usr/bin/env zx

import SlackNotify from 'slack-notify';
import {config} from 'dotenv';

const json = require("../packages/components/package.json");
const result = config({path: 'local.env'});
const slack = SlackNotify(result.parsed.SLACK_NOTIFICATION);

async function slackNotification() {
    const message = ':information_source: New Release v' + json.version + ' :tada:';
    try{
        await slack.send({
            "blocks": [
                {   
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": message
                    }
                },{
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": 'Click below to see all *changes*'
                    },
                },{
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": " <https://github.com/marigold-ui/marigold/blob/main/packages/components/CHANGELOG.md|:marigold: *View Changelog*>"
                    }
                }
            ]
        });
        console.log('Done!');
    } catch (e){
        console.log('Failed! '+e);
    }
};
slackNotification()