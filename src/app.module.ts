import { Module } from '@nestjs/common'
import { HttpModule } from './infra/http/http.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'downloaded-songs'),
      serveRoot: '/downloaded-songs',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'bin', 'linux'),
      serveRoot: '/build/linux',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'bin', 'win'),
      serveRoot: '/build/win',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
