/**
 * Hypernetwork Shuttle Controls
 * v.1.2, last updated: 28/06/2023
 * By The Stig
 * 
 * 
 *
 * Free to use with the CMDR2 Stable Diffusion UI.
 *  
 */

(function() { "use strict"

	const VERSION = "1.2";
	const ID_PREFIX = "TheStig-Hypernetwork Controls";
	console.log('%s The Stig - Hypernetwork Controls Version: %s', ID_PREFIX, VERSION);
	
	var HyperStepSize = 0.1; // Change this as you need to from Minimum 0.1 to Maximum 0.99
	var HyperCurrentValue = hypernetwork_strength;
	var HyperFlag=false;
	let qryTestDiffusers = (document.querySelector("#test_diffusers").value).trim();
	let qryBetaChannel = (document.querySelector("#use_beta_channel").value).trim();
	if (qryBetaChannel = 'on') {
		if (qryTestDiffusers = 'on') {
			HyperFlag = true;
		}
	}
			
	var HyperSettings = {
		HyperButton1: 'fa-solid fa-fast-backward', 			// Minimum
		HyperButton2: 'fa-solid fa-step-backward', 			// Minus 1
		HyperButton3: 'fa-solid fa-compress', 				// Middle
		HyperButton4: 'fa-solid fa-step-forward',			// Plus 1
		HyperButton5: 'fa-solid fa-fast-forward',			// Maximum
		HyperButton6: 'fa-solid fa-border-none'				// Grid
	};
		
	PLUGINS['IMAGE_INFO_BUTTONS'].push([
		{ html: '<span class="imageadjust-label" style="background-color:transparent;background: rgba(0,0,0,0.5)">Hyper:</span>', type: 'label', on_click: onHyperAdjustClick},
		{ html: '<div title = "Set Hypernetwork value to minumum"><i class="' + HyperSettings.HyperButton1 + '"></i></div>', on_click: onHyperMin},
		{ html: '<div title = "Decrease Hypernetwork value by step size"><i class="' + HyperSettings.HyperButton2 + '"></i></div>', on_click: onHyperMinus},
		{ html: '<div title = "Set Hypernetwork value to +0.5"><i class="' + HyperSettings.HyperButton3 + '"></i></div>', on_click: onHyperMiddle},
		{ html: '<div title = "Increase Hypernetwork value by step size"><i class="' + HyperSettings.HyperButton4 + '"></i></div>', on_click: onHyperPlus},
		{ html: '<div title = "Set Hypernetwork value to maximum"><i class="' + HyperSettings.HyperButton5 + '"></i></div>', on_click: onHyperMax},
		{ html: '<div title = "Create grid using step size"><i class="' + HyperSettings.HyperButton6 + '"></i></div>', on_click: onHyperGrid}
	])
		
	function onHyperAdjustClick() {
		console.log('*** Hyper Adjust ***');
	}
	
	function modifyHyper(newHyperVal,adjHyperVal,origRequest) {
		var HyperModel=document.getElementById("hypernetwork_model").value;
		var HyperValue=origRequest.hypernetwork_strength;

		if (typeof HyperValue === 'string') {
			var passedHyperValue=parseFloat(HyperValue).toFixed(2);
		}
		if (typeof HyperValue === 'number') {
			var passedHyperValue=HyperValue.toFixed(2);
		}
		if (typeof passedHyperValue === 'string') {
			passedHyperValue=parseFloat(passedHyperValue);
		}		
		if (typeof LoraStepSize === 'string') {
			HyperStepSize=parseFloat(HyperStepSize);
		}
		var currentHyperVal = passedHyperValue;	
		switch (newHyperVal) {
			case 0:
				var newSetVal = (currentHyperVal + (adjHyperVal));
				if (typeof newSetVal === 'string') {
					newSetVal=parseFloat(newSetVal).toFixed(2);
					break;
				}
				if (typeof newSetVal === 'number') {
					newSetVal=newSetVal.toFixed(2);
					break;
				}
			default:
				var newSetVal = (currentHyperVal + (adjHyperVal));
				switch (isNaN(newSetVal)) {
					case true:
						break;
					default:
						HyperFlag=true;
						newSetVal = (parseFloat(newHyperVal));
						if (typeof newSetVal === 'string') {
							newSetVal=parseFloat(newSetVal).toFixed(2);
						}
						if (typeof newSetVal === 'number') {
							newSetVal=newSetVal.toFixed(2);
						}
				}
						
			}
	
		if (newSetVal <0) {
			newSetVal = 0;
		}
		if (newSetVal >1) {
			newSetVal = 1;
		}

		switch (HyperModel) {
			case "None":
				break;
			case "Undefined":
				break;
			case "Null":
				break;
			case "undefined":
				break;
			default:
				newSetVal=parseFloat(newSetVal);
				switch (isNaN(newSetVal)) {
					case true:
						break;
					default:
						origRequest.hypernetwork_strength = parseFloat(newSetVal);
						hypernetwork_strength_slider.value=(origRequest.hypernetwork_strength*100);
						hypernetwork_strength.value=parseFloat(newSetVal);
						document.getElementById("makeImage").click();
						break;
				}
				break;
		}
	}
		
	function onHyperMin(origRequest) {
		modifyHyper(0.01,0,origRequest);
	}
	
	function onHyperMinus(origRequest) {
		modifyHyper(0,(0-HyperStepSize),origRequest);
	}
	
	function onHyperMiddle(origRequest) {
		modifyHyper(0.5,0,origRequest);
	}
	
	function onHyperPlus(origRequest) {
		modifyHyper(0,(0+HyperStepSize),origRequest);
	}
	
	function onHyperMax(origRequest) {
		modifyHyper(0.99,0,origRequest);
	}
	
	function onHyperGrid(origRequest,image) {
		if (typeof HyperaStepSize === 'string') {
			HyperStepSize = parseFloat(HyperStepSize);
		}
		//onLoraMin(origRequest);
		switch (HyperFlag) {
			case false:
				break;
			default:
				var HyperStartGrid=0;
				var HyperEndGrid = 0.99;
				var HyperLoopVal = 0;
				var HyperTempVal = 0;
				origRequest.hypernetwork_strength = 0;
				if (typeof HyperStepSize === 'string') {
					HyperStepSize = parseFloat(HyperStepSize);
				}
				if (typeof HyperTempVal === 'string') {
					HyperTempVal = parseFloat(HyperTempVal);
				}
		
				while (HyperLoopVal <= 100) {
					if (inRange,HyperTempVal,0,1) {
						modifyHyper(HyperTempVal,0,origRequest);
					}
					HyperLoopVal++;
					HyperTempVal = HyperTempVal + HyperStepSize;
					if (HyperTempVal > 1) {
						break;
					}
				}
			}
	}
	
	
	
	function inRange(x, min, max) {
		return ((x-min)*(x-max) <= 0);
	}

})();