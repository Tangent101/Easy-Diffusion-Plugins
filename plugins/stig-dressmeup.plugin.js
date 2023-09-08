/**
 * Dress Me Up
 * v.1.1, last updated: 08/09/2023
 * By The Stig
 * 
 * 
 *
 * Free to use with the CMDR2 Stable Diffusion UI.
 *  
 */
(function() { "use strict"
    const VERSION = "1.1";
    const ID_PREFIX = "TheStig-DressMeUp-plugin";
    console.log('%s Embed Metadata Version: %s', ID_PREFIX, VERSION);
	
	var UpperItem = [];
	var LowerItem = [];
	var FootwearItem = [];
	var HeadwearItem = [];
		
	injectLoaderCSS();
	createUpperItems();
	createLowerItems();
	createFootwearItems();
	createHeadwearItems();
	
	
	addDressMeUpSettings();
	
	
	function injectLoaderCSS() {
		console.log('** Inject CSS **');
	}
	
	function createUpperItems() {
		UpperItem = [ "Asymmetric hem top",
              "Asymmetric top",
              "Balloon sleeve blouse",
              "Bell sleeve top",
              "Blazer",
              "Blouse",
              "Bodysuit",
              "Bow back blouse",
              "Bow tie blouse",
              "Bustier",
              "Button-down shirt",
              "Camisole",
              "Cape sleeve top",
              "Cape top",
              "Cardigan",
              "Chiffon blouse",
              "Choker neck top",
              "Cold shoulder top",
              "Collared shirt",
              "Collarless blouse",
              "Corset top",
              "Cowl neck top",
              "Crochet sweater",
              "Crochet top",
              "Crop top",
              "Cropped sweater",
              "Cropped tank top",
              "Crossover top",
              "Embellished blouse",
              "Embroidered top",
              "Flared sleeve top",
              "Flounce sleeve top",
              "Fringe top",
              "Graphic print t-shirt",
              "Halter top",
              "Halterneck blouse",
              "Henley top",
              "High neck top",
              "High-low hem top",
              "Hoodie",
              "Keyhole blouse",
              "Kimono top",
              "Lace top",
              "Lace-trimmed camisole",
              "Lace-up bodysuit",
              "Lace-up top",
              "Mesh overlay top",
              "Mesh top",
              "Mock neck top",
              "Off-the-shoulder top",
              "One-shoulder top",
              "Oversized button-down shirt",
              "Oversized hoodie",
              "Oversized sweater",
              "Peasant blouse",
              "Peplum top",
              "Peter Pan collar top",
              "Plaid shirt",
              "Pleated blouse",
              "Pleated sleeve blouse",
              "Pleated tunic",
              "Printed blouse",
              "Puff shoulder sweater",
              "Puff sleeve blouse",
              "Puffed shoulder blouse",
              "Pullover",
              "Ribbed sweater",
              "Ribbed turtleneck",
              "Ruched top",
              "Ruffle blouse",
              "Ruffle sleeve blouse",
              "Ruffled turtleneck",
              "Satin blouse",
              "Satin camisole",
              "Sequin top",
              "Sheer blouse",
              "Silk blouse",
              "Sleeveless blouse",
              "Smocked top",
              "Strappy camisole",
              "Striped blouse",
              "Sweater",
              "Sweatshirt",
              "Tank top",
              "Tie-back top",
              "Tied sleeve blouse",
              "Tie-dye t-shirt",
              "Tie-front top",
              "Tiered top",
              "T-shirt",
              "Tube top",
              "Tunic",
              "Tunic sweater",
              "Turtleneck",
              "Velvet blouse",
              "V-neck top",
              "Wrap blouse",
              "Wrap cardigan",
              "Wrap front blouse",
              "Wrap top" ]
	}
	function createLowerItems() {
		LowerItem = ["A-line culottes",
              "A-line shorts",
              "A-line skirt",
              "Bell-bottom jumpsuit",
              "Bell-bottom pants",
              "Bermuda shorts",
              "Bootcut pants",
              "Boyfriend jeans",
              "Capri leggings",
              "Capri pants",
              "Cargo jogger pants",
              "Cargo pants",
              "Cropped cargo pants",
              "Cropped jogger pants",
              "Cropped leggings",
              "Cropped pants",
              "Cropped wide-leg jumpsuit",
              "Cuffed shorts",
              "Culotte jumpsuit",
              "Culotte pantsuit",
              "Culotte skirt",
              "Culottes",
              "Denim culottes",
              "Denim paperbag shorts",
              "Denim shorts",
              "Denim skirt",
              "Flare pants",
              "Flare skirt",
              "Flare skort",
              "Flared culottes",
              "Flared jumpsuit",
              "Flared midi skirt",
              "Fringed shorts",
              "Harem pants",
              "High-low hem skirt",
              "High-low skirt",
              "High-waisted denim skirt",
              "High-waisted pants",
              "High-waisted pleated shorts",
              "High-waisted shorts",
              "High-waisted skirt",
              "Jeans",
              "Jogger pants",
              "Jogger shorts",
              "Jumpsuit",
              "Leggings",
              "Leggings with mesh inserts",
              "Maxi skirt",
              "Maxi skirt with side slit",
              "Midi skirt",
              "Midi skirt with asymmetrical hem",
              "Mini skirt",
              "Palazzo jumpsuit",
              "Palazzo pants",
              "Paperbag shorts",
              "Paperbag waist cropped pants",
              "Paperbag waist pants",
              "Paperbag waist shorts",
              "Paperbag waist skirt",
              "Pencil pants",
              "Pencil skirt",
              "Pleated culottes",
              "Pleated palazzo jumpsuit",
              "Pleated palazzo pants",
              "Pleated shorts",
              "Pleated skirt",
              "Pleated skort",
              "Pleated wide-leg trousers",
              "Pleather leggings",
              "Pleather leggings",
              "Ruffle detail shorts",
              "Ruffle hem skirt",
              "Ruffle trim skor",
              "Ruffled hem pants",
              "Ruffled hem trousers",
              "Ruffled skirt",
              "Shorts",
              "Skinny jeans",
              "Skinny trousers",
              "Skirt",
              "Skort (skirt with built-in shorts)",
              "Straight-leg cropped jeans",
              "Straight-leg pants",
              "Tailored trousers",
              "Tiered maxi skirt",
              "Trousers",
              "Wide-leg cropped pants",
              "Wide-leg culottes",
              "Wide-leg jumpsuit",
              "Wide-leg jumpsuit with belt",
              "Wide-leg linen pants",
              "Wide-leg pants",
              "Wrap skirt",
              "Wrap-around skirt",
              "Wrap-front culottes",
              "Wrap-front skirt",
              "Wrap-style pants"];
	}
	function createFootwearItems() {
		FootwearItem = ["Ankle boots",
              "Ballet flats",
              "Block heel sandals",
              "Boat shoes",
              "Boots",
              "Chelsea boots",
              "Espadrilles",
              "Flats",
              "Flip-flops",
              "Gladiator sandals",
              "Heels",
              "High-top sneakers",
              "Hiking boots",
              "Kitten heels",
              "Lace-up boots",
              "Loafers",
              "Mary Jane shoes",
              "Mules",
              "Oxford shoes",
              "Peep-toe heels",
              "Platform sandals",
              "Pointed-toe flats",
              "Pumps",
              "Sandals",
              "Slides",
              "Slingback pumps",
              "Slip-on sneakers",
              "Sneakers",
              "Stilettos",
              "Wedges"];
	}
	function createHeadwearItems() {
		HeadwearItem = ["Bandana",
              "Beanie",
              "Beret",
              "Bonnet",
              "Bow headband",
              "Bowler hat",
              "Bucket hat",
              "Cap",
              "Cloche hat",
              "Cloche with a veil",
              "Cowboy hat",
              "Crown",
              "Crown braid",
              "Fascinator",
              "Fascinator hat",
              "Fascinator hat with feathers",
              "Fascinator with birdcage veil",
              "Feather fascinator with netting",
              "Feathered headband",
              "Feathers headdress",
              "Fedora",
              "Floppy hat",
              "Floral crown with ribbon ties",
              "Flower crown",
              "Flower headband",
              "Hair bow",
              "Hair clip",
              "Hairband",
              "Hairpins with decorative jewels",
              "Halo headband",
              "Hatpin",
              "Headband",
              "Headscarf",
              "Headwrap",
              "Hijab",
              "Peacock feather headpiece",
              "Pillbox hat",
              "Pillbox hat with a veil",
              "Sailor hat",
              "Sinamay hat",
              "Straw hat",
              "Sun hat",
              "Sun visor",
              "Tiara",
              "Tiaras with crystal accents",
              "Turban",
              "Turban headband",
              "Veil",
              "Wide-brimmed hat"];
	}
		
	function addDressMeUpSettings() {
		console.log('Add DressMeUp Settings');
		var openCheck = '';
		openCheck = ' active';
		
		var DressMeUpSettings = document.createElement('div');
		DressMeUpSettings.id = 'DressMeUp-settings';
		DressMeUpSettings.classList.add('panel-box');
		let tempHTML = `<h4 class="collapsible `+openCheck+`">Dress Me Up Settings <i id="reset-dmu-settings" class="fa-solid fa-arrow-rotate-left section-button"><span class="simple-tooltip top-left">Dress Me Up Settings</span></i></h4>
			<div id="dmu-settings-entries" class="collapsible-content" style="display: block;margin-top:15px;">
				<table><tbody>
					<tr><td><b class="settings-subheader">Clothing</b></td></tr>
					
					<tr><td><label for="Headwear_input">Head wear:</label>
					<select id="Headwear_input" name="Headwear_input onchange = "selectOption()">
					<option>None</option></select></td></tr>
					
					<tr><td><label for="upperBody_input">Upper Body:</label>
					<select id="upperBody_input" name="upperBody_input onchange = "selectOption()">
					<option>None</option></select></td></tr>
					
					<tr><td><label for="lowerBody_input">Lower Body:</label>
					<select id="lowerBody_input" name="lowerBody_input onchange = "selectOption()">
					<option>None</option></select></td></tr>
					
					<tr><td><label for="Footwear_input">Foot wear:</label>
					<select id="Footwear_input" name="Footwear_input onchange = "selectOption()">
					<option>None</option></select></td></tr>
					
					</tbody></table>
					<br>
					<button type="button" id="setWardrobe">Wear these items of clothes</button>
					<br>
					</div>`;
		DressMeUpSettings.innerHTML = tempHTML;
		var editorSettings = document.getElementById('editor-settings');
		editorSettings.parentNode.insertBefore(DressMeUpSettings, editorSettings.nextSibling);
		createCollapsibles(DressMeUpSettings);
		
		UpperItem.forEach((clothingItem) => {
			var x = document.getElementById("upperBody_input"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
			//console.log(clothingItem);
		})
		
		LowerItem.forEach((clothingItem) => {
			var x = document.getElementById("lowerBody_input"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
			//console.log(clothingItem);
		})
		
		FootwearItem.forEach((clothingItem) => {
			var x = document.getElementById("Footwear_input"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
			//console.log(clothingItem);
		})
		
		HeadwearItem.forEach((clothingItem) => {
			var x = document.getElementById("Headwear_input"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
			//console.log(clothingItem);
		})
		
		document.getElementById ("setWardrobe").addEventListener ("click", setItems, false);
			
		
	}
	
	function setItems() {
		
		console.log(promptField.value);
		var upperItemofClothing = upperBody_input.value;
		var lowerItemofClothing = lowerBody_input.value;
		var footwearClothing = Footwear_input.value;
		var headwearClothing = Headwear_input.value;
		var additionalPrompt = ' wearing ';
		var changeFlag = false;
		
		switch (upperItemofClothing) {
			case 'None':
				break;
			default:
				additionalPrompt = additionalPrompt + upperItemofClothing + ',';
				changeFlag = true;
				break;
		}
		
		switch (lowerItemofClothing) {
			case 'None':
				break;
			default:
				additionalPrompt = additionalPrompt + lowerItemofClothing + ',';
				changeFlag = true;
				break;
		}
		
		switch (footwearClothing) {
			case 'None':
				break;
			default:
				additionalPrompt = additionalPrompt + footwearClothing + ',';
				changeFlag = true;
				break;
		}
		
		switch (headwearClothing) {
			case 'None':
				break;
			default:
				additionalPrompt = additionalPrompt + headwearClothing + ',';
				changeFlag = true;
				break;
		}
		
		
		
		switch (changeFlag) {
			case false:
				break;
			default:
				promptField.value = promptField.value + additionalPrompt;
				break;
		}
		
	}



})();
