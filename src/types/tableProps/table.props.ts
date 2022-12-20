import { EmployeeTableDto, EmployeeRoleTableDto, UserTableDto } from '../services/employees.types';
import { ProductCategoryTableDto } from '../services/productcategory.type';
import { ProductGroupTableDto } from '../services/productgroup.type';
import { ProductItemDto } from '../services/product.types';
import { ProductTypeTableDto } from '../services/producttype.type';
import { ProjectTableDto } from '../services/project.types';
import { ClientsTableDto } from '../services/clients.type';
import { ContractTableDto } from '../services/contract.types';
import { PeopleTableDto } from '../services/people.types';
import { ServicesTableDto } from '../services/services.types';
import { VehiclesTableDto } from '../services/vehicles.type';
import { WarehouseTableDto } from '../services/warehouse.types';

export type IconNames =
    | 'print'
    | 'add'
    | 'add-deactive'
    | 'home'
    | 'arrow-right'
    | 'arrow-right2'
    | 'arrow-left'
    | 'filter'
    | 'more'
    | 'arrow-up-black'
    | 'arrow-down-dark'
    | 'menu'
    | 'plus'
    | 'message'
    | 'notification'
    | 'add-small'
    | 'doc'
    | 'add-btn'
    | 'copy'
    | 'sub-plus'
    | 'save';

export interface TableActionsType<T> {
    name: string;
    icon: IconNames;
    handleAction: (_data: T) => void;
}

export interface EmployeeTableProps {
    handleClickRow: (_row: EmployeeTableDto) => void;
    data: EmployeeTableDto[];
    uniqueCol: keyof EmployeeTableDto;
    hide: (keyof EmployeeTableDto)[];
    rowsPerPage?: number | string;
    totalPages?: number | string;
    actions: TableActionsType<EmployeeTableDto>[];
    onChangePage: (_page: number) => {};
}

export interface UserTableProps {
    handleClickRow: (_row: UserTableDto) => void;
    data: UserTableDto[];
    uniqueCol: keyof UserTableDto;
    hide: (keyof UserTableDto)[];
    rowsPerPage?: number | string;
    totalPages?: number | string;
    actions: TableActionsType<UserTableDto>[];
    onChangePage: (_page: number) => {};
}

export interface EmployeeRoleTableProps {
    handleClickRow: (_row: EmployeeRoleTableDto) => void;
    data: EmployeeRoleTableDto[];
    uniqueCol: keyof EmployeeRoleTableDto;
    hide: (keyof EmployeeRoleTableDto)[];
    rowsPerPage?: number | string;
    totalPages?: number | string;
    actions: TableActionsType<EmployeeRoleTableDto>[];
    onChangePage: (_page: number) => {};
}

export interface DismissTableProps {
    handleClickRow: (_row: any) => void;
    data: any[];
    subdata?: any[];
    uniqueCol: keyof any;
    hide: (keyof any)[];
    rowsPerPage?: number | string;
    totalPages?: number | string;
    actions: TableActionsType<any>[];
    onChangePage: (_page: number) => {};
}

export interface ProductCategoryTableProps {
    handleClickRow: (_row: ProductCategoryTableDto) => void;
    data: ProductCategoryTableDto[];
    uniqueCol: keyof ProductCategoryTableDto;
    hide: (keyof ProductCategoryTableDto)[];
    rowsPerPage?: number | string;
    totalPages?: number | string;
    actions: TableActionsType<ProductCategoryTableDto>[];
    onChangePage: (_page: number) => {};
}

export interface ProductGroupTableProps {
    handleClickRow: (_row: ProductGroupTableDto) => void;
    data: ProductGroupTableDto[];
    uniqueCol: keyof ProductGroupTableDto;
    hide: (keyof ProductGroupTableDto)[];
    rowsPerPage?: number | string;
    totalPages?: number | string;
    actions: TableActionsType<ProductGroupTableDto>[];
    onChangePage: (_page: number) => {};
}

export interface TableProps {
    handleClickRow: (_row: any) => void;
    data: any[];
    subdata?: any[];
    uniqueCol: keyof any;
    hide: (keyof any)[];
    rowsPerPage?: number | string;
    totalPages?: number | string;
    actions?: TableActionsType<any>[];
    onChangePage: (_page: number) => {};
}
export interface OrderTableProps {
    handleClickRow: (_row: any, _key: any) => void;
    data: any[];
    subdata?: any[];
    uniqueCol: keyof any;
    hide: (keyof any)[];
    rowsPerPage?: number | string;
    totalPages?: number | string;
    actions: TableActionsType<any>[];
    onChangePage: (_page: number) => {};
}

