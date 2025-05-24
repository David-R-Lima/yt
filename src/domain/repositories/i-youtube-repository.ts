import { Injectable } from '@nestjs/common'
import { Youtube } from '../entities/youtube'

@Injectable()
export abstract class IYoutubeRepository {
  abstract create(youtube: Youtube): Promise<Youtube>
  abstract update(youtube: Youtube): Promise<Youtube>
  abstract get(): Promise<Youtube | null>
}
