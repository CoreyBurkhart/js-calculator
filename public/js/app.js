window.addEventListener('load', function(e) {
  var displayedInput = '',
    calculatableInput = '';

  var currentInput = document.querySelector('.current');
  var lastInput = document.querySelector('#equation');
  var lastKey;

  $('button').on('click', clickHandler);
  $(document).on('keydown', keypressHandler)

  //when button is clicked
  //add button value to string
  function clickHandler(e, char) {
    var notDisplayed = ['C', 'M', '=', ];
    char = this.innerText;

    if (!notDisplayed.includes(char)) {
      add(char);
    } else if (char === 'C') {
      displayedInput = calculatableInput = ' ';
    } else if (char = '=') {
      animateEqual();
    }
    displayCurrent();
  }

  //when key is pressed
  //determine key then add button value to string
  function keypressHandler(e) {
    var key = e.which;
    //1-9 = 49-57
    if (key >= 49 && key <= 57 && lastKey !== 16) {
      add(key);
    } else if (key === 13) {
      animateEqual();
    } else if (key === 191) {
      add('/');
    } else if (key === 189) {
      add('-');
    } else if (lastKey === 16 && key === 56) {
      add('*');
    } else if (lastKey === 16 && key === 187) {
      add('+');
    } else if (lastKey === 16 && key === 48) {
      add(')');
    } else if (lastKey === 16 && key === 57) {
      add('(');
    }
    displayCurrent();
    lastKey = key;
  }

  function displayCurrent() {
    currentInput.innerText = displayedInput;
  }

  function add(char) {
    var t;
    if (typeof char === 'string') {
      char = char.charCodeAt(0);
    }

    t = String.fromCharCode(char)
    if (char === 247) {
      displayedInput += t;
      calculatableInput += '/';
    } else {
      displayedInput += t;
      calculatableInput += t;
    }
  }

  function calculate(input) {
    try {
      // should probably check for malicious code here
      var a = eval(input);
    } catch (e) {
      return "error"
    }
    return a;
  }

  function animateEqual() {
    //get the position of the equation
    var eq = $('.current').offset();
    //target position = position it started
    var left, targ;
    $('.last').offset(eq);
    $('#answer').text(calculate(calculatableInput));

    lastInput.innerText = displayedInput + '=';

    //set the positon of the answer = equation
    var top = $('.display').height() - $('.last').height() * 3;
    targ = {
      top: top,
      left: $('.display').width() - $('#equation').width() - $('#answer').width()
    }

    displayedInput = calculatableInput = ' ';

    // animate to the proper location
    $('.last').animate({
      top: top,
      left: 0
    }, 'fast', function() {
      $('.last').animate(targ, 'slow')
    });
  }
});
