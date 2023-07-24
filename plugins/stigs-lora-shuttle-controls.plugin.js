/**
 * Lora Shuttle Controls
 * v.2.5, last updated: 24/07/2023
 * By The Stig
 * 
 * 
 *
 * Free to use with the CMDR2 Stable Diffusion UI.
 *  
 */

(function() { "use strict"

	const VERSION = "2.5";
	const ID_PREFIX = "TheStig-Lora Shuttle Controls";
	console.log('%s The Stig - Lora Shuttle Controls Version: %s', ID_PREFIX, VERSION);
	
	var LoraStepSize = 0.1;			// Change this as you need to from Minimum 0.1 to Maximum 0.99
	
	var LoraUserStart = 0.0;		// Change this as required
	var LoraUserEnd = 1.0;			// Change this as required
	var LoraUserStepSize = 0.2;		// Change this as required
	
	var LoraInputFlag = true;
	
	
	
	var LoraCurrentValue = lora_alpha_0.value;
	var LoraFlag=false;
	let qryTestDiffusers = (document.querySelector("#test_diffusers").value).trim();
	let qryBetaChannel = (document.querySelector("#use_beta_channel").value).trim();
	if (qryBetaChannel = 'on') {
		if (qryTestDiffusers = 'on') {
			LoraFlag = true;
		}
	}
			
	var LoraSettings1 = {
		LoraButton1: 'fa-solid fa-fast-backward', 			// Minimum
		LoraButton2: 'fa-solid fa-step-backward', 			// LoRa Value -1
		LoraButton3: 'fa-solid fa-angle-double-left', 		// Minus 1
		LoraButton4: 'fa-solid fa-compress', 				// LoRa Value 0.5
		LoraButton5: 'fa-solid fa-angle-double-right',		// Plus 1
		LoraButton6: 'fa-solid fa-step-forward', 			// LoRa Value +1
		LoraButton7: 'fa-solid fa-fast-forward',			// Maximum
		LoraButton8: 'fa-solid fa-border-none'				// Grid #1 LoRa Value 0 to LoRa Value 1
	};
		
	PLUGINS['IMAGE_INFO_BUTTONS'].push([
		{ html: '<span class="loraadjust-label1" style="background-color:transparent;background: rgba(0,0,0,0.5)">LoRa:</span>', type: 'label', on_click: onLoraAdjustClick},
		{ html: '<div title = "Set LoRa value to Minimum"><i class="' + LoraSettings1.LoraButton1 + '"></i></div>', on_click: onLoraMin},
		{ html: '<div title = "Set LoRa value to -1"><i class="' + LoraSettings1.LoraButton2 + '"></i></div>', on_click: onLoraMidMinus},
		{ html: '<div title = "Decrease LoRa value by step size"><i class="' + LoraSettings1.LoraButton3 + '"></i></div>', on_click: onLoraMinus},
		{ html: '<div title = "Set LoRa value to 0.5"><i class="' + LoraSettings1.LoraButton4 + '"></i></div>', on_click: onLoraMiddle},
		{ html: '<div title = "Increase LoRa value by step size"><i class="' + LoraSettings1.LoraButton5 + '"></i></div>', on_click: onLoraPlus},
		{ html: '<div title = "Set LoRa value to +1"><i class="' + LoraSettings1.LoraButton6 + '"></i></div>', on_click: onLoraMidPlus},
		{ html: '<div title = "Set LoRa value to maximum"><i class="' + LoraSettings1.LoraButton7 + '"></i></div>', on_click: onLoraMax},
		{ html: '<div title = "Create Grid using LoRa values 0 to +1"><i class="' + LoraSettings1.LoraButton8 + '"></i></div>', on_click: onLoraGrid3}
	])
	
	var LoraSettings2 = {
		LoraButton1: 'fa-solid fa-1', 						// Grid #1 LoRa Value -2 to LoRa Value -1
		LoraButton2: 'fa-solid fa-2', 						// Grid #2 LoRa Value -1 to LoRa Value 0
		LoraButton3: 'fa-solid fa-3', 						// Grid #3 LoRa Value 0 to LoRa Value 1
		LoraButton4: 'fa-solid fa-4', 						// Grid #4 LoRa Value 1 to LoRa Value 2
		LoraButton5: 'fa-solid fa-5',						// Grid #5 LoRa Value -2 to LoRa Value 2
		LoraButton6: 'fa-solid fa-heart'					// Grid #6 LoRa Value User Defined
	};
		
	PLUGINS['IMAGE_INFO_BUTTONS'].push([
		{ html: '<span class="loraadjust-label2" style="background-color:transparent;background: rgba(0,0,0,0.5)">LoRa Grid:</span>', type: 'label', on_click: onLoraAdjustClick},
		{ html: '<div title = "Create Grid using LoRa values -2 to -1"><i class="' + LoraSettings2.LoraButton1 + '"></i></div>', on_click: onLoraGrid1},
		{ html: '<div title = "Create Grid using LoRa values -1 to 0"><i class="' + LoraSettings2.LoraButton2 + '"></i></div>', on_click: onLoraGrid2},
		{ html: '<div title = "Create Grid using LoRa values 0 to +1"><i class="' + LoraSettings2.LoraButton3 + '"></i></div>', on_click: onLoraGrid3},
		{ html: '<div title = "Create Grid using LoRa values +1 to +2"><i class="' + LoraSettings2.LoraButton4 + '"></i></div>', on_click: onLoraGrid4},
		{ html: '<div title = "Create Grid using LoRa values -2 to +2"><i class="' + LoraSettings2.LoraButton5 + '"></i></div>', on_click: onLoraGrid5},
		{ html: '<div title = "Create Grid using User Defined Values"><i class="' + LoraSettings2.LoraButton6 + '"></i></div>', on_click: onLoraGrid6}
	])
	
	
	const style = document.createElement('style');
    style.textContent = `
    #${ID_PREFIX}-LoRaFavButton {
        margin-top: 8px;
    }
	`;
	

	
	
    document.head.append(style);
    const editorInputs = document.getElementById("editor-inputs");

    const LoRaButtonsContainer = document.createElement('div');
    LoRaButtonsContainer.id = `${ID_PREFIX}-LoRaFavButton`;
    editorInputs?.appendChild(LoRaButtonsContainer);

    const LoRaFavButton = document.createElement('button');
    LoRaFavButton.id = `${ID_PREFIX}-webcamButton`;
    LoRaFavButton.innerHTML = `Set LoRa Grid`;
    LoRaFavButton.title = `V${VERSION}`;
    LoRaButtonsContainer.appendChild(LoRaFavButton);
	
	LoRaFavButton.addEventListener('click', getStartNewTaskHandler());
	

	function getStartNewTaskHandler() {
        return async function(event) {
            //const options = await showPopup(mode, reqBody);
            //if (options.cancelled) {
            //    return;
            //}
            const options = {};
            const newTaskRequest = buildRequest(options);
            //createTask(newTaskRequest);
            //initialText.style.display = 'none';
        }
    }
	
	
	function buildRequest(options = {}) {
        const newTaskRequest = modifyCurrentRequest(getCurrentUserRequest().reqBody, { //TODO remove getCurrentUserRequest after is fixed upstream.
            //session_id: sessionId
        });
		//console.log('NTR: ' + newTaskRequest.reqBody.prompt);
        if ('prompt' in options) {
            newTaskRequest.reqBody.prompt = options.prompt;
        } else {
			setLoRaFav();
			//var promptval = document.getElementById('prompt').value;
			//newTaskRequest.reqBody.prompt = promptval;
		}
        
        return newTaskRequest;
    }
	
	
	
	function setLoRaFav() {
		var LoRaInput1 = 0;
		var LoRaInput2 = 0;
		var LoRaInput3 = 0;
		LoraInputFlag = true;
		
		LoRaInput1 = prompt("Enter LoRa Start Value",LoraUserStart);
		if (LoRaInput1 === null) {
			LoraInputFlag = false;
			LoRaInput1 = LoraUserStart;
		}
		if (typeof LoRaInput1 === 'string') {
			LoRaInput1 = parseFloat(LoRaInput1);
		}		
		if (isNaN(LoRaInput1)) {
			console.log('Cannot proceed, LoRa Start Value is not a number');
			showToast('Cannot proceed, LoRa Start Value is not a number');
			LoRaInput1 = LoraUserStart;
			return;
		}
		LoraUserStart = LoRaInput1;
		
		switch (LoraInputFlag) {
			case true:
				LoRaInput2 = prompt("Enter LoRa End Value",LoraUserEnd);	
				if (LoRaInput2 === null) {
					LoraInputFlag = false;
					LoRaInput2 = LoraUserEnd;
				}
				break;
			case false:
				if (typeof LoRaInput2 == 'string') {
					LoRaInput2 = parseFloat(LoRaInput2);
				}
				LoraUserEnd = LoRaInput2;
				break;
		}

		if (isNaN(LoRaInput2)) {
			console.log('Cannot proceed, LoRa End Value is not a number');
			showToast('Cannot proceed, LoRa End Value is not a number');
			LoRaInput2 = LoraUserEnd;
			return;
		}
		LoraUserEnd = LoRaInput2;
		
		switch (LoraInputFlag) {
			case true:
				LoRaInput3 = prompt("Enter LoRa Step Value",LoraUserStepSize);	
				if (LoRaInput3 === null) {
					LoraInputFlag = false;
					LoRaInput3 = LoraUserStepSize;
				}
				break;
			case false:
				if (typeof LoRaInput3 === 'string') {
					LoRaInput3 = parseFloat(LoRaInput3);
				}
				LoraUserStepSize = LoRaInput3;
				break;
		}
		if (isNaN(LoRaInput3)) {
			console.log('Cannot proceed, LoRa Step Value is not a number');
			showToast('Cannot proceed, LoRa Step Value is not a number');
			LoRaInput3 = LoraUserStepSize;
			return;
		}
		LoraUserStepSize = LoRaInput3;
		
	}

	
		
	function onLoraAdjustClick() {
		console.log('*** Lora Adjust ***');
	}
	
	function modifyLora(newLoraVal,adjLoraVal,origRequest) {
		var LoraModel=document.getElementById("lora_model_0").value;
		var LoraValue=origRequest.lora_alpha;
		
		for(var property in origRequest) {
			//console.log(property + "=" + origRequest[property]);
		}
		

		//console.log('LoraValue: ' + LoraValue);
		
		if (typeof LoraValue === 'object') {
			//console.log('LoraValue is an Array');
			var passedLoraValue=parseFloat(LoraValue[0]).toFixed(2);
		}
		

		if (typeof LoraValue === 'string') {
			//console.log('LoraValue is a string');
			var passedLoraValue=parseFloat(LoraValue).toFixed(2);
		}
		if (typeof LoraValue === 'number') {
			//console.log('LoraValue is a number');
			var passedLoraValue=LoraValue.toFixed(2);
		}
		if (typeof passedLoraValue === 'string') {
			passedLoraValue=parseFloat(passedLoraValue);
		}		
		if (typeof LoraStepSize === 'string') {
			LoraStepSize=parseFloat(LoraStepSize);
		}
		//console.log('passedLoraValue: ' + passedLoraValue);
		
		var currentLoraVal = passedLoraValue;
		switch (newLoraVal) {
			case 0:
				
				var newSetVal = (currentLoraVal + (adjLoraVal));
				if (typeof newSetVal === 'string') {
					newSetVal=parseFloat(newSetVal).toFixed(2);
					//console.log('newSetVal: String');
					break;
				}
				if (typeof newSetVal === 'number') {
					newSetVal=newSetVal.toFixed(2);
					//console.log('newSetVal: number');
					break;
				}	
			default:
				var newSetVal = (currentLoraVal + (adjLoraVal));
				switch (isNaN(newSetVal)) {
					case true:
						console.log('currentLoraVal: ' + currentLoraVal);
						console.log('adjLoraVal: ' + adjLoraVal);
						break;
					default:
						LoraFlag=true;
						newSetVal = (parseFloat(newLoraVal));
						if (typeof newSetVal === 'string') {
							newSetVal=parseFloat(newSetVal).toFixed(2);
						}
						if (typeof newSetVal === 'number') {
							newSetVal=newSetVal.toFixed(2);
						}
				}
						
			}

		switch (LoraModel) {
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
						console.log('Error, NewVal is not a number');
						break;
					default:
						origRequest.lora_alpha = parseFloat(newSetVal);
						//lora_alpha_slider.value=(origRequest.lora_alpha*100);
						lora_alpha_0.value=parseFloat(newSetVal);
						document.getElementById("makeImage").click();
						break;
				}
				break;
		}
	}
		
	function onLoraMin(origRequest) {
		modifyLora(-2,0,origRequest);
	}
	
	function onLoraMinus(origRequest) {
		modifyLora(0,(0-LoraStepSize),origRequest);
	}
	
	function onLoraMiddle(origRequest) {
		modifyLora(0.5,0,origRequest);
	}
	
	function onLoraMidPlus(origRequest) {
		modifyLora(1,0,origRequest);
	}
	
	function onLoraMidMinus(origRequest) {
		modifyLora(-1,0,origRequest);
	}
	
	function onLoraPlus(origRequest) {
		modifyLora(0,(0+LoraStepSize),origRequest);
	}
	
	function onLoraMax(origRequest) {
		modifyLora(2,0,origRequest);
	}
	
	
	
	function onLoraGrid1(origRequest,image) {
		if (typeof LoraStepSize === 'string') {
			LoraStepSize = parseFloat(LoraStepSize);
		}
		//onLoraMin(origRequest);
		switch (LoraFlag) {
			case false:
				break;
			default:
				var loraStartGrid = -2;
				var loraEndGrid = -1;
				var loraLoopVal = 0;
				var loraTempVal = -2;
				//origRequest.lora_alpha_0 = 0;
				if (typeof LoraStepSize === 'string') {
					LoraStepSize = parseFloat(LoraStepSize);
				}
				if (typeof loraTempVal === 'string') {
					loraTempVal = parseFloat(loraTempVal);
				}
		
				while (loraLoopVal <= 100) {
					if (inRange,loraTempVal,0,1) {
						modifyLora(loraTempVal,0,origRequest);
					}
					loraLoopVal++;
					loraTempVal = loraTempVal + LoraStepSize;
					if (loraTempVal > (loraEndGrid + LoraStepSize)) {
						break;
					}
				}
			}
	}
	
	function onLoraGrid2(origRequest,image) {
		if (typeof LoraStepSize === 'string') {
			LoraStepSize = parseFloat(LoraStepSize);
		}
		switch (LoraFlag) {
			case false:
				break;
			default:
				var loraStartGrid= -1;
				var loraEndGrid = 0.01;
				var loraLoopVal = 0;
				var loraTempVal = -1;
				//origRequest.lora_alpha_0 = 0;
				if (typeof LoraStepSize === 'string') {
					LoraStepSize = parseFloat(LoraStepSize);
				}
				if (typeof loraTempVal === 'string') {
					loraTempVal = parseFloat(loraTempVal);
				}
		
				while (loraLoopVal <= 100) {
					//console.log('Temp: ' + loraTempVal);
					if (inRange,loraTempVal,0,-1) {
						//console.log('Calling routine');
						modifyLora(loraTempVal,0,origRequest);
						//console.log('In Range');
					}
					loraLoopVal++;
					loraTempVal = loraTempVal + LoraStepSize;
					if (loraTempVal > loraEndGrid) {
						//console.log('Breaking');
						//console.log(loraTempVal);
						//console.log(loraEndGrid);
						break;
					}
				}
			}
	}
	
	function onLoraGrid3(origRequest,image) {
		if (typeof LoraStepSize === 'string') {
			LoraStepSize = parseFloat(LoraStepSize);
		}
		switch (LoraFlag) {
			case false:
				break;
			default:
				var loraStartGrid= 0;
				var loraEndGrid = 1;
				var loraLoopVal = 0;
				var loraTempVal = 0;
				//origRequest.lora_alpha_0 = 0;
				if (typeof LoraStepSize === 'string') {
					LoraStepSize = parseFloat(LoraStepSize);
				}
				if (typeof loraTempVal === 'string') {
					loraTempVal = parseFloat(loraTempVal);
				}
		
				while (loraLoopVal <= 100) {
					if (inRange,loraTempVal,0,1) {
						modifyLora(loraTempVal,0,origRequest);
					}
					loraLoopVal++;
					loraTempVal = loraTempVal + LoraStepSize;
					if (loraTempVal > loraEndGrid) {
						break;
					}
				}
			}
	}


	function onLoraGrid4(origRequest,image) {
		if (typeof LoraStepSize === 'string') {
			LoraStepSize = parseFloat(LoraStepSize);
		}
		switch (LoraFlag) {
			case false:
				break;
			default:
				var loraStartGrid = 1;
				var loraEndGrid = 2;
				var loraLoopVal = 0;
				var loraTempVal = 1;
				//origRequest.lora_alpha_0 = 0;
				if (typeof LoraStepSize === 'string') {
					LoraStepSize = parseFloat(LoraStepSize);
				}
				if (typeof loraTempVal === 'string') {
					loraTempVal = parseFloat(loraTempVal);
				}
		
				while (loraLoopVal <= 100) {
					if (inRange,loraTempVal,1,2) {
						modifyLora(loraTempVal,0,origRequest);
					}
					loraLoopVal++;
					loraTempVal = loraTempVal + LoraStepSize;
					if (loraTempVal > (loraEndGrid + LoraStepSize)) {
						break;
					}
				}
			}
	}


	function onLoraGrid5(origRequest,image) {
		if (typeof LoraStepSize === 'string') {
			LoraStepSize = parseFloat(LoraStepSize);
		}
		switch (LoraFlag) {
			case false:
				break;
			default:
				var loraStartGrid=-2;
				var loraEndGrid = 2;
				var loraLoopVal = 0;
				var loraTempVal = -2;
				//origRequest.lora_alpha_0 = 0;
				if (typeof LoraStepSize === 'string') {
					LoraStepSize = parseFloat(LoraStepSize);
				}
				if (typeof loraTempVal === 'string') {
					loraTempVal = parseFloat(loraTempVal);
				}
		
				while (loraLoopVal <= 100) {
					if (inRange,loraTempVal,-2,2) {
						modifyLora(loraTempVal,0,origRequest);
					}
					loraLoopVal++;
					loraTempVal = loraTempVal + LoraStepSize;
					if (loraTempVal > (loraEndGrid + LoraStepSize)) {
						break;
					}
				}
			}
	}

	function onLoraGrid6(origRequest,image) {
		if (typeof LoraUserStepSize === 'string') {
			LoraUserStepSize = parseFloat(LoraUserStepSize);
		}
		switch (LoraFlag) {
			case false:
				break;
			default:
				console.log('Starting grid 6');
				var loraStartGrid=LoraUserStart;
				if (typeof loraStartGrid === 'string') {
					loraStartGrid = parseFloat(loraStartGrid);
				}
				var loraEndGrid = LoraUserEnd;
				if (typeof loraEndGrid === 'string') {
					loraEndGrid = parseFloat(loraEndGrid);
				}
				var loraLoopVal = 0;
				var loraTempVal = loraStartGrid;
				
				console.log('Start: ' + loraStartGrid);
				console.log('Finish: ' + loraEndGrid);
				console.log('Step: ' + LoraUserStepSize);
				if (isNaN(loraStartGrid)) {
					console.log('Cannot proceed, Start is not a number');
					showToast('Cannot proceed, Start is not a number')
					return;
				}
				if (isNaN(loraEndGrid)) {
					console.log('Cannot proceed, End is not a number');
					showToast('Cannot proceed, End is not a number')
					return;
				}
				if (isNaN(LoraUserStepSize)) {
					console.log('Cannot proceed, Step Size is not a number');
					showToast('Cannot proceed, Step Size is not a number')
					return;
				}
				

				if (typeof LoraUserStepSize === 'string') {
					LoraUserStepSize = parseFloat(LoraUserStepSize);
				}
				if (typeof loraTempVal === 'string') {
					loraTempVal = parseFloat(loraTempVal);
				}
		
				while (loraLoopVal <= 100) {
					if (inRange,loraTempVal,LoraUserStart,LoraUserEnd) {
						modifyLora(loraTempVal,0,origRequest);
						
					}
					loraLoopVal++;
					loraTempVal = loraTempVal + LoraUserStepSize;
					//console.log(LoraUserStart,loraTempVal,loraEndGrid);
					if (loraTempVal > loraEndGrid) {
						console.log('Reached end of loop');
						break;
					}
				}
			}
	}

	
	
	function inRange(x, min, max) {
		return ((x-min)*(x-max) <= 0);
	}

})();