# Tweet to Toot

## Posts your tweets to toots

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/tomouchuu/tweettotoot&env=TWITTER_CONSUMER_KEY&env=TWITTER_CONSUMER_SECRET&env=TWITTER_ACCESS_TOKEN&env=TWITTER_ACCESS_TOKEN_SECRET&env=TWITTER_USERNAME&env=MASTODON_ACCESS_TOKEN&env=MASTODON_INSTANCE)

### Install / Setup

1. Clone Repo
2. Copy the `.env.example` and add your own from creating apps over at https://apps.twitter.com and in your mastodon instance developer settings.
3. Run `yarn` in the repo to build dependencies
4. Run `yarn run start` to start the process, leave it running and whenever you tweet it will post that to mastodon.

### Extra

So it will only look at the twitter account in the `.env` and the mastodon account the `ACCESS_TOKEN` is for.

It will only post tweets to mastodon if they:
- Are not quotes
- Are not retweets
- Are not replying to anyone