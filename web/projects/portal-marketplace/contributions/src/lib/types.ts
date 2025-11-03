export enum MarketplaceItemStatus {
  INSTALLED = 'INSTALLED',
  NOT_INSTALLED = 'NOT_INSTALLED',
}

export interface MarketplaceItem {
  id: string;
  name: string;
  shortDescription: string;
  status: MarketplaceItemStatus;
}

export interface MarketplaceResponse {
  items: MarketplaceItem[];
}

export interface InstallPluginRequest {
  type: string;
  data: Record<string, unknown>;
  ignoreIfExists?: boolean;
}

export interface Program {
  id: number;
  name: string;
}
