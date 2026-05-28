import { type CollectionConfig } from "payload";
import { label } from "../libs/utils";

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: label('加盟伙伴'),
  fields: [
    {
      name: 'name',
      type: 'text',
      label: '联系人'
    },
    {
      name: 'phone',
      type: 'text',
      label: '联系电话',
    },
    {
      name: 'industry',
      type: 'text',
      label: '所属行业'
    },
    {
      name: 'company',
      type: 'text',
      label: '公司名称'
    },
    {
      name: 'address',
      type: 'text',
      label: '公司地址'
    },
    {
      name: 'area',
      type: 'text',
      label: '项目施工面积'
    },
    {
      name: 'price',
      type: 'number',
      label: '材料需求量（万元）'
    },
    {
      name: 'note',
      type: 'text',
      label: '留言备注'
    },
  ]
}