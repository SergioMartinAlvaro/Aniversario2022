
const paths = ['.pathOne', '.handspath', '.pathThree'];
let actualPath = 0;
let discount = 1;
let startingOpenDoors = 0;

const setupLineDrawing = () => {
    let path = document.querySelector(extractPath());
    let pathLength = path.getTotalLength();
    
    path.style.strokeDasharray = pathLength + ' ' + pathLength;
    path.style.strokeDashoffset = pathLength;
    
    window.addEventListener('scroll', () => {
        activateParallax();
        var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight)
        var drawLength = pathLength * (scrollPercentage / discount);
        path.style.strokeDashoffset = pathLength - drawLength;
    })
}

const extractPath = () => {
    return paths[actualPath];
}

let resizer = 0;

const activateParallax = () => {
    const target = document.querySelectorAll('.scroll');
    
    var index = 0, length = target.length;
    let breakpoint = 0;
    let isChanged = false;
    for(index; index < length; index++) {
        var pos = (window.pageYOffset * target[index].dataset.rate);
        var negativePos = (window.pageYOffset / target[index].dataset.rate);
        if(pos > 500) {
            breakpoint = pos;
            pos = (window.pageYOffset * target[index].dataset.rate) - breakpoint;
        }

        if(target[index].dataset.direction === 'vertical') {
            if(!isChanged) {

            }
            target[index].style.transform = 'translate3d(0px,' + pos+'px, 0px)';
        } else if(target[index].dataset.direction === 'horizontal') {
            target[index].style.transform = 'translate3d(' + pos + 'px, 0px, 0px)';
        } else if(target[index].dataset.direction === 'horizontal-back') { 
            target[index].style.transform = 'translate3d(' + -pos + 'px, 0px, 0px)';
        } else if(target[index].dataset.direction === 'vertical-back') {
            target[index].style.transform = 'translate3d(0px,' + -pos+'px, 0px)';
        }else {
            var posX = window.pageYOffset * target[index].dataset.ratex;
            var posY = window.pageYOffset * target[index].dataset.ratey;

            target[index].style.transform = 'translate3d(' + posX + 'px, ' + posY + 'px, 0px)';
        }
    }
}

activateScroll = () => {
        document.querySelector('.bottom-arrow').classList.add('showElementOnEvent')
        setTimeout(() => {
            document.querySelector('body').classList.remove('noscroll');
        }, 500)
    
}

startDrawingFirstPath = () => {
    actualPath = 1;
    
    let path = document.querySelector(extractPath());
    let pathLength = path.getTotalLength();
    var drawLength = 0;
    path.style.strokeDasharray = pathLength + ' ' + pathLength;
    let drawInterval = setInterval(() => {
        drawLength+=1.5;
        path.style.strokeDashoffset = pathLength;
        path.style.strokeDashoffset = pathLength - drawLength;
        if(drawLength >= pathLength) {
            activateScroll();
                document.querySelector('.sergioyyoli').classList.remove('sergioyyoli');
                actualPath = 0;
                setupLineDrawing();
                clearInterval(drawInterval);
        }
    }, 0.1 )

}
// Ready para la animacion
let isDefinedPlace = false;
function startOpenDoors(elements) {
    let leftElement = elements.left;
    let rightElement = elements.right;
    let totalPosition = (window.pageYOffset - startingOpenDoors);
    rightElement.style.transform = `translateX(${totalPosition}px)`;
    leftElement.style.transform = `translateX(${-totalPosition}px)`;
    console.log(totalPosition)
}

function createObserver() {
    var observer;
  
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: buildThresholdList()
    };
  
    observer = new IntersectionObserver(handleIntersect, options);
    let boxElement = document.querySelector('#last-window')
    observer.observe(boxElement);
  }

  function buildThresholdList() {
      let numSteps = 10;
    var thresholds = [];
  
    for (var i=1.0; i<=numSteps; i++) {
      var ratio = i/numSteps;
      thresholds.push(ratio);
    }
  
    thresholds.push(0);
    return thresholds;
  }

  function handleIntersect(entries, observer) {
      let leftElement = document.querySelector('.lastWindow-left')
      let rightElement = document.querySelector('.lastWindow-right')
      let prevRatio = 0.75;
    entries.forEach(function(entry) {
      if (entry.intersectionRatio > prevRatio) {
        if(!isDefinedPlace) {
            startingOpenDoors = window.pageYOffset;
            isDefinedPlace = !isDefinedPlace;
        }
        startOpenDoors({left: leftElement, right: rightElement});
      } else {

      }
  
      prevRatio = entry.intersectionRatio;
    });
  }

startDrawingFirstPath(), () => {

};
createObserver();