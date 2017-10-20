require('dotenv-safe').load();

var Twit = require('twit');
var Mastodon = require('mastodon-api');

const config = {
    timeout_ms: 60*1000, // 60seconds
};

var T = new Twit({
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
