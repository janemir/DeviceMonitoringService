import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device, DeviceSession } from '../../models/device.model';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.less']
})
export class DeviceDetailComponent implements OnInit {
  device?: Device;
  sessions: DeviceSession[] = [];
  loading = false;
  deviceId = '';

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.deviceId = params['id'];
      this.loadDeviceDetails();
    });
  }

  loadDeviceDetails(): void {
    this.loading = true;
    
    this.deviceService.getDeviceById(this.deviceId).subscribe({
      next: (device) => {
        this.device = device;
        this.loadDeviceSessions();
      },
      error: (error) => {
        console.error('Error loading device:', error);
        this.loading = false;
      }
    });
  }

  loadDeviceSessions(): void {
    this.deviceService.getDeviceSessions(this.deviceId).subscribe({
      next: (sessions) => {
        this.sessions = sessions;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading sessions:', error);
        this.loading = false;
      }
    });
  }

  calculateDuration(start: string, end: string): string {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffMs = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  }
}