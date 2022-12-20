import "./App.css";

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import UserContext from "./contexts/UserContext";
import MainLayout from "./layouts/MainLayout";
import ShowCase from "./pages/__test/Showcase";
import PageNotFound from "./pages/404";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ChangePassword from "./pages/auth/ChangePassword";
import ChangingPassword from "./pages/auth/ChangingPassword";
import Signin from "./pages/auth/Signin";

import Employees from "./pages/employees";
import EmployeeDetails from "./pages/employees/EmployeeDetails";
import EmployeeRole from "./pages/employees/Employee-role";
import EmployeeRoleDetails from "./pages/employees/EmployeeRoleDetails";
import Users from "./pages/employees/User";

import DriverLicense from "./pages/driver-license/index";
import DriverLicenseDetails from "./pages/driver-license/DriverLicenseDetails";

import MeasurementUnit from "./pages/measurement-unit";
import MeasurementUnitDetails from "./pages/measurement-unit/MeasurementUnitDetails";

import LiftingCapacity from "./pages/lifting-capacity";
import LiftingCapacityDetails from "./pages/lifting-capacity/LiftingCapacityDetails";

import LiftingType from "./pages/lifting-type";
import LiftingTypeDetails from "./pages/lifting-type/LiftingTypeDetails";

import WarehouseProduct from "./pages/products/WarehouseProduct";
import WarehouseProducts from "./pages/warehouses/WarehouseProduct";
import Product from "./pages/products";
import WarehouseDetails from "./pages/warehouses/WarehouseDetails";
import Warehouses from "./pages/warehouses";

import ProductType from "./pages/producttype";
import ProducttypeDetails from "./pages/producttype/ProducttypeDetails";

import ProductGroup from "./pages/productgroup";
import ProductgroupDetails from "./pages/productgroup/ProductgroupDetails";

import ProductCategory from "./pages/productcategory";
import ProductcategoryDetails from "./pages/productcategory/ProductcategoryDetails";

import Sales from "./pages/sales";
import SalesDetails from "./pages/sales/SalesDetails";

import Services from "./pages/services";
import ServicesDetails from "./pages/services/ServicesDetails";

import Vehicles from "./pages/vehicles";
import VehiclesDetails from "./pages/vehicles/VehiclesDetails";

import Projects from "./pages/project";
import Archyvas from "./pages/Archyvas";
import ArchyvasDetails from "./pages/Archyvas/archyvasDetail";
import ProjectDetails from "./pages/project/ProjectDetails";
import ProjectRentDetails from "./pages/project/ProjectRentDetails";
import ProjectReturnDetails from "./pages/project/ProjectReturnDetails";
import ProjectSalesOrderDetails from "./pages/project/ProjectSalesDetails";
import ProjectOfferDetails from "./pages/project/ProjectOfferDetail";

import Workingtools from "./pages/workingtools";
import WorkingtoolsDetails from "./pages/workingtools/WorkingtoolsDetails";
import WorkingtoolsType from "./pages/workingtools/WorkingtoolsType";
import WorkingtoolsMeasurement from "./pages/workingtools/WorkigntoolsMeasurement";

import Invoice from "./pages/invoice";
import InvoiceDetails from "./pages/invoice/InvoiceDetails";

import Orders from "./pages/orders";

import CompanyProfile from "./pages/companyprofile";

import EcommerceClient from "./pages/ecommerce-client";
import EcommerceClientDetails from "./pages/ecommerce-client/ecommerce-clientDetails";
import EcommerceOrder from "./pages/ecommerce-order";
import EcommerceOrderDetails from "./pages/ecommerce-order/ecommerce-orderDetails";

import { IUser } from "./types/services/user.types";

const ExternalInvoice = React.lazy(
  () => import("./pages/invoice/externalInvoice")
);

