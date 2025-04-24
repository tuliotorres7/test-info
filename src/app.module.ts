import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vehicle } from './vehicles/vehicle.entity';
import { VehicleModule } from './vehicles/vehicle.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [Vehicle], 
      autoLoadModels: true, 
      synchronize: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, 
        },
      }, // Sincroniza o banco de dados com os modelos (não recomendado em produção)
    }),
    VehicleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}