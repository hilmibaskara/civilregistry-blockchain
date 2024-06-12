export interface NetworkData {
    events: Record<string, any>;
    links: Record<string, any>;
    address: string;
    transactionHash: string;
}

export interface Networks {
    [networkId: number]: NetworkData;
}

export interface CivilRegistryContract {
    abi: any;
    networks: Networks;
}