export enum SupportTarget {
  Customer = 'customer',
  Staff = 'staff'
}

export const SUPPORT_NAME_MAP = {
  [SupportTarget.Customer]: '用户',
  [SupportTarget.Staff]: '客服',
}