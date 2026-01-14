/*----------------------------------------------------*\
｜                       镜像
\*----------------------------------------------------*/

export interface IImage {
  /**
   * 默认开放端口
   */
  defaultPorts: string | string[];
  /**
   * 描述
   */
  description: string;
  /**
   * icon 图标
   */
  iconClass: string;
  /**
   * 镜像资源主键
   */
  id: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 更新时间
   */
  updateTime: string;
  /**
   * 版本
   */
  versionDescription: string;
  [property: string]: any;
}
