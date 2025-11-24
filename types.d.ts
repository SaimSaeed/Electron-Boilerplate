type Statistics = {
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
};

type StaticData = {
  totalStorage: number;
  cpuModel: string;
  totalMemGB: number;
};

type AddItemResponse = {
  success: boolean;
  id: number;
};

type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
  changeView: View;
  addItem: AddItemResponse;
  getItems: GetItemsResponse;
};

type Item = {
  id: number; // Primary key, auto-increment
  name: string;
  type: string;
  company: string;
  total: number;
  remaining: number;
  sold: number;
  warranty: string; // Defaults to 'None'
};

type GetItemsResponse = Item[];

type UnsubscribeFunction = () => void;

type View = "CPU" | "RAM" | "STORAGE";

interface Window {
  electron: {
    subscribeStatistics: (
      callback: (statistics: Statistics) => void
    ) => UnsubscribeFunction;
    getStaticData: () => Promise<StaticData>;
    subscribeChangeView: (
      callback: (view: View) => void
    ) => UnsubscribeFunction;
    addItem: (data: AddItemPayload) => Promise<AddItemResponse>;
    getItems: () => Promise<GetItemsResponse>;
  };
}
