export default function decorate(block) {

    [...block.children].forEach((row, rowNo) => {
        
        if (rowNo === 0) {
            row.classList.add('copyrite');
        }
        
        [...row.children].forEach((col, colNo) => {

            if (colNo === 0) {
                
               col.classList.add('copyrite-image');
            }
            
            if (colNo === 1) {
                col.classList.add('copyrite-text');
            }
        });
    });
}