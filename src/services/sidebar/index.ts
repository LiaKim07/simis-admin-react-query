import { ISidebar } from '../../types/services/sidebar.types';

export const SUPER_USER_SIDEBAR: ISidebar[] = [
    {
        id: 1,
        name: 'Personalo valdymas',
        subItems: [
            [
                {
                    id: 11,
                    link: '/dashboard/employees',
                    name: 'Darbuotojai',
                    icon: 'dashboard-icon.svg'
                }
            ],
            [
                {
                    id: 12,
                    name: 'Nustatymai',

                    icon: 'toogle-icon.svg',
                    nestedItems: [
                        { id: 121, link: '/dashboard/employee-roles', name: 'Pareigos' },
                        { id: 122, link: '/dashboard/users', name: 'Vartotojai' },
                        { id: 123, link: '/dashboard/driver-license', name: 'Vairuotojo pažymėjimai' },
                    ]
                },
            ],
        ]
    },
    {
        id: 2,
        name: 'Sandėlio valdymas',
        subItems: [
            [
                {
                    id: 21,
                    link: '/dashboard/warehouses',
                    name: 'Sandėliai',
                    icon: 'warehouse-icon.svg'
                },
                {
                    id: 22,
                    link: '/dashboard/warehouses/products',
                    name: 'Prekės',
                    icon: 'product-icon.svg'
                }
            ],
            [
                {
                    id: 23,
                    name: 'Nustatymai',

                    icon: 'toogle-icon.svg',
                    nestedItems: [
                        { id: 231, link: '/dashboard/warehouse-settings/producttype', name: 'Prekių tipai' },
                        { id: 232, link: '/dashboard/warehouse-settings/productgroup', name: 'Prekių grupės' },
                        { id: 233, link: '/dashboard/warehouse-settings/productcategory', name: 'Prekių kategorijos' },
                    ]
                },
            ],
        ]
    },
    {
        id: 3,
        name: 'Pardavimų valdymas',
        subItems: [
            [
                {
                    id: 31,
                    link: '/dashboard/customers',
                    name: 'Klientai',
                    icon: 'customers-icon.svg'
                },
                {
                    id: 32,
                    link: '/dashboard/services',
                    name: 'Paslaugos',
                    icon: 'services-icon.svg'
                },
                {
                    id: 33,
                    link: '/dashboard/orders',
                    name: 'Aktai',
                    icon: 'orders-icon.svg'
                },
                {
                    id: 34,
                    link: '/dashboard/projects',
                    name: 'Projektai',
                    icon: 'projects-icon.svg'
                },
                {
                    id: 35,
                    link: '/dashboard/invoices',
                    name: 'Sąskaitos',
                    icon: 'invoice-icon.svg'
                },
                {
                    id: 36,
                    link: '/dashboard/archyvas',
                    name: 'Archyvas',
                    icon: 'projects-icon.svg'
                },
            ],
            // [
            //     {
            //         id: 36,
            //         name: 'Nustatymai',
            //         icon: 'toogle-icon.svg',
            //         nestedItems: [
            //             { id: 361, link: '/dashboard/customer-settings/customercategory', name: 'Klientų kategorijos' },
            //             { id: 362, link: '/dashboard/measurement-unit', name: 'MeasurementUnit' },
            //         ]
            //     },
            // ],
        ]
    },
    {
        id: 4,
        name: 'Resursų valdymas',
        subItems: [
            [
                {
                    id: 41,
                    link: '/dashboard/equipments',
                    name: 'Darbo priemonės',
                    icon: 'tools-icon.svg'
                },
                {
                    id: 42,
                    link: '/dashboard/vehicles',
                    name: 'Automobiliai',
                    icon: 'car-icon.svg'
                },
            ],
            // [
            //     {
            //         id: 43,
            //         name: 'Setting',
            //         icon: 'toogle-icon.svg',
            //         nestedItems: [
            //             { id: 431, link: '/dashboard/lifting-capacity', name: 'Lifting Capacity' },
            //             { id: 432, link: '/dashboard/lifting-type', name: 'Lifting Type' },
            //         ]
            //     },
            // ],
        ]
    },
    {
        id: 5,
        name: 'Resursų valdymas',
        subItems: [
            [
                {
                    id: 51,
                    link: '/dashboard/customers',
                    name: 'Klientai',
                    icon: 'customers-icon.svg'
                },
                {
                    id: 51,
                    link: '/dashboard/customers',
                    name: 'Užsakymai',
                    icon: 'product-icon.svg'
                },
            ],
        ]
    },
]


