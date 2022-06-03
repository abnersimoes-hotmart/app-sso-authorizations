export interface ISpecialCampaign {
  name: string,
  type: string,
  toggleName: string,
  eventLabel: string,
  language: string,
  startDate: string,
  endDate: string,
  labels: {
    title: string,
    description: string,
    orderByHottest: string,
    orderByDearest: string,
    logoAlt: string
  }
}
