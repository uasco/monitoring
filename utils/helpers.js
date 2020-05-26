exports.range = function (a, b, step) {

    var range = [];

    if (typeof a == 'number') {

        range[0] = a;
        step = step || 1;
        while (a + step <= b) {
            range[range.length] = a += step;
        }

    } else {

        var s = 'abcdefghijklmnopqrstuvwxyz';

        if (a === a.toUpperCase()) {
            b = b.toUpperCase();
            s = s.toUpperCase();
        }

        s = s.substring(s.indexOf(a), s.indexOf(b) + 1);
        range = s.split('');

    }

    return range;
}
/*
usage in javascript

   range(0,10);
    // [0,1,2,3,4,5,6,7,8,9,10]

    range(-100,100,20);
    // [-100,-80,-60,-40,-20,0,20,40,60,80,100]

    range('A','F');
    // ['A','B','C','D','E','F')

     range('m','r');
    // ['m','n','o','p','q','r']


usage in jade:

ul
  each i in range(1,20)
  li range is at #{i}
*/