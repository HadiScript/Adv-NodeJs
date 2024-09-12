// for event loop

//  node myFile.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// new Timers, task, opeerations are recorded from myFile running
myFile.runContents();

function shouldContinue() {
  // chech one: any pending setTimeout, setInterval, setImmediate?
  // check two: any pending OS task? (server listen to port)
  // check three: any pending long running operations? (like fs module)

  return pendingTimers.length || pendingOSTasks.length || pendingOperations;
}

// entire body execute in one tick
while (shouldContinue()) {
  // 1) node looks at pendingTimers and sees if any functions are ready to be called. for SetTimeout SetInterval
 
  // 2) node looks at pendingOSTasks and pendingOperations and calls relevant callbacks
 
  // 3) Pause execution. Continuee when...
  //  -  new pendingOsTASK is done
  //  -  new pendingOperation is done
  //  -  a timer is about to complete


  // 4) Look at pendingTimers. Call any set Immediate


  // 5) handle any 'close' events; (cleanup code)
}
// exit back to terminal
