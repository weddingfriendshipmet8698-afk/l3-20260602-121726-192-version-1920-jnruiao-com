(function(){
var btn=document.querySelector('.mobile-menu-btn');
var panel=document.querySelector('.mobile-panel');
if(btn&&panel){btn.addEventListener('click',function(){panel.classList.toggle('open');});}
var slides=[].slice.call(document.querySelectorAll('.hero-slide'));
var dots=[].slice.call(document.querySelectorAll('.hero-dot'));
if(slides.length){var current=0;function show(n){slides[current].classList.remove('is-active');if(dots[current])dots[current].classList.remove('active');current=(n+slides.length)%slides.length;slides[current].classList.add('is-active');if(dots[current])dots[current].classList.add('active');}dots.forEach(function(dot){dot.addEventListener('click',function(){show(parseInt(dot.getAttribute('data-target'),10)||0);});});setInterval(function(){show(current+1);},5200);}
var lists=[].slice.call(document.querySelectorAll('.filter-list'));
lists.forEach(function(list){var scope=list.closest('section')||document;var input=scope.querySelector('.filter-input');var year=scope.querySelector('.year-filter');var category=scope.querySelector('.category-filter');var cards=[].slice.call(list.querySelectorAll('.movie-card'));function apply(){var q=(input&&input.value||'').trim().toLowerCase();var y=year&&year.value||'';var c=category&&category.value||'';cards.forEach(function(card){var ok=true;if(q&&card.getAttribute('data-search').indexOf(q)<0)ok=false;if(y&&card.getAttribute('data-year')!==y)ok=false;if(c&&card.getAttribute('data-category')!==c)ok=false;card.style.display=ok?'':'none';});}if(input)input.addEventListener('input',apply);if(year)year.addEventListener('change',apply);if(category)category.addEventListener('change',apply);});
})();