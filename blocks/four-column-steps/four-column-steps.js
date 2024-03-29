export default function decorate(block) {

    // setup image columns
    [...block.children].forEach((row, rowNo) => {
        
        if (rowNo === 0) {
            row.classList.add('four-column-step-main');
        }
        
        [...row.children].forEach((col, colNo) => {
            
            let stepmaindiv = document.createElement('div');
            
            let stepnumberspan = document.createElement('span');
            stepnumberspan.classList.add('stepnumber');
            stepnumberspan.appendChild(document.createTextNode(colNo+1));
            
            let pictureParent = col.querySelector('picture').closest('p');
            pictureParent.insertAdjacentElement('afterend', stepnumberspan);

            const newDiv = document.createElement('div');
            newDiv.classList.add('four-column-step'); 
            col.parentNode.insertBefore(newDiv, col);

            newDiv.appendChild(col);

        });
    });
}