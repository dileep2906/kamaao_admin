/*!
    * Start Bootstrap - SB Admin v7.0.4 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2021 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

import $ from 'jquery';
window.addEventListener('DOMContentLoaded', event => {
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            alert('ghg');
            
            let data=document.body.classList.toggle('sb-sidenav-toggled');

            if(data){
               $('.SidebarHideShow').css('display','none');
               $('.navLinkPadding').css('padding-left','180px');
               $('.SidebarIcons').css('font-size','26px');
               $('#Logo0101').addClass('SmallLogo');
               $('.margin100').addClass('margin101');
               $('.SidebarIcons1').css('font-size','30px');
               $('.SidebarIcons0101').css({'position': 'relative', 'left': '126px'});
            }else{
                $('.SidebarHideShow').css('display','block');
                $('.navLinkPadding').css('padding-left','35px');
                $('.SidebarIcons').css('font-size','20px');
                $('#Logo0101').removeClass('SmallLogo');
                $('.margin100').removeClass('margin101');
                $('.SidebarIcons1').css('font-size','25px');
                $('.SidebarIcons0101').css({'position': 'relative', 'left': '0px'});
            }
         
        });
    };
    const sidebarToggleTab = document.body.querySelector('#sidebarToggleTab');
    if (sidebarToggleTab) {
        sidebarToggleTab.addEventListener('click', event => {
            
            
            let data=document.body.classList.toggle('sb-sidenav-toggled');

            if(data){
               $('.SidebarHideShow').css('display','block');
               $('.navLinkPadding').css('padding-left','10px');             
               $('.SidebarIcons').css('font-size','20px');
               $('.LogoSmallDevice').css({'height':'34px','width':'29px','margin-left':'0px'});
               $('.paddingL15').css('padding-left','15px');
               $('.SidebarIcons1').css('font-size','25px');
               $('.SidebarIcons0101').css({'position': 'relative', 'left': '0px'});
            }else{
                $('.SidebarHideShow').css('display','none');
                $('.navLinkPadding').css('padding-left','108px');
                $('.SidebarIcons').css('font-size','26px');
                $('.LogoSmallDevice').css({'height':'54px','width':'49px','margin-left':'98px'});
                $('.paddingL15').css('padding-left','10px');
                $('.SidebarIcons1').css('font-size','30px');
                $('.SidebarIcons0101').css({'position': 'relative', 'left': '98px'});
            }
         
        });
    };
    const SidebarHumbuger = document.body.querySelector('#SidebarHumbuger');
    if (SidebarHumbuger) {
        SidebarHumbuger.addEventListener('click', event => {
            
            
            let data=document.body.classList.toggle('sb-sidenav-toggled');
            if(data){
                $('.SidebarHideShow').css('display','block');
                $('.navLinkPadding').css('padding-left','10px');             
                $('.SidebarIcons').css('font-size','20px');
                $('.LogoSmallDevice').css({'height':'35px','width':'30px','margin-left':'0px'});
                $('.paddingL15').css('padding-left','18px');
                $('.SidebarIcons1').css('font-size','20px');
                $('.SidebarIcons0101').css({'position': 'relative', 'left': '0px'});
                $('.SidebarHumbugerIcons').addClass('TransFormRotate');
             }else{
                 $('.SidebarHideShow').css('display','none');
                 $('.navLinkPadding').css('padding-left','118px');
                 $('.SidebarIcons').css('font-size','22px');
                 $('.LogoSmallDevice').css({'height':'35px','width':'30px','margin-left':'114px'});
                 $('.paddingL15').css('padding-left','0px');
                 $('.SidebarIcons1').css('font-size','22px');
                 $('.SidebarIcons0101').css({'position': 'relative', 'left': '118px'});
                 
                $('.SidebarHumbugerIcons').removeClass('TransFormRotate');
             }
         
        });
    }

})
