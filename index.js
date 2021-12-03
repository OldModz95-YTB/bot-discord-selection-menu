//Const de base de discord.
const { MessageEmbed, Client } = require("discord.js");
const Discord = require("discord.js");
const client = new Client();

// Const pour me Menu et discord bouton
const dbs = require("discord-buttons");
dbs(client);
const { MessageMenuOption, MessageMenu } = require("discord-buttons");


// Const pour le fichier variables.json et le prefix
const variables = require(`./variables/variables.json`);
const prefix = variables.prefix;

// Démarrage du bot
client.on('ready', function() {
	console.log("Prêt à être utiliser à 100%.")
	
});

// Fonction pour faire les commandes
client.on('message', async function(message) {
	////////-------////////
	//--A NE PAS TOUCHER-//
	////////-------////////
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;
	////////////////////
	////////////////////
	if (!message.content.startsWith(prefix)) return;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////COMMANDE Help Menu/////////////////
///////////////////////////////////////////////////

	if(message.content == prefix + "menu"){

		// Une selection
		let help = new MessageMenuOption() // Changer option1 par un autre nom
		.setLabel("Help") //Le nom de la selection qui s'affiche
		.setValue("Help") //Valeur (ajouter la meme que en haut)
		.setDescription("Voir l'aide de commande.") //Description de la selection
		.setDefault() //Rien à ajouter
		.setEmoji("❓") //Emoji qui va s'afficher
		// Fin de la selection

		// Une selection
		let discord = new MessageMenuOption() // Changer option1 par un autre nom
		.setLabel("Discord") //Le nom de la selection qui s'affiche
		.setValue("Discord") //Valeur (ajouter la meme que en haut)
		.setDescription("Lien vers le Discord ProtonDev.") //Description de la selection
		.setDefault() //Rien à ajouter
		.setEmoji("💯") //Emoji qui va s'afficher
		// Fin de la selection

		/*
		Pour en ajouter un 2emes, copier de la ligne 44 à 49
		Changer le .setLabel et .setValue
		*/

		// Ce qui permet d'afficher la selection.
		let selection = new MessageMenu()
		.setID("Selection")
		.setMaxValues(1) // Maximum de valeur selectionner (jamais au dessus du nombre de selection possible).
		.setMinValues(1) // Minimum de valeur selectionner (jamais en dessous de 1).
		.setPlaceholder("Clic ici pour voir la liste.") // Message par défaut qui sera afficher
		.addOption(help) // Nom de la selection
		.addOption(discord)
		// --Fin--


		// Créaction du message embed
		// C'est l'embed qui sera afficher pour faire les selections
		let embed = new Discord.MessageEmbed()

		.setColor('random')
		.setTitle(`CENTRE D'AIDE`)
		.setImage("https://i.imgur.com/WgGkNx2.gif")
		.setDescription(`Selection Menu By OldModz95`)

		//Fin de la créaction du message embed
		
		// Ajout de la selection dans l'embed pour l'afficher dans le channel
		let menumsg = await message.channel.send(embed, selection)

		// Fonction du menuselection
		function menuselection(menu)
		{
			switch(menu.values[0])
			{
				//Simple message de réponse
				case "Help": // Nom de la setValue
					menu.reply.send("Voici la réponse.", true)
				break;

				//Réponse en embed
				//Début de la fonction
				case "Discord":
					//Début de la réponse
					menu.reply.send("Voici la réponse.", true)
					let embed_hhwid = new MessageEmbed()
			.setColor('random')
			.setTitle(`Bot Discord selection message`)
			.setDescription(`Discord [clic here](https://discord.gg/MS6TMgRfqB)
			Documentation: [clic here](https://protondev-1.gitbook.io/protondev-documentation/bot-discord/selection-menu)`)
			.setTimestamp()
			.setFooter(`Demander par ${message.author.tag}`)
			message.channel.send(embed_hhwid);
			//Fin de la réponse
				break;
				//Fin de la fonction


				/* POUR EN AJOUTER UN 2EMES
				case "":
					menu.reply.send("Voici la réponse.", true)
				break;
				*/

			}
		}
		// Fin de la fonction du menuselection

		// Déclanchement de l'action lors d'une selection
		client.on("clickMenu", (menu) => {
			if(menu.message.id == menumsg.id) {
				if(menu.clicker.user.id == message.author.id)
				menuselection(menu)
				else
				menu.reply.send("Vous n'êtes pas autorisé à choisir quelque chose.", true)
			}
		})
		//Fin du client.on (du déclanchement de l'action)

	}

////////////////////
// FIN DE LA COMMANDE
////////////////////

//////////////////////////////////////////////




})//

client.login(variables.token);

/*
Developped by OldModz95
Proposed by ProtonDev
Discord: https://discord.gg/MS6TMgRfqB
Documentation: https://protondev-1.gitbook.io/protondev-documentation/bot-discord/selection-menu
Github: https://github.com/oldmodz95-ytb/bot-discord-selection-menu
*/