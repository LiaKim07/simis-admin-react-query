import { useMutation, useQuery } from 'react-query';

import { drivingLicenseService } from '../services/driving-license/driving-license.service';

class DrivingLicense {
  create() {
    return useMutation(drivingLicenseService.create);
  }

  getAll() {
    return useQuery(['d-licenses'], () => drivingLicenseService.getAll());
  }

  getById(id?: string) {
    return useQuery(
      ['d-byId', id],
      () => drivingLicenseService.getById(id || ''),
      {
        enabled: !!id,
      },
    );
  }

  update() {
    return useMutation(drivingLicenseService.update);
  }

  removeById() {
    return useMutation(drivingLicenseService.removeById);
  }
}

export const drivingLicenseStore = new DrivingLicense();
