'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Page navigation
//smooth scrolling
//1-not optimal solution
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = el.getAttribute('href'); //get relative
//     const section = document.querySelector(id);
//     section.scrollIntoView({ behavior: 'smooth' });
//   });
// });
//assign the same eventHandler to differnet elements
//if many elements ->affect the performace

//use Event delegation
//listen to the event in a common parent
//when the event bubbles up to parent;catch it and handle it there
//source of event can be found in e.target
//2-using event delegation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  const eventSource = e.target;
  if (eventSource.tagName === 'A') {
    const sectionID = eventSource.getAttribute('href');
    if (sectionID === '#') return;
    const section = document.querySelector(sectionID);
    section.scrollIntoView({ behavior: 'smooth' });
  }
});

//tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabscontent = document.querySelectorAll('.operations__content');

//event delegation
tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();

  //1-
  // const eventSource = e.target;
  // if (
  //   eventSource.tagName === 'BUTTON' ||
  //   eventSource.parentElement.tagName === 'BUTTON'
  // ) {
  //   const contentId =
  //     eventSource.tagName === 'BUTTON'
  //       ? eventSource.dataset.tab
  //       : eventSource.parentElement.dataset.tab;
  //   const newActiveTabClass = `operations__tab--${contentId}`;
  //   for (const tab of tabs) {
  //     if (tab.classList.contains(newActiveTabClass))
  //       tab.classList.add(`operations__tab--active`);
  //     else {
  //       tab.classList.remove(`operations__tab--active`);
  //     }
  //   }

  //   const newActiveContentClass = `operations__content--${contentId}`;
  //   for (const tabcontent of tabscontent) {
  //     if (tabcontent.classList.contains(newActiveContentClass))
  //       tabcontent.classList.add(`operations__content--active`);
  //     else {
  //       tabcontent.classList.remove(`operations__content--active`);
  //     }
  //   }
  // }
  //2-
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  const tabId = clicked.dataset.tab;
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  tabscontent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${tabId}`)
    .classList.add('operations__content--active');
});

//mouseover vs mouseenter events ;mouseover bubbles while mouseenter doesnt
//to use event delegation ->mouseover

//pass arguments into event handlers functions

const handleHover = function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav__links').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//Implementing a sticky Navigation: the scroll event
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

//Sticky navigation: Intersection Observer API
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else {
    nav.classList.remove('sticky');
  }
};
const obsOptions = {
  root: null, //viewport
  threshold: 0, // intersection percentage between root and observed element
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(stickyNav, obsOptions);
headerObserver.observe(header);

//Revealing Elements on Scroll

const allSections = document.querySelectorAll('.section');
//we need observer parameter ; because we will use same observer for all elements

//when we load the page ; we will get 4 entries (up to the number of sections)
//even if isIntersecting is false
//then each time we scroll and we surpass that threshold ; will get 1 entry for that event

const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target); //hidden only for the first scroll
    }
  });
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

//lazy loading images
//first load a low-quality blurred image.then load the real one when it appears in viewport
const imgTargets = document.querySelectorAll('img[data-src]');
//images with the attribute data-src (custom data-attribute)

const loadImg = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const imgSrc = entry.target.dataset.src;
      entry.target.setAttribute('src', imgSrc);
      //after this line,browser will start loading the image
      //when it finished it will emit a load event; we should listen to it
      entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
        //only when image is fully loaded remove blur effect
      });
      observer.unobserve(entry.target);
    }
  });
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `200px`,
});

imgTargets.forEach(img => imgObserver.observe(img));

//Building a slider Component
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  // Add dots to the slider
  const dotsContainer = document.querySelector('.dots');
  const createDots = function () {
    slides.forEach((_, index) => {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class=
    "dots__dot ${
      index === 0 ? 'dots__dot--active' : ''
    }" data-slide="${index}"></button>`
      );
    });
  };
  createDots();

  let curSlide = 0;

  const activavteDot = function () {
    const dots = [...document.querySelectorAll('.dots__dot')];
    dots.forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });
    dots[curSlide].classList.add('dots__dot--active');
  };

  const goToSlide = function (slideIndex) {
    slides.forEach(function (slide, index) {
      const newTranslation = ((index - slideIndex) % slides.length) * 100;
      slide.style.transform = `translateX(${newTranslation}%)`;
    });
    curSlide = slideIndex;
    activavteDot();
  };

  goToSlide(curSlide);
  const nextSlide = function () {
    curSlide = (curSlide + 1) % slides.length;
    goToSlide(curSlide);
  };
  const prevSlide = function () {
    curSlide = (curSlide - 1 + slides.length) % slides.length;
    goToSlide(curSlide);
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // slides.forEach(function (slide, index) {
  //   slide.style.transform = `translateX(${index * 100}%)`;
  //   slide.dataset.translateX = index * 100;
  // });

  // //pass function as argument (eventListener)
  // const slideAnimation = function () {
  //   slides.forEach((slide, index, array) => {
  //     slide.style.transform = `translateX(${index * 100}%)`;
  //     const currentTranslation = Number(slide.dataset.translateX);
  //     const newTranslation = (currentTranslation + this) % (array.length * 100);
  //     slide.dataset.translateX = newTranslation;
  //     slide.style.transform = `translateX(${newTranslation}%)`;
  //   });
  // };
  // btnRight.addEventListener('click', slideAnimation.bind(-100));
  // btnLeft.addEventListener('click', slideAnimation.bind(100));

  //sliding using keyboard keys

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    else if (e.key === 'ArrowLeft') prevSlide();
  });

  //event delegation
  dotsContainer.addEventListener('click', function (e) {
    const target = e.target;
    if (target.tagName !== 'BUTTON') return;
    const newSlide = target.dataset.slide;
    goToSlide(newSlide);
  });
};
slider(); // we can pass an options object as argument
