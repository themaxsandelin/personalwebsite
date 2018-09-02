function jump (target, options) {
  var start = window.pageYOffset;
  var opt = {
        duration: options.duration,
        offset: options.offset || 0,
        callback: options.callback,
        easing: options.easing || easeInOutQuad
      };
  var distance = typeof target === 'string' ? opt.offset + document.querySelector(target).getBoundingClientRect().top : target;
	var duration = typeof opt.duration === 'function' ? opt.duration(distance) : opt.duration;
  var timeStart;
  var timeElapsed;

	requestAnimationFrame(function(time) { timeStart = time; loop(time); });

	function loop (time) {
		timeElapsed = time - timeStart;

		window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

		if (timeElapsed < duration) {
      requestAnimationFrame(loop);
    } else {
      end();
    }
	}

	function end () {
		window.scrollTo(0, start + distance);
		if (typeof opt.callback === 'function') opt.callback();
	}

	function easeInOutQuad (t, b, c, d)  {
		t /= d / 2;
		if (t < 1) return c / 2 * t * t + b;
		t--;
		return -c / 2 * (t * (t - 2) - 1) + b;
	}

}

// Loop through all menu items and add click event listeners.
const menuItems = document.querySelectorAll('header .menu li');
for (let i = 0; i < menuItems.length; i++) {
  menuItems[i].addEventListener('click', (e) => {
    const id = e.target.innerText.toLowerCase();
    const position = document.getElementById(id).getBoundingClientRect();
    const scrollTo = position.top - (document.body.scrollTop || document.documentElement.scrollTop);
    
    jump(scrollTo, {
      duration: 600
    });
  });
}

window.addEventListener('load', () => {
  // Add a simple class to body to animate in all content.
  document.body.classList.add('show');
});