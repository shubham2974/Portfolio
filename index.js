// ----------navbar--------
window.onload=function(){
    const menu_btn= document.querySelector(".hamburger");
    const mob_nav= document.querySelector(".mob-nav");
    menu_btn.addEventListener("click", function(){
        menu_btn.classList.toggle("active");
        mob_nav.classList.toggle("active");
    })
}
// -----------mode--------
const mode=document.querySelector(".mode");
mode.addEventListener("click",()=>{
    // console.log(mode.classList);
    mode.classList.toggle("active");
    document.body.classList.toggle("dark");
})
// ----------top button--------

const totop =document.querySelector(".to-top");

window.addEventListener("scroll",()=>{
    if(window.pageYOffset > 700){
        totop.classList.add("active");
    }
    else{
        totop.classList.remove("active");
    }
});

// ----------display tabs-----------
(()=>{
    const tabs=document.querySelector('.tab-content');
    const tabContainer=document.querySelector('.tab');

    tabContainer.addEventListener("click",(event)=>{
        // this will help to understand why are we using event target 
        //  console.log(event.target);
    //    active class is already set in this
        if(event.target.classList.contains("tab-item") && !event.target.classList.contains("active"))
        {
             let target=event.target.getAttribute("data-target");
            // now deactivating active class
            tabContainer.querySelector(".active").classList.remove("active");
            // now activating the clicked class
            event.target.classList.add("active");
            // now deactivating the tab container
             tabs.querySelector(".tab-content-item.active").classList.remove("active");
            // now activating the clicked tab container
             tabs.querySelector(target).classList.add("active");
        }
    })

})();

// -------skills bar-------

const progress=document.querySelectorAll(".done");

progress.forEach(event=>{
    
    document.getElementById(event.id).style.width=event.getAttribute("data-done") + "%";

});

function bodyScrollingToggle() {
    document.body.classList.toggle("stop-scrolling");
}
// --------portfolio filter and pop-----------
(()=>{
    const tabproject=document.querySelector(".tab-project");
    const tabcontentproject=document.querySelector(".tab-content-project");
    const tabcontentitems=document.querySelectorAll(".tab-content-item-project");
    // console.log(tabcontentitems);
    const Popup=document.querySelector(".portfolio-popup");
    const prebtn=Popup.querySelector(".pp-prev");
    const nextbtn=Popup.querySelector(".pp-next");
    const closebtn=Popup.querySelector(".pp-close");
    const projectdetails=Popup.querySelector(".pp-details");
    const projectdetailsbtn=Popup.querySelector(".pp-project-details-btn");
    let itemIndex,slideIndex,source;
    prebtn.style.display="none";
    nextbtn.style.display="none";

    // filter Portfolio items
    tabproject.addEventListener("click",(event)=>{
        // console.log(event.target);
        if(event.target.classList.contains("tab-item-project") && !event.target.classList.contains("active"))
        {
            // now deactivating active class
            tabproject.querySelector(".active").classList.remove("active");
            // now activating clicked clicked class
            event.target.classList.add("active");
            let target=event.target.getAttribute("data-target");
            // console.log(target);
            tabcontentitems.forEach((item)=>{
                // console.log(item.getAttribute("data-category"));
                if( target === item.getAttribute("data-category") || target === 'All')
                {
                    
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else
                {
                    item.classList.remove("show");
                    item.classList.add("hide");   
                }
            })             
        }
    })

    tabcontentproject.addEventListener("click",(event)=>{
        // console.log(event.target.closest(".tci-inner"));
        if(event.target.closest(".tci-inner"))
        {
            const portfolioitem=event.target.closest(".tci-inner").parentElement;

            // getting the index of portfolio items
            itemIndex=Array.from(portfolioitem.parentElement.children).indexOf(portfolioitem);
            source=tabcontentitems[itemIndex].querySelector(".tci-image img").src;
            // console.log(source);
            slideIndex=portfolioitem.parentElement.children.length;
             
            popupToggle();
            popupImage();
            popupDetails();
        }
    })
    closebtn.addEventListener("click",()=>{
        popupToggle();
        if(projectdetails.classList.contains("active")){
            popupDetailsToggle();
        }
    })
    function popupToggle() {
        Popup.classList.toggle("open");
        bodyScrollingToggle();
    }
    function popupImage(){
        const imgsrc=source;
        // console.log(imgsrc);
        const popupImg= Popup.querySelector(".pp-img");
        // activate loader until image loads
        Popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src=imgsrc;    
        popupImg.onload =()=>{
            // deactivate preloader
            Popup.querySelector(".pp-loader").classList.remove("active");
        }
        Popup.querySelector(".pp-counter").innerHTML=(itemIndex+1) + " of " + (slideIndex) ;
    }

    function popupDetails(){
        // // get the details fetched
        // console.log(tabcontentitems[itemIndex].querySelector(".tci-details").innerHTML);
         const details = tabcontentitems[itemIndex].querySelector(".tci-details").innerHTML;
         Popup.querySelector(".pp-project-details").innerHTML=details;
         const title= tabcontentitems[itemIndex].querySelector(".tci-name").innerHTML;
        // console.log(title);
         Popup.querySelector(".pp-title h2").innerHTML=title;
         const category= tabcontentitems[itemIndex].getAttribute("data-category");
         Popup.querySelector(".pp-project-category").innerHTML=category;
         

    }
    projectdetailsbtn.addEventListener("click",()=>{
        popupDetailsToggle();
    })

    function popupDetailsToggle(){
        if(projectdetails.classList.contains("active"))
        {
            projectdetailsbtn.querySelector("i").classList.remove("fa-minus");  
            projectdetailsbtn.querySelector("i").classList.add("fa-plus");
            projectdetails.classList.remove("active");
            projectdetails.style.maxHeight = 0 + "px";
        }
        else{
            projectdetailsbtn.querySelector("i").classList.add("fa-minus");  
            projectdetailsbtn.querySelector("i").classList.remove("fa-plus");    
            // activating the project details
            projectdetails.classList.add("active");
            projectdetails.style.maxHeight = projectdetails.scrollHeight + "px";
            Popup.scrollTo(0,projectdetails.offsetTop);
        }
    }
    
})();

