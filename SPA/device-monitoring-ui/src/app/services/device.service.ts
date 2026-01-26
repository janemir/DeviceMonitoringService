import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Device, DeviceStats } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiUrl = 'http://localhost:5000/api/device';
  
  private mockDevices: Device[] = [
    {
      id: 'f695ea23-8662-4a57-975a-f5afd26655db',
      name: 'John Doe',
      startTime: '2024-01-15T08:00:00.000Z',
      endTime: '2024-01-15T17:00:00.000Z',
      version: '1.0.0.56'
    },
    {
      id: '2a8b7c4d-9e1f-4a3b-8c7d-6e5f4a3b2c1d',
      name: 'Jane Smith',
      startTime: '2024-01-15T09:30:00.000Z',
      endTime: '2024-01-15T18:45:00.000Z',
      version: '1.0.1.12'
    },
    {
      id: '3c9d8e7f-1b2a-4c3d-9e8f-7d6c5b4a3e2f',
      name: 'Bob Johnson',
      startTime: '2024-01-15T10:15:00.000Z',
      endTime: '2024-01-15T16:30:00.000Z',
      version: '2.0.0.3'
    }
  ];

  constructor(private http: HttpClient) { }

  getAllDevices(): Observable<Device[]> {
    return of(this.mockDevices);
  }

  getDeviceById(id: string): Observable<Device> {
    const device = this.mockDevices.find(d => d.id === id);
    return of(device || this.mockDevices[0]);
  }

  getDeviceStats(id: string): Observable<DeviceStats> {
    const device = this.mockDevices.find(d => d.id === id);
    
    let totalActiveTime = '0 hours';
    if (device) {
      const start = new Date(device.startTime);
      const end = new Date(device.endTime);
      const hours = Math.abs(end.getTime() - start.getTime()) / 36e5;
      totalActiveTime = `${hours.toFixed(1)} hours`;
    }

    const mockStats: DeviceStats = {
      deviceId: id,
      userName: device?.name || 'Unknown',
      totalActiveTime: totalActiveTime,
      lastVersion: device?.version || '1.0.0',
      lastActivity: device?.endTime || new Date().toISOString()
    };
    
    return of(mockStats);
  }

  addTestDevice(name: string = 'Test User'): void {
    const newDevice: Device = {
      id: 'test-' + Date.now(),
      name: name,
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 3600000).toISOString(),
      version: '1.0.' + Math.floor(Math.random() * 10)
    };
    this.mockDevices.push(newDevice);
  }
}