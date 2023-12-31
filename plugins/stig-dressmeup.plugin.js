/**
 * Dress Me Up
 * v.1.1, last updated: 27/12/2023
 * By The Stig
 * 
 * Thanks for the additional input by the following:
 * PlushBanshee, Scriven, Yushaw12
 * and anyone else that has assisted.
 * Your help has been really appreciated
 *
 * Change Log
 * 27/12/2023 Set Default State to Closed
 * 28/09/2023 Added ability to remove a Wardrobe
 * 27/09/2023 Bug Fix and Log info to console
 * 24/09/2023 Added ability to import all Wardrobe files in a given folder and sub folder
 * 22/09/2023 Added Batch run option
 * 20/09/2023 Added Pre and Post Prompt Text Boxes
 * 19/09/2023 Added Prompt buttons and display
 * 18/09/2023 Added item count
 * 18/09/2023 Added Option to switch between loaded wardrobes
 * 15/09/2023 Added Extra Materials
 * 15/09/2023 Added Extra Colors
 * 14/09/2023 Added Reset to Default Wardrobe
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
	
	var defaultBatchCount = 4;
		
	var alertMessage = 'Some Text';
	
	var WardrobeList = [];
	var WardrobeDescr = [];
	var WardrobeCount = 0;
	var loadedWardrobe = [];
	var globalWardrobe = []; // [[],[],[],[],[],[],[]];
	var globWardrobe = {ItemWardrobe:"Unknown", Itemcreator:"Unknown", Itemtype:"Unknown",ItemName:"Unknown"};
	var dummyWardrobe = [];
	var wardrobeFlag = false;
	var writeFlag = false;
	var currWardrobe = null;
	var itemExists = false;
	var itemCount = 0;
	var skipCount = 0;
	
	var promptReplace = false;
	
	
	
	var wardrobeName = "Default Wardrobe";
	var designerName = "The Stig";
	
	var globalColors = [];
	var globalMaterials = [];
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
	
	var prePrompt = [];
	var postPrompt = [];
	var prePromptField = null;
	var postPromptField = null;	
	
		
	injectLoaderCSS();
	createColors();
	createMaterials();
	createUpperItems();
	createLowerItems();
	createFootwearItems();
	createHeadwearItems();
	createAccessoryItems();
	createWardrobeList();
	//createGlobalWardrobe();
	
	
	addDressMeUpSettings();
	
	var confirmDiv = document.getElementById("confirm");
	var removeDiv = document.getElementById("confirmRemove");
	var removeWardrobeOption = false;
	
	createGlobalWardrobe();
	populatePrompt();
	
	
	function injectLoaderCSS() {
		console.log('** Inject CSS **');
		const style = document.createElement('style');
		style.textContent = `
			.inputWidth {
				width:280px;
				min-width: 280px;
				max-width: 280px ;
				overflow: hidden;
			}
			.materialWidth {
				width:120px;
				min-width: 120px;
				max-width: 120px ;
				overflow: hidden;
			}
			.colorWidth {
				width:120px;
				min-width: 120px;
				max-width: 120px ;
				overflow: hidden;
			}
			.txtBox {
				resize: none;
			}
			.txtBox2 {
				resize: both;
				 overflow: auto;
			}
			#confirm {
				display: none;
				background-color: white;
				font-size: 20px;
				color: blue;
				border: 4px solid;
				border-radius: 12px;
				padding: 5px;
				position: fixed;
				height: 120px;
				width: 240px;
				left: 50%;
				top: 50%;
				padding: 6px 8px 8px;
				text-align: center;
			}
			.close {
				display: flex;
				position: absolute;
				right: 20px;
				bottom: 8px;
			}
			
			#confirmRemove {
				display: none;
				background-color: white;
				font-size: 20px;
				color: blue;
				border: 4px solid;
				border-radius: 12px;
				padding: 5px;
				position: fixed;
				height: 120px;
				width: 240px;
				left: 50%;
				top: 50%;
				padding: 6px 8px 8px;
				text-align: center;
			}
			.removeItems {
				display: flex;
				position: absolute;
				right: 20px;
				bottom: 8px;

			}
		`;
		document.head.appendChild(style);
	}
	
	function createColors() {
		defaultColors = [
			"Air Force Blue",
			"Alabaster White",
			"Amaranth",
			"Amethyst Purple",
			"Apple blossom White",
			"Apricot",
			"Aqua",
			"Arabian Green",
			"Arctic Blue",
			"Ash Grey",
			"Azure Blue",
			"Baby Pink",
			"Baker-Miller Pink",
			"Barbie Pink",
			"Black",
			"Blue",
			"Blush Pink",
			"Bone White",
			"Bottle Green",
			"Brick Red",
			"Bubblegum Pink",
			"Burnt Orange",
			"Butter Yellow",
			"Buttercup Yellow",
			"Cadbury Purple",
			"Cafe au Lait Brown",
			"Camel Brown",
			"Canary Yellow",
			"Candy Floss Pink",
			"Caramel Brown",
			"Carmine",
			"Carrot",
			"Cerise",
			"Cerulean Blue",
			"Chalk White",
			"Champagne",
			"Charcoal Black",
			"Chartreuse",
			"Cherry Red",
			"Chestnut Brown",
			"Chocolate Brown",
			"Cloud Grey",
			"Cloud White",
			"Cobalt",
			"Concrete Grey",
			"Coral",
			"Corn",
			"Cornflower",
			"Cream White",
			"Crimson",
			"Cyan",
			"Daffodil Yellow",
			"Damson Purple",
			"Dark Cyan",
			"Dewberry Purple",
			"Dolphin Grey",
			"Dove Grey",
			"Ebony Black",
			"Emerald Green",
			"Espresso Brown",
			"Fern",
			"Fig Purple",
			"Flame Orange",
			"Flamingo Pink",
			"Flint Grey",
			"Fog Grey",
			"Forest Green",
			"French Navy",
			"Fuscia Pink",
			"Gardenia White",
			"Garnet",
			"Geranium Red",
			"Ginger",
			"Glitter",
			"Gold",
			"Graphite Grey",
			"Green",
			"Heliotrope Purple",
			"Hematite Black",
			"Holographic",
			"Honey",
			"Hot Pink",
			"Ice Blue",
			"Ice White",
			"Indigo",
			"Ink Black",
			"Iridescent",
			"Iris Blue",
			"Iris Yellow",
			"Isabelline White",
			"Ivory White",
			"Jade",
			"Jet Black",
			"Kelly Green",
			"Kohl Black",
			"Lapis Blue",
			"Latte Brown",
			"Lavender Purple",
			"Leather Brown",
			"Lemon",
			"Light Taupe Brown",
			"Lime Green",
			"Lizard Grey",
			"Lobelia Purple",
			"Magenta",
			"Magnolia White",
			"Mahogony Brown",
			"Mango",
			"Marigold Orange",
			"Mauve Purple",
			"Melanin Black",
			"Melon",
			"Metallic",
			"Midnight Black",
			"Midnight Blue",
			"Milk White",
			"Millenial Pink",
			"Mint Green",
			"Mocha Brown",
			"Moroccan Blue",
			"Moss",
			"Multicolored",
			"Mustard",
			"Neon Pink",
			"Neon Yellow",
			"Neon", 
			"Nightshade Purple",
			"Oak Brown",
			"Obsidian Black",
			"Ochre Yellow",
			"Old Gold",
			"Olive Green",
			"Onyx Black",
			"Orchid Purple",
			"Oxblood",
			"Oxford Blue",
			"Pale Turquoise",
			"Papaya",
			"Pastel",
			"Paynes Grey",
			"Pearl White",
			"Pebble Grey",
			"Pecan Brown",
			"Peridot Green",
			"Pewter Grey",
			"Pillar Box Red",
			"Pine Green",
			"Pine",
			"Pineapple",
			"Pink",
			"Pistachio",
			"Pitch Black ",
			"Poppy Red",
			"Porcelain White",
			"Powder Blue",
			"Primrose Yellow",
			"Prismatic",
			"Psychedelic",
			"Puce",
			"Pumpkin",
			"Purple",
			"Raspberry",
			"Raven Black",
			"Red",
			"Royal Blue",
			"Royal Purple",
			"Ruby",
			"Russet Brown",
			"Rust",
			"Saffron Yellow",
			"Saffron",
			"Sage Green",
			"Salamander",
			"Sapphire",
			"Scarlet",
			"Schocking Pink",
			"Sea Glass Green",
			"Seafoam",
			"Sepia Brown",
			"Sherpa Blue",
			"Shiny",
			"Sienna",
			"Silver Grey",
			"Sky Blue",
			"Slate Grey",
			"Snow White",
			"Soft Cyan",
			"Soft Rose",
			"Soft White",
			"Soil Brown",
			"Steel Grey",
			"Straw",
			"Strawberry",
			"Sunshine Yellow",
			"Tan Brown",
			"Tangerine Orange",
			"Tawny Brown",
			"Teal",
			"Terracotta",
			"Tiffany Blue",
			"Toffee Brown",
			"Tomato",
			"Tourmaline Black",
			"Translucent",
			"Transparent",
			"True Red",
			"Turmeric Orange",
			"Turmeric",
			"Turquoise",
			"Umber Brown",
			"Violet",
			"Walnut Brown",
			"Warm White",
			"Watermelon",
			"White",
			"Wine",
			"Wisteria Purple",
			"Yellow",
			"Zinc Grey"		
		]
		globalColors = defaultColors;
	}
	
	function createMaterials() {
		defaultMaterials = [
			"Aertex",
			"Alençon lace",
			"Antique satin",
			"Argentan lace",
			"Argentella lace",
			"Bafta cloth",
			"Baize",
			"Ballistic nylon",
			"Barathea",
			"Barkcloth",
			"Batik",
			"Batiste",
			"Battenberg lace",
			"Bedford cord",
			"Bengaline silk",
			"Beta cloth",
			"Bobbinet",
			"Boiled wool",
			"Bombazine",
			"Bouclé",
			"Brass",
			"Brilliantine",
			"Broadcloth",
			"Brocade",
			"Broderie Anglaise",
			"Bronze",
			"Buckram",
			"Burano lace",
			"Buratto lace",
			"Burlap",
			"C change",
			"Calico",
			"Cambric",
			"Camels hair",
			"Camlet",
			"Canvas",
			"Capilene",
			"Carrickmacross lace",
			"Challis",
			"Chantilly lace",
			"Char cloth",
			"Charmeuse",
			"Charvet",
			"Cheesecloth",
			"Chenille",
			"Chiengora",
			"Chiffon",
			"Chino",
			"Chintz",
			"Cloqué",
			"Cloth of gold",
			"Coolmax",
			"Cordura",
			"Corduroy",
			"Cotton duck",
			"Cotton",
			"Crash fabric",
			"Crepe",
			"Cretonne",
			"Crochet",
			"Crêpe de Chine",
			"Damask",
			"Darlexx",
			"Denim",
			"Dimity",
			"Dobby",
			"Donegal tweed",
			"Dotted Swiss",
			"Double cloth",
			"Dowlas",
			"Drill",
			"Drugget",
			"Duck",
			"Dungarees",
			"Dupioni silk",
			"Dyneema",
			"Embroidered",
			"Eolienne",
			"Faux fur",
			"Faux leather",
			"Felt",
			"Filet Lacis lace",
			"Fishnet",
			"Flannel",
			"Flannelette",
			"Foulard",
			"Fustian",
			"Gabardine",
			"Gannex",
			"Gauze",
			"Gazar",
			"Georgette",
			"Ghalamkar",
			"Gingham",
			"Gold",
			"Gore-Tex",
			"Grenadine",
			"Grenfell Cloth",
			"Grosgrain",
			"Habutai",
			"Haircloth",
			"Halas lace",
			"Harris Tweed",
			"Herringbone",
			"Hessian",
			"Himro",
			"Hodden",
			"Holland cloth",
			"Hollie Point lace",
			"Houndstooth check",
			"Intarsia",
			"Interlock Jersey",
			"Jacquard knit",
			"Jamdani",
			"Jersey",
			"Lace",
			"Lampas",
			"Lamé",
			"Lanon",
			"Lantana",
			"Latex",
			"Lawn cloth",
			"Leather",
			"Leatherette",
			"Limerick lace",
			"Linen",
			"Linsey-woolsey",
			"Loden",
			"Longcloth",
			"Lycra",
			"Mackinaw",
			"Madapollam",
			"Madras",
			"Matelassé",
			"Melton",
			"Mesh",
			"Metal",
			"Micro",
			"Microfiber",
			"Microfibre",
			"Milliskin",
			"Mockado",
			"Moire",
			"Moleskin",
			"Monks cloth",
			"Moquette",
			"Mouflon",
			"Mousseline",
			"Muslin",
			"Nankeen",
			"Neoprene",
			"Net",
			"Oilskin",
			"Organdy",
			"Organza",
			"Osnaburg",
			"Ottoman",
			"Oxford",
			"PVC",
			"Paduasoy",
			"Panné velvet",
			"Paper",
			"Peau de Soie",
			"Percale",
			"Piqué",
			"Pleated linen",
			"Plissé",
			"Plush",
			"Point de France lace",
			"Point de Gaze lace",
			"Point de Venise lace",
			"Polar fleece",
			"Pongee",
			"Poplin",
			"Printed",
			"Punto in Aria lace",
			"Rakematiz",
			"Rayadillo",
			"Rayon",
			"Rep",
			"Reticella lace",
			"Rib knit",
			"Rinzu",
			"Ripstop",
			"Russell cord",
			"Saga Nishiki",
			"Sailcloth",
			"Samite",
			"Sateen",
			"Satin",
			"Saye",
			"Scarlet",
			"Scrim",
			"Seersucker",
			"Serge",
			"Shantung",
			"Sharkskin",
			"Sheer",
			"Shot silk",
			"Silk",
			"Silnylon",
			"Silver",
			"Songket",
			"Steel",
			"Stockinette",
			"Stuff",
			"Suede",
			"Surah",
			"Swanskin cloth",
			"SympaTex",
			"Taffeta",
			"Tais",
			"Tambour lace",
			"Tapestry",
			"Tartan",
			"Teneriffe lace",
			"Terry velour",
			"Terrycloth",
			"Tin Foil",
			"Toile",
			"Tricot",
			"Tulle netting",
			"Tweed",
			"Twill",
			"Ultrasuede",
			"Velour",
			"Velours du Kasaï",
			"Velvet",
			"Velveteen",
			"Venetian Lace",
			"Ventile",
			"Vinyl",
			"Viyella",
			"Voile",
			"Wadmal",
			"Whipcord",
			"Wigan",
			"Wood",
			"Wool",
			"Worsted wool",
			"Youghal lace",
			"Zephyr",
			"Zibeline",
			"Zorbeez"
		]
		globalMaterials = defaultMaterials;
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
			"Cigarette",
			"Groceries",
			"Briefcase",
			"Magical Staff",
			"Laptop",
			"Computer Mouse",
			"Bowling Ball",
			"Football",
			"Tennis Raquet",
			"ID Card",
			"Banana",
			"Drink",
			"iPad",
			"Mobile Phone",
			"Telephone",
			"HotDog",
			"Big Mac",
			"Boombox",
			"Cocktail",
			"Violin"
			]
		AccessoryItemColor = defaultColors;		
		AccessoryItemMaterial = defaultMaterials;
	}
		
	function addDressMeUpSettings() {
		console.log('Add DressMeUp Settings');
		var openCheck = '';
		//openCheck = ' active';
		var DressMeUpSettings = document.createElement('div');
		DressMeUpSettings.id = 'DressMeUp-settings';
		DressMeUpSettings.classList.add('panel-box');
		
		//<h4 class="collapsible `+openCheck+`">Dress Me Up Settings <i id="reset-dmu-settings" class="fa-solid fa-arrow-rotate-left section-button"><span class="simple-tooltip top-left">Reset to Default Wardrobe</span></i></h4>
		
		
		let tempHTML = `
			<h4 class="collapsible `+ openCheck +`">Dress Me Up Settings</h4>
			<div id="dmu-settings-entries" class="collapsible-content" style="display: block;margin-top:15px;">
				<button style="display:block;width:240px; height:30px;" onclick="document.getElementById('filepicker').click()">Import Wardrobe Directory</button>
				<p></p>
				<button style="display:block;width:240px; height:30px;" onclick="document.getElementById('selectFiles').click()">Import Single Wardrobe</button>
				<input type='file' id="selectFiles" style="display:none" onchange="document.getElementById('importWardrobe').click()">
				<input type="file" id="filepicker" name="fileList" style="display:none" webkitdirectory multiple />
				<button style="display:none" type="button" id="locateWardrobe">Locate Wardrobe Files</button>
				<button style="display:none" type="button" id="importWardrobe">Import Wardrobe</button>
				<p></p>
				<button style="display:block;width:240px; height:30px;" id="removeWardrobe">Remove Selected Wardrobe</button>
				<!--<button type="button" id="setDefaultWardrobe">Reset to Default Wardrobe</button>-->
				<p></p>
				<!--
				-->
				<label for="selectedWardobe">Select Wardrobe:</label>
				<select id="selectedWardobe" name="selectedWardobe onchange = "selectOption()">
				<option>All Wardrobes</option></select>
				<br><br>
				<label for="wardrobe_info">Wardrobe Description:</label>
				<textarea readonly class="txtBox" id="wardrobe_info" name="wardrobe_info" rows="2" cols="50">Contains all loaded items</textarea>
				<p></p>

				<table><tbody>
					<tr><td><b id="wardrobeHeader" class="settings-subheader">Options</b></td></tr>
					<tr><td>
					<hr>
					<p></P>
					<button type="button" id="lockHeadwear" <i class="fas fa-unlock-alt"></i></button>
					<label for="Headwear_input">Head wear:</label>
					<select id="Headwear_input" class="inputWidth" name="Headwear_input onchange = "selectOption()">
					<option>None</option></select>
					</td>
					<tr><td>
					<label for="Headwear_material">Material:</label>
					<select id="Headwear_material" class="materialWidth" name="Headwear_material onchange = "selectOption()">
					<option>None</option></select>
					<label for="Headwear_color">Color:</label>
					<select id="Headwear_color" class="colorWidth" name="Headwear_color onchange = "selectOption()">
					<option>None</option></select>
					<p></P>
					</td>
					</tr>
					
					<tr><td>
					
					<button type="button" id="lockUpper" <i class="fas fa-unlock-alt"></i></button>
					<label for="upperBody_input">Upper Body:</label>
					<select id="upperBody_input" class="inputWidth" name="upperBody_input onchange = "selectOption()">
					<option>None</option></select>
					</td>
					
					<tr><td>
					<label for="upperBody_material">Material:</label>
					<select id="upperBody_material" class="materialWidth" name="upperBody_material onchange = "selectOption()">
					<option>None</option></select>
					<label for="upperBody_color">Color:</label>
					<select id="upperBody_color" class="colorWidth" name="upperBody_color onchange = "selectOption()">
					<option>None</option></select>
					<p></P>
					</td>
					</tr>
					
					<tr><td>
					
					<button type="button" id="lockLower" <i class="fas fa-unlock-alt"></i></button>
					<label for="lowerBody_input">Lower Body:</label>
					<select id="lowerBody_input" class="inputWidth" name="lowerBody_input onchange = "selectOption()">
					<option>None</option></select>
					</td>
					
					<tr><td><label for="lowerBody_material">Material:</label>
					<select id="lowerBody_material" class="materialWidth" name="lowerBody_material onchange = "selectOption()">
					<option>None</option></select>
					<label for="lowerBody_color">Color:</label>
					<select id="lowerBody_color" class="colorWidth" name="lowerBody_color onchange = "selectOption()">
					<option>None</option></select>
					<p></P>
					</td>
					</tr>
					
					<tr><td>
					<button type="button" id="lockFootwear" <i class="fas fa-unlock-alt"></i></button>
					<label for="Footwear_input">Foot wear:</label>
					<select id="Footwear_input" class="inputWidth" name="Footwear_input onchange = "selectOption()">
					<option>None</option></select>
					</td>
					
					<tr><td><label for="Footwear_material">Material:</label>
					<select id="Footwear_material" class="materialWidth" name="Footwear_material onchange = "selectOption()">
					<option>None</option></select>
					<label for="Footwear_color">Color:</label>
					<select id="Footwear_color" class="colorWidth" name="Footwear_color onchange = "selectOption()">
					<option>None</option></select>
					<p></P>
					</td>
					</tr>
					
					<tr><td>
					<button type="button" id="lockAccessory" <i class="fas fa-unlock-alt"></i></button>
					<label for="Accessory_input">Accessory:</label>
					<select id="Accessory_input" class="inputWidth" name="Accessory_input onchange = "selectOption()">
					<option>None</option></select>
					</td>
					
					<tr><td><label for="Accessory_material">Material:</label>
					<select id="Accessory_material" class="materialWidth" name="Accessory_material onchange = "selectOption()">
					<option>None</option></select>
					<label for="Accessory_color">Color:</label>
					<select id="Accessory_color" class="colorWidth" name="Accessory_color onchange = "selectOption()">
					<option>None</option></select>
					<p></P>
					
					<hr>
					</td></tr>
					
					
		
				</tbody></table>
					
				<p></P>
				<label for="prePromptText">Pre Prompt:</label>
				<textarea title="Text before the main prompt (editable)" class="txtBox2" id="prePromptText" name="prePromptText" rows="2" cols="60"></textarea>
				<p></p>
				<label for="currPrompt">Main Prompt:</label>
				<textarea readonly class="txtBox2" id="currPrompt" name="currPrompt" rows="6" cols="60"></textarea>
				<p></P>
				<label for="postPromptText">Post Prompt:</label>
				<textarea title="Text after the main prompt (editable)" class="txtBox2" id="postPromptText" name="postPromptText" rows="2" cols="60"></textarea>
				<p></p>
				<button type="button" id="clearPrompt">Clear the current Prompt</button>
				<p></P>
				<button type="button" id="setRandomItems">Choose a Random Outfit</button>
				<p></P>
				<button type="button" id="setWardrobe">Add selected items to existing Prompt</button>
				<p></p>
				<button type="button" id="setPrompt">Replace Prompt with selected items</button>
				<p></p>
				<button title="Generate image(s)" type="button" id="batchRun">Generate Random Batch</button>
				<input title="Batch Quantity" type="number" id="batchCount" value="4" min="1">
				<p></p>
				</div>
				<div id="confirm">
					<p> Clear the current Prompt? </p>
					<div class = "close">
						<button id="confirmYes">Yes</button>
						<button id="confirmNo">No</button>
					</div>
				</div>
				<div id="confirmRemove">
					<p> Remove the current Wardrobe? </p>
					<div class = "removeItems">
						<button id="removeYes">Yes</button>
						<button id="removeNo">No</button>
					</div>
				</div>
				`;
				
		DressMeUpSettings.innerHTML = tempHTML;
		
		var editorSettings = document.getElementById('editor-settings');
		editorSettings.parentNode.insertBefore(DressMeUpSettings, editorSettings.nextSibling);
		createCollapsibles(DressMeUpSettings);
		
		WardrobeList.forEach((clothingItem) => {
			var x = document.getElementById("selectedWardobe"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})
		
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
		
		AccessoryItemColor.forEach((clothingItem) => {
			var x = document.getElementById("Accessory_color"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})
		
		AccessoryItemMaterial.forEach((clothingItem) => {
			var x = document.getElementById("Accessory_material"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})
		
		
		document.getElementById ("selectedWardobe").addEventListener ("click", selectWardrobe, false);
		document.getElementById ("setWardrobe").addEventListener ("click", setItems, false);
		document.getElementById ("setRandomItems").addEventListener ("click", setRandomItems, false);
		document.getElementById ("importWardrobe").addEventListener ("click", getWardrobe, false);
		document.getElementById ("lockHeadwear").addEventListener ("click", lockHeadwear, false);
		document.getElementById ("lockUpper").addEventListener ("click", lockUpper, false);
		document.getElementById ("lockLower").addEventListener ("click", lockLower, false);
		document.getElementById ("lockFootwear").addEventListener ("click", lockFootwear, false);
		document.getElementById ("lockAccessory").addEventListener ("click", lockAccessory, false);
		document.getElementById ("clearPrompt").addEventListener ("click", clearPrompt, false);
		document.getElementById ("setPrompt").addEventListener ("click", setPrompt, false);
		document.getElementById ("batchRun").addEventListener ("click", runBatch, false);
		document.getElementById ("confirmYes").addEventListener ("click", closeConfirmYes, false);
		document.getElementById ("confirmNo").addEventListener ("click", closeConfirmNo, false);
		document.getElementById ("removeWardrobe").addEventListener ("click", removeWardrobe, false);
		document.getElementById ("removeYes").addEventListener ("click", removeConfirmYes, false);
		document.getElementById ("removeNo").addEventListener ("click", removeConfirmNo, false);

		document.getElementById ("selectFiles").addEventListener ("onchange", getWardrobe,false);
		
		document.getElementById ("wardrobeHeader").innerHTML = wardrobeName;
		document.getElementById("batchCount").defaultValue = defaultBatchCount;
		
		document.getElementById("filepicker").addEventListener("change",(event) => {
			getDirectoryContents();
			},
			false,
		);

	}
	
	function getDirectoryContents() {
		var jsonFlag = false;
		for (const file of event.target.files) {
			var fr = new FileReader();
			fr.onload = function(e) {
				var isJson =  file.webkitRelativePath.endsWith(".json");
				switch (isJson) {
					case true:
						try {
							var result = JSON.parse(e.target.result);
							jsonFlag = true;
						}
						catch(err) {
							jsonFlag = false;
						}
						break;
					default:
					jsonFlag = false;
				}
					
				switch (jsonFlag) {
					case true:
						var formatted = JSON.stringify(result, null, 2);
						processWardrobe(formatted);
						jsonFlag = false;
						break;
					default:
						console.log('Ignoring ' + file.webkitRelativePath);
						break;
				}
			}
			fr.readAsText(file);
			
		}
	}
	
	function showConfirm() {
		confirmDiv.style.display = "block";
	}
	
	function closeConfirmNo() {
		confirmDiv.style.display = "none";
	}
	function closeConfirmYes() {
		confirmDiv.style.display = "none";
		promptField.value = null;
		document.getElementById ("currPrompt").value =null;
	}
	
	function showRemove() {
		removeDiv.style.display = "block";
	}
	
	function removeConfirmNo() {
		removeWardrobeOption = false;
		removeDiv.style.display = "none";
	}
	function removeConfirmYes() {
		removeWardrobeOption = true;
		removeDiv.style.display = "none";
		removeSelectedWardrobe();
	}
	
	
	function clearPrompt() {
		confirmDiv = document.getElementById("confirm");
		confirmDiv.style.display = "block";
		showConfirm();
	}
	
	
	function populatePrompt() {
		var CurrentPrompt = promptField.value;
		document.getElementById ("currPrompt").value = CurrentPrompt;
	}
	
	function setPrompt() {
		promptReplace=true;
		setItems();
		promptReplace=false;
		
	}
	
	function removeWardrobe() {
		removeWardrobeOption = false;
		currWardrobe = document.getElementById ("selectedWardobe").value;
		switch (currWardrobe) {
			case "Default Wardrobe":
				alert('You cannot remove the ' + currWardrobe);
				return;
				break;
			case "All Wardrobes" :
				alert('You cannot remove ' + currWardrobe);
				return;
				break;
			default:
				break;
		}
		removeDiv = document.getElementById("confirmRemove");
		showRemove();
		document.getElementById("confirmRemove").firstElementChild.innerHTML = 'Remove ' + currWardrobe + ' Wardrobe?';
	}
	
	function removeSelectedWardrobe() {
		currWardrobe = document.getElementById ("selectedWardobe").value;
		var oldWardrobe = currWardrobe;
		//console.log('Removing ' + currWardrobe + ' wardrobe');
		dummyWardrobe = [];
		for (let i = 0; i < globalWardrobe.length; i++) {
			switch (globalWardrobe[i]) {
				case currWardrobe:
					break;
				default:
					dummyWardrobe.push(globalWardrobe[i]);
					dummyWardrobe.push(globalWardrobe[i+1]);
					dummyWardrobe.push(globalWardrobe[i+2]);
					dummyWardrobe.push(globalWardrobe[i+3]);
					break;
			}
			i++; // creatorID
			i++; // Item type
			i++; // Item Name
			if (i > globalWardrobe.length) { break; }
		}
		globalWardrobe = [];
		for (let i = 0; i < dummyWardrobe.length; i++) {
			globalWardrobe.push(dummyWardrobe[i]);
		}	
		var x = document.getElementById("selectedWardobe");
		x.remove(x.selectedIndex);
		dummyWardrobe = [];
		for (let i = 0; i < WardrobeList.length; i++) {
			switch (WardrobeList[i]) {
				case currWardrobe:
					break;
				default:
					dummyWardrobe.push(WardrobeList[i]);
					break;
			}
		}
		WardrobeList =[];
		for (let i = 0; i < dummyWardrobe.length; i++) {
			WardrobeList.push(dummyWardrobe[i]);
		}	
		
		document.getElementById ("selectedWardobe").value='Default Wardrobe';
		console.log('Removed ' + oldWardrobe);
		//console.log(WardrobeList);
		selectWardrobe();
	}
		
	
	
	
	function createWardrobeList() {
		//WardrobeList.push("All Wardobes");
		WardrobeDescr.push = ["All Loaded Wardrobes"];
		WardrobeList.push(wardrobeName);
		WardrobeDescr.push = [wardrobeName + ' created by ' + designerName];
		//console.log('>>> Description <<< ' + WardrobeDescr[0]);
	}
	
	function selectWardrobe() {
		switch (selectedWardobe.value) {
			case currWardrobe:
				//console.log('Existing Wardrobe selected');
				return;
				break;
			case "All Wardrobes" :
				//console.log('All Wardrobes selected');
				break;
			case "Default Wardrobe":
				//console.log('Default Wardrobe selected');
				break;
			default:
				//console.log('A User defined Wardrobe selected');
				//console.log(globalWardrobe);
				break;
		}
		currWardrobe = document.getElementById ("selectedWardobe").value;
		dummyWardrobe = [];
		writeFlag = false;
		for (let i = 0; i < globalWardrobe.length; i++) {
			switch (currWardrobe) {
				case "All Wardrobes" :
					writeFlag = true;
					//console.log('I should write all items');
					break;
				case "Default Wardrobe" :
					//console.log('Its the default');
					writeFlag = true;
					break;
				case globalWardrobe[i] :
					//console.log('Wardrobe: ' + currWardrobe);
					writeFlag = true;
					break;
			}	
			switch (writeFlag) {
				case false:
					break;
				case true:
					dummyWardrobe.push(globalWardrobe[i]);
					dummyWardrobe.push(globalWardrobe[i+1]);
					dummyWardrobe.push(globalWardrobe[i+2]);
					dummyWardrobe.push(globalWardrobe[i+3]);
					break;
			}
			i++; // creatorID
			i++; // Item type
			i++; // Item Name
			if (i > globalWardrobe.length) { break; }
		}
		//console.log(dummyWardrobe);
		switch (writeFlag) {
			case false:
				//console.log('Write Flag is false');
				break;
			case true:
				//console.log('Write Flag is true');
				createNewUpper();
				createNewLower();
				createNewHeadwear();
				createNewFootwear();
				createNewAccessories();
				itemCount = 0;
				switch (currWardrobe) {
					case "All Wardrobes" :
						for (let i = 0; i < dummyWardrobe.length; i++) {
							switch (dummyWardrobe[i+2]) {
								case 'UpperItem' :
									UpperItem.push(dummyWardrobe[i+3]);
									break;
								case 'LowerItem' :
									LowerItem.push(dummyWardrobe[i+3]);
									break;
								case 'HeadwearItem' :
									HeadwearItem.push(dummyWardrobe[i+3]);
									break;
								case 'FootwearItem' :
									FootwearItem.push(dummyWardrobe[i+3]);
									break;
								case 'AccessoryItem' :
									AccessoryItem.push(dummyWardrobe[i+3]);
									break;
							}
						i++;
						i++;
						i++;
						if (i > dummyWardrobe.length) { break; }
						}
						switch (UpperItem.length) {
							case 0:
								break;
							default:
								UpperItem.sort();
								UpperItem.forEach((clothingItem) => {
								var x = document.getElementById("upperBody_input"); 
								var option = document.createElement("option");
								option.text = clothingItem;
								x.add(option);
								itemCount ++;
								})
								break;
						}
						
						switch (LowerItem.length) {
							case 0:
								break;
							default:
								LowerItem.sort();
								LowerItem.forEach((clothingItem) => {
								var x = document.getElementById("lowerBody_input"); 
								var option = document.createElement("option");
								option.text = clothingItem;
								x.add(option);
								itemCount ++;
								})
								break;
						}
						
						switch (HeadwearItem.length) {
							case 0:
								break;
							default:
								HeadwearItem.sort();
								HeadwearItem.forEach((clothingItem) => {
								var x = document.getElementById("Headwear_input"); 
								var option = document.createElement("option");
								option.text = clothingItem;
								x.add(option);
								itemCount ++;
								})
								break;
						}
						
						switch (FootwearItem.length) {
							case 0:
								break;
							default:
								FootwearItem.sort();
								FootwearItem.forEach((clothingItem) => {
								var x = document.getElementById("Footwear_input"); 
								var option = document.createElement("option");
								option.text = clothingItem;
								x.add(option);
								itemCount ++;
								})
								break;
						}
						
						switch (AccessoryItem.length) {
							case 0:
								break;
							default:
								AccessoryItem.sort();
								AccessoryItem.forEach((clothingItem) => {
								var x = document.getElementById("Accessory_input"); 
								var option = document.createElement("option");
								option.text = clothingItem;
								x.add(option);
								itemCount ++;
								})
								break;
						}
						
						
						//console.log('Creating Global Mats');
						createNewMaterials();
						createNewColors();
						getGlobalMaterials();
						getGlobalColors();
							
						document.getElementById ("wardrobe_info").value = 'All Available Wardrobes';
						document.getElementById ("wardrobeHeader").innerHTML = 'Wardrobe: All Available Wardrobes<br>Number of items: ' + itemCount;
						console.log('Selected: ' + currWardrobe);
						return;
						break;
					default:
						
						break;
				}
				console.log('Selected: ' + currWardrobe);
				createNewMaterials();
				createNewColors();
				switch (currWardrobe) {
					case ("Default Wardrobe"):
						//console.log('Creating Default Mats');
						getDefaultMaterials();
						getDefaultColors();
						break;
					default:
						//console.log('Creating Imported Wardrobe Mats');
						getGlobalMaterials();
						getGlobalColors();
						break;
				}
					
				
				itemCount = 0;

				for (let i = 0; i < dummyWardrobe.length; i++) {
					//console.log('Ward: ' + dummyWardrobe[i]);
					switch (dummyWardrobe[i]) {
						case currWardrobe:
							//document.getElementById ("wardrobe_info").value = dummyWardrobe[i]+ ' created by ' + dummyWardrobe[i+1];
							//document.getElementById ("wardrobeHeader").innerHTML = 'Wardrobe: ' + dummyWardrobe[i];
							switch (dummyWardrobe[i+2]) {
								case 'UpperItem' :
									var x = document.getElementById("upperBody_input"); 
									var option = document.createElement("option");
									option.text = dummyWardrobe[i+3];
									x.add(option);
									UpperItem.push(dummyWardrobe[i+3]);
									itemCount ++;
									//console.log('Added Upper Item');
									break;
								case 'LowerItem' :
									var x = document.getElementById("lowerBody_input"); 
									var option = document.createElement("option");
									option.text = dummyWardrobe[i+3];
									x.add(option);
									LowerItem.push(dummyWardrobe[i+3]);
									itemCount ++;
									//console.log('Added Lower Item');
									break;
								case 'HeadwearItem' :
									var x = document.getElementById("Headwear_input"); 
									var option = document.createElement("option");
									option.text = dummyWardrobe[i+3];
									x.add(option);
									HeadwearItem.push(dummyWardrobe[i+3]);
									itemCount ++;
									//console.log('Added Headwear');
									break;
								case 'FootwearItem' :
									var x = document.getElementById("Footwear_input"); 
									var option = document.createElement("option");
									option.text = dummyWardrobe[i+3];
									x.add(option);
									FootwearItem.push(dummyWardrobe[i+3]);
									itemCount ++;
									//console.log('Added Footwear');
									break;
								case 'AccessoryItem' :
									var x = document.getElementById("Accessory_input"); 
									var option = document.createElement("option");
									option.text = dummyWardrobe[i+3];
									x.add(option);
									AccessoryItem.push(dummyWardrobe[i+3]);
									itemCount ++;
									//console.log('Added Accessory');
									break;
							}
							document.getElementById ("wardrobe_info").value = dummyWardrobe[i]+ ' created by ' + dummyWardrobe[i+1];
							document.getElementById ("wardrobeHeader").innerHTML = 'Wardrobe: ' + dummyWardrobe[i] + '<br>Number of items: ' + itemCount;
							break;
					}
					i++;
					i++;
					i++;
					if (i > dummyWardrobe.length) { break; }
					
				}
		}	
	}
	
	function createGlobalWardrobe() {
		itemCount = 0;
		
		UpperItem.forEach((clothingItem) => {
			globalWardrobe.push(wardrobeName,designerName,'UpperItem',clothingItem);
			itemCount++;
		})
		LowerItem.forEach((clothingItem) => {
			globalWardrobe.push(wardrobeName,designerName,'LowerItem',clothingItem);
			itemCount++;
		})
		HeadwearItem.forEach((clothingItem) => {
			globalWardrobe.push(wardrobeName,designerName,'HeadwearItem',clothingItem);
			itemCount++;
		})
		FootwearItem.forEach((clothingItem) => {
			globalWardrobe.push(wardrobeName,designerName,'FootwearItem',clothingItem);
			itemCount++;
		})
		AccessoryItem.forEach((clothingItem) => {
			globalWardrobe.push(wardrobeName,designerName,'AccessoryItem',clothingItem);
			itemCount++;
		})
		currWardrobe = wardrobeName;
		document.getElementById ("selectedWardobe").value = currWardrobe;
		document.getElementById ("wardrobe_info").value = wardrobeName + ' created by ' + designerName;
		document.getElementById ("wardrobeHeader").innerHTML = 'Wardrobe: ' + wardrobeName + '<br>Number of items: ' + itemCount;
		//console.log('Dropdown: ' + selectedWardobe.value );
		//console.log(globalWardrobe);

    }
	
	
	function setItems() {
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
						additionalPrompt = additionalPrompt + ' ' + upperItemofClothingColor + ' colored';
						break;
				}
				additionalPrompt = additionalPrompt + ' ' + upperItemofClothing;
				switch (upperItemofClothingMaterial) {
					case 'None':
						break;
					default:
						additionalPrompt = additionalPrompt + ' made of ' + upperItemofClothingMaterial + '';
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
						additionalPrompt = additionalPrompt + ' ' + lowerItemofClothingColor + ' colored';
						break;
				}
				additionalPrompt = additionalPrompt + ' ' + lowerItemofClothing;
				switch (lowerItemofClothingMaterial) {
					case 'None':
						break;
					default:
						additionalPrompt = additionalPrompt + ' made of ' + lowerItemofClothingMaterial + '';
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
							additionalPrompt = additionalPrompt + ' ' + footwearClothingColor + ' colored';
							break;
				}
				additionalPrompt = additionalPrompt + ' ' + footwearClothing;
				switch (footwearClothingMaterial) {
					case 'None':
						break;
					default:
						additionalPrompt = additionalPrompt + ' made of ' + footwearClothingMaterial + '';
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
							additionalPrompt = additionalPrompt + ' ' + headwearClothingColor + ' colored';
							break;
				}
				additionalPrompt = additionalPrompt + ' ' + headwearClothing;
				switch (headwearClothingMaterial) {
					case 'None':
						break;
					default:
						additionalPrompt = additionalPrompt + ' made of ' + headwearClothingMaterial + '';
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
								additionalPrompt = additionalPrompt + ' ' + AccessoryClothingColor + ' colored';
								break;
						}
						additionalPrompt = additionalPrompt + ' ' + AccessoryClothing;
						switch (AccessoryClothingMaterial) {
							case 'None':
								break;
							default:
								additionalPrompt = additionalPrompt + ' (made of ' + AccessoryClothingMaterial + ')';
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
								additionalPrompt = additionalPrompt + ' ' + AccessoryClothingColor + ' colored';
								break;
						}
						additionalPrompt = additionalPrompt + ' ' + AccessoryClothing;
						switch (AccessoryClothingMaterial) {
							case 'None':
								break;
							default:
								additionalPrompt = additionalPrompt + ' made of ' + AccessoryClothingMaterial + '';
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
				prePromptField = document.getElementById ("prePromptText").value;
				postPromptField = document.getElementById ("postPromptText").value;
				
				switch (promptReplace) {
					case false:
						promptField.value = prePromptField + promptField.value + additionalPrompt + postPromptField;
						break;
					case true:
						promptField.value = prePromptField + additionalPrompt + postPromptField;;
						break;
				}
				document.getElementById ("currPrompt").value = promptField.value;
				break;
		}
		
	}
	
	function resetWardrobe(){
		console.log('Resetting Wardrobe');
		wardrobeName = "Default Wardrobe";
		designerName = "The Stig";
	
		defaultColors = [];
		defaultMaterials = [];
	
		UpperItem = [];
		UpperItemColor = [];
		UpperItemMaterial = [];
		statusUpper = false;
	
		LowerItem = [];
		LowerItemColor = [];
		LowerItemMaterial = [];
		statusLower = false;

		FootwearItem = [];
		FootwearItemColor = [];
		FootwearItemMaterial = [];
		statusFootwear = false;
	
		HeadwearItem = [];
		HeadwearItemColor = [];
		HeadwearItemMaterial = [];
		statusHeadwear = false;
	
		AccessoryItem = [];
		AccessoryItemColor = [];
		AccessoryItemMaterial = [];
		statusAccessory = false;

		createColors();
		createMaterials();
		createNewUpper();
		createNewLower();
		createNewHeadwear();
		createNewFootwear();
		createNewAccessories();
		
		createUpperItems();
		createLowerItems();
		createFootwearItems();
		createHeadwearItems();
		createAccessoryItems();
		
		resetLocks();
		itemCount = 0;
		
		document.getElementById ("wardrobeHeader").innerHTML = 'Wardrobe: ' + wardrobeName + '<br>Number of items: ' + itemCount;
	
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
		
		AccessoryItemColor.forEach((clothingItem) => {
			var x = document.getElementById("Accessory_color"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})
		
		AccessoryItemMaterial.forEach((clothingItem) => {
			var x = document.getElementById("Accessory_material"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})
		
	
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
		
		var lenAccessoryItem = AccessoryItem.length;
		var lenAccessoryItemColor = AccessoryItemColor.length;
		var lenAccessoryItemMaterial = AccessoryItemMaterial.length;
		
		
		
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
		
		var randomAccessoryItem = Math.floor(Math.random() * lenAccessoryItem);
		var randomAccessoryItemColor = Math.floor(Math.random() * lenAccessoryItemColor);
		var randomAccessoryItemMaterial = Math.floor(Math.random() * lenAccessoryItemMaterial);
		
		switch (statusUpper) {
			case true:
				break;
			case false:
				switch (UpperItem[randomUpperItem]) {
					case undefined:
						document.getElementById ("upperBody_input").value = 'None';
						document.getElementById ("upperBody_color").value =  'None';
						document.getElementById ("upperBody_material").value =  'None';
						break;
					default:
						document.getElementById ("upperBody_input").value = UpperItem[randomUpperItem];
						document.getElementById ("upperBody_color").value = UpperItemColor[randomUpperItemColor];
				document.getElementById ("upperBody_material").value = UpperItemMaterial[randomUpperItemMaterial];
						break;
				}
				break;
		}
		
		switch (statusLower) {
			case true:
				break;
			case false:
			switch (LowerItem[randomLowerItem]) {
					case undefined:
						document.getElementById ("lowerBody_input").value = 'None';
						document.getElementById ("lowerBody_color").value = 'None';
						document.getElementById ("lowerBody_material").value = 'None';
						break;
					default:
						document.getElementById ("lowerBody_input").value = LowerItem[randomLowerItem];
						document.getElementById ("lowerBody_color").value = LowerItemColor[randomLowerItemColor];
						document.getElementById ("lowerBody_material").value = LowerItemMaterial[randomLowerItemMaterial];
						break;
				}
				break;
		}
		switch (statusFootwear) {
			case true:
				break;
			case false:
			switch (FootwearItem[randomFootwearItem]) {
					case undefined:
						document.getElementById ("Footwear_input").value = 'None';
						document.getElementById ("Footwear_color").value = 'None';
						document.getElementById ("Footwear_material").value = 'None';
						break;
					default:
						document.getElementById ("Footwear_input").value = FootwearItem[randomFootwearItem];
						document.getElementById ("Footwear_color").value = FootwearItemColor[randomFootwearItemColor];
						document.getElementById ("Footwear_material").value = FootwearItemMaterial[randomFootwearItemMaterial];
						break;
				}
				break;
		}
		switch (statusHeadwear) {
			case true:
				break;
			case false:
			switch (HeadwearItem[randomHeadwearItem]) {
					case undefined:
						document.getElementById ("Headwear_input").value = 'None';
						document.getElementById ("Headwear_color").value = 'None';
						document.getElementById ("Headwear_material").value = 'None';
						break;
					default:
						document.getElementById ("Headwear_input").value = HeadwearItem[randomHeadwearItem];
						document.getElementById ("Headwear_color").value = HeadwearItemColor[randomHeadwearItemColor];
						document.getElementById ("Headwear_material").value = HeadwearItemMaterial[randomHeadwearItemMaterial];
						break;
				}
				break;
		}
		switch (statusAccessory) {
			case true:
				break;
			case false:
			switch (AccessoryItem[randomAccessoryItem]) {
					case undefined:
						document.getElementById ("Accessory_input").value = 'None';
						document.getElementById ("Accessory_color").value = 'None';
						document.getElementById ("Accessory_material").value = 'None';
						break;
					default:
						document.getElementById ("Accessory_input").value = AccessoryItem[randomAccessoryItem];
						document.getElementById ("Accessory_color").value = AccessoryItemColor[randomAccessoryItemColor];
						document.getElementById ("Accessory_material").value = AccessoryItemMaterial[randomAccessoryItemMaterial];
						break;
				}
				//console.log('Acc: ' + AccessoryItem[randomAccessoryItem]);
				break;
		}
		
	}
	
	function getWardrobe() {
		//console.log('Getting Wardrobe');
		importWardrobe();
		document.getElementById ("wardrobeHeader").innerHTML = 'Wardrobe: ' + wardrobeName + '<br>Number of items: ' + itemCount;
	}
	

	function processWardrobe(formatted) {
		//console.log(formatted);
		switch (formatted.includes("wardrobeID")) {
			case false:
				//console.log('Not a valid Wardrobe file');
				return;
				break;
			case true:
				//console.log('A valid Wardrobe file');
				break;
		}
		var tempArray = JSON.parse(formatted);
		//console.log(tempArray);
		wardrobeName = tempArray.wardrobeID;
		designerName = tempArray.creatorID;
		switch (WardrobeList.includes(wardrobeName)) {
			case true:
				console.log('Already Imported ' + wardrobeName);
				return;
				break;
			default:
				console.log('Importing ' + wardrobeName);
				break;
		}
		
		//console.log('Wardrobe: ' + wardrobeName);
		console.log('Designer: ' + designerName);
		WardrobeList.push(tempArray.wardrobeID);
		var x = document.getElementById("selectedWardobe");
		var option = document.createElement("option");
		option.text = tempArray.wardrobeID;
		x.add(option);
		
		switch (formatted.includes("UpperBodyItems")) {
			case true:
				tempArray.UpperBodyItems.forEach((clothingItem) => {
					switch (globalWardrobe[3].includes(clothingItem)) {
						case true:
							console.log('Item already exists: ' + clothingItem);
							break;
						case false:
							globalWardrobe.push(wardrobeName,designerName,'UpperItem',clothingItem);
							UpperItem.push(clothingItem);
							var x = document.getElementById("upperBody_input");
							var option = document.createElement("option");
							option.text = clothingItem;
							x.add(option);
							break;
					}
				})
			case false:
				break;
		}
		switch (formatted.includes("LowerBodyItems")) {
			case true:
				tempArray.LowerBodyItems.forEach((clothingItem) => {
					switch (globalWardrobe[3].includes(clothingItem)) {
						case true:
							console.log('Item already exists: ' + clothingItem);
							break;
						case false:
							globalWardrobe.push(wardrobeName,designerName,'LowerItem',clothingItem);
							LowerItem.push(clothingItem);
							var x = document.getElementById("lowerBody_input");
							var option = document.createElement("option");
							option.text = clothingItem;
							x.add(option);
							break;
					}
				})
			case false:
				break;
		}
		switch (formatted.includes("HeadwearItems")) {
			case true:
				tempArray.HeadwearItems.forEach((clothingItem) => {
					switch (globalWardrobe[3].includes(clothingItem)) {
						case true:
							console.log('Item already exists: ' + clothingItem);
							break;
						case false:
							globalWardrobe.push(wardrobeName,designerName,'HeadwearItem',clothingItem);
							HeadwearItem.push(clothingItem);
							var x = document.getElementById("Headwear_input");
							var option = document.createElement("option");
							option.text = clothingItem;
							x.add(option);
							break;
					}
				})
			case false:
				break;
		}
		switch (formatted.includes("FootwearItems")) {
			case true:
				tempArray.FootwearItems.forEach((clothingItem) => {
					switch (globalWardrobe[3].includes(clothingItem)) {
						case true:
							console.log('Item already exists: ' + clothingItem);
							break;
						case false:
							globalWardrobe.push(wardrobeName,designerName,'FootwearItem',clothingItem);
							HeadwearItem.push(clothingItem);
							var x = document.getElementById("Footwear_input");
							var option = document.createElement("option");
							option.text = clothingItem;
							x.add(option);
							break;
					}
				})
			case false:
				break;
		}
		switch (formatted.includes("AccessoryItems")) {
			case true:
				tempArray.AccessoryItems.forEach((clothingItem) => {
					switch (globalWardrobe[3].includes(clothingItem)) {
						case true:
							console.log('Item already exists: ' + clothingItem);
							break;
						case false:
							globalWardrobe.push(wardrobeName,designerName,'AccessoryItem',clothingItem);
							AccessoryItem.push(clothingItem);
							var x = document.getElementById("Accessory_input");
							var option = document.createElement("option");
							option.text = clothingItem;
							x.add(option);
							break;
					}
				})
			case false:
				break;
		}
		switch (formatted.includes("MaterialItems")) {
				case true:
					tempArray.MaterialItems.forEach((clothingItem) => {
						switch (globalMaterials.includes(clothingItem)) {
							case true:
								console.log('Item already exists: ' + clothingItem);
								break;
							case false:
								globalMaterials.push(clothingItem);
								break;
						}
						var x = document.getElementById("upperBody_material");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
						var x = document.getElementById("lowerBody_material");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
						var x = document.getElementById("Headwear_material");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
						var x = document.getElementById("Footwear_material");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
						var x = document.getElementById("Accessory_material");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
					})
					break;
				case false:
					break;
			}
		
		switch (formatted.includes("ColorItems")) {
				case true:
					tempArray.ColorItems.forEach((clothingItem) => {
						switch (globalColors.includes(clothingItem)) {
							case true:
								break;
							case false:
								globalColors.push(clothingItem);
								break;
						}
						var x = document.getElementById("upperBody_color");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
						var x = document.getElementById("lowerBody_color");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
						var x = document.getElementById("Headwear_color");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
						var x = document.getElementById("Footwear_color");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
						var x = document.getElementById("Accessory_color");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);

					})
					break;
				case false:
					break;
			}
		
			
		
	}
	
	
	
	
	
	function importWardrobe() {
		wardrobeFlag = false;
		var files = document.getElementById('selectFiles').files;
		if (files.length <= 0) {
			return false;
		}
		itemCount = 0;
		skipCount = 0;
		itemExists = false;
		var fr = new FileReader();
  
		fr.onload = function(e) { 
			var result = JSON.parse(e.target.result);
			var formatted = JSON.stringify(result, null, 2);
			document.getElementById ("wardrobeHeader").innerHTML = 'Wardrobe: ' + result.wardrobeID + '<br>Number of items: ' + itemCount;
			wardrobeName = result.wardrobeID;
			designerName = result.creatorID;
			console.log('Importing ' + wardrobeName);
			switch (WardrobeList.includes(result.wardrobeID)) {
				case true:
					document.getElementById ("wardrobe_info").value = result.wardrobeID + ' created by ' + result.creatorID;
					document.getElementById("selectedWardobe").value = result.wardrobeID;
					alertMessage = "Please Note that a Wardrobe with this name has already been imported and may duplicate items";
					alert(alertMessage);
					break;
				case false:
					WardrobeList.push(result.wardrobeID);
					var x = document.getElementById("selectedWardobe");
					var option = document.createElement("option");
					option.text = result.wardrobeID;
					x.add(option);
					WardrobeDescr.push = [result.wardrobeID + ' created by ' + result.creatorID];
					document.getElementById ("wardrobe_info").value = result.wardrobeID + ' created by ' + result.creatorID;
					document.getElementById("selectedWardobe").value = result.wardrobeID;
					document.getElementById ("wardrobeHeader").innerHTML = 'Wardrobe: ' + wardrobeName + '<br>Number of items: ' + itemCount;
					break;
			}

			switch (formatted.includes("UpperBodyItems")) {
				case true:
					createNewUpper();
					resetLocks();
					result.UpperBodyItems.forEach((clothingItem) => {
						switch (globalWardrobe[3].includes(clothingItem)) {
							case true:
								skipCount ++;
								//console.log('Skipping ' + clothingItem + ' in ImportUpper');
								break;
							case false:
								globalWardrobe.push(wardrobeName,designerName,'UpperItem',clothingItem);
							break;
						}
						UpperItem.push(clothingItem);
						var x = document.getElementById("upperBody_input");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
						itemCount++;
						document.getElementById ("wardrobeHeader").innerHTML = 'Wardrobe: ' + wardrobeName + '<br>Number of items: ' + itemCount + '<br>Duplicates ignored: ' +skipCount;
					})
					break;
				case false:
					break;
			}
			
			switch (formatted.includes("LowerBodyItems")) {
				case true:
					createNewLower();
					resetLocks();
					result.LowerBodyItems.forEach((clothingItem) => {
						switch (globalWardrobe[3].includes(clothingItem)) {
							case true:
								skipCount ++;
								//console.log('Skipping ' + clothingItem + ' in ImportLower');
								break;
							case false:
								globalWardrobe.push(wardrobeName,designerName,'LowerItem',clothingItem);
								break;
						}
						LowerItem.push(clothingItem);
						var x = document.getElementById("lowerBody_input");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
						itemCount++;
						document.getElementById ("wardrobeHeader").innerHTML = 'Wardrobe: ' + wardrobeName + '<br>Number of items: ' + itemCount + '<br>Duplicates ignored: ' +skipCount;
					})
					break;
				case false:
					break;
			}
			
			switch (formatted.includes("HeadwearItems")) {
				case true:
					createNewHeadwear();
					resetLocks();
					result.HeadwearItems.forEach((clothingItem) => {
						switch (globalWardrobe[3].includes(clothingItem)) {
							case true:
								skipCount ++;
								//console.log('Skipping ' + clothingItem + ' in ImportHead');
								break;
							case false:
								globalWardrobe.push(wardrobeName,designerName,'HeadwearItem',clothingItem);
								break;
						}
						LowerItem.push(clothingItem);
						var x = document.getElementById("Headwear_input");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
						itemCount++;
						document.getElementById ("wardrobeHeader").innerHTML = 'Wardrobe: ' + wardrobeName + '<br>Number of items: ' + itemCount + '<br>Duplicates ignored: ' +skipCount;
					})
					break;
				case false:
					break;
			}
			
			switch (formatted.includes("FootwearItems")) {
				case true:
					createNewFootwear();
					resetLocks();
					result.FootwearItems.forEach((clothingItem) => {
						switch (globalWardrobe[3].includes(clothingItem)) {
							case true:
								skipCount ++;
								//console.log('Skipping ' + clothingItem + ' in ImportFoot');
								break;
							case false:
								globalWardrobe.push(wardrobeName,designerName,'FootwearItem',clothingItem);
								break;
						}
						FootwearItem.push(clothingItem);
						var x = document.getElementById("Footwear_input");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
						itemCount++;
						document.getElementById ("wardrobeHeader").innerHTML = 'Wardrobe: ' + wardrobeName + '<br>Number of items: ' + itemCount + '<br>Duplicates ignored: ' +skipCount;
					})
					break;
				case false:
					break;
			}
			
			switch (formatted.includes("AccessoryItems")) {
				case true:
					createNewAccessories();
					resetLocks();
					result.AccessoryItems.forEach((clothingItem) => {
						switch (globalWardrobe[3].includes(clothingItem)) {
							case true:
								skipCount ++;
								//console.log('Skipping ' + clothingItem + ' in ImportAccs');
								break;
							case false:
								globalWardrobe.push(wardrobeName,designerName,'AccessoryItem',clothingItem);
								break;
						}
						AccessoryItem.push(clothingItem);
						var x = document.getElementById("Accessory_input");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
						itemCount++;
						document.getElementById ("wardrobeHeader").innerHTML = 'Wardrobe: ' + wardrobeName + '<br>Number of items: ' + itemCount + '<br>Duplicates ignored: ' +skipCount;
					})
					break;
				case false:
					break;
			}
			
			switch (formatted.includes("MaterialItems")) {
				case true:
					createNewMaterials();
					resetLocks();
					result.MaterialItems.forEach((clothingItem) => {
						switch (globalMaterials.includes(clothingItem)) {
							case true:
								skipCount ++;
								//console.log('Skipping ' + clothingItem + ' in ImportMats');
								break;
							case false:
								//console.log('Pushed ' + clothingItem);
								globalMaterials.push(clothingItem);
								//console.log('Added material');
								break;
						}
						var x = document.getElementById("upperBody_material");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
						var x = document.getElementById("lowerBody_material");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
						var x = document.getElementById("Headwear_material");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
						var x = document.getElementById("Footwear_material");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
						var x = document.getElementById("Accessory_material");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
						itemCount++;
						document.getElementById ("wardrobeHeader").innerHTML = 'Wardrobe: ' + wardrobeName + '<br>Number of items: ' + itemCount + '<br>Duplicates ignored: ' +skipCount;

					})
					break;
				case false:
					break;
			}
			
			switch (formatted.includes("ColorItems")) {
				case true:
					//console.log('Importing colors');
					createNewColors();
					resetLocks();
					result.ColorItems.forEach((clothingItem) => {
						switch (globalColors.includes(clothingItem)) {
							case true:
								skipCount ++;
								//console.log('Skipping ' + clothingItem + ' in ImportCols');
								break;
							case false:
								//console.log('Pushed ' + clothingItem);
								globalColors.push(clothingItem);
								//console.log('Added Color: ' + clothingItem);
								break;
						}
						var x = document.getElementById("upperBody_color");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
						var x = document.getElementById("lowerBody_color");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
						var x = document.getElementById("Headwear_color");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
						var x = document.getElementById("Footwear_color");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
						var x = document.getElementById("Accessory_color");
						var option = document.createElement("option");
						option.text = clothingItem;
						x.add(option);
						itemCount++;
						document.getElementById ("wardrobeHeader").innerHTML = 'Wardrobe: ' + wardrobeName + '<br>Number of items: ' + itemCount + '<br>Duplicates ignored: ' +skipCount;

					})
					break;
				case false:
					break;
			}
			
			
			
			
			
			
		}
		fr.readAsText(files.item(0));
		wardrobeFlag = true;
		currWardrobe = document.getElementById ("selectedWardobe").value;
		document.getElementById ("wardrobeHeader").innerHTML = 'Wardrobe: ' + wardrobeName + '<br>Number of items: ' + itemCount + '<br>Duplicates ignored: ' +skipCount;
		
	}
	
	
	function createNewUpper() {
		UpperItem = [];
		document.getElementById('upperBody_input').innerText = null;
		var x = document.getElementById("upperBody_input");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
	}
	
	function createNewLower() {
		LowerItem = [];
		document.getElementById('lowerBody_input').innerText = null;
		var x = document.getElementById("lowerBody_input");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
	}
	
	function createNewHeadwear() {
		HeadwearItem = [];
		document.getElementById('Headwear_input').innerText = null;
		var x = document.getElementById("Headwear_input");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
	}
	
	function createNewFootwear() {
		FootwearItem = [];
		document.getElementById('Footwear_input').innerText = null;
		var x = document.getElementById("Footwear_input");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
	}
	
	function createNewAccessories() {
		AccessoryItem = [];
		document.getElementById('Accessory_input').innerText = null;
		var x = document.getElementById("Accessory_input");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
	}
	
	function createNewMaterials() {
		//console.log('Creating new mat');
		UpperItemMaterial = [];
		LowerItemMaterial = [];
		FootwearItemMaterial = [];
		HeadwearItemMaterial = [];
		AccessoryItemMaterial = [];
		document.getElementById('upperBody_material').innerText = null;
		document.getElementById('lowerBody_material').innerText = null;
		document.getElementById('Headwear_material').innerText = null;
		document.getElementById('Footwear_material').innerText = null;
		document.getElementById('Accessory_material').innerText = null;
		var x = document.getElementById("upperBody_material");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		var x = document.getElementById("lowerBody_material");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		var x = document.getElementById("Headwear_material");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		var x = document.getElementById("Footwear_material");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		var x = document.getElementById("Accessory_material");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
	}
	
	function getGlobalMaterials() {
		globalMaterials.sort();
		UpperItemMaterial = globalMaterials;
		LowerItemMaterial = globalMaterials;
		FootwearItemMaterial = globalMaterials;
		HeadwearItemMaterial = globalMaterials;
		AccessoryItemMaterial = globalMaterials;
		document.getElementById('upperBody_material').innerText = null;
		document.getElementById('lowerBody_material').innerText = null;
		document.getElementById('Headwear_material').innerText = null;
		document.getElementById('Footwear_material').innerText = null;
		document.getElementById('Accessory_material').innerText = null;
		var x = document.getElementById("upperBody_material");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		var x = document.getElementById("lowerBody_material");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		var x = document.getElementById("Headwear_material");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		var x = document.getElementById("Footwear_material");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		var x = document.getElementById("Accessory_material");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		
		UpperItemMaterial.forEach((clothingItem) => {
			var x = document.getElementById("upperBody_material"); 
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
		FootwearItemMaterial.forEach((clothingItem) => {
			var x = document.getElementById("Footwear_material"); 
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
		AccessoryItemMaterial.forEach((clothingItem) => {
			var x = document.getElementById("Accessory_material"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})

		//console.log('Global Mats imported');
		
	}
	
	function getDefaultMaterials() {
		defaultMaterials.sort();
		UpperItemMaterial = defaultMaterials;
		LowerItemMaterial = defaultMaterials;
		FootwearItemMaterial = defaultMaterials;
		HeadwearItemMaterial = defaultMaterials;
		AccessoryItemMaterial = defaultMaterials;
		document.getElementById('upperBody_material').innerText = null;
		document.getElementById('lowerBody_material').innerText = null;
		document.getElementById('Headwear_material').innerText = null;
		document.getElementById('Footwear_material').innerText = null;
		document.getElementById('Accessory_material').innerText = null;
		var x = document.getElementById("upperBody_material");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		var x = document.getElementById("lowerBody_material");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		var x = document.getElementById("Headwear_material");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		var x = document.getElementById("Footwear_material");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		var x = document.getElementById("Accessory_material");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		
		UpperItemMaterial.forEach((clothingItem) => {
			var x = document.getElementById("upperBody_material"); 
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
		FootwearItemMaterial.forEach((clothingItem) => {
			var x = document.getElementById("Footwear_material"); 
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
		AccessoryItemMaterial.forEach((clothingItem) => {
			var x = document.getElementById("Accessory_material"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})

		//console.log('Default Mats imported');
		
	}
	
	function getGlobalColors() {
		globalColors.sort();
		UpperItemColor = globalColors;
		LowerItemColor = globalColors;
		FootwearItemColor = globalColors;
		HeadwearItemColor = globalColors;
		AccessoryItemColor = globalColors;
		document.getElementById('upperBody_color').innerText = null;
		document.getElementById('lowerBody_color').innerText = null;
		document.getElementById('Headwear_color').innerText = null;
		document.getElementById('Footwear_color').innerText = null;
		document.getElementById('Accessory_color').innerText = null;
		var x = document.getElementById("upperBody_color");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		var x = document.getElementById("lowerBody_color");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		var x = document.getElementById("Headwear_color");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		var x = document.getElementById("Footwear_color");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		var x = document.getElementById("Accessory_color");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		
		UpperItemColor.forEach((clothingItem) => {
			var x = document.getElementById("upperBody_color"); 
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
		FootwearItemColor.forEach((clothingItem) => {
			var x = document.getElementById("Headwear_color"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})
		HeadwearItemColor.forEach((clothingItem) => {
			var x = document.getElementById("Footwear_color"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})
		AccessoryItemColor.forEach((clothingItem) => {
			var x = document.getElementById("Accessory_color"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})

		//console.log('Global Cols imported');
		
	}
	
	function getDefaultColors() {
		defaultColors.sort();
		UpperItemColor = defaultColors;
		LowerItemColor = defaultColors;
		FootwearItemColor = defaultColors;
		HeadwearItemColor = defaultColors;
		AccessoryItemColor = defaultColors;
		document.getElementById('upperBody_color').innerText = null;
		document.getElementById('lowerBody_color').innerText = null;
		document.getElementById('Headwear_color').innerText = null;
		document.getElementById('Footwear_color').innerText = null;
		document.getElementById('Accessory_color').innerText = null;
		var x = document.getElementById("upperBody_color");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		var x = document.getElementById("lowerBody_color");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		var x = document.getElementById("Headwear_color");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		var x = document.getElementById("Footwear_color");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		var x = document.getElementById("Accessory_color");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		
		UpperItemColor.forEach((clothingItem) => {
			var x = document.getElementById("upperBody_color"); 
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
		FootwearItemColor.forEach((clothingItem) => {
			var x = document.getElementById("Headwear_color"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})
		HeadwearItemColor.forEach((clothingItem) => {
			var x = document.getElementById("Footwear_color"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})
		AccessoryItemColor.forEach((clothingItem) => {
			var x = document.getElementById("Accessory_color"); 
			var option = document.createElement("option");
			option.text = clothingItem;
			x.add(option);
		})

		//console.log('Default Cols imported');
		
	}
	
	
	function createNewColors() {
		UpperItemColor = [];
		LowerItemColor = [];
		FootwearItemColor = [];
		HeadwearItemColor = [];
		AccessoryItemColor = [];
		document.getElementById('upperBody_color').innerText = null;
		document.getElementById('lowerBody_color').innerText = null;
		document.getElementById('Headwear_color').innerText = null;
		document.getElementById('Footwear_color').innerText = null;
		document.getElementById('Accessory_color').innerText = null;
		var x = document.getElementById("upperBody_color");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		var x = document.getElementById("lowerBody_color");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		var x = document.getElementById("Headwear_color");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		var x = document.getElementById("Footwear_color");
		var option = document.createElement("option");
		option.text = "None";
		x.add(option);
		var x = document.getElementById("Accessory_color");
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
	
	function runBatch() {
		console.log('Running Batch');
		var batchCount = document.getElementById("batchCount").value;
		for (let i = 0; i < batchCount; i++) {
			setRandomItems();
			setPrompt();
			document.getElementById("makeImage").click();
		}
	}
	
	



})();
