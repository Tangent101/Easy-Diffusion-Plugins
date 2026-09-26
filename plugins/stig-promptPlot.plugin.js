/**
 * Prompt Modifier X/Y Matrix Grid Plugin
 * v.1.1, last updated: 30/08/2026
 * By The Stig
 *
 * Change Log 
 * 25/08/2026 Initial Beta Build
 * 26/08/2026 Added Stop Tasks button
 * 26/08/2026 Added async delay to avoid 'Native generation controls could not be mapped.' error
 * 28/08/2026 Added check for localstorage full
 * 30/08/2026 Improved the re-scaling function to reduce the blurring effect. 
 *
 * Free to use with CMDR2's Stable Diffusion / Easy Diffusion UI.
 *  
*/

/**
 * Block 1
 * Dynamic Text Box Row/Column Generator, Native prompt layout UI wrapper, 
 * and LocalStorage input value history retention with try...catch quota protection.
 */
(function() {
    "use strict";

    // 1. RETRIEVE STATE MEMORY: Pull setup numbers or default to a clean 3x3 matrix
    const savedCountX = parseInt(localStorage.getItem('ED_PromptGrid_CountX')) || 3;
    const savedCountY = parseInt(localStorage.getItem('ED_PromptGrid_CountY')) || 3;
    const savedWidth = localStorage.getItem('ED_PromptGrid_Saved_Width') || "512";

    const old = document.getElementById('prompt-automation-grid-panel');
    if (old) old.remove();

    const panel = document.createElement('div');
    panel.id = 'prompt-automation-grid-panel';
    panel.classList.add('panel-box'); 
    
    panel.innerHTML = `
        <h4 class="collapsible">Prompt Modifier X/Y Matrix Grid</h4>
        <div class="collapsible-content" style="display: block; margin-top:15px;">
            
            <!-- Axis Dimensions Inputs Row Layout -->
            <div style="display:flex; gap:10px; margin-bottom:15px;">
                <div style="flex:1;">
                    <label style="font-size:11px; font-weight:bold; color:var(--text-color);">X Modifiers (Cols):</label>
                    <input type="number" id="prompt-grid-count-x" min="1" max="10" value="${savedCountX}" style="width:100%; padding:4px; margin-top:4px;">
                </div>
                <div style="flex:1;">
                    <label style="font-size:11px; font-weight:bold; color:var(--text-color);">Y Modifiers (Rows):</label>
                    <input type="number" id="prompt-grid-count-y" min="1" max="10" value="${savedCountY}" style="width:100%; padding:4px; margin-top:4px;">
                </div>
            </div>

            <!-- Targeted Injection Zones for the Dynamic Textboxes -->
            <div style="margin-bottom:12px;">
                <label style="font-size:12px; font-weight:bold; color:var(--text-color);">X-Axis Modifiers (Appended text rows):</label>
                <div id="prompt-grid-container-x" style="display:flex; flex-direction:column; gap:4px; max-height:140px; overflow-y:auto; padding:6px; background:var(--background-color-secondary, #222); border:1px solid var(--border-color); border-radius:4px; margin-top:4px;"></div>
            </div>
            
            <div style="margin-bottom:15px;">
                <label style="font-size:12px; font-weight:bold; color:var(--text-color);">Y-Axis Modifiers (Appended text rows):</label>
                <div id="prompt-grid-container-y" style="display:flex; flex-direction:column; gap:4px; max-height:140px; overflow-y:auto; padding:6px; background:var(--background-color-secondary, #222); border:1px solid var(--border-color); border-radius:4px; margin-top:4px;"></div>
            </div>

            <div style="margin-bottom:15px;">
                <div style="display:flex; justify-content:between; align-items:center; margin-bottom:4px;">
                    <label style="font-size:12px; font-weight:bold; color:var(--text-color);">Preferred Image Cell Size:</label>
                    <span id="prompt-grid-slider-val" style="font-size:12px; font-weight:bold; color:var(--text-color); margin-left:auto;">${savedWidth}px</span>
                </div>
                <input type="range" id="prompt-grid-cell-width-slider" min="128" max="1024" step="64" value="${savedWidth}" style="width:100%; cursor:pointer;">
            </div>

            <!-- Side-by-Side Action Button Containers layout panel -->
            <div style="display:flex; gap:8px;">
                <button id="prompt-grid-execute-btn" class="primaryButton" style="flex:2; padding:10px; font-weight:bold;">Queue & Stitch Prompt Grid</button>
                <button id="prompt-grid-abort-btn" style="flex:1; padding:10px; font-weight:bold; background:#721c24; color:#f8d7da; border:1px solid #f5c6cb; border-radius:4px; display:none; cursor:pointer;">Stop</button>
            </div>
        </div>
    `;

    var editorSettings = document.getElementById('editor-settings') || document.getElementById('editor-inputs');
    if (editorSettings && editorSettings.parentNode) {
        editorSettings.parentNode.insertBefore(panel, editorSettings.nextSibling);
    } else {
        (document.getElementById('editor-inputs') || document.querySelector('.left-panel') || document.body).appendChild(panel);
    }

    if (typeof createCollapsibles === 'function') { createCollapsibles(panel); }

    // 2. DYNAMIC INPUT REBUILD ENGINE: Spawns the required number of text inputs
    const renderBoxes = () => {
        const numX = Math.min(Math.max(parseInt(document.getElementById('prompt-grid-count-x').value) || 1, 1), 10);
        const numY = Math.min(Math.max(parseInt(document.getElementById('prompt-grid-count-y').value) || 1, 1), 10);
        
        try {
            localStorage.setItem('ED_PromptGrid_CountX', numX);
            localStorage.setItem('ED_PromptGrid_CountY', numY);
        } catch (e) {
            console.warn("Grid dimensions memory save failed: Storage full.", e);
        }

        const containerX = document.getElementById('prompt-grid-container-x');
        const containerY = document.getElementById('prompt-grid-container-y');

        const oldXValues = Array.from(containerX.querySelectorAll('input')).map(i => i.value);
        const oldYValues = Array.from(containerY.querySelectorAll('input')).map(i => i.value);
        
        let storedX = [];
        let storedY = [];
        try {
            storedX = JSON.parse(localStorage.getItem('ED_PromptGrid_ValuesX')) || [];
            storedY = JSON.parse(localStorage.getItem('ED_PromptGrid_ValuesY')) || [];
        } catch (e) {
            console.warn("Grid contents memory read failed: Data corrupted or full.", e);
        }

        containerX.innerHTML = "";
        for (let i = 0; i < numX; i++) {
            const val = oldXValues[i] !== undefined ? oldXValues[i] : (storedX[i] || `Style X${i+1}`);
            containerX.innerHTML += `<input type="text" class="prompt-val-x" placeholder="e.g. Cinematic, Cyberpunk" value="${val}" style="padding:4px; font-size:12px;">`;
        }

        containerY.innerHTML = "";
        for (let i = 0; i < numY; i++) {
            const val = oldYValues[i] !== undefined ? oldYValues[i] : (storedY[i] || `Angle Y${i+1}`);
            containerY.innerHTML += `<input type="text" class="prompt-val-y" placeholder="e.g. Close-up, Wide shot" value="${val}" style="padding:4px; font-size:12px;">`;
        }
        saveInputValues();
    };

    // UPGRADED SAFETY MEMORY CONTROLLERS: Prevents "Quota Exceeded" crashes
    const saveInputValues = () => {
        const valsX = Array.from(document.querySelectorAll('.prompt-val-x')).map(i => i.value);
        const valsY = Array.from(document.querySelectorAll('.prompt-val-y')).map(i => i.value);
        try {
            localStorage.setItem('ED_PromptGrid_ValuesX', JSON.stringify(valsX));
            localStorage.setItem('ED_PromptGrid_ValuesY', JSON.stringify(valsY));
        } catch (error) {
            // Silently catches the DOMException so the plugin never freezes up on users with full memory
            console.warn("Storage allocation failed: Browser localStorage quota exceeded.", error);
        }
    };

    // Attach interaction watchers to inputs
    document.getElementById('prompt-grid-count-x').addEventListener('input', renderBoxes);
    document.getElementById('prompt-grid-count-y').addEventListener('input', renderBoxes);
    
    panel.addEventListener('input', (e) => {
        if (e.target.classList.contains('prompt-val-x') || e.target.classList.contains('prompt-val-y')) {
            saveInputValues();
        }
    });

    document.getElementById('prompt-grid-cell-width-slider').addEventListener('input', (e) => {
        document.getElementById('prompt-grid-slider-val').innerText = `${e.target.value}px`;
        try {
            localStorage.setItem('ED_PromptGrid_Saved_Width', e.target.value);
        } catch (error) {
            console.warn("Slider width memory save blocked: Quota exceeded.", error);
        }
    });

    document.getElementById('prompt-grid-abort-btn').addEventListener('click', () => {
        window.ED_PromptGrid_Aborted = true;
    });

    renderBoxes();



	
/**
 * Block 2
 * Extracts written input values, validates empty boxes, builds custom text modifier combinations,
 * and handles sequential prompt generation dispatches with lazy-load polling selector traps.
 */
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const loadImage = src => new Promise((res, rej) => {
        const img = new Image(); img.crossOrigin = "anonymous";
        img.onload = () => res(img); img.onerror = rej; img.src = src;
    });

    document.getElementById('prompt-grid-execute-btn').addEventListener('click', async () => {
        const chosenX = Array.from(document.querySelectorAll('.prompt-val-x')).map(i => {
            const rawVal = i.value.trim();
            return rawVal === "" ? "[None]" : rawVal;
        });
        const chosenY = Array.from(document.querySelectorAll('.prompt-val-y')).map(i => {
            const rawVal = i.value.trim();
            return rawVal === "" ? "[None]" : rawVal;
        });
        
        const targetCellWidth = parseInt(document.getElementById('prompt-grid-cell-width-slider').value) || 512;
        
        // --- ASYNCHRONOUS RETRY INTERFACE SCANNING POOL ---
        let promptInput = null;
        let genBtn = null;
        let mapAttempts = 0;

        while ((!genBtn || !promptInput) && mapAttempts < 10) {
            promptInput = document.getElementById('prompt') || document.querySelector('textarea[placeholder*="prompt"]');
            genBtn = document.getElementById('makeImageBtn') || 
                     document.getElementById('generateBtn') || 
                     document.querySelector('#render-button') ||
                     document.querySelector('#render-buttons button.primaryButton') ||
                     Array.from(document.querySelectorAll('button')).find(el => {
                         const txt = el.textContent.trim().toLowerCase();
                         return txt === 'make image' || txt === 'generate';
                     });
            if (!genBtn || !promptInput) {
                mapAttempts++;
                await delay(500); // Polling buffer delay loop
            }
        }

        if (!genBtn || !promptInput) return alert("Native generation controls could not be mapped. Please ensure the prompt text panel is fully visible.");
        // --------------------------------------------------

        const btn = document.getElementById('prompt-grid-execute-btn');
        btn.disabled = true; btn.style.opacity = "0.5";

        const abortBtn = document.getElementById('prompt-grid-abort-btn');
        window.ED_PromptGrid_Aborted = false;
        if (abortBtn) abortBtn.style.display = "block";

        const seedInput = document.getElementById('seed') || document.querySelector('input[name="seed"]');
        let seed = seedInput ? parseInt(seedInput.value) : -1;
        if (isNaN(seed) || seed === -1) seed = Math.floor(Math.random() * 10000000);
        if (seedInput) { seedInput.value = seed; seedInput.dispatchEvent(new Event('change', {bubbles:true})); }

        const origPrompt = promptInput.value;
        const total = chosenX.length * chosenY.length;
        const tasks = [];
        let count = 0;

        for (let y = 0; y < chosenY.length; y++) {
            for (let x = 0; x < chosenX.length; x++) {
                if (window.ED_PromptGrid_Aborted) break;

                count++;
                btn.innerText = `Queueing ${count}/${total}...`;
                const tag = `[XY-${seed}-${x}-${y}]`;
                
                let modificationString = "";
                if (chosenX[x] !== "[None]") modificationString += `, ${chosenX[x]}`;
                if (chosenY[y] !== "[None]") modificationString += `, ${chosenY[y]}`;
                
                promptInput.value = `${origPrompt}${modificationString} ${tag}`;
                promptInput.dispatchEvent(new Event('input', {bubbles:true}));
                tasks.push({ x, y, tag, src: null });
                
                genBtn.click();
                await delay(650);
            }
            if (window.ED_PromptGrid_Aborted) break;
        }
        promptInput.value = origPrompt; promptInput.dispatchEvent(new Event('input', {bubbles:true}));
	
	


        btn.innerText = "Waiting for images...";
        let taskProgressCounter = 0; 
        
        while (taskProgressCounter < total) {
            if (window.ED_PromptGrid_Aborted) break;

            await delay(2000);
            const cards = Array.from(document.querySelectorAll('.imgContainer, .preview-container, .result-item, .image-task, [class*="result"], [class*="output"]'));
            
            if (count > 0 && cards.length === 0) {
                window.ED_PromptGrid_Aborted = true;
                break;
            }

            for (let t of tasks) {
                if (t.src) continue;
                for (let c of cards) {
                    if ((c.innerText && c.innerText.includes(t.tag)) || (c.innerHTML && c.innerHTML.includes(t.tag))) {
                        const img = c.querySelector('img');
                        if (img && img.src && !img.src.includes('placeholder') && img.complete) {
                            t.src = img.src; 
                            taskProgressCounter++;
                            btn.innerText = `Rendered: ${taskProgressCounter}/${total}...`;
                        }
                    }
                }
            }
        }

        if (!window.ED_PromptGrid_Aborted) {
            btn.innerText = "Stitching Grid...";
            try {
                const first = await loadImage(tasks[0].src); 
                const scaleFactor = targetCellWidth / first.width;
                const w = targetCellWidth;
                const h = Math.round(first.height * scaleFactor);

                const truncateText = (text, maxLength = 22) => {
                    if (text.length <= maxLength) return text;
                    return text.substring(0, maxLength - 3) + "...";
                };

                const topM = 120, leftM = 240, pad = 15;     
                const canvas = document.createElement('canvas');
                canvas.width = leftM + (chosenX.length * (w + pad)) + 40;
                canvas.height = topM + (chosenY.length * (h + pad)) + 40;
                const ctx = canvas.getContext('2d');

                // Initial global smoothing kill switch
                ctx.imageSmoothingEnabled = false;
                ctx.mozImageSmoothingEnabled = false;
                ctx.webkitImageSmoothingEnabled = false;
                ctx.msImageSmoothingEnabled = false;

                ctx.fillStyle = "#111113"; ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#ffffff"; ctx.font = "bold 15px sans-serif"; 
                ctx.textBaseline = "top"; 

                ctx.textAlign = "center";
                chosenX.forEach((modText, i) => {
                    ctx.fillText(truncateText(modText, 25), leftM + (i * (w + pad)) + (w / 2), 50);
                });

                ctx.textAlign = "right"; 
                chosenY.forEach((modText, i) => {
                    ctx.fillText(truncateText(modText, 28), leftM - 35, topM + (i * (h + pad)) + (h / 2) - 8);
                });

                for (let t of tasks) {
                    const img = await loadImage(t.src);
                    
                    // RE-ENFORCE STATE LOCK INSIDE LOOP: Prevents caching blurriness
                    ctx.imageSmoothingEnabled = false;
                    ctx.mozImageSmoothingEnabled = false;
                    ctx.webkitImageSmoothingEnabled = false;
                    ctx.msImageSmoothingEnabled = false;
                    
                    ctx.drawImage(img, leftM + (t.x * (w + pad)), topM + (t.y * (h + pad)), w, h);
                }

                const dataUrl = canvas.toDataURL('image/png');
                const imageWindow = window.open();
                if (imageWindow) {
                    imageWindow.document.write(`
                        <html style="margin:0; padding:0; background:#111113; display:flex; justify-content:center; align-items:center;">
                            <head><title>Prompt Modifier Grid Result [Seed: ${seed}]</title></head>
                            <body style="margin:0; padding:20px;"><img src="${dataUrl}" style="max-width:100%; height:auto; box-shadow:0 10px 30px rgba(0,0,0,0.6); border-radius:6px;" /></body>
                        </html>
                    `);
                    imageWindow.document.close();
                } else { alert("Popup blocked! Please allow popups for this site."); }
            } catch(e) { console.error(e); alert("Stitching layout failed."); }
        } else {
            alert("Prompt matrix grid generation halted successfully.");
        }

        if (abortBtn) abortBtn.style.display = "none";
        btn.disabled = false; btn.style.opacity = "1"; btn.innerText = "Queue & Stitch Prompt Grid";
    });
})();
