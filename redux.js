// Actions Creator
const newBooking = (name, amount) => {
  return {
    type: 'NEW_BOOKING',
    payload: {
      name,
      amount
    }
  };
};

const cancelBooking = (name, refundAmount) => {
  return {
    type: 'CANCEL_BOOKING',
    payload: {
      name,
      refundAmount
    }
  };
};

// Reducers 
const reservationHistory = (oldReservationList = [], action) => {
  if (action.type === 'NEW_BOOKING') {
    return [...oldReservationList, action.payload];
  } else if (action.type === 'CANCEL_BOOKING') {
    return oldReservationList.filter(record => {
      return record.name !== action.payload.name
    });
  }

  return oldReservationList;
};

const cancellationHistory = (oldCancellationList = [], action) => {
  if (action.type === 'CANCEL_BOOKING') {
    return [...oldCancellationList, action.payload];
  }
  return oldCancellationList;
};

const accounting = (totalMoney = 100, action) => {
  if (action.type === 'NEW_BOOKING') {
    return totalMoney + action.payload.amount;
  } else if (action.type === 'CANCEL_BOOKING') {
    return totalMoney - action.payload.refundAmount;
  }

  return totalMoney;
};
const { createStore, combineReducers } = Redux;

const railwayCentralStore = combineReducers({
  accounting: accounting,
  reservationHistory: reservationHistory,
  cancellationHistory: cancellationHistory,

})

const store = createStore(railwayCentralStore)
const actions = newBooking("Anisur", 100);
store.dispatch(newBooking("John", 30))
store.dispatch(newBooking("Jane", 130))
store.dispatch(cancelBooking("Jane", 65))
store.dispatch(cancelBooking("Rafic", 65))
// store.dispatch(cancelBooking("John", 15))
// store.dispatch(cancelBooking("Anisur", 50))
// store.dispatch(actions)
console.log( store.getState() )