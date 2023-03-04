import filterCSS from "./filterValues.module.css";

export const FILTER_GENDER = [
  { label: "MEN", value: "MEN" },
  { label: "WOMEN", value: "WOMEN" },
];

export const FILTER_CATEGORIES = [
  { label: "SAREES", value: "SAREES" },
  { label: "SALWAR KAMEEZ", value: "SALWAR_KAMEEZ" },
  { label: "KURTI", value: "KURTI" },
  { label: "NIGHTGOWN", value: "NIGHTGOWN" },
  { label: "LEGGINGS", value: "LEGGINGS" },
  { label: "PATIYALA SALWAR", value: "PATIYALA_SALWAR" },
  { label: "PALAZZO", value: "PALAZZO" },
  { label: "T SHIRT", value: "T_SHIRT" },
  { label: "MEN KURTA", value: "MEN_KURTA" },
  { label: "SHAWL", value: "SHAWL" },
  { label: "SWEATER", value: "SWEATER" },
  { label: "BEDSHEET", value: "BEDSHEET" },
];

export const FILTER_SIZE = [
  { label: "XS", value: "XS" },
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  { label: "ONE SIZE", value: "ONE_SIZE" },
];

export const FILTER_COLOR_TYPES = [
  {
    label: "RED",

    value: "RED",
  },
  { label: "WHITE", value: "WHITE" },
  { label: "BLACK", value: "BLACK" },
  { label: "BLUE", value: "BLUE" },
  { label: "GREEN", value: "GREEN" },
  { label: "YELLOW", value: "YELLOW" },
  { label: "ORANGE", value: "ORANGE" },
  { label: "BROWN", value: "BROWN" },
  { label: "GREY", value: "GREY" },
];

export const FILTER_COLOR = FILTER_COLOR_TYPES.map((item, index) => {
  return {
    label: (
      <div className={filterCSS.menu_item}>
        <label>{item.label}</label>
        <div
          className={filterCSS.circle_color}
          style={{ background: item.label }}
        ></div>
      </div>
    ),
    value: item.value,
  };
});