export const ADMIN_SIDEBAR: ISidebar[] = [
    {
        id: 1,
        name: 'Personalo valdymas',
        subItems: [
            [
                {
                    id: 11,
                    link: '/dashboard/employees',
                    name: 'Darbuotojai',
                    icon: 'dashboard-icon.svg'
                }
            ],
            [
                {
                    id: 12,
                    name: 'Nustatymai',

                    icon: 'toogle-icon.svg',
                    nestedItems: [
                        { id: 121, link: '/dashboard/employee-roles', name: 'Pareigos' },
                        { id: 122, link: '/dashboard/users', name: 'Vartotojai' },
                        { id: 123, link: '/dashboard/driver-license', name: 'Vairuotojo pažymėjimai' },
                    ]
                },
            ],
        ]
    },
    {
        id: 2,
        name: 'Sandėlio valdymas',
        subItems: [
            [
                {
                    id: 21,
                    link: '/dashboard/warehouses',
                    name: 'Sandėliai',
                    icon: 'warehouse-icon.svg'
                },
                {
                    id: 22,
                    link: '/dashboard/warehouses/products',
                    name: 'Prekės',
                    icon: 'product-icon.svg'
                }
            ],
            [
                {
                    id: 23,
                    name: 'Nustatymai',

                    icon: 'toogle-icon.svg',
                    nestedItems: [
                        { id: 231, link: '/dashboard/warehouse-settings/producttype', name: 'Prekių tipai' },
                        { id: 232, link: '/dashboard/warehouse-settings/productgroup', name: 'Prekių grupės' },
                        { id: 233, link: '/dashboard/warehouse-settings/productcategory', name: 'Prekių kategorijos' },
                    ]
                },
            ],
        ]
    },
    {
        id: 3,
        name: 'Pardavimų valdymas',
        subItems: [
            [
                {
                    id: 31,
                    link: '/dashboard/customers',
                    name: 'Klientai',
                    icon: 'customers-icon.svg'
                },
                {
                    id: 32,
                    link: '/dashboard/services',
                    name: 'Paslaugos',
                    icon: 'services-icon.svg'
                },
                {
                    id: 33,
                    link: '/dashboard/orders',
                    name: 'Aktai',
                    icon: 'orders-icon.svg'
                },
                {
                    id: 34,
                    link: '/dashboard/projects',
                    name: 'Projektai',
                    icon: 'projects-icon.svg'
                },
                {
                    id: 35,
                    link: '/dashboard/invoices',
                    name: 'Sąskaitos',
                    icon: 'invoice-icon.svg'
                },
                {
                    id: 36,
                    link: '/dashboard/archyvas',
                    name: 'Archyvas',
                    icon: 'projects-icon.svg'
                },
            ],
            // [
            //     {
            //         id: 36,
            //         name: 'Nustatymai',

            //         icon: 'toogle-icon.svg',
            //         nestedItems: [
            //             { id: 361, link: '/dashboard/customer-settings/customercategory', name: 'Klientų kategorijos' },
            //             { id: 362, link: '/dashboard/measurement-unit', name: 'MeasurementUnit' },
            //         ]
            //     },
            // ],
        ]
    },
    {
        id: 4,
        name: 'Resursų valdymas',
        subItems: [
            [
                {
                    id: 41,
                    link: '/dashboard/equipments',
                    name: 'Darbo priemonės',
                    icon: 'tools-icon.svg'
                },
                {
                    id: 42,
                    link: '/dashboard/vehicles',
                    name: 'Automobiliai',
                    icon: 'car-icon.svg'
                },
            ],
            // [
            //     {
            //         id: 43,
            //         name: 'Setting',
            //         icon: 'toogle-icon.svg',
            //         nestedItems: [
            //             { id: 431, link: '/dashboard/lifting-capacity', name: 'Lifting Capacity' },
            //             { id: 432, link: '/dashboard/lifting-type', name: 'Lifting Type' },
            //         ]
            //     },
            // ],
        ]
    },
    {
        id: 5,
        name: 'E komercija',
        subItems: [
            [
                {
                    id: 51,
                    link: '/dashboard/ecommerce-client',
                    name: 'Klientai',
                    icon: 'customers-icon.svg'
                },
                {
                    id: 52,
                    link: '/dashboard/ecommerce-order',
                    name: 'Užsakymai',
                    icon: 'product-icon.svg'
                },
            ]
        ]
    }
]


