import { FILTER_REDUCER_CONST } from "../components/const/filterReducerConst";
import * as FILTER_CONST from "./../components/const/filterValues";

export const initialFilter = {
  gender: [],
  category: [],
  color: [],
  size: [],
};

export const filterReducer = (state, action) => {
  const { payload } = action;
  let newState = { ...state };
  switch (action.type) {
    case FILTER_REDUCER_CONST.CHANGE_FILTER:
      switch (action.filterName) {
        case FILTER_REDUCER_CONST.GENDER:
          newState = { ...newState, gender: payload };
          break;
        case FILTER_REDUCER_CONST.CATEGORY:
          newState = { ...newState, category: payload };
          break;
        case FILTER_REDUCER_CONST.COLOR:
          newState = { ...newState, color: payload };
          break;
        case FILTER_REDUCER_CONST.SIZE:
          newState = { ...newState, size: payload };
          break;
        default:
          return state;
      }
      break;

    case FILTER_REDUCER_CONST.CLEAR_FILTER:
      switch (action.filterName) {
        case FILTER_REDUCER_CONST.GENDER:
          newState = { ...newState, gender: [] };
          break;
        case FILTER_REDUCER_CONST.CATEGORY:
          newState = { ...newState, category: [] };
          break;
        case FILTER_REDUCER_CONST.COLOR:
          newState = { ...newState, color: [] };
          break;
        case FILTER_REDUCER_CONST.SIZE:
          newState = { ...newState, size: [] };
          break;
        default:
          return state;
      }
      break;
    case FILTER_REDUCER_CONST.CLEAR_ALL_FILTER:
      newState = { gender: [], category: [], color: [], size: [] };
      break;
    default:
      return state;
  }
  return newState;
};

export const FILTER_LABEL_REDUCER_MAP = [
  {
    label: FILTER_REDUCER_CONST.GENDER.toUpperCase(),
    stateKey: "gender",
    dropdownItems: FILTER_CONST.FILTER_GENDER,
  },
  {
    label: FILTER_REDUCER_CONST.CATEGORY.toUpperCase(),
    stateKey: "category",
    dropdownItems: FILTER_CONST.FILTER_CATEGORIES,
  },
  {
    label: FILTER_REDUCER_CONST.COLOR.toUpperCase(),
    stateKey: "color",
    dropdownItems: FILTER_CONST.FILTER_COLOR,
  },
  {
    label: FILTER_REDUCER_CONST.SIZE.toUpperCase(),
    stateKey: "size",
    dropdownItems: FILTER_CONST.FILTER_SIZE,
  },
];
