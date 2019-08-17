import Telegraf from 'telegraf'

import { getConfig } from '../config/config'
const config = getConfig('bot_config')

const SocksAgent = require('socks5-https-client/lib/Agent');
const socksAgent = new SocksAgent({
  socksHost: config.proxy.host,
  socksPort: config.proxy.port,
  socksUsername: config.proxy.login,
  socksPassword: config.proxy.psswd,
});

const bot = new Telegraf(config.bot_section.bot_token, {
    telegram: { agent: socksAgent }
  });
bot.start((ctx) => ctx.reply('Welcome!123'))
bot.launch()