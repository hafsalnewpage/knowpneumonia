export default function decorate(block) {

    let group1 = [];
    let group2 = [];
    
    [...block.children].forEach((row, rowNo) => { 
        if (rowNo === 0) {
         //   row.classList.add('banner-homepage');
        }
        [...row.children].forEach((col, colNo) => {

            if (colNo === 0) {
                group1.push(col);
                document.createElement('div');
            } else if(colNo === 2) {
                
                let orSpan = document.createElement('span');
                const orText = document.createTextNode('OR');
                orSpan.append(orText);
                col.innerHTML = '';
                col.append(orSpan);
                group2.push(col);
            } 
            else {
                
                let findMButton = col.querySelector('a.button');
                if(findMButton) {
                    let buttonParent = findMButton.parentNode;
                    buttonParent.replaceWith(findMButton);
                }
                
                group2.push(col);
            }
        });
        
        //create group level parent div
        let group1Container = document.createElement('div');
        group1Container.classList.add('higher-risk-img');
        let group2Container = document.createElement('div');
        group2Container.classList.add('higher-risk-content');

        // Append the corresponding child divs to each group container
        group1.forEach(function (div) {
          div.classList.add('higher-risk-heading');
          group1Container.appendChild(div);
        });

        group2.forEach(function (div, i) {
          div.classList.add('higher-risk-content-text-' + i);
          group2Container.appendChild(div);
        });

        // Append the grouped divs to the parent container
        let hRiskParentDiv = row.parentNode;
        hRiskParentDiv.innerHTML = '';
        hRiskParentDiv.appendChild(group1Container);
        hRiskParentDiv.appendChild(group2Container);
        
    });
}