import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'tree_category',
      entities: [Category],
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([Category]),
  ],
  controllers: [AppController,CategoryController],
  providers: [AppService,CategoryService],
})
export class AppModule {}
