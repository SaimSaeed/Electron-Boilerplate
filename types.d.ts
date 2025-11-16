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

type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
  changeView: View
};

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
  };
}
