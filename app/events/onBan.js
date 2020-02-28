module.exports = class
{
  constructor (client)
  {
    this.client = client;
    this.name = 'guildBanAdd';
  }

  async run (guild, user) {
    const channel = await this.client.db.channel.findOne({ where: {server_id: guild.id, type: 'logs'}})
    if (channel) {
      guild.channels.get(channel.id).send(`${user.tag} has been banned`, {code:""})
    }
  }
}