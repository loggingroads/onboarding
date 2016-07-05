//= require main

function setSlider() {
  $('.slider-container').ready( function() {
    $('.slider-container').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true
    });
  });
}

$(document).ready(setSlider);
$(document).on('page:change', function () {
  setSlider();
});


/* Sets dots to turn one when in section */
$(document).ready(setDotOn);
$(window).scroll(function() {
  setDotOn();
});

function setDotOn() {
  let positions = getSectionsPositions();
  const windowTop = $(window).scrollTop();
  const key = setItemKey(positions, windowTop);

  clearActiveDots();
  setActiveDot(positions, key);
}

function getSectionsPositions() {
  let positions = {};
  positions[$('#intro').offset().top] = 'intro';
  positions[$('#slider').offset().top] = 'slider';
  positions[$('#participate').offset().top] = 'participate';
  positions[$('#events').offset().top] = 'events';
  positions[$('#community').offset().top] = 'community';
  positions[$('#activity').offset().top] = 'activity';
  positions[$('#about').offset().top] = 'about';

  return positions;
}

function setItemKey(positions, windowTop) {
  let keys = Object.keys(positions);
  let key = 0;

  for(let i = 0; i < keys.length; i++) {
    if(windowTop < keys[i] && i !== 0) {
      key = i-1;
      break;
    }
    else if(windowTop + $(window).height() == $(document).height()) {
      key = keys.length-1;
      break;
    }
    else if(windowTop > keys[i] || i === keys.length-1) {
      key = i;
    }
  }
  return key;
}


function clearActiveDots() {
  let items = document.getElementsByClassName('dot-item');

  for(let i = 0; i < items.length; i++) {
    const item = document.getElementsByClassName('dot-item')[i];
    let itemClass = item.getAttribute('class');
    item.setAttribute('class', itemClass.replace('-active', ''));
  }
}

function setActiveDot(positions, key) {
  let keys = Object.keys(positions);
  let elementClass = document.getElementById(positions[keys[key]] + '-dot').getAttribute('class');
  document.getElementById(positions[keys[key]] + '-dot').setAttribute('class', elementClass + ' -active');
}
