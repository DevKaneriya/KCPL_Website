import { Component } from '@angular/core';
import { WarehouseCentralizedStorage } from "../warehouse-centralized-storage/warehouse-centralized-storage";
import { WarehouseInventoryManagement } from "../warehouse-inventory-management/warehouse-inventory-management";
import { WarehouseModernManufacturing } from "../warehouse-modern-manufacturing/warehouse-modern-manufacturing";
import { WarehouseFlexibleCapacity } from "../warehouse-flexible-capacity/warehouse-flexible-capacity";
import { ReachOut } from "../reach-out/reach-out";
import { Footer } from "../footer/footer";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-warehouse-page',
  standalone: true,
  imports: [
    WarehouseCentralizedStorage,
    WarehouseInventoryManagement,
    WarehouseModernManufacturing,
    WarehouseFlexibleCapacity,
    ReachOut,
    Footer,
    RouterLink
  ],
  templateUrl: './warehouse-page.html',
  styleUrl: './warehouse-page.scss'
})
export class WarehousePage {}