import { ItemModule } from '@inventory/item';
import { ShipmentModule } from '@inventory/shipment';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';
import { CoreResolver } from './core.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        buildSchemaOptions: {
          numberScalarMode: 'integer',
        },
        sortSchema: true,
        autoSchemaFile: 'apps/api/src/app/schema.graphql',
        playground: config.get('environment') === 'development',
        context: ({ req }) => ({ req }),
      }),
    }),
    ItemModule,
    ShipmentModule,
  ],
  controllers: [],
  providers: [CoreResolver],
  exports: [],
})
export class CoreModule {}
