/**
 * Models Shuttle Controls
 * v.1.2, last updated: 22/07/2023
 * By The Stig
 * 
 * 
 *
 * Free to use with the CMDR2 Stable Diffusion UI.
 *  
 */

(function() { "use strict"

	const VERSION = "1.2";
	const ID_PREFIX = "TheStig-Models Controls";
	console.log('%s The Stig - Models Controls Version: %s', ID_PREFIX, VERSION);
	
	const style = document.createElement('style');
    style.textContent = `
    #${ID_PREFIX}-favModelButton {
        margin-top: 8px;
    }
	`;
    document.head.append(style);
    const editorInputs = document.getElementById("editor-inputs");
    const buttonsContainer = document.createElement('div');
    buttonsContainer.id = `${ID_PREFIX}-favModelContainer`;
    editorInputs?.appendChild(buttonsContainer);
    const favModelButton = document.createElement('button');
    favModelButton.id = `${ID_PREFIX}-favModelButton`;
    favModelButton.innerHTML = `Set Favorite Models`;
    favModelButton.title = `V${VERSION}`;
	const favModelBrowser = document.createElement('input');
	favModelBrowser.setAttribute('type','file');
	favModelBrowser.setAttribute('id','modelFavs');
	favModelBrowser.setAttribute('name','modelFavs');
	favModelBrowser.setAttribute('accept','.safetensors, .ckpt');
	favModelBrowser.setAttribute('multiple','True');
	favModelBrowser.setAttribute('style.opacity','0');
    buttonsContainer.appendChild(favModelButton);
	favModelButton.addEventListener('click', getFavModels());
	favModelBrowser.addEventListener('change', setFavModels);
	
	
	
	var modelSelected = document.getElementById("stable_diffusion_model").value;
	var FirstModel = 0;
	var currentModel = 0;
	
	var modelList = document.querySelectorAll('#stable_diffusion_model option');
	var modelStatus = null;
	var allModels = [];
	var disabledModels = [];
	var availableModels = [];
	var favModels = [];
	
	
	console.log('*** Getting list of models ***');
	modLoadModels();
	//console.log(allModels);
		
	var ModelSettings = {
		ModelButton1: 'fa-solid fa-fast-backward', 				// First
		ModelButton2: 'fa-solid fa-angle-left', 				// Previous
		ModelButton3: 'fa-solid fa-angle-right', 				// Next
		ModelButton4: 'fa-solid fa-fast-forward',				// Last
		ModelButton5: 'fa-solid fa-restroom',					// Random
		ModelButton6: 'fa-solid fa-border-none'					// Grid
	};
		
	PLUGINS['IMAGE_INFO_BUTTONS'].push([
		{ html: '<span class="modeladjust-label" style="background-color:transparent;background: rgba(0,0,0,0.5)">Model:</span>', type: 'label', on_click: onModelAdjustClick},
		{ html: '<div title = "Use First Model in dropdown list"><i class="' + ModelSettings.ModelButton1 + '"></i></div>', on_click: onModelFirst},
		{ html: '<div title = "Use Previous Model in dropdown list"><i class="' + ModelSettings.ModelButton2 + '"></i></div>', on_click: onModelPrev},
		{ html: '<div title = "Use Next Model in dropdown list"><i class="' + ModelSettings.ModelButton3 + '"></i></div>', on_click: onModelNext},
		{ html: '<div title = "Use Last Model in dropdown list"><i class="' + ModelSettings.ModelButton4 + '"></i></div>', on_click: onModelLast},
		{ html: '<div title = "Use a random Model"><i class="' + ModelSettings.ModelButton5 + '"></i></div>', on_click: onModelRandom},
		{ html: '<div title = "Use Favorites"><i class="' + ModelSettings.ModelButton6 + '"></i></div>', on_click: onModelFavorites}
	])
	
	
	function getFavModels() {
		return async function(event) {
			//console.log('Getting Fav Models');
			getFavModelFile();
		}
	}
	
	
	
	function onModelAdjustClick(origRequest, image) {
		//console.log("**Model Adjust Clicked**");
	}
	
	function getFavModelFile() {
		//console.log('Transferring control');
		favModelBrowser.click();
		//console.log('Got Files');
	}
		
	function setFavModels() {
		//console.log('Setting Fav Models');
		const curFiles = favModelBrowser.files;
		//console.log(curFiles);
		if (curFiles.length === 0) {
			//console.log('Empty');
			showToast('Favorite Model list is empty')
			return;
		}
		var tempFile=null;
		favModels = [];
		for (const file of curFiles) {
			tempFile = file.name;
			tempFile=tempFile.substring(0, tempFile.lastIndexOf('.')); 
			favModels.push(tempFile);
		}
		showToast('Favorite Model list has been created');
	}

	
	function onModelFirst(origRequest,image) {
		FirstModel = 0;
		modelSelected = document.getElementById("stable_diffusion_model").value;
		currentModel = origRequest.use_stable_diffusion_model;
		var dummyArray1 = [];
		var dummyArray2 = [];
		dummyArray1.push(currentModel);
		allModels.forEach((item, index) => {
			if(dummyArray1.includes(item)){
				dummyArray2.push(index)
			}
		})
		switch (dummyArray2[0]) {
			case FirstModel:
				console.log('Already at first Model');
				break;
			default:
				displayImage(origRequest,image,FirstModel);
				break;
		}
		
		
	}
	
	function onModelPrev(origRequest,image) {
		FirstModel = 0;
		modelSelected = document.getElementById("stable_diffusion_model").value;
		currentModel = origRequest.use_stable_diffusion_model;
		var dummyArray1 = [];
		var dummyArray2 = [];
		dummyArray1.push(currentModel);
		allModels.forEach((item, index) => {
			if(dummyArray1.includes(item)){
				dummyArray2.push(index)
			}
		})
		switch (dummyArray2[0]) {
			case FirstModel:
				console.log('Already at first Model');
				break;
			default:
				FirstModel = dummyArray2[0] -1;
				displayImage(origRequest,image,FirstModel);
				break;
		}
	}
	
	function onModelNext(origRequest,image) {
		FirstModel =  (allModels.length) - 1;
		modelSelected = document.getElementById("stable_diffusion_model").value;
		currentModel = origRequest.use_stable_diffusion_model;
		var dummyArray1 = [];
		var dummyArray2 = [];
		dummyArray1.push(currentModel);
		allModels.forEach((item, index) => {
			if(dummyArray1.includes(item)){
				dummyArray2.push(index)
			}
		})
		switch (dummyArray2[0]) {
			case FirstModel:
				console.log('Already at last Model');
				break;
			default:
				FirstModel = dummyArray2[0] +1;
				displayImage(origRequest,image,FirstModel);
				break;
		}
	}
	
	function onModelLast(origRequest,image) {
		FirstModel =  (allModels.length) - 1;
		modelSelected = document.getElementById("stable_diffusion_model").value;
		currentModel = origRequest.use_stable_diffusion_model;
		var dummyArray1 = [];
		var dummyArray2 = [];
		dummyArray1.push(currentModel);
		allModels.forEach((item, index) => {
			if(dummyArray1.includes(item)){
				dummyArray2.push(index)
			}
		})
		switch (dummyArray2[0]) {
			case FirstModel:
				console.log('Already at last Model');
				break;
			default:
				displayImage(origRequest,image,FirstModel);
				break;
		}
	}
	
	function onModelRandom(origRequest,image) {
		FirstModel =  (allModels.length);
		const randomModel = (Math.floor(Math.random() * FirstModel) - 1);
		showToast('Switching temporarily to the ' + allModels[randomModel] + ' model');
		displayImage(origRequest,image,randomModel);
		//if (confirm('Are you sure you want to switch to the ' + allModels[randomModel] + ' model?')) {
		//	displayImage(origRequest,image,randomModel);
		//} else {
		//	console.log('User chose not to switch.');
		//}
	}
	
	
	async function modLoadModels() {
		try {
			let res = await fetch('/get/models')
			const getmymodels = await res.json()
			let mymodelOptions = getmymodels['options']
			let mystableDiffusionOptions = mymodelOptions['stable-diffusion']
			mystableDiffusionOptions.forEach(modelName => {
				if(Array.isArray(modelName)){
					modelName[1].forEach(subModel => {
						allModels.push(modelName[0]+"/"+subModel);
					})
				} else {
					allModels.push(modelName);
				}
			})
			} catch (e) {
			console.log('get models error', e)
		}
	}
	
	
	
	function displayImage(origRequest,image,indexCount) {
		console.log('Changing to ' + allModels[indexCount]);
		document.getElementById("stable_diffusion_model").value = allModels[indexCount];
		document.getElementById("stable_diffusion_model").setAttribute("data-path", allModels[indexCount]);
		const taskTemplate = getCurrentUserRequest();
		taskTemplate.reqBody.use_stable_diffusion_model = allModels[indexCount];
		const newTaskRequests = getPrompts().map((prompt) => Object.assign({}, taskTemplate, {
			reqBody: Object.assign({ prompt: prompt }, taskTemplate.reqBody)
			}))
        newTaskRequests.forEach(createTask);
	}
	
	function onModelFavorites(origRequest,image) {
		//console.log('Favourites Grid');
		if (favModels.length == 0) {
			showToast ('Please define your favorite models first');
			return;
		}
		//console.log(favModels);
		var dummyModel = null;
		var dummyIndex = 0;
		favModels.forEach((item, index) => {
			dummyModel = item;
			showToast('Switching to ' + dummyModel);
			displayGrid(origRequest,image,dummyModel);
		})
	}
	
	function displayGrid(origRequest,image,dummyModel) {
		console.log('Switching to ' + dummyModel);
		document.getElementById("stable_diffusion_model").value = dummyModel;
		document.getElementById("stable_diffusion_model").setAttribute("data-path", dummyModel);
		const taskTemplate = getCurrentUserRequest();
		taskTemplate.reqBody.use_stable_diffusion_model = dummyModel;
		const newTaskRequests = getPrompts().map((prompt) => Object.assign({}, taskTemplate, {
			reqBody: Object.assign({ prompt: prompt }, taskTemplate.reqBody)
			}))
        newTaskRequests.forEach(createTask);
		
	}
	
	
	
})();