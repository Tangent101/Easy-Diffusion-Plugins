/**
 * Dress Me Up
 * v.1.1, last updated: 14/09/2023
 * By The Stig
 * 
 * Thanks for the additional input by the following:
 * PlushBanshee, Scriven, Yushaw12
 * and anyone else that has assisted.
 * Your help has been really appreciated
 *
 * Change Log
 * 14/09/2023 Added Accessories
 * 14/09/2023 Added Option to change Footwear Material and Color
 * 14/09/2023 Added Option to change Headwear Material and Color
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
	var statusUpper = false;
	
	var LowerItem = [];
	var LowerItemColor = [];
	var LowerItemMaterial = [];
	var statusLower = false;

	var FootwearItem = [];
	var FootwearItemColor = [];
	var FootwearItemMaterial = [];
	var statusFootwear = false;
	
	var HeadwearItem = [];
	var HeadwearItemColor = [];
	var HeadwearItemMaterial = [];
	var statusHeadwear = false;
	
	var AccessoryItem = [];
	var AccessoryItemColor = [];
	var AccessoryItemMaterial = [];
	var statusAccessory = false;
	
	
		
	injectLoaderCSS();
	createColors();
	createMaterials();
	createUpperItems();
	createLowerItems();
	createFootwearItems();
	createHeadwearItems();
	createAccessoryItems();
	
	
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
		FootwearItemColor = defaultColors;				
		FootwearItemMaterial = defaultMaterials;
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
		HeadwearItemColor = defaultColors;		
		HeadwearItemMaterial = defaultMaterials;
	}
	
	function createAccessoryItems() {
		AccessoryItem = [
			"Newspaper",
			"Carrot",
			"Handbag",
			"Cigarette"
			]
		AccessoryItemColor = defaultColors;		
		AccessoryItemMaterial = defaultMaterials;
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
				<button style="display:block;width:120px; height:30px;" onclick="document.getElementById('selectFiles').click()">Import Wardrobe</button>
				<input type='file' id="selectFiles" style="display:none" onchange="document.getElementById('importWardrobe').click()">
				<button style="display:none" type="button" id="importWardrobe">Import Wardrobe</button>
				<p></p>

				<table><tbody>
					<tr><td><b id="wardrobeHeader" class="settings-subheader">Options</b></td></tr>
					<tr><td>
					<hr>
					<p></P>
					<button type="button" id="lockHeadwear" <i class="fas fa-unlock-alt"></i></button>
					<label for="Headwear_input">Head wear:</label>
					<select id="Headwear_input" name="Headwear_input onchange = "selectOption()">
					<option>None</option></select>
					</td>
					<tr><td>
					<label for="Headwear_material">Material:</label>
					<select id="Headwear_material" name="Headwear_material onchange = "selectOption()">
					<option>None</option></select>
					<label for="Headwear_color">Color:</label>
					<select id="Headwear_color" name="Headwear_color onchange = "selectOption()">
					<option>None</option></select>
					<p></P>
					</td>
					</tr>
					
					<tr><td>
					
					<button type="button" id="lockUpper" <i class="fas fa-unlock-alt"></i></button>
					<label for="upperBody_input">Upper Body:</label>
					<select id="upperBody_input" name="upperBody_input onchange = "selectOption()">
					<option>None</option></select>
					</td>
					
					<tr><td>
					<label for="upperBody_material">Material:</label>
					<select id="upperBody_material" name="upperBody_material onchange = "selectOption()">
					<option>None</option></select>
					<label for="upperBody_color">Color:</label>
					<select id="upperBody_color" name="upperBody_color onchange = "selectOption()">
					<option>None</option></select>
					<p></P>
					</td>
					</tr>
					
					<tr><td>
					
					<button type="button" id="lockLower" <i class="fas fa-unlock-alt"></i></button>
					<label for="lowerBody_input">Lower Body:</label>
					<select id="lowerBody_input" name="lowerBody_input onchange = "selectOption()">
					<option>None</option></select>
					</td>
					
					<tr><td><label for="lowerBody_material">Material:</label>
					<select id="lowerBody_material" name="lowerBody_material onchange = "selectOption()">
					<option>None</option></select>
					<label for="lowerBody_color">Color:</label>
					<select id="lowerBody_color" name="lowerBody_color onchange = "selectOption()">
					<option>None</option></select>
					<p></P>
					</td>
					</tr>
					
					<tr><td>
					<button type="button" id="lockFootwear" <i class="fas fa-unlock-alt"></i></button>
					<label for="Footwear_input">Foot wear:</label>
					<select id="Footwear_input" name="Footwear_input onchange = "selectOption()">
					<option>None</option></select>
					</td>
					
					<tr><td><label for="Footwear_material">Material:</label>
					<select id="Footwear_material" name="Footwear_material onchange = "selectOption()">
					<option>None</option></select>
					<label for="Footwear_color">Color:</label>
					<select id="Footwear_color" name="Footwear_color onchange = "selectOption()">
					<option>None</option></select>
					<p></P>
					</td>
					</tr>
					
					<tr><td>
					<button type="button" id="lockAccessory" <i class="fas fa-unlock-alt"></i></button>
					<label for="Accessory_input">Accessory:</label>
					<select id="Accessory_input" name="Accessory_input onchange = "selectOption()">
					<option>None</option></select>
					</td>
					
					<tr><td><label for="Accessory_material">Material:</label>
					<select id="Accessory_material" name="Accessory_material onchange = "selectOption()">
					<option>None</option></select>
					<label for="Accessory_color">Color:</label>
					<select id="Accessory_color" name="Accessory_color onchange = "selectOption()">
					<option>None</option></select>
					<p></P>
					
					<hr>
					</td></tr>
					
					
		
					</tbody></table>
					
					<p></P>
					<button type="button" id="setRandomItems">Choose a Random Outfit</button>
					<p></P>
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
		})
		
		UpperItemColor.forEach((clothingItem) => {
			var x = document.getElementById("upperBody_color"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})
		
		UpperItemMaterial.forEach((clothingItem) => {
			var x = document.getElementById("upperBody_material"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})
		
		LowerItem.forEach((clothingItem) => {
			var x = document.getElementById("lowerBody_input"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})
		
		LowerItemColor.forEach((clothingItem) => {
			var x = document.getElementById("lowerBody_color"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})
		
		LowerItemMaterial.forEach((clothingItem) => {
			var x = document.getElementById("lowerBody_material"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})
				
		FootwearItem.forEach((clothingItem) => {
			var x = document.getElementById("Footwear_input"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})
		
		FootwearItemColor.forEach((clothingItem) => {
			var x = document.getElementById("Footwear_color"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})
		
		FootwearItemMaterial.forEach((clothingItem) => {
			var x = document.getElementById("Footwear_material"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})		
		
		HeadwearItem.forEach((clothingItem) => {
			var x = document.getElementById("Headwear_input"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})
		
		HeadwearItemColor.forEach((clothingItem) => {
			var x = document.getElementById("Headwear_color"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})
		
		HeadwearItemMaterial.forEach((clothingItem) => {
			var x = document.getElementById("Headwear_material"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})
		
		AccessoryItem.forEach((clothingItem) => {
			var x = document.getElementById("Accessory_input"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})
		
		
		
		document.getElementById ("setWardrobe").addEventListener ("click", setItems, false);
		document.getElementById ("setRandomItems").addEventListener ("click", setRandomItems, false);
		document.getElementById ("importWardrobe").addEventListener ("click", importWardrobe, false);
		document.getElementById ("lockHeadwear").addEventListener ("click", lockHeadwear, false);
		document.getElementById ("lockUpper").addEventListener ("click", lockUpper, false);
		document.getElementById ("lockLower").addEventListener ("click", lockLower, false);
		document.getElementById ("lockFootwear").addEventListener ("click", lockFootwear, false);
		document.getElementById ("lockAccessory").addEventListener ("click", lockAccessory, false);
		
		
		document.getElementById ("selectFiles").addEventListener ("onchange", importWardrobe,false);
		
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
		var footwearClothingColor = Footwear_color.value;
		var footwearClothingMaterial = Footwear_material.value;
		
		var headwearClothing = Headwear_input.value;
		var headwearClothingColor = Headwear_color.value;
		var headwearClothingMaterial = Headwear_material.value;
		
		var AccessoryClothing = Accessory_input.value;
		var AccessoryClothingColor = Accessory_color.value;
		var AccessoryClothingMaterial = Accessory_material.value;
		
		var additionalPrompt = ' wearing';
		var AccessoryPrompt = 'holding';
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
				switch (footwearClothingColor) {
						case 'None':
							break;
						default:
							additionalPrompt = additionalPrompt + ' ' + footwearClothingColor;
							break;
				}
				additionalPrompt = additionalPrompt + ' ' + footwearClothing;
				switch (footwearClothingMaterial) {
					case 'None':
						break;
					default:
						additionalPrompt = additionalPrompt + ' made of ' + footwearClothingMaterial;
						break;
				}
				additionalPrompt = additionalPrompt + ',';
				changeFlag = true;
				break;
		}
		
		switch (headwearClothing) {
			case 'None':
				break;
			default:
				switch (headwearClothingColor) {
						case 'None':
							break;
						default:
							additionalPrompt = additionalPrompt + ' ' + headwearClothingColor;
							break;
				}
				additionalPrompt = additionalPrompt + ' ' + headwearClothing;
				switch (headwearClothingMaterial) {
					case 'None':
						break;
					default:
						additionalPrompt = additionalPrompt + ' made of ' + headwearClothingMaterial;
						break;
				}
				additionalPrompt = additionalPrompt + ',';
				changeFlag = true;
				break;
		}
		
		switch (AccessoryClothing) {
			case 'None':
				break;
			default:
				switch (changeFlag) {
					case false:
						additionalPrompt = ' ' + AccessoryPrompt;
						switch (AccessoryClothingColor) {
							case 'None':
								break;
							default:
								additionalPrompt = additionalPrompt + ' ' + AccessoryClothingColor;
								break;
						}
						additionalPrompt = additionalPrompt + ' ' + AccessoryClothing;
						switch (AccessoryClothingMaterial) {
							case 'None':
								break;
							default:
								additionalPrompt = additionalPrompt + ' made of ' + AccessoryClothingMaterial;
								break;
						}
						additionalPrompt = additionalPrompt + ',';
						changeFlag = true;
						break;
					case true:
						additionalPrompt = additionalPrompt + ' ' + AccessoryPrompt;
						switch (AccessoryClothingColor) {
							case 'None':
								break;
							default:
								additionalPrompt = additionalPrompt + ' ' + AccessoryClothingColor;
								break;
						}
						additionalPrompt = additionalPrompt + ' ' + AccessoryClothing;
						switch (AccessoryClothingMaterial) {
							case 'None':
								break;
							default:
								additionalPrompt = additionalPrompt + ' made of ' + AccessoryClothingMaterial;
								break;
						}
						additionalPrompt = additionalPrompt + ',';
						changeFlag = true;
						break;
				}
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
		var lenUpperItem = UpperItem.length;
		var lenUpperItemColor = UpperItemColor.length;
		var lenUpperItemMaterial = UpperItemMaterial.length;
		
		var lenLowerItem = LowerItem.length;
		var lenLowerItemColor = LowerItemColor.length;
		var lenLowerItemMaterial = LowerItemMaterial.length;
		
		var lenFootwearItem = FootwearItem.length;
		var lenFootwearItemColor = FootwearItemColor.length;
		var lenFootwearItemMaterial = FootwearItemMaterial.length;
		
		var lenHeadwearItem = HeadwearItem.length;
		var lenHeadwearItemColor = HeadwearItemColor.length;
		var lenHeadwearItemMaterial = HeadwearItemMaterial.length;
		
		var randomUpperItem = Math.floor(Math.random() * lenUpperItem);
		var randomUpperItemColor = Math.floor(Math.random() * lenUpperItemColor);
		var randomUpperItemMaterial = Math.floor(Math.random() * lenUpperItemMaterial);
		
		
		var randomLowerItem = Math.floor(Math.random() * lenLowerItem);
		var randomLowerItemColor = Math.floor(Math.random() * lenLowerItemColor);
		var randomLowerItemMaterial = Math.floor(Math.random() * lenLowerItemMaterial);
		
		
		var randomFootwearItem = Math.floor(Math.random() * lenFootwearItem);
		var randomFootwearItemColor = Math.floor(Math.random() * lenFootwearItemColor);
		var randomFootwearItemMaterial = Math.floor(Math.random() * lenFootwearItemMaterial);
		
		var randomHeadwearItem = Math.floor(Math.random() * lenHeadwearItem);
		var randomHeadwearItemColor = Math.floor(Math.random() * lenHeadwearItemColor);
		var randomHeadwearItemMaterial = Math.floor(Math.random() * lenHeadwearItemMaterial);
		
		
		switch (statusUpper) {
			case true:
				break;
			case false:
				document.getElementById ("upperBody_input").value = UpperItem[randomUpperItem];
				document.getElementById ("upperBody_color").value = UpperItemColor[randomUpperItemColor];
				document.getElementById ("upperBody_material").value = UpperItemMaterial[randomUpperItemMaterial];
				break;
		}
		
		switch (statusLower) {
			case true:
				break;
			case false:
				document.getElementById ("lowerBody_input").value = LowerItem[randomLowerItem];
				document.getElementById ("lowerBody_color").value = LowerItemColor[randomLowerItemColor];
				document.getElementById ("lowerBody_material").value = LowerItemMaterial[randomLowerItemMaterial];
				break;
		}
		switch (statusFootwear) {
			case true:
				break;
			case false:
				document.getElementById ("Footwear_input").value = FootwearItem[randomFootwearItem];
				document.getElementById ("Footwear_color").value = FootwearItemColor[randomFootwearItemColor];
				document.getElementById ("Footwear_material").value = FootwearItemMaterial[randomFootwearItemMaterial];
				break;
		}
		switch (statusHeadwear) {
			case true:
				break;
			case false:
				document.getElementById ("Headwear_input").value = HeadwearItem[randomHeadwearItem];
				document.getElementById ("Headwear_color").value = HeadwearItemColor[randomHeadwearItemColor];
				document.getElementById ("Headwear_material").value = HeadwearItemMaterial[randomHeadwearItemMaterial];
				break;
		}
		
	}
	
	function importWardrobe() {
		console.log('Importing Wardrobe');
		var files = document.getElementById('selectFiles').files;
		console.log(files);
		if (files.length <= 0) {
			return false;
		}
		//createNewUpper();
		//createNewLower();
		//resetLocks();
		var fr = new FileReader();
  
		fr.onload = function(e) { 
			var result = JSON.parse(e.target.result);
			var formatted = JSON.stringify(result, null, 2);
			document.getElementById ("wardrobeHeader").innerHTML = 'Wardrobe: ' + result.wardrobeID;
			switch (formatted.includes("UpperBodyItems")) {
				case true:
					console.log("Upper Items Imported");
					createNewUpper();
					resetLocks();
					result.UpperBodyItems.forEach((clothingItem) => {
						UpperItem.push(clothingItem);
						var x = document.getElementById("upperBody_input");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
					})
					break;
				case false:
					console.log("Upper Items Not Found");
					break;
			}
			
			switch (formatted.includes("LowerBodyItems")) {
				case true:
					console.log("Lower Items Imported");
					createNewLower();
					resetLocks();
					result.LowerBodyItems.forEach((clothingItem) => {
					LowerItem.push(clothingItem);
					var x = document.getElementById("lowerBody_input");
					var option = document.createElement("option");
					option.text = clothingItem;
					x.add(option);
				})
				break;
				case false:
					console.log("Lower Items Not Found");
					break;
			}
			
			switch (formatted.includes("HeadwearItems")) {
				case true:
					console.log("Headwear Items Imported");
					break;
				case false:
					console.log("Headwear Items Not Found");
			}
			
			switch (formatted.includes("FootwearItems")) {
				case true:
					console.log("Footwear Items Imported");
					break;
				case false:
					console.log("Footwear Items Not Found");
			}
			
				
			
			//result.UpperBodyItems.forEach((clothingItem) => {
			//	UpperItem.push(clothingItem);
			//	var x = document.getElementById("upperBody_input");
			//	var option = document.createElement("option");
			//	option.text = clothingItem;
			//	x.add(option);
			//})
			
			
			//result.LowerBodyItems.forEach((clothingItem) => {
			//	LowerItem.push(clothingItem);
			//	var x = document.getElementById("lowerBody_input");
			//	var option = document.createElement("option");
			//	option.text = clothingItem;
			//	x.add(option);
			//})			
		}
		fr.readAsText(files.item(0));
	}
	
	function createNewUpper() {
		//console.log('Creating entry');
		UpperItem = [];
		document.getElementById('upperBody_input').innerText = null;
		var x = document.getElementById("upperBody_input");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
	}
	
	function createNewLower() {
		//console.log('Creating New Lower entry');
		LowerItem = [];
		document.getElementById('lowerBody_input').innerText = null;
		var x = document.getElementById("lowerBody_input");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
	}

	function lockHeadwear() {
		switch (statusHeadwear) {
			case false:
				statusHeadwear = true;
				document.getElementById("Headwear_input").disabled = true; 
				document.getElementById("Headwear_material").disabled = true; 	
				document.getElementById("Headwear_color").disabled = true;
				document.getElementById ("lockHeadwear").setAttribute("class","fas fa-key");
				break;
			case true:
				statusHeadwear = false;
				document.getElementById("Headwear_input").disabled = false;
				document.getElementById("Headwear_material").disabled = false; 
				document.getElementById("Headwear_color").disabled = false;
				document.getElementById ("lockHeadwear").setAttribute("class","fas fa-unlock-alt");
				break;
		}
	}
	
	function lockUpper() {
		switch (statusUpper) {
			case false:
				statusUpper = true;
				document.getElementById("upperBody_input").disabled = true; 
				document.getElementById("upperBody_material").disabled = true; 
				document.getElementById("upperBody_color").disabled = true;
				document.getElementById ("lockUpper").setAttribute("class","fas fa-key");
				break;
			case true:
				statusUpper = false;
				document.getElementById("upperBody_input").disabled = false;
				document.getElementById("upperBody_material").disabled = false; 
				document.getElementById("upperBody_color").disabled = false;
				document.getElementById ("lockUpper").setAttribute("class","fas fa-unlock-alt");
				break;
		}
	}
	
	function lockLower() {
		switch (statusLower) {
			case false:
				statusLower = true;
				document.getElementById("lowerBody_input").disabled = true; 
				document.getElementById("lowerBody_material").disabled = true; 
				document.getElementById("lowerBody_color").disabled = true;
				document.getElementById ("lockLower").setAttribute("class","fas fa-key");
				break;
			case true:
				statusLower = false;
				document.getElementById("lowerBody_input").disabled = false;
				document.getElementById("lowerBody_material").disabled = false; 
				document.getElementById("lowerBody_color").disabled = false;
				document.getElementById ("lockLower").setAttribute("class","fas fa-unlock-alt");
				break;
		}
	}
	
	function lockFootwear() {
		switch (statusFootwear) {
			case false:
				statusFootwear = true;
				document.getElementById("Footwear_input").disabled = true; 
				document.getElementById("Footwear_material").disabled = true; 
				document.getElementById("Footwear_color").disabled = true;
				document.getElementById ("lockFootwear").setAttribute("class","fas fa-key");
				break;
			case true:
				statusFootwear = false;
				document.getElementById("Footwear_input").disabled = false;
				document.getElementById("Footwear_material").disabled = false; 
				document.getElementById("Footwear_color").disabled = false;
				document.getElementById ("lockFootwear").setAttribute("class","fas fa-unlock-alt");
				break;
		}
	}
	
	function lockAccessory() {
		switch (statusAccessory) {
			case false:
				statusAccessory = true;
				document.getElementById("Accessory_input").disabled = true; 
				document.getElementById("Accessory_material").disabled = true; 
				document.getElementById("Accessory_color").disabled = true;
				document.getElementById ("lockAccessory").setAttribute("class","fas fa-key");
				break;
			case true:
				statusAccessory = false;
				document.getElementById("Accessory_input").disabled = false;
				document.getElementById("Accessory_material").disabled = false; 
				document.getElementById("Accessory_color").disabled = false;
				document.getElementById ("lockAccessory").setAttribute("class","fas fa-unlock-alt");
				break;
		}
	}
	
	
	function resetLocks() {
		//console.log('Resetting Locks');
		statusUpper = true;
		statusLower = true;
		statusFootwear = true;
		statusHeadwear = true;
		statusAccessory = true;
		lockUpper();
		lockLower();
		lockFootwear();
		lockHeadwear();	
		lockAccessory()		
	}
	
	
	
	
	



})();
