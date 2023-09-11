/**
 * Dress Me Up
 * v.1.1, last updated: 09/09/2023
 * By The Stig
 * 
 * Thanks for the additional input by the following:
 * PlushBanshee, Scriven, Yushaw12
 * who's help has been really appreciated
 *
 * Free to use with the CMDR2 Stable Diffusion UI.
 *  
 */
(function() { "use strict"
    const VERSION = "1.1";
    const ID_PREFIX = "TheStig-DressMeUp-plugin";
    console.log('%s Embed Metadata Version: %s', ID_PREFIX, VERSION);
	
	var wardrobeName = "Default Wardrobe";
	var designerName = "The Stig";
	
	var defaultColors = [];
	var defaultMaterials = [];
	
	var UpperItem = [];
	var UpperItemColor = [];
	var UpperItemMaterial = [];
	
	var LowerItem = [];
	var LowerItemColor = [];
	var LowerItemMaterial = [];

	var FootwearItem = [];
	
	var HeadwearItem = [];
		
	injectLoaderCSS();
	createColors();
	createMaterials();
	createUpperItems();
	createLowerItems();
	createFootwearItems();
	createHeadwearItems();
	
	
	addDressMeUpSettings();
	
	
	function injectLoaderCSS() {
		console.log('** Inject CSS **');
	}
	
	function createColors() {
		defaultColors = [
			"Black",
			"Blue",
			"Glitter",
			"Green",
			"Holographic",
			"Iridescent",
			"Metallic",
			"Multicolored",
			"Neon", 
			"Pastel",
			"Pink",
			"Prismatic",
			"Psychedelic",
			"Purple",
			"Red",
			"Shiny",
			"Translucent",
			"Transparent",
			"White",
			"Yellow"
		]
	}
	
	function createMaterials() {
		defaultMaterials = [
			"Cotton",
			"Crochet",
			"Embroidered",
			"Fishnet",
			"Lace",
			"Latex",
			"Leather",
			"Microfiber",
			"Microfibre",
			"PVC",
			"Paper",
			"Printed",
			"Satin",
			"Silk",
			"Tin Foil",
			"Velvet",
			"Vinyl"
		]
	}
	
	
	function createUpperItems() {
		UpperItem = [ 
			"Asymmetric hem top",
			"Asymmetric top",
			"Balloon sleeve blouse",
			"Bell sleeve top",
			"Bikini top",
			"Blazer",
			"Blouse",
			"Bodysuit",
			"Bomber jacket",
			"Bow back blouse",
			"Bow tie blouse",
			"Bra",
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
			"Opened jacket",
			"Oversized button-down shirt",
			"Oversized hoodie",
			"Oversized shirt",
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
			"Slip Dress",
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
			"Wrap top"
			]
			
		UpperItemColor = defaultColors;
			
		UpperItemMaterial = defaultMaterials;
	}
	
	function createLowerItems() {
		LowerItem = [
			"A-line culottes",
			"A-line shorts",
			"A-line skirt",
			"Bell-bottom jumpsuit",
			"Bell-bottom pants",
			"Bermuda shorts",
			"Bikini bottoms",
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
			"Denim jeans",
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
			"Panties",
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
			"Ripped jeans",
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
			"Striped panties",
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
			"Wrap-style pants"
			 ]
			 
		LowerItemColor = defaultColors;
		
		LowerItemMaterial = defaultMaterials;
	}
	
	function createFootwearItems() {
		FootwearItem = [
			"Ankle boots",
			"Ballet flats",
			"Block heel sandals",
			"Boat shoes",
			"Boots",
			"Chelsea boots",
			"Combat boots",
			"Espadrilles",
			"Flats",
			"Flip-flops",
			"Gladiator sandals",
			"Heels",
			"High-top sneakers",
			"Hiking boots",
			"Kneehighs",
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
			"Socks",
			"Stilettos",
			"Striped thighhighs",
			"Thighhighs",
			"Wedges"
			]
	}
	function createHeadwearItems() {
		HeadwearItem = [
			"Bandana",
			"Beanie",
			"Beret",
			"Bonnet",
			"Bow headband",
			"Bowler hat",
			"Bucket hat",
			"Cap",
			"Cigarette",
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
			"Hair scrunchie",
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
			"Sunglasses",
			"Sun hat",
			"Sun visor",
			"Tiara",
			"Tiaras with crystal accents",
			"Turban",
			"Turban headband",
			"Veil",
			"VR headset",
			"Wide-brimmed hat"
			]
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
				<p></p>
				<input type="file" id="selectFiles" "value="Import" /><br />
				<p></p>
				<button type="button" id="importWardrobe">Import Wardrobe</button>
				<p></p>
				<p></p>
				<table><tbody>
					<tr><td><b id="wardrobeHeader" class="settings-subheader">Options</b></td></tr>
					
					<tr><td><label for="Headwear_input">Head wear:</label>
					<select id="Headwear_input" name="Headwear_input onchange = "selectOption()">
					<option>None</option></select></td></tr>
					
					<tr><td><label for="upperBody_input">Upper Body:</label>
					<select id="upperBody_input" name="upperBody_input onchange = "selectOption()">
					<option>None</option></select></td>
					
					<tr><td><label for="upperBody_color">Color:</label>
					<select id="upperBody_color" name="upperBody_color onchange = "selectOption()">
					<option>None</option></select></td>
					
					<tr><td><label for="upperBody_material">Material:</label>
					<select id="upperBody_material" name="upperBody_material onchange = "selectOption()">
					<option>None</option></select></td>
					</tr>
					
					<tr><td><label for="lowerBody_input">Lower Body:</label>
					<select id="lowerBody_input" name="lowerBody_input onchange = "selectOption()">
					<option>None</option></select></td>
					
					<tr><td><label for="lowerBody_color">Color:</label>
					<select id="lowerBody_color" name="lowerBody_color onchange = "selectOption()">
					<option>None</option></select></td>
					
					<tr><td><label for="lowerBody_material">Material:</label>
					<select id="lowerBody_material" name="lowerBody_material onchange = "selectOption()">
					<option>None</option></select></td>
					
					</tr>
					
					<tr><td><label for="Footwear_input">Foot wear:</label>
					<select id="Footwear_input" name="Footwear_input onchange = "selectOption()">
					<option>None</option></select></td></tr>
					
					</tbody></table>
					<br>
					<button type="button" id="setRandomItems">Choose a Random Outfit</button>
					<p></p>
					<button type="button" id="setWardrobe">Wear these items of clothes</button>
					<p></p>
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
		
		UpperItemColor.forEach((clothingItem) => {
			var x = document.getElementById("upperBody_color"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
			//console.log(clothingItem);
		})
		
		UpperItemMaterial.forEach((clothingItem) => {
			var x = document.getElementById("upperBody_material"); 
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
		
		LowerItemColor.forEach((clothingItem) => {
			var x = document.getElementById("lowerBody_color"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
			//console.log(clothingItem);
		})
		
		LowerItemMaterial.forEach((clothingItem) => {
			var x = document.getElementById("lowerBody_material"); 
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
		document.getElementById ("setRandomItems").addEventListener ("click", setRandomItems, false);
		document.getElementById ("importWardrobe").addEventListener ("click", importWardrobe, false);
		document.getElementById ("wardrobeHeader").innerHTML = wardrobeName;

	}
	
	function setItems() {
		//console.log(promptField.value);
		var upperItemofClothing = upperBody_input.value;
		var upperItemofClothingColor = upperBody_color.value;
		var upperItemofClothingMaterial = upperBody_material.value;
		
		var lowerItemofClothing = lowerBody_input.value;
		var lowerItemofClothingColor = lowerBody_color.value;
		var lowerItemofClothingMaterial = lowerBody_material.value;
		
		
		var footwearClothing = Footwear_input.value;
		var headwearClothing = Headwear_input.value;
		
		var additionalPrompt = ' wearing';
		var changeFlag = false;
		
		switch (upperItemofClothing) {
			case 'None':
				break;
			default:
				switch (upperItemofClothingColor) {
					case 'None':
						break;
					default:
						additionalPrompt = additionalPrompt + ' ' + upperItemofClothingColor;
						break;
				}
				additionalPrompt = additionalPrompt + ' ' + upperItemofClothing;
				switch (upperItemofClothingMaterial) {
					case 'None':
						break;
					default:
						additionalPrompt = additionalPrompt + ' made of ' + upperItemofClothingMaterial;
						break;
				}
				additionalPrompt = additionalPrompt + ',';
				changeFlag = true;
				break;
		}
		
		switch (lowerItemofClothing) {
			case 'None':
				break;
			default:
				switch (lowerItemofClothingColor) {
					case 'None':
						break;
					default:
						additionalPrompt = additionalPrompt + ' ' + lowerItemofClothingColor;
						break;
				}
				additionalPrompt = additionalPrompt + ' ' + lowerItemofClothing;
				switch (lowerItemofClothingMaterial) {
					case 'None':
						break;
					default:
						additionalPrompt = additionalPrompt + ' made of ' + lowerItemofClothingMaterial;
						break;
				}
			
				additionalPrompt = additionalPrompt + ',';
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
	
	function setRandomItems() {
		console.log('Random items');
		var lenUpperItem = UpperItem.length;
		var lenUpperItemColor = UpperItemColor.length;
		var lenUpperItemMaterial = UpperItemMaterial.length;
		
		var lenLowerItem = LowerItem.length;
		var lenLowerItemColor = LowerItemColor.length;
		var lenLowerItemMaterial = LowerItemMaterial.length;
		
		var lenFootwearItem = FootwearItem.length;
		var lenHeadwearItem = HeadwearItem.length;
		
		var randomUpperItem = Math.floor(Math.random() * lenUpperItem);
		var randomUpperItemColor = Math.floor(Math.random() * lenUpperItemColor);
		var randomUpperItemMaterial = Math.floor(Math.random() * lenUpperItemMaterial);
		
		
		var randomLowerItem = Math.floor(Math.random() * lenLowerItem);
		var randomLowerItemColor = Math.floor(Math.random() * lenLowerItemColor);
		var randomLowerItemMaterial = Math.floor(Math.random() * lenLowerItemMaterial);
		
		
		var randomFootwearItem = Math.floor(Math.random() * lenFootwearItem);
		var randomHeadwearItem = Math.floor(Math.random() * lenHeadwearItem);

		document.getElementById ("upperBody_input").value = UpperItem[randomUpperItem];
		document.getElementById ("upperBody_color").value = UpperItemColor[randomUpperItemColor];
		document.getElementById ("upperBody_material").value = UpperItemMaterial[randomUpperItemMaterial];
		
		document.getElementById ("lowerBody_input").value = LowerItem[randomLowerItem];
		document.getElementById ("lowerBody_color").value = LowerItemColor[randomLowerItemColor];
		document.getElementById ("lowerBody_material").value = LowerItemMaterial[randomLowerItemMaterial];
		
		document.getElementById ("Footwear_input").value = FootwearItem[randomFootwearItem];
		document.getElementById ("Headwear_input").value = HeadwearItem[randomHeadwearItem];
		
	}
	
	function importWardrobe() {
		console.log('Importing Wardrobe');
		//alert('Apologies but the Import Wardrobe routine is still under construction.');
		var files = document.getElementById('selectFiles').files;
		//console.log(files);
		if (files.length <= 0) {
			return false;
		}
		var fr = new FileReader();
  
		fr.onload = function(e) { 
			//console.log(e);
			var result = JSON.parse(e.target.result);
			var formatted = JSON.stringify(result, null, 2);
			//console.log('Text: ' + result.wardrobeID);
			//console.log('Text: ' + result.creatorID);
			//console.log(document.getElementById('wardrobeHeader').value);
			document.getElementById ("wardrobeHeader").innerHTML = 'Wardrobe: ' + result.wardrobeID;
			UpperItem = [];
			document.getElementById('upperBody_input').innerText = null;
			result.UpperBodyItems.forEach((clothingItem) => {
				UpperItem.push(clothingItem);
				var x = document.getElementById("upperBody_input");
				var option = document.createElement("option");
				option.text = clothingItem;
				x.add(option);
				

			})
			LowerItem = [];
			document.getElementById('lowerBody_input').innerText = null;
			result.LowerBodyItems.forEach((clothingItem) => {
				LowerItem.push(clothingItem);
				var x = document.getElementById("lowerBody_input");
				var option = document.createElement("option");
				option.text = clothingItem;
				x.add(option);
			})
			
				
			
			
			
		}
  
		fr.readAsText(files.item(0));
		

	}
	
	function exportWardrobe() {
		console.log('Exporting Wardrobe');
		alert('Apologies but the Export Wardrobe routine is still under construction.');
	}
	



})();
