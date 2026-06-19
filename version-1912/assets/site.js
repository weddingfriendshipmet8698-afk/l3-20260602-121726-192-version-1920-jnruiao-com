(function () {
  var menuButton = document.querySelector('[data-menu-button]');
  var mobileNav = document.querySelector('[data-mobile-nav]');

  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', function () {
      mobileNav.classList.toggle('is-open');
    });
  }

  var carousel = document.querySelector('[data-hero-carousel]');

  if (carousel) {
    var slides = Array.prototype.slice.call(carousel.querySelectorAll('.hero-slide'));
    var dots = Array.prototype.slice.call(carousel.querySelectorAll('[data-hero-dot]'));
    var current = 0;
    var timer = null;

    function showSlide(index) {
      if (!slides.length) {
        return;
      }

      current = (index + slides.length) % slides.length;

      slides.forEach(function (slide, slideIndex) {
        slide.classList.toggle('is-active', slideIndex === current);
      });

      dots.forEach(function (dot, dotIndex) {
        dot.classList.toggle('is-active', dotIndex === current);
      });
    }

    function schedule() {
      if (timer) {
        window.clearInterval(timer);
      }

      timer = window.setInterval(function () {
        showSlide(current + 1);
      }, 5200);
    }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        var index = Number(dot.getAttribute('data-hero-dot')) || 0;
        showSlide(index);
        schedule();
      });
    });

    schedule();
  }

  var areas = Array.prototype.slice.call(document.querySelectorAll('[data-filter-area]'));

  areas.forEach(function (area) {
    var input = area.querySelector('.site-search-input');
    var buttons = Array.prototype.slice.call(area.querySelectorAll('[data-year-filter]'));
    var cardScope = area.querySelector('[data-card-grid]') ? area : document;
    var selectedYear = 'all';

    function applyFilters() {
      var query = input ? input.value.trim().toLowerCase() : '';
      var cards = Array.prototype.slice.call(cardScope.querySelectorAll('.movie-card'));

      cards.forEach(function (card) {
        var text = (card.getAttribute('data-search') || '').toLowerCase();
        var year = card.getAttribute('data-year') || '';
        var matchesText = !query || text.indexOf(query) !== -1;
        var matchesYear = selectedYear === 'all' || year === selectedYear;
        card.classList.toggle('is-filter-hidden', !(matchesText && matchesYear));
      });
    }

    if (input) {
      input.addEventListener('input', applyFilters);
    }

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        selectedYear = button.getAttribute('data-year-filter') || 'all';
        buttons.forEach(function (item) {
          item.classList.toggle('active', item === button);
        });
        applyFilters();
      });
    });
  });

  function preparePlayer(box) {
    var video = box.querySelector('video');
    var startButton = box.querySelector('.player-start');
    var streamUrl = box.getAttribute('data-stream');
    var ready = false;

    if (!video || !startButton || !streamUrl) {
      return;
    }

    function attachStream() {
      if (!ready) {
        ready = true;

        if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = streamUrl;
        } else if (window.Hls && window.Hls.isSupported()) {
          var hls = new window.Hls({
            enableWorker: true,
            lowLatencyMode: true
          });
          hls.loadSource(streamUrl);
          hls.attachMedia(video);
        } else {
          video.src = streamUrl;
        }
      }

      startButton.classList.add('is-hidden');
      video.setAttribute('controls', 'controls');
      var playTask = video.play();

      if (playTask && playTask.catch) {
        playTask.catch(function () {});
      }
    }

    startButton.addEventListener('click', attachStream);
    video.addEventListener('click', function () {
      if (!ready) {
        attachStream();
      }
    });
  }

  Array.prototype.slice.call(document.querySelectorAll('.movie-player')).forEach(preparePlayer);
})();
