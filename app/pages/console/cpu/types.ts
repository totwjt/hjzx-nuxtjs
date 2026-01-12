// types/container.ts
export interface ContainerInstance {
    id: string;
    name: string;
    status: 'running' | 'stopped' | 'pending';
    config: {
        gpu: string;
        cpu: string;
        memory: string;
    };
    storage: {
        system: string;
        data: string;
    };
    paymentType: string;
    createdAt: string;
    expiredAt: string;
    ssh: {
        host: string;
        port: number;
        user: string;
        password: string;
    };
}