export type LastMeasurement = {
  createdAt: string; 
  value: string;
};

export type Sensor = {
  _id: string; 
  title: string;
  unit: string;
  sensorType: string;
  icon: string;
  lastMeasurement?: LastMeasurement;
};

export type SensorResult = {
  node: string;
  sensors: Sensor[];
};

export type PageMeta = {
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
};

export type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
  page?: PageMeta;
};
