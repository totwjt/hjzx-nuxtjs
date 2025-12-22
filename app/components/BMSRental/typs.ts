import type { TabsItem } from '@nuxt/ui'

export const tabsItems = <TabsItem[]>[
    {
        label: '按月租'
    },
    {
        label: '按天租'
    }
]

/**
 * 价格信息接口
 */
interface PriceInfo {
    /** 原价 */
    original: number;
    /** 当前价格 */
    current: number;
    /** 价格单位 */
    unit: string;
    /** 折扣信息 */
    discount: string;
}

/**
 * BMS服务器产品接口
 */
interface IbmsList {
    id: string;
    /** 产品标题 */
    title: string;
    /** 产品副标题 */
    subtitle: string;
    /** 标签列表 */
    tags: string[];
    /** 价格信息 */
    price: PriceInfo;
    /** 规格参数列表 */
    specs: string[];
}

export const bmsList: IbmsList[] = [
    {
        id: "4090",
        title: "4090 24G × 8 裸金属服务器",
        subtitle: "入门级AI卡，适配中小推理任务",
        tags: ["NVLink", "IB网卡", "四川一区"],
        price: {
            original: 9900,
            current: 7920,
            unit: "元/月",
            discount: "节省20%"
        },
        specs: ["8 × 330T FLOPS (FP16)", "2 × Intel（单颗64逻辑核心）", "8 × 64GB DDR4", "2 × 3.84TB 硬盘空间"]
    },
    {
        id: "4090",
        title: "4090 24G × 8 裸金属服务器",
        subtitle: "入门级AI卡，适配中小推理任务",
        tags: ["NVLink", "裸服务器", "四川一区"],
        price: {
            original: 9900,
            current: 7920,
            unit: "元/月",
            discount: "节省20%"
        },
        specs: ["8 × 330T FLOPS (FP16)", "2 × Intel（单颗64逻辑核心）", "8 × 64GB DDR4", "2 × 3.84TB 硬盘空间"]
    },
    {
        id: "4090",
        title: "4090 24G × 8 裸金属服务器",
        subtitle: "入门级AI卡，适配中小推理任务",
        tags: ["NVLink", "裸服务器", "四川一区"],
        price: {
            original: 9900,
            current: 7920,
            unit: "元/月",
            discount: "节省20%"
        },
        specs: ["8 × 330T FLOPS (FP16)", "2 × Intel（单颗64逻辑核心）", "8 × 64GB DDR4", "2 × 3.84TB 硬盘空间"]
    },
    {
        id: "4090",
        title: "4090 24G × 8 裸金属服务器",
        subtitle: "入门级AI卡，适配中小推理任务",
        tags: ["NVLink", "裸服务器", "四川一区"],
        price: {
            original: 9900,
            current: 7920,
            unit: "元/月",
            discount: "节省20%"
        },
        specs: ["8 × 330T FLOPS (FP16)", "2 × Intel（单颗64逻辑核心）", "8 × 64GB DDR4", "2 × 3.84TB 硬盘空间"]
    },
];