import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device, DeviceSession } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiUrl = 'http://localhost:5156/api/device';

  constructor(private http: HttpClient) { }

  getAllDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.apiUrl);
  }

  getDeviceSessions(deviceId: string): Observable<DeviceSession[]> {
    return this.http.get<DeviceSession[]>(`${this.apiUrl}/${deviceId}/stats`);
  }

  getDeviceById(id: string): Observable<Device> {
  return this.http.get<Device>(`${this.apiUrl}/${id}`);
}
}