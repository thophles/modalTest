
//initialize swiper
var swiper = new Swiper('.swiper-container',
{
  pagination:
  {
    el: '.swiper-pagination',
  },
  zoom:
  {
    maxRatio: 1,
    toggle: false,
  },
});



function onUAReady()
{

   //set url destinations for CTAs
   let destinationTwo = 'bmw://connected/pnsroute';
   let open_tag = 'on_load_tag3';
   var ctaOne = document.getElementById("ctaOne");
   var ctaTwo = document.getElementById("ctaTwo");
   var ctaThree = document.getElementById("remindMeLater");
   var language = window.navigator.language;

   UAirship.runAction("add_tags_action", open_tag, function() {});


   // trigger button actions
   ctaOne.addEventListener("click", function()
   {
     event.preventDefault();
     UAirship.close();
   });

   ctaTwo.addEventListener("click", function(event)
   {
      event.preventDefault();
      UAirship.runAction("deep_link_action", destinationTwo, function()
      {
        return true;
      })
    });

   ctaThree.addEventListener("click", function(event)
   {
       event.preventDefault();
       UAirship.close();
   });
};

document.addEventListener('ualibraryready', onUAReady, false);
