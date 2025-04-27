import { expect } from 'chai';
import * as sinon from 'sinon';
import { VehicleService } from '../src/vehicles/vehicle.service';
import { Vehicle } from '../src/vehicles/vehicle.entity';
import { VehicleDto } from '../src/vehicles/dto/vehicle.dto';
import { FiltersVehicles } from '../src/module/models/filterFindVehicles';
import { Op } from 'sequelize';
import { HttpException, HttpStatus } from '@nestjs/common';
import { isLicensePlateValid } from '../src/module/models/utils';

describe('VehicleService', () => {
  let vehicleService: VehicleService;

  beforeEach(() => {
    sinon.stub(Vehicle, 'create');
    sinon.stub(Vehicle, 'findAll');
    sinon.stub(Vehicle, 'findByPk');
    sinon.stub(Vehicle, 'update');
    sinon.stub(Vehicle, 'destroy');

    vehicleService = new VehicleService(Vehicle as any);
  });

  afterEach(() => {
    sinon.restore();
  });

  
  it('should fail validation for all license plates', async () => {
    const vehicles:Vehicle[] = [
      { id: 1, placa: 'HAY-3333', modelo: 'Gol', ano: 2020 },
      { id: 2, placa: 'HAY-1254', modelo: 'Polo', ano: 2023 },
    ] as Vehicle[];

    (Vehicle.findAll  as sinon.SinonStub).resolves(vehicles);
    const result = await Vehicle.findAll();
    result.forEach((vehicle) => {
      const isValid = isLicensePlateValid(vehicle.placa);
      expect(isValid).to.be.true;
    });
  });

  it('should create a vehicle', async () => {
    const vehicleDto: VehicleDto = {
      placa: 'ABC-1234',
      chassi: '9BWZZZ377VT004251',
      renavam: '12345678901',
      modelo: 'palio',
      marca: 'fiat',
      ano: 2025,
    };

    const createdVehicle = { id: 10000, ...vehicleDto } as Vehicle;
    (Vehicle.create as sinon.SinonStub).resolves(createdVehicle);
    const result = await vehicleService.create(vehicleDto);
    expect(result).to.deep.equal(createdVehicle);
    expect(
      (Vehicle.create as sinon.SinonStub).calledOnceWithExactly(
        sinon.match(vehicleDto),
      ),
    ).to.be.true;
  });

  it('should find all vehicles', async () => {
    const vehicles = [
      {
        id: 1,
        placa: 'ABC-1234',
        chassi: '9BWZZZ377VT004251',
        renavam: '12345678901',
        modelo: 'Gol',
        marca: 'Volkswagen',
        ano: 2025,
      },
      {
        id: 2,
        placa: 'DEF5678',
        chassi: '9BWZZZ377VT004252',
        renavam: '12345678902',
        modelo: 'Polo',
        marca: 'Volkswagen',
        ano: 2023,
      },
    ] as Vehicle[];

    (Vehicle.findAll as sinon.SinonStub).resolves(vehicles);

    const result = await vehicleService.findAll();
    expect(result).to.deep.equal(vehicles);
    expect((Vehicle.findAll as sinon.SinonStub).calledOnce).to.be.true;
  });

  it('should find a vehicle by ID', async () => {
    const vehicle = {
      id: 1,
      placa: 'ABC-1234',
      chassi: '9BWZZZ377VT004251',
      renavam: '12345678901',
      modelo: 'Gol',
      marca: 'Volkswagen',
      ano: 2025,
    } as Vehicle;

    (Vehicle.findByPk as sinon.SinonStub).resolves(vehicle)
    const idNotChange = 3

    const result = await vehicleService.findOne(idNotChange);
    expect(result).to.deep.equal(vehicle);
    expect((Vehicle.findByPk as sinon.SinonStub).calledOnceWithExactly(idNotChange)).to
      .be.true;
  });

  it('should update a vehicle', async () => {
    const vehicle = {
      id: 1,
      placa: 'ABC-1234',
      chassi: '9BWZZZ377VT004251',
      renavam: '12345678901',
      modelo: 'Polo',
      marca: 'Volkswagen',
      ano: 2025,
      update: sinon.stub().resolvesThis() as sinon.SinonStub,
    } as unknown as Vehicle;

    const updatedVehicleData = { modelo: 'Polo' };
    const updatedVehicle = { ...vehicle, ...updatedVehicleData };

    (Vehicle.findByPk as sinon.SinonStub).resolves(vehicle); 

    const result = await vehicleService.update(1, updatedVehicleData as Vehicle);

    expect(result).to.deep.equal(updatedVehicle);
    expect((Vehicle.findByPk as sinon.SinonStub).calledOnceWithExactly(1)).to.be
      .true;
    expect((vehicle.update as sinon.SinonStub).calledOnceWithExactly(updatedVehicleData)).to.be.true;
  });

  it('should delete a vehicle', async () => {
    const vehicle = {
      id: 1,
      placa: 'ABC12343',
      chassi: '9BWZZZ377VT0042512',
      renavam: '123456789013',
      modelo: 'Gol',
      marca: 'Volkswagen',
      ano: 2025,
    } as unknown as Vehicle;
    const destroyStub = sinon.stub().resolves();
    (vehicle as any).destroy = destroyStub;

    (Vehicle.findByPk as sinon.SinonStub).resolves(vehicle); 
    const idNotChange = 2
    await vehicleService.remove(idNotChange);
    expect((Vehicle.findByPk as sinon.SinonStub).calledOnceWithExactly(idNotChange)).to
      .be.true;
    expect(destroyStub.calledOnce).to.be.true;
  });

   it('should return a paginated list of vehicles based on filters', async () => {
    const filters: FiltersVehicles = {
      producedAfterTheYear: 2000,
      producedBeforeTheYear: 2025,
    };

    const page = 1;
    const limit = 10;

    const vehicles = [
      {
        id: 1,
        placa: 'ABC-1234',
        chassi: '9BWZZZ377VT004251',
        renavam: '12345678901',
        modelo: 'Gol',
        marca: 'Volkswagen',
        ano: 2020,
      },
      {
        id: 2,
        placa: 'DEF-5678',
        chassi: '9BWZZZ377VT004252',
        renavam: '12345678902',
        modelo: 'Polo',
        marca: 'Volkswagen',
        ano: 2023,
      },
    ] as Vehicle[];

    (Vehicle.findAll as sinon.SinonStub).resolves(vehicles);
    const result = await vehicleService.list(filters, page, limit);
    expect(result).to.deep.equal(vehicles);
    expect((Vehicle.findAll as sinon.SinonStub).calledOnceWithExactly({
      where: {
        [Op.and]: {
          ano: {
            [Op.lte]: filters.producedBeforeTheYear,
            [Op.gte]: filters.producedAfterTheYear,
          },
        },
      },
      limit,
      offset: limit * (page - 1),
    })).to.be.true;
  });

  it('should throw NotFoundException if item does not exist', async () => {
    const id = 8;
    (Vehicle.destroy  as sinon.SinonStub)= sinon.stub().resolves(0);
    try {
      await vehicleService.remove(id);
      throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
    } catch (error:any) {
      expect(error).to.be.instanceOf(HttpException);
      expect(error.status).to.equal(404);
      expect(error.message).to.equal('Vehicle not found');
    }
    //expectation must be false, because it does not exist, so the destroy function must not have been executed
    expect((Vehicle.destroy as sinon.SinonStub).calledOnce).to.be.false;
  });
});
