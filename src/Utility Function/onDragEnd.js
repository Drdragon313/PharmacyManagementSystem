import { reorderFormDataArray } from "./reorderFormDataArray";

export const onDragEnd = (
  result,
  formDataArray,
  dispatch,
  updateFormDataOrder
) => {
  if (!result.destination) {
    return;
  }

  const startIndex = result.source.index;
  const endIndex = result.destination.index;

  const reorderedData = reorderFormDataArray(
    formDataArray,
    startIndex,
    endIndex
  );
  dispatch(updateFormDataOrder(reorderedData));
};
