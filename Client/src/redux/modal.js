//Actions
const MODAL_SHOW = 'MODAL_SHOW';
const MODAL_CLOSE = 'MODAL_CLOSE';

export const MODAL_TYPES = {
  SIGN_IN: 'SIGN_IN',
};

const show = modalType => ({ type: MODAL_SHOW, modalType });

//Thunk & Actions
export const showModal = modalType => {
  return dispatch => {
    dispatch(show(modalType));
  };
};

export const closeModal = () => {
  return dispatch => {
    dispatch({ type: MODAL_CLOSE, error });
  };
};

// Reducer
export default function modal(state = { type: null, show: false }, action) {
  switch (action.type) {
    case MODAL_SHOW:
      return {
        ...state,
        type: action.modalType,
        show: true,
      };
    case MODAL_CLOSE:
      return {
        ...state,
        type: null,
        show: false,
      };

    default:
      return state;
  }
}
