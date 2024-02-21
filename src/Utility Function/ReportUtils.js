import axios from "axios";
import { models } from "powerbi-client";
import { baseURL } from "../Components/BaseURLAPI/BaseURLAPI";
export const getReportData = (setReportData) => {
  const authToken = localStorage.getItem("AuthorizationToken");
  const headers = {
    Authorization: authToken,
  };
  const reportID = localStorage.getItem("ReportID");
  axios
    .get(`${baseURL}/get-report-data?report_id=${reportID}`, { headers })
    .then((response) => {
      const newData = response.data.Data;
      setReportData((prevData) => ({
        ...prevData,
        ...newData,
      }));
    })
    .catch(() => {});
};

export const embedConfig = (
  id,
  accessToken,
  values,
  table,
  column,
  operator,
  screenSize
) => {
  return {
    type: "report",
    id: id,
    embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${id}`,
    accessToken: accessToken,
    tokenType: models.TokenType.Embed,

    settings: {
      hideErrors: true,
      layoutType:
        screenSize < 768
          ? models.LayoutType.MobilePortrait
          : models.LayoutType.MobileLandscape,
      panes: {
        filters: {
          expanded: false,
          visible: false,
        },
        pageNavigation: {
          visible: false,
        },
        bars: {
          actionBar: {
            visible: true,
          },
        },
      },
      hideFooter: true,
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