export const SYSTEM_ADMIN_SIDEBAR: ISidebar[] = [
    {
        id: 1,
        name: 'Personalo valdymas',
        subItems: [
            [
                {
                    id: 11,
                    link: '/dashboard/employees',
                    name: 'Darbuotojai',
                    icon: 'dashboard-icon.svg'
                }
            ],
            [
                {
                    id: 12,
                    name: 'Nustatymai',

                    icon: 'toogle-icon.svg',
                    nestedItems: [
                        { id: 121, link: '/dashboard/employee-roles', name: 'Pareigos' },
                        { id: 122, link: '/dashboard/users', name: 'Vartotojai' },
                        { id: 123, link: '/dashboard/driver-license', name: 'Vairuotojo pažymėjimai' },
                    ]
                },
            ],
        ]
    },
    {
        id: 2,
        name: 'Sandėlio valdymas',
        subItems: [
            [
                {
                    id: 21,
                    link: '/dashboard/warehouses',
                    name: 'Sandėliai',
                    icon: 'warehouse-icon.svg'
                },
                {
                    id: 22,
                    link: '/dashboard/warehouses/products',
                    name: 'Prekės',
                    icon: 'product-icon.svg'
                }
            ],
            [
                {
                    id: 23,
                    name: 'Nustatymai',

                    icon: 'toogle-icon.svg',
                    nestedItems: [
                        { id: 231, link: '/dashboard/warehouse-settings/producttype', name: 'Prekių tipai' },
                        { id: 232, link: '/dashboard/warehouse-settings/productgroup', name: 'Prekių grupės' },
                        { id: 233, link: '/dashboard/warehouse-settings/productcategory', name: 'Prekių kategorijos' },
                    ]
                },
            ],
        ]
    },
    {
        id: 3,
        name: 'Pardavimų valdymas',
        subItems: [
            [
                {
                    id: 31,
                    link: '/dashboard/customers',
                    name: 'Klientai',
                    icon: 'customers-icon.svg'
                },
                {
                    id: 32,
                    link: '/dashboard/services',
                    name: 'Paslaugos',
                    icon: 'services-icon.svg'
                },
                {
                    id: 33,
                    link: '/dashboard/orders',
                    name: 'Aktai',
                    icon: 'orders-icon.svg'
                },
                {
                    id: 34,
                    link: '/dashboard/projects',
                    name: 'Projektai',
                    icon: 'projects-icon.svg'
                },
                {
                    id: 35,
                    link: '/dashboard/invoices',
                    name: 'Sąskaitos',
                    icon: 'invoice-icon.svg'
                },
                {
                    id: 36,
                    link: '/dashboard/archyvas',
                    name: 'Archyvas',
                    icon: 'projects-icon.svg'
                },
            ],
            // [
            //     {
            //         id: 36,
            //         name: 'Nustatymai',

            //         icon: 'toogle-icon.svg',
            //         nestedItems: [
            //             { id: 361, link: '/dashboard/customer-settings/customercategory', name: 'Klientų kategorijos' },
            //             { id: 362, link: '/dashboard/measurement-unit', name: 'MeasurementUnit' },
            //         ]
            //     },
            // ],
        ]
    },
    {
        id: 4,
        name: 'Resursų valdymas',
        subItems: [
            [
                {
                    id: 41,
                    link: '/dashboard/equipments',
                    name: 'Darbo priemonės',
                    icon: 'tools-icon.svg'
                },
                {
                    id: 42,
                    link: '/dashboard/vehicles',
                    name: 'Automobiliai',
                    icon: 'car-icon.svg'
                },
            ],
            // [
            //     {
            //         id: 43,
            //         name: 'Setting',
            //         icon: 'toogle-icon.svg',
            //         nestedItems: [
            //             { id: 431, link: '/dashboard/lifting-capacity', name: 'Lifting Capacity' },
            //             { id: 432, link: '/dashboard/lifting-type', name: 'Lifting Type' },
            //         ]
            //     },
            // ],
        ]
    },
    {
        id: 5,
        name: 'Admin nustatymai',
        subItems: [
            [
                {
                    id: 51,
                    link: '/dashboard/company-profile',
                    name: 'Įmonės profilis',
                    icon: 'company-profile-icon.svg'
                },
            ]
        ]
    },
    {
        id: 6,
        name: 'E komercija',
        subItems: [
            [
                {
                    id: 61,
                    link: '/dashboard/ecommerce-client',
                    name: 'Klientai',
                    icon: 'customers-icon.svg'
                },
                {
                    id: 62,
                    link: '/dashboard/ecommerce-order',
                    name: 'Užsakymai',
                    icon: 'product-icon.svg'
                },
            ]
        ]
    }
]

