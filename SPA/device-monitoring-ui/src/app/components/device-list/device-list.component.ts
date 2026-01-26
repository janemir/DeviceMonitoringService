import { Component, OnInit } from '@angular/core';
import { Device } from '../../models/device.model';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.less']
})
export class DeviceListComponent implements OnInit {
  devices: Device[] = [];
  loading = false;

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(): void {
    this.loading = true;
    this.deviceService.getAllDevices().subscribe({
      next: (data) => {
        this.devices = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading devices:', error);
        this.loading = false;
      }
    });
  }

  addTestDevice(): void {
    this.deviceService.addTestDevice();
    this.loadDevices(); // Перезагружаем список
  }
}