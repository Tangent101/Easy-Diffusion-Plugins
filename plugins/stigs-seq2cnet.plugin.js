/**
 * Sequence to ControlNet Utility
 * v.1.1.1, last updated: 15/08/2023
 * By The Stig
 * 
 * 
 *
 * Free to use with the CMDR2 Stable Diffusion UI.
 *  
 */
(function() { "use strict"
    const VERSION = "1.1.1";
    const ID_PREFIX = "TheStig-Seq2CNet-plugin";
    console.log('%s Embed Metadata Version: %s', ID_PREFIX, VERSION);
	
	injectLoaderCSS();
	let file_list = [];
    let fileRead = [];
	let reader = new FileReader()
	
	var baseImage = document.getElementById("control_image");
    const editorInputs = document.getElementById("editor-inputs");
	document.getElementById('editor-inputs-init-image').insertAdjacentHTML('beforeend', `
        <label class="${ID_PREFIX}-sequence-label">Sequence to ControlNet</label>
        <button id="${ID_PREFIX}-upload-sequence-btn" type="button" class="${ID_PREFIX}-seq-btn-primary"><i class="fa fa-photo-film"></i> Select an image sequence<input type="file" id="sequence-file-selector" accept="image/*" multiple class="${ID_PREFIX}-seq-file-input"></button>
		<button id="${ID_PREFIX}-upload-anim-btn" type="button" class="${ID_PREFIX}-seq-btn-primary"><i class="fa fa-photo-film"></i> Select an animation<input type="file" id="anim-file-selector" accept="image/gif" single class="${ID_PREFIX}-seq-file-input"></button>`
		);
	
	
	const fileSelector = document.getElementById(`${ID_PREFIX}-upload-sequence-btn`);
	const fileSelector2 = document.getElementById(`${ID_PREFIX}-upload-anim-btn`);
	
	fileSelector2.style.display='none'; 			// Disable animation loader for now
	
	fileSelector.addEventListener('click', function() {
		file_list = [];
		fileRead = [];
       document.getElementById('sequence-file-selector').click();
    });
	
	fileSelector2.addEventListener('click', function() {
		file_list = [];
		fileRead = [];
       document.getElementById('anim-file-selector').click();
    });
	
	document.getElementById('sequence-file-selector').addEventListener('change', async (e) => {
		if (e.target.files && e.target.files[0]) {
			console.log('Processing image sequence');
			let files = Array.from(event.target.files).map(file => {
				let reader = new FileReader();
				return new Promise(resolve => {
					reader.onload = () => resolve(reader.result);
					reader.readAsDataURL(file);
				})
			})
			let res = await Promise.all(files);
			processSequence(res);
				
		} else {
			console.log('Sequence cancelled');
		}
	})
	
	document.getElementById('anim-file-selector').addEventListener('change', async (e) => {
		if (e.target.files && e.target.files[0]) {
			console.log('Processing animation');
			let files = Array.from(event.target.files).map(file => {
				let reader = new FileReader();
				return new Promise(resolve => {
					reader.onload = () => resolve(reader.result);
					reader.readAsDataURL(file);
				})
			})
			let res = await Promise.all(files);
			processAnim(res);
		}
	})
	
	
	
	
	function injectLoaderCSS() {
        const css = `
            .${ID_PREFIX}-sequence-label {
                display: block;
                margin-top: 8px;
            }
			.${ID_PREFIX}-seq-primaryButton {
                margin-left: 8px;
                flex-basis: auto;
                display: none;
            }
			.${ID_PREFIX}-seq-btn-primary {
                display: block;
                margin: 8px;
                padding: 4px 16px 4px 16px;
            }
			.${ID_PREFIX}-seq-file-input {
                display: none;
            }
			`;
		const styleElement = document.createElement('style');
        styleElement.appendChild(document.createTextNode(css));
        document.head.appendChild(styleElement);
    }
	
	function processSequence(filesArray) {
		const fileCount = filesArray.length 
		const taskTemplate = getCurrentUserRequest();
		console.log('Processing ' + fileCount + ' images.');
		for (var i=0; i<fileCount; i++){
			taskTemplate.reqBody.control_image = filesArray[i];
			var newTaskRequests = getPrompts().map((prompt) => Object.assign({}, taskTemplate, {
				reqBody: Object.assign({ prompt: prompt }, taskTemplate.reqBody)
				}))
			newTaskRequests.forEach(createTask);
		}	
	}
	
	function processAnim(filesArray) {
		const fileCount = filesArray.length 
		const taskTemplate = getCurrentUserRequest();
		console.log('Processing ' + fileCount + ' animation.');
		for (var i=0; i<fileCount; i++){
			taskTemplate.reqBody.control_image = filesArray[i];
			var newTaskRequests = getPrompts().map((prompt) => Object.assign({}, taskTemplate, {
				reqBody: Object.assign({ prompt: prompt }, taskTemplate.reqBody)
				}))
			newTaskRequests.forEach(createTask);
		}
			
	}

})();
