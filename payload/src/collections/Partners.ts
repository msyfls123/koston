import { type CollectionConfig } from "payload";
import { label } from "../libs/utils";
import { AdminGroup } from "../libs/admin";

const adminReadOnly = {
  admin: {
    readOnly: true,
  }
}

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: label('加盟伙伴'),
  admin: {
    useAsTitle: 'name',
    group: AdminGroup.Support,
    defaultColumns: [
      'name',
      'phone',
      'company',
      'note',
    ]
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: '联系人',
      ...adminReadOnly,
    },
    {
      name: 'phone',
      type: 'text',
      label: '联系电话',
      ...adminReadOnly,
    },
    {
      name: 'industry',
      type: 'text',
      label: '所属行业',
      ...adminReadOnly,
    },
    {
      name: 'company',
      type: 'text',
      label: '公司名称',
      ...adminReadOnly,
    },
    {
      name: 'address',
      type: 'text',
      label: '公司地址',
      ...adminReadOnly,
    },
    {
      name: 'area',
      type: 'text',
      label: '项目施工面积（万m²）',
      ...adminReadOnly,
    },
    {
      name: 'price',
      type: 'number',
      label: '材料需求量（万元）',
      ...adminReadOnly,
    },
    {
      name: 'note',
      type: 'text',
      label: '留言备注',
      ...adminReadOnly,
    },
    {
      name: 'progress',
      label: '处理与否',
      type: 'checkbox',
    }
  ]
}