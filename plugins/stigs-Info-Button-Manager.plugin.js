/**
 * Image Info Buttons Manager
 * v.1.2, last updated: 31/05/2026
 * By The Stig
 *
 * Change Log 
 * 08/04/2026 Initial Build
 * 09/04/2026 Added sub-panels for each image
 * 09/04/2026 Added buttons to Show / Hide all 
 * 09/04/2026 Added color to distinguish between buttons that are enabled and those that are hidden
 * 09/04/2026 Fixed the Collapse Panel bug
 * 10/04/2026 Removed the sub-panel per image
 * 10/04/2026 Added the Global Panel to show/hide buttons across all generated images
 * 10/04/2026 Fixed a couple of minor bugs
 * 26/05/2026 Added routine to trim the text in the display panel
 * 30/05/2026 Added secondary button located in the Editor Inputs panel
 * 31/05/2026 Auto-refresh the screen as it appears - Avidgamefan & Claude Sonnet 4.6
 *
 * Thanks to The.QCC and Avidgamefan for their assistance in developing this plugin.
 *
 */
 
 
 
 
 (function() { "use strict"
	const VERSION = "1.1";
    const ID_PREFIX = "TheStig-Image-Info-Buttons-Manager";
    console.log('%s Image Info Button Manager Version: %s', ID_PREFIX, VERSION);
	
	
	injectLoaderCSS();
	addOptions();
	addSecondaryOptions();
	//applyStoredStyles();

	document.addEventListener('on_render_task_success', debounce(applyStoredStyles, 500));

	
	function injectLoaderCSS() {
		console.log('** Inject CSS **');
		const style = document.createElement('style');
		style.textContent = `
			.btnHover {
				background-color:#2168bf;
			}
		`;
		document.head.appendChild(style);
	}
	
	function addOptions() {
		console.log('Add Image Info Buttons Settings');
		var openCheck = '';
		var imgInfoBtnSettings = document.createElement('div');
		imgInfoBtnSettings.id = 'infoBtn-settings';
		imgInfoBtnSettings.classList.add('panel-box');
		let tempHTML = `
			<h4 class="collapsible `+ openCheck +`">Image Info Hover Settings</h4>
			<div id="hover-settings-entries" class="collapsible-content" style="display: block;margin-top:15px;">
				<div>
					<button style="display:block;width:240px; height:30px; class = "btnHover" type="button" id="getButtons">Get Current Settings</button>
				</div>
				<p></p>
				<p></p>
				<div id="toggle-container"></div>
			</div>
		`;
				
		imgInfoBtnSettings.innerHTML = tempHTML;
		var editorSettings = document.getElementById('editor-settings');
		editorSettings.parentNode.insertBefore(imgInfoBtnSettings, editorSettings.nextSibling);
		createCollapsibles(imgInfoBtnSettings);
		
		document.getElementById ("getButtons").addEventListener ("click", getCurrentButtons, false);
	}
	
	function addSecondaryOptions() {
		const hoverEditorInputs = document.getElementById("editor-inputs");
		const hoverMenuContainer = document.createElement('div');
		hoverMenuContainer.id = `${ID_PREFIX}-hoverContainer`;
		hoverEditorInputs?.appendChild(hoverMenuContainer);

		const hoverGetOptionsButton = document.createElement('button');
		hoverGetOptionsButton.id = `hoverOptionsButton`;
		hoverGetOptionsButton.innerHTML = `Refresh Hover Options`;
		hoverGetOptionsButton.title = `Refreshes the image to show selected Hover options`;
		hoverGetOptionsButton.style.margin = "1em 0"; // Adds a blank line space above and below


		hoverMenuContainer.appendChild(hoverGetOptionsButton);

		document.getElementById ("hoverOptionsButton").addEventListener ("click", getCurrentButtons, false);

	}
	
	function getStyleSheet() {
		if (!document.getElementById('task-toggle-styles')) {
			const style = document.createElement('style');
			style.id = 'task-toggle-styles';
			document.head.appendChild(style);
		}
		return document.getElementById('task-toggle-styles').sheet;
	}

	function setCSSRule(styleSheet, selector, isHidden) {
		for (let r = styleSheet.cssRules.length - 1; r >= 0; r--) {
			if (styleSheet.cssRules[r].selectorText === selector) styleSheet.deleteRule(r);
		}
		if (isHidden) {
			styleSheet.insertRule(`${selector} { display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; }`, styleSheet.cssRules.length);
		}
	}

	function tagAllButtons() {
		const taskTypeMap = new Map();

		document.querySelectorAll('.imgItemInfo').forEach((imgContainer) => {
			const seenInThisImage = {};
			imgContainer.querySelectorAll('.tasksBtns').forEach((btn) => {
				let name = btn.textContent.trim();
				let identifier = "";

				const lastIndex = name.lastIndexOf(".");
				if (lastIndex !== -1) {
					name = name.slice(lastIndex + 1).trim();
				} else {
					const lines = name.split("\n").map(line => line.trim()).filter(Boolean);
					name = lines.length > 0 ? lines[lines.length - 1] : name;
				}
				if (name.length > 40) name = name.slice(0, 40) + "...";

				console.log("Hover Text: " + name);

				// 1. TRY TEXT FIRST
				if (name && !name.match(/^Task\s*#?\d+$/i)) {
					identifier = "label-" + name.replace(/[^a-z0-9]/gi, '-').toLowerCase();
				}
				// 2. TRY ICON CLASSES (i tags or SVG)
				if (!identifier) {
					const icon = btn.querySelector('i, svg, .fa, .fas, .fa-solid');
					if (icon) {
						const iconClass = (icon.tagName === 'svg')
							? `fa-${icon.getAttribute('data-icon')}`
							: Array.from(icon.classList).find(c => c.startsWith('fa-') && c !== 'fa-solid' && c !== 'fa-fw');
						if (iconClass) {
							identifier = iconClass;
							name = iconClass.replace('fa-', '').replace(/-/g, ' ').toUpperCase();
						}
					}
				}
				// 3. TRY TOOLTIP/TITLE
				if (!identifier && btn.title) {
					name = btn.title.trim();
					identifier = "title-" + name.replace(/[^a-z0-9]/gi, '-').toLowerCase();
				}
				// 4. EMERGENCY FALLBACK: Use specific class list
				if (!identifier) {
					const specificClass = Array.from(btn.classList).find(c => c !== 'tasksBtns' && !c.startsWith('hide-target-'));
					if (specificClass) {
						identifier = "class-" + specificClass;
						name = specificClass.toUpperCase();
					}
				}
				// If we STILL have nothing, skip it
				if (!identifier) return;

				seenInThisImage[identifier] = (seenInThisImage[identifier] || 0) + 1;
				const occurrenceIdx = seenInThisImage[identifier];
				const globalId = `${identifier}-${occurrenceIdx}`;

				btn.classList.add(`hide-target-${globalId}`);

				if (!taskTypeMap.has(globalId)) {
					taskTypeMap.set(globalId, {
						name: occurrenceIdx > 1 ? `${name} #${occurrenceIdx}` : name,
						id: globalId
					});
				}
			});
		});

		return taskTypeMap;
	}

	function applyStoredStyles() {
		tagAllButtons();
		const styleSheet = getStyleSheet();

		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (!key || !key.startsWith('global_toggle_')) continue;
			const id = key.replace('global_toggle_', '');
			const selector = `.imgItemInfo .tasksBtns.hide-target-${id}`;
			setCSSRule(styleSheet, selector, localStorage.getItem(key) === 'hidden');
		}
	}

	function getCurrentButtons() {
		const myPanel = document.getElementById("infoBtn-settings"); 
		if (!myPanel) return;

		const collapseArea = myPanel.querySelector('.collapsible-content');
		if (!collapseArea) return;

		const styleSheet = getStyleSheet();

		let globalPanel = collapseArea.querySelector('#global-task-panel');
		if (!globalPanel) {
			globalPanel = document.createElement('div');
			globalPanel.id = 'global-task-panel';
			globalPanel.style.cssText = "margin-top: 15px; padding: 10px; background: #111; border: 1px solid #333; border-radius: 4px; display: flex; flex-direction: row; flex-wrap: wrap; gap: 6px;";
			collapseArea.appendChild(globalPanel);
		}
		globalPanel.innerHTML = ''; 

		const masterRow = document.createElement('div');
		masterRow.style.cssText = "display: flex; gap: 8px; width: 100%; margin-bottom: 5px; border-bottom: 1px solid #444; padding-bottom: 10px;";
    
		const triggerAll = (action) => {
			globalPanel.querySelectorAll('.task-toggle-btn').forEach(t => {
				const isHidden = t.getAttribute('data-hidden') === 'true';
				if ((action === 'show' && isHidden) || (action === 'hide' && !isHidden)) t.click();
			});
		};

		const makeMaster = (txt, act) => {
			const b = document.createElement('button');
			b.innerText = txt;
			b.style.cssText = "flex: 1; padding: 8px; font-weight: bold; background: #333; color: white; border: 1px solid #555; border-radius: 4px; cursor: pointer; font-size: 0.8em;";
			b.onclick = () => triggerAll(act);
			return b;
		};
		masterRow.append(makeMaster('SHOW ALL', 'show'), makeMaster('HIDE ALL', 'hide'));
		globalPanel.appendChild(masterRow);

		const taskTypeMap = tagAllButtons();

		taskTypeMap.forEach((data) => {
			const storageKey = `global_toggle_${data.id}`;
			const toggle = document.createElement('button');
			toggle.className = 'task-toggle-btn';

			const updateUI = (state) => {
				const isHidden = (state === 'hidden');
				toggle.innerText = isHidden ? `Show ${data.name}` : `Hide ${data.name}`;
				toggle.style.setProperty('background-color', isHidden ? '#8B0000' : '#2E7D32', 'important');
				toggle.style.cssText += `color: white; border: none; padding: 5px 8px; border-radius: 3px; cursor: pointer; font-size: 0.75em; font-weight: 600; min-width: 65px; flex: 0 1 auto;`;
				toggle.setAttribute('data-hidden', isHidden);

				const selector = `.imgItemInfo .tasksBtns.hide-target-${data.id}`;
				setCSSRule(styleSheet, selector, isHidden);
			};

			const savedState = localStorage.getItem(storageKey) || 'visible';
			updateUI(savedState);

			toggle.onclick = () => {
				const isCurrentlyHidden = toggle.getAttribute('data-hidden') === 'true';
				const nextState = isCurrentlyHidden ? 'visible' : 'hidden';
				localStorage.setItem(storageKey, nextState);
				updateUI(nextState);
			};

			globalPanel.appendChild(toggle);
		});
	} 
	 
})();