export const GUEST_SIDEBAR: ISidebar[] = [
    {
        id: 1,
        name: 'Personalo valdymas',
        subItems: [
            [
                {
                    id: 11,
                    link: '/dashboard/employees',
                    name: 'Darbuotojai',
                    icon: 'dashboard-icon.svg'
                }
            ],
            [
                {
                    id: 12,
                    name: 'Nustatymai',

                    icon: 'toogle-icon.svg',
                    nestedItems: [
                        { id: 121, link: '/dashboard/employee-roles', name: 'Pareigos' },
                        { id: 122, link: '/dashboard/driver-license', name: 'Vairuotojo pažymėjimai' },
                    ]
                },
            ],
        ]
    },
    {
        id: 2,
        name: 'Sandėlio valdymas',
        subItems: [
            [
                {
                    id: 21,
                    link: '/dashboard/warehouses',
                    name: 'Sandėliai',
                    icon: 'warehouse-icon.svg'
                },
                {
                    id: 22,
                    link: '/dashboard/warehouses/products',
                    name: 'Prekės',
                    icon: 'product-icon.svg'
                }
            ],
            [
                {
                    id: 23,
                    name: 'Nustatymai',

                    icon: 'toogle-icon.svg',
                    nestedItems: [
                        { id: 231, link: '/dashboard/warehouse-settings/producttype', name: 'Prekių tipai' },
                        { id: 232, link: '/dashboard/warehouse-settings/productgroup', name: 'Prekių grupės' },
                        { id: 233, link: '/dashboard/warehouse-settings/productcategory', name: 'Prekių kategorijos' },
                    ]
                },
            ],
        ]
    },
    {
        id: 3,
        name: 'Pardavimų valdymas',
        subItems: [
            [
                {
                    id: 31,
                    link: '/dashboard/customers',
                    name: 'Klientai',
                    icon: 'customers-icon.svg'
                },
                {
                    id: 32,
                    link: '/dashboard/services',
                    name: 'Paslaugos',
                    icon: 'services-icon.svg'
                },
                {
                    id: 33,
                    link: '/dashboard/orders',
                    name: 'Aktai',
                    icon: 'orders-icon.svg'
                },
                {
                    id: 34,
                    link: '/dashboard/projects',
                    name: 'Projektai',
                    icon: 'projects-icon.svg'
                },
                {
                    id: 35,
                    link: '/dashboard/invoices',
                    name: 'Sąskaitos',
                    icon: 'invoice-icon.svg'
                },
                {
                    id: 36,
                    link: '/dashboard/archyvas',
                    name: 'Archyvas',
                    icon: 'projects-icon.svg'
                },
            ],
            // [
            //     {
            //         id: 36,
            //         name: 'Nustatymai',

            //         icon: 'toogle-icon.svg',
            //         nestedItems: [
            //             { id: 361, link: '/dashboard/customer-settings/customercategory', name: 'Klientų kategorijos' },
            //             { id: 362, link: '/dashboard/measurement-unit', name: 'MeasurementUnit' },
            //         ]
            //     },
            // ],
        ]
    },
    {
        id: 4,
        name: 'Resursų valdymas',
        subItems: [
            [
                {
                    id: 41,
                    link: '/dashboard/equipments',
                    name: 'Darbo priemonės',
                    icon: 'tools-icon.svg'
                },
                {
                    id: 42,
                    link: '/dashboard/vehicles',
                    name: 'Automobiliai',
                    icon: 'car-icon.svg'
                },
            ],
            // [
            //     {
            //         id: 43,
            //         name: 'Setting',
            //         icon: 'toogle-icon.svg',
            //         nestedItems: [
            //             { id: 431, link: '/dashboard/lifting-capacity', name: 'Lifting Capacity' },
            //             { id: 432, link: '/dashboard/lifting-type', name: 'Lifting Type' },
            //         ]
            //     },
            // ],
        ]
    },
]

