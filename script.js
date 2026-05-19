
// Function to clear input fields and results on page load
window.onload = function () {
    document.getElementById('setElements').value = "";
    document.getElementById('relations').value = "";
    document.getElementById('results').innerHTML = "";
    document.getElementById('results').classList.remove("active");
};

function parseInput(input) {
        return input.split(',').map(x => x.trim()).filter(x => x);
 }

function parseRelations(input) {
        return input.match(/\((\d+),(\d+)\)/g)?.map(pair => {
            let [a, b] = pair.replace(/[()]/g, '').split(',').map(Number);
            return [a, b];
        }) || [];
    }

 function checkProperties() {
  let setElementsInput = document.getElementById('setElements').value.trim();
  let relationsInput = document.getElementById('relations').value.trim();
  let resultsDiv = document.getElementById('results');

   if (!setElementsInput || !relationsInput) {
    resultsDiv.innerHTML = '<p class="error">⚠ Please enter both Set Elements and Relations.</p>';
      resultsDiv.classList.add("active");
      return;
      }
 let setA = new Set(parseInput(setElementsInput));
 let relations = parseRelations(relationsInput);
        let relationSet = new Set(relations.map(([a, b]) => `${a},${b}`));
let reflexive = [...setA].every(x => relationSet.has(`${x},${x}`));
        let irreflexive = [...setA].every(x => !relationSet.has(`${x},${x}`));
        let symmetric = relations.every(([a, b]) => relationSet.has(`${b},${a}`));
 let antisymmetric = relations.every(([a, b]) => (a === b) || !relationSet.has(`${b},${a}`));
 let asymmetric = relations.every(([a, b]) => (a !== b) ? !relationSet.has(`${b},${a}`) : true);
        let transitive = relations.every(([a, b]) => relations.every(([c, d]) => (b === c) ? relationSet.has(`${a},${d}`) : true));

        resultsDiv.innerHTML = `
        <p><span class="symbol"></span> Reflexive: ${reflexive}</p>
        <p><span class="symbol"></span> Irreflexive: ${irreflexive}</p>
        <p><span class="symbol"></span> Symmetric: ${symmetric}</p>
        <p><span class="symbol"></span> Antisymmetric: ${antisymmetric}</p>
        <p><span class="symbol"></span> Asymmetric: ${asymmetric}</p>
        <p><span class="symbol"></span> Transitive: ${transitive}</p>
        
        resultsDiv.classList.add("active");
    `}

    function createSymbols() {
        const symbols = ['∀', '∃', '∄', '↔', '⇎', '⟶', 'R'];
        for (let i = 0; i < 20; i++) {
            let span = document.createElement('span');
            span.classList.add('symbol-animation');
           span.innerText = symbols[Math.floor(Math.random() * symbols.length)];
            span.style.left = Math.random() * 100 + 'vw';
            span.style.animationDuration = (Math.random() * 2 + 2) + 's';
            document.body.appendChild(span);
        }
    }
    createSymbols();