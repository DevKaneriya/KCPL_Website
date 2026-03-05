import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Career } from './career/career';
import { ProductPage } from './product-page/product-page';
import { ContactPage } from './contact-page/contact-page';
import { PdpRadiator } from './pdp-radiator/pdp-radiator';
import { PdpCondenser } from './pdp-condenser/pdp-condenser';
import { GalleryPage } from './gallery-page/gallery-page';
import { QualityControlPage } from './quality-control-page/quality-control-page';
import { WarehousePage } from './warehouse-page/warehouse-page';
import { ManufacturingPage } from './manufacturing-page/manufacturing-page';
import { BlogDetailPage } from './blog-detail-page/blog-detail-page';
import { Blog } from './blog/blog';

export const routes: Routes = [

    { path: '', component: Home, data: { transparentHeader: true } },
    { path: 'about', component: About, data: { transparentHeader: false } },
    { path: 'industrial/quality-control', component: QualityControlPage, data: { transparentHeader: true } },
    { path: 'industrial/warehouse', component: WarehousePage, data: { transparentHeader: true } },
    { path: 'industrial/manufacturing', component: ManufacturingPage, data: { transparentHeader: true } },
    { path: 'products', component: ProductPage, data: { transparentHeader: false } },
    { path: 'product/radiator', component: PdpRadiator, data: { transparentHeader: false } },
    { path: 'product/condenser', component: PdpCondenser, data: { transparentHeader: false } },
    { path: 'career', component: Career, data: { transparentHeader: false } },
    { path: 'contact', component: ContactPage, data: { transparentHeader: false } },
    { path: 'gallery', component: GalleryPage, data: { transparentHeader: false } },
    { path: 'blogs', component: Blog, data: { transparentHeader: false } },
    {
        path: 'blogs/:slug',
        component: BlogDetailPage,
        data: { transparentHeader: false }
    }

];
