import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device, DeviceStats } from '../../models/device.model';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.less']
})
export class DeviceDetailComponent implements OnInit {
  device?: Device;
  stats?: DeviceStats;
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
        this.loadStats();
      },
      error: (error) => {
        console.error('Error loading device:', error);
        this.loading = false;
      }
    });
  }

  loadStats(): void {
    this.deviceService.getDeviceStats(this.deviceId).subscribe({
      next: (stats) => {
        this.stats = stats;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading stats:', error);
        this.loading = false;
      }
    });
  }
}