export const USER_SIDEBAR: ISidebar[] = [
    {
        id: 1,
        name: 'Personalo valdymas',
        subItems: [
            [
                {
                    id: 11,
                    link: '/dashboard/employees',
                    name: 'Darbuotojai',
                    icon: 'dashboard-icon.svg'
                }
            ],
            [
                {
                    id: 12,
                    name: 'Nustatymai',

                    icon: 'toogle-icon.svg',
                    nestedItems: [
                        { id: 121, link: '/dashboard/employee-roles', name: 'Pareigos' },
                        { id: 122, link: '/dashboard/driver-license', name: 'Vairuotojo pažymėjimai' },
                    ]
                },
            ],
        ]
    },
    {
        id: 2,
        name: 'Sandėlio valdymas',
        subItems: [
            [
                {
                    id: 21,
                    link: '/dashboard/warehouses',
                    name: 'Sandėliai',
                    icon: 'warehouse-icon.svg'
                },
                {
                    id: 22,
                    link: '/dashboard/warehouses/products',
                    name: 'Prekės',
                    icon: 'product-icon.svg'
                }
            ],
            [
                {
                    id: 23,
                    name: 'Nustatymai',

                    icon: 'toogle-icon.svg',
                    nestedItems: [
                        { id: 231, link: '/dashboard/warehouse-settings/producttype', name: 'Prekių tipai' },
                        { id: 232, link: '/dashboard/warehouse-settings/productgroup', name: 'Prekių grupės' },
                        { id: 233, link: '/dashboard/warehouse-settings/productcategory', name: 'Prekių kategorijos' },
                    ]
                },
            ],
        ]
    },
    {
        id: 3,
        name: 'Pardavimų valdymas',
        subItems: [
            [
                {
                    id: 31,
                    link: '/dashboard/customers',
                    name: 'Klientai',
                    icon: 'customers-icon.svg'
                },
                {
                    id: 32,
                    link: '/dashboard/services',
                    name: 'Paslaugos',
                    icon: 'services-icon.svg'
                },
                {
                    id: 33,
                    link: '/dashboard/orders',
                    name: 'Aktai',
                    icon: 'orders-icon.svg'
                },
                {
                    id: 34,
                    link: '/dashboard/projects',
                    name: 'Projektai',
                    icon: 'projects-icon.svg'
                },
                {
                    id: 35,
                    link: '/dashboard/invoices',
                    name: 'Sąskaitos',
                    icon: 'invoice-icon.svg'
                },
                {
                    id: 36,
                    link: '/dashboard/archyvas',
                    name: 'Archyvas',
                    icon: 'projects-icon.svg'
                },
            ],
            // [
            //     {
            //         id: 36,
            //         name: 'Nustatymai',

            //         icon: 'toogle-icon.svg',
            //         nestedItems: [
            //             { id: 361, link: '/dashboard/customer-settings/customercategory', name: 'Klientų kategorijos' },
            //             { id: 362, link: '/dashboard/measurement-unit', name: 'MeasurementUnit' },
            //         ]
            //     },
            // ],
        ]
    },
    {
        id: 4,
        name: 'Resursų valdymas',
        subItems: [
            [
                {
                    id: 41,
                    link: '/dashboard/equipments',
                    name: 'Darbo priemonės',
                    icon: 'tools-icon.svg'
                },
                {
                    id: 42,
                    link: '/dashboard/vehicles',
                    name: 'Automobiliai',
                    icon: 'car-icon.svg'
                },
            ],
            // [
            //     {
            //         id: 43,
            //         name: 'Setting',
            //         icon: 'toogle-icon.svg',
            //         nestedItems: [
            //             { id: 431, link: '/dashboard/lifting-capacity', name: 'Lifting Capacity' },
            //             { id: 432, link: '/dashboard/lifting-type', name: 'Lifting Type' },
            //         ]
            //     },
            // ],
        ]
    },
]

