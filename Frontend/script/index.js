ServerStart()
function ServerStart(){
  fetch("https://petcare-lal5.onrender.com/server")
  .then((res)=>{
    return res.json()
  })
  .then((data)=>{
    console.log(data)
  })
  .catch((err)=>{
    console.log(err)
  })
}
$(document).ready(function () {
    $('.slider2').slick({
      autoplay: false,
      autoplaySpeed: 1000,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
    });
    $('.slide-prev').click(function (e) {
      //e.preventDefault(); 
      $('.slider2').slick('slickPrev');
    });
  
    $('.slide-next').click(function (e) {
      //e.preventDefault(); 
      $('.slider2').slick('slickNext');
    });
  });

  var acc = document.getElementsByClassName("accordion");
  var i;
  
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }