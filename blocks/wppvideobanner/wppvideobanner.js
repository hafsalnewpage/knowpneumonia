export default function decorate(block) {

    // setup image columns
    [...block.children].forEach((row, rowNo) => {
        
        if (rowNo === 0) {
            row.classList.add('banner-what-is-pneumonia');
            row.classList.add('mobile-align');  
        }
        [...row.children].forEach((col, colNo) => {

            if (colNo === 1) {
                
                let videoLink = col.querySelector('a');
                col.classList.add('video-banner');    
                let videoElement = document.createElement('video');
                videoElement.controls = true;
                let  sourceElement = document.createElement('source');
                sourceElement.src =  videoLink.href
                sourceElement.type = 'video/mp4';

                videoElement.appendChild(sourceElement);

                videoLink.replaceWith(videoElement);
                
                
                
            }
            
            if (colNo === 0) {
                col.classList.add('banner-text-home');
                col.classList.add('pneumonia-banner');
            }
        });
    });
}