function linkBorder(){
    let lborder = document.querySelectorAll(".mr-3")
    lborder[2].classList.remove("border1");
    lborder[1].classList.remove("border1");
    lborder[0].classList.add("border1");
    let x=document.querySelectorAll(".hiddenorshow")
    for (let i=0;i<x.length;i++){
        x[i].style.display="unset";
        }
        let y = document.querySelectorAll(".Relatedartist")
        for(let i=0;i<y.length;i++){
            y[i].style.display="none";
        }
}

function linkBorder2(){
    let lborder = document.querySelectorAll(".mr-3")
    lborder[0].classList.remove("border1");
    lborder[2].classList.remove("border1");
    lborder[1].classList.add("border1");
    let x=document.querySelectorAll(".hiddenorshow")

        for (let i=0;i<x.length;i++){
        x[i].style.display="none";
        }
       let y = document.querySelectorAll(".Relatedartist")
       for(let i=0;i<y.length;i++){
           y[i].style.display="unset";
       }
    }
function linkBorder3(){
    let lborder = document.querySelectorAll(".mr-3")
    lborder[0].classList.remove("border1");
    lborder[1].classList.remove("border1");
    lborder[2].classList.add("border1");
    let x=document.querySelectorAll(".mycards")

        
}