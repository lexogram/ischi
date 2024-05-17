// https://www.freecodecamp.org/news/javascript-debounce-example/


const debounce = (debouncedFunction, immediate, delay = 300) => {
  if (typeof immediate === "number") {
    // Ignore immediate; use its value to overwrite default delay
    delay = immediate
    immediate = false
  }
  let timeout

  return (...args) => {    
    const callNow = immediate && !timeout
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        timeout = 0
        debouncedFunction.apply(null, args)
      },
      delay
    );

    if (callNow) {
      debouncedFunction.apply(null, args)
    }
  };
}


// // USAGE //
// function postBounce(a,b,c){
// // console.log('Done', a, b, c);
// }
// const processChange = debounce(postBounce);
// for ( let ii = 0; ii < 1000; ii += 1 ) {
//   processChange(2,3,4)
// }
// // Will print Done 2 3 4 after bouncing is done


export { debounce }