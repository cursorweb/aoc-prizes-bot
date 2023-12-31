const dotenv = require("dotenv");
dotenv.config();

const { Client, Events, GatewayIntentBits } = require('discord.js');
const token = process.env.TOKEN;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });

/*
guild id: 575842109672652822
channel id: 867088236865257492
*/

const guildId = "575842109672652822";
const channelId = "867088236865257492";

/**
 * gets the #bot-commands channel
 * @returns the channel
 */
async function getChannel() {
    const guild = await client.guilds.fetch(guildId);
    const channel = await guild.channels.fetch(channelId);
    return channel;
}

client.once(Events.ClientReady, async readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, async msg => {
    if (msg.author.bot) return;

    if (msg.mentions.has(msg.client.user.id)) {
        msg.channel.send(`You can invite me [here](https://discord.com/api/oauth2/authorize?client_id=1183176323242414220&permissions=3072&scope=applications.commands+bot)
You can also view the github: [here](https://github.com/cursorweb/aoc-prizes-bot)

**Commands:**
\`~gen\` prompt user to generate a random time
\`~update\` update the site (todo)
\`~test\` send a message`);
    }

    async function input(text) {
        await msg.reply({ content: text });
        const filter = m => m.author.id == msg.author.id;
        return msg.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
            .then(collected => collected.first().content)
            .catch(() => {
                msg.reply('Didnt finish.');
            });
    }

    let cmd = msg.content.toLowerCase().trim();
    if (cmd == "~gen") {
        // good luck!!
        const time = await input("what time to verb?");
        const amount = await input("how many winners?");
        msg.channel.send(`got: ${time} time with ${amount} winners`);
    }
});

client.login(token);