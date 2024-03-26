export default function decorate(block) {

    // setup image columns
    [...block.children].forEach((row, rowNo) => {
        
        if (rowNo === 0) {
            row.classList.add('image-banner-main');
        }
        [...row.children].forEach((col, colNo) => {
         
                let image= col.querySelector('picture');
                
                if(image) {
                
                    col.classList.add('image-banner-image');    
                } else {
                    
                    col.classList.add('image-banner-text');
                }
        });
    });
}