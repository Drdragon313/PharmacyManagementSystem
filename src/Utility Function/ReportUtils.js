import { models } from "powerbi-client";
export const embedConfig = (
  id,
  accessToken,
  values,
  table,
  column,
  operator
) => {
  return {
    type: "report",
    id: id,
    embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${id}`,
    accessToken: accessToken,
    tokenType: models.TokenType.Embed,
    settings: {
      panes: {
        filters: {
          expanded: false,
          visible: false,
        },
      },
      background: models.BackgroundType.Transparent,
    },
    filters: [
      {
        $schema: "http://powerbi.com/product/schema#basicFilter",
        target: {
          table: table,
          column: column,
        },
        operator: operator,
        values: values,
      },
    ],
  };
};
