import { expect } from 'chai';
import * as sinon from 'sinon';
import { VehicleService } from '../src/vehicles/vehicle.service';
import { Vehicle } from '../src/vehicles/vehicle.entity';
import { VehicleDto } from '../src/vehicles/dto/vehicle.dto';

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

  it('should create a vehicle', async () => {
    const vehicleDto: VehicleDto = {
      placa: 'ABC1234',
      chassi: '9BWZZZ377VT004251',
      renavam: '12345678901',
      modelo: 'palio',
      marca: 'fiat',
      ano: 2025,
    };

    const createdVehicle = { id: 1, ...vehicleDto } as Vehicle;
    (Vehicle.create as sinon.SinonStub).resolves(createdVehicle);

    const result = await vehicleService.create(vehicleDto);

    expect(result).to.deep.equal(createdVehicle);
    expect((Vehicle.create as sinon.SinonStub).calledOnceWithExactly(sinon.match(vehicleDto))).to.be.true;
  });

  it('should find all vehicles', async () => {
    const vehicles = [
      { id: 1, placa: 'ABC1234', chassi: '9BWZZZ377VT004251', renavam: '12345678901', modelo: 'Gol', marca: 'Volkswagen', ano: 2025 },
      { id: 2, placa: 'DEF5678', chassi: '9BWZZZ377VT004252', renavam: '12345678902', modelo: 'Polo', marca: 'Volkswagen', ano: 2023 },
    ] as Vehicle[];

    (Vehicle.findAll as sinon.SinonStub).resolves(vehicles);

    const result = await vehicleService.findAll();
    console.log(result, 'result');
    console.log(vehicles, 'vehicles');
    expect(result).to.deep.equal(vehicles);
    expect((Vehicle.findAll as sinon.SinonStub).calledOnce).to.be.true;
  });

  it('should find a vehicle by ID', async () => {
    const vehicle = { id: 1, placa: 'ABC1234', chassi: '9BWZZZ377VT004251', renavam: '12345678901', modelo: 'Gol', marca: 'Volkswagen', ano: 2025 } as Vehicle;

    (Vehicle.findByPk as sinon.SinonStub).resolves(vehicle);

    const result = await vehicleService.findOne('1');

    expect(result).to.deep.equal(vehicle);
    expect((Vehicle.findByPk as sinon.SinonStub).calledOnceWithExactly('1')).to.be.true;
  });

  it('should update a vehicle', async () => {
    const vehicle = { 
      id: 1, 
      placa: 'ABC1234', 
      chassi: '9BWZZZ377VT004251', 
      renavam: '12345678901', 
      modelo: 'Polo', 
      marca: 'Volkswagen', 
      ano: 2025,
    } as unknown as Vehicle;

    // Adiciona o método update manualmente e cria um stub para ele
    const updateStub = sinon.stub().resolves({ ...vehicle, modelo: 'Polo' });
    (vehicle as any).update = updateStub;
    const updatedVehicle = { ...vehicle, modelo: 'paliozin' } as Vehicle;

    (Vehicle.findByPk as sinon.SinonStub).resolves(vehicle); // Stub para findByPk
    //const result = (Vehicle.update as sinon.SinonStub).resolves(vehicle); // Stub para update
    const result = await vehicleService.update('1', updatedVehicle);
    delete (updatedVehicle as any).update
    expect(result).to.deep.equal(updatedVehicle);
    expect((Vehicle.findByPk as sinon.SinonStub).calledOnceWithExactly('1')).to.be.true;
    expect(updateStub.calledOnceWithExactly(updatedVehicle)).to.be.true;
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
    // Adiciona o método destroy manualmente e cria um stub para ele
    const destroyStub = sinon.stub().resolves();
    (vehicle as any).destroy = destroyStub;

    (Vehicle.findByPk as sinon.SinonStub).resolves(vehicle); // Stub para findByPk

    await vehicleService.remove('1');

    expect((Vehicle.findByPk as sinon.SinonStub).calledOnceWithExactly('1')).to.be.true;
    expect(destroyStub.calledOnce).to.be.true;
  });
});