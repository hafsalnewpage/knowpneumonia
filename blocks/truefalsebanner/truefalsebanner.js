export default function decorate(block) {

    // setup image columns
    [...block.children].forEach((row, rowNo) => {
        
        if (rowNo === 0) {
            row.classList.add('initial-row'); 
        }
        
        [...row.children].forEach((col, colNo) => {

            if (colNo === 0) {
                col.classList.add('true-false-text');
            }

            if (colNo === 1) {
                let ps = col.querySelector('p');
                console.log(ps);
                col.classList.add('true-false-buttons');
                
                col.innerHTML = '';

                const radioButton1 = document.createElement('input');
                radioButton1.type = 'radio';
                radioButton1.name = 'true_false';
                radioButton1.value = 'true';

                const label1 = document.createElement('label');
                label1.textContent = 'True';

                const id1 = 'true';
                label1.setAttribute('for', id1);
                //radioButton.appendChild(label);
                
                label1.prepend(radioButton1);
                col.appendChild(label1);  
                
                const radioButton2 = document.createElement('input');
                radioButton2.type = 'radio';
                radioButton2.name = 'true_false';
                radioButton2.value = 'false';

                const label2 = document.createElement('label');
                label2.textContent = 'False';

                const id2 = 'false';
                label2.setAttribute('for', id2);
                //radioButton.appendChild(label);
                
                label2.prepend(radioButton2);
                col.appendChild(label2); 
            }          
        });
    });
}