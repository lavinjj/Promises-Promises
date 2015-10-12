$( document ).ready(function() {

  function doSomethingForALongTime(doneCB){
    // a call to some long running process
    window.setTimeout(function(){
      // invoke the callback function
      doneCB('Back From A Long Running Process');
    }, 10000);
  };

  function handleProcessReturn(value){
    $("#Message").text( value );
  };

  $("#loadButton").click(function() {
    doSomethingForALongTime(handleProcessReturn);
  })
});
