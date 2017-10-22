require('dotenv-safe').load();

const express = require('express');
const app = express();

const Twit = require('twit');
const Mastodon = require('mastodon-api');

function tweetToToot() {
    const config = {
        timeout_ms: 60*1000, // 60seconds
    };
    
    const T = new Twit({
        consumer_key:         process.env.TWITTER_CONSUMER_KEY,
        consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
        access_token:         process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
        timeout_ms:           config.timeout_ms,
    });
    
    const M = new Mastodon({
        access_token: process.env.MASTODON_ACCESS_TOKEN,
        timeout_ms:   config.timeout_ms,
        api_url:      process.env.MASTODON_INSTANCE,
    });
    
    T.get('users/show', {screen_name: process.env.TWITTER_USERNAME}, function(err, user) {
        const userstream = T.stream('statuses/filter', { follow: user.id });
        userstream.on('tweet', function (tweet) {
            if (
                tweet.is_quote_status === false && 
                tweet.retweeted === false && 
                tweet.in_reply_to_status_id_str === null
            ) {
                M.post('statuses', {
                    status: tweet.text + ' --|- via.Twitter',
                }, function(err, data) {
                    if (err) { console.log(err); }
                    // Tweet converted to Toot
                });
            }
        });
    });
}

app.get('/', function (req, res) {
    res.send('no website here')
})

app.listen(3000, function () {
    tweetToToot();
    console.log('Example app listening on port 3000!')
})