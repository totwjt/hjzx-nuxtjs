/**
 * 镜像
 */
export interface IImage {
  desc: string;
  icon: string;
  id: number;
  name: string;
  [property: string]: any;
}

export const useGpuImage = () => {

  const toast = useToast()

  const activeTab = ref('base');
  const selectedImage = ref(null);
  const open = ref(false)

  const tabs = [
    { id: 'base', label: '基础镜像' },
    // { id: 'ai', label: 'AI镜像' },
    // { id: 'my', label: '我的镜像' }
  ];

  const images = ref(<IImage[]>[]);

  const selectImage = (image) => {
    selectedImage.value = image;
    open.value = !open.value
  };

  const HandleSetPort = () => {
    if (!selectedImage.value) {
      toast.add({ color: 'error', icon: 'fluent-color:error-circle-48', title: '提示', description: '请先选择镜像再配置端口号' })
    }
  }

  const getList = async () => {

    const { data, pending, error, refresh } = await useFetch('/api/markets/image/list')

    images.value = data.value
  }

  getList()

  return {
    images,
    tabs,
    getList
  }
}