const App = () => {
  const [user, setUser] = useState<IUser>();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/invoice/:invoiceId" element={<ExternalInvoice />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ChangePassword />} />
          <Route path="/change-password" element={<ChangingPassword />} />

          {/* dashboard */}
          <Route path="dashboard" element={<MainLayout />}>
            <Route path="employees">
              <Route index element={<Employees />}></Route>
              <Route path=":id" element={<EmployeeDetails />} />
            </Route>

            <Route path="equipments">
              <Route index element={<Workingtools />}></Route>
              <Route path=":id" element={<WorkingtoolsDetails />} />
              <Route path="type">
                <Route index element={<WorkingtoolsType />}></Route>
              </Route>
              <Route path="measurement">
                <Route index element={<WorkingtoolsMeasurement />}></Route>
              </Route>
            </Route>

            <Route path="employee-roles">
              <Route index element={<EmployeeRole />}></Route>
              <Route path=":id" element={<EmployeeRoleDetails />} />
            </Route>

            <Route path="users">
              <Route index element={<Users />}></Route>
              {/* <Route path=":id" element={<EmployeeRoleDetails />} /> */}
            </Route>

            <Route path="driver-license">
              <Route index element={<DriverLicense />}></Route>
              <Route path=":id" element={<DriverLicenseDetails />} />
            </Route>

            <Route path="measurement-unit">
              <Route index element={<MeasurementUnit />}></Route>
              <Route path=":id" element={<MeasurementUnitDetails />} />
            </Route>

            <Route path="lifting-capacity">
              <Route index element={<LiftingCapacity />}></Route>
              <Route path=":id" element={<LiftingCapacityDetails />} />
            </Route>

            <Route path="lifting-type">
              <Route index element={<LiftingType />}></Route>
              <Route path=":id" element={<LiftingTypeDetails />} />
            </Route>

            <Route path="warehouses">
              <Route index element={<Warehouses />}></Route>
              <Route path=":id" element={<WarehouseDetails />} />
              <Route path="product">
                <Route index element={<WarehouseProducts />}></Route>
                <Route path=":id" element={<WarehouseProducts />} />
              </Route>
              <Route path="products">
                <Route index element={<Product />}></Route>
                <Route path=":id" element={<WarehouseProduct />} />
              </Route>
            </Route>

            <Route path="warehouse-settings">
              <Route path="producttype">
                <Route index element={<ProductType />}></Route>
                <Route path=":id" element={<ProducttypeDetails />} />
              </Route>

              <Route path="productgroup">
                <Route index element={<ProductGroup />}></Route>
                <Route path=":id" element={<ProductgroupDetails />} />
              </Route>

              <Route path="productcategory">
                <Route index element={<ProductCategory />}></Route>
                <Route path=":id" element={<ProductcategoryDetails />} />
              </Route>
            </Route>

            <Route path="customers">
              <Route index element={<Sales />}></Route>
              <Route path=":id" element={<SalesDetails />} />
            </Route>

            <Route path="services">
              <Route index element={<Services />}></Route>
              <Route path=":id" element={<ServicesDetails />} />
            </Route>

            <Route path="vehicles">
              <Route index element={<Vehicles />}></Route>
              <Route path=":id" element={<VehiclesDetails />} />
            </Route>

            <Route path="projects">
              <Route index element={<Projects />}></Route>
              <Route path=":id" element={<ProjectDetails />} />

              <Route path="rentorder">
                <Route index element={<ProjectRentDetails />}></Route>
                <Route path=":id" element={<ProjectRentDetails />} />
              </Route>

              <Route path="returnorder">
                <Route index element={<ProjectReturnDetails />}></Route>
                <Route path=":id" element={<ProjectReturnDetails />} />
              </Route>

              <Route path="salesorder">
                <Route index element={<ProjectSalesOrderDetails />}></Route>
                <Route path=":id" element={<ProjectSalesOrderDetails />} />
              </Route>

              <Route path="offer">
                <Route index element={<ProjectOfferDetails />}></Route>
                <Route path=":id" element={<ProjectOfferDetails />} />
              </Route>
            </Route>

            <Route path="archyvas">
              <Route index element={<Archyvas />}></Route>
              <Route path=":id" element={<ArchyvasDetails />} />
            </Route>

            <Route path="invoices">
              <Route index element={<Invoice />}></Route>
              <Route path=":id" element={<InvoiceDetails />} />
            </Route>

            <Route path="orders">
              <Route index element={<Orders />}></Route>
              {/* <Route path=":id" element={<InvoiceDetails />} /> */}
            </Route>

            <Route path="company-profile">
              <Route index element={<CompanyProfile />}></Route>
              {/* <Route path=":id" element={<InvoiceDetails />} /> */}
            </Route>

            <Route path="ecommerce-client">
              <Route index element={<EcommerceClient />}></Route>
              <Route path=":id" element={<EcommerceClientDetails />} />
            </Route>
            <Route path="ecommerce-order">
              <Route index element={<EcommerceOrder />}></Route>
              <Route path=":id" element={<EcommerceOrderDetails />} />
            </Route>
          </Route>

          <Route path="/usage" element={<ShowCase />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};
export default App;
