import { Module } from '@nestjs/common'
import { HttpModule } from './infra/http/http.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
// import { AuthModule } from './infra/auth/auth.module'

@Module({
  imports: [
    // AuthModule,
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'downloaded-songs'),
      serveRoot: '/downloaded-songs',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
