import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Tạo instance ứng dụng NestJS dựa trên AppModule
  const app = await NestFactory.create(AppModule);

  // Lấy instance của ConfigService từ DI Container
  const configService = app.get(ConfigService);

  // Lấy giá trị biến môi trường PORT từ ConfigService
  const port = configService.get<string>('PORT') || '8081';

  // Thiết lập global prefix cho tất cả API: /api/v1/*
  // exclude: [''] nghĩa là root path ('/') sẽ không áp dụng prefix
  app.setGlobalPrefix('api/v1', { exclude: [''] });

  // Thiết lập Global Pipes để validate dữ liệu từ request theo DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Chỉ giữ lại các field được khai báo trong DTO
      // forbidNonWhitelisted: true, // (nếu bật) sẽ trả lỗi nếu có field không được khai báo trong DTO
    }),
  );

  // Lắng nghe ứng dụng trên cổng được chỉ định trong biến môi trường
  await app.listen(port);
}

// Gọi hàm bootstrap để khởi động ứng dụng
bootstrap();
