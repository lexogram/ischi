/**
 * src/Utilities/messages.js
 */


const messageListeners = {
  sender_id:    {},
  subject:      {},
  recipient_id: {}
} // { <topic>: { <subject>: [<function>, ...], ... }, ... }



/**
 * Allow functions from other scripts to listen for incoming
 * messages.
 * Messages with a recipient_id of "system" will be treated
 * separately, regardless of their subject
 * 
 * Listeners can subscribe to either...
 * - All messages with a given subject (e.g. "make_move")
 * or:
 * - All messages with a given recipient_id (e.g. "xo_game")
 */
const addMessageListener = (listener) => {
  // Allow multiple listeners to be added with one call
  if (Array.isArray(listener)) {
    return listener.forEach( listener => {
      addMessageListener(listener)
    })
  }

  treatMessageListener("add", listener)
}


const removeMessageListener = (listener) => {
  // Allow multiple listeners to be removed with one call
  if (Array.isArray(listener)) {
    return listener.forEach( listener => {
      removeMessageListener(listener)
    })
  }
  
  treatMessageListener("delete", listener)
}


const treatMessageListener = (action, listener) => {
  if (typeof listener === "object") {
    const {subject, sender_id, recipient_id, callback} = listener

    if (callback instanceof Function) {
      const [ listenerMap, filter ] = sender_id
        ? [ messageListeners.sender_id, sender_id ]
        : subject
          ? [ messageListeners.subject, subject ]
          : recipient_id
            ? [ messageListeners.recipient_id, recipient_id ]
            : [] // neither subject nor recipient_id

      if (listenerMap) {
        const listeners = listenerMap[filter]
                       || (listenerMap[filter] = new Set())
        listeners[action](callback) // add or delete

        // console.log(
        //   `MessageListener successfully ${action}ed\n`, listener
        // );
        // console.log("messageListeners:", messageListeners);
        return 0 // no error
      }
    }
  }

  // callback is not a function, or neither subject nor
  // recipient_id provided
  console.log(`ERROR from ${action}MessageListener:`, listener);
}


const treatMessage = (data) => {
  const {
    subject,
    sender_id,
    recipient_id,
    // content
  } = data
  // console.log("New message:", data);

  let listeners = messageListeners.sender_id[sender_id]
  if (listeners) {
    listeners.forEach( listener => listener( data ))
    return
  }

  listeners = messageListeners.subject[subject]
  if (listeners) {
    listeners.forEach( listener => listener( data ))
    return
  }

  listeners = messageListeners.subject[subject]
  if (listeners) {
    listeners.forEach( listener => listener( data ))
    return
  }

  console.log("Unhandled message:", data);
}


// module.exports = {
//   addMessageListener,
//   removeMessageListener,
//   treatMessage
// }
export {
  addMessageListener,
  removeMessageListener,
  treatMessage
}