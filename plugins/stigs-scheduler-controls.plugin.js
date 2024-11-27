/**
 * Scheduler Shuttle Controls
 * v.1.0, last updated: 24/11/2024
 * By The Stig
 * 
 * 
 *
 * Free to use with the CMDR2 Stable Diffusion UI.
 *  
 */

(function() { "use strict"

	const VERSION = "1.0";
	const ID_PREFIX = "TheStig-Scheduler Controls";
	console.log('%s The Stig - Scheduler Controls Version: %s', ID_PREFIX, VERSION);
	
	var schedulerSelected = document.getElementById("scheduler_name").value;
	var FirstScheduler = 0;
	var currentScheduler = 0;
	var schedulereStyle = null;
	
	var schedulerList = document.querySelectorAll('#scheduler_name option');
	//console.log('Scheduler: ' + schedulerList);
	//for (let i = 0; i < schedulerList.length; i++) {
	//	console.log('Scheduler: ' + (schedulerList[i].value));
	//	schedulerStyle = (schedulerList[i].style.display);
	//	console.log('Style: ' + schedulerStyle);
	//}
	
	var schedulerStatus = null;
	var allSchedulers = [];
	var disabledSchedulers = [];
	var availableSchedulers = [];
	
	//schedulerList.forEach((schedulerOption) => {
	//	schedulerStatus = (schedulerOption.disabled);
	//	allScheduler.push(schedulerOption.value);
	//	disabledScheduler.push(schedulerStatus);
	//	switch (schedulerStatus) {
	//		case true:
	//			break;
	//		case false:
	//			allSchedulers.push(schedulerOption.value);
	//			availableSchedulers.push(schedulerOption.value);
	//			break;
	//		default:
	//			break;
	//	}
	//});
	
	for (let i = 0; i < schedulerList.length; i++) {
		//console.log('Scheduler: ' + schedulerList);
		schedulereStyle = (schedulerList[i].style.display);
		switch (schedulereStyle) {
			case 'none':
				console.log('Ignoring Scheduler: ' +  schedulerList[i].value);
				break;
			default:
				//console.log('Pushing: ' +  schedulerList[i].value);
				allSchedulers.push(schedulerList[i].value);
				availableSchedulers.push(schedulerList[i].value);
				break;
		}
	}
			
		
		
	
	
	console.log('All Scheduler: ' + allSchedulers);
	console.log('Available: ' +  availableSchedulers);
	var SchedulerSettings = {
		SchedulerButton1: 'fa-solid fa-fast-backward', 			// First
		SchedulerButton2: 'fa-solid fa-angle-left', 				// Previous
		SchedulerButton3: 'fa-solid fa-angle-right', 				// Next
		SchedulerButton4: 'fa-solid fa-fast-forward',				// Last
		SchedulerButton5: 'fa-solid fa-border-none'				// Grid
	};
		
	PLUGINS['IMAGE_INFO_BUTTONS'].push([
		{ html: '<span class="scheduleradjust-label" style="background-color:transparent;background: rgba(0,0,0,0.5)">Scheduler:</span>', type: 'label', on_click: onSchedulerAdjustClick},
		{ html: '<div title = "Use First Scheduler in dropdown list"><i class="' + SchedulerSettings.SchedulerButton1 + '"></i></div>', on_click: onSchedulerFirst},
		{ html: '<div title = "Use Previous Scheduler in dropdown list"><i class="' + SchedulerSettings.SchedulerButton2 + '"></i></div>', on_click: onSchedulerPrev},
		{ html: '<div title = "Use Next Scheduler in dropdown list"><i class="' + SchedulerSettings.SchedulerButton3 + '"></i></div>', on_click: onSchedulerNext},
		{ html: '<div title = "Use Last Scheduler in dropdown list"><i class="' + SchedulerSettings.SchedulerButton4 + '"></i></div>', on_click: onSchedulerLast},
		{ html: '<div title = "Create grid using all available schedulers"><i class="' + SchedulerSettings.SchedulerButton5 + '"></i></div>', on_click: onSchedulerGrid}
	])
	
	
	
	function onSchedulerAdjustClick(origRequest, image) {
		console.log("**Image Adjust Clicked**");
	}
	
	function onSchedulerFirst(origRequest,image) {
		FirstScheduler =  0;
		schedulerSelected = document.getElementById("scheduler_name").value;
		currentScheduler = origRequest.scheduler_name;
		var dummyArray1 = [];
		var dummyArray2 = [];
		dummyArray1.push(currentScheduler);
		allSchedulers.forEach((item, index) => {
			if(dummyArray1.includes(item)){
				dummyArray2.push(index)
			}
		})
		switch (dummyArray2[0]) {
			case FirstScheduler:
				console.log('Already at first Scheduler');
				break;
			default:
				displayImage(origRequest,image,FirstScheduler);
				break;
		}
	}
	
	function onSchedulerPrev(origRequest,image) {
		FirstScheduler = 0;
		schedulerSelected = document.getElementById("scheduler_name").value;
		currentScheduler = origRequest.scheduler_name;
		var dummyArray1 = [];
		var dummyArray2 = [];
		dummyArray1.push(currentScheduler);
		allSchedulers.forEach((item, index) => {
			if(dummyArray1.includes(item)){
				dummyArray2.push(index)
			}
		})
		switch (dummyArray2[0]) {
			case FirstScheduler:
				console.log('Already at first Scheduler');
				break;
			default:
				FirstScheduler = dummyArray2[0] -1;
				displayImage(origRequest,image,FirstScheduler);
				break;
		}
	}
	
	function onSchedulerNext(origRequest,image) {
		FirstScheduler =  (allSchedulers.length) - 1;
		schedulerSelected = document.getElementById("scheduler_name").value;
		currentScheduler = origRequest.scheduler_name;
		var dummyArray1 = [];
		var dummyArray2 = [];
		dummyArray1.push(currentScheduler);
		allSchedulers.forEach((item, index) => {
			if(dummyArray1.includes(item)){
				dummyArray2.push(index)
			}
		})
		switch (dummyArray2[0]) {
			case FirstScheduler:
				console.log('Already at last Scheduler');
				break;
			default:
				FirstScheduler = dummyArray2[0] +1;
				displayImage(origRequest,image,FirstScheduler);
				break;
		}
	}
	
	function onSchedulerLast(origRequest,image) {
		FirstScheduler =  (allSchedulers.length) - 1;
		schedulerSelected = document.getElementById("scheduler_name").value;
		currentScheduler = origRequest.scheduler_name;
		var dummyArray1 = [];
		var dummyArray2 = [];
		dummyArray1.push(currentScheduler);
		allSchedulers.forEach((item, index) => {
			if(dummyArray1.includes(item)){
				dummyArray2.push(index)
			}
		})
		switch (dummyArray2[0]) {
			case FirstScheduler:
				console.log('Already at last Scheduler');
				break;
			default:
				displayImage(origRequest,image,FirstScheduler);
				break;
		}
	}
	
	function onSchedulerGrid(origRequest,image) {
		schedulerSelected = document.getElementById("scheduler_name").value;
		for (var indexCount=0; indexCount<allSchedulers.length; indexCount++) {
			displayImage(origRequest,image,indexCount);
			}
		document.getElementById("scheduler_name").value = schedulerSelected;
	}
		
	function displayImage(origRequest,image,indexCount) {
		document.getElementById("scheduler_name").value = allSchedulers[indexCount];
		document.getElementById("makeImage").click();
	}
	
	
	
})();