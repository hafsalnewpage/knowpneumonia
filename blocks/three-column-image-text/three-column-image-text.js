export default function decorate(block) {

    // setup image columns
    [...block.children].forEach((row, rowNo) => {
        
        if(rowNo !== 2) {
            const hrline = document.createElement('hr');
            row.append(hrline);
        }
        
        [...row.children].forEach((col, colNo) => {

            if (colNo === 1) {
                col.classList.add('icon-text');
            }

            const pic = col.querySelector('picture');
            if (pic) {
                const picWrapper = pic.closest('div');
                if (picWrapper) {
                    picWrapper.classList.add('icon-image');
                }
            }
        });
    });
}