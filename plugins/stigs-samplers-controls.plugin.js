/**
 * Samplers Shuttle Controls
 * v.1.2, last updated: 27/07/2023
 * By The Stig
 * 
 * 
 *
 * Free to use with the CMDR2 Stable Diffusion UI.
 *  
 */

(function() { "use strict"

	const VERSION = "1.2";
	const ID_PREFIX = "TheStig-Samplers Controls";
	console.log('%s The Stig - Samplers Controls Version: %s', ID_PREFIX, VERSION);
	
	var samplerSelected = document.getElementById("sampler_name").value;
	var FirstSampler = 0;
	var currentSampler = 0;
	var samplerStyle = null;
	
	var samplerList = document.querySelectorAll('#sampler_name option');
	//console.log('Samplers: ' + samplerList);
	//for (let i = 0; i < samplerList.length; i++) {
	//	console.log('Sampler: ' + (samplerList[i].value));
	//	samplerStyle = (samplerList[i].style.display);
	//	console.log('Style: ' + samplerStyle);
	//}
	
	var samplerStatus = null;
	var allSamplers = [];
	var disabledSamplers = [];
	var availableSamplers = [];
	
	//samplerList.forEach((samplerOption) => {
	//	samplerStatus = (samplerOption.disabled);
	//	allSamplers.push(samplerOption.value);
	//	disabledSamplers.push(samplerStatus);
	//	switch (samplerStatus) {
	//		case true:
	//			break;
	//		case false:
	//			allSamplers.push(samplerOption.value);
	//			availableSamplers.push(samplerOption.value);
	//			break;
	//		default:
	//			break;
	//	}
	//});
	
	for (let i = 0; i < samplerList.length; i++) {
		//console.log('Samplers: ' + samplerList);
		samplerStyle = (samplerList[i].style.display);
		switch (samplerStyle) {
			case 'none':
				console.log('Ignoring Sampler: ' +  samplerList[i].value);
				break;
			default:
				//console.log('Pushing: ' +  samplerList[i].value);
				allSamplers.push(samplerList[i].value);
				availableSamplers.push(samplerList[i].value);
				break;
		}
	}
			
		
		
	
	
	console.log('All Samplers: ' + allSamplers);
	console.log('Available: ' +  availableSamplers);
	var SamplerSettings = {
		SamplerButton1: 'fa-solid fa-fast-backward', 			// First
		SamplerButton2: 'fa-solid fa-angle-left', 				// Previous
		SamplerButton3: 'fa-solid fa-angle-right', 				// Next
		SamplerButton4: 'fa-solid fa-fast-forward',				// Last
		SamplerButton5: 'fa-solid fa-border-none'				// Grid
	};
		
	PLUGINS['IMAGE_INFO_BUTTONS'].push([
		{ html: '<span class="sampleradjust-label" style="background-color:transparent;background: rgba(0,0,0,0.5)">Sampler:</span>', type: 'label', on_click: onSamplerAdjustClick},
		{ html: '<div title = "Use First Sampler in dropdown list"><i class="' + SamplerSettings.SamplerButton1 + '"></i></div>', on_click: onSamplerFirst},
		{ html: '<div title = "Use Previous Sampler in dropdown list"><i class="' + SamplerSettings.SamplerButton2 + '"></i></div>', on_click: onSamplerPrev},
		{ html: '<div title = "Use Next Sampler in dropdown list"><i class="' + SamplerSettings.SamplerButton3 + '"></i></div>', on_click: onSamplerNext},
		{ html: '<div title = "Use Last Sampler in dropdown list"><i class="' + SamplerSettings.SamplerButton4 + '"></i></div>', on_click: onSamplerLast},
		{ html: '<div title = "Create grid using all available samplers"><i class="' + SamplerSettings.SamplerButton5 + '"></i></div>', on_click: onSamplerGrid}
	])
	
	
	
	function onSamplerAdjustClick(origRequest, image) {
		console.log("**Image Adjust Clicked**");
	}
	
	function onSamplerFirst(origRequest,image) {
		FirstSampler =  0;
		samplerSelected = document.getElementById("sampler_name").value;
		currentSampler = origRequest.sampler_name;
		var dummyArray1 = [];
		var dummyArray2 = [];
		dummyArray1.push(currentSampler);
		allSamplers.forEach((item, index) => {
			if(dummyArray1.includes(item)){
				dummyArray2.push(index)
			}
		})
		switch (dummyArray2[0]) {
			case FirstSampler:
				console.log('Already at first Sampler');
				break;
			default:
				displayImage(origRequest,image,FirstSampler);
				break;
		}
	}
	
	function onSamplerPrev(origRequest,image) {
		FirstSampler = 0;
		samplerSelected = document.getElementById("sampler_name").value;
		currentSampler = origRequest.sampler_name;
		var dummyArray1 = [];
		var dummyArray2 = [];
		dummyArray1.push(currentSampler);
		allSamplers.forEach((item, index) => {
			if(dummyArray1.includes(item)){
				dummyArray2.push(index)
			}
		})
		switch (dummyArray2[0]) {
			case FirstSampler:
				console.log('Already at first Sampler');
				break;
			default:
				FirstSampler = dummyArray2[0] -1;
				displayImage(origRequest,image,FirstSampler);
				break;
		}
	}
	
	function onSamplerNext(origRequest,image) {
		FirstSampler =  (allSamplers.length) - 1;
		samplerSelected = document.getElementById("sampler_name").value;
		currentSampler = origRequest.sampler_name;
		var dummyArray1 = [];
		var dummyArray2 = [];
		dummyArray1.push(currentSampler);
		allSamplers.forEach((item, index) => {
			if(dummyArray1.includes(item)){
				dummyArray2.push(index)
			}
		})
		switch (dummyArray2[0]) {
			case FirstSampler:
				console.log('Already at last Sampler');
				break;
			default:
				FirstSampler = dummyArray2[0] +1;
				displayImage(origRequest,image,FirstSampler);
				break;
		}
	}
	
	function onSamplerLast(origRequest,image) {
		FirstSampler =  (allSamplers.length) - 1;
		samplerSelected = document.getElementById("sampler_name").value;
		currentSampler = origRequest.sampler_name;
		var dummyArray1 = [];
		var dummyArray2 = [];
		dummyArray1.push(currentSampler);
		allSamplers.forEach((item, index) => {
			if(dummyArray1.includes(item)){
				dummyArray2.push(index)
			}
		})
		switch (dummyArray2[0]) {
			case FirstSampler:
				console.log('Already at last Sampler');
				break;
			default:
				displayImage(origRequest,image,FirstSampler);
				break;
		}
	}
	
	function onSamplerGrid(origRequest,image) {
		samplerSelected = document.getElementById("sampler_name").value;
		for (var indexCount=0; indexCount<allSamplers.length; indexCount++) {
			displayImage(origRequest,image,indexCount);
			}
		document.getElementById("sampler_name").value = samplerSelected;
	}
		
	function displayImage(origRequest,image,indexCount) {
		document.getElementById("sampler_name").value = allSamplers[indexCount];
		document.getElementById("makeImage").click();
	}
	
	
	
})();