export interface ProductItemTableProps {
    handleClickRow: (_row: ProductItemDto) => void;
    data: ProductItemDto[];
    uniqueCol: keyof ProductItemDto;
    hide: (keyof ProductItemDto)[];
    rowsPerPage?: number | string;
    totalPages?: number | string;
    actions: TableActionsType<ProductItemDto>[];
    onChangePage: (_page: number) => {};
}

export interface ProductTypeTableProps {
    handleClickRow: (_row: ProductTypeTableDto) => void;
    data: ProductTypeTableDto[];
    uniqueCol: keyof ProductTypeTableDto;
    hide: (keyof ProductTypeTableDto)[];
    rowsPerPage?: number | string;
    totalPages?: number | string;
    actions: TableActionsType<ProductTypeTableDto>[];
    onChangePage: (_page: number) => {};
}
export interface ProjectTableProps {
    handleClickRow: (_row: ProjectTableDto) => void;
    data: any;
    additional?: boolean;
    isShowAddtionalBtn?: boolean;
    uniqueCol: keyof ProjectTableDto;
    // hide: (keyof ProjectTableDto)[];
    hide: any;
    sendData?: any;
    showIcon: boolean;
    showTitle: boolean;
    subuniqueCol: keyof ProjectTableDto;
    subhide: any;
    rowsPerPage?: number | string;
    totalPages?: number | string;
    actions: any;
    onChangePage: (_page: number) => {};
}
export interface ClientsTableProps {
    handleClickRow: (_row: ClientsTableDto) => void;
    data: ClientsTableDto[];
    uniqueCol: keyof ClientsTableDto;
    hide: (keyof ClientsTableDto)[];
    rowsPerPage?: number | string;
    totalPages?: number | string;
    actions: TableActionsType<ClientsTableDto>[];
    onChangePage: (_page: number) => {};
}
export interface contractTableProps {
    handleClickRow: (_row: ContractTableDto) => void;
    data: ContractTableDto[];
    uniqueCol: keyof ContractTableDto;
    hide: (keyof ContractTableDto)[];
    rowsPerPage?: number | string;
    addNewButtonText?: any;
    totalPages?: number | string;
    actions: TableActionsType<ContractTableDto>[];
    onChangePage: (_page: number) => {};
}
export interface peopleTableProps {
    handleClickRow: (_row: PeopleTableDto) => void;
    data: PeopleTableDto[];
    uniqueCol: keyof PeopleTableDto;
    hide: (keyof PeopleTableDto)[];
    rowsPerPage?: number | string;
    totalPages?: number | string;
    actions: TableActionsType<PeopleTableDto>[];
    onChangePage: (_page: number) => {};
}
export interface ServicesTableProps {
    handleClickRow: (_row: ServicesTableDto) => void;
    data: ServicesTableDto[];
    uniqueCol: keyof ServicesTableDto;
    hide: (keyof ServicesTableDto)[];
    rowsPerPage?: number | string;
    totalPages?: number | string;
    actions: TableActionsType<ServicesTableDto>[];
    onChangePage: (_page: number) => {};
}
export interface VehiclesTableProps {
    handleClickRow: (_row: VehiclesTableDto) => void;
    data: VehiclesTableDto[];
    uniqueCol: keyof VehiclesTableDto;
    hide: (keyof VehiclesTableDto)[];
    rowsPerPage?: number | string;
    totalPages?: number | string;
    actions: TableActionsType<VehiclesTableDto>[];
    onChangePage: (_page: number) => {};
}

export interface WarehouseTableProps {
    handleClickRow: (_row: WarehouseTableDto) => void;
    data: WarehouseTableDto[];
    uniqueCol: keyof WarehouseTableDto;
    hide: (keyof WarehouseTableDto)[];
    rowsPerPage?: number | string;
    totalPages?: number | string;
    actions: TableActionsType<WarehouseTableDto>[];
    onChangePage: (_page: number) => {};
}
export interface WarehouseHistoryTableProps {
    handleClickRow: (_row: any) => void;
    data: any[];
    subdata?: any[];
    uniqueCol: keyof any;
    hide: (keyof any)[];
    rowsPerPage?: number | string;
    totalPages?: number | string;
    actions: TableActionsType<any>[];
    onChangePage: (_page: number) => {};
}
export interface PrintModalProps {
    show?: boolean;
    isShow?: boolean;
    className?: string;
    setShow: (_val: boolean) => void;
    setPrintShow: (_val: boolean) => void;
    onHide: () => void;
}