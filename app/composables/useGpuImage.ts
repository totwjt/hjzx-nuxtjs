export const useGpuImage = () => {

  const toast = useToast()

  const activeTab = ref('base');
  const selectedImage = ref(null);
  const open = ref(false)

  const tabs = [
    { id: 'base', label: '基础镜像' },
    { id: 'ai', label: 'AI镜像' },
    { id: 'my', label: '我的镜像' }
  ];

  const images = ref([
    //   {
    //     id: 1,
    //     name: 'Python3.10.12-ubuntu22.04-cuda12.4.1-jupyter',
    //     icon: 'logos:ubuntu',
    //     desc: '更新时间：2025-09-11 11:46 版本：12.2.2-cudnn8-devel-ubuntu22.04-jupyter'
    //   },
    //   {
    //     id: 2,
    //     name: 'PyTorch2.3.0-CUDA12.4.1-py3.10-Ubuntu22.04',
    //     icon: 'logos:python',
    //     desc: '更新时间：2025-09-11 11:46 版本：12.2.2-cudnn8-devel-ubuntu22.04-jupyter'
    //   },
    //   {
    //     id: 3,
    //     name: 'TensorFlow2.15.0-CUDA11.8.0-cudnn8-py3.10-Ubuntu...',
    //     icon: 'logos:tensorflow',
    //     desc: '更新时间：2025-09-11 11:46 版本：12.2.2-cudnn8-devel-ubuntu22.04-jupyter'
    //   },
    //   {
    //     id: 4,
    //     name: 'Ollama0.6.8-PyTorch2.4.0-cuda12.4-py3.10',
    //     icon: 'devicon:ollama',
    //     desc: '更新时间：2025-09-11 11:46 版本：12.2.2-cudnn8-devel-ubuntu22.04-jupyter'
    //   },
    //   {
    //     id: 5,
    //     name: 'Cuda12.2.2-cudnn8-devel-ubuntu22.04',
    //     icon: 'material-icon-theme:cuda',
    //     desc: '更新时间：2025-09-11 11:46 版本：12.2.2-cudnn8-devel-ubuntu22.04-jupyter'
    //   },
    //   {
    //     id: 6,
    //     name: 'Cuda11.8.0-cudnn8-devel-ubuntu22.04',
    //     icon: 'cuda',
    //     desc: '更新时间：2025-09-11 11:46 版本：12.2.2-cudnn8-devel-ubuntu22.04-jupyter'
    //   },

    //   {
    //     id: 6,
    //     name: 'Cuda11.8.0-cudnn8-devel-ubuntu22.04',
    //     icon: 'cuda',
    //     desc: '更新时间：2025-09-11 11:46 版本：12.2.2-cudnn8-devel-ubuntu22.04-jupyter'
    //   },
    //   {
    //     id: 6,
    //     name: 'Cuda11.8.0-cudnn8-devel-ubuntu22.04',
    //     icon: 'cuda',
    //     desc: '更新时间：2025-09-11 11:46 版本：12.2.2-cudnn8-devel-ubuntu22.04-jupyter'
    //   },
    //   {
    //     id: 6,
    //     name: 'Cuda11.8.0-cudnn8-devel-ubuntu22.04',
    //     icon: 'cuda',
    //     desc: '更新时间：2025-09-11 11:46 版本：12.2.2-cudnn8-devel-ubuntu22.04-jupyter'
    //   },
    //   {
    //     id: 6,
    //     name: 'Cuda11.8.0-cudnn8-devel-ubuntu22.04',
    //     icon: 'cuda',
    //     desc: '更新时间：2025-09-11 11:46 版本：12.2.2-cudnn8-devel-ubuntu22.04-jupyter'
    //   },
    //   {
    //     id: 6,
    //     name: 'Cuda11.8.0-cudnn8-devel-ubuntu22.04',
    //     icon: 'cuda',
    //     desc: '更新时间：2025-09-11 11:46 版本：12.2.2-cudnn8-devel-ubuntu22.04-jupyter'
    //   },
    //   {
    //     id: 6,
    //     name: 'Cuda11.8.0-cudnn8-devel-ubuntu22.04',
    //     icon: 'cuda',
    //     desc: '更新时间：2025-09-11 11:46 版本：12.2.2-cudnn8-devel-ubuntu22.04-jupyter'
    //   },
    //   {
    //     id: 6,
    //     name: 'Cuda11.8.0-cudnn8-devel-ubuntu22.04',
    //     icon: 'cuda',
    //     desc: '更新时间：2025-09-11 11:46 版本：12.2.2-cudnn8-devel-ubuntu22.04-jupyter'
    //   },
    //   {
    //     id: 6,
    //     name: 'Cuda11.8.0-cudnn8-devel-ubuntu22.04',
    //     icon: 'cuda',
    //     desc: '更新时间：2025-09-11 11:46 版本：12.2.2-cudnn8-devel-ubuntu22.04-jupyter'
    //   },
    //   {
    //     id: 6,
    //     name: 'Cuda11.8.0-cudnn8-devel-ubuntu22.04',
    //     icon: 'cuda',
    //     desc: '更新时间：2025-09-11 11:46 版本：12.2.2-cudnn8-devel-ubuntu22.04-jupyter'
    //   },
    //   {
    //     id: 6,
    //     name: 'Cuda11.8.0-cudnn8-devel-ubuntu22.04',
    //     icon: 'cuda',
    //     desc: '更新时间：2025-09-11 11:46 版本：12.2.2-cudnn8-devel-ubuntu22.04-jupyter'
    //   },
  ]);

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
    try {

      const { data, pending, error, refresh } = await useFetch('/api/markets/image/list', {

      })

      images.value = data.value
    } catch (error) {
      console.log(error)
    }
  }

  getList()

  return {
    images,
    getList
  }
}
