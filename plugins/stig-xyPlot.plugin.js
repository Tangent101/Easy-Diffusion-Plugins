/**
 * Sampler/Scheduler X/Y Plot Matrix Plugin
 * v.1.1, last updated: 26/08/2026
 * By The Stig
 *
 * Change Log 
 * 25/08/2026 Initial Beta Build
 * 26/08/2026 Added Stop Tasks button
 * 26/08/2026 Added async delay to avoid 'Native generation controls could not be mapped.' error
*/

/**
 * Block 1
 * Restores your original stable UI grid layout panel and handles 
 * automatic localStorage user preference memory loads.
 */
(function() {
    "use strict";

    window.ED_SamplerGrid_Aborted = false;

    const nativeSamplerOptions = document.querySelectorAll('#sampler_name option');
    const nativeSchedulerOptions = document.querySelectorAll('#scheduler_name option');
    const samplers = [], schedulers = [];

    nativeSamplerOptions.forEach(opt => { if (opt.style.display !== 'none' && opt.value) samplers.push({ value: opt.value, text: opt.textContent.trim() }); });
    nativeSchedulerOptions.forEach(opt => { if (opt.style.display !== 'none' && opt.value) schedulers.push({ value: opt.value, text: opt.textContent.trim() }); });

    if (samplers.length === 0) samplers.push({ value: "Euler a", text: "Euler Ancestral" }, { value: "Euler", text: "Euler" });
    if (schedulers.length === 0) schedulers.push({ value: "Automatic", text: "Automatic / Normal" }, { value: "Karras", text: "Karras Curve" });

    let savedSamplers = [], savedSchedulers = [], savedWidth = "512";
    try {
        savedSamplers = JSON.parse(localStorage.getItem('ED_Grid_Saved_Samplers')) || [];
        savedSchedulers = JSON.parse(localStorage.getItem('ED_Grid_Saved_Schedulers')) || [];
        savedWidth = localStorage.getItem('ED_Grid_Saved_Width') || "512";
    } catch (e) { console.warn("Storage read bypassed.", e); }

    let xHtml = "";
    samplers.forEach((s, i) => {
        const safeId = s.value.replace(/[^a-zA-Z0-9]/g, '');
        xHtml += `<div style="margin-bottom:4px; display:flex; align-items:center; gap:6px;">
            <input type="checkbox" value="${s.value}" ${savedSamplers.includes(s.value) || (savedSamplers.length===0 && i<2) ? "checked" : ""} class="grid-check-x" id="gx-${safeId}">
            <label for="gx-${safeId}" style="font-size:12px; color:var(--text-color);">${s.text}</label>
        </div>`;
    });

    let yHtml = "";
    schedulers.forEach((sc, i) => {
        const safeId = sc.value.replace(/[^a-zA-Z0-9]/g, '');
        yHtml += `<div style="margin-bottom:4px; display:flex; align-items:center; gap:6px;">
            <input type="checkbox" value="${sc.value}" ${savedSchedulers.includes(sc.value) || (savedSchedulers.length===0 && i<2) ? "checked" : ""} class="grid-check-y" id="gy-${safeId}">
            <label for="gy-${safeId}" style="font-size:12px; color:var(--text-color);">${sc.text}</label>
        </div>`;
    });

    const old = document.getElementById('corrected-automation-grid-panel');
    if (old) old.remove();

    const panel = document.createElement('div');
    panel.id = 'corrected-automation-grid-panel';
    panel.classList.add('panel-box'); 
    panel.innerHTML = `
        <h4 class="collapsible">Sampler/Scheduler X/Y Matrix Grid</h4>
        <div class="collapsible-content" style="display: block; margin-top:15px;">
            <div style="margin-bottom:12px;"><label style="font-size:12px; font-weight:bold; color:var(--text-color);">X Axis: Samplers</label><div style="max-height:140px; overflow-y:auto; padding:6px; background:var(--background-color-secondary, #222); border:1px solid var(--border-color); border-radius:4px; margin-top:4px;">${xHtml}</div></div>
            <div style="margin-bottom:15px;"><label style="font-size:12px; font-weight:bold; color:var(--text-color);">Y Axis: Schedulers</label><div id="fp-grid-y" style="max-height:140px; overflow-y:auto; padding:6px; background:var(--background-color-secondary, #222); border:1px solid var(--border-color); border-radius:4px; margin-top:4px;">${yHtml}</div></div>
            <div style="margin-bottom:15px;">
                <div style="display:flex; justify-content:between; align-items:center; margin-bottom:4px;"><label style="font-size:12px; font-weight:bold; color:var(--text-color);">Preferred Image Cell Size:</label><span id="grid-slider-val" style="font-size:12px; font-weight:bold; color:var(--text-color); margin-left:auto;">${savedWidth}px</span></div>
                <input type="range" id="grid-cell-width-slider" min="128" max="1024" step="64" value="${savedWidth}" style="width:100%; cursor:pointer;">
            </div>
            <div style="display:flex; gap:8px;">
                <button id="grid-execute-btn" class="primaryButton" style="flex:2; padding:10px; font-weight:bold;">Queue & Stitch Grid</button>
                <button id="grid-abort-btn" style="flex:1; padding:10px; font-weight:bold; background:#721c24; color:#f8d7da; border:1px solid #f5c6cb; border-radius:4px; display:none; cursor:pointer;">Stop</button>
            </div>
        </div>
    `;

    var editorSettings = document.getElementById('editor-settings') || document.getElementById('editor-inputs');
    if (editorSettings && editorSettings.parentNode) { editorSettings.parentNode.insertBefore(panel, editorSettings.nextSibling); }
    else { (document.getElementById('editor-inputs') || document.querySelector('.left-panel') || document.body).appendChild(panel); }

    if (typeof createCollapsibles === 'function') { createCollapsibles(panel); }

    document.querySelectorAll('.grid-check-x, .grid-check-y').forEach(el => {
        el.addEventListener('change', () => {
            const cx = Array.from(document.querySelectorAll('.grid-check-x:checked')).map(cb => cb.value);
            const cy = Array.from(document.querySelectorAll('.grid-check-y:checked')).map(cb => cb.value);
            try { localStorage.setItem('ED_Grid_Saved_Samplers', JSON.stringify(cx)); localStorage.setItem('ED_Grid_Saved_Schedulers', JSON.stringify(cy)); } catch(e){}
        });
    });

    document.getElementById('grid-cell-width-slider').addEventListener('input', (e) => {
        document.getElementById('grid-slider-val').innerText = `${e.target.value}px`;
        try { localStorage.setItem('ED_Grid_Saved_Width', e.target.value); } catch(error){}
    });

    document.getElementById('grid-abort-btn').addEventListener('click', () => { window.ED_SamplerGrid_Aborted = true; });

    const delay = ms => new Promise(res => setTimeout(res, ms));
    const loadImage = (src) => new Promise((res, rej) => {
        const img = new Image(); img.crossOrigin = "anonymous";
        img.onload = () => res(img); img.onerror = rej; img.src = src;
    });


/**
 * Block 2
 * Restores your original, reliable automation loop that dumps all 
 * 9 image tasks into the asynchronous workspace pool instantly.
 */
    document.getElementById('grid-execute-btn').addEventListener('click', async () => {
        const chosenX = Array.from(document.querySelectorAll('.grid-check-x:checked')).map(cb => cb.value);
        const chosenY = Array.from(document.querySelectorAll('.grid-check-y:checked')).map(cb => cb.value);
        if (!chosenX.length || !chosenY.length) return alert("Select options on both axes!");

        window.ED_SamplerGrid_Aborted = false;
        const abortBtn = document.getElementById('grid-abort-btn');
        if (abortBtn) abortBtn.style.display = "block";

        const targetCellWidth = parseInt(document.getElementById('grid-cell-width-slider').value) || 512;
        let promptInput = null, genBtn = null, mapAttempts = 0;

        while ((!genBtn || !promptInput) && mapAttempts < 10) {
            promptInput = document.getElementById('prompt') || document.querySelector('textarea[placeholder*="prompt"]');
            genBtn = document.getElementById('makeImageBtn') || document.getElementById('generateBtn') || document.querySelector('#render-button') || document.querySelector('#render-buttons button.primaryButton') || Array.from(document.querySelectorAll('button')).find(el => el.textContent.trim().toLowerCase() === 'make image');
            if (!genBtn || !promptInput) { mapAttempts++; await delay(500); }
        }

        if (!genBtn || !promptInput) return alert("Native generation controls could not be mapped.");

        const btn = document.getElementById('grid-execute-btn');
        btn.disabled = true; btn.style.opacity = "0.5";

        const seedInput = document.getElementById('seed') || document.querySelector('input[name="seed"]');
        const samplerSel = document.getElementById('sampler_name') || document.querySelector('select[name="sampler_name"]');
        const schedulerSel = document.getElementById('scheduler_name') || document.getElementById('scheduler') || document.querySelector('select[name="scheduler"]');

        let seed = seedInput ? parseInt(seedInput.value) : -1;
        if (isNaN(seed) || seed === -1) seed = Math.floor(Math.random() * 10000000);
        if (seedInput) { seedInput.value = seed; seedInput.dispatchEvent(new Event('change', {bubbles:true})); }

        const origPrompt = promptInput.value, total = chosenX.length * chosenY.length, tasks = [];
        let count = 0;

        for (let y = 0; y < chosenY.length; y++) {
            for (let x = 0; x < chosenX.length; x++) {
                if (window.ED_SamplerGrid_Aborted) break;

                count++;
                btn.innerText = `Queueing ${count}/${total}...`;
                const tag = `[XY-${seed}-${x}-${y}]`;
                
                if (samplerSel) { samplerSel.value = chosenX[x]; samplerSel.dispatchEvent(new Event('change', {bubbles:true})); }
                if (schedulerSel) { schedulerSel.value = chosenY[y]; schedulerSel.dispatchEvent(new Event('change', {bubbles:true})); }
                
                promptInput.value = `${origPrompt} ${tag}`;
                promptInput.dispatchEvent(new Event('input', {bubbles:true}));
                tasks.push({ x, y, tag, src: null });
                
                genBtn.click();
                await delay(650); 
            }
            if (window.ED_SamplerGrid_Aborted) break;
        }
        promptInput.value = origPrompt; promptInput.dispatchEvent(new Event('input', {bubbles:true}));


/**
 * Block 3
 * Restores the working baseline card tracking loop, adds your custom 
 * time-delay intermission to protect against loading lags, and applies loop-level pixel locks.
 */
        btn.innerText = "Waiting for images...";
        let taskProgressCounter = 0; 
        
        while (taskProgressCounter < total) {
            if (window.ED_SamplerGrid_Aborted) { break; }

            // YOUR CUSTOM TIME-DELAY INTERMISSION COUNTER: Pauses loop checking for 2.5 seconds cleanly
            await delay(2500);

            const cards = Array.from(document.querySelectorAll('.imgContainer, .preview-container, .result-item, .image-task, [class*="result"], [class*="output"]'));
            
            if (count > 0 && cards.length === 0) {
                window.ED_SamplerGrid_Aborted = true;
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

        if (!window.ED_SamplerGrid_Aborted) {
            btn.innerText = "Stitching Grid...";
            try {
                // FIXED ACCESSOR: Targets index 0 array objects for width dimensions cleanly
                const first = await loadImage(tasks[0].src); 
                const scaleFactor = targetCellWidth / first.width;
                const w = targetCellWidth;
                const h = Math.round(first.height * scaleFactor);

                const topM = 120, leftM = 240, pad = 15;     
                const canvas = document.createElement('canvas');
                canvas.width = leftM + (chosenX.length * (w + pad)) + 40;
                canvas.height = topM + (chosenY.length * (h + pad)) + 40;
                const ctx = canvas.getContext('2d');

                // Enforce Nearest-Neighbour calculations globally
                ctx.imageSmoothingEnabled = false;
                ctx.mozImageSmoothingEnabled = false;
                ctx.webkitImageSmoothingEnabled = false;
                ctx.msImageSmoothingEnabled = false;

                ctx.fillStyle = "#111113"; ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#ffffff"; ctx.font = "bold 18px sans-serif";
                ctx.textBaseline = "top"; 

                ctx.textAlign = "center";
                chosenX.forEach((sam, i) => { ctx.fillText(sam, leftM + (i * (w + pad)) + (w / 2), 50); });

                ctx.textAlign = "right"; 
                chosenY.forEach((sch, i) => { ctx.fillText(sch, leftM - 35, topM + (i * (h + pad)) + (h / 2) - 9); });

                for (let t of tasks) {
                    const img = await loadImage(t.src);
                    
                    // RE-ENFORCE RENDERING LOCK INSIDE THE DRAWING LOOP: Forces blur removal
                    ctx.imageSmoothingEnabled = false;
                    ctx.mozImageSmoothingEnabled = false;
                    ctx.webkitImageSmoothingEnabled = false;
                    ctx.msImageSmoothingEnabled = false;
                    
                    ctx.drawImage(img, leftM + (t.x * (w + pad)), topM + (t.y * (h + pad)), w, h);
                }

                const dataUrl = canvas.toDataURL('image/png');
                const imageWindow = window.open();
                if (imageWindow) {
                    imageWindow.document.write(`<html style="margin:0; padding:0; background:#111113; display:flex; justify-content:center; align-items:center;"><head><title>Result</title></head><body style="margin:0; padding:20px;"><img src="${dataUrl}" style="max-width:100%; height:auto; box-shadow:0 10px 30px rgba(0,0,0,0.6); border-radius:6px; image-rendering:pixelated; image-rendering:crisp-edges;" /></body></html>`);
                    imageWindow.document.close();
                }
            } catch(e) { console.error(e); alert("Stitching layout failed."); }
        } else {
            alert("Matrix grid generation halted successfully.");
        }

        promptInput.value = origPrompt;
        promptInput.dispatchEvent(new Event('input', {bubbles:true}));
        if (abortBtn) abortBtn.style.display = "none";
        btn.disabled = false; btn.style.opacity = "1"; btn.innerText = "Queue & Stitch Grid";
    });
})();
