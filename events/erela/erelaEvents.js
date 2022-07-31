      //const DB = require("../../Structures/Schemas/trackEnd");
      //const DB_COUNTER = require("../../Structures/Schemas/songsPlayed");
      const client = require("../../src/index");
      const {
          MessageEmbed,
          MessageActionRow,
          MessageButton
      } = require("discord.js");
      
      function msToTime(duration) {
          var milliseconds = Math.floor((duration % 1000) / 100),
              seconds = Math.floor((duration / 1000) % 60),
              minutes = Math.floor((duration / (1000 * 60)) % 60),
              hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      
          hours = (hours < 10) ? "0" + hours : hours;
          minutes = (minutes < 10) ? "0" + minutes : minutes;
          seconds = (seconds < 10) ? "0" + seconds : seconds;
      
          return minutes + ":" + seconds;
      }
      
      
      const row = new MessageActionRow()
          .addComponents(
              new MessageButton()
              .setCustomId('shuffleMusic') //DONE
              .setStyle('SECONDARY')
              .setEmoji('🔀'),
              new MessageButton()
              .setCustomId('skipMusic') //DONE
              .setStyle('SECONDARY')
              .setEmoji('⏩'),
              new MessageButton()
              .setCustomId('pauseMusic') //DONE
              .setStyle('SECONDARY')
              .setEmoji('⏸️'),
              new MessageButton()
              .setCustomId('resumeMusic') //DONE
              .setStyle('SECONDARY')
              .setEmoji('⏯️'),
              new MessageButton()
              .setCustomId('stopMusic') //DONE
              .setStyle('SECONDARY')
              .setEmoji('⏹')
          )
        const row2 = new MessageActionRow()
          .addComponents(
              new MessageButton()
              .setCustomId('volumeDownMusic') //DONE
              .setStyle('DANGER')
              .setEmoji('🔉'),
              new MessageButton()
              .setCustomId('volumeUpMusic') //DONE
              .setStyle('SUCCESS')
              .setEmoji('🔊'),
              new MessageButton()
              .setCustomId('lyrics') //DONE
              .setStyle('SECONDARY')
              .setEmoji('🔊')
          )
      
      client.manager
      
        .on("nodeConnect", (node) => {
        client.logger.log(`[LAVALINK] Connection has been established to [${node.options.identifier}]`, "ready")
        })

        .on("nodeDisconnect", (node, error) => {
        client.logger.log(`[LAVALINK] Lost connection to [${node.options.identifier}] due to an error: ${error.message}`, "error")
        })

        .on("nodeError", (node, error) => {
        client.logger.log(`[LAVALINK] Node [${node.options.identifier}] has encountered an error: ${error.message}`, "error")
        })
          /*
          .on("trackEnd", async (player, track) => {
      
              const dbFound = await DB.findOne({
                  guildId: player.guild
              });
      
              const fetchedMessage = await client.channels.cache.get(player.textChannel).messages.fetch(dbFound.messageId)
      
              await fetchedMessage.delete()
      
      
              const dbFoundCounter = await DB_COUNTER.findOne({
                  ident: "counter"
              });
      
              if (dbFoundCounter) await dbFoundCounter.updateOne({
                  songsPlayed: dbFoundCounter.songsPlayed + 1
              });
      
              else await DB_COUNTER.create({
                  ident: "counter",
                  songsPlayed: 1
              });
      
              // await fetchedMessage.edit({ embeds: [new MessageEmbed().setColor("BLURPLE").setDescription(`🔹 |  Finished **[${track.title}](${track.uri})** [${msToTime(track.duration) || "Undetermined"} - <@${track.requester.id}>]`).setImage(track.displayThumbnail("maxresdefault")).setTimestamp()]})
      
          }) 
      */
          .on("trackStart", async (player, track) => {
      
              trackMsgId = await client.channels.cache.get(player.textChannel).send({
                  embeds: [new MessageEmbed().setColor("DARK_BUT_NOT_BLACK").setDescription(`🎶 Now Playing **[${track.title}](${track.uri})** [${msToTime(track.duration) || "Undetermined"}]`).setImage(track.displayThumbnail("maxresdefault")).setTimestamp()],
                  components: [row]
              })
      
             /* const dbFound = await DB.findOne({
                  guildId: player.guild
              });
      
              if (dbFound) await dbFound.updateOne({
                  messageId: trackMsgId.id
              });
      
              else await DB.create({
                  guildId: player.guild,
                  messageId: trackMsgId.id
              });
      */
      
          })
      
          .on("queueEnd", async (player, track) => {
      
              player.destroy()
              player.disconnect()
      
          })

          module.exports = {
            name: "ErelaEvents",
          };