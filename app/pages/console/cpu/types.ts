// types/container.ts
export interface ContainerInstance {
    id: string;
    name: string;
    status: 0 | 1 | 2 | 3;
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