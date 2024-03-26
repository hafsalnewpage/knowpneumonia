export default function decorate(block) {

    // setup image columns
    [...block.children].forEach((row, rowNo) => {
        
        if (rowNo === 0) {
            row.classList.add('banner-homepage');
            row.classList.add('homepg');  
        }
        [...row.children].forEach((col, colNo) => {

            if (colNo === 0) {
                col.classList.add('banner-text');
            }

            const pic = col.querySelector('picture');
            if (pic) {
                const picWrapper = pic.closest('div');
                if (picWrapper) {
                    picWrapper.classList.add('banner-image');
                }
            }
            
            const button = col.querySelector('a.button');
            if (button) {
                button.classList.add('how-it-work-button');     
                button.classList.add('webbutton');
                
                let buttonParent = button.parentNode.parentNode;
                buttonParent.replaceWith(button);
                
                let button2 = button.cloneNode(true);
                button2.classList.remove('webbutton');
                button2.classList.add('mobbutton');
                let parent2 = button.parentNode.parentNode;               
                parent2.append(button2);  
            }
        });
    });
}