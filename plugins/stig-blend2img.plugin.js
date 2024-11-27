/**
 * Blend2Img Plugin
 * v.1.1, last updated: 08/01/2024
 * By The Stig
 *
 * Change Log
 * 08/01/2024 Added Cancel Batch function (user request)
 * 27/12/2023 Set Default State to Closed
 * 20/12/2023 Added Wildcard function
 * 16/12/2023 Added img2img function
 * 13/12/2023 Added ability to reverse the automation
 * 13/12/2023 Added Hover-over tooltips
 * 13/12/2023 Bug fix for expanding text boxes
 * 09/12/2023 Added Automation function
 * 08/12/2023 Initial Build
 *
 * Free to use with the CMDR2 Stable Diffusion UI.
 *  
 */
(function() { "use strict"
    const VERSION = "1.1";
    const ID_PREFIX = "TheStig-Blend2Img-plugin";
    console.log('%s Embed Metadata Version: %s', ID_PREFIX, VERSION);
	
	var BlendStrength1 = 0;
	var BlendStrength2 = 0;
	var defaultBlendStrength1 = 0;
	var defaultBlendStrength2 = 100;
	
	var currentBlend1 = 0;
	var currentBlend2 = 0;
	
	var startBlend = 0;
	var stopBlend = 0;
	var stepBlend=0;
	
	var myCount = 0;
	var myTarget = 0;
	
	var defaultBlendPrompt1 = "An Astronaught riding a horse";
	var defaultBlendPrompt2 = "An Astronaught riding a motorbike";
	var currBlendPrompt1 = "";
	var currBlendPrompt2 = "";
	
	var forwardBlend = true;
	var blendFlag = false;
	var overlayFlag = false;
	
	var SwitchStatus = false;
	var defaultTimeOut= 400;
	var flashTime = 2000;
	var ReadyStatusFlag = false;
	
	var cancelBlend = false;
	
	injectLoaderCSS();
	addBlend2ImgOptions();
	
	
	function injectLoaderCSS() {
		console.log('** Inject CSS **');
		const style = document.createElement('style');
		style.textContent = `
			.Blend2Img1 {
				background-color:#13750d;
			}
			.Blend2Img2 {
				background-color:#2168bf;
			}
			.Blend2Img3 {
				background-color:#840800;
			}
			.inputWidth {
				width:280px;
				min-width: 280px;
				max-width: 280px ;
				overflow: hidden;
			}
			.labelWidth {
				width:64px  !important;
				display: inline-block;
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
			.slidecontainer {
				width: 100%;
			}

			.slider {
				-webkit-appearance: none;
				width: 100%;
				height: 25px;
				background: #d3d3d3;
				outline: none;
				opacity: 0.7;
				-webkit-transition: .2s;
				transition: opacity .2s;
			}

			.slider:hover {
				opacity: 1;
			}

			.slider::-webkit-slider-thumb {
				-webkit-appearance: none;
				appearance: none;
				width: 25px;
				height: 25px;
				background: #04AA6D;
				cursor: pointer;
			}

			.slider::-moz-range-thumb {
				width: 25px;
				height: 25px;
				background: #04AA6D;
				cursor: pointer;
			}
			
			.b2iswitch {
				position: relative;
				display: inline-block;
				width: 60px;
				height: 34px;
			}

		`;
		document.head.appendChild(style);
	}
	
	function addBlend2ImgOptions() {
		console.log('Add Blend2Img Settings');
		var openCheckBlend2Img = '';
		//openCheckBlend2Img = ' active';
		var Blend2ImgSettings = document.createElement('div');
		Blend2ImgSettings.id = 'Blend2Imge-settings';
		Blend2ImgSettings.classList.add('panel-box');
		let tempHTML = `
			<h4 class="collapsible `+ openCheckBlend2Img +`">Blend2Img</h4>
			<div id="Blend2Img-settings-entries" class="collapsible-content" style="display: block;margin-top:15px;">
				<p></p>
				
				
				<label for="Blend2ImgPrompt1">Prompt #1:</label>
				<br>
				<textarea class="txtBox2" title="Enter your text here for Prompt #1" id="Blend2ImgPrompt1" name="Blend2ImgPrompt1" rows="2" cols="60"></textarea>
				<p></p>
				
				<label for="Blend2ImgPrompt1Slider">Prompt #1 Strength:</label>
				<br>
				<input type="range" title="Prompt #1 strength" style="width:400px" value="25" max="100" min="0" step="1" id="Blend2ImgPrompt1Slider">
				<br>
				<input readonly type="number" title="Prompt #1 strength" id="BlendVal1" name="BlendVal1" />
				<button style="background-color:#2168bf" type="button" title="Reduce Prompt #1 strength" id="ReduceBlendStr1" <i class="fas fa-minus"></i></button>
				<button style="background-color:#2168bf" type="button" title="Increase Prompt #1 strength" id="IncreaseBlendStr1" <i class="fas fa-plus"></i></button>
				<button style="background-color:#2168bf" type="button" title="Reset Prompt #1 strength" id="ResetBlendStr1" <i class="fas fa-undo"></i></button>
				<p></p>
				
				<p></p>
				
				<label for="Blend2ImgPrompt2">Prompt #2:</label>
				<br>
				<textarea class="txtBox2" title="Enter your text here for Prompt #2" id="Blend2ImgPrompt2" name="Blend2ImgPrompt2" rows="2" cols="60"></textarea>
				<p></p>
				<label for="Blend2ImgPrompt2Slider">Prompt #2 Strength:</label>
				<br>
				<input type="range" title="Prompt #2 strength" style="width:400px" value="75" max="100" min="0" step="1" id="Blend2ImgPrompt2Slider">
				<br>
				<input readonly type="number" title="Prompt #2 strength" id="BlendVal2" name="BlendVal2" />
				<button style="background-color:#2168bf" type="button" title="Reduce Prompt #2 strength" id="ReduceBlendStr2" <i class="fas fa-minus"></i></button>
				<button style="background-color:#2168bf" type="button" title="Increase Prompt #2 strength" id="IncreaseBlendStr2" <i class="fas fa-plus"></i></button>
				<button style="background-color:#2168bf" type="button" title="Reset Prompt #2 strength" id="ResetBlendStr2" <i class="fas fa-undo"></i></button>
				<p></p>
				<p></p>
				<button class = "Blend2Img1" title="Blend the two prompts" type="button" id="BlendPrompts">Blend Prompts</button>
				<p></p>
				<label for="Blend2ImgPrompt3">Combined Prompt:</label>
				<br>
				<textarea readonly class="txtBox2" title="Combined prompts for blending (un-editable)" id="Blend2ImgPrompt3" name="Blend2ImgPrompt3" rows="6" cols="60"></textarea>
				<p></p>
				<button class = "Blend2Img2" title="Create a new blended image" type="button" id="createBlend">Create New Blended Image</button>
				<p></p>
				
				<p></p>
				<label for="GetWildcardPrompts">Random prompts from Wildcard plugin</label>
				<br>
				<button class = "Blend2Img1" title="Get random prompts from Wildcard plugin" type="button" id="GetWildcardPrompts">Get Random prompts</button>
				<p></p>
				
				<label for="Blend2ImgCount">Automated Blend Step:</label>
				<input type="number" title="Set the number of steps for automation" id="Blend2ImgCount" value="5" min="0" step="1" name="Blend2ImgCount" />
				<p></p>
				<div class="sliderwrapper">
					<label style="display:inline" title="Set img2img On/Off" class="b2iswitch">Use as img2img source</label>
					<label class="b2iswitch">
						<input type="checkbox" title="Set img2img On/Off" id="blend2imgSource">
						<!-- <span class="slider round"> title="Set img2img On/Off"</span> -->
						</label>
				</div>
				

				<p></p>
				<button class = "Blend2Img2" title="Automate the blend using the number of steps" type="button" id="createBlendAutomation">Automate Batch Blend</button>
				<p></p>
				
				<button class = "Blend2Img3" title="Cancel the current batch" type="button" id="Blend2ImgCancel">Cancel Batch Blend</button>
				<p></p>
			</div>
			`;
		Blend2ImgSettings.innerHTML = tempHTML;
		var editorSettings = document.getElementById('editor-settings');
		editorSettings.parentNode.insertBefore(Blend2ImgSettings, editorSettings.nextSibling);
		createCollapsibles(Blend2ImgSettings);
		
		document.getElementById ("GetWildcardPrompts").addEventListener ("click", GetWildcardPrompts, false);
		
		
		document.getElementById ("Blend2ImgPrompt1Slider").addEventListener ("change", UpdateBlend1, false);
		document.getElementById ("Blend2ImgPrompt2Slider").addEventListener ("change", UpdateBlend2, false);
		
		document.getElementById ("IncreaseBlendStr1").addEventListener ("click", IncreaseBlendStr1, false);
		document.getElementById ("ReduceBlendStr1").addEventListener ("click", ReduceBlendStr1, false);
		document.getElementById ("ResetBlendStr1").addEventListener ("click", ResetBlendStr1, false);
		
		document.getElementById ("ReduceBlendStr2").addEventListener ("click", ReduceBlendStr2, false);
		document.getElementById ("IncreaseBlendStr2").addEventListener ("click", IncreaseBlendStr2, false);
		document.getElementById ("ResetBlendStr2").addEventListener ("click", ResetBlendStr2, false);
		
		
		document.getElementById ("BlendPrompts").addEventListener ("click", BlendPrompts, false);
		
		document.getElementById ("createBlend").addEventListener ("click", createBlend, false);
		document.getElementById ("createBlendAutomation").addEventListener ("click", BlendAutomationOptions, false);
		
		document.getElementById ("Blend2ImgPrompt1").value = defaultBlendPrompt1;
		document.getElementById ("Blend2ImgPrompt2").value = defaultBlendPrompt2;
		
		document.getElementById("blend2imgSource").checked = SwitchStatus;
		
		document.getElementById ("Blend2ImgPrompt1Slider").value = defaultBlendStrength1;
		document.getElementById ("Blend2ImgPrompt2Slider").value = defaultBlendStrength2;
		
		document.getElementById ("Blend2ImgCancel").addEventListener ("click", Blend2ImgCancel, false);
		
		UpdateBlend1();
		UpdateBlend2();
		
	}
	
	function Blend2ImgCancel() {
		cancelBlend = true;
		console.log('Stopping Batch');
	}
	
	
	function ResetBlendStr1() {
		document.getElementById ("Blend2ImgPrompt1Slider").value=defaultBlendStrength1;
		UpdateBlend1();
	}
	
	function ResetBlendStr2() {
		document.getElementById ("Blend2ImgPrompt2Slider").value=defaultBlendStrength2;
		UpdateBlend2();
	}
	
	
	
	function IncreaseBlendStr1() {
		BlendStrength1 = Number(document.getElementById ("Blend2ImgPrompt1Slider").value);
		if (BlendStrength1 < 100 ) {
			BlendStrength1 ++;
			document.getElementById ("Blend2ImgPrompt1Slider").value = BlendStrength1;
			UpdateBlend1();
		}
	}
	
	function IncreaseBlendStr2() {
		BlendStrength2 = Number(document.getElementById ("Blend2ImgPrompt2Slider").value);
		if (BlendStrength2 < 100 ) {
			BlendStrength2 ++;
			document.getElementById ("Blend2ImgPrompt2Slider").value = BlendStrength2;
			UpdateBlend2();
		}
	}
	
	
	function ReduceBlendStr1() {
		BlendStrength1 = Number(document.getElementById ("Blend2ImgPrompt1Slider").value);
		if (BlendStrength1 > 0 ) {
			BlendStrength1 = BlendStrength1 - 1;
			document.getElementById ("Blend2ImgPrompt1Slider").value = BlendStrength1;
			UpdateBlend1();
		}
	}
	
	function ReduceBlendStr2() {
		BlendStrength2 = Number(document.getElementById ("Blend2ImgPrompt2Slider").value);
		if (BlendStrength2 > 0 ) {
			BlendStrength2 = BlendStrength2 - 1;
			document.getElementById ("Blend2ImgPrompt2Slider").value = BlendStrength2;
			UpdateBlend2();
		}
	}
	
	
	
	
	
	function BlendPrompts() {
		console.log('Blending Prompts');
		currBlendPrompt1 = document.getElementById ("Blend2ImgPrompt1").value;
		currBlendPrompt2 = document.getElementById ("Blend2ImgPrompt2").value;
		BlendStrength1 = Number(document.getElementById ("Blend2ImgPrompt1Slider").value);
		BlendStrength2 = Number(document.getElementById ("Blend2ImgPrompt2Slider").value);
		
		blendFlag = false;
		
		switch (currBlendPrompt1) {
			case null:
				return;
				break;
			default:
				break;
		}
		switch (currBlendPrompt2) {
			case null:
				return;
				break;
			default:
				break;
		}
		blendFlag = true;
		var TempBlendPrompt = '(\"' + currBlendPrompt1 + '\",\"' + currBlendPrompt2 + '\")';
		var TempBlendStr=".blend(" + (BlendStrength1)/100 + "," + (BlendStrength2)/100 + ")";
		console.log(TempBlendPrompt);
		console.log(TempBlendStr);
		document.getElementById ("Blend2ImgPrompt3").value = TempBlendPrompt + TempBlendStr;
		promptField.value = document.getElementById ("Blend2ImgPrompt3").value;
		
	}
	
	function createBlend() {
		switch (blendFlag) {
			case false:
				return;
				break;
			default:
				document.getElementById("makeImage").click();
				break;
		}
	}
	
	function UpdateBlend1() {
		document.getElementById ("BlendVal1").value = Number(document.getElementById ("Blend2ImgPrompt1Slider").value);
	}
	
	function UpdateBlend2() {
		document.getElementById ("BlendVal2").value = Number(document.getElementById ("Blend2ImgPrompt2Slider").value);
	}
	
	
	
	function BlendAutomationOptions() {
		cancelBlend = false;
		SwitchStatus = document.getElementById("blend2imgSource").checked;
		switch (SwitchStatus) {
			case false:
				normalBlendAutomation();
				break;
			case true:
				img2imgBlendAutomation();
				break;
			default:
				break;
		}
	}
	
	function normalBlendAutomation() {
		currBlendPrompt1 = document.getElementById ("Blend2ImgPrompt1").value;
		currBlendPrompt2 = document.getElementById ("Blend2ImgPrompt2").value;
		switch (currBlendPrompt1) {
			case null:
				return;
				break;
			default:
				break;
		}
		switch (currBlendPrompt2) {
			case null:
				return;
				break;
			default:
				break;
		}
		forwardBlend = true;
		blendFlag = true;
		
		startBlend = Number(document.getElementById ("Blend2ImgPrompt1Slider").value);
		stopBlend = Number(document.getElementById ("Blend2ImgPrompt2Slider").value);
		stepBlend = Number(document.getElementById ("Blend2ImgCount").value);
		
		currentBlend1 = startBlend;
		currentBlend2 = stopBlend;
		
		console.log('Start: ' + startBlend);
		console.log('End: ' + stopBlend);
		console.log('Step: ' + stepBlend);
		
		if (startBlend < stopBlend) {
			forwardBlend = true;
		} else if (startBlend > stopBlend) {
			forwardBlend = false;
		}
		console.log('Blend: ' + forwardBlend);
		switch (forwardBlend) {
			case true:
				console.log('Forward');
				do {
					document.getElementById ("Blend2ImgPrompt1Slider").value = currentBlend1;
					document.getElementById ("Blend2ImgPrompt2Slider").value = currentBlend2;
					UpdateBlend1();
					UpdateBlend2();
					BlendPrompts();
					document.getElementById("makeImage").click();
					currentBlend1 = currentBlend1 + stepBlend;
					if (currentBlend1 >100) {
						currentBlend1 = 100;
						break;
					}
					currentBlend2 = currentBlend2 - stepBlend;
					if (currentBlend2 < 0) {
						currentBlend2 = 0;
					}
				}
				while (currentBlend1 <= stopBlend);
				document.getElementById ("Blend2ImgPrompt1Slider").value = startBlend;
				document.getElementById ("Blend2ImgPrompt2Slider").value = stopBlend;
				UpdateBlend1();
				UpdateBlend2();
				break;
			case false:
				console.log('Reverse');
				do {
					document.getElementById ("Blend2ImgPrompt1Slider").value = currentBlend1;
					document.getElementById ("Blend2ImgPrompt2Slider").value = currentBlend2;
					UpdateBlend1();
					UpdateBlend2();
					BlendPrompts();
					document.getElementById("makeImage").click();
					currentBlend1 = currentBlend1 - stepBlend;
					if (currentBlend1 < 0) {
						currentBlend1 = 0;
						break;
					}
					currentBlend2 = currentBlend2 + stepBlend;
					if (currentBlend2 > 100) {
						currentBlend2 = 100;
					}
				}
				while (currentBlend1 >= stopBlend);
				document.getElementById ("Blend2ImgPrompt1Slider").value = startBlend;
				document.getElementById ("Blend2ImgPrompt2Slider").value = stopBlend;
				UpdateBlend1();
				UpdateBlend2();
				break;
		}	
	}
	
	
	function img2imgBlendAutomation() {
		currBlendPrompt1 = document.getElementById ("Blend2ImgPrompt1").value;
		currBlendPrompt2 = document.getElementById ("Blend2ImgPrompt2").value;
		switch (currBlendPrompt1) {
			case null:
				return;
				break;
			default:
				break;
		}
		switch (currBlendPrompt2) {
			case null:
				return;
				break;
			default:
				break;
		}
		forwardBlend = true;
		blendFlag = true;		
		
		startBlend = Number(document.getElementById ("Blend2ImgPrompt1Slider").value);
		stopBlend = Number(document.getElementById ("Blend2ImgPrompt2Slider").value);
		stepBlend = Number(document.getElementById ("Blend2ImgCount").value);
		
		currentBlend1 = startBlend;
		currentBlend2 = stopBlend;
		
		if (startBlend < stopBlend) {
			forwardBlend = true;
		} else if (startBlend > stopBlend) {
			forwardBlend = false;
		}
		myTarget = 0;
		myCount = 1;
		switch (forwardBlend) {
			case true:
				console.log('Forward Blend');
				myTarget = ((stopBlend - startBlend) / stepBlend)+1;
				break
			case false:
				console.log('Reverse Blend');
				myTarget = ((startBlend - stopBlend) / stepBlend)+1;
				break;
		}
		for (let i = 0; i < myTarget; i++) {
			checkTasks();
		}
	}
	
	function checkTasks() {
		switch (cancelBlend) {
			case true:
				return;
				break;
			case false:
				break;
		}
		let all_tasks = [...document.querySelectorAll("div .imageTaskContainer").entries()].map(c => htmlTaskMap.get(c[1]))
		let tasks_to_be_run = all_tasks.filter(task => task.isProcessing)
		let img_remaining_per_task = tasks_to_be_run.map(task => { return task.numOutputsTotal - Math.max(0, (task.instances || []).reduce((total, value) => {
			if (value.status === 'completed') {
				return total + 1
			} else {
				return total
			}
		}, 0) * task.reqBody.num_outputs) } )
		let img_remaining = img_remaining_per_task.reduce((total, value) => total + value, 0);
		if (img_remaining > 0) {
			//setTimeout(checkTasks, 100, img_remaining, 0)
			setTimeout(checkTasks, defaultTimeOut, img_remaining, 0)
		} else {
			checkimg2img();
			console.log('Starting next task');
			showToast('Rendering image ' + myCount + ' of ' + myTarget + '.', flashTime, true);
			document.getElementById ("Blend2ImgPrompt1Slider").value = currentBlend1;
			document.getElementById ("Blend2ImgPrompt2Slider").value = currentBlend2;
			UpdateBlend1();
			UpdateBlend2();
			BlendPrompts();
			document.getElementById("makeImage").click();
			myCount ++;
			switch (forwardBlend) {
				case true:
					currentBlend1 = currentBlend1 + stepBlend;
					currentBlend2 = currentBlend2 - stepBlend;
					break
				case false:
					currentBlend1 = currentBlend1 - stepBlend;
					currentBlend2 = currentBlend2 + stepBlend;
					break;
			}
		}
	}
	
	function checkimg2img() {
		let all_tasks = [...document.querySelectorAll("div .imageTaskContainer").entries()].map(c => htmlTaskMap.get(c[1]))
		let tasks_to_be_run = all_tasks.filter(task => task.isProcessing)
		let img_remaining_per_task = tasks_to_be_run.map(task => { return task.numOutputsTotal - Math.max(0, (task.instances || []).reduce((total, value) => {
			if (value.status === 'completed') {
				return total + 1
			} else {
				return total
			}
		}, 0) * task.reqBody.num_outputs) } )
		let img_remaining = img_remaining_per_task.reduce((total, value) => total + value, 0);
		if (img_remaining > 0) {
			setTimeout(checkimg2img, defaultTimeOut, img_remaining, 0)
		} else {
			console.log('Checking img2img');
		}
		var imgFoundFlag = false;
		var myTempImg = null;
		
		document.querySelectorAll(".imageTaskContainer").forEach((container) => {
			container.querySelectorAll(".imgContainer img").forEach((img) => {
				let imgItem = img.closest(".imgItem");
				if (imgItem.style.display === "none") {
					return
				}
				let req = imageRequest[img.dataset["imagecounter"]]
				switch (imgFoundFlag) {
					case false:
						myTempImg = imgItem.getElementsByTagName('img')[0];
						//console.log('Image: ' + myTempImg);
						imgFoundFlag= true;
						break;
					case true:
						break;
				}
			})
		})
		switch (imgFoundFlag) {
			case false:
				return;
				break;
			case true:
				//console.log('Image: ' + myTempImg);
				var imgWidth = (myTempImg.naturalWidth);
				var imgHeight =  (myTempImg.naturalHeight);
				var imgIntrinsicWidth = (myTempImg.width);
				var imgIntrinsicHeight = (myTempImg.height);
				var imgRenderedWidth =imgWidth;
				var imgRenderedHeight =imgHeight;
				var imgMaxHeight = 150;		
				var aspectRatio = imgWidth / imgHeight;
				const cnv = document.createElement('canvas');
				var ctx = cnv.getContext('2d', { willReadFrequently: true });
				//const ctx = canvas.getContext('2d', { willReadFrequently: true });
				ctx.save();
				cnv.width = imgWidth;
				cnv.height = imgHeight; 
				ctx.drawImage(myTempImg, 0, 0, imgWidth, imgHeight) // cnv.width, cnv.height);
				ctx.restore();
				const image = cnv.toDataURL('image/png');
				switch (image.length) {
					case 0:
						console.log('Image Error');
						break;
					case 6:
						console.log('Image Error');
						break;
					default:
						document.getElementById("init_image_preview").setAttribute("src",image);	
						break;
				}
				//console.log(image);
				break;
		}
	}
	
	function GetWildcardPrompts() {
		console.log('Getting Random prompts');
		var txt2promptAvailable = false;
		if (document.getElementById("setFirstText2Prompt")){
			txt2promptAvailable = true;
		} else {
			txt2promptAvailable = false;
		};
		switch (txt2promptAvailable) {
			case false:
				return;
				break;
			case true:
				WildcardPromptClick();
				break;
		}
	}
	
	function WildcardPromptClick() {
		console.log('Clicking Wildcard');
		var availableWildcards = Number(document.getElementById("text2promptCount").value);
		switch (availableWildcards) {
			case 0:
				showToast('No Wildcard file loaded', flashTime, true);
				return;
				break;
			default:
				document.getElementById("setRandomText2Prompt").click();
				document.getElementById("setText2Prompt").click();
				document.getElementById("Blend2ImgPrompt1").value = document.getElementById("currText2Prompt").value;

				document.getElementById("setRandomText2Prompt").click();
				document.getElementById("setText2Prompt").click();
				document.getElementById("Blend2ImgPrompt2").value = document.getElementById("currText2Prompt").value;
				BlendPrompts();
				break;
		}
	}
	
})();
