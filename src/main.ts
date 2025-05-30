import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {

  const app = await NestFactory.create(AppModule)

  app.useWebSocketAdapter(new IoAdapter(app))

  app.enableCors({
    origin: '*',
  })

  const port = process.env.PORT || 3333
  await app.listen(port, "0.0.0.0")

  console.log(`Server is running on http://localhost:${port}`)
}
bootstrap()
