const { Client } = require("discord.js");
const RSSParser = require("rss-parser");
const parser = new RSSParser();
const Youtube = require("simple-youtube-api");
<<<<<<< Updated upstream
const { youtubeAPI, rssFeedChannelId } = require("../../src/config/config.json")
const colors = require("colors");
=======
const client = require("../../src/index")
>>>>>>> Stashed changes

const startAt = Date.now();
const lastVideos = {};

//config
const config = {
    "MESSAGE": "New video: **{videoTitle}**! It was uploaded by {videoAuthorName} at {videoPubDate}! Here is the link: {videoURL}",
    "YOUTUBERS": [
        "LYXCODE",
        "https://www.youtube.com/channel/UCGyqi4UW3on0jK1W5reea1w"
    ],
    "DISCORD_CHANNEL_ID": client.config.rssFeedChannelId,
    "YOUTUBE_API_KEY": client.config.youtubeAPI
};

const youtube = new Youtube(config.YOUTUBE_API_KEY);

module.exports = {
    name: "ready",
    /**
     * @param {Client} client 
     */
    async execute(client) {

        check();
        setInterval(check, 21600 * 1000);

        /**
         * Format a date to a readable string
         * @param {Date} date The date to format 
         */
        function formatDate(date) {
            let monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
            let day = date.getDate(), month = date.getMonth(), year = date.getFullYear();
            return `${day} ${monthNames[parseInt(month, 10)]} ${year}`;
        }

        /**
         * Call a rss url to get the last video of a youtuber
         * @param {string} youtubeChannelName The name of the youtube channel
         * @param {string} rssURL The rss url to call to get the videos of the youtuber
         * @returns The last video of the youtuber
         */
<<<<<<< Updated upstream
        async function getLastVideo(youtubeChannelName, rssURL){
            console.log(`[${youtubeChannelName}]`.yellow.bold, `| Getting videos...`);
            let content = await parser.parseURL(rssURL);
            console.log(`[${youtubeChannelName}]`.yellow.bold, `| ${content.items.length} videos found`);
=======
        async function getLastVideo(youtubeChannelName, rssURL) {
            client.logger.log(`[${youtubeChannelName.toUpperCase()}] Getting videos...`, "debug");
            let content = await parser.parseURL(rssURL);
            client.logger.log(`[${youtubeChannelName.toUpperCase()}] ${content.items.length} videos found`, "log");
>>>>>>> Stashed changes
            let tLastVideos = content.items.sort((a, b) => {
                let aPubDate = new Date(a.pubDate || 0).getTime();
                let bPubDate = new Date(b.pubDate || 0).getTime();
                return bPubDate - aPubDate;
            });
<<<<<<< Updated upstream
            console.log(`[${youtubeChannelName}]`.yellow.bold, `| The last video is "${tLastVideos[0] ? tLastVideos[0].title : "err"}"`);
=======
            client.logger.log(`[${youtubeChannelName.toUpperCase()}] The last video is "${tLastVideos[0] ? tLastVideos[0].title : "err"}"`, "log");
>>>>>>> Stashed changes
            return tLastVideos[0];
        }

        /**
         * Check if there is a new video from the youtube channel
         * @param {string} youtubeChannelName The name of the youtube channel to check
         * @param {string} rssURL The rss url to call to get the videos of the youtuber
         * @returns The video || null
         */
<<<<<<< Updated upstream
        async function checkVideos(youtubeChannelName, rssURL){
            console.log(`[${youtubeChannelName}]`.yellow.bold, `| Get the last video..`);
=======
        async function checkVideos(youtubeChannelName, rssURL) {
            client.logger.log(`[${youtubeChannelName.toUpperCase()}] Get the last video..`, "debug");
>>>>>>> Stashed changes
            let lastVideo = await getLastVideo(youtubeChannelName, rssURL);
            // If there isn't any video in the youtube channel, return
            if(!lastVideo) return console.log("[ERROR]".red.bold, " | No video found for " + lastVideo);
            // If the date of the last uploaded video is older than the date of the bot starts, return 
<<<<<<< Updated upstream
            if(new Date(lastVideo.pubDate).getTime() < startAt) return console.log(`[${youtubeChannelName}]`.yellow.bold, `| Last video was uploaded before the bot starts`);
            let lastSavedVideo = lastVideos[youtubeChannelName];
            // If the last video is the same as the last saved, return
            if(lastSavedVideo && (lastSavedVideo.id === lastVideo.id)) return console.log(`[${youtubeChannelName}]`.yellow.bold, `| Last video is the same as the last saved`);
=======
            if (new Date(lastVideo.pubDate).getTime() < startAt) return client.logger.log(`[${youtubeChannelName.toUpperCase()}] Last video was uploaded before the bot starts`, "log");
            let lastSavedVideo = lastVideos[youtubeChannelName];
            // If the last video is the same as the last saved, return
            if (lastSavedVideo && (lastSavedVideo.id === lastVideo.id)) return client.logger.log(`[${youtubeChannelName.toUpperCase()}] Last video is the same as the last saved`, "log");
>>>>>>> Stashed changes
            return lastVideo;
        }

        /**
        * Get the youtube channel id from an url
        * @param {string} url The URL of the youtube channel
        * @returns The channel ID || null
        */
        function getYoutubeChannelIdFromURL(url) {
            let id = null;
            url = url.replace(/(>|<)/gi, "").split(/(\/channel\/|\/user\/)/);
            if(url[2]) {
                id = url[2].split(/[^0-9a-z_-]/i)[0];
            }
            return id;
        }

        /**
        * Get infos for a youtube channel
        * @param {string} name The name of the youtube channel or an url
        * @returns The channel info || null
        */
        async function getYoutubeChannelInfos(name){
            console.log(`[${name.length >= 10 ? name.slice(0, 10)+"..." : name}]`.yellow.bold, `| Resolving channel infos...`);
            let channel = null;
            /* Try to search by ID */
            let id = getYoutubeChannelIdFromURL(name);
            if(id) {
                channel = await youtube.getChannelByID(id);
            }

            if(!channel) {
                /* Try to search by name */
                let channels = await youtube.searchChannels(name);
                if(channels.length > 0) {
                    channel = channels[0];
                }
            }

            console.log(`[${name.length >= 10 ? name.slice(0, 10)+"..." : name}]`.yellow.bold, `| Title of the resolved channel: ${channel.raw ? channel.raw.snippet.title : "err"}`);
            return channel;
        }

        /**
<<<<<<< Updated upstream
        * Check for new videos
        */
        async function check(){
            console.log(`[RSS FEED]`.green.bold, `| Checking YOUTUBE API...`);
=======
         * Check for new videos
         */
        async function check() {
            client.logger.log(`Checking YOUTUBE API...`, "debug");
            client.logger.log(`[WEBHOOK] RSS Fedd Channel "${client.config.rssFeedChannelName}"`, "log");
>>>>>>> Stashed changes
            config.YOUTUBERS.forEach(async (youtuber) => {
                console.log(`[${youtuber.length >= 10 ? youtuber.slice(0, 10) + "..." : youtuber}]`.yellow.bold, `| Start checking...`);
                let channelInfos = await getYoutubeChannelInfos(youtuber);
                if(!channelInfos) return console.log("[ERROR]".red.bold, "| Invalid youtuber provided: " + youtuber);
                let video = await checkVideos(channelInfos.raw.snippet.title, "https://www.youtube.com/feeds/videos.xml?channel_id=" + channelInfos.id);
<<<<<<< Updated upstream
                if(!video) return console.log(`[${channelInfos.raw.snippet.title}]`.yellow.bold, `| No notification`);
=======
                if (!video) return client.logger.log(`[${channelInfos.raw.snippet.title.toUpperCase()}] No notification`, "log");
>>>>>>> Stashed changes
                let channel = client.channels.cache.get(config.DISCORD_CHANNEL_ID);
                if(!channel) return console.log("[ERROR]".yellow.bold, "| Channel not found");
                channel.send({ content: 
                    config.MESSAGE
                    .replace("{videoURL}", video.link)
                    .replace("{videoAuthorName}", video.author)
                    .replace("{videoTitle}", video.title)
                    .replace("{videoPubDate}", formatDate(new Date(video.pubDate)))
                });

                client.logger.log("Notification sent !", "log");
                lastVideos[channelInfos.raw.snippet.title] = video;
            });
        }
    }
}