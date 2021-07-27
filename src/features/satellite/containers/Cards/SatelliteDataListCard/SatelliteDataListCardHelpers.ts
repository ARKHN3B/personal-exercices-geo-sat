import {useMemo} from "react";
import {useTranslation}  from "react-i18next";

/**
 * Create columns once
 */
export function useColumns() {
  const {t}     = useTranslation();
  return useMemo(() => ([
    {
      field: "Date",
      title: t("date"),
    },
    {
      field: "Image name",
      title: t("image name"),
    },
    {
      field: "Region name",
      title: t("region name"),
    },
    {
      field: "Country name",
      title: t("country name"),
    },
    {
      field: "Clouds percentage",
      title: t("clouds percentage"),
    },
    {
      field: "Snow percentage",
      title: t("snow percentage"),
    },
    {
      field: "Urban buildings percentage",
      title: t("urban buildings percentage"),
    }
  ]), []);
}
