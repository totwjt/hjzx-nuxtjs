/**
 * 容器实例-gpu
 */
export interface ContainerInstance {
    /**
     * 自定义开放端口
     */
    customPorts: string;
    /**
     * 默认开放端口
     */
    defaultPorts: string;
    /**
     * 实例名称
     */
    name: string;
    /**
     * 套餐id
     */
    packageTemplateItemId: number;
    /**
     * 配置详情
     */
    productName: string;
    /**
     * 到期时间
     */
    rentalEndTime: string;
    /**
     * 创建时间
     */
    rentalStartTime: string;
    /**
     * ssh IP地址
     */
    sshIpAddress: string;
    /**
     * ssh 密码
     */
    sshPassword: string;
    /**
     * ssh 端口号
     */
    sshPort: string;
    /**
     * ssh 账号
     */
    sshUserName: string;
    /**
     * 状态
     */
    status: number;
    /**
     * 状态描述
     */
    statusStr: string;
    /**
     * 存储
     */
    storageName: string;
    [property: string]: any;
}

export type SshInfo = Pick<
    ContainerInstance,
    'sshPort' | 'sshUserName' | 'sshIpAddress'
>