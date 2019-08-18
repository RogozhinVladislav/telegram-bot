import Telegraf from 'telegraf'
const SocksAgent = require('socks5-https-client/lib/Agent');

import { getConfig } from '../config';
import { createDBApp, initializeDBApp } from '../db';
import { UserStatusEnum } from '../db/models';

const config = getConfig('bot_config')

const socksAgent = new SocksAgent({
  socksHost: config.proxy.host,
  socksPort: config.proxy.port,
  socksUsername: config.proxy.login,
  socksPassword: config.proxy.psswd,
});

const bot = new Telegraf(config.bot_section.bot_token, {
    telegram: { agent: socksAgent }
  });
  const db = createDBApp(config.db_section);
  bot.start(async (ctx) => {
    if (ctx.from) {
      const { id, first_name, username } = ctx.from;
      const idStr = String(id);
  
      const dbUser = await db.users.findById(idStr);
      if (dbUser) {
        return ctx.reply(`You are already registered! ${dbUser.first_name}`)
      }
      const createdDBUser = await db.users.add({ id: idStr, status: UserStatusEnum.registered, first_name, username });
  
      ctx.reply(`You are registered ! ${createdDBUser.first_name}`)
    }
  });
  (<any>bot).launch()
    .then(() => initializeDBApp(db))
    .then(() => {
      console.log('Bot started')
    });