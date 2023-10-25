import $ from "jquery";

export function Spoilers() {
   $('.spoiler__title').click(function (event) {
      if ($('.spoiler').hasClass('one')) {
         $('.spoiler__title').not($(this)).removeClass('active');
         $('.spoiler__content').not($(this).next()).slideUp(300);
      }
      $(this).toggleClass('active').next().slideToggle(300);
   })
}