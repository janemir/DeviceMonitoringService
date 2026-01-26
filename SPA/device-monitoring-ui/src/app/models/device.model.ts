export interface Device {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  version: string;
}

export interface DeviceStats {
  deviceId: string;
  userName: string;
  totalActiveTime: string;
  lastVersion: string;
  lastActivity: string;
}
