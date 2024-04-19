export default function decorate(block) {

    // setup image columns
    [...block.children].forEach((row, rowNo) => {
        
        [...row.children].forEach((col, colNo) => {

            if (colNo === 0) {
                
                const accIcon = col.querySelector('picture');        
                accIcon.insertAdjacentHTML('beforebegin', '<div class="acc-img">' + accIcon.outerHTML + '</div>');
                accIcon.remove();
                
                const accTxt = col.querySelector('strong');        
                accTxt.insertAdjacentHTML('beforebegin', '<div class="acc-txt">' + accTxt.outerHTML + '</div>');
                accTxt.remove();


                const accButton = document.createElement('button');
                accButton.innerHTML = col.innerHTML;
                accButton.classList.add('accordion-btn');
                col.parentNode.replaceChild(accButton, col);
                
                accButton.addEventListener('click', () => {
                    let siblingDiv = accButton.nextElementSibling;
                    const expanded = siblingDiv.getAttribute('aria-expanded') === 'true';
                    siblingDiv.setAttribute('aria-expanded', expanded ? 'false' : 'true');
                    
                    accButton.classList.toggle("active");
                });
                
                
            } 
            
            if(colNo === 1) {
                col.classList.add('panel');
            }

        });
    